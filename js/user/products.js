import { url_backend } from "../url.js";

const productsCard = document.querySelector('.products__card');
const divSpinner = document.createElement('div');

const formSearch = document.getElementById('form-search');
const formSelect = document.getElementById('form-select');

const buttonLogin = document.querySelector('.button__login');
const buttonRegister = document.querySelector('.button__register');
const buttonProfile = document.querySelector('.button__profile');
const buttonLogout = document.querySelector('.button__logout');

document.addEventListener('DOMContentLoaded', loadProducts);

let articles = JSON.parse(localStorage.getItem('products')) || [];

const productObj = {
  category: '',
};

const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

if (!token) {
  buttonLogin.classList.remove('button--hide');
  buttonRegister.classList.remove('button--hide');
  buttonProfile.classList.add('button--hide');
  buttonLogout.classList.add('button--hide');
} else {
  const name = localStorage.getItem('name');
  const lastname = localStorage.getItem('lastname');
  buttonLogin.classList.add('button--hide');
  buttonRegister.classList.add('button--hide');
  buttonProfile.classList.remove('button--hide');
  buttonProfile.innerHTML = `<span class="material-icons">&#xe853;</span> ${name} ${lastname}`;
  buttonLogout.classList.remove('button--hide');
}

async function loadProducts() {
  spinner();
  try {
    await fetch(`${url_backend}/api/user/products`, config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = 'none';
        showResults(results);
        formSearch.addEventListener('keyup', (e) => {
          e.preventDefault();
          eventSearch();
        });
        formSelect.addEventListener('change', (e) => {
          e.preventDefault();
          productObj.category = e.target.value;
          filterProduct(results);
        });
      });

    generateButtons();
  } catch (error) {
    console.log(error);
  }
}

function generateButtons() {
  const cardAdds = document.querySelectorAll('.card__add');
  const modal = document.querySelector('.modal');
  cardAdds.forEach((card) => {
    card.addEventListener('click', () => {
      modal.classList.add('modal__active');
      modal.classList.remove('modal__hide');
      const modalImg = document.querySelector('.modal__img img');
      const modalInfo = document.querySelector('.info__product');

      modalImg.src = '../../img/products/aorus-k1.png';
      modalInfo.textContent = card.parentElement.children[2].children[0].textContent;

      // Add product array
      const infoProduct = {
        id: card.parentElement.dataset.id,
        img: '../../img/products/aorus-k1.png',
        price: card.parentElement.children[2].children[1].children[1].children[0].textContent,
        name: card.parentElement.children[2].children[0].textContent,
        quantity: 1,
      };

      const exist = articles.some((article) => article.id === infoProduct.id);
      if (exist) {
        const products = articles.map((article) => {
          if (article.id === infoProduct.id) {
            article.quantity++;
            return article;
          } else {
            return article;
          }
        });
        articles = [...products];
      } else {
        articles = [...articles, infoProduct];
      }

      setTimeout(() => {
        modal.classList.remove('modal__active');
      }, 3000);

      localStorage.setItem('products', JSON.stringify(articles));
    });
  });
}

function showResults(results) {
  results.forEach((result) => {
    createHTML(result);
  });
}

function createHTML(result) {
  const { _id, name, quantity, price } = result;

  const divCard = document.createElement('div');
  divCard.dataset.id = _id;
  divCard.classList.add('card');

  const divCardAdd = document.createElement('div');
  divCardAdd.classList.add('card__add');
  divCardAdd.innerHTML = '<span class="material-icons">&#xe145;</span>';

  const divCardImg = document.createElement('div');
  divCardImg.classList.add('card__img');
  const img = document.createElement('img');
  img.src = '../../img/products/aorus-k1.png';
  divCardImg.appendChild(img);

  const divCardInfo = document.createElement('div');
  divCardInfo.classList.add('card__info');
  const infoTitle = document.createElement('h4');
  infoTitle.classList.add('product__title');
  infoTitle.textContent = name;
  const divProductDescription = document.createElement('div');
  divProductDescription.classList.add('product__description');
  const productStock = document.createElement('p');
  productStock.classList.add('product__stock');
  productStock.textContent = `Stock: ${quantity}`;
  const productPrice = document.createElement('p');
  productPrice.classList.add('product__price');
  productPrice.textContent = `$ `;
  const priceValue = document.createElement('span');
  priceValue.textContent = `${price}`;
  productPrice.appendChild(priceValue);

  divProductDescription.appendChild(productStock);
  divProductDescription.appendChild(productPrice);
  divCardInfo.appendChild(infoTitle);
  divCardInfo.appendChild(divProductDescription);

  divCard.appendChild(divCardAdd);
  divCard.appendChild(divCardImg);
  divCard.appendChild(divCardInfo);

  productsCard.appendChild(divCard);
}

function eventSearch() {
  const cards = document.querySelectorAll('.card');
  const inputSearch = document.getElementById('input-search');
  const inputValue = inputSearch.value;
  const search__heading = document.querySelector('.search__heading');

  cards.forEach((data) => {
    data.style.display = 'block';
    search__heading.classList.remove('display-none');
    search__heading.textContent = `Results for: ${inputValue}`;
    if (!data.children[2].children[0].textContent.includes(inputValue)) {
      data.style.display = 'none';
    }

    if (inputValue === '') {
      search__heading.classList.add('display-none');
    }
  });
}

function filterProduct(results) {
  const result = results.filter(filterCategory);
  if (result.length) {
    createHTML2(result);
  }
}

function filterCategory(product) {
  const { category } = productObj;
  if (category) {
    return product.category === category;
  }
  return product;
}

function createHTML2(results) {
  clearHTML();
  results.forEach((result) => {
    createHTML(result);
  });
}

function clearHTML() {
  while (productsCard.firstChild) {
    productsCard.removeChild(productsCard.firstChild);
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

  productsCard.appendChild(divSpinner);
}
