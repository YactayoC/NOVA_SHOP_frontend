const divData = document.querySelector(".table__data");

document.addEventListener("DOMContentLoaded", loadData);

async function loadData() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(`http://localhost:4000/api/employees/profile`, config)
      .then((answer) => answer.json())
      .then((results) => {
        dataPublic(results);
      });
  } catch (e) {
    console.log(e);
  }
}

function dataPublic(results) {
  const { name, lastname } = results;
  const namePublic = document.querySelector(".nav__profile-name");
  namePublic.textContent = `${name} ${lastname}`;
}
