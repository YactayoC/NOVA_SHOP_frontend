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

export { validationLogin, validationRegister };
