/**
 * HavenNest Lodge & Budget Hotel - Booking Enquiry Form Engine
 * Complete interactive form handler: live pricing estimator, date logic, validation,
 * draft persistence, WhatsApp deep-link generation, and reference ID creation.
 */

const EnquiryEngine = (function () {
  let formEl = null;
  let successCardEl = null;

  // Defaults
  const STATE = {
    checkin: "",
    checkout: "",
    nights: 1,
    rooms: 1,
    adults: 2,
    children: 0,
    roomId: "standard-double",
    estimatedTotalUSD: 0,
    estimatedTotalINR: 0
  };

  function getTodayString() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function getTomorrowString(fromDateStr) {
    const base = fromDateStr ? new Date(fromDateStr) : new Date();
    base.setDate(base.getDate() + 1);
    const yyyy = base.getFullYear();
    const mm = String(base.getMonth() + 1).padStart(2, "0");
    const dd = String(base.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  function calculateNights(cin, cout) {
    if (!cin || !cout) return 1;
    const d1 = new Date(cin);
    const d2 = new Date(cout);
    const diffTime = d2 - d1;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  function parseQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      room: params.get("room"),
      checkin: params.get("checkin"),
      checkout: params.get("checkout"),
      adults: params.get("adults"),
      children: params.get("children"),
      rooms: params.get("rooms")
    };
  }

  function updateEstimate() {
    if (typeof ROOMS_DATA === "undefined") return;

    const selectEl = document.getElementById("enquiry-room-type");
    const nightsDisplay = document.getElementById("enquiry-nights-count");
    const estimateUSDDisplay = document.getElementById("estimate-usd-amount");
    const estimateINRDisplay = document.getElementById("estimate-inr-amount");
    const roomRateBadge = document.getElementById("estimate-room-rate");

    const selectedId = selectEl ? selectEl.value : STATE.roomId;
    const room = ROOMS_DATA.find((r) => r.id === selectedId) || ROOMS_DATA[1];

    STATE.nights = calculateNights(STATE.checkin, STATE.checkout);
    if (nightsDisplay) {
      nightsDisplay.textContent = `${STATE.nights} ${STATE.nights === 1 ? "Night" : "Nights"}`;
    }

    const breakfastCheckbox = document.getElementById("addon-breakfast");
    const hasBreakfast = breakfastCheckbox && breakfastCheckbox.checked;
    const totalGuests = (STATE.adults || 1) + (STATE.children || 0);
    const breakfastUSD = hasBreakfast ? 3 * totalGuests * STATE.nights : 0;
    const breakfastINR = hasBreakfast ? 150 * totalGuests * STATE.nights : 0;

    const baseUSD = room.weekdayRate * STATE.nights * STATE.rooms;
    const baseINR = room.weekdayRateINR * STATE.nights * STATE.rooms;

    const totalUSD = baseUSD + breakfastUSD;
    const totalINR = baseINR + breakfastINR;

    STATE.estimatedTotalUSD = totalUSD;
    STATE.estimatedTotalINR = totalINR;
    STATE.hasBreakfast = hasBreakfast;

    const currency = typeof Storage !== "undefined" ? Storage.getCurrency() : "USD";
    const isINR = currency === "INR";

    if (estimateUSDDisplay && estimateINRDisplay) {
      if (isINR) {
        estimateINRDisplay.textContent = `₹${totalINR.toLocaleString()}`;
        estimateINRDisplay.className = "estimate-highlight";
        estimateUSDDisplay.textContent = `$${totalUSD}`;
        estimateUSDDisplay.className = "estimate-inr";
      } else {
        estimateUSDDisplay.textContent = `$${totalUSD}`;
        estimateUSDDisplay.className = "estimate-highlight";
        estimateINRDisplay.textContent = `₹${totalINR.toLocaleString()}`;
        estimateINRDisplay.className = "estimate-inr";
      }
    }
    if (roomRateBadge) {
      const bText = hasBreakfast 
        ? (isINR ? ` + ₹${breakfastINR} b'fast` : ` + $${breakfastUSD} b'fast`)
        : "";
      roomRateBadge.textContent = isINR 
        ? `₹${room.weekdayRateINR} / night × ${STATE.nights}n × ${STATE.rooms}r${bText}` 
        : `$${room.weekdayRate} / night × ${STATE.nights}n × ${STATE.rooms}r${bText}`;
    }
  }

  function setupDateInputs() {
    const cinInput = document.getElementById("enquiry-checkin");
    const coutInput = document.getElementById("enquiry-checkout");
    if (!cinInput || !coutInput) return;

    const todayStr = getTodayString();
    cinInput.min = todayStr;

    // Check if query params or draft exist
    const qp = parseQueryParams();
    const draft = typeof Storage !== "undefined" ? Storage.getEnquiryDraft() : null;

    let initCin = qp.checkin || (draft && draft.checkin) || todayStr;
    let initCout = qp.checkout || (draft && draft.checkout) || getTomorrowString(initCin);

    // Ensure valid future dates
    if (initCin < todayStr) initCin = todayStr;
    if (initCout <= initCin) initCout = getTomorrowString(initCin);

    cinInput.value = initCin;
    coutInput.value = initCout;
    coutInput.min = getTomorrowString(initCin);

    STATE.checkin = initCin;
    STATE.checkout = initCout;

    cinInput.addEventListener("change", () => {
      STATE.checkin = cinInput.value;
      const minCout = getTomorrowString(cinInput.value);
      coutInput.min = minCout;
      if (coutInput.value <= cinInput.value) {
        coutInput.value = minCout;
        STATE.checkout = minCout;
      }
      updateEstimate();
      saveDraft();
    });

    coutInput.addEventListener("change", () => {
      STATE.checkout = coutInput.value;
      updateEstimate();
      saveDraft();
    });
  }

  function setupSteppers() {
    const qp = parseQueryParams();
    const draft = typeof Storage !== "undefined" ? Storage.getEnquiryDraft() : null;

    // Stepper config: [elementId, key, min, max, defaultVal]
    const configs = [
      ["adults", "adults", 1, 10, parseInt(qp.adults || (draft && draft.adults) || 2)],
      ["children", "children", 0, 6, parseInt(qp.children || (draft && draft.children) || 0)],
      ["rooms", "rooms", 1, 5, parseInt(qp.rooms || (draft && draft.rooms) || 1)]
    ];

    configs.forEach(([name, key, min, max, initial]) => {
      const displayEl = document.getElementById(`stepper-${name}-val`);
      const plusBtn = document.getElementById(`stepper-${name}-plus`);
      const minusBtn = document.getElementById(`stepper-${name}-minus`);
      if (!displayEl || !plusBtn || !minusBtn) return;

      STATE[key] = Math.min(Math.max(initial, min), max);
      displayEl.textContent = STATE[key];

      plusBtn.addEventListener("click", () => {
        if (STATE[key] < max) {
          STATE[key]++;
          displayEl.textContent = STATE[key];
          updateEstimate();
          saveDraft();
        }
      });

      minusBtn.addEventListener("click", () => {
        if (STATE[key] > min) {
          STATE[key]--;
          displayEl.textContent = STATE[key];
          updateEstimate();
          saveDraft();
        }
      });
    });
  }

  function setupRoomSelector() {
    const categorySelect = document.getElementById("enquiry-room-category");
    const selectEl = document.getElementById("enquiry-room-type");
    if (!selectEl || typeof ROOMS_DATA === "undefined") return;

    const qp = parseQueryParams();
    const draft = typeof Storage !== "undefined" ? Storage.getEnquiryDraft() : null;
    let targetRoom = qp.room || (draft && draft.roomId) || "standard-double";
    if (targetRoom === "family-room") targetRoom = "family-quad";

    const matched = ROOMS_DATA.find((r) => r.id === targetRoom);
    let initialCategory = matched ? matched.category : "all";

    if (categorySelect) {
      categorySelect.value = initialCategory;
    }

    const categoryNames = {
      standard: "Standard & Budget",
      deluxe: "Deluxe & Suites",
      family: "Family Suites",
      dormitory: "Dormitory & Pods"
    };

    function renderCategoryRooms(cat, preferredId) {
      let filtered = (cat === "all") ? ROOMS_DATA : ROOMS_DATA.filter((r) => r.category === cat);
      if (!filtered.length) filtered = ROOMS_DATA;

      let html = "";
      if (cat === "all") {
        ["standard", "deluxe", "family", "dormitory"].forEach((c) => {
          const catRooms = ROOMS_DATA.filter((r) => r.category === c);
          if (catRooms.length) {
            html += `<optgroup label="${categoryNames[c]}">`;
            catRooms.forEach((r) => {
              const acTag = r.name.toLowerCase().includes("ac") ? "" : ` (${r.acType === "ac" ? "AC" : "Non-AC"})`;
              html += `<option value="${r.id}" data-category="${r.category}">${r.name}${acTag}</option>`;
            });
            html += `</optgroup>`;
          }
        });
      } else {
        filtered.forEach((r) => {
          const acTag = r.name.toLowerCase().includes("ac") ? "" : ` (${r.acType === "ac" ? "AC" : "Non-AC"})`;
          html += `<option value="${r.id}" data-category="${r.category}">${r.name}${acTag}</option>`;
        });
      }

      selectEl.innerHTML = html;

      const exists = Array.from(selectEl.options).some((o) => o.value === preferredId);
      if (exists) {
        selectEl.value = preferredId;
      } else {
        if (cat === "standard") selectEl.value = "standard-double";
        else if (cat === "deluxe") selectEl.value = "deluxe-double";
        else if (cat === "family") selectEl.value = "family-quad";
        else if (cat === "dormitory") selectEl.value = "dormitory-bed";
        else selectEl.selectedIndex = 0;
      }

      STATE.roomId = selectEl.value;
    }

    renderCategoryRooms(categorySelect ? categorySelect.value : initialCategory, targetRoom);

    if (categorySelect) {
      categorySelect.addEventListener("change", () => {
        renderCategoryRooms(categorySelect.value);
        updateEstimate();
        saveDraft();
      });
    }

    selectEl.addEventListener("change", () => {
      STATE.roomId = selectEl.value;
      updateEstimate();
      saveDraft();
    });
  }

  function saveDraft() {
    if (typeof Storage === "undefined" || !formEl) return;
    const nameInput = document.getElementById("enquiry-name");
    const phoneInput = document.getElementById("enquiry-phone");
    const emailInput = document.getElementById("enquiry-email");
    const notesInput = document.getElementById("enquiry-notes");

    Storage.saveEnquiryDraft({
      name: nameInput ? nameInput.value : "",
      phone: phoneInput ? phoneInput.value : "",
      email: emailInput ? emailInput.value : "",
      notes: notesInput ? notesInput.value : "",
      checkin: STATE.checkin,
      checkout: STATE.checkout,
      nights: STATE.nights,
      rooms: STATE.rooms,
      adults: STATE.adults,
      children: STATE.children,
      roomId: STATE.roomId
    });
  }

  function restoreDraftInputs() {
    if (typeof Storage === "undefined") return;
    const draft = Storage.getEnquiryDraft();
    if (!draft) return;

    const nameInput = document.getElementById("enquiry-name");
    const phoneInput = document.getElementById("enquiry-phone");
    const emailInput = document.getElementById("enquiry-email");
    const notesInput = document.getElementById("enquiry-notes");

    if (nameInput && draft.name) nameInput.value = draft.name;
    if (phoneInput && draft.phone) phoneInput.value = draft.phone;
    if (emailInput && draft.email) emailInput.value = draft.email;
    if (notesInput && draft.notes) notesInput.value = draft.notes;
  }

  function validateField(inputEl, errorEl, validator, errorMsg) {
    if (!inputEl) return true;
    const isValid = validator(inputEl.value.trim());
    if (!isValid) {
      inputEl.classList.add("is-invalid");
      inputEl.classList.remove("is-valid");
      if (errorEl) {
        errorEl.textContent = errorMsg;
        errorEl.style.display = "block";
      }
      return false;
    } else {
      inputEl.classList.remove("is-invalid");
      inputEl.classList.add("is-valid");
      if (errorEl) {
        errorEl.style.display = "none";
      }
      return true;
    }
  }

  function buildWhatsAppLink(enquiry) {
    const hotelNumber = "919876543210"; // Clean international format
    const text = `*New Booking Enquiry - HavenNest Lodge*
--------------------------------
*Ref:* ${enquiry.refId}
*Guest:* ${enquiry.name}
*Phone:* ${enquiry.phone}
*Email:* ${enquiry.email}
*Room:* ${enquiry.roomName}
*Dates:* ${enquiry.checkin} to ${enquiry.checkout} (${enquiry.nights} nights)
*Guests:* ${enquiry.adults} Adults, ${enquiry.children} Children
*Rooms:* ${enquiry.rooms}
*Requested Perks & Food:* ${enquiry.addons || "Standard Inclusions"}
*Estimated Total:* $${enquiry.totalUSD} / ₹${enquiry.totalINR}
*Special Requests:* ${enquiry.notes || "None"}
--------------------------------
Please confirm room availability. Thank you!`;

    return `https://wa.me/${hotelNumber}?text=${encodeURIComponent(text)}`;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById("enquiry-name");
    const phoneInput = document.getElementById("enquiry-phone");
    const emailInput = document.getElementById("enquiry-email");
    const consentInput = document.getElementById("enquiry-consent");
    const notesInput = document.getElementById("enquiry-notes");

    const nameErr = document.getElementById("error-enquiry-name");
    const phoneErr = document.getElementById("error-enquiry-phone");
    const emailErr = document.getElementById("error-enquiry-email");
    const consentErr = document.getElementById("error-enquiry-consent");

    const isNameValid = validateField(
      nameInput,
      nameErr,
      (val) => val.length >= 2,
      "Please enter your full name (minimum 2 characters)"
    );

    const isPhoneValid = validateField(
      phoneInput,
      phoneErr,
      (val) => /^[+0-9\s\-()]{7,18}$/.test(val),
      "Please enter a valid contact phone number"
    );

    const isEmailValid = validateField(
      emailInput,
      emailErr,
      (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Please enter a valid email address"
    );

    let isConsentValid = true;
    if (consentInput && !consentInput.checked) {
      if (consentErr) {
        consentErr.textContent = "Please agree to receive booking confirmation via phone or WhatsApp.";
        consentErr.style.display = "block";
      }
      isConsentValid = false;
    } else if (consentErr) {
      consentErr.style.display = "none";
    }

    if (!isNameValid || !isPhoneValid || !isEmailValid || !isConsentValid) {
      if (typeof Toast !== "undefined") {
        Toast.error("Please fill in all required fields accurately.");
      }
      return;
    }

    // Submit Success
    const currentRoom = (typeof ROOMS_DATA !== "undefined" && ROOMS_DATA.find((r) => r.id === STATE.roomId)) || {
      name: "Standard Room",
      id: "standard-double"
    };

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const refId = `ENQ-2026-${randomSuffix}`;

    const breakfastEl = document.getElementById("addon-breakfast");
    const beddingEl = document.getElementById("addon-bedding");
    const earlyEl = document.getElementById("addon-early");

    const selectedAddons = [];
    if (breakfastEl && breakfastEl.checked) selectedAddons.push("Daily Hot Breakfast");
    if (beddingEl && beddingEl.checked) selectedAddons.push("Extra Pillows & Blankets (Free)");
    if (earlyEl && earlyEl.checked) selectedAddons.push("Early Baggage Drop (Free)");

    const enquiryRecord = {
      refId,
      timestamp: new Date().toISOString(),
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      email: emailInput.value.trim(),
      notes: notesInput ? notesInput.value.trim() : "",
      addons: selectedAddons.length > 0 ? selectedAddons.join(", ") : "Standard Inclusions",
      roomId: STATE.roomId,
      roomName: currentRoom.name,
      checkin: STATE.checkin,
      checkout: STATE.checkout,
      nights: STATE.nights,
      rooms: STATE.rooms,
      adults: STATE.adults,
      children: STATE.children,
      totalUSD: STATE.estimatedTotalUSD,
      totalINR: STATE.estimatedTotalINR
    };

    // Save to storage
    if (typeof Storage !== "undefined") {
      Storage.saveEnquiryLog(enquiryRecord);
      Storage.clearEnquiryDraft();
    }

    // Show Confirmation View
    renderSuccessView(enquiryRecord);

    if (typeof Toast !== "undefined") {
      Toast.success(`Enquiry submitted! Reference: ${refId}`, "Enquiry Received");
    }
  }

  function renderSuccessView(enquiry) {
    if (!formEl) return;

    if (!successCardEl) {
      successCardEl = document.getElementById("enquiry-success-card");
    }

    const waLink = buildWhatsAppLink(enquiry);

    if (successCardEl) {
      successCardEl.innerHTML = `
        <div class="success-card-inner">
          <div class="success-icon-badge">
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="badge badge-accent">Enquiry Successfully Dispatched</span>
          <h3 class="success-headline">Thank You, ${enquiry.name}!</h3>
          <p class="success-subtitle">
            Our 24/7 reception team will call or message you within <strong>15 minutes</strong> to confirm your reservation and arrange check-in.
          </p>

          <div class="enquiry-ref-box">
            <span class="ref-label">Your Booking Enquiry Reference</span>
            <span class="ref-code">${enquiry.refId}</span>
            <small class="ref-hint">Please save this reference for quick front-desk assistance</small>
          </div>

          <div class="enquiry-summary-table">
            <div class="sum-row">
              <span class="sum-label">Room Selected:</span>
              <span class="sum-val"><strong>${enquiry.roomName}</strong> (${enquiry.rooms} Room${enquiry.rooms > 1 ? "s" : ""})</span>
            </div>
            <div class="sum-row">
              <span class="sum-label">Stay Duration:</span>
              <span class="sum-val">${enquiry.checkin} to ${enquiry.checkout} (${enquiry.nights} Night${enquiry.nights > 1 ? "s" : ""})</span>
            </div>
            <div class="sum-row">
              <span class="sum-label">Guests:</span>
              <span class="sum-val">${enquiry.adults} Adult${enquiry.adults > 1 ? "s" : ""}${enquiry.children > 0 ? `, ${enquiry.children} Child` : ""}</span>
            </div>
            <div class="sum-row">
              <span class="sum-label">Estimated Tariff:</span>
              <span class="sum-val"><strong>$${enquiry.totalUSD} / ₹${enquiry.totalINR.toLocaleString()}</strong> <small>(Pay at Check-in)</small></span>
            </div>
            <div class="sum-row">
              <span class="sum-label">Requested Perks:</span>
              <span class="sum-val"><strong>${enquiry.addons || "Standard Inclusions"}</strong></span>
            </div>
          </div>

          <div class="success-actions">
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/></svg>
              Fast-Track via WhatsApp
            </a>
            <a href="tel:+18004567890" class="btn btn-outline">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call Front Desk Now
            </a>
            <button type="button" class="btn btn-ghost" id="reset-enquiry-btn">
              Send Another Enquiry
            </button>
          </div>
        </div>
      `;

      formEl.style.display = "none";
      successCardEl.style.display = "block";
      successCardEl.scrollIntoView({ behavior: "smooth", block: "start" });

      const resetBtn = successCardEl.querySelector("#reset-enquiry-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          formEl.reset();
          setupDateInputs();
          setupSteppers();
          updateEstimate();
          successCardEl.style.display = "none";
          formEl.style.display = "block";
        });
      }
    }
  }

  function init() {
    formEl = document.getElementById("booking-enquiry-form");
    if (!formEl) return;

    setupDateInputs();
    setupSteppers();
    setupRoomSelector();
    restoreDraftInputs();
    updateEstimate();

    // Add-on checkboxes
    const breakfastEl = document.getElementById("addon-breakfast");
    const beddingEl = document.getElementById("addon-bedding");
    const earlyEl = document.getElementById("addon-early");
    if (breakfastEl) {
      breakfastEl.addEventListener("change", () => {
        updateEstimate();
        saveDraft();
      });
    }
    if (beddingEl) beddingEl.addEventListener("change", saveDraft);
    if (earlyEl) earlyEl.addEventListener("change", saveDraft);

    // Auto save draft on typing
    formEl.addEventListener("input", saveDraft);
    formEl.addEventListener("submit", handleSubmit);

    // Listen to global currency change
    window.addEventListener("haven:currencyChange", () => {
      updateEstimate();
    });
  }

  return {
    init,
    updateEstimate
  };
})();

// Quick Copy Address Navigation Helper
function copyLodgeAddress() {
  const addr = "HavenNest Lodge & Budget Hotel, 42 Heritage Cross Road, Near Central Railway Station (West Exit), City Center - 560001";
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(addr).then(() => {
      const btn = document.getElementById("copy-address-btn");
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
        btn.style.color = "var(--color-success)";
        btn.style.borderColor = "var(--color-success)";
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.style.color = "";
          btn.style.borderColor = "";
        }, 2500);
      }
      if (typeof Toast !== "undefined") {
        Toast.show({
          title: "Address Copied",
          message: "Lodge address copied to clipboard. Ready to paste into Uber, Ola, or GPS navigation.",
          type: "success",
          duration: 3500
        });
      }
    });
  }
}

if (typeof window !== "undefined") {
  window.copyLodgeAddress = copyLodgeAddress;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = EnquiryEngine;
}
