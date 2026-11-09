/**
 * HavenNest Lodge & Budget Hotel - Navigation & Global UI Module
 * Sticky navbar, mobile drawer, active link detection, back-to-top, and currency switcher.
 */

const Navigation = (function () {
  function setupStickyNavbar() {
    const navbar = document.querySelector(".haven-navbar");
    if (!navbar) return;

    function updateNavbarScroll() {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", updateNavbarScroll, { passive: true });
    updateNavbarScroll();
  }

  function setupMobileDrawer() {
    const toggleBtn = document.querySelector(".mobile-menu-toggle");
    const drawer = document.querySelector(".mobile-drawer");
    const closeBtn = document.querySelector(".mobile-drawer-close");
    const backdrop = document.querySelector(".mobile-drawer-backdrop");

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add("active");
      if (backdrop) backdrop.classList.add("active");
      document.body.classList.add("drawer-open");
      toggleBtn.setAttribute("aria-expanded", "true");
    }

    function closeDrawer() {
      drawer.classList.remove("active");
      if (backdrop) backdrop.classList.remove("active");
      document.body.classList.remove("drawer-open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }

    toggleBtn.addEventListener("click", () => {
      const isOpen = drawer.classList.contains("active");
      isOpen ? closeDrawer() : openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (backdrop) backdrop.addEventListener("click", closeDrawer);

    // Close on navigation link or logo click
    const drawerLinks = drawer.querySelectorAll(".drawer-nav-link, a.brand-logo");
    drawerLinks.forEach((link) => {
      link.addEventListener("click", closeDrawer);
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("active")) {
        closeDrawer();
      }
    });
  }

  function highlightActiveLink() {
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll(".nav-link, .drawer-nav-link, .dropdown-item");

    const isHome1 = (currentPath.endsWith("/") || currentPath.endsWith("index.html") || currentPath === "" || currentPath.endsWith("\\"));
    const isHome2 = currentPath.includes("home-2.html");

    navLinks.forEach((link) => {
      if (link.classList.contains("nav-dropdown-toggle")) return;
      const href = link.getAttribute("href");
      if (!href) return;

      const linkPath = href.toLowerCase();
      let isActive = false;

      if (linkPath === "index.html" || linkPath === "./" || linkPath === "/") {
        isActive = isHome1 && !isHome2;
      } else if (linkPath.includes("home-2.html")) {
        isActive = isHome2;
      } else {
        isActive = currentPath.includes(linkPath);
      }

      if (isActive) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });

    // Also activate Home parent dropdown toggle if on Home 1 or Home 2
    const homeToggle = document.querySelector(".nav-dropdown-toggle");
    if (homeToggle) {
      if (isHome1 || isHome2) {
        homeToggle.classList.add("active");
      } else {
        homeToggle.classList.remove("active");
      }
    }
  }

  function setupBackToTop() {
    const btn = document.getElementById("back-to-top-btn");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 350) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function updateAllPricesOnPage(curr) {
    if (typeof ROOMS_DATA === "undefined" || !ROOMS_DATA.length) return;
    const isINR = curr === "INR";
    const sym = isINR ? "₹" : "$";

    // 1. All room cards on page (.room-card)
    const cards = document.querySelectorAll(".room-card");
    cards.forEach((card) => {
      let rId = card.getAttribute("data-room-id");
      if (!rId) {
        const pEl = card.querySelector("[data-room-price]");
        if (pEl) rId = pEl.getAttribute("data-room-price");
      }
      if (rId === "family-room") rId = "family-quad";

      const room = ROOMS_DATA.find((r) => r.id === rId);
      if (room) {
        const pAmount = card.querySelector(".price-amount");
        if (pAmount) {
          const rate = isINR ? (room.startingPriceINR || room.weekdayRateINR) : (room.startingPrice || room.weekdayRate);
          pAmount.textContent = `${sym}${rate.toLocaleString()}`;
        }
        const pWeekend = card.querySelector(".price-weekend");
        if (pWeekend) {
          const wRate = isINR ? room.weekendRateINR : room.weekendRate;
          pWeekend.textContent = `Weekend: ${sym}${wRate.toLocaleString()}`;
        }
      }
    });

    // 2. Elements with explicit data-room-price / data-room-weekend
    document.querySelectorAll("[data-room-price]").forEach((el) => {
      let rId = el.getAttribute("data-room-price");
      if (rId === "family-room") rId = "family-quad";
      const room = ROOMS_DATA.find((r) => r.id === rId);
      if (room) {
        const p = isINR ? (room.startingPriceINR || room.weekdayRateINR) : (room.startingPrice || room.weekdayRate);
        el.textContent = `${sym}${p.toLocaleString()}`;
      }
    });

    document.querySelectorAll("[data-room-weekend]").forEach((el) => {
      let rId = el.getAttribute("data-room-weekend");
      if (rId === "family-room") rId = "family-quad";
      const room = ROOMS_DATA.find((r) => r.id === rId);
      if (room) {
        const wp = isINR ? room.weekendRateINR : room.weekendRate;
        el.textContent = `Weekend: ${sym}${wp.toLocaleString()}`;
      }
    });

    // 3. Tariff comparison table in rooms.html
    const tariffRows = document.querySelectorAll(".tariff-table tbody tr");
    tariffRows.forEach((row) => {
      const link = row.querySelector('a[href*="contact.html?room="]');
      if (!link) return;
      let rId = null;
      try {
        const url = new URL(link.href, window.location.origin);
        rId = url.searchParams.get("room");
      } catch (e) {
        const match = link.href.match(/room=([^&]+)/);
        if (match) rId = match[1];
      }
      if (rId === "family-room") rId = "family-quad";
      const room = ROOMS_DATA.find((r) => r.id === rId);
      if (room) {
        const cells = row.querySelectorAll("td");
        if (cells.length >= 6) {
          if (isINR) {
            cells[3].innerHTML = `<strong>₹${room.weekdayRateINR.toLocaleString()}</strong> <small style="color: var(--text-muted); font-size: 0.8rem;">($${room.weekdayRate})</small>`;
            cells[4].innerHTML = `₹${room.weekendRateINR.toLocaleString()} <small style="color: var(--text-muted); font-size: 0.8rem;">($${room.weekendRate})</small>`;
            if (cells[5].textContent.trim() !== "N/A" && room.extraBedRateINR) {
              cells[5].textContent = `₹${room.extraBedRateINR.toLocaleString()}`;
            }
          } else {
            cells[3].innerHTML = `<strong>$${room.weekdayRate}</strong> <small style="color: var(--text-muted); font-size: 0.8rem;">(₹${room.weekdayRateINR.toLocaleString()})</small>`;
            cells[4].innerHTML = `$${room.weekendRate} <small style="color: var(--text-muted); font-size: 0.8rem;">(₹${room.weekendRateINR.toLocaleString()})</small>`;
            if (cells[5].textContent.trim() !== "N/A" && room.extraBedRate) {
              cells[5].textContent = `$${room.extraBedRate}`;
            }
          }
        }
      }
    });
  }

  function setupCurrencySwitcher() {
    const toggles = document.querySelectorAll(".currency-toggle-btn");
    const current = typeof Storage !== "undefined" ? Storage.getCurrency() : "USD";

    function updateActiveState(curr) {
      toggles.forEach((btn) => {
        let usdOpt = btn.querySelector(".curr-opt-usd");
        let inrOpt = btn.querySelector(".curr-opt-inr");

        if (!usdOpt || !inrOpt) {
          btn.innerHTML = `
            <span class="curr-opt curr-opt-usd ${curr === "USD" ? "active" : ""}" role="button" tabindex="0">$ USD</span>
            <span class="curr-opt-divider">/</span>
            <span class="curr-opt curr-opt-inr ${curr === "INR" ? "active" : ""}" role="button" tabindex="0">₹ INR</span>
          `;
          usdOpt = btn.querySelector(".curr-opt-usd");
          inrOpt = btn.querySelector(".curr-opt-inr");
        } else {
          if (curr === "INR") {
            usdOpt.classList.remove("active");
            inrOpt.classList.add("active");
            usdOpt.setAttribute("aria-selected", "false");
            inrOpt.setAttribute("aria-selected", "true");
          } else {
            usdOpt.classList.add("active");
            inrOpt.classList.remove("active");
            usdOpt.setAttribute("aria-selected", "true");
            inrOpt.setAttribute("aria-selected", "false");
          }
        }

        const label = btn.querySelector(".curr-label");
        if (label) {
          label.textContent = curr === "INR" ? "₹ INR" : "$ USD";
        }

        btn.setAttribute(
          "title",
          curr === "INR"
            ? "Selected currency: ₹ INR (Click $ USD to view in Dollars)"
            : "Selected currency: $ USD (Click ₹ INR to view in Rupees)"
        );
        btn.setAttribute("aria-label", `Current currency is ${curr}. Click to switch.`);
      });
    }

    updateActiveState(current);
    updateAllPricesOnPage(current);

    toggles.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const prev = typeof Storage !== "undefined" ? Storage.getCurrency() : "USD";
        let targetCurr = null;

        // Check if user specifically clicked the USD or INR option span
        const targetOpt = e.target.closest(".curr-opt");
        if (targetOpt) {
          if (targetOpt.classList.contains("curr-opt-usd")) {
            targetCurr = "USD";
          } else if (targetOpt.classList.contains("curr-opt-inr")) {
            targetCurr = "INR";
          }
        }

        // If clicked on button wrapper, toggle to opposite
        if (!targetCurr) {
          targetCurr = prev === "USD" ? "INR" : "USD";
        }

        if (typeof Storage !== "undefined") {
          Storage.setCurrency(targetCurr);
        }

        updateActiveState(targetCurr);
        updateAllPricesOnPage(targetCurr);
        window.dispatchEvent(new CustomEvent("haven:currencyChange", { detail: { currency: targetCurr } }));

        if (typeof Toast !== "undefined") {
          Toast.info(`Prices updated to ${targetCurr === "INR" ? "Indian Rupee (₹)" : "US Dollar ($)"}`);
        }
      });
    });

    window.addEventListener("haven:currencyChange", (e) => {
      const curr = e.detail?.currency || (typeof Storage !== "undefined" ? Storage.getCurrency() : "USD");
      updateActiveState(curr);
      updateAllPricesOnPage(curr);
    });
  }

  function setupHomeQuickBar() {
    const quickBarForm = document.getElementById("home-quick-enquiry-form");
    if (!quickBarForm) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const cin = quickBarForm.querySelector("#qb-checkin");
    const cout = quickBarForm.querySelector("#qb-checkout");

    if (cin && cout) {
      cin.min = todayStr;
      cin.value = todayStr;

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tmStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;
      cout.min = tmStr;
      cout.value = tmStr;

      cin.addEventListener("change", () => {
        const base = new Date(cin.value);
        base.setDate(base.getDate() + 1);
        const minCout = `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(base.getDate()).padStart(2, "0")}`;
        cout.min = minCout;
        if (cout.value <= cin.value) cout.value = minCout;
      });
    }

    const qbCategory = quickBarForm.querySelector("#qb-category");
    const qbRoom = quickBarForm.querySelector("#qb-room");
    const qbGuests = quickBarForm.querySelector("#qb-guests");
    const item1 = document.getElementById("qb-ticker-item-1");
    const item2 = document.getElementById("qb-ticker-item-2");

    const categoryDisplayMap = {
      standard: "Standard & Budget",
      deluxe: "Deluxe & Suites",
      family: "Family Suites",
      dormitory: "Dormitory & Pods"
    };

    const quickRoomHighlights = {
      "economy-single": "Single Bed • 1 Guest • Spotless Non-AC • 24/7 Hot Water • Free Wi-Fi",
      "standard-double": "Queen Bed • 2 Guests • Split AC • 24/7 Hot Shower • 50 Mbps Wi-Fi",
      "standard-single-ac": "Single Bed • 1 Guest • Split AC • Work Desk • Attached Bath",
      "deluxe-double": "King Bed • Balcony View • Split AC • Attached Bath • Free Hot Tea",
      "deluxe-triple": "3 Guests • City View • Split AC • 3 Single Beds • 24/7 Hot Water",
      "family-quad": "4 Guests • 2 Queen Beds • Split AC • Spacious Suite • Attached Bath",
      "family-interconnected": "2 Rooms Suite • 4-5 Guests • Interconnected • 2 Attached Baths",
      "budget-twin": "2 Twin Beds • 2 Guests • Non-AC • Attached Bath • Safe Cloakroom",
      "triple-sharing": "3 Guests • 3 Beds • Split AC • Hot Shower • Free Wi-Fi",
      "dormitory-bed": "1 AC Pod Bed • Reading Light • Safe Locker • 24/7 Hot Shower",
      "female-dorm-pod": "Female-Only Pod • Privacy Curtain • Keycard Access • Safe Locker",
      "executive-suite": "King Bed • AC • City View • Sofa Seating • Morning Filter Coffee"
    };

    function populateQuickRooms(category, preferredRoomId) {
      if (!qbRoom) return;
      const rooms = (typeof ROOMS_DATA !== "undefined" && ROOMS_DATA.length) ? ROOMS_DATA : [
        { id: "standard-double", name: "Standard Double Room", category: "standard", acType: "ac" },
        { id: "economy-single", name: "Economy Single Room", category: "standard", acType: "non-ac" },
        { id: "standard-single-ac", name: "Standard Single Room (AC)", category: "standard", acType: "ac" },
        { id: "budget-twin", name: "Budget Twin Room", category: "standard", acType: "ac" },
        { id: "triple-sharing", name: "Triple Sharing Room", category: "standard", acType: "ac" },
        { id: "deluxe-double", name: "Deluxe Double Room", category: "deluxe", acType: "ac" },
        { id: "deluxe-triple", name: "Deluxe Triple Room with City View", category: "deluxe", acType: "ac" },
        { id: "executive-suite", name: "Executive King Room", category: "deluxe", acType: "ac" },
        { id: "family-quad", name: "Family Quad Suite", category: "family", acType: "ac" },
        { id: "family-interconnected", name: "Family Interconnected 2-Room Suite", category: "family", acType: "ac" },
        { id: "dormitory-bed", name: "Dormitory Bunk Bed (AC)", category: "dormitory", acType: "ac" },
        { id: "female-dorm-pod", name: "Female Dormitory Pod Bed (AC)", category: "dormitory", acType: "ac" }
      ];

      let html = "";
      if (category === "all") {
        ["standard", "deluxe", "family", "dormitory"].forEach((c) => {
          const catRooms = rooms.filter((r) => r.category === c);
          if (catRooms.length) {
            html += `<optgroup label="${categoryDisplayMap[c]}">`;
            catRooms.forEach((r) => {
              const acTag = r.name.toLowerCase().includes("ac") ? "" : ` (${r.acType === "ac" ? "AC" : "Non-AC"})`;
              html += `<option value="${r.id}" data-category="${r.category}">${r.name}${acTag}</option>`;
            });
            html += `</optgroup>`;
          }
        });
      } else {
        const catRooms = rooms.filter((r) => r.category === category);
        catRooms.forEach((r) => {
          const acTag = r.name.toLowerCase().includes("ac") ? "" : ` (${r.acType === "ac" ? "AC" : "Non-AC"})`;
          html += `<option value="${r.id}" data-category="${r.category}">${r.name}${acTag}</option>`;
        });
      }

      qbRoom.innerHTML = html;

      const hasPreferred = Array.from(qbRoom.options).some((o) => o.value === preferredRoomId);
      if (hasPreferred) {
        qbRoom.value = preferredRoomId;
      } else {
        if (category === "standard") qbRoom.value = "standard-double";
        else if (category === "deluxe") qbRoom.value = "deluxe-double";
        else if (category === "family") qbRoom.value = "family-quad";
        else if (category === "dormitory") qbRoom.value = "dormitory-bed";
        else qbRoom.selectedIndex = 0;
      }
    }

    function updateQuickTicker() {
      if (!qbRoom || !item1 || !item2) return;
      const curr = typeof Storage !== "undefined" ? Storage.getCurrency() : "USD";
      const sym = curr === "INR" ? "₹" : "$";
      const roomId = qbRoom.value;
      const room = typeof ROOMS_DATA !== "undefined" ? ROOMS_DATA.find((r) => r.id === roomId) : null;
      const rate = room ? (curr === "INR" ? room.startingPriceINR : room.startingPrice) : (curr === "INR" ? "1,999" : "32");
      const name = qbRoom.options[qbRoom.selectedIndex]?.text || "Standard Double (AC)";
      const highlight = quickRoomHighlights[roomId] || (room ? room.shortDesc : "Clean & Cosy • 24/7 Hot Water • Free Wi-Fi");

      const html = `<strong>${name}</strong> &bull; <span class="ticker-rate">${sym}${rate.toLocaleString()}/night</span> &bull; ${highlight} &bull; <em>Direct Booking Guarantee</em>`;
      item1.innerHTML = html;
      item2.innerHTML = html;
    }

    if (qbCategory) {
      qbCategory.addEventListener("change", () => {
        populateQuickRooms(qbCategory.value);
        updateQuickTicker();
      });
    }

    if (qbGuests) {
      qbGuests.addEventListener("change", () => {
        const g = parseInt(qbGuests.value, 10);
        if (qbCategory) {
          if (g >= 4 && qbCategory.value !== "family" && qbCategory.value !== "all") {
            qbCategory.value = "family";
            populateQuickRooms("family", "family-quad");
          } else if (g === 1 && qbCategory.value === "family") {
            qbCategory.value = "standard";
            populateQuickRooms("standard", "standard-double");
          }
        }
        updateQuickTicker();
      });
    }

    if (qbRoom) {
      qbRoom.addEventListener("change", updateQuickTicker);
      window.addEventListener("haven:currencyChange", updateQuickTicker);
      populateQuickRooms(qbCategory ? qbCategory.value : "standard", "standard-double");
      updateQuickTicker();
    }

    quickBarForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const room = quickBarForm.querySelector("#qb-room")?.value || "standard-double";
      const checkin = cin?.value || todayStr;
      const checkout = cout?.value || "";
      const adults = quickBarForm.querySelector("#qb-guests")?.value || "2";

      const url = `contact.html?room=${encodeURIComponent(room)}&checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}&adults=${encodeURIComponent(adults)}&rooms=1`;
      window.location.href = url;
    });
  }

  function setupHomeDropdown() {
    const dropdown = document.querySelector(".nav-dropdown");
    const toggle = document.querySelector(".nav-dropdown-toggle");
    const menu = document.querySelector(".nav-dropdown-menu");
    if (!dropdown || !toggle || !menu) return;

    function openDropdown() {
      dropdown.classList.add("open", "show", "touch-open");
      toggle.setAttribute("aria-expanded", "true");
    }

    function closeDropdown() {
      dropdown.classList.remove("open", "show", "touch-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = dropdown.classList.contains("open") || dropdown.classList.contains("show") || dropdown.classList.contains("touch-open");
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Prevent clicking inside the menu from prematurely closing it
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // Close when clicking anywhere outside
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDropdown();
      }
    });
  }

  function init() {
    setupStickyNavbar();
    setupMobileDrawer();
    setupHomeDropdown();
    highlightActiveLink();
    setupBackToTop();
    setupCurrencySwitcher();
    setupHomeQuickBar();
  }

  return {
    init
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Navigation;
}
