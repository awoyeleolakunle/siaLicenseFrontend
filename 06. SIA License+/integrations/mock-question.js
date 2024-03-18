document.addEventListener("DOMContentLoaded", () => {
  let listOfQuestionsDetails = {
    listOfQuestions: [],
    examId: 0,
  };

  const token = JSON.parse(sessionStorage.getItem("siaLicense+Token"))?.trim();
  if (!token) {
    window.location.href = "/06. SIA License+/login.html";
  }

  createMockTest(listOfQuestionsDetails, token);
  document.getElementById("courseTitleId").innerHTML = JSON.parse(
    sessionStorage.getItem("selectedExamType")
  )
    ?.trim()
    .replace(/_/g, " ");
});

const createMockTest = (listOfQuestionsDetails, token) => {
  let courseTitle = JSON.parse(
    sessionStorage.getItem("selectedExamType")
  )?.trim();
  if (
    courseTitle === "WORKING_IN_THE_PRIVATE_SECURITY_INDUSTRY_(COMMON_UNIT)"
  ) {
    courseTitle = "WORKING_IN_THE_PRIVATE_SECURITY_INDUSTRY";
  }

  const examCreationRequest = {
    applicantEmailAddress: JSON.parse(
      sessionStorage.getItem("applicantEmailAddress")
    )?.trim(),
    examType: courseTitle.trim(),
  };

  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/exam/examCreation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(examCreationRequest),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error("Failed to create exam");
      }
    })
    .then((data) => {
      listOfQuestionsDetails.listOfQuestions = data.data.listOfShuffledQuestion;
      listOfQuestionsDetails.examId = data.data.examId;

      populateQuestionsAndOptions(
        listOfQuestionsDetails.listOfQuestions,
        listOfQuestionsDetails.examId,
        token
      );
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        toast("Connection failed", 4000);
      } else if (error.message) {
        {
          toast(error.message, 4000);
        }
      } else {
        {
          toast("Network Failed");
        }
      }
    });
};

const populateQuestionsAndOptions = (listOfQuestions, examId, token) => {
  const questionsContainer = document.getElementById("questionContainerId");
  questionsContainer.innerHTML = "";

  listOfQuestions?.forEach((questionObj, questionIndex) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("form");

    const questionHeading = document.createElement("h3");
    questionHeading.classList.add("pb-20", "pt-20");
    questionHeading.textContent = `${questionIndex + 1}. ${
      questionObj.question
    }`;
    questionDiv.appendChild(questionHeading);

    questionObj.listOfOptions.forEach((option, optionIndex) => {
      const optionDiv = document.createElement("div");
      optionDiv.classList.add("radio-option", "radio-option--full");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question_${questionIndex}`;
      input.id = `op${questionIndex}_${optionIndex}`;
      input.value = optionIndex + 1;

      input.addEventListener("click", () => {
        sendOptionPickedToTheBackend(option, questionObj.id, examId, token);
      });

      const label = document.createElement("label");
      label.htmlFor = `op${questionIndex}_${optionIndex}`;
      label.textContent = option;

      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
      questionDiv.appendChild(optionDiv);
    });

    questionsContainer.appendChild(questionDiv);
  });
};

const sendOptionPickedToTheBackend = (
  optionPicked,
  questionId,
  examId,
  token
) => {
  const answerSuppliedToQuestionRequest = {
    examId: examId,
    questionId: questionId,
    answerSupplied: optionPicked.trim(),
  };

  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/exam/answerSupplyToQuestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(answerSuppliedToQuestionRequest),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        throw new Error(data.data);
      } else {
        if (response.status === 400) throw new Error("Option already chosen");
      }
    })
    .catch((error) => {
      if (error instanceof TypeError) {
        toast("Connection failed", 4000);
      } else if (error.message) {
        {
          toast(error.message, 4000);
        }
      } else {
        {
          toast("Something went wrong");
        }
      }
    });
};
