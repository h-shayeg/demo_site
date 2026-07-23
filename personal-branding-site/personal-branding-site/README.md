# Kai Rutherford — Personal Branding Website (Front-End Template)

A static, front-end-only template for a personal brand site spanning **Computer Science** and
**Chemistry** — home, about, projects, project detail, research, publications, blog, blog post,
contact, and auth screens (login / register / forgot password), plus a custom 404.

No backend, no build step. Open `index.html` directly in a browser, or drop the whole folder into
Django's `templates/` and `static/` once you're ready to wire it up.

## Quick start

Just open `index.html` in a browser — there's nothing to install or build. For the nicest experience
(and so relative links behave exactly like they will in production), you can also serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
/
├── index.html              Home
├── about.html               About
├── projects.html            Projects (filterable grid + pagination UI)
├── project-single.html      Project detail template
├── research.html            Research areas
├── publications.html        Publications (journal articles + conference papers)
├── blog.html                Blog index (featured post, filters, sidebar, newsletter)
├── blog-single.html          Blog post template (with table of contents + reading progress)
├── contact.html              Contact form (UI only) + FAQ accordion
├── login.html / register.html / forgot-password.html   Auth screens — UI ONLY, no auth logic
├── 404.html                  Custom error page
├── robots.txt / sitemap.xml
├── favicon.svg
├── css/
│   ├── variables.css         Design tokens (color, type, spacing, shadow, radius)
│   ├── base.css              Reset, typography, accessibility helpers
│   ├── layout.css            Container, grid, header/nav, footer, utility classes
│   ├── components.css        Buttons, cards, forms, badges, tabs, modal, pagination
│   ├── animations.css        Scroll reveal, hero entrance, decorative molecule motif
│   └── pages.css             Page-specific layouts (hero, projects, blog, auth shell, 404…)
├── js/
│   ├── main.js               Nav drawer, scroll reveal, tabs/filtering, FAQ, reading progress
│   ├── particles.js           Canvas ambient background for the homepage hero
│   └── forms.js               Password-visibility toggle, static form "submit" states
├── icons/icons.svg            Canonical source for the hand-drawn icon set (see below)
├── images/                    Empty — see images/README.md
└── fonts/                     Empty — see fonts/README.md
```

## Design system

Built to the supplied Produktly-inspired spec: Primary Blue `#3556FA`, the full neutral/semantic
palette, the 4px spacing scale, the defined type scale, `sm/md/lg/xl` shadow levels, and the stated
breakpoints (640 / 1024 / 1280). All values live as CSS custom properties in `css/variables.css` —
change them there and they cascade everywhere.

**One deviation, called out explicitly:** the brief's primary typeface, "Twemoji Country Flags," is a
color-emoji font for flag glyphs — it has no Latin letterforms, so it can't render body text. It's
substituted with **Plus Jakarta Sans**, a bold geometric sans matching the described weight/character.
**Baloo 2** is kept exactly as specified, for the logo and prominent brand links. Details and a
self-hosting guide are in `fonts/README.md`.

## Content is a placeholder persona

There's no name, bio, or project list in the brief, so the template is filled in with a fictional
persona ("Kai Rutherford") and realistic-looking sample projects, publications, and blog posts —
enough variety to show every component (filters, pagination, badges, etc.) actually working. Swap
this for your real name, bio, and content throughout; the placeholder text is meant to be replaced,
not kept.

## Icons

`icons/icons.svg` is the canonical, hand-drawn icon set (24×24, single stroke weight — one visual
family). Every HTML page inlines this same sprite near the top of `<body>` and references icons with
`<svg class="icon"><use href="#icon-name"></use></svg>`. It's duplicated per page (rather than
fetched from the external file) specifically so `<use>` resolves reliably under `file://` — Chrome
blocks cross-file SVG `<use>` references when a page is opened directly from disk. In Django, turn
this block into `includes/icons.html` and pull it in with `{% include %}` once, instead of repeating it.

## Django integration notes

- Every page shares an identical `<header>`/nav and `<footer>` — these are the first things to turn
  into `{% include %}` partials (`includes/header.html`, `includes/footer.html`, `includes/icons.html`).
- Nav "active page" state is currently set with a static `aria-current="page"` per file; in Django,
  drive that from the current URL name instead.
- `project-single.html`, `blog-single.html` are single templates standing in for what will become
  dynamic detail pages (`project/<slug>/`, `blog/<slug>/`) — every card currently links to the same
  static file.
- All forms (contact, login, register, forgot password, newsletter) use `data-static-form` /
  `data-newsletter-form` hooks in `js/forms.js` that intercept submit, fake a brief loading state, and
  show a static success message — no request is ever sent. Replace this with real `<form method="post">`
  handling (and `{% csrf_token %}`) once there's a backend.
- Everything is plain HTML/CSS/vanilla JS with relative asset paths (`css/…`, `js/…`, `icons/…`), so
  moving `css/`, `js/`, `icons/`, `images/`, `fonts/` into Django's `static/` and the `.html` files into
  `templates/` should need no path rewriting beyond adding `{% static %}` tags.

## What's intentionally not here

Per the brief, this is front-end only: no Python/Django/Node/PHP/etc., no database or ORM code, no real
authentication, and no server-side routing. The login/register/forgot-password pages are UI only.

## Browser support notes

- No build step, no framework, no package manager — just HTML5, CSS3, and vanilla JS.
- Respects `prefers-reduced-motion` throughout (scroll reveal, hero entrance, ambient background all
  disable or fall back to a static frame).
- Tested for horizontal-overflow and console errors at 320 / 375 / 768 / 1024 / 1440px.
