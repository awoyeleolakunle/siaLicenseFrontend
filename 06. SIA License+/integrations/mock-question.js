document.addEventListener("DOMContentLoaded", () => {
  const listOfQuestionsDetails = JSON.parse(
    sessionStorage.getItem("listOfQuestions")
  );

  console.log(listOfQuestionsDetails);
  populateQuestionsAndOptions(
    listOfQuestionsDetails,
    listOfQuestionsDetails.examId
  );
});

const populateQuestionsAndOptions = (listOfQuestions, examId) => {
  const questionsContainer = document.getElementById("questionContainerId");
  questionsContainer.innerHTML = "";

  listOfQuestions.listOfQuestions.forEach((questionObj, questionIndex) => {
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
        sendOptionPickedToTheBackend(option, questionObj.id, examId);
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

const sendOptionPickedToTheBackend = (optionPicked, questionId, examId) => {
  console.log("Im the question ID : ", questionId);
  console.log("I'm the option picked : ", optionPicked);
  console.log("I'm the exam Id : ", examId);

  const answerSuppliedToQuestionRequest = {
    examId: examId,
    questionId: questionId,
    answerSupplied: optionPicked,
  };

  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/exam/answerSupplyToQuestion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answerSuppliedToQuestionRequest),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) throw new Error("Option already chosen");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
