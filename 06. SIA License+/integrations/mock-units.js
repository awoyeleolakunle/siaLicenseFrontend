const startButtons = document.querySelectorAll(".post__more");

startButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const postDetails = button.parentElement;
    let postTitle = postDetails
      .querySelector(".post__title a")
      .innerHTML.toUpperCase();
    postTitle = postTitle.replace(/ /g, "_");
    alert(postTitle);
    sessionStorage.setItem("selectedExamType", JSON.stringify(postTitle));
    window.location.href = "mock-instructions.html";
  });
});
