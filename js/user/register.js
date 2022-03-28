import { validationRegister } from "../helpers/validation.js";

const form = document.getElementById("form");
const nameData = document.getElementById("name");
const lastnameData = document.getElementById("lastname");
const dniData = document.getElementById("dni");
const phoneData = document.getElementById("phone");
const emailData = document.getElementById("email");
const passwordData = document.getElementById("password");

const modal = document.querySelector(".modal");
const infoText = document.querySelector(".info__text .info__product");

form.addEventListener("submit", register);

async function register(e) {
  e.preventDefault();

  const name = nameData.value;
  const lastname = lastnameData.value;
  const dni = dniData.value;
  const phone = phoneData.value;
  const email = emailData.value;
  const password = passwordData.value;

  if (validationRegister(name, lastname, dni, phone, email, password)) {
    await fetch("https://sleepy-eyrie-36824.herokuapp.com/api/user/register", {
      method: "POST",
      body: JSON.stringify({ name, lastname, dni, phone, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((answer) => answer.json())
      .then((result) => {
        infoText.textContent = result.msg;
      });

    modal.classList.add("modal__active");
    modal.classList.remove("modal__hide");
    setTimeout(() => {
      modal.classList.remove("modal__active");
    }, 3000);

    form.reset();
  } else {
    infoText.textContent = "Empty fields";
    modal.classList.add("modal__active");
    modal.classList.remove("modal__hide");
    setTimeout(() => {
      modal.classList.remove("modal__active");
    }, 3000);
  }
}
