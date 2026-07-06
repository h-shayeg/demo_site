/**
 * TOC scroll-spy: highlights the link matching the section currently in
 * view. Progressive enhancement only — the TOC works as plain anchor
 * links without this.
 */
(function () {
  'use strict';

  var links = document.querySelectorAll('.toc__link');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) sections.push({ link: link, section: section });
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var match = sections.find(function (s) { return s.section === entry.target; });
      if (!match) return;
      if (entry.isIntersecting) {
        links.forEach(function (l) { l.classList.remove('is-active'); });
        match.link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(function (s) { observer.observe(s.section); });
})();
