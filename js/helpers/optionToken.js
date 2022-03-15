function addToken(result) {
  if (!result.token) {
    console.log(result.msg);
    return;
  }

  localStorage.setItem("token", result.token);
  window.location.href = "../index.html";
}

function addTokenAdmin(result) {
  if (!result.token) {
    console.log(result.msg);
    return;
  }

  localStorage.setItem("token", result.token);
  window.location.href = "adminSummary.html";
}

export { addToken, addTokenAdmin };
