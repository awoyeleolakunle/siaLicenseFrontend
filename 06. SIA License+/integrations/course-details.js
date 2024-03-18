let course;

const querryParam = new URLSearchParams(window.location.search);
const encodedParam = querryParam.get("course");

if (encodedParam) {
  course = encodedParam;
}

const searchBooking = document.getElementById("searchBookingId");
const courseName = document.getElementById("courseNameId");
courseName.innerHTML = course;

const allBookingLine = document.querySelectorAll(
  ".caption__more.button.button--small.button--blue"
);

allBookingLine.forEach((bookingLine) => {
  bookingLine.addEventListener("click", (e) => {
    e.preventDefault();
    const encodedCourse = encodeURIComponent(course);
    const url = `search-booking.html?course=${encodedCourse}`;
    window.location.href = url;
  });
});
