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

});
