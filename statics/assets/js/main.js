/**
 * Site-wide utilities that don't belong to a specific component.
 */
(function () {
  'use strict';

  var yearEl = document.querySelector('[data-current-year]');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
