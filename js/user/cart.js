import { url_backend } from "../url.js";
let articles = JSON.parse(localStorage.getItem('products')) || [];
const divCartBody = document.getElementById('cart');

const h3 = document.querySelector('.form__heading.form__heading-cart');

const buttonLogin = document.querySelector('.button__login');
const buttonRegister = document.querySelector('.button__register');
const buttonProfile = document.querySelector('.button__profile');
const buttonLogout = document.querySelector('.button__logout');
const buttonBuy = document.querySelector('.form__button');

const token = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

buttonBuy.addEventListener('click', (e) => {
  e.preventDefault();
  const card = document.getElementById('card');
  const date = document.getElementById('date');
  const code = document.getElementById('code');
  const district = document.getElementById('district');

  if (!token) {
    window.location.href = 'cart.html';
    return;
  }

  if (card.value.length === 16 && date.value !== '' && code.value.length === 3 && district.value !== '') {
    sendDistrict(district.value);
    window.location.href = 'ticket.html';
  }
});

document.addEventListener('DOMContentLoaded', loadProducts(articles));

// Profile
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

// functions
async function sendDistrict(district) {
  if (!token) return;
  const id = localStorage.getItem('id');
  await fetch(
    `${url_backend}/api/user/cart/${id}`,
    {
      method: 'POST',
      body: JSON.stringify({ district }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
    config
  );
}

function loadProducts(products) {
  products.forEach((product) => {
    createHTML(product);
  });
  const subTotals = document.querySelectorAll('.cart__products-subtotal span');
  let val = 0;
  subTotals.forEach((sub) => {
    val = val + Number(sub.textContent);
    h3.textContent = `Total to Pay $ ${val}`;
  });
  deleteProduct();
}

function createHTML(product) {
  const { id, img, quantity, name, price } = product;

  const ul = document.createElement('ul');
  ul.classList.add('cart__products');

  const liImg = document.createElement('li');
  liImg.classList.add('cart__products-img');

  const Vimg = document.createElement('img');
  Vimg.src = img;
  liImg.appendChild(Vimg);

  const liName = document.createElement('li');
  liName.classList.add('cart__products-name');
  liName.textContent = name;

  const liQuantity = document.createElement('li');
  liQuantity.classList.add('cart__products-quantity');
  liQuantity.textContent = quantity;

  const liPrice = document.createElement('li');
  liPrice.classList.add('cart__products-price');
  liPrice.textContent = `$ ${price}`;

  const liSubTotal = document.createElement('li');
  liSubTotal.classList.add('cart__products-subtotal');
  liSubTotal.textContent = `$`;
  const priceValue = document.createElement('span');
  priceValue.textContent = `${price * quantity}`;
  liSubTotal.appendChild(priceValue);

  const liRemove = document.createElement('li');
  liRemove.classList.add('cart__products-remove');
  liRemove.dataset.id = id;
  liRemove.innerHTML = '<span class="material-icons">&#xe872;</span>';

  ul.appendChild(liImg);
  ul.appendChild(liName);
  ul.appendChild(liQuantity);
  ul.appendChild(liPrice);
  ul.appendChild(liSubTotal);
  ul.appendChild(liRemove);
  divCartBody.appendChild(ul);
}

function deleteProduct() {
  const removes = document.querySelectorAll('.cart__products-remove');
  removes.forEach((remove) => {
    remove.addEventListener('click', () => {
      console.log(remove.parentElement.children[4].children[0].textContent);
      const productId = remove.dataset.id;
      articles = articles.filter((article) => article.id !== productId);
      localStorage.setItem('products', JSON.stringify(articles));
      window.location.reload();
    });
  });
}
