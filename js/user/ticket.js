const products = JSON.parse(localStorage.getItem("products")) || [];
const table = document.querySelector(".ticket__table");
const Ttotal = document.querySelector(".ticket__total");
const client = document.querySelector(".content__client");

document.addEventListener("DOMContentLoaded", showResults(products));

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "home.html";
}

const nameClient = localStorage.getItem("name");
const lastnameClient = localStorage.getItem("lastname");
client.textContent = `Client: ${nameClient} ${lastnameClient}`;

function showResults(products) {
  let total = 0;
  products.forEach((product) => {
    createHTML(product);
    total = total + Number(product.price) * Number(product.quantity);
    Ttotal.textContent = `TOTAL: $ ${total}`;
  });
}

function createHTML(product) {
  const { name, price, quantity } = product;

  const ul = document.createElement("ul");
  ul.classList.add("table__body");

  const liName = document.createElement("li");
  liName.textContent = name;

  const liPrice = document.createElement("li");
  liPrice.textContent = `$ ${price}`;

  const liQuantity = document.createElement("li");
  liQuantity.textContent = quantity;

  const liSubTotal = document.createElement("li");
  liSubTotal.textContent = `$ ${quantity * price}`;

  ul.appendChild(liName);
  ul.appendChild(liQuantity);
  ul.appendChild(liPrice);
  ul.appendChild(liSubTotal);

  table.appendChild(ul);
}
