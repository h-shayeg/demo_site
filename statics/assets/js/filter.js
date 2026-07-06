/**
 * Category filter for the Projects/Blog grids. Progressive enhancement:
 * the filter bar is always visible; without JS the buttons are simply
 * inert (clicking does nothing) and every card stays visible, which is
 * an acceptable degraded state for a filter — nothing is ever hidden
 * unless this script is running to also handle un-hiding it.
 */
(function () {
  'use strict';

  var bar = document.querySelector('[data-filter-bar]');
  if (!bar) return;

  var buttons = bar.querySelectorAll('.filter-btn');
  var items = document.querySelectorAll('[data-tags]');

  // Must stay in sync with --transition-base (220ms) in tokens.css.
  var TRANSITION_MS = 220;

  function applyFilter(category) {
    items.forEach(function (item) {
      var tags = (item.getAttribute('data-tags') || '').split(' ');
      var shouldShow = category === 'all' || tags.indexOf(category) !== -1;
      var isCurrentlyHidden = item.classList.contains('is-hidden');

      if (shouldShow && isCurrentlyHidden) {
        item.classList.remove('is-hidden');
        item.classList.add('is-filtering');
        // Force layout so the browser registers the starting state before
        // the class is removed, or the fade-in won't transition.
        void item.offsetWidth;
        item.classList.remove('is-filtering');
      } else if (!shouldShow && !isCurrentlyHidden) {
        item.classList.add('is-filtering');
        window.setTimeout(function () {
          item.classList.add('is-hidden');
          item.classList.remove('is-filtering');
        }, TRANSITION_MS);
      }
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      button.setAttribute('aria-pressed', 'true');
      applyFilter(button.getAttribute('data-filter'));
    });
  });
})();
