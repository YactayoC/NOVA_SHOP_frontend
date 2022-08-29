const swiperWrapper = document.querySelector('.swiper-wrapper');
const divSpinner = document.createElement('div');

const buttonLogin = document.querySelector('.button__login');
const buttonRegister = document.querySelector('.button__register');
const buttonProfile = document.querySelector('.button__profile');
const buttonLogout = document.querySelector('.button__logout');

document.addEventListener('DOMContentLoaded', loadProducts);
let articles = JSON.parse(localStorage.getItem('products')) || [];

// Profile
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

// Functions
async function loadProducts() {
  spinner();
  try {
    await fetch('https://novashopbackend-production.up.railway.app/api/user/home', config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = 'none';
        showResults(results);
      });
    generateButtons();
  } catch (error) {
    console.error(error);
  }
}

function showResults(results) {
  results.forEach((result) => {
    createHTML(result);
  });
}

function createHTML(result) {
  const { _id, name, quantity, price } = result;

  const divSwiper = document.createElement('div');
  divSwiper.classList.add('swiper-slide');

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

  divSwiper.appendChild(divCard);
  swiperWrapper.appendChild(divSwiper);
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
      console.log(card.parentElement.children[2].children[1].children[1].children[0].textContent);
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

  divSpinner.style.display = 'flex';
  divSpinner.style.margin = '0 auto';
  divSpinner.style.width = '5rem';
  divSpinner.style.padding = '2rem';
  swiperWrapper.appendChild(divSpinner);
}
