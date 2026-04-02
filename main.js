/* ============================================
   main.js — Shared JS for Celestial Portfolio
   ============================================ */

// ── Starfield ──────────────────────────────
(function createStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const stars = [];
  const count = window.innerWidth < 600 ? 80 : 160;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: #fff;
      opacity: ${Math.random() * 0.6 + 0.1};
      width: ${Math.random() * 2 + 1}px;
      height: ${Math.random() * 2 + 1}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    `;
    canvas.appendChild(star);
  }

  // inject twinkle keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.1; transform: scale(1); }
      50%       { opacity: 0.8; transform: scale(1.4); }
    }
  `;
  document.head.appendChild(style);
})();

// ── Scroll Progress Bar ────────────────────
(function scrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const scrolled = document.documentElement.scrollTop;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / total * 100) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Mobile hamburger ───────────────────────
(function mobileNav() {
  const btn   = document.getElementById('hamburger');
  const drawer = document.getElementById('mobile-nav');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const open = btn.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // close on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ── Active nav link ────────────────────────
(function setActiveLink() {
  const path   = window.location.pathname.split('/').pop() || 'index.html';
  const links  = document.querySelectorAll('.nav-links a, .mobile-nav a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(path)) link.classList.add('active');
  });
})();

// ── Scroll-reveal animation ────────────────
(function scrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeUp');
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
})();

// ── Typing effect ──────────────────────────
function typeEffect(el, text, speed = 55) {
  if (!el) return;
  el.textContent = '';
  el.style.borderRight = '2px solid var(--secondary)';
  let i = 0;
  const t = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(t);
      setTimeout(() => { el.style.borderRight = 'none'; }, 800);
    }
  }, speed);
}

// ── Counter animation ──────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const dur = 1600;
  const step = target / (dur / 16);
  let cur = 0;
  const t = setInterval(() => {
    cur += step;
    if (cur >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(t); return; }
    el.textContent = Math.floor(cur) + (el.dataset.suffix || '');
  }, 16);
}

document.querySelectorAll('.counter').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounter(el); obs.disconnect(); }
  }, { threshold: .5 });
  obs.observe(el);
});

// ── Ripple on buttons ──────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect   = this.getBoundingClientRect();
    ripple.style.cssText = `
      position: absolute; border-radius: 50%;
      width: 120px; height: 120px;
      left: ${e.clientX - rect.left - 60}px;
      top:  ${e.clientY - rect.top  - 60}px;
      background: rgba(255,255,255,.15);
      pointer-events: none;
      animation: ripple .6s ease-out forwards;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    from { transform: scale(0); opacity: 1; }
    to   { transform: scale(3); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// ── Contact form simulation ────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type=submit]');
    btn.textContent = 'Transmitting…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Signal Received ✓';
      btn.style.background = 'linear-gradient(135deg, var(--secondary), var(--secondary-cont))';
      btn.style.color = '#000';
      this.reset();
      setTimeout(() => {
        btn.textContent = 'Send Transmission';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    }, 1800);
  });
}
