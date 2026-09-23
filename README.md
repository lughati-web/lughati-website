# Lughati website — `website/`

Static site (HTML/CSS/JS, no build, no backend) for GitHub Pages. Arabic (RTL, default) + English (LTR).

```
website/
├─ index.html              Home (brand experience)
├─ privacy-policy.html     Privacy Policy — Google Play requirement (first deliverable)
├─ delete-account.html     Delete account & data
├─ languages.html · how-it-works.html · zizo.html · premium.html · test.html · faq.html · contact.html · terms.html
├─ assets/css/lughati.css  shared styles (tokens from Palette.kt / BRAND_GUIDE.md)
├─ assets/js/lughati.js    language switch, mobile nav, scroll reveal, config
├─ assets/js/site-config.js  THE ONE PLACE for playUrl / contactEmail / siteUrl
└─ assets/images/          logo, icons (favicon sizes), OG image, zizo/ (unedited app PNGs)
```

## How language switching works
Every text block is wrapped in `<span data-lang="ar">…</span><span data-lang="en">…</span>`. CSS hides the inactive
language via `html[data-lang]`; JS flips `lang`, `dir` and `data-lang` on `<html>`. Order of precedence:
`?lang=` in the URL → saved choice (`localStorage`) → browser language (Arabic → ar, otherwise en).
Without JavaScript the page is Arabic/RTL and fully readable. Share a specific language with `page.html?lang=en`.

## Shared header/footer
Pages are plain files (no includes). If you change the nav or footer, change it in every page — the block is identical
in all of them (`<header class="site-header">…</header>` and `<footer class="site-footer">…</footer>`).

## Rules kept
- Only the four brand colours (+ ember for attention); no red, no rainbow, no neon.
- Zizo PNGs are the app's own, unedited (`app/src/main/res/drawable-nodpi/zizo_*.png`); one expression per place.
- No invented claims, prices, URLs or contact data — placeholders are marked `class="todo"`.
- External resources: Google Fonts (Tajawal) only, over HTTPS. No analytics, no trackers.

## Optional later
- `app-ads.txt` at the site root once the site URL is entered in Play Console (see `store-assets/google-play/admob/ADMOB_RELEASE_CHECKLIST.md` §5).
- Real screenshots (`store-assets/google-play/screenshots/final/`) in a screenshots band on the home page once captured.
