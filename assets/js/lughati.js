/* ============================================================
   Lughati website — shared behaviour.
   Small on purpose: language switch (RTL/LTR), mobile navigation,
   scroll reveal, and applying site-config.js values.
   Everything degrades: without JS the site is Arabic, RTL, fully readable.
   ============================================================ */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.remove('no-js');

  var STORAGE_KEY = 'lughati.lang';
  var LANGS = { ar: { dir: 'rtl' }, en: { dir: 'ltr' } };

  /* ---------- Language ---------- */
  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode etc. */ }
  }
  function fromQuery() {
    var m = /[?&]lang=(ar|en)\b/.exec(location.search);
    return m ? m[1] : null;
  }
  function fromBrowser() {
    var l = (navigator.language || '').toLowerCase();
    return l.indexOf('ar') === 0 ? 'ar' : 'en';
  }
  function applyLang(lang, persist) {
    if (!LANGS[lang]) lang = 'ar';
    root.setAttribute('lang', lang);
    root.setAttribute('dir', LANGS[lang].dir);
    root.setAttribute('data-lang', lang);
    // <title> and meta description carry both languages via data attributes.
    var t = document.querySelector('title');
    if (t && t.getAttribute('data-' + lang)) t.textContent = t.getAttribute('data-' + lang);
    var d = document.querySelector('meta[name="description"]');
    if (d && d.getAttribute('data-' + lang)) d.setAttribute('content', d.getAttribute('data-' + lang));
    // The switcher offers the *other* language.
    var switches = document.querySelectorAll('[data-lang-switch]');
    for (var i = 0; i < switches.length; i++) {
      var other = lang === 'ar' ? 'en' : 'ar';
      switches[i].setAttribute('data-target', other);
      switches[i].setAttribute('aria-label', other === 'en' ? 'Switch to English' : 'التبديل إلى العربية');
      switches[i].setAttribute('lang', other);
      var label = switches[i].querySelector('[data-lang-label]');
      if (label) label.textContent = other === 'en' ? 'English' : 'العربية';
    }
    if (persist) store(lang);
  }

  var initial = fromQuery() || readStored() || fromBrowser();
  applyLang(initial, !!fromQuery());

  document.addEventListener('click', function (ev) {
    var el = ev.target.closest ? ev.target.closest('[data-lang-switch]') : null;
    if (!el) return;
    ev.preventDefault();
    var target = el.getAttribute('data-target') || 'en';
    applyLang(target, true);
    // Keep in-page links pointing at the right language without a reload.
    if (history.replaceState) {
      var url = location.pathname + '?lang=' + target + location.hash;
      history.replaceState(null, '', url);
    }
  });

  // Internal links keep the chosen language in the URL so a shared link opens the same way.
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || /^(https?:|mailto:|tel:|#)/.test(href) || a.hasAttribute('data-lang-switch')) return;
    if (href.indexOf('?lang=') !== -1) return;
    var lang = root.getAttribute('data-lang') || 'ar';
    var hashIdx = href.indexOf('#');
    if (hashIdx === -1) a.setAttribute('href', href + '?lang=' + lang);
    else a.setAttribute('href', href.slice(0, hashIdx) + '?lang=' + lang + href.slice(hashIdx));
  }, true);

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('nav-drawer');
  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ---------- Site config: store link, contact email, canonical ---------- */
  var cfg = window.LUGHATI_SITE || {};

  if (cfg.playUrl) {
    var pend = document.querySelectorAll('[data-play-link]');
    for (var p = 0; p < pend.length; p++) {
      var node = pend[p];
      var a = document.createElement('a');
      a.href = cfg.playUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = node.className.replace('btn--pending', '').trim();
      // Replace the "coming soon" text with the ready text held in data attributes.
      var ar = node.getAttribute('data-ready-ar') || 'حمّل من Google Play';
      var en = node.getAttribute('data-ready-en') || 'Get it on Google Play';
      a.innerHTML = '<span data-lang="ar">' + ar + '</span><span data-lang="en">' + en + '</span>';
      node.parentNode.replaceChild(a, node);
    }
    var notes = document.querySelectorAll('[data-play-note]');
    for (var n = 0; n < notes.length; n++) notes[n].hidden = true;
  }

  if (cfg.contactEmail) {
    var mails = document.querySelectorAll('[data-contact-email]');
    for (var m = 0; m < mails.length; m++) {
      var link = document.createElement('a');
      link.href = 'mailto:' + cfg.contactEmail;
      link.textContent = cfg.contactEmail;
      mails[m].parentNode.replaceChild(link, mails[m]);
    }
  }

  if (cfg.siteUrl) {
    var page = location.pathname.split('/').pop() || 'index.html';
    var canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = cfg.siteUrl + '/' + (page === 'index.html' ? '' : page);
  }

  /* ---------- The bar knows when the page has moved ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Scroll reveal (subtle, once, respects reduced motion) ---------- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    for (var r = 0; r < items.length; r++) items[r].classList.add('is-visible');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    for (var k = 0; k < items.length; k++) io.observe(items[k]);
    setTimeout(function () { for (var z = 0; z < items.length; z++) items[z].classList.add('is-visible'); }, 1500);
  }
})();
