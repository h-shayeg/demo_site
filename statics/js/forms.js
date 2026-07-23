/* ==========================================================================
   forms.js — UI-only form interactions (password visibility, static
   confirmation states, client-side field hints). No data is sent anywhere;
   nothing here talks to a server. This is presentation logic only, matching
   the "UI-only auth screens" requirement.
   ========================================================================== */

(function () {
  'use strict';

  /* ---- Password visibility toggle ----------------------------------------- */

  function initPasswordToggles() {
    document.querySelectorAll('.input-toggle-visibility').forEach(function (btn) {
      var wrapper = btn.closest('.input-with-icon');
      var input = wrapper ? wrapper.querySelector('input') : null;
      if (!input) return;

      btn.addEventListener('click', function () {
        var showing = input.type === 'text';
        input.type = showing ? 'password' : 'text';
        btn.classList.toggle('is-visible', !showing);
        btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
      });
    });
  }

  /* ---- Static "submit" affordance for UI-only forms (login/register/contact) */
  /* Prevents default navigation, shows a brief loading state, then a static
     success message. No request is made — this is a front-end template. */

  function initStaticSubmit() {
    document.querySelectorAll('[data-static-form]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var submitBtn = form.querySelector('[type="submit"]');
        var successEl = form.querySelector('[data-form-success]');
        if (submitBtn) {
          var originalContent = submitBtn.innerHTML;
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span class="orbit-loader" aria-hidden="true"></span> Processing…';
          setTimeout(function () {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
            if (successEl) successEl.hidden = false;
          }, 900);
        }
      });
    });
  }

  /* ---- Newsletter subscribe (blog) — same static pattern ------------------- */

  function initNewsletterForm() {
    var form = document.querySelector('[data-newsletter-form]');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('[data-newsletter-message]');
      if (msg) {
        msg.hidden = false;
        msg.textContent = 'Thanks — check your inbox to confirm your subscription.';
      }
      form.reset();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initPasswordToggles();
    initStaticSubmit();
    initNewsletterForm();
  });
})();
