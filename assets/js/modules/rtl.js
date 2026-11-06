/**
 * HavenNest Lodge & Budget Hotel - RTL Module
 * Full Right-To-Left layout support for Arabic / Hebrew audiences.
 */

const RTLManager = (function () {
  const root = document.documentElement;
  let isRTL = false;

  function applyRTL(enable, save = true) {
    isRTL = enable;
    if (enable) {
      root.setAttribute("dir", "rtl");
      root.classList.add("rtl");
    } else {
      root.setAttribute("dir", "ltr");
      root.classList.remove("rtl");
    }

    if (save && typeof Storage !== "undefined") {
      Storage.setRTL(enable);
    }

    updateButtons();
    window.dispatchEvent(new CustomEvent("haven:rtlChange", { detail: { isRTL } }));
  }

  function updateButtons() {
    const toggles = document.querySelectorAll(".rtl-toggle-btn");
    toggles.forEach((btn) => {
      btn.setAttribute("aria-label", isRTL ? "Switch to Left-to-Right layout" : "Switch to Right-to-Left layout");
      btn.setAttribute("title", isRTL ? "Switch to LTR" : "Switch to RTL");
      
      const label = btn.querySelector(".rtl-label");
      if (label) {
        label.textContent = isRTL ? "LTR" : "RTL";
      }

      if (isRTL) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function toggle() {
    applyRTL(!isRTL, true);
    if (typeof Toast !== "undefined") {
      Toast.info(isRTL ? "RTL layout activated" : "LTR layout restored");
    }
  }

  function init() {
    const saved = typeof Storage !== "undefined" ? Storage.getRTL() : false;
    applyRTL(Boolean(saved), false);

    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".rtl-toggle-btn");
      if (btn) {
        e.preventDefault();
        toggle();
      }
    });
  }

  return {
    init,
    toggle,
    applyRTL,
    isRTL: () => isRTL
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = RTLManager;
}
