const sendQuestionCreationRequestToBackend = () => {
  const listOfOptions = [];
  const option1 = document.getElementById("option1Id").value.trim();
  const option2 = document.getElementById("option2Id").value.trim();
  const option3 = document.getElementById("option3Id").value.trim();
  const option4 = document.getElementById("option4Id").value.trim();

  listOfOptions.push(option1);
  listOfOptions.push(option2);
  listOfOptions.push(option3);
  listOfOptions.push(option4);

  const questionCreationRequest = {
    examType: document.getElementById("examTypeId").value.trim(),
    question: document.getElementById("questionId").value.trim(),
    listOfOptions: listOfOptions,
    correctOption: document.getElementById("correctOptionId").value.trim(),
  };

  const token = JSON.parse(sessionStorage.getItem("siaLicense+Token"));

  console.log(questionCreationRequest);
  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/question/questionCreation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(questionCreationRequest),
  })
    .then((response) => {
      console.log(response);
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 401) {
        return response.json();
      } else if (response.status === 400) {
        return response.json();
      } else {
        throw new Error("Network Failed");
      }
    })
    .then((data) => {
      if (data && data.status === 400) {
        throw new Error(data.data);
      } else if (data && data.status === 401) {
        throw new Error(data.data);
      } else if (data && data.data) {
        {
          toast(data.data, 4000);
        }
      } else {
        throw new Error("Network Failed");
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
          toast("Network Failed");
        }
      }
    });
};

const submitBtn = document.getElementById("submitBtnId");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendQuestionCreationRequestToBackend();
});
