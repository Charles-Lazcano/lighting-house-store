# Lighting House Store

A modern, single-page, mobile-responsive marketing website for **Lighting House Store** — LED sales, service & installation for home, industrial, indoor & outdoor lighting in San Antonio, TX.

**Live locally:** open `index.html` in a browser, or serve the folder with any static file server.

## Structure

```
index.html      Page markup, sectioned and commented for easy editing
css/style.css   All styling (blue/white/green theme, responsive breakpoints)
js/script.js    Sticky header, mobile menu, search toggle, smooth scroll, demo form handlers
```

## Editing content

- **Business info** (phone, address, tagline) appears in the hero, CTA band, service area, contact, and footer sections of `index.html` — update in each place if it ever changes.
- **Product categories** live in the `#categoryGrid` grid in `index.html`. Each `<article class="category-tile ...">` block is a self-contained tile — copy, edit, or delete freely. Swap the `tile-blue` / `tile-green` classes to alternate colors, or replace the placeholder gradient + icon with a real photo by adding a background image to the tile.
- **Photography:** the hero, CTA band, and email-signup band currently use CSS gradients as placeholder backgrounds so the site loads fast with zero external dependencies. Swap in real photos of the showroom / installations by adding a `background-image` to `.hero`, `.cta-band`, or `.signup-band` in `css/style.css`.
- **Reviews** are placeholders in the `#reviews` section — replace with real Google Reviews as they come in.
- **Forms:** the contact form and email signup form currently show a confirmation message on submit (see `js/script.js`). Connect them to a real backend or service (Formspree, Netlify Forms, EmailJS, Mailchimp, etc.) before going live.
- **Map:** the embedded Google Map in the Service Area section uses a keyless embed URL centered on the business address — no API key required.

## Tech

Plain HTML/CSS/JS — no build step, no framework, no dependencies beyond Google Fonts.
