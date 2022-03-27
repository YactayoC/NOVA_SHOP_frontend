const exit = document.getElementById("side-exit");

exit.addEventListener("click", logout);

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
}
