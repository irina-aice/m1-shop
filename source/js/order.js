'use strict';

(function () {
  const catalog = document.querySelector('.js-catalog');

  catalog.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const form = evt.target.closest('form');
    const productTitle = form.parentNode.querySelector('.card__title');
    const checkedSize = form.querySelector('input[name="size"]:checked');
    const checkedColor = form.querySelector('input[name="color"]:checked');

    const modalForm = document.querySelector('.js-modal-form');
    const modalProduct = modalForm.querySelector('.js-modal-form-product');
    const modalSize = modalForm.querySelector('.js-modal-form-size');
    const modalColor = modalForm.querySelector('.js-modal-form-color');

    modalProduct.value = productTitle.textContent;

    if (checkedSize) {
      modalSize.value = checkedSize.value;
    } else {
      modalSize.value = '';
    }

    if (checkedColor) {
      modalColor.value = checkedColor.value;
    } else {
      modalColor.value = '';
    }

    window.MicroModal.show('modal-order', {
      openClass: 'modal--open',
      disableScroll: true,
    });
  });
})();
