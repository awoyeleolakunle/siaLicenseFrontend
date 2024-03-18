const sendCenterRgistrationDetailsToBackend = () => {
  const emailAddress = document.getElementById("emailAddressId").value;
  const password = document.getElementById("passwordId").value;

  if (!emailAddress.trim() || !password.trim()) {
    toast("Email Address and Password are required", 4000);
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(emailAddress)) {
    toast("Invalid Email Address", 4000);
    return;
  }

  const centerRequest = {
    centerName: document.getElementById("centerNameId").value,
    emailAddress: document.getElementById("emailAddressId").value,
    address: document.getElementById("addressId").value,
    password: document.getElementById("passwordId").value,
    city: document.getElementById("cityId").value,
    postCode: document.getElementById("postCodeId").value,
  };

  console.log(centerRequest);
  fetch(`${siaLicenseBaseUrl}/api/v1/sialicence+/center/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(centerRequest),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else if (response.status == 400) {
        return response.json();
      } else if (response.status === 401) {
        return response.json();
      } else {
        throw new Error("Network Failed");
      }
    })
    .then((data) => {
      if (data && data.status == 401) {
        throw new Error(data.data);
      } else if (data && data.status == 400) {
        throw new Error(data.data);
      } else if (data && data.data) {
        const jwtToken = data.data;
        userRole(jwtToken, centerRequest);
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

const userRole = (jwtToken, centerRequest) => {
  const [, payloadBase64] = jwtToken.split(".");
  const payloadJSON = atob(payloadBase64);
  const payload = JSON.parse(payloadJSON);
  const userRoles = payload.roles;

  if (userRoles[0] === "CENTER") {
    sessionStorage.setItem("siaLicense+Token", JSON.stringify(jwtToken));
    sessionStorage.setItem(
      "centerEmailAddress",
      JSON.stringify(centerRequest.emailAddress)
    );
    const userType = "center";
    sessionStorage.setItem("userType", userType);

    window.location.href = "/06. SIA License+/index-landing.html";
  }
};

const centerSignUpBtn = document.getElementById("submitId");
centerSignUpBtn.addEventListener("click", () => {
  sendCenterRgistrationDetailsToBackend();
});
