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

/*eslint no-nested-ternary: "off"*/
'use strict';

(function() {
  // Get relevant elements and collections
  const tabList = document.querySelector('.js-tab-list');
  const tabs = tabList.querySelectorAll('a');
  const panels = document.querySelectorAll('.js-tab-panel');
  const promoButtonList = document.querySelectorAll('.js-promo-button');
  const TAB_ACTIVE_CLASS = 'catalog__button--active';

  if (!tabList || !panels.length) {
    return false;
  }

  // The tab switching function
  const switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    newTab.classList.add(TAB_ACTIVE_CLASS);
    oldTab.removeAttribute('aria-selected');
    oldTab.classList.remove(TAB_ACTIVE_CLASS);
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    const index = Array.prototype.indexOf.call(tabs, newTab);
    const oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  };

  // Add the tabList role to the first <ul> in the .tabbed container
  tabList.setAttribute('role', 'tabList');

  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', `tab${  i + 1}`);
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');

    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', (evt) => {
      evt.preventDefault();
      const currentTab = tabList.querySelector('[aria-selected]');
      if (evt.currentTarget !== currentTab) {
        switchTab(currentTab, evt.currentTarget);
      }
    });

    // Handle keydown events for keyboard users
    //37 - ArrowLeft
    //39 - ArrowRight
    //40 - ArrowDown
    tab.addEventListener('keydown', (evt) => {
      // Get the index of the current tab in the tabs node list
      const index = Array.prototype.indexOf.call(tabs, evt.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      const dir = evt.code === 'ArrowLeft' ? index - 1 : evt.code === 'ArrowRight' ? index + 1 : evt.code === 'ArrowDown' ? 'down' : null;
      if (dir !== null) {
        evt.preventDefault();
        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(evt.currentTarget, tabs[dir]) : void 0;
      }
    });
  });

  // Add tab panel semantics and hide them all
  Array.prototype.forEach.call(panels, (panel, i) => {
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('tabindex', '-1');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true;
  });

  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;

  window.gsap.registerPlugin(window.ScrollToPlugin);

  for (let i = 0; i < promoButtonList.length; i++) {
    const promoButton = promoButtonList[i];
    promoButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      const href = promoButton.getAttribute('href');
      const tab = tabList.querySelector(`[href="${href}"]`);
      const clickEvent = new Event('click');
      tab.dispatchEvent(clickEvent);

      const tabListHeight = tabList.offsetHeight + 30;

      window.gsap.to(window, {scrollTo: {y: href, offsetY: tabListHeight, autoKill: true}});
    });
  }
})();
