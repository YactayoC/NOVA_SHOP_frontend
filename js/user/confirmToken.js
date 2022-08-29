const text = document.getElementById('text');
const button = document.getElementById('button');

document.addEventListener('DOMContentLoaded', confirmToken);

const querystring = window.location.search;
const id = querystring.substring(2);

async function confirmToken() {
  await fetch(`https://novashopbackend-production.up.railway.app/api/user/confirm/${id}`)
    .then((answer) => answer.json())
    .then((results) => {
      text.textContent = results.msg;
      if (results.msg === 'Invalid token') {
        button.style.display = 'none';
      }
    });
}
