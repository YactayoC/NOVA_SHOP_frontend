const divData = document.querySelector(".table__data");
const divSpinner = document.createElement("div");

document.addEventListener("DOMContentLoaded", loadClients);

async function loadClients() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(`http://localhost:4000/api/employees/profile`, config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = "none";
        completeResults(results);
      });
  } catch (e) {
    console.log(e);
  }
}

function completeResults(results) {
  const { name, lastname, dni, email, password, phone } = results;
  const nameV = document.getElementById("name");
  const lastnameV = document.getElementById("lastname");
  const dniV = document.getElementById("dni");
  const emailV = document.getElementById("email");
  const passwordV = document.getElementById("password");
  const phoneV = document.getElementById("phone");

  const name_profile = document.getElementById("name-profile");
  const email_profile = document.getElementById("email-profile");
  const namePublic = document.querySelector(".nav__profile-name");
  nameV.value = name;
  lastnameV.value = lastname;
  dniV.value = dni;
  emailV.value = email;
  passwordV.value = password;
  phoneV.value = phone;

  name_profile.textContent = name;
  email_profile.textContent = email;

  namePublic.textContent = `${name} ${lastname}`;
}

const inputs = document.querySelectorAll(".form__input");
inputs.forEach((input) => {
  input.addEventListener("focus", inputFocus);
  input.addEventListener("blur", noInputFocus);
});

function inputFocus(e) {
  const div = e.target.parentNode;
  div.classList.add("field__data-focus");
}

function noInputFocus(e) {
  const div = e.target.parentNode;
  div.classList.remove("field__data-focus");
}
