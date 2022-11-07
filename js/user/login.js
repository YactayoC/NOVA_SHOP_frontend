import { url_backend } from "../url.js";
import { validationLogin } from '../helpers/validation.js';
import { addToken } from '../helpers/optionToken.js';

const form = document.getElementById('form');
const emailData = document.getElementById('email');
const passwordData = document.getElementById('password');

const modal = document.querySelector('.modal');
const infoText = document.querySelector('.info__text .info__product');

form.addEventListener('submit', login);

async function login(e) {
  e.preventDefault();

  const email = emailData.value;
  const password = passwordData.value;

  if (validationLogin(email, password)) {
    await fetch(`${url_backend}/api/user/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((answer) => answer.json())
      .then((result) => {
        infoText.textContent = result.msg;
        addToken(result);
      });

    modal.classList.add('modal__active');
    modal.classList.remove('modal__hide');
    setTimeout(() => {
      modal.classList.remove('modal__active');
    }, 3000);
  } else {
    infoText.textContent = 'Empty fields';
    modal.classList.add('modal__active');
    modal.classList.remove('modal__hide');
    setTimeout(() => {
      modal.classList.remove('modal__active');
    }, 3000);
  }
}
