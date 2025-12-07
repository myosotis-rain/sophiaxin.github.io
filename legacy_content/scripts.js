// Minimal enhancements for navigation, filtering, lightbox, and motion.
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.querySelector("[data-year]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-tags]");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.querySelector(".lightbox__img");
  const lightboxClose = document.querySelector(".lightbox__close");

  // Mobile nav toggle with accessible state.
  toggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(!!isOpen));
  });

  // Close nav when clicking a link (mobile)
  nav?.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement && e.target.tagName === "A") {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    }
  });

  // Sticky header compact state
  const setHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };
  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  // Filterable project grid
  const applyFilter = (filter) => {
    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").toLowerCase();
      const shouldShow = filter === "all" || tags.includes(filter);
      card.dataset.hidden = shouldShow ? "false" : "true";
    });
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(btn.dataset.filter || "all");
    });
  });

  // Lightbox for gallery images
  const openLightbox = (src) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add("is-visible");
    lightbox.setAttribute("aria-hidden", "false");
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove("is-visible");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  };

  document.querySelectorAll("[data-lightbox-src]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.getAttribute("data-lightbox-src");
      if (src) openLightbox(src);
    });
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Reveal-on-scroll using IntersectionObserver
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Dynamic year
  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }
});
