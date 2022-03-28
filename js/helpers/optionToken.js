function addToken(result) {
  if (!result.token) {
    return;
  }

  localStorage.setItem("name", result.name);
  localStorage.setItem("lastname", result.lastname);
  localStorage.setItem("id", result._id);
  localStorage.setItem("token", result.token);
  window.location.href = "./home.html";
}

function addTokenAdmin(result) {
  if (!result.token) {
    return;
  }

  localStorage.setItem("token", result.token);
  localStorage.setItem("id", result._id);
  window.location.href = "adminSummary.html";
}

export { addToken, addTokenAdmin };
