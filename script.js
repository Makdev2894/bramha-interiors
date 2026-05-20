/* ═══════════════════════════════════════════════════════════════
   BRAMHA INTERIORS — script.js
   ═══════════════════════════════════════════════════════════════ */

/* ── Footer year ── */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ══════════════════════════════════
   NAVBAR — scroll state + hamburger
   ══════════════════════════════════ */
const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

/* Close mobile nav when a link is clicked */
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

/* ══════════════════════════════════
   ACTIVE NAV LINK (on scroll)
   ══════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-link:not(.nav-cta-link)');

const activeSectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeSectionObserver.observe(s));

/* ══════════════════════════════════
   SCROLL-REVEAL (Intersection Observer)
   ══════════════════════════════════ */
const revealElements = document.querySelectorAll('.reveal-section, .reveal-hero');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -48px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ══════════════════════════════════
   GALLERY LIGHTBOX
   ══════════════════════════════════ */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxCap   = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

/* Collect only gallery items that have a real (loaded) image */
const galleryItems  = Array.from(document.querySelectorAll('.gallery-item'));
let currentIndex    = 0;

function getLiveItems() {
  /* Only items where the img loaded successfully */
  return galleryItems.filter(item => !item.classList.contains('img-missing'));
}

function openLightbox(index) {
  const live = getLiveItems();
  if (!live.length) return;
  currentIndex = ((index % live.length) + live.length) % live.length;
  const item  = live[currentIndex];
  const img   = item.querySelector('img');
  const label = item.getAttribute('data-label') || '';

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCap.textContent = label;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';

  /* Show/hide nav arrows based on count */
  const showNav = live.length > 1;
  lightboxPrev.style.display = showNav ? '' : 'none';
  lightboxNext.style.display = showNav ? '' : 'none';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

galleryItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    /* Find position within live items only */
    const live = getLiveItems();
    const liveIdx = live.indexOf(item);
    if (liveIdx !== -1) openLightbox(liveIdx);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => openLightbox(currentIndex - 1));
lightboxNext.addEventListener('click', () => openLightbox(currentIndex + 1));

/* Click outside image to close */
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

/* Keyboard navigation */
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')       closeLightbox();
  if (e.key === 'ArrowLeft')    openLightbox(currentIndex - 1);
  if (e.key === 'ArrowRight')   openLightbox(currentIndex + 1);
});

/* ══════════════════════════════════
   CONTACT FORM — validation + toast
   ══════════════════════════════════ */
const form  = document.getElementById('contactForm');
const toast = document.getElementById('toast');
let toastTimer;

function showToast() {
  clearTimeout(toastTimer);
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4500);
}

function validateForm(data) {
  const errors = [];
  if (!data.get('name')?.trim())         errors.push('name');
  if (!data.get('phone')?.trim())        errors.push('phone');
  if (!data.get('area')?.trim())         errors.push('area');
  if (!data.get('project-type'))         errors.push('project-type');
  return errors;
}

function setFieldError(id, hasError) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = hasError ? 'var(--crimson-soft)' : '';
  el.style.boxShadow   = hasError ? '0 0 0 3px rgba(192,57,43,0.15)' : '';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const errors = validateForm(data);

  /* Reset previous errors */
  ['name', 'phone', 'area', 'project-type'].forEach(id => setFieldError(id, false));

  if (errors.length) {
    errors.forEach(id => setFieldError(id, true));
    const firstError = document.getElementById(errors[0]);
    firstError?.focus();
    firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  /* Success */
  form.reset();
  showToast();

  /* Briefly animate the submit button */
  const btn = form.querySelector('[type="submit"]');
  btn.textContent = 'Sent!';
  btn.style.background = 'var(--forest)';
  setTimeout(() => {
    btn.textContent = 'Send Enquiry';
    btn.style.background = '';
  }, 2800);
});

/* Clear error highlight on input */
form.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => setFieldError(el.id, false));
  el.addEventListener('change', () => setFieldError(el.id, false));
});

/* ══════════════════════════════════
   SMOOTH SCROLL POLYFILL (Safari)
   ══════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
