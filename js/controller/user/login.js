import { validationLogin } from "../../helpers/validation.js";
import { addToken } from "../../helpers/optionToken.js";

const form = document.getElementById("form");
const emailData = document.getElementById("email");
const passwordData = document.getElementById("password");

form.addEventListener("submit", login);

async function login(e) {
  e.preventDefault();

  const email = emailData.value;
  const password = passwordData.value;

  if (validationLogin(email, password)) {
    await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((answer) => answer.json())
      .then((result) => {
        addToken(result);
      });
  }
}
