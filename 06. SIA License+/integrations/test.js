





const getDateObject = (year, month, day)=>{
    return new Date(year, month-1, day)
  }
  

 const trainingStartDate = getDateObject(2023, 12, 21)
 console.log(trainingStartDate);


 console.log(trainingStartDate.toString().split(/\s+/));


