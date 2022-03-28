document.addEventListener("DOMContentLoaded", loadData);

async function loadData() {
  try {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    await fetch(
      `https://sleepy-eyrie-36824.herokuapp.com/api/employees/profile/${id}`,
      config
    )
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
