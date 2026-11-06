/**
 * HavenNest Lodge & Budget Hotel - Rooms Filtering & Sorting Module
 * Dynamic client-side filtering, sorting, and currency re-rendering.
 */

const RoomsFilter = (function () {
  let currentCategory = "all";
  let currentSort = "default";
  let containerEl = null;
  let countEl = null;

  function renderRoomCard(room) {
    const currency = typeof Storage !== "undefined" ? Storage.getCurrency() : "USD";
    const isINR = currency === "INR";
    const currSym = isINR ? "₹" : "$";
    const weekdayRate = isINR ? room.weekdayRateINR : room.weekdayRate;
    const weekendRate = isINR ? room.weekendRateINR : room.weekendRate;

    const badgeClass = room.badgeType === "best-value" ? "badge-accent" : "badge-neutral";
    const isLimited = room.isLimited;

    return `
      <article class="room-card" data-room-id="${room.id}" data-category="${room.category}" data-ac="${room.acType}">
        <div class="room-card-media">
          <img src="${room.image}" alt="${room.name}" class="room-card-img" loading="lazy" />
          <div class="room-card-badges">
            <span class="badge ${badgeClass}">${room.badge}</span>
            <span class="badge ${isLimited ? "badge-warning" : "badge-success"}">${room.availability}</span>
          </div>
          <span class="room-type-tag">${room.acType.toUpperCase()}</span>
        </div>

        <div class="room-card-content">
          <div class="room-card-header">
            <h3 class="room-card-title">${room.name}</h3>
            <p class="room-card-desc">${room.shortDesc}</p>
          </div>

          <div class="room-card-specs">
            <span class="spec-pill" title="Maximum Capacity">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              ${room.capacity} ${room.capacity > 1 ? "Guests" : "Guest"}
            </span>
            <span class="spec-pill" title="Bed Configuration">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 4v16M2 8h20v12M2 17h20M6 8v9"/></svg>
              ${room.bedType}
            </span>
            <span class="spec-pill" title="Floor Area">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
              ${room.roomSize}
            </span>
          </div>

          <div class="room-amenity-icons">
            <span class="icon-tag" title="Free Wi-Fi"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg> Wi-Fi</span>
            <span class="icon-tag" title="Hot Water Geyser"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg> Hot Water</span>
            <span class="icon-tag" title="Ensuite Bathroom"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/></svg> Attached Bath</span>
            <span class="icon-tag" title="TV Entertainment"><svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg> TV</span>
          </div>

          <div class="room-benefits-row">
            <span class="room-benefit-tag">☕ Free Morning Tea / Coffee</span>
            <span class="room-benefit-tag">🛏️ Extra Pillows &amp; Blankets Free</span>
            <span class="room-benefit-tag">🍽️ Outside Food Welcome</span>
          </div>

          <div class="room-card-footer">
            <div class="room-price-block">
              <span class="price-from">Starts from</span>
              <div class="price-value-row">
                <span class="price-amount">${currSym}${weekdayRate}</span>
                <span class="price-period">/ night</span>
              </div>
              <span class="price-weekend">Weekend: ${currSym}${weekendRate}</span>
            </div>

            <div class="room-card-actions">
              <button type="button" class="btn btn-outline-sm" data-modal-room="${room.id}">
                View Details
              </button>
              <a href="contact.html?room=${room.id}" class="btn btn-primary-sm">
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function getFilteredAndSortedRooms() {
    if (typeof ROOMS_DATA === "undefined") return [];

    let list = [...ROOMS_DATA];

    // Filter by category or AC
    if (currentCategory === "ac") {
      list = list.filter((r) => r.acType === "ac");
    } else if (currentCategory === "non-ac") {
      list = list.filter((r) => r.acType === "non-ac");
    } else if (currentCategory !== "all") {
      list = list.filter((r) => r.category === currentCategory);
    }

    // Sort
    const currency = typeof Storage !== "undefined" ? Storage.getCurrency() : "USD";
    const isINR = currency === "INR";

    if (currentSort === "price-low") {
      list.sort((a, b) => (isINR ? a.weekdayRateINR - b.weekdayRateINR : a.weekdayRate - b.weekdayRate));
    } else if (currentSort === "price-high") {
      list.sort((a, b) => (isINR ? b.weekdayRateINR - a.weekdayRateINR : b.weekdayRate - a.weekdayRate));
    } else if (currentSort === "capacity-low") {
      list.sort((a, b) => a.capacity - b.capacity);
    } else if (currentSort === "capacity-high") {
      list.sort((a, b) => b.capacity - a.capacity);
    }

    return list;
  }

  function applyFilters() {
    if (!containerEl) return;

    const rooms = getFilteredAndSortedRooms();

    if (!rooms.length) {
      containerEl.innerHTML = `
        <div class="empty-state-card">
          <div class="empty-state-icon">🏨</div>
          <h3>No matching rooms found</h3>
          <p>Please select another category or reset your filter tabs.</p>
          <button type="button" class="btn btn-outline" id="reset-filter-btn">Show All Rooms</button>
        </div>
      `;
      const resetBtn = containerEl.querySelector("#reset-filter-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          setCategory("all");
        });
      }
    } else {
      containerEl.innerHTML = rooms.map(renderRoomCard).join("");
    }

    if (countEl) {
      countEl.textContent = `Showing ${rooms.length} of ${ROOMS_DATA.length} room types`;
    }
  }

  let isAutoScrollPaused = false;
  let isManuallyPaused = false;
  let autoscrollTimer = null;

  function scrollToSection() {
    const sec = document.getElementById("rooms-filter-section") || document.getElementById("room-filter-track");
    if (sec) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const secRect = sec.getBoundingClientRect().top;
      const targetPos = secRect - bodyRect - offset;
      window.scrollTo({ top: Math.max(0, targetPos), behavior: "smooth" });
    }
  }

  function setCategory(cat, targetRoomId = null, shouldScroll = false) {
    currentCategory = cat || "all";
    const track = document.getElementById("room-filter-track");
    const tabs = track ? track.querySelectorAll(".room-filter-tab") : document.querySelectorAll(".room-filter-tab");
    tabs.forEach((tab) => {
      if (tab.getAttribute("data-category") === currentCategory) {
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
      } else {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      }
    });

    applyFilters();

    // Scroll tab track so the active tab is revealed
    if (track) {
      const activeTab = track.querySelector(".room-filter-tab.active:not([data-is-clone])");
      if (activeTab) {
        pauseTemporarily(3500);
        activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }

    if (targetRoomId) {
      setTimeout(() => {
        const card = document.querySelector(`.room-card[data-room-id="${targetRoomId}"]`);
        if (card) {
          card.scrollIntoView({ behavior: "smooth", block: "center" });
          card.classList.add("room-card-highlighted");
          setTimeout(() => {
            card.classList.remove("room-card-highlighted");
          }, 3200);
        } else if (shouldScroll) {
          scrollToSection();
        }
      }, 120);
    } else if (shouldScroll) {
      scrollToSection();
    }
  }

  function handleUrlParams(shouldScroll = true) {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get("category");
    const roomParam = params.get("room");

    let resolvedCategory = null;
    let resolvedRoom = roomParam;

    if (catParam) {
      resolvedCategory = catParam.toLowerCase().trim();
    } else if (roomParam && typeof ROOMS_DATA !== "undefined") {
      const r = ROOMS_DATA.find((x) => x.id === roomParam);
      if (r) {
        resolvedCategory = r.category;
      }
    }

    if (resolvedCategory) {
      setCategory(resolvedCategory, resolvedRoom, shouldScroll);
    }
  }

  function setupFooterCategoryInterceptors() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href*="rooms.html"]');
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const isCurrentPageRooms = window.location.pathname.endsWith("rooms.html") || 
                                 window.location.pathname.endsWith("/rooms") || 
                                 !!document.getElementById("room-filter-track");

      if (isCurrentPageRooms && (href.includes("category=") || href.includes("room=") || link.hasAttribute("data-category"))) {
        e.preventDefault();
        let cat = link.getAttribute("data-category");
        let room = link.getAttribute("data-room");

        if (!cat) {
          try {
            const url = new URL(link.href, window.location.origin);
            cat = url.searchParams.get("category");
            room = url.searchParams.get("room");
          } catch (err) {}
        }

        if (cat) {
          setCategory(cat, room, true);
          const newUrl = `rooms.html?category=${encodeURIComponent(cat)}${room ? `&room=${encodeURIComponent(room)}` : ""}#rooms-filter-section`;
          window.history.pushState({ category: cat, room: room }, "", newUrl);
        }
      }
    });

    window.addEventListener("popstate", () => {
      handleUrlParams(false);
    });
  }

  function setSort(sortVal) {
    currentSort = sortVal;
    applyFilters();
  }

  function setupScrollControls() {
    const track = document.getElementById("room-filter-track");
    const prevBtn = document.getElementById("rooms-filter-prev");
    const nextBtn = document.getElementById("rooms-filter-next");
    const toggleBtn = document.getElementById("rooms-autoscroll-toggle");
    if (!track) return;

    // 1. Seamless infinite loop: clone original filter tabs once
    const origTabs = Array.from(track.querySelectorAll(".room-filter-tab:not([data-is-clone])"));
    if (origTabs.length > 0 && !track.dataset.hasCloned) {
      track.dataset.hasCloned = "true";
      origTabs.forEach((tab) => {
        const clone = tab.cloneNode(true);
        clone.setAttribute("data-is-clone", "true");
        clone.setAttribute("tabindex", "-1");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });
    }

    // Precise offset distance between the original first item and the clone first item
    function getOffsetDiff() {
      const allTabs = track.querySelectorAll(".room-filter-tab");
      if (origTabs.length > 0 && allTabs.length > origTabs.length) {
        const origFirst = allTabs[0];
        const cloneFirst = allTabs[origTabs.length];
        if (origFirst && cloneFirst) {
          const diff = cloneFirst.offsetLeft - origFirst.offsetLeft;
          if (diff > 20) return diff;
        }
      }
      return track.scrollWidth / 2;
    }

    let offsetDiff = getOffsetDiff();
    let virtualScrollPos = track.scrollLeft;
    let isUserHovering = false;
    let isUserTouching = false;
    let isFocused = false;
    const pixelsPerSecond = 34; // gentle, readable auto-scroll speed (~34px / sec)
    let lastTime = performance.now();

    function pauseTemporarily(ms = 2200) {
      if (isManuallyPaused) return;
      isAutoScrollPaused = true;
      if (autoscrollTimer) clearTimeout(autoscrollTimer);
      autoscrollTimer = setTimeout(() => {
        if (!isUserHovering && !isUserTouching && !isFocused && !isManuallyPaused) {
          isAutoScrollPaused = false;
          virtualScrollPos = track.scrollLeft;
          lastTime = performance.now();
        }
      }, ms);
    }

    function updateToggleButton() {
      if (!toggleBtn) return;
      const stopped = isManuallyPaused;
      toggleBtn.classList.toggle("is-paused", stopped);
      toggleBtn.setAttribute("aria-label", stopped ? "Resume auto-scrolling filters" : "Pause auto-scrolling filters");
      toggleBtn.setAttribute("title", stopped ? "Play auto-scroll" : "Pause auto-scroll");
      toggleBtn.innerHTML = stopped
        ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"/></svg>'
        : '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        isManuallyPaused = !isManuallyPaused;
        isAutoScrollPaused = isManuallyPaused;
        if (!isManuallyPaused) {
          virtualScrollPos = track.scrollLeft;
          lastTime = performance.now();
        }
        updateToggleButton();
      });
      updateToggleButton();
    }

    // Manual navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        offsetDiff = getOffsetDiff();
        track.scrollBy({ left: -220, behavior: "smooth" });
        pauseTemporarily(2800);
        setTimeout(() => {
          if (track.scrollLeft <= 5 && offsetDiff > 0) {
            track.scrollLeft += offsetDiff;
          }
          virtualScrollPos = track.scrollLeft;
        }, 360);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        offsetDiff = getOffsetDiff();
        track.scrollBy({ left: 220, behavior: "smooth" });
        pauseTemporarily(2800);
        setTimeout(() => {
          if (offsetDiff > 0 && track.scrollLeft >= offsetDiff) {
            track.scrollLeft -= offsetDiff;
          }
          virtualScrollPos = track.scrollLeft;
        }, 360);
      });
    }

    // User interaction listeners to pause auto-scroll
    track.addEventListener("mouseenter", () => {
      isUserHovering = true;
      isAutoScrollPaused = true;
    });
    track.addEventListener("mouseleave", () => {
      isUserHovering = false;
      pauseTemporarily(1200);
    });
    track.addEventListener("touchstart", () => {
      isUserTouching = true;
      isAutoScrollPaused = true;
    }, { passive: true });
    track.addEventListener("touchend", () => {
      isUserTouching = false;
      pauseTemporarily(2000);
    });
    track.addEventListener("focusin", () => {
      isFocused = true;
      isAutoScrollPaused = true;
    });
    track.addEventListener("focusout", () => {
      isFocused = false;
      pauseTemporarily(1500);
    });
    track.addEventListener("wheel", () => {
      isAutoScrollPaused = true;
      pauseTemporarily(2500);
    }, { passive: true });

    // Click handler for all tabs (including clones) via event delegation
    track.addEventListener("click", (e) => {
      const tab = e.target.closest(".room-filter-tab");
      if (!tab) return;
      e.preventDefault();
      const cat = tab.getAttribute("data-category") || "all";
      setCategory(cat);
      pauseTemporarily(3500);
    });

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Continuous 60fps auto-scroll animation loop
    function step(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const shouldScroll = !isAutoScrollPaused && !isManuallyPaused && !prefersReducedMotion && dt < 0.25;

      if (shouldScroll) {
        offsetDiff = getOffsetDiff();
        if (offsetDiff > 40) {
          virtualScrollPos += pixelsPerSecond * dt;
          if (virtualScrollPos >= offsetDiff) {
            virtualScrollPos -= offsetDiff;
            track.scrollLeft -= offsetDiff;
          }
          track.scrollLeft = virtualScrollPos;
        }
      } else if (isAutoScrollPaused || isManuallyPaused) {
        virtualScrollPos = track.scrollLeft;
      }

      requestAnimationFrame(step);
    }

    if (!prefersReducedMotion) {
      track.classList.add("is-autoscrolling");
      requestAnimationFrame(step);
    }

    window.addEventListener("resize", () => {
      offsetDiff = getOffsetDiff();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        offsetDiff = getOffsetDiff();
      });
    }
  }

  function init() {
    containerEl = document.getElementById("rooms-grid-container");
    countEl = document.getElementById("rooms-count-display");
    if (!containerEl) return;

    setupScrollControls();

    // Sort select
    const sortSelect = document.getElementById("room-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        setSort(e.target.value);
      });
    }

    // Currency toggle listener
    window.addEventListener("haven:currencyChange", () => {
      applyFilters();
    });

    // Footer category link interceptors
    setupFooterCategoryInterceptors();

    // Check URL parameters for direct category or room filtering (?category=... or ?room=...)
    const hasCategoryQuery = window.location.search.includes("category=") || window.location.search.includes("room=");
    if (hasCategoryQuery) {
      handleUrlParams(true);
    } else {
      applyFilters();
    }
  }

  return {
    init,
    setCategory,
    setSort,
    applyFilters
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = RoomsFilter;
}
