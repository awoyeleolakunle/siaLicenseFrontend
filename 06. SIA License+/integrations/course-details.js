let course;

console.log("I got in ");
const querryParam = new URLSearchParams(window.location.search);
const encodedParam = querryParam.get("course");

console.log("i'm the encoded : " + encodedParam);
if (encodedParam) {
  console.log("I got in as encoded");
  course = encodedParam;
  console.log(" I'm the course : " + course);
}

const searchBooking = document.getElementById("searchBookingId");

const allBookingLine = document.querySelectorAll(
  ".caption__more.button.button--small.button--blue"
);

allBookingLine.forEach((bookingLine) => {
  bookingLine.addEventListener("click", (e) => {
    e.preventDefault();
    const encodedCourse = encodeURIComponent(course); // Assuming 'course' is defined somewhere in your code
    const url = `search-booking.html?course=${encodedCourse}`;
    window.location.href = url;
  });
});

// searchBooking.addEventListener('click', (e)=>{
//     e.preventDefault();
//     const encodedCourse = encodeURIComponent(course);
//     const url = `search-booking.html?course=${encodedCourse}`;
//     window.location.href = url;
// })
