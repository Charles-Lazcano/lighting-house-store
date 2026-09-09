// =========================================================
// LIGHTING HOUSE STORE — SITE SCRIPT
// Sticky header state, mobile menu, search toggle,
// smooth in-page scrolling, and demo form handling.
// =========================================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Sticky header: solid background after scroll ---------- */
  var header = document.getElementById('siteHeader');
  function updateHeaderState() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------- Mobile hamburger menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  /* ---------- Search bar toggle ---------- */
  var searchToggle = document.getElementById('searchToggle');
  var searchBar = document.getElementById('searchBar');
  searchToggle.addEventListener('click', function () {
    var isOpen = searchBar.classList.toggle('open');
    searchToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if (isOpen) {
      var input = searchBar.querySelector('input');
      if (input) input.focus();
    }
  });

  /* ---------- Close mobile menu after tapping a nav link ---------- */
  document.querySelectorAll('#mainNav a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form (placeholder submit handler) ---------- */
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      // TODO: wire this up to your form backend / email service (e.g. Formspree, Netlify Forms, EmailJS).
      formNote.textContent = 'Thanks! Your message has been received — we’ll be in touch shortly.';
      contactForm.reset();
    });
  }

  /* ---------- Email signup form (placeholder submit handler) ---------- */
  var signupForm = document.getElementById('signupForm');
  var signupNote = document.getElementById('signupNote');
  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!signupForm.checkValidity()) {
        signupForm.reportValidity();
        return;
      }
      // TODO: wire this up to your email marketing provider (e.g. Mailchimp, Klaviyo).
      signupNote.textContent = 'You’re subscribed! Watch your inbox for special offers.';
      signupForm.reset();
    });
  }

  /* ---------- Scroll reveal animations ---------- */
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Stagger items within each grid so they cascade in rather than popping together.
  function staggerGroup(groupSelector, itemSelector, stepMs, maxMs) {
    document.querySelectorAll(groupSelector).forEach(function (group) {
      var items = group.querySelectorAll(itemSelector);
      items.forEach(function (item, i) {
        item.style.setProperty('--reveal-delay', Math.min(i * stepMs, maxMs) + 'ms');
      });
    });
  }
  staggerGroup('#categoryGrid', '.category-tile', 60, 360);
  staggerGroup('.feature-grid', '.feature-card', 90, 360);
  staggerGroup('.review-grid', '.review-card', 120, 360);
  staggerGroup('.hero-stats', '.stat', 100, 300);

  var revealTargets = document.querySelectorAll('.reveal, .reveal-pop, .reveal-left, .reveal-right');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Hero stat count-up (500+, 80%, 24/7) ---------- */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var statNumbers = document.querySelectorAll('.stat-number');
    var countObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var match = el.textContent.trim().match(/^(\d+)(.*)$/);
        observer.unobserve(el);
        if (!match) return;

        var target = parseInt(match[1], 10);
        var suffix = match[2];
        var duration = 1100;
        var start = null;

        function step(timestamp) {
          if (start === null) start = timestamp;
          var progress = Math.min((timestamp - start) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });

    statNumbers.forEach(function (el) { countObserver.observe(el); });
  }

});
