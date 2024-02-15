const startButtons = document.querySelectorAll(".post__more");

startButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const postDetails = button.parentElement;
    const postTitle = postDetails.querySelector(".post__title a").innerHTML;
    // const postTitle = postDetails.querySelector("h4").innerHTML;
    alert(postTitle);
    sessionStorage.setItem("selectedExamType", JSON.stringify(postTitle));
    window.location.href = "mock-instructions.html";
  });
});
