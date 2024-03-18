document.addEventListener("DOMContentLoaded", () => {
  const userType = sessionStorage.getItem("userType");

  if (userType && userType === "applicant") {
    const userTypeRendering = document.getElementById("userTypeDisplayId");

    const newSpan = document.createElement("span");
    newSpan.innerText = "Profile";

    const imgIcon = document.createElement("img");
    imgIcon.src = "/06. SIA License+/assets/images/icons/white/my-profile.png";

    userTypeRendering.innerHTML = "";
    userTypeRendering.appendChild(imgIcon);
    userTypeRendering.appendChild(newSpan);

    userTypeRendering.addEventListener("click", () => {
      window.location.href = "#";
    });
  }
});
