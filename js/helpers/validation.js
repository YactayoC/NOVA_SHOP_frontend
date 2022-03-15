function validationLogin(email, password) {
  if ([email, password].includes("") || (email, password).trim() === "") {
    return false;
  } else {
    return true;
  }
}

function validationRegister(name, lastname, phone, email, password) {
  if (
    [name, lastname, phone, email, password].includes("") ||
    (name, lastname, phone, email, password).trim() === ""
  ) {
    return false;
  } else {
    return true;
  }
}

export { validationLogin, validationRegister };
