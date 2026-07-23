Fonts are currently loaded from Google Fonts via <link> tags in the <head> of every page:

  Plus Jakarta Sans (weights 400/500/600/700/800) — primary UI typeface
  Baloo 2 (weights 600/700/800) — logo and prominent brand links only

This requires an internet connection when the site is opened. If you'd rather self-host (recommended for
Django production, and required if you need the site to work fully offline):

1. Download the woff2 files for both families from https://fonts.google.com
2. Place them in this folder, e.g. fonts/PlusJakartaSans-Bold.woff2
3. Add @font-face rules at the top of css/variables.css or css/base.css, e.g.:

    @font-face {
      font-family: 'Plus Jakarta Sans';
      src: url('../fonts/PlusJakartaSans-Regular.woff2') format('woff2');
      font-weight: 400;
      font-display: swap;
    }

4. Remove the Google Fonts <link> tags from every page's <head>.

Note on the original brief: it specified "Twemoji Country Flags" as the primary typeface. That's a
color-emoji font for flag glyphs (no Latin letterforms), so it can't render body text — Plus Jakarta Sans
was substituted as the closest match to the described bold/geometric style. Baloo 2 was kept as specified.
