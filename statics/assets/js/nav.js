/**
 * Navigation behavior: mobile drawer toggle + sticky header scroll state.
 * No dependencies. Progressively enhances markup that works without JS
 * (all nav links are real anchors).
 */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.nav-mobile');
  var main = document.getElementById('main-content');
  var footer = document.querySelector('.site-footer');

  function setMenuState(isOpen) {
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    mobileNav.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    // Hide the page behind the full-screen drawer from assistive tech —
    // it's already visually covered; this keeps screen reader users from
    // reading or tabbing into content they can't see.
    if (main) {
      if (isOpen) { main.setAttribute('aria-hidden', 'true'); } else { main.removeAttribute('aria-hidden'); }
    }
    if (footer) {
      if (isOpen) { footer.setAttribute('aria-hidden', 'true'); } else { footer.removeAttribute('aria-hidden'); }
    }
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    // Close the mobile drawer when a link is chosen.
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuState(false);
      });
    });

    // Close on Escape for keyboard users.
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        setMenuState(false);
        toggle.focus();
      }
    });
  }

  if (header) {
    var updateHeaderState = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }
})();
