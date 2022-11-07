import { url_backend } from "../url.js";
import { validationFormProduct } from '../helpers/validation.js';

import eventSearch from '../helpers/searchInput.js';

const divData = document.querySelector('.table__data');
const divSpinner = document.createElement('div');

const formSearch = document.getElementById('form-search');

const quantityProducts = document.getElementById('all');

const form = document.getElementById('form-modal--product');
const headingModal = document.querySelector('.modal__heading--text');
const buttonOptionProduct = document.querySelector('.form__input-submit');

const buttonAddProduct = document.getElementById('add-product');
buttonAddProduct.addEventListener('click', formProductAdd);

document.addEventListener('DOMContentLoaded', loadProducts);

const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

async function loadProducts() {
  spinner();
  if (!token) return;

  try {
    await fetch(`${url_backend}/api/employees/products`, config)
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
  quantityProducts.textContent = results.length;
  results.forEach((result) => {
    createHTML(result);
  });
}

function createHTML(result) {
  const { _id, name, price, quantity, category } = result;

  const ulData = document.createElement('ul');
  ulData.classList.add('data__items', 'data__items-products');

  const liImg = document.createElement('li');
  liImg.classList.add('data__image');

  const img = document.createElement('img');
  img.src = '../../img/products/aorus-k1.png';

  const liName = document.createElement('li');
  liName.classList.add('data__name');
  liName.textContent = name;

  const liStock = document.createElement('li');
  liStock.classList.add('data__stock');
  liStock.textContent = quantity;

  const liPrice = document.createElement('li');
  liPrice.classList.add('data__price');
  liPrice.textContent = `$ ${price}`;

  const liCategory = document.createElement('li');
  liCategory.classList.add('data__category');
  liCategory.textContent = category;

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
  ulData.appendChild(liStock);
  ulData.appendChild(liPrice);
  ulData.appendChild(liCategory);
  ulData.appendChild(liEdit);
  ulData.appendChild(liRemove);
  divData.appendChild(ulData);
}

// OPTIONS PRODUCTS
const nameV = document.getElementById('name');
const priceV = document.getElementById('price');
const stockV = document.getElementById('stock');
const descriptionV = document.getElementById('description');
const categoryV = document.getElementById('category');

function generateButtons() {
  const modal = document.querySelector('.modal');

  const buttonsEdit = document.querySelectorAll('.data__edit');
  buttonsEdit.forEach((buttonEdit) => {
    const idProduct = buttonEdit.dataset.id;
    buttonEdit.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('modal--hide');
      formProductEdit(idProduct);
    });
  });

  const buttonsRemove = document.querySelectorAll('.data__remove');
  buttonsRemove.forEach((buttonRemove) => {
    const idProduct = buttonRemove.dataset.id;
    buttonRemove.addEventListener('click', (e) => {
      e.preventDefault();
      deleteProduct(idProduct);
    });
  });
}

function formProductAdd() {
  buttonOptionProduct.value = 'Add';
  buttonOptionProduct.dataset.option = 'add';
  headingModal.textContent = 'Add Product';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    addProduct();
  });
  form.reset();
}
function formProductEdit(id) {
  buttonOptionProduct.value = 'Update';
  buttonOptionProduct.dataset.option = 'update';
  headingModal.textContent = 'Update Product';
  getProduct(id);
  form.reset();
}

async function addProduct() {
  if (!token) return;

  const name = nameV.value;
  const price = priceV.value;
  const stock = stockV.value;
  const description = descriptionV.value;
  const category = categoryV.value;
  try {
    if (validationFormProduct(name, price, stock, description, category)) {
      await fetch(
        '${url_backend}/api/employees/products',
        {
          method: 'POST',
          body: JSON.stringify({
            name,
            price,
            quantity: stock,
            description,
            category,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        config
      );
    }
    window.location.href = 'adminProducts.html';
  } catch (error) {
    console.log(error);
  }
}

async function getProduct(idProduct) {
  if (!token) return;

  try {
    await fetch(`${url_backend}/api/employees/product/${idProduct}`, config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = 'none';
        nameV.value = results.name;
        priceV.value = results.price;
        stockV.value = results.quantity;
        descriptionV.value = results.description;
        categoryV.value = results.category;
        const id = results._id;
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          updateProduct(id);
        });
      });

    generateButtons();
  } catch (e) {
    console.log(e);
  }
}

async function updateProduct(idProduct) {
  if (!token) return;

  const name = nameV.value;
  const price = priceV.value;
  const stock = stockV.value;
  const description = descriptionV.value;
  const category = categoryV.value;

  try {
    if (validationFormProduct(name, price, stock, description, category)) {
      await fetch(
        `${url_backend}/api/employees/product/${idProduct}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            name,
            price,
            quantity: stock,
            description,
            category,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        config
      );
    }
    window.location.href = 'adminProducts.html';
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(idProduct) {
  if (!token) return;

  try {
    await fetch(
      `${url_backend}/api/employees/product/${idProduct}`,
      {
        method: 'DELETE',
      },
      config
    ).then((results) => console.log(results));

    window.location.href = 'adminProducts.html';
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
