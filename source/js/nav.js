'use strict';

(function () {
  const header = document.querySelector('.js-header');
  const button = document.querySelector('.js-header-button');
  const nav = document.querySelector('.js-nav');
  const HEADER_OPEN_CLASS = 'header--open';

  if (!header || !button || !nav) {
    return false;
  }

  button.addEventListener('click', () => {
    if (header.classList.contains(HEADER_OPEN_CLASS)) {
      header.classList.remove(HEADER_OPEN_CLASS);

      window.gsap.to(nav, {height: 0});
    } else {
      header.classList.add(HEADER_OPEN_CLASS);

      window.gsap.set(nav, {height: 'auto'});
      window.gsap.from(nav, {height: 0});
    }
  });
})();
