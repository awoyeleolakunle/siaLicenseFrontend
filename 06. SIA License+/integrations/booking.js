document.addEventListener("DOMContentLoaded", function () {
  const applicantEmailAddress = JSON.parse(
    sessionStorage.getItem("applicantEmailAddress")
  );

  fetchApplicantDetailsFromBackend(applicantEmailAddress.trim());

  fetchApplicantDetailsFromBackend();
});

let selectedTrainingSession,
  trainingStartDate,
  trainingEndDate,
  applicantEmailAddress,
  trainingId,
  centerEmailAddress;

applicantEmailAddress = JSON.parse(
  sessionStorage.getItem("applicantEmailAddress")
).trim();

const querryParam = new URLSearchParams(window.location.search);
const encodedParam = querryParam.get("trainingSession");
selectedTrainingSession = JSON.parse(encodedParam);
trainingId = selectedTrainingSession.id;

const token = JSON.parse(sessionStorage.getItem("siaLicense+Token")).trim();

const getDateObject = (year, month, day) => {
  return new Date(year, month - 1, day);
};

if (selectedTrainingSession.startDate) {
  const splitedRecievedStartDate = selectedTrainingSession.startDate.split("-");

  const objectValueOfStartDate = getDateObject(
    splitedRecievedStartDate[0],
    splitedRecievedStartDate[1],
    splitedRecievedStartDate[2]
  );

  trainingStartDate = objectValueOfStartDate.toString().split(/\s+/);
}

if (selectedTrainingSession.endDate) {
  const splitedRecievedEndDate = selectedTrainingSession.endDate.split("-");

  const objectValueOfEndDate = getDateObject(
    splitedRecievedEndDate[0],
    splitedRecievedEndDate[1],
    splitedRecievedEndDate[2]
  );
  trainingEndDate = objectValueOfEndDate.toString().split(/\s+/);
}

console.log(selectedTrainingSession);

document.getElementById("trainingTypeId").value =
  selectedTrainingSession.trainingType;
document.getElementById("centerNameId").value =
  selectedTrainingSession.centerName;
document.getElementById("startDateAndEndDateId").value = `${trainingStartDate
  .splice(0, 4)
  .join("-")}  to   ${trainingEndDate.splice(0, 4).join("-")}`;

document.getElementById("firstNameId").value;

const proceedBtn = document.getElementById("proceedId");

proceedBtn.addEventListener("click", (event) => {
  event.preventDefault();
  sendBookTrainingRequestToBackend();
});

const sendBookTrainingRequestToBackend = () => {
  const bookTrainingSessionRequest = {
    trainingId: trainingId,
    applicantEmailAddress: applicantEmailAddress,
    centerEmailAddress: selectedTrainingSession.centerEmailAddress,
  };

  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/applicant/bookTraining`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(bookTrainingSessionRequest),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 401) {
        return response.json();
      } else if (response.status === 400) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      if (data && data.status === 401) {
        throw new Error(data.data);
      } else if (data && data.statusCode === 400) {
        throw new Error(data.data);
      } else if (data && data.data) {
        {
          toast(data.data, 4000);
        }
      } else {
        throw new Error("Something went wrong");
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

const fetchApplicantDetailsFromBackend = (applicantEmailAddress) => {
  fetch(
    `${siaLicenseBaseUrl}/api/v1/sialicence+/applicant/applicantDetails?applicantEmailAddress=${encodeURIComponent(
      applicantEmailAddress.trim()
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      autoFillApplicantDetails(data.data);
    })
    .catch((error) => {
      if (error.message) {
        {
          toast(error.meaasge, 4000);
        }
      } else {
        {
          toast("Network Failed");
        }
      }
    });
};

const autoFillApplicantDetails = (applicantDetails) => {
  document.getElementById("firstNameId").value =
    applicantDetails.user.firstName;
  document.getElementById("lastNameId").value = applicantDetails.user.lastName;
  document.getElementById("emailAddressId").value =
    applicantDetails.user.emailAddress;
};
