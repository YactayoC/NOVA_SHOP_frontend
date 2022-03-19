const token = localStorage.getItem("token");

comprobationToken(token);

function comprobationToken(token) {
  if (!token) {
    window.location.href = "adminLogin.html";
    return;
  }
}
