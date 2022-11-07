import { url_backend } from "../url.js";
import { validationUpdateProfile } from '../helpers/validation.js';

const form = document.getElementById('form');
const nameV = document.getElementById('name');
const lastnameV = document.getElementById('lastname');
const dniV = document.getElementById('dni');
const emailV = document.getElementById('email');
const passwordV = document.getElementById('password');
const phoneV = document.getElementById('phone');

document.addEventListener('DOMContentLoaded', loadProfile);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  eventUpdate();
});

const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

async function loadProfile() {
  if (!token) return;
  const id = localStorage.getItem('id');

  try {
    await fetch(`${url_backend}/api/employees/profile/${id}`, config)
      .then((answer) => answer.json())
      .then((results) => {
        completeResults(results);
      });
  } catch (e) {
    console.log(e);
  }
}

function completeResults(results) {
  const { name, lastname, dni, email, phone } = results;

  nameV.value = name;
  lastnameV.value = lastname;
  dniV.value = dni;
  emailV.value = email;
  phoneV.value = phone;

  const name_profile = document.getElementById('name-profile');
  const email_profile = document.getElementById('email-profile');
  const namePublic = document.querySelector('.nav__profile-name');

  name_profile.textContent = name;
  email_profile.textContent = email;
  namePublic.textContent = `${name} ${lastname}`;
}

function eventUpdate() {
  if (!token) return;
  const id = localStorage.getItem('id');

  const name = nameV.value;
  const lastname = lastnameV.value;
  const password = passwordV.value;
  const phone = phoneV.value;

  try {
    if (validationUpdateProfile(name, lastname, password, phone)) {
      fetch(
        `${url_backend}/api/employees/profile/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ name, lastname, password, phone }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        config
      );
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}

// Complements
const inputs = document.querySelectorAll('.form__input');
inputs.forEach((input) => {
  input.addEventListener('focus', inputFocus);
  input.addEventListener('blur', noInputFocus);
});

function inputFocus(e) {
  const div = e.target.parentNode;
  div.classList.add('field__data-focus');
}

function noInputFocus(e) {
  const div = e.target.parentNode;
  div.classList.remove('field__data-focus');
}
