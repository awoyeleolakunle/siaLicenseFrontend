




const doorSupervison = document.getElementById('doorSupervisionId');


const securityGuarding = document.getElementById('securityGuardingId');
const cctvOperation = document.getElementById('cctvOperationId');
const closeProtection = document.getElementById('closeProtectionId');
const cashAndValuableInTransit = document.getElementById('cashAndValuableInTransitId');
const vehicleImmobilising = document.getElementById('vehicleImmobilisingId');


console.log(doorSupervison);
console.log(cctvOperation);

doorSupervison.addEventListener('click', (e)=>{
    e.preventDefault();
    const encodedCourse = encodeURIComponent('DOOR_SUPERVISION')
    const url = `course-details.html?course=${encodedCourse}`;
    window.location.href = url;
})


securityGuarding.addEventListener('click', (e)=>{
    e.preventDefault();
    const encodedCourse = encodeURIComponent('SECURITY_GUARDING')
    const url = `course-details.html?course=${encodedCourse}`;
    window.location.href = url;
})

securityGuarding.addEventListener('click', (e)=>{
    e.preventDefault();
    const encodedCourse = encodeURIComponent('SECURITY_GUARDING')
    const url = `course-details.html?course=${encodedCourse}`;
    window.location.href = url;
})

cctvOperation.addEventListener('click', (e)=>{
    e.preventDefault();
    const encodedCourse = encodeURIComponent('CCTV_OPERATION');
    const url = `course-details.html?course=${encodedCourse}`;
    window.location.href = url;
})

closeProtection.addEventListener('click', (e)=>{
    e.preventDefault();
    const encodedCourse = encodeURIComponent('CLOSE_PROTECTION')
    const url = `course-details.html?course=${encodedCourse}`;
    window.location.href = url;

})

cashAndValuableInTransit.addEventListener('click', (e)=>{
    e.preventDefault();
    const encodedCourse = encodeURIComponent('CASH_AND_VALUABLE_IN_TRANSIT');
    const url = `course-details.html?course=${encodedCourse}`;
    window.location.href = url;

})


vehicleImmobilising.addEventListener('click', (e)=>{
    e.preventDefault();
    const encodedCourse = encodeURIComponent('VEHICLE_IMMOBILISING');
    const url = `course-details.html?course=${encodedCourse}`;
    window.location.href = url;
})

