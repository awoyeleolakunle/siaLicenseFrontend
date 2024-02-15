document.addEventListener("DOMContentLoaded", () => {
  let trainingType;

  const querryParam = new URLSearchParams(window.location.search);

  trainingType = querryParam.get("course");

  if (trainingType) {
    console.log(
      "i got in here and the training type is present : ",
      trainingType
    );
    fetchAllCenterAvailableTrainingSessionUnderATrainingType(
      trainingType.trim()
    );
  }
});

const fetchAllCenterAvailableTrainingSessionUnderATrainingType = (
  trainingType
) => {
  console.log("I'm the training Type :", trainingType);

  fetch(
    `${siaLicenseBaseUrl}/api/v1/sialicence+/trainingSession/allAvailableTrainingSessionUnderTrainingType?trainingType=${encodeURIComponent(
      trainingType
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      console.log("I'm the response recieved : ", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new error("Unauthorized access or Network Failed");
      }
    })
    .then((data) => {
      displayTrainingSessions(data);
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
};

const displayTrainingSessions = (listOfTraining) => {
  console.log(listOfTraining);

  const searchResult = document.getElementById("searchResultId");

  searchResult.textContent = `Search result (${listOfTraining.length})`;

  const listContainer = document.getElementById("listContainerId");
  listContainer.innerHTML = "";

  let trainingStartDate, trainingEndDate;

  listOfTraining.forEach((trainingSession, index) => {
    if (trainingSession.startDate) {
      const splitedRecievedStartDate = trainingSession.startDate.split("-");

      const objectValueOfStartDate = getDateObject(
        splitedRecievedStartDate[0],
        splitedRecievedStartDate[1],
        splitedRecievedStartDate[2]
      );

      console.log("I'm the value here : ", objectValueOfStartDate);
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
    listItem.className = "welcome";
    listItem.innerHTML = `
        
        <h3 class="page__title">${trainingSession.centerName} </h3>
		<div class="cards cards--11">
				<div class="card__icon"><img src="../assets/images/icons/blue/home.svg" alt="" title=""></div>${
          trainingSession.centerAddress
        } 
                <br>${trainingSession.centerCity} <br>United Kingdom
		 </div>

		</p> <p><div class="post-details__date">Level 2 ${
      trainingSession.trainingType
    } Training</div>  
              <div class="cards cards--11">
			  <div class="card">
				  <div class="card__details">
					  <h4 class="card__title">${trainingStartDate
              .splice(0, 4)
              .join(" ")} <p> ${trainingEndDate.splice(0, 4).join(" ")} </h4>					  
				  </div>
				  <div class="card__details">
					  <h4 class="card__title">${trainingSession.numberOfSlots} slots left</h4>
				  </div>
					<div  class="card__more"><a class="button button--blue button--ex-small"   href= "#"  >Book Now!</a></div> <p>
			  </div>
              </div>`;

    listContainer.appendChild(listItem);
  });

  listContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("button--blue")) {
      event.preventDefault();
      const listItem = event.target.closest(".welcome");
      const index = Array.from(listItem.parentNode.children).indexOf(listItem);
      const selectedTrainingSession = listOfTraining[index];
      window.location.href = `booking.html?trainingSession=${encodeURIComponent(
        JSON.stringify(selectedTrainingSession)
      )}`;
    }
  });
};

const getDateObject = (year, month, day) => {
  return new Date(year, month - 1, day);
};

const bookNow = (event, listOfTraining, index) => {
  event.preventDefault();
  const selectedTrainingSession = listOfTraining[index];
  window.location.href = `booking.html?trainingSession=${encodeURIComponent(
    selectedTrainingSession
  )}`;
};
