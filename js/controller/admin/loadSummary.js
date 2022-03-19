const ulList = document.querySelector(".clients__list");

document.addEventListener("DOMContentLoaded", loadClients);

async function loadClients(e) {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch("http://localhost:4000/api/employees/clients", config)
      .then((answer) => answer.json())
      .then((results) => {
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
  const quantityClient = document.querySelector(".quantity__client");
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
