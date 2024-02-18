const startMockTestBtn = document.getElementById("startMockTestId");

let listOfQuestionsDetails = {
  listOfQuestions: [],
  examId: 0,
};

const createMockTest = () => {
  const examCreationRequest = {
    applicantEmailAddress: sessionStorage
      .getItem("applicantEmailAddress")
      ?.trim(),
    examType: JSON.parse(sessionStorage.getItem("selectedExamType"))?.trim(),
  };

  console.log("I'm the exam object ", examCreationRequest);
  try {
    fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/exam/examCreation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(examCreationRequest),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          return response.json();
        } else {
          throw new Error(`Failed to create exam: ${response.status}`);
        }
      })
      .then((data) => {
        console.log("I got here");
        console.log("Response data:", data);

        console.log(data.data);
        listOfQuestionsDetails.listOfQuestions =
          data.data.listOfShuffledQuestion;
        listOfQuestionsDetails.examId = data.data.examId;

        console.log("I'm the listOfQuestion : ", listOfQuestionsDetails);
        clearCorrectOption(listOfQuestionsDetails.listOfQuestions);
        sessionStorage.setItem(
          "listOfQuestions",
          JSON.stringify(listOfQuestionsDetails)
        );
        window.location.href = "mock-question.html";
      })
      .catch((error) => {
        console.error("Failed to create exam:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

startMockTestBtn.addEventListener("click", createMockTest);
const clearCorrectOption = (listOfQuestions) => {
  listOfQuestions.forEach((question) => {
    question.correctOption = "";
  });
};
