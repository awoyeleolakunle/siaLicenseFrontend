

// function getCookie(name) {
//     const cookieValue = document.cookie
//         .split('; ')
//         .find(row => row.startsWith(name + '='))
//         ?.split('=')[1];

//     return cookieValue ? decodeURIComponent(cookieValue) : null;
// }

// // Example usage to get the token
// const jwtToken = getCookie('siaLicence+Token');


// // Now you can use the jwtToken as needed



// console.log('All cookies:', document.cookie);



// const querryParam = new URLSearchParams(window.location.search);
// const encodedApplicantType = querryParam.get('applicant');


document.addEventListener('DOMContentLoaded', ()=>{


const userType  = sessionStorage.getItem('userType');


if(userType){

const userTypeRenderimg = document.getElementById('userTypeDisplayId');

const newSpan = document.createElement('span');
newSpan.innerText = 'Profile';

const imgIcon = document.createElement('img');
imgIcon.src = "/06. SIA License+/assets/images/icons/white/my-profile.png";

userTypeRenderimg.innerHTML = '';
userTypeRenderimg.appendChild(imgIcon);
userTypeRenderimg.appendChild(newSpan); 

  userTypeRenderimg.addEventListener('click', ()=>{
    window.location.href = '#';
  })

}

})