/* ==========================================================================
   particles.js — lightweight canvas ambient background ("floating molecules")
   Purely decorative. Skips entirely if the user prefers reduced motion or
   if no [data-particles] canvas is present on the page.
   ========================================================================== */

(function () {
  'use strict';

  function initParticles() {
    var canvas = document.querySelector('[data-particles]');
    if (!canvas) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var particleCount = window.innerWidth < 640 ? 18 : 34;
    var linkDistance = 130;
    var width, height, rafId;

    function resize() {
      var rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }

    function makeParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 2 + 1.5
      };
    }

    function seed() {
      particles = [];
      for (var i = 0; i < particleCount; i++) particles.push(makeParticle());
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      });

      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var a = particles[i], b = particles[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            ctx.strokeStyle = 'rgba(53, 86, 250, ' + (0.16 * (1 - dist / linkDistance)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(function (p) {
        ctx.fillStyle = 'rgba(53, 86, 250, 0.35)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(step);
    }

    resize();
    seed();

    if (prefersReduced) {
      // Draw a single static frame instead of a running animation.
      step();
      cancelAnimationFrame(rafId);
    } else {
      step();
    }

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        cancelAnimationFrame(rafId);
        resize();
        seed();
        if (!prefersReduced) step();
      }, 150);
    });
  }

  document.addEventListener('DOMContentLoaded', initParticles);
})();
