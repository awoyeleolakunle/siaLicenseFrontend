





const sendCenterRgistrationDetailsToBackend =()=>{

    const centerRequest = {
       "centerName" :  document.getElementById("centerNameId").value,
       "emailAddress" : document.getElementById('emailAddressId').value,
       "address" : document.getElementById('addressId').value,
       "password" : document.getElementById('passwordId').value,
       "city" : document.getElementById('cityId').value,
       "postCode": document.getElementById('postCodeId').value
    }
  
    console.log(centerRequest);
    fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/center/register`,{
  
      method : 'POST',
      headers :{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(centerRequest)
    })
    .then(response=>{
      if(response.status===201){ 
        return response.json()
      }

      else if(response.status==400){
        return response.json()
      }
      else{
        throw new Error('Unsuccessful')
      }
    })
    .then( data=>{
      console.log("I'm the data : ", data);
      if(data && data.statusCode==400){
        throw new Error(data.data)
      }
      else if(data && data.data){
      const jwtToken = data.data;
      userRole(jwtToken, centerRequest)
      }
        else{
            throw new Error("Unsuccessful")
        }
      }
    )
    .catch(error=>{
      console.log("error : ", error);
      if(error.message){
        {toast(error.message, 4000)}
      }
      else{
        {toast('Network Failed')}
      }     
  
    })
  
  }
  
  
const userRole = (jwtToken, centerRequest)=>{

  const [, payloadBase64] = jwtToken.split('.');
  const payloadJSON = atob(payloadBase64);
  const payload = JSON.parse(payloadJSON);
  const userRoles = payload.roles;
  // const firstName = payload.firstName;
  // const lastName = payload.lastName

  // const fullName = `${firstName} ${lastName}`

  console.log(userRoles);

  console.log(userRoles[0]);
  
  if (userRoles[0] === "CENTER") {
      console.log("I'm in here ", userRoles[0]);
  
      sessionStorage.setItem('siaLicense+Token', JSON.stringify(jwtToken));
      sessionStorage.setItem('centerEmailAddress', centerRequest.emailAddress)
      

      window.location.href = 'index.html'
     // sendOtPForVerification(fullName);

  }  
    
}

const centerSignUpBtn = document.getElementById('submitId')
centerSignUpBtn.addEventListener('click',()=>{ 
  
 // console.log("Yes I've been clicked");
 sendCenterRgistrationDetailsToBackend()


})

