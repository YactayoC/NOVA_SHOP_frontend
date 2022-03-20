import eventSearch from "../../helpers/searchInput.js";

const divData = document.querySelector(".table__data");
const divSpinner = document.createElement("div");

const formSearch = document.getElementById("form-search");

const quantityProducts = document.getElementById("all");

document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
  spinner();

  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch("http://localhost:4000/api/employees/products", config)
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = "none";
        showResults(results);
        formSearch.addEventListener("submit", (e) => {
          e.preventDefault();
          eventSearch();
        });
      });
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
  const { _id, name, price, quantity } = result;

  const ulData = document.createElement("ul");
  ulData.classList.add("data__items", "data__items-products");

  const liImg = document.createElement("li");
  liImg.classList.add("data__image");

  const img = document.createElement("img");
  img.src = "../../img/products/aorus-k1.webp";

  const liName = document.createElement("li");
  liName.classList.add("data__name");
  liName.textContent = name;

  const liStock = document.createElement("li");
  liStock.classList.add("data__stock");
  liStock.textContent = quantity;

  const liPrice = document.createElement("li");
  liPrice.classList.add("data__price");
  liPrice.textContent = `$ ${price}`;

  const liCategory = document.createElement("li");
  liCategory.classList.add("data__category");
  liCategory.textContent = "Keyboard";

  const liEdit = document.createElement("li");
  liEdit.dataset.id = _id;
  liEdit.classList.add("data__edit");

  const spanEdit = document.createElement("span");
  spanEdit.innerHTML = '<span class="material-icons">&#xe3c9;</span>';

  const liRemove = document.createElement("li");
  liRemove.dataset.id = _id;
  liRemove.classList.add("data__remove");

  const spanRemove = document.createElement("span");
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

  divSpinner.style.margin = "2rem auto";
  divData.appendChild(divSpinner);
}
