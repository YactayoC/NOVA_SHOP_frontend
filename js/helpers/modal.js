const buttonAddEmployee = document.getElementById("add-employee");
const buttonAddProduct = document.getElementById("add-product");

const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".material-icons--close");
if (window.location.href.includes("Products")) {
  buttonAddProduct.addEventListener("click", addProduct);
} else {
  buttonAddEmployee.addEventListener("click", addEmployee);
}

modalClose.addEventListener("click", closeModal);

function addEmployee() {
  modal.classList.remove("modal--hide");
}

function addProduct() {
  modal.classList.remove("modal--hide");
}

function updateEmployee() {
  modal.classList.remove("modal--hide");
}

function closeModal() {
  modal.classList.add("modal--hide");
}
