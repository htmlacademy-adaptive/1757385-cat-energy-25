// burger menu
let navButton = document.querySelector('.main-nav__toggle');
let navMain = document.querySelector('.main-nav');
let headerMain = document.querySelector('.main-header');

headerMain.classList.remove('no-js');

navButton.addEventListener('click', function () {
  navMain.classList.toggle('main-nav--opened');
});
