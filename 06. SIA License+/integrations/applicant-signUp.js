const sendApplicantRegistrationRequest = () => {
  console.log("I entered here yess");

  const applicantRequest = {
    emailAddress: document.getElementById("emailAddressId").value,
    password: document.getElementById("passwordId").value,
    firstName: document.getElementById("firstNameId").value,
    lastName: document.getElementById("lastNameId").value,
    postCode: document.getElementById("postCodeId").value,
    address: document.getElementById("addressId").value,
    city: document.getElementById("cityId").value,
  };
  console.log(applicantRequest);

  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/applicant/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(applicantRequest),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status === 400) {
        return response.json();
      } else {
        console.log(response);
        throw new Error("Unsuccessful");
      }
    })
    .then((data) => {
      if (data && data.statusCode == 400) {
        throw new Error(data.data);
      } else if (data && data.data) {
        const jwtToken = data.data;
        userRole(jwtToken, applicantRequest);
      } else {
        throw new Error("Unsuccessful");
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
};

const userRole = (jwtToken, applicantRequest) => {
  const [, payloadBase64] = jwtToken.split(".");
  const payloadJSON = atob(payloadBase64);
  const payload = JSON.parse(payloadJSON);
  const userRoles = payload.roles;

  console.log(userRoles);

  console.log(userRoles[0]);

  if (userRoles[0] === "CENTER") {
    console.log("I'm in here ", userRoles[0]);

    sessionStorage.setItem("siaLicensc+Token", JSON.stringify(jwtToken));
    sessionStorage.setItem(
      "centerEmailAddress",
      applicantRequestt.emailAddress
    );

    window.location.href = "index.html";
    // sendOtPForVerification(fullName);
  } else {
    if (userRole[0] === "APPLICANT") {
      // sessionStorage.setItem('siaLicence+Token', JSON.stringify(jwtToken));
      sessionStorage.setItem(
        "applicantEmailAddress",
        applicantRequest.emailAddress
      );

      window.location.href = "index.html";
    }
  }
};

const applicantSignUpBtn = document.getElementById("submitId");
console.log("I'm the submit btn :" + applicantSignUpBtn);
applicantSignUpBtn.addEventListener("click", (event) => {
  event.preventDefault();

  // console.log("Yes I've been clicked");
  sendApplicantRegistrationRequest();
});
