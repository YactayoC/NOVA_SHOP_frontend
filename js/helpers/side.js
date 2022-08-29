const btnToggle = document.querySelector('.toggle-btn');
const sidebar = document.querySelector('.aside');

const imageProfile = document.querySelector('.nav__profile-img');
const nameProfile = document.querySelector('.nav__profile-name');

btnToggle.addEventListener('click', eventHide);

function eventHide() {
  if (sidebar.classList.contains('aside--hide')) {
    sidebar.classList.remove('aside--hide');
    btnToggle.classList.remove('toogle-btn--hide');
    imageProfile.classList.remove('nav__profile-img--hide');
    nameProfile.classList.remove('nav__profile-name--hide');
  } else {
    sidebar.classList.add('aside--hide');
    btnToggle.classList.add('toogle-btn--hide');
    imageProfile.classList.add('nav__profile-img--hide');
    nameProfile.classList.add('nav__profile-name--hide');
  }
}
