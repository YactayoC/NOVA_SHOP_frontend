const modalClose = document.querySelector(".modal__close");

modalClose.addEventListener("click", () => {
  modalClose.parentElement.parentElement.classList.add("modal__hide");
});
