/**
 * HavenNest Lodge & Budget Hotel - Theme Module
 * Light / Dark mode switcher with LocalStorage persistence and system sync.
 */

const ThemeManager = (function () {
  const root = document.documentElement;
  let currentTheme = "light";

  function applyTheme(theme, save = true) {
    currentTheme = theme;
    root.setAttribute("data-theme", theme);
    if (save && typeof Storage !== "undefined") {
      Storage.setTheme(theme);
    }
    updateButtons();
    // Dispatch custom event for charts or components
    window.dispatchEvent(new CustomEvent("haven:themeChange", { detail: { theme } }));
  }

  function updateButtons() {
    const toggles = document.querySelectorAll(".theme-toggle-btn");
    toggles.forEach((btn) => {
      const isDark = currentTheme === "dark";
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
      
      const icon = btn.querySelector(".theme-icon");
      if (icon) {
        if (isDark) {
          // Show Sun icon for dark mode (clicking will switch to light)
          icon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
        } else {
          // Show Moon icon for light mode
          icon.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
        }
      }

      const label = btn.querySelector(".theme-label");
      if (label) {
        label.textContent = isDark ? "Light" : "Dark";
      }
    });
  }

  function toggle() {
    const next = currentTheme === "dark" ? "light" : "dark";
    applyTheme(next, true);
    if (typeof Toast !== "undefined") {
      Toast.info(next === "dark" ? "Dark mode activated" : "Light mode activated");
    }
  }

  function init() {
    // Initial load must always be LIGHT theme by default
    let saved = typeof Storage !== "undefined" ? Storage.getTheme() : "light";
    if (saved !== "dark" && saved !== "light") {
      saved = "light";
    }
    // Clean up any old dark setting in root element
    if (saved === "light") {
      root.setAttribute("data-theme", "light");
    }
    applyTheme(saved, false);

    // Bind event delegation
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".theme-toggle-btn");
      if (btn) {
        e.preventDefault();
        toggle();
      }
    });
  }

  return {
    init,
    toggle,
    applyTheme,
    getTheme: () => currentTheme
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = ThemeManager;
}
