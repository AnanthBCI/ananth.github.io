// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealTargets = [
  '.about-grid', '.about-card', '.timeline-item',
  '.skill-category', '.cert-card',
  '.project-card', '.article-card',
  '.contact-grid', '.section-title', '.section-label',
  '.hero-badges', '.certs-row'
];

document.querySelectorAll(revealTargets.join(',')).forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// STAGGER DELAYS
// ===========================
document.querySelectorAll('.skills-grid .skill-category').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.articles-grid .article-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.timeline-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

// ===========================
// ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    }
  });
});

// ===========================
// CONTACT FORM
// ===========================
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// ===========================
// TYPING EFFECT
// ===========================
const roles = ['.NET Full Stack Developer', 'Lead Engineer', 'Azure Cloud Architect', 'Backend Specialist'];
let rIdx = 0, cIdx = 0, deleting = false;
const spanEl = document.querySelector('.hero-title span');

if (spanEl) {
  function type() {
    const word = roles[rIdx];
    spanEl.textContent = deleting ? word.slice(0, --cIdx) : word.slice(0, ++cIdx);
    let delay = deleting ? 55 : 95;
    if (!deleting && cIdx === word.length) { delay = 2200; deleting = true; }
    else if (deleting && cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; delay = 400; }
    setTimeout(type, delay);
  }
  setTimeout(type, 1800);
}
