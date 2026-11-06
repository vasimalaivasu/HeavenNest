/**
 * HavenNest Lodge & Budget Hotel - Lightbox Module
 * Accessible full-screen image viewer with keyboard navigation & touch swipe.
 */

const Lightbox = (function () {
  let lightboxEl = null;
  let currentItems = [];
  let currentIndex = 0;
  let previousActiveElement = null;

  function createLightboxDOM() {
    if (lightboxEl) return;

    lightboxEl = document.createElement("div");
    lightboxEl.id = "haven-lightbox";
    lightboxEl.className = "haven-lightbox";
    lightboxEl.setAttribute("role", "dialog");
    lightboxEl.setAttribute("aria-modal", "true");
    lightboxEl.setAttribute("aria-label", "Image Lightbox");
    lightboxEl.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-dialog">
        <div class="lightbox-toolbar">
          <div class="lightbox-counter"><span id="lightbox-current">1</span> / <span id="lightbox-total">1</span></div>
          <div class="lightbox-controls">
            <button type="button" class="lightbox-btn" id="lightbox-zoom-btn" aria-label="Toggle zoom">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <button type="button" class="lightbox-btn lightbox-close-btn" id="lightbox-close-btn" aria-label="Close lightbox (Esc)">&times;</button>
          </div>
        </div>

        <div class="lightbox-body">
          <button type="button" class="lightbox-nav-btn lightbox-prev-btn" id="lightbox-prev-btn" aria-label="Previous image">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          
          <div class="lightbox-image-wrap">
            <img src="" alt="" id="lightbox-img" class="lightbox-img" />
            <div class="lightbox-spinner" id="lightbox-spinner"></div>
          </div>

          <button type="button" class="lightbox-nav-btn lightbox-next-btn" id="lightbox-next-btn" aria-label="Next image">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="lightbox-caption-bar">
          <h4 id="lightbox-title" class="lightbox-caption-title"></h4>
          <p id="lightbox-caption" class="lightbox-caption-text"></p>
        </div>
      </div>
    `;

    document.body.appendChild(lightboxEl);

    // Event listeners
    lightboxEl.querySelector(".lightbox-backdrop").addEventListener("click", close);
    lightboxEl.querySelector("#lightbox-close-btn").addEventListener("click", close);
    lightboxEl.querySelector("#lightbox-prev-btn").addEventListener("click", prev);
    lightboxEl.querySelector("#lightbox-next-btn").addEventListener("click", next);

    const zoomBtn = lightboxEl.querySelector("#lightbox-zoom-btn");
    zoomBtn.addEventListener("click", () => {
      const img = lightboxEl.querySelector("#lightbox-img");
      img.classList.toggle("zoomed");
    });

    document.addEventListener("keydown", handleKeydown);
  }

  function handleKeydown(e) {
    if (!lightboxEl || !lightboxEl.classList.contains("active")) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const isRtl = document.documentElement.getAttribute("dir") === "rtl";
      isRtl ? next() : prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const isRtl = document.documentElement.getAttribute("dir") === "rtl";
      isRtl ? prev() : next();
    }
  }

  function open(items, startIndex = 0) {
    if (!items || !items.length) return;
    createLightboxDOM();

    previousActiveElement = document.activeElement;
    currentItems = items;
    currentIndex = startIndex >= 0 && startIndex < items.length ? startIndex : 0;

    lightboxEl.classList.add("active");
    document.body.classList.add("lightbox-open");

    updateView();
    lightboxEl.querySelector("#lightbox-close-btn").focus();
  }

  function updateView() {
    if (!currentItems.length) return;
    const item = currentItems[currentIndex];

    const img = lightboxEl.querySelector("#lightbox-img");
    const spinner = lightboxEl.querySelector("#lightbox-spinner");
    const currentCounter = lightboxEl.querySelector("#lightbox-current");
    const totalCounter = lightboxEl.querySelector("#lightbox-total");
    const titleEl = lightboxEl.querySelector("#lightbox-title");
    const captionEl = lightboxEl.querySelector("#lightbox-caption");

    img.classList.remove("zoomed");
    spinner.style.display = "block";
    img.style.opacity = "0";

    const preloader = new Image();
    preloader.onload = () => {
      img.src = item.url;
      img.alt = item.title || item.caption || "Lodge photograph";
      img.style.opacity = "1";
      spinner.style.display = "none";
    };
    preloader.onerror = () => {
      spinner.style.display = "none";
      img.style.opacity = "1";
    };
    preloader.src = item.url;

    currentCounter.textContent = currentIndex + 1;
    totalCounter.textContent = currentItems.length;

    titleEl.textContent = item.title || "";
    captionEl.textContent = item.caption || "";

    // Toggle button visibility if single item
    const prevBtn = lightboxEl.querySelector("#lightbox-prev-btn");
    const nextBtn = lightboxEl.querySelector("#lightbox-next-btn");
    if (currentItems.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "flex";
      nextBtn.style.display = "flex";
    }
  }

  function next() {
    if (currentItems.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentItems.length;
    updateView();
  }

  function prev() {
    if (currentItems.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    updateView();
  }

  function close() {
    if (!lightboxEl) return;
    lightboxEl.classList.remove("active");
    document.body.classList.remove("lightbox-open");
    const img = lightboxEl.querySelector("#lightbox-img");
    img.src = "";
    img.classList.remove("zoomed");

    if (previousActiveElement && previousActiveElement.focus) {
      previousActiveElement.focus();
    }
  }

  function initTriggers() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-lightbox]");
      if (trigger) {
        e.preventDefault();
        const group = trigger.getAttribute("data-lightbox-group") || "default";
        const groupTriggers = Array.from(document.querySelectorAll(`[data-lightbox][data-lightbox-group="${group}"]`));
        
        let items = [];
        if (groupTriggers.length) {
          items = groupTriggers.map((t) => ({
            url: t.getAttribute("data-lightbox-url") || t.getAttribute("href") || t.querySelector("img")?.src,
            title: t.getAttribute("data-lightbox-title") || t.getAttribute("title") || "",
            caption: t.getAttribute("data-lightbox-caption") || t.getAttribute("data-caption") || ""
          }));
          const clickedIndex = groupTriggers.indexOf(trigger);
          open(items, clickedIndex >= 0 ? clickedIndex : 0);
        } else {
          items = [{
            url: trigger.getAttribute("data-lightbox-url") || trigger.getAttribute("href") || trigger.querySelector("img")?.src,
            title: trigger.getAttribute("data-lightbox-title") || "",
            caption: trigger.getAttribute("data-lightbox-caption") || ""
          }];
          open(items, 0);
        }
      }
    });
  }

  return {
    open,
    close,
    next,
    prev,
    initTriggers
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Lightbox;
}
