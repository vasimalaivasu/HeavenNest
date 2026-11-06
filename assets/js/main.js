/**
 * HavenNest Lodge & Budget Hotel - Master Application Entry Point
 * Orchestrates modules, counter animations, accordions, gallery filters & newsletter.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Core State & Managers
  if (typeof ThemeManager !== "undefined") ThemeManager.init();
  if (typeof RTLManager !== "undefined") RTLManager.init();
  if (typeof Navigation !== "undefined") Navigation.init();
  if (typeof Lightbox !== "undefined") Lightbox.initTriggers();
  if (typeof ModalManager !== "undefined") ModalManager.initTriggers();
  if (typeof RoomsFilter !== "undefined") RoomsFilter.init();
  if (typeof EnquiryEngine !== "undefined") EnquiryEngine.init();

  // 2. Animated Number Counters
  initNumberCounters();

  // 3. Accessible FAQ Accordions
  initAccordions();

  // 4. Gallery Category Filter
  initGalleryFilter();

  // 5. Newsletter Subscription Handler
  initNewsletterForm();

  // 6. Testimonial Carousel / Controls
  initTestimonialSlider();

  // 7. Update Footer Year
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/**
 * Animated Number Counters on Scroll
 */
function initNumberCounters() {
  const counterElements = document.querySelectorAll("[data-counter-target]");
  if (!counterElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-counter-target"));
          const decimals = parseInt(el.getAttribute("data-counter-decimals") || "0", 10);
          const prefix = el.getAttribute("data-counter-prefix") || "";
          const suffix = el.getAttribute("data-counter-suffix") || "";
          const duration = 1800; // ms
          const startTimestamp = performance.now();

          function step(now) {
            const progress = Math.min((now - startTimestamp) / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = easeProgress * target;

            el.textContent = `${prefix}${current.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals
            })}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = `${prefix}${target.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
              })}${suffix}`;
            }
          }

          requestAnimationFrame(step);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  counterElements.forEach((el) => observer.observe(el));
}

/**
 * Accessible FAQ Accordions
 */
function initAccordions() {
  const accordionButtons = document.querySelectorAll(".accordion-header");

  accordionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      const targetId = btn.getAttribute("aria-controls");
      const targetPanel = document.getElementById(targetId);

      // Close sibling accordions within same group if desired
      const group = btn.closest(".accordion-group");
      if (group) {
        const siblingBtns = group.querySelectorAll(".accordion-header");
        siblingBtns.forEach((sib) => {
          if (sib !== btn) {
            sib.setAttribute("aria-expanded", "false");
            const sibId = sib.getAttribute("aria-controls");
            const sibPanel = document.getElementById(sibId);
            if (sibPanel) {
              sibPanel.classList.remove("open");
              sibPanel.style.maxHeight = null;
            }
          }
        });
      }

      if (isExpanded) {
        btn.setAttribute("aria-expanded", "false");
        if (targetPanel) {
          targetPanel.classList.remove("open");
          targetPanel.style.maxHeight = null;
        }
      } else {
        btn.setAttribute("aria-expanded", "true");
        if (targetPanel) {
          targetPanel.classList.add("open");
          targetPanel.style.maxHeight = `${targetPanel.scrollHeight + 32}px`;
        }
      }
    });
  });
}

/**
 * Interactive Gallery Filter (Home & Facilities pages)
 */
function initGalleryFilter() {
  const filterTabs = document.querySelectorAll(".gallery-filter-tab");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!filterTabs.length || !galleryItems.length) return;

  filterTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      filterTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      const category = tab.getAttribute("data-gallery-filter");

      galleryItems.forEach((item) => {
        const itemCat = item.getAttribute("data-gallery-category");
        if (category === "all" || itemCat === category) {
          item.style.display = "";
          item.classList.remove("hidden-item");
        } else {
          item.style.display = "none";
          item.classList.add("hidden-item");
        }
      });
    });
  });
}

/**
 * Newsletter Form Handling with Toast & LocalStorage
 */
function initNewsletterForm() {
  const forms = document.querySelectorAll(".newsletter-form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;

      const email = emailInput.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!isValid) {
        if (typeof Toast !== "undefined") {
          Toast.error("Please enter a valid email address.", "Invalid Email");
        }
        emailInput.focus();
        return;
      }

      if (typeof Storage !== "undefined") {
        Storage.setNewsletterSubscribed(email);
      }

      if (typeof Toast !== "undefined") {
        Toast.success("You are now subscribed to our tariff alerts & seasonal offers!", "Subscribed!");
      }

      emailInput.value = "";
    });
  });
}

/**
 * Testimonial Slider / Carousel Interaction
 */
function initTestimonialSlider() {
  const slider = document.querySelector(".testimonials-track");
  const prevBtn = document.querySelector(".testi-prev-btn");
  const nextBtn = document.querySelector(".testi-next-btn");
  const cards = document.querySelectorAll(".testimonial-card");

  if (!slider || !cards.length || !prevBtn || !nextBtn) return;

  let currentIndex = 0;

  function updateSlider() {
    const isRtl = document.documentElement.getAttribute("dir") === "rtl";
    const cardWidth = cards[0].offsetWidth + 24; // width + gap
    const offset = currentIndex * cardWidth;

    slider.style.transform = isRtl ? `translateX(${offset}px)` : `translateX(-${offset}px)`;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  });

  nextBtn.addEventListener("click", () => {
    const maxIndex = cards.length - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateSlider();
    }
  });

  window.addEventListener("resize", () => {
    updateSlider();
  });
}
