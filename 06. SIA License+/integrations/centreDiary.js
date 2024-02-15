


document.addEventListener('DOMContentLoaded', function () {


  fetchCenterAllTrainingSessionsFromBackend();

    // Initialize flatpickr for Publish Date
    flatpickr('#startDateId',  {
      dateFormat: 'Y-m-d', // Date format (customize as needed)
      enableTime: false,   // Disable time selection
      altInput: true,      // Display an alternative input field
      altFormat: 'F j, Y', // Format for the alternative input field
    });


    flatpickr('#endDateId', {
      dateFormat: 'Y-m-d', // Date format (customize as needed)
      enableTime: false,   // Disable time selection
      altInput: true,      // Display an alternative input field
      altFormat: 'F j, Y', // Format for the alternative input field
    });
  
    // Initialize flatpickr for Publish Time
    // flatpickr('#publishTimeId', {
    //   enableTime: true,    // Enable time selection
    //   noCalendar: true,    // Disable the calendar
    //   dateFormat: 'H:i',   // Time format (24-hour)
    //   altInput: true,      // Display an alternative input field
    //   altFormat: 'h:i K',  // Format for the alternative input field (with AM/PM)
    // });

 
  });



  function fetchCenterAllTrainingSessionsFromBackend(){


    

    const emailAddress = sessionStorage.getItem('centerEmailAddress');
        
    fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/center/aCenterAllTrainingSessions?emailAddress=${encodeURIComponent(emailAddress)}`,{
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response=>{
      if(response.ok){
     
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
      console.log("I'm the data and I got here : ", data);
      if( data && data.statusCode===400){ 
          throw new Error(data.data)
      }
      else{
        if(data && data.data){
          console.log("I'm the data fecthed : ", data);
          displayACenterAllTrainingSessions(data.data)
        }
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

const trainingType = document.getElementById('trainingTypeId');
trainingType.addEventListener('change', ()=>{
  console.log(trainingType.value);
})



const createDateObject = (year, month, day)=>{

  return new Date(year, month-1, day)

}



const sendTrainingcreationObjectToBackend = ()=>{

  const startDate = (document.getElementById('startDateId').value).split('-');
  const endDate = (document.getElementById('endDateId').value).split('-');

  console.log("I'm the start date : ", startDate);
  console.log("I'm the endDate : ", endDate);

  console.log(" I'm the date object: ", createDateObject(startDate[0], startDate[1], startDate[2]));


const emailAddress =  sessionStorage.getItem('centerEmailAddress');

  const trainingSessionRequest = {
  
   "centerEmailAddress" : emailAddress,
   "startDate" : createDateObject(startDate[0], startDate[1], startDate[2]),
   "endDate" : createDateObject(endDate[0], endDate[1], endDate[2]),
   "trainingFee" : Number(document.getElementById('feeId').value),
   "numberOfSlots" : Number(document.getElementById('slotsId').value),
   "trainingType" : document.getElementById('trainingTypeId').value
  }

  console.log("I'm the center email address : ", trainingSessionRequest.centerEmailAddress);
  console.log("I'm the training type : ", trainingSessionRequest.trainingType );
  console.log("I'm the available slots : ", trainingSessionRequest.numberOfSlots);


  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/center/createTrainingSession`, {
    method : 'POST',
    headers : {
      'Content-Type':'application/json'
    },
    body : JSON.stringify(trainingSessionRequest)
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

const createTraininBtn = document.getElementById('createTraininBtnId');
createTraininBtn.addEventListener('click', sendTrainingcreationObjectToBackend)



function displayACenterAllTrainingSessions(listOfACenterTrainingSessions){
  console.log("I was called");

  console.log("I'm the list of training sessions ", listOfACenterTrainingSessions);


  const trainingSessionListContainer = document.getElementById('trainingSessionListId')
  trainingSessionListContainer.innerHTML = " ";

 let trainingStartDate, trainingEndDate;

  if(listOfACenterTrainingSessions.length!==0){

    listOfACenterTrainingSessions.forEach((trainingSession, index)=>{

      if(trainingSession.startDate){

      const splitedRecievedStartDate = trainingSession.startDate.split('-');
     
      const objectValueOfStartDate = getDateObject(splitedRecievedStartDate[0], splitedRecievedStartDate[1], splitedRecievedStartDate[2])

      console.log("I'm the value here : ", objectValueOfStartDate);
      trainingStartDate  =objectValueOfStartDate.toString().split(/\s+/)
      };


      if(trainingSession.endDate){
      const splitedRecievedEndDate = trainingSession.endDate.split('-')   
     
       const objectValueOfEndDate  = getDateObject( splitedRecievedEndDate[0], splitedRecievedEndDate[1], splitedRecievedEndDate[2])
       trainingEndDate = objectValueOfEndDate.toString().split(/\s+/);
      };

    

      const listItem = document.createElement('div')
      listItem.className ='card'

      listItem.innerHTML = `
      
          <div class="card__details">
            <h4 class="card__title"> ${trainingStartDate.splice(0, 4).join(' ')}  <p><p>  ${trainingEndDate.splice(0, 4).join(' ')}</h4>     
          </div>
          
          <div class="card__details">
              <h4 class="card__title">${trainingSession.numberOfSlots} slots left</h4>
          </div>
      `;
      trainingSessionListContainer.appendChild(listItem)

    })


  }

}



const getDateObject = (year, month, day)=>{
  return new Date(year, month-1, day)
}

