import eventSearch from '../helpers/searchInput.js';

const divData = document.querySelector('.table__data');
const divSpinner = document.createElement('div');

const formSearch = document.getElementById('form-search');

const quantityClients = document.getElementById('all');

document.addEventListener('DOMContentLoaded', loadClients);

async function loadClients() {
  spinner();

  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch('https://novashopbackend-production.up.railway.app/api/employees/clients', config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = 'none';
        showResults(results);
        formSearch.addEventListener('submit', (e) => {
          e.preventDefault();
          eventSearch();
        });
      });
  } catch (e) {
    console.log(e);
  }
}

function showResults(results) {
  quantityClients.textContent = results.length;
  results.forEach((result) => {
    createHTML(result);
  });
}

function createHTML(result) {
  const { name, lastname, dni, email, phone, district } = result;

  const ulData = document.createElement('ul');
  ulData.classList.add('data__items', 'data__gap');

  const liImg = document.createElement('li');
  liImg.classList.add('data__profile');

  const img = document.createElement('img');
  img.src = '../../img/profile.jpg';

  const liName = document.createElement('li');
  liName.classList.add('data__name');
  liName.textContent = name;

  const liLastName = document.createElement('li');
  liLastName.classList.add('data__lastname');
  liLastName.textContent = lastname;

  const liDNI = document.createElement('li');
  liDNI.classList.add('data__dni');
  liDNI.textContent = dni;

  const liEmail = document.createElement('li');
  liEmail.classList.add('data__email');
  liEmail.textContent = email;

  const liPhone = document.createElement('li');
  liPhone.classList.add('data__phone');
  liPhone.textContent = phone;

  const liDistrict = document.createElement('li');
  liDistrict.classList.add('data__district');
  liDistrict.textContent = district;

  liImg.appendChild(img);

  ulData.appendChild(liImg);
  ulData.appendChild(liName);
  ulData.appendChild(liLastName);
  ulData.appendChild(liDNI);
  ulData.appendChild(liEmail);
  ulData.appendChild(liPhone);
  ulData.appendChild(liDistrict);

  divData.appendChild(ulData);
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
