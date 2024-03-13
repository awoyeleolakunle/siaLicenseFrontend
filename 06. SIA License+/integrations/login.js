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
        console.log("I'm ok");
        return response.json();
      } else if (response.status === 400) {
        return response.json();
      } else {
        throw new Error("Network Failed");
      }
    })
    .then((data) => {
      console.log("I'm the data : ", data);
      if (data && data.status == 400) {
        throw new Error(data.data);
      } else if (data && data.data) {
        jwtToken = data.data;
        console.log("i'm the dat in data " + jwtToken);
        userRole(jwtToken, loginRequest);
      }
    })

    .catch((error) => {
      console.log("I'm the error  ", error);
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

  if (userRoles[0] === "CENTER") {
    //setCookie('siaLicence+Token', jwtToken)
    sessionStorage.setItem("siaLicense+Token", JSON.stringify(jwtToken));
    sessionStorage.setItem("centerEmailAddress", loginRequest.emailAddress);

    window.location.href = "index.html";
    // sendOtPForVerification(fullName);
  } else {
    if (userRoles[0] === "APPLICANT") {
      console.log("I'm  the applicant ");

      // setCookie('siaLicence+Token', jwtToken)

      sessionStorage.setItem("siaLicense+Token", JSON.stringify(jwtToken));
      sessionStorage.setItem(
        "applicantEmailAddress",
        loginRequest.emailAddress
      );

      const userType = "applicant";

      sessionStorage.setItem("userType", userType);

      window.location.href = "/06. SIA License+/index-landing.html";
      //    ?applicant=${encodeURIComponent(userType)}`;
    } else {
      // setCookie('siaLicence+Token', jwtToken)
      sessionStorage.setItem("siaLicense+Token", JSON.stringify(jwtToken));
      sessionStorage.setItem("adminEmailAddress", loginRequest.emailAddress);
      window.location.href = "blog.html";
    }
  }
};

const signInBtn = document.getElementById("submitId");

signInBtn.addEventListener("click", (event) => {
  event.preventDefault();

  console.log("Yes I've been clicked");
  sendLoginRequestToBackend();
});
