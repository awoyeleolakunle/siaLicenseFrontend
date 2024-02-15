



document.addEventListener('DOMContentLoaded', function(){
  console.log("I got in here mehn ");

  const applicantEmailAddress =  sessionStorage.getItem('applicantEmailAddress');
  console.log("i'm the applicant emailAddress to be sent : ", applicantEmailAddress);
  fetchApplicantDetailsFromBackend(applicantEmailAddress.trim()); 

  fetchApplicantDetailsFromBackend();



 

})



 let selectedTrainingSession, trainingStartDate, trainingEndDate, applicantEmailAddress, trainingId, centerEmailAddress;

 applicantEmailAddress = sessionStorage.getItem('applicantEmailAddress');



const querryParam = new URLSearchParams(window.location.search);
 const encodedParam = querryParam.get('trainingSession');
 selectedTrainingSession = JSON.parse(encodedParam);
 trainingId =selectedTrainingSession.id;

    
const getDateObject = (year, month, day)=>{
    return new Date(year, month-1, day)
  }

if(selectedTrainingSession.startDate){

    const splitedRecievedStartDate = selectedTrainingSession.startDate.split('-');
   
    const objectValueOfStartDate = getDateObject(splitedRecievedStartDate[0], splitedRecievedStartDate[1], splitedRecievedStartDate[2])

   
    trainingStartDate  = objectValueOfStartDate.toString().split(/\s+/)
    };


    if(selectedTrainingSession.endDate){
    const splitedRecievedEndDate = selectedTrainingSession.endDate.split('-')   
   
     const objectValueOfEndDate  = getDateObject( splitedRecievedEndDate[0], splitedRecievedEndDate[1], splitedRecievedEndDate[2])
     trainingEndDate = objectValueOfEndDate.toString().split(/\s+/);
    };


console.log(selectedTrainingSession);


 document.getElementById('trainingTypeId').value = selectedTrainingSession.trainingType;
 document.getElementById('centerNameId').value = selectedTrainingSession.centerName;
 document.getElementById('startDateAndEndDateId').value = `${trainingStartDate.splice(0, 4).join('-')}  to   ${trainingEndDate.splice(0, 4).join('-')}`;

 document.getElementById('firstNameId').value;

 
 const proceedBtn = document.getElementById('proceedId');

proceedBtn.addEventListener('click', (event)=>{
    event.preventDefault();
    sendBookTrainingRequestToBackend();
})


//booking-confirmation.html

 const sendBookTrainingRequestToBackend = ()=>{



        const bookTrainingSessionRequest ={
             "trainingId" : trainingId,
            "applicantEmailAddress" : applicantEmailAddress,
            "centerEmailAddress": selectedTrainingSession.centerEmailAddress
        }


        fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/applicant/bookTraining`,{
            method : 'POST',
            headers : {
              'Content-Type':'application/json'
            },
            body : JSON.stringify(bookTrainingSessionRequest)
          })
          .then(response=>{
            if(response.status===201){
            return response.json()
          }
            else if(response.status===400){
                return response.json()
            }
            else{
              throw new Error('Unsuccessful')
            }
          })
          .then(data=>{
            if(data && data.statusCode===400){
              throw new Error(data.data)
            }
            else if(data && data.data){
              {toast(data.data, 4000)}
            }
            else{
              throw new Error('Unsuccessful')
            }
          })
          .catch(error=>{
            if(error.message){
              {toast(error.message, 4000)}
            }
            else{
              {toast('Network Failed')}
            }
          })

        }




        const fetchApplicantDetailsFromBackend = (applicantEmailAddress)=>{


          fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/applicant/applicantDetails?applicantEmailAddress=${encodeURIComponent(applicantEmailAddress.trim())}`,{
              method :'GET',
              headers:{
                  'Content-Type': 'application/json'
              }
          })
          .then(response=>{
              if(response.ok){

                console.log("I'm the response : ", response);
                 return response.json()
              }
              else{
                  throw new Error('unsucessful')
              }
          })
          .then(data=>{

            console.log("I'm the data : ", data);
            console.log("I'm the data in data : ", data.data);
      
              autoFillApplicantDetails(data.data);
          })
          .catch(error=>{
              if(error.message){
                  {toast(error.meaasge, 4000)}
              }
              else{
                  {toast('Network Failed')}
              }
          })
      
      }
      
      
      
      const autoFillApplicantDetails = (applicantDetails)=>{
      
          document.getElementById('firstNameId').value = applicantDetails.firstName; 
          document.getElementById('lastNameId').value = applicantDetails.lastName;
          document.getElementById('emailAddressId').value = applicantDetails.user.emailAddress;
      
      }
    

    
