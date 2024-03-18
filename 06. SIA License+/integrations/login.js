let jwtToken;

const sendLoginRequestToBackend = () => {
  const loginRequest = {
    emailAddress: document.getElementById("emailAddressId").value,
    password: document.getElementById("passwordId").value,
  };

  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginRequest),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      if (data && data.status == 400) {
        throw new Error(data.data);
      } else if (data && data.data) {
        jwtToken = data.data;
        userRole(jwtToken, loginRequest);
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
          toast("Invalid credentials");
        }
      }
    });
};

const userRole = (jwtToken, loginRequest) => {
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + value + expires + "; path=/; secure; HttpOnly";

    console.log("Cookie set:", value);

    console.log(document.cookie);
  }

  const [, payloadBase64] = jwtToken.split(".");
  const payloadJSON = atob(payloadBase64);
  const payload = JSON.parse(payloadJSON);

  const userRoles = payload.roles;

  let userType;

  if (userRoles[0] === "CENTER") {
    //setCookie('siaLicence+Token', jwtToken)
    sessionStorage.setItem("siaLicense+Token", JSON.stringify(jwtToken));
    sessionStorage.setItem(
      "centerEmailAddress",
      JSON.stringify(loginRequest.emailAddress)
    );

    userType = "center";
    sessionStorage.setItem("userType", userType);

    window.location.href = "/06. SIA License+/index-landing.html";
  } else {
    if (userRoles[0] === "APPLICANT") {
      // setCookie('siaLicence+Token', jwtToken)

      sessionStorage.setItem("siaLicense+Token", JSON.stringify(jwtToken));
      sessionStorage.setItem(
        "applicantEmailAddress",
        JSON.stringify(loginRequest.emailAddress)
      );
      userType = "applicant";
      sessionStorage.setItem("userType", userType);
      window.location.href = "/06. SIA License+/index-landing.html";
    } else {
      // setCookie('siaLicence+Token', jwtToken)
      sessionStorage.setItem("siaLicense+Token", JSON.stringify(jwtToken));
      sessionStorage.setItem(
        "adminEmailAddress",
        JSON.stringify(loginRequest.emailAddress)
      );
      window.location.href =
        "/06. SIA License+/admin/admin/html/sia-dashboard.html";
    }
  }
};

const signInBtn = document.getElementById("submitId");

signInBtn.addEventListener("click", (event) => {
  event.preventDefault();
  sendLoginRequestToBackend();
});
