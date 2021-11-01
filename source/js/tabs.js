'use strict';

(function() {
  // Get relevant elements and collections
  const tabList = document.querySelector('.js-tab-list');
  const tabs = tabList.querySelectorAll('a');
  const panels = document.querySelectorAll('.js-tab-panel');
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
    let index = Array.prototype.indexOf.call(tabs, newTab);
    let oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
    panels[oldIndex].hidden = true;
    panels[index].hidden = false;
  }

  // Add the tabList role to the first <ul> in the .tabbed container
  tabList.setAttribute('role', 'tabList');

  // Add semantics are remove user focusability for each tab
  Array.prototype.forEach.call(tabs, (tab, i) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('id', 'tab' + (i + 1));
    tab.setAttribute('tabindex', '-1');
    tab.parentNode.setAttribute('role', 'presentation');

    // Handle clicking of tabs for mouse users
    tab.addEventListener('click', (evt) => {
      evt.preventDefault();
      let currentTab = tabList.querySelector('[aria-selected]');
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
      let index = Array.prototype.indexOf.call(tabs, evt.currentTarget);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      let dir = evt.code === 'ArrowLeft' ? index - 1 : evt.code === 'ArrowRight' ? index + 1 : evt.code === 'ArrowDown' ? 'down' : null;
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
    let id = panel.getAttribute('id');
    panel.setAttribute('aria-labelledby', tabs[i].id);
    panel.hidden = true;
  });

  // Initially activate the first tab and reveal the first tab panel
  tabs[0].removeAttribute('tabindex');
  tabs[0].setAttribute('aria-selected', 'true');
  panels[0].hidden = false;
})();
