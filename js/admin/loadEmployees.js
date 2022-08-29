import eventSearch from '../helpers/searchInput.js';
import { validationFormEmployee, validationUpdateFormEmployee } from '../helpers/validation.js';

// public
const divData = document.querySelector('.table__data');
const divSpinner = document.createElement('div');

// search
const formSearch = document.getElementById('form-search');

// quantity employee
const quantityEmployees = document.getElementById('all');

// modal
const form = document.getElementById('form-modal');
const headingModal = document.querySelector('.modal__heading--text');
const buttonOptionEmployee = document.querySelector('.form__input-submit');

// Event
const buttonAddEmployee = document.getElementById('add-employee');
buttonAddEmployee.addEventListener('click', formEmployeeAdd);

// Onload
document.addEventListener('DOMContentLoaded', loadEmployees);

const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

async function loadEmployees() {
  spinner();
  if (!token) return;

  try {
    await fetch('https://novashopbackend-production.up.railway.app/api/employees/employees', config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = 'none';
        showResults(results);
        formSearch.addEventListener('submit', (e) => {
          e.preventDefault();
          eventSearch();
        });
      });

    generateButtons();
  } catch (e) {
    console.log(e);
  }
}

function showResults(results) {
  quantityEmployees.textContent = results.length;
  results.forEach((result) => {
    createHTML(result);
  });
}

function createHTML(result) {
  const { _id, name, dni, email, phone } = result;

  const ulData = document.createElement('ul');
  ulData.classList.add('data__items', 'data__items-employees');

  const liImg = document.createElement('li');
  liImg.classList.add('data__profile');

  const img = document.createElement('img');
  img.src = '../../img/profile.jpg';

  const liName = document.createElement('li');
  liName.classList.add('data__name');
  liName.textContent = name;

  const liDNI = document.createElement('li');
  liDNI.classList.add('data__dni');
  liDNI.textContent = dni;

  const liEmail = document.createElement('li');
  liEmail.classList.add('data__email');
  liEmail.textContent = email;

  const liPhone = document.createElement('li');
  liPhone.classList.add('data__phone');
  liPhone.textContent = phone;

  const liEdit = document.createElement('li');
  liEdit.dataset.id = _id;
  liEdit.classList.add('data__edit');

  const spanEdit = document.createElement('span');
  spanEdit.innerHTML = '<span class="material-icons">&#xe3c9;</span>';

  const liRemove = document.createElement('li');
  liRemove.dataset.id = _id;
  liRemove.classList.add('data__remove');

  const spanRemove = document.createElement('span');
  spanRemove.innerHTML = '<span class="material-icons">&#xe872;</span>';

  liImg.appendChild(img);
  liEdit.appendChild(spanEdit);
  liRemove.appendChild(spanRemove);

  ulData.appendChild(liImg);
  ulData.appendChild(liName);
  ulData.appendChild(liDNI);
  ulData.appendChild(liEmail);
  ulData.appendChild(liPhone);
  ulData.appendChild(liEdit);
  ulData.appendChild(liRemove);
  divData.appendChild(ulData);
}

// OPTIONS EMPLOYEE
const nameV = document.getElementById('name');
const lastnameV = document.getElementById('lastname');
const dniV = document.getElementById('dni');
const emailV = document.getElementById('email');
const passwordV = document.getElementById('password');
const phoneV = document.getElementById('phone');

function generateButtons() {
  const modal = document.querySelector('.modal');

  const buttonsEdit = document.querySelectorAll('.data__edit');
  buttonsEdit.forEach((buttonEdit) => {
    const idEmployee = buttonEdit.dataset.id;
    buttonEdit.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('modal--hide');
      formEmployeeEdit(idEmployee);
    });
  });

  const buttonsRemove = document.querySelectorAll('.data__remove');
  buttonsRemove.forEach((buttonRemove) => {
    const idEmployee = buttonRemove.dataset.id;
    buttonRemove.addEventListener('click', (e) => {
      e.preventDefault();
      deleteEmployee(idEmployee);
    });
  });
}

function formEmployeeAdd() {
  buttonOptionEmployee.value = 'Add';
  buttonOptionEmployee.dataset.option = 'add';
  headingModal.textContent = 'Add Employee';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addEmployee();
  });
  form.reset();
}

function formEmployeeEdit(id) {
  buttonOptionEmployee.value = 'Update';
  buttonOptionEmployee.dataset.option = 'update';
  headingModal.textContent = 'Update Employee';
  getEmployee(id);
  form.reset();
}

async function addEmployee() {
  if (!token) return;

  const name = nameV.value;
  const lastname = lastnameV.value;
  const dni = dniV.value;
  const email = emailV.value;
  const password = passwordV.value;
  const phone = phoneV.value;
  try {
    if (validationFormEmployee(name, lastname, dni, email, password, phone)) {
      await fetch(
        'https://novashopbackend-production.up.railway.app/api/employees/employees',
        {
          method: 'POST',
          body: JSON.stringify({ name, lastname, dni, email, password, phone }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        config
      );
    }
    window.location.href = 'adminEmployees.html';
  } catch (error) {
    console.log(error);
  }
}

async function getEmployee(idEmployee) {
  if (!token) return;

  dniV.disabled = true;
  emailV.disabled = true;

  try {
    await fetch(`https://novashopbackend-production.up.railway.app/api/employees/employee/${idEmployee}`, config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = 'none';
        nameV.value = results.name;
        lastnameV.value = results.lastname;
        dniV.value = results.dni;
        emailV.value = results.email;
        phoneV.value = results.phone;
        const id = results._id;
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          updateEmployee(id);
        });
      });

    generateButtons();
  } catch (e) {
    console.log(e);
  }
}

async function updateEmployee(idEmployee) {
  if (!token) return;

  const name = nameV.value;
  const lastname = lastnameV.value;
  const password = passwordV.value;
  const phone = phoneV.value;

  try {
    if (validationUpdateFormEmployee(name, lastname, password, phone)) {
      await fetch(
        `https://novashopbackend-production.up.railway.app/api/employees/employee/${idEmployee}`,
        {
          method: 'PUT',
          body: JSON.stringify({ name, lastname, password, phone }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        config
      );
    }
    window.location.href = 'adminEmployees.html';
  } catch (error) {
    console.log(error);
  }
}

async function deleteEmployee(idEmployee) {
  if (!token) return;

  try {
    await fetch(
      `https://novashopbackend-production.up.railway.app/api/employees/employee/${idEmployee}`,
      {
        method: 'DELETE',
      },
      config
    );

    window.location.href = 'adminEmployees.html';
  } catch (error) {
    console.log(error);
  }
}

function spinner() {
  divSpinner.innerHTML = `
    <div class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>`;

  divSpinner.style.margin = '2rem auto';
  divData.appendChild(divSpinner);
}
