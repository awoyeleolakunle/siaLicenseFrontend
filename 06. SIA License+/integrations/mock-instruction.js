const startMockTestBtn = document.getElementById("startMockTestId");

const courseTitle = document.getElementById("courseTitleId");
courseTitle.innerHTML = JSON.parse(sessionStorage.getItem("selectedExamType"))
  ?.trim()
  .replace(/_/g, " ");

startMockTestBtn.addEventListener("click", () => {
  window.location.href = "/06. SIA License+/mock-test/mock-question.html";
});
