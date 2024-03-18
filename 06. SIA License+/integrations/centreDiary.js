document.addEventListener("DOMContentLoaded", function () {
  fetchCenterAllTrainingSessionsFromBackend();

  flatpickr("#startDateId", {
    dateFormat: "Y-m-d",
    enableTime: false,
    altInput: true,
    altFormat: "F j, Y",
  });

  flatpickr("#endDateId", {
    dateFormat: "Y-m-d",
    enableTime: false,
    altInput: true,
    altFormat: "F j, Y",
  });
});

const token = JSON.parse(sessionStorage.getItem("siaLicense+Token")).trim();

function fetchCenterAllTrainingSessionsFromBackend() {
  const token = JSON.parse(sessionStorage.getItem("siaLicense+Token")).trim();

  const emailAddress = JSON.parse(
    sessionStorage.getItem("centerEmailAddress")
  ).trim();

  fetch(
    `${siaLicenseBaseUrl}/api/v1/sialicence+/center/aCenterAllTrainingSessions?emailAddress=${encodeURIComponent(
      emailAddress
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
      } else if (response.status === 401) {
        return response.json();
      } else if (response.status === 400) {
        return response.json();
      } else {
        console.log(response);
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      if (data && data.status === 401) {
        throw new Error(data.data);
      } else if (data && data.status === 400) {
        throw new Error(data.data);
      } else {
        if (data && data.data) {
          displayACenterAllTrainingSessions(data.data);
        }
      }
    })
    .catch((error) => {
      if (error.message) {
        {
          toast(error.message, 4000);
        }
      } else {
        {
          toast("Network Failed");
        }
      }
    });
}

const trainingType = document.getElementById("trainingTypeId");

const createDateObject = (year, month, day) => {
  return new Date(year, month - 1, day);
};

const sendTrainingcreationObjectToBackend = () => {
  const startDate = document.getElementById("startDateId").value.split("-");
  const endDate = document.getElementById("endDateId").value.split("-");

  const emailAddress = JSON.parse(sessionStorage.getItem("centerEmailAddress"));

  const trainingSessionRequest = {
    centerEmailAddress: emailAddress,
    startDate: createDateObject(startDate[0], startDate[1], startDate[2]),
    endDate: createDateObject(endDate[0], endDate[1], endDate[2]),
    trainingFee: Number(document.getElementById("feeId").value),
    numberOfSlots: Number(document.getElementById("slotsId").value),
    trainingType: document.getElementById("trainingTypeId").value,
  };

  fetch(
    `${siaLicenseBaseUrl}/api/v1/sialicence+/center/createTrainingSession`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(trainingSessionRequest),
    }
  )
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 401) {
        return response.json();
      } else if (response.status === 400) {
        return response.json();
      } else {
        throw new Error("Unsuccessful");
      }
    })
    .then((data) => {
      if (data && data.status == 401) {
        throw new Error(data.data);
      } else if (data && data.statusCode === 400) {
        throw new Error(data.data);
      } else if (data && data.data) {
        {
          toast(data.data, 4000);
        }
      } else {
        throw new Error("Unsuccessful");
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

const createTraininBtn = document.getElementById("createTraininBtnId");
createTraininBtn.addEventListener("click", sendTrainingcreationObjectToBackend);

function displayACenterAllTrainingSessions(listOfACenterTrainingSessions) {
  const trainingSessionListContainer = document.getElementById(
    "trainingSessionListId"
  );
  trainingSessionListContainer.innerHTML = " ";

  let trainingStartDate, trainingEndDate;

  if (listOfACenterTrainingSessions.length !== 0) {
    listOfACenterTrainingSessions.forEach((trainingSession, index) => {
      if (trainingSession.startDate) {
        const splitedRecievedStartDate = trainingSession.startDate.split("-");

        const objectValueOfStartDate = getDateObject(
          splitedRecievedStartDate[0],
          splitedRecievedStartDate[1],
          splitedRecievedStartDate[2]
        );

        trainingStartDate = objectValueOfStartDate.toString().split(/\s+/);
      }

      if (trainingSession.endDate) {
        const splitedRecievedEndDate = trainingSession.endDate.split("-");

        const objectValueOfEndDate = getDateObject(
          splitedRecievedEndDate[0],
          splitedRecievedEndDate[1],
          splitedRecievedEndDate[2]
        );
        trainingEndDate = objectValueOfEndDate.toString().split(/\s+/);
      }

      const listItem = document.createElement("div");
      listItem.className = "card";

      listItem.innerHTML = `
      
          <div class="card__details">
            <h4 class="card__title"> ${trainingStartDate
              .splice(0, 4)
              .join(" ")}  <p><p>  ${trainingEndDate
        .splice(0, 4)
        .join(" ")}</h4>     
          </div>
          
          <div class="card__details">
              <h4 class="card__title">${
                trainingSession.numberOfSlots
              } slots left</h4>
          </div>
      `;
      trainingSessionListContainer.appendChild(listItem);
    });
  }
}

const getDateObject = (year, month, day) => {
  return new Date(year, month - 1, day);
};
