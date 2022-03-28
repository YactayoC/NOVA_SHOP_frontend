const ulList = document.querySelector(".clients__list");
const divCard = document.querySelector(".card__content.card__clients");
const quantityClient = document.querySelector(".quantity__client");

const divSpinner = document.createElement("div");

document.addEventListener("DOMContentLoaded", loadClients);

async function loadClients() {
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

    await fetch(
      "https://sleepy-eyrie-36824.herokuapp.com/api/employees/clients-summary",
      config
    )
      .then((answer) => answer.json())
      .then((results) => {
        divSpinner.style.display = "none";
        showClients(results);
        showQuantity(results);
      });
  } catch (e) {
    console.log(e);
  }
}

function showClients(results) {
  results.forEach((result) => {
    createHTML(result);
  });
}

function showQuantity(results) {
  quantityClient.textContent = results.length;
}

function createHTML(result) {
  const { lastname, email } = result;

  const liData = document.createElement("li");
  liData.classList.add("client__item");

  const divData = document.createElement("div");
  divData.classList.add("client__data");

  const img = document.createElement("img");
  img.classList.add("client__image");
  img.src = "../../img/profile.jpg";

  const divInfo = document.createElement("div");
  divInfo.classList.add("client__info");

  const pLastName = document.createElement("p");
  pLastName.classList.add("client__name");
  pLastName.textContent = lastname;

  const spanEmail = document.createElement("span");
  spanEmail.classList.add("client__email");
  spanEmail.textContent = email;

  ulList.appendChild(liData);
  liData.appendChild(divData);
  divData.appendChild(img);
  divData.appendChild(divInfo);
  divInfo.appendChild(pLastName);
  divInfo.appendChild(spanEmail);
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

  divSpinner.style.margin = "0 auto";
  ulList.appendChild(divSpinner);
}
