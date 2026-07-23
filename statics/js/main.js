/* ==========================================================================
   main.js — navigation, scroll reveal, ambient background, shared behaviors
   No backend calls. No form submission logic. UI-state only.
   ========================================================================== */

(function () {
  'use strict';

  /* ---- Mobile navigation drawer ------------------------------------------ */

  function initNavDrawer() {
    var toggle = document.querySelector('.nav-toggle');
    var drawer = document.querySelector('.nav-drawer');
    if (!toggle || !drawer) return;

    function closeDrawer() {
      drawer.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function openDrawer() {
      drawer.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function () {
      var isOpen = drawer.classList.contains('is-open');
      isOpen ? closeDrawer() : openDrawer();
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ---- Mark current page in nav (works without a server templating layer) */

  function markActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-primary a, .nav-drawer a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ---- Scroll reveal ------------------------------------------------------ */

  function initScrollReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el, i) {
      el.style.setProperty('--reveal-index', el.closest('[data-reveal-group]') ? i % 6 : 0);
      observer.observe(el);
    });
  }

  /* ---- Header shadow / condensed state on scroll -------------------------- */

  function initHeaderScrollState() {

  var header = document.querySelector('.site-header');

  if (!header) return;

  function updateHeader() {

    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

  }

  updateHeader();

  window.addEventListener(
    'scroll',
    updateHeader,
    { passive: true }
  );
}

  /* ---- Generic tabs (used on projects/publications filter groups too) ----- */

  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (group) {
      var tabs = group.querySelectorAll('[role="tab"]');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
          tab.setAttribute('aria-selected', 'true');

          var targetSelector = tab.getAttribute('data-filter');
          var scope = document.querySelector(group.getAttribute('data-tabs-scope') || 'body');
          if (!targetSelector || !scope) return;

          scope.querySelectorAll('[data-category]').forEach(function (item) {
            var show = targetSelector === 'all' || item.getAttribute('data-category') === targetSelector;
            item.style.display = show ? '' : 'none';
          });
        });
      });
    });
  }

  /* ---- FAQ accordion (contact page) --------------------------------------- */

  function initFaq() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      var question = item.querySelector('.faq-question');
      if (!question) return;
      question.addEventListener('click', function () {
        var isOpen = item.getAttribute('data-open') === 'true';
        item.closest('[data-faq-group]') && item.parentElement.querySelectorAll('.faq-item').forEach(function (sibling) {
          if (sibling !== item) sibling.setAttribute('data-open', 'false');
        });
        item.setAttribute('data-open', isOpen ? 'false' : 'true');
        question.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    });
  }

  /* ---- Reading progress bar (blog-single) --------------------------------- */

  function initReadingProgress() {
    var bar = document.querySelector('.reading-progress');
    var article = document.querySelector('.article-body');
    if (!bar || !article) return;

    window.addEventListener('scroll', function () {
      var rect = article.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ---- Table of contents active-section highlight ------------------------- */

  function initTocHighlight() {
    var toc = document.querySelector('.article-toc');
    if (!toc) return;
    var links = toc.querySelectorAll('a');
    var targets = Array.prototype.map.call(links, function (link) {
      return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    if (!targets.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = toc.querySelector('a[href="#' + entry.target.id + '"]');
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* ---- Activate a filter tab if the URL arrives with a matching hash ------ */

  function initHashTabActivation() {
    var hash = window.location.hash.replace('#', '');
    if (!hash) return;
    var tab = document.getElementById(hash);
    if (tab && tab.matches('[role="tab"]')) {
      tab.click();
      tab.scrollIntoView({ block: 'nearest' });
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavDrawer();
    markActiveNav();
    initScrollReveal();
    initHeaderScrollState();
    initTabs();
    initHashTabActivation();
    initFaq();
    initReadingProgress();
    initTocHighlight();
  });
})();

