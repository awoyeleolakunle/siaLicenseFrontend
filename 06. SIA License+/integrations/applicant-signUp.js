const sendApplicantRegistrationRequest = () => {
  const emailAddress = document.getElementById("emailAddressId").value;
  const password = document.getElementById("passwordId").value;

  if (!emailAddress.trim() || !password.trim()) {
    toast("Email Address and Password are required", 4000);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailAddress)) {
    toast("Invalid Email Address", 4000);
    return;
  }

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
      if (data && data.status == 400) {
        throw new Error(data.data);
      } else if (data && data.data) {
        const jwtToken = data.data;
        userRole(jwtToken, applicantRequest);
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

const userRole = (jwtToken, applicantRequest) => {
  const [, payloadBase64] = jwtToken.split(".");
  const payloadJSON = atob(payloadBase64);
  const payload = JSON.parse(payloadJSON);
  const userRoles = payload.roles;

  console.log(userRoles);

  console.log(userRoles[0]);

  if (userRoles[0] === "APPLICANT") {
    sessionStorage.setItem("siaLicence+Token", JSON.stringify(jwtToken));
    sessionStorage.setItem(
      "applicantEmailAddress",
      JSON.stringify(applicantRequest.emailAddress)
    );

    window.location.href = "/06. SIA License+/index-landing.html";
  }
};

const applicantSignUpBtn = document.getElementById("submitId");
applicantSignUpBtn.addEventListener("click", (event) => {
  event.preventDefault();

  sendApplicantRegistrationRequest();
});
