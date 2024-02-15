const startMockTestBtn = document.getElementById("startMockTestId");

const createMockTest = () => {
  const examCreationRequest = {
    applicantEmailAddress: sessionStorage
      .getItem("applicantEmailAddress")
      ?.trim(),
    examType: JSON.parse(sessionStorage.getItem("selectedExamType"))?.trim(),
  };

  console.log(examCreationRequest);
  try {
    fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/exam/examCreation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(examCreationRequest),
    }).then((response) => {
      if (response.ok) {
        window.href.location = "mock-question.html";
      }
    });
  } catch (error) {
    console.log(error.message);
    {
      toast.error(error.message);
    }
  }
};

startMockTestBtn.addEventListener("click", createMockTest);
