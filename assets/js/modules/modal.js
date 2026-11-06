/**
 * HavenNest Lodge & Budget Hotel - Modal Module
 * Rich, accessible Room Details Modal with focus trap and dynamic population.
 */

const ModalManager = (function () {
  let modalEl = null;
  let previousActiveElement = null;

  function createModalDOM() {
    if (modalEl) return;

    modalEl = document.createElement("div");
    modalEl.id = "room-details-modal";
    modalEl.className = "haven-modal";
    modalEl.setAttribute("role", "dialog");
    modalEl.setAttribute("aria-modal", "true");
    modalEl.setAttribute("aria-labelledby", "modal-room-title");
    modalEl.innerHTML = `
      <div class="modal-backdrop"></div>
      <div class="modal-dialog">
        <button type="button" class="modal-close-btn" id="modal-close-btn" aria-label="Close modal (Esc)">&times;</button>
        <div class="modal-content-scroll" id="modal-content-body">
          <!-- Dynamic Content Injected Here -->
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    modalEl.querySelector(".modal-backdrop").addEventListener("click", close);
    modalEl.querySelector("#modal-close-btn").addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if (modalEl && modalEl.classList.contains("active")) {
        if (e.key === "Escape") {
          e.preventDefault();
          close();
        }
      }
    });
  }

  function openRoomDetails(roomId) {
    if (typeof ROOMS_DATA === "undefined") {
      console.error("ROOMS_DATA is not loaded");
      return;
    }

    const room = ROOMS_DATA.find((r) => r.id === roomId);
    if (!room) {
      console.warn("Room not found for id:", roomId);
      return;
    }

    createModalDOM();
    previousActiveElement = document.activeElement;

    const body = modalEl.querySelector("#modal-content-body");
    const currency = typeof Storage !== "undefined" ? Storage.getCurrency() : "USD";
    const isINR = currency === "INR";
    const currSym = isINR ? "₹" : "$";
    const weekdayRate = isINR ? room.weekdayRateINR : room.weekdayRate;
    const weekendRate = isINR ? room.weekendRateINR : room.weekendRate;
    const extraBed = isINR ? room.extraBedRateINR : room.extraBedRate;

    // Render amenities
    const amenitiesHtml = room.amenities
      .map(
        (a) => `
        <div class="modal-amenity-chip">
          <span class="modal-amenity-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6L9 17l-5-5"/></svg></span>
          <span>${a.name}</span>
        </div>`
      )
      .join("");

    // Render inclusions
    const inclusionsHtml = room.inclusions
      .map((inc) => `<li class="inclusions-item"><span class="check-icon">✓</span> ${inc}</li>`)
      .join("");

    // Render exclusions
    const exclusionsHtml = room.exclusions
      .map((exc) => `<li class="exclusions-item"><span class="cross-icon">✕</span> ${exc}</li>`)
      .join("");

    // Render food benefits
    const foodBenefitsHtml = (room.foodBenefits || [])
      .map(
        (f) => `
        <li class="benefit-item">
          <span class="benefit-item-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/></svg>
          </span>
          <span>${f}</span>
        </li>`
      )
      .join("");

    // Render sleep & comfort perks
    const comfortBenefitsHtml = (room.comfortBenefits || [])
      .map(
        (c) => `
        <li class="benefit-item">
          <span class="benefit-item-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h20v12M2 17h20M6 8v9"/></svg>
          </span>
          <span>${c}</span>
        </li>`
      )
      .join("");

    // Render house rules
    const rulesHtml = room.houseRules
      .map((rule) => `<li class="rule-item">${rule}</li>`)
      .join("");

    // Gallery thumbnails
    const galleryThumbs = room.gallery
      .map(
        (imgUrl, idx) => `
        <button type="button" class="modal-gallery-thumb ${idx === 0 ? "active" : ""}" data-main-img="${imgUrl}">
          <img src="${imgUrl}" alt="${room.name} view ${idx + 1}" loading="lazy"/>
        </button>`
      )
      .join("");

    body.innerHTML = `
      <div class="modal-header-section">
        <div class="modal-badge-row">
          <span class="badge ${room.badgeType === "best-value" ? "badge-accent" : "badge-neutral"}">${room.badge}</span>
          <span class="badge badge-success">${room.availability}</span>
          <span class="badge badge-outline">${room.acType.toUpperCase()}</span>
        </div>
        <h2 id="modal-room-title" class="modal-room-title">${room.name}</h2>
        <div class="modal-quick-meta">
          <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Up to ${room.capacity} Guests</span>
          <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h20v12M2 17h20M6 8v9"/></svg> ${room.bedType}</span>
          <span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg> ${room.roomSize}</span>
        </div>
      </div>

      <!-- Main Image & Thumbnails -->
      <div class="modal-gallery-wrapper">
        <div class="modal-main-image-container">
          <img id="modal-featured-img" src="${room.gallery[0]}" alt="${room.name}" class="modal-main-img"/>
        </div>
        <div class="modal-thumbs-row">
          ${galleryThumbs}
        </div>
      </div>

      <!-- Tariff Summary Card -->
      <div class="modal-tariff-card">
        <div class="modal-tariff-item">
          <span class="tariff-label">Weekday Tariff</span>
          <span class="tariff-value">${currSym}${weekdayRate} <small>/ night</small></span>
        </div>
        <div class="modal-tariff-item">
          <span class="tariff-label">Weekend Tariff</span>
          <span class="tariff-value">${currSym}${weekendRate} <small>/ night</small></span>
        </div>
        <div class="modal-tariff-item">
          <span class="tariff-label">Extra Bed</span>
          <span class="tariff-value">${extraBed > 0 ? `${currSym}${extraBed} <small>/ night</small>` : "N/A"}</span>
        </div>
        <div class="modal-tariff-action">
          <a href="contact.html?room=${room.id}" class="btn btn-primary btn-block modal-enquire-btn">
            Enquire About This Room &rarr;
          </a>
        </div>
      </div>

      <!-- Description -->
      <div class="modal-section">
        <h3 class="modal-section-title">About This Room</h3>
        <p class="modal-desc-text">${room.fullDesc}</p>
      </div>

      <!-- Amenities -->
      <div class="modal-section">
        <h3 class="modal-section-title">Room Features & Amenities</h3>
        <div class="modal-amenities-grid">
          ${amenitiesHtml}
        </div>
      </div>

      <!-- Food & Sleep Comfort Benefits Showcase -->
      <div class="modal-section">
        <h3 class="modal-section-title">Food Services & Guest Comfort Benefits</h3>
        <div class="modal-benefits-grid">
          
          <div class="modal-benefit-card food-benefit-card">
            <div class="benefit-card-header">
              <div class="benefit-card-icon-wrap food-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/></svg>
              </div>
              <div>
                <h4 class="benefit-card-title">Food &amp; Dining Perks</h4>
                <span class="benefit-card-sub">Morning tea, breakfast add-ons &amp; outside food friendly</span>
              </div>
            </div>
            <ul class="benefit-card-list">
              ${foodBenefitsHtml}
            </ul>
          </div>

          <div class="modal-benefit-card comfort-benefit-card">
            <div class="benefit-card-header">
              <div class="benefit-card-icon-wrap comfort-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h20v12M2 17h20M6 8v9"/></svg>
              </div>
              <div>
                <h4 class="benefit-card-title">Sleep Comfort &amp; Extra Bedding</h4>
                <span class="benefit-card-sub">Complimentary extra pillows &amp; blankets on request</span>
              </div>
            </div>
            <ul class="benefit-card-list">
              ${comfortBenefitsHtml}
            </ul>
          </div>

        </div>
      </div>

      <!-- Inclusions & Exclusions -->
      <div class="modal-section modal-inclusions-grid">
        <div class="inclusions-col">
          <h4 class="inc-title">What's Included</h4>
          <ul class="inc-list">${inclusionsHtml}</ul>
        </div>
        <div class="exclusions-col">
          <h4 class="exc-title">What's Not Included</h4>
          <ul class="exc-list">${exclusionsHtml}</ul>
        </div>
      </div>

      <!-- House Rules -->
      <div class="modal-section modal-rules-box">
        <h4 class="rules-title">House Rules & Stay Policies</h4>
        <ul class="rules-list">${rulesHtml}</ul>
      </div>

      <!-- Bottom Floating / Sticky Action -->
      <div class="modal-footer-cta">
        <div class="modal-footer-price">
          <span class="footer-label">Starting From</span>
          <span class="footer-amount">${currSym}${weekdayRate} <span class="footer-per">/ night + taxes</span></span>
        </div>
        <a href="contact.html?room=${room.id}" class="btn btn-primary modal-enquire-btn">
          Send Booking Enquiry
        </a>
      </div>
    `;

    // Thumb click switcher
    const thumbs = modalEl.querySelectorAll(".modal-gallery-thumb");
    const mainImg = modalEl.querySelector("#modal-featured-img");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
        mainImg.src = thumb.getAttribute("data-main-img");
      });
    });

    modalEl.classList.add("active");
    document.body.classList.add("modal-open");
    modalEl.querySelector("#modal-close-btn").focus();
  }

  function close() {
    if (!modalEl) return;
    modalEl.classList.remove("active");
    document.body.classList.remove("modal-open");
    if (previousActiveElement && previousActiveElement.focus) {
      previousActiveElement.focus();
    }
  }

  function initTriggers() {
    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-modal-room]");
      if (trigger) {
        e.preventDefault();
        const roomId = trigger.getAttribute("data-modal-room");
        openRoomDetails(roomId);
      }
    });
  }

  return {
    openRoomDetails,
    close,
    initTriggers
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ModalManager;
}
