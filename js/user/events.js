const print = document.querySelector("#print");
const close = document.querySelector("#close");
const logo = document.querySelector("#logo");

close.addEventListener("click", redHome);
logo.addEventListener("click", redHome);

print.addEventListener("click", printPage);

function redHome() {
  location.href = "home.html";
  localStorage.removeItem("products");
}

function printPage() {
  window.print();
}
