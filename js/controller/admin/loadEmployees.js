// const divData = document.querySelector(".table__data");

// document.addEventListener("DOMContentLoaded", loadClients);

// async function loadClients(e) {
//   e.preventDefault();

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     await fetch("http://localhost:4000/api/employees/employees", config)
//       .then((answer) => answer.json())
//       .then((results) => showResults(results));
//   } catch (e) {
//     console.log(e);
//   }
// }

// function showResults(results) {
//   results.forEach((result) => {
//     createHTML(result);
//   });
// }

// function createHTML(result) {
//   const { name, lastname, email, phone } = result;

//   const ulData = document.createElement("ul");
//   ulData.classList.add("data__items", "data__gap");

//   const liName = document.createElement("li");
//   liName.classList.add("data__name");
//   liName.textContent = name;

//   const liLastName = document.createElement("li");
//   liLastName.classList.add("data__lastname");
//   liLastName.textContent = lastname;

//   const liDNI = document.createElement("li");
//   liDNI.classList.add("data__dni");
//   liDNI.textContent = "74433077";

//   const liEmail = document.createElement("li");
//   liEmail.classList.add("data__email");
//   liEmail.textContent = email;

//   const liPhone = document.createElement("li");
//   liPhone.classList.add("data__phone");
//   liPhone.textContent = phone;

//   const liDistrict = document.createElement("li");
//   liDistrict.classList.add("data__district");
//   liDistrict.textContent = "Chilca";

//   ulData.appendChild(liName);
//   ulData.appendChild(liLastName);
//   ulData.appendChild(liDNI);
//   ulData.appendChild(liEmail);
//   ulData.appendChild(liPhone);
//   ulData.appendChild(liDistrict);

//   divData.appendChild(ulData);
// }
