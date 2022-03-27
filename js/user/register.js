import { validationRegister } from "../helpers/validation.js";

const form = document.getElementById("form");
const nameData = document.getElementById("name");
const lastnameData = document.getElementById("lastname");
const dniData = document.getElementById("dni");
const phoneData = document.getElementById("phone");
const emailData = document.getElementById("email");
const passwordData = document.getElementById("password");

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
    await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      body: JSON.stringify({ name, lastname, dni, phone, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((answer) => answer.json())
      .then((result) => {
        console.log(result.msg);
      });
  }
}
