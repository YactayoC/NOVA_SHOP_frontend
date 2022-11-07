import { url_backend } from "../url.js";
import { validationLogin } from '../helpers/validation.js';
import { addTokenAdmin } from '../helpers/optionToken.js';

const form = document.getElementById('form');
const emailData = document.getElementById('email');
const passwordData = document.getElementById('password');

form.addEventListener('submit', login);

async function login(e) {
  e.preventDefault();

  const email = emailData.value;
  const password = passwordData.value;

  if (validationLogin(email, password)) {
    await fetch(`${url_backend}/api/employees/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((answer) => answer.json())
      .then((result) => {
        addTokenAdmin(result);
      });
  }
}
