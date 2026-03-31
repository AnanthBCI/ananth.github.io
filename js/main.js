// ===========================
// RIPPLE EFFECT ON BUTTONS
// ===========================
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===========================
// LAZY LOADING IMAGES
// ===========================
const imageObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
  imageObserver.observe(img);
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current) + (target.toString().includes("+") ? "+" : "");
    }
  }, 16);
};

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("animated");
        const statNums = entry.target.querySelectorAll(".stat-num");
        statNums.forEach((num) => {
          const text = num.textContent.trim();
          const number = parseInt(text.replace(/[^0-9]/g, ""));
          if (!isNaN(number)) {
            animateCounter(num, number);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const aboutStats = document.querySelector(".about-stats");
if (aboutStats) {
  statsObserver.observe(aboutStats);
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
const backToTopBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===========================
// NAVBAR SCROLL
// ===========================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ===========================
// SCROLL REVEAL
// ===========================
const revealTargets = [
  ".about-grid",
  ".about-card",
  ".timeline-item",
  ".skill-category",
  ".cert-card",
  ".project-card",
  ".testimonial-card",
  ".contact-grid",
  ".section-title",
  ".section-label",
  ".hero-badges",
  ".certs-row",
];

document.querySelectorAll(revealTargets.join(",")).forEach((el) => {
  el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ===========================
// STAGGER DELAYS
// ===========================
document.querySelectorAll(".skills-grid .skill-category").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.07}s`;
});
document.querySelectorAll(".projects-grid .project-card").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.1}s`;
});
document
  .querySelectorAll(".testimonials-grid .testimonial-card")
  .forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.1}s`;
  });
document.querySelectorAll(".timeline-item").forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
});

// ===========================
// ACTIVE NAV HIGHLIGHT
// ===========================
const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute("id");
    }
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "var(--accent)";
    }
  });
});

// ===========================
// CONTACT FORM
// ===========================
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    // Prepare form data
    const formData = new FormData(form);

    try {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // Send to FormSpree
      const response = await fetch("https://formspree.io/xlgonggr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = "#10b981";
        form.reset();

        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      } else {
        btn.innerHTML = '<i class="fas fa-exclamation"></i> Error!';
        btn.style.background = "#ef4444";
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = "";
          btn.disabled = false;
        }, 3000);
      }
    } catch (error) {
      console.error("Form error:", error);
      btn.innerHTML = '<i class="fas fa-exclamation"></i> Error!';
      btn.style.background = "#ef4444";
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    }
  });
}

// ===========================
// TYPING EFFECT
// ===========================
const roles = [
  ".NET Full Stack Developer",
  "Lead Engineer",
  "Azure Cloud Architect",
  "Backend Specialist",
];
let rIdx = 0,
  cIdx = 0,
  deleting = false;
const spanEl = document.querySelector(".hero-title span");

if (spanEl) {
  function type() {
    const word = roles[rIdx];
    spanEl.textContent = deleting
      ? word.slice(0, --cIdx)
      : word.slice(0, ++cIdx);
    let delay = deleting ? 55 : 95;
    if (!deleting && cIdx === word.length) {
      delay = 2200;
      deleting = true;
    } else if (deleting && cIdx === 0) {
      deleting = false;
      rIdx = (rIdx + 1) % roles.length;
      delay = 400;
    }
    setTimeout(type, delay);
  }
  setTimeout(type, 1800);
}
