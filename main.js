/* ═══════════════════════════════════════════════════════════
   main.js — Neon Nocturne Portfolio
   Handles: Nav, Scroll Progress, Reveal Animations,
            Counters, Hamburger Menu, Typewriter
═══════════════════════════════════════════════════════════ */

'use strict';

// ── Scroll Progress ──────────────────────────────────────────
const progressBar = document.getElementById('scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }, { passive: true });
}

// ── Hamburger / Mobile Nav ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav  = document.getElementById('mobile-nav');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  // Close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

// ── Highlight active nav link ─────────────────────────────────
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Intersection Observer — Reveal ────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
}

// ── Animated Counters ─────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const step = duration / target;
  let current = 0;
  el.textContent = '0' + suffix;

  const timer = setInterval(() => {
    current += 1;
    el.textContent = current + suffix;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// ── Typewriter Effect (hero) ──────────────────────────────────
const heroType = document.getElementById('hero-type');
if (heroType) {
  const lines = [
    'Building autonomous AI agents & pipelines.',
    'Crafting pixel-perfect web experiences.',
    'Engineering real-time ML systems.',
    'Turning bold ideas into shipped products.',
  ];
  let lineIdx = 0, charIdx = 0, deleting = false;
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  heroType.appendChild(cursor);

  function type() {
    const current = lines[lineIdx];
    if (!deleting) {
      heroType.childNodes[0]
        ? (heroType.childNodes[0].textContent = current.slice(0, charIdx + 1))
        : heroType.insertBefore(document.createTextNode(current.slice(0, charIdx + 1)), cursor);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      if (heroType.childNodes[0]) {
        heroType.childNodes[0].textContent = current.slice(0, charIdx - 1);
      }
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
      }
    }
    setTimeout(type, deleting ? 38 : 62);
  }

  // Insert initial text node for cursor to follow
  heroType.insertBefore(document.createTextNode(''), cursor);
  setTimeout(type, 800);
}

// ── Smooth nav bg on scroll ───────────────────────────────────
const mainNav = document.querySelector('.main-nav');
if (mainNav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      mainNav.style.background = 'rgba(19,19,19,0.92)';
      mainNav.style.boxShadow = '0 1px 0 rgba(63,71,83,0.3)';
    } else {
      mainNav.style.background = 'rgba(53,53,53,0.4)';
      mainNav.style.boxShadow = 'none';
    }
  }, { passive: true });
}
