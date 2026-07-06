/**
 * Frontend-only form handling. There is no backend: forms validate on the
 * client and reveal a success state. Wire this to a real endpoint later.
 */
(function () {
  'use strict';

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function isFieldValid(input) {
    var value = input.value.trim();
    if (input.hasAttribute('required') && value === '') return false;
    if (input.type === 'email' && value !== '' && !EMAIL_PATTERN.test(value)) return false;
    return true;
  }

  /* Validate once a field is left (blur), and clear an existing error the
     moment it's corrected while typing — never flags a fresh field as
     invalid mid-keystroke, only ever relieves an error early. */
  function attachLiveValidation(form) {
    form.querySelectorAll('.field__input, .field__textarea').forEach(function (input) {
      var field = input.closest('.field');
      if (!field) return;

      input.addEventListener('blur', function () {
        if (input.value.trim() !== '' || input.hasAttribute('required')) {
          field.classList.toggle('has-error', !isFieldValid(input));
        }
      });

      input.addEventListener('input', function () {
        if (field.classList.contains('has-error') && isFieldValid(input)) {
          field.classList.remove('has-error');
        }
      });
    });
  }

  function setupNewsletterForm(form) {
    var field = form.querySelector('.field');
    var input = form.querySelector('.field__input');
    var error = form.querySelector('.field__error');
    var success = form.parentElement.querySelector('.form-success');

    attachLiveValidation(form);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = input.value.trim();
      var isValid = EMAIL_PATTERN.test(value);

      field.classList.toggle('has-error', !isValid);

      if (!isValid) {
        if (error) {
          error.textContent = 'Enter a valid email address.';
        }
        input.focus();
        return;
      }

      form.hidden = true;
      if (success) {
        success.classList.add('is-visible');
      }
    });
  }

  document.querySelectorAll('[data-form="newsletter"]').forEach(setupNewsletterForm);

  // Generic validated-form handler: covers Contact, Login, Register,
  // Forgot Password, and Reset Password — anywhere a form just needs
  // required-field + email-format validation before showing a success
  // state. (Selector below matches [data-form="validate"].)
  function setupValidatedForm(form) {
    var success = form.parentElement.querySelector('.form-success');

    attachLiveValidation(form);

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;

      form.querySelectorAll('[required]').forEach(function (input) {
        var field = input.closest('.field');
        var hasError;

        if (input.type === 'checkbox') {
          // A checkbox's .value is a static string regardless of whether
          // it's checked — the only correct required-check is .checked.
          hasError = !input.checked;
          input.classList.toggle('has-error', hasError);
        } else {
          var isEmpty = input.value.trim() === '';
          var isBadEmail = input.type === 'email' && input.value.trim() !== '' && !EMAIL_PATTERN.test(input.value.trim());
          hasError = isEmpty || isBadEmail;
          if (field) field.classList.toggle('has-error', hasError);
        }

        if (hasError) valid = false;
      });

      // Password-confirmation check — only runs on forms that actually
      // have both fields (currently just Reset Password), so this stays
      // generic rather than hardcoded to one page.
      var passwordField = form.querySelector('[name="password"]');
      var confirmField = form.querySelector('[name="password_confirm"]');
      if (passwordField && confirmField && confirmField.value !== '' && confirmField.value !== passwordField.value) {
        var confirmWrapper = confirmField.closest('.field');
        if (confirmWrapper) {
          confirmWrapper.classList.add('has-error');
          var confirmError = confirmWrapper.querySelector('.field__error');
          if (confirmError) confirmError.textContent = 'Passwords do not match.';
        }
        valid = false;
      }

      if (!valid) {
        var firstError = form.querySelector('.has-error .field__input, .has-error .field__textarea, input.has-error');
        if (firstError) firstError.focus();
        return;
      }

      form.hidden = true;
      if (success) {
        success.classList.add('is-visible');
      }
    });
  }

  document.querySelectorAll('[data-form="validate"]').forEach(setupValidatedForm);
})();
