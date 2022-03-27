function validationLogin(email, password) {
  if ([email, password].includes("") || (email, password).trim() === "") {
    return false;
  } else {
    return true;
  }
}

function validationRegister(name, lastname, dni, phone, email, password) {
  if (
    [name, lastname, dni, phone, email, password].includes("") ||
    (name, lastname, dni, phone, email, password).trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
}

function validationUpdateProfile(name, lastname, phone, password) {
  if (
    [name, lastname, phone, password].includes("") ||
    (name, lastname, phone, password).trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
}

function validationFormEmployee(name, lastname, dni, email, password, phone) {
  if (
    [name, lastname, dni, email, password, phone].includes("") ||
    (name, lastname, dni, email, password, phone).trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
}

function validationUpdateFormEmployee(name, lastname, password, phone) {
  if (
    [name, lastname, password, phone].includes("") ||
    (name, lastname, password, phone).trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
}

function validationFormProduct(name, price, stock, description, category) {
  if (
    [name, price, stock, description, category].includes("") ||
    (name, price, stock, description, category).trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
}

export {
  validationLogin,
  validationRegister,
  validationUpdateProfile,
  validationFormEmployee,
  validationUpdateFormEmployee,
  validationFormProduct,
};
