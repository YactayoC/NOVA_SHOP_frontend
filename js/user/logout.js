const exit = document.querySelector(".button__logout");

exit.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  localStorage.removeItem("lastname");
  localStorage.removeItem("id");
  window.location.href = "login.html";
}
