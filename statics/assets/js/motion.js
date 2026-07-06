/**
 * Motion: scroll reveal + reading progress.
 *
 * Scroll reveal never hides content by default — .reveal-pending is only
 * ever added by this script, and only to elements confirmed to be below
 * the fold at load time. If this script fails to run, nothing is hidden.
 */
(function () {
  'use strict';

  var REVEAL_SELECTOR = [
    '.card',
    '.section-header',
    '.research-area',
    '.timeline-item',
    '.credential-item',
    '.publication-item',
    '.interest-item',
    '.featured-project',
    '.cta-block'
  ].join(', ');

  if ('IntersectionObserver' in window) {
    var items = document.querySelectorAll(REVEAL_SELECTOR);
    var staggerCounters = new WeakMap();

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var alreadyVisible = rect.top < window.innerHeight * 0.9;
      if (alreadyVisible) return;

      var parent = el.parentElement;
      var count = staggerCounters.get(parent) || 0;
      if (count < 5) {
        el.style.transitionDelay = (count * 70) + 'ms';
        staggerCounters.set(parent, count + 1);
      }

      el.classList.add('reveal-pending');
      observer.observe(el);
    });
  }

  var progressBar = document.querySelector('.reading-progress__bar');
  var articleBody = document.querySelector('.article-body');

  if (progressBar && articleBody) {
    var updateProgress = function () {
      var rect = articleBody.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var scrolled = -rect.top;
      var pct = total > 0 ? Math.min(100, Math.max(0, (scrolled / total) * 100)) : 0;
      progressBar.style.width = pct + '%';
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  }
})();
