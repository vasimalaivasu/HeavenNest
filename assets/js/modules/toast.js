/**
 * HavenNest Lodge & Budget Hotel - Toast Notification Module
 * Lightweight, accessible toast notifications with auto-dismiss and action support.
 */

const Toast = (function () {
  let container = null;

  function initContainer() {
    if (!container) {
      container = document.getElementById("toast-container");
      if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        container.setAttribute("role", "region");
        container.setAttribute("aria-label", "Notifications");
        container.setAttribute("aria-live", "polite");
        document.body.appendChild(container);
      }
    }
    return container;
  }

  function show({ title, message, type = "success", duration = 4500, action = null }) {
    const parent = initContainer();

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    toast.setAttribute("role", "status");

    // Icons
    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    } else if (type === "error") {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
    } else if (type === "warning") {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }

    let actionBtnHtml = "";
    if (action && action.text) {
      actionBtnHtml = `<button type="button" class="toast-action-btn" id="toast-action-${Date.now()}">${action.text}</button>`;
    }

    toast.innerHTML = `
      <div class="toast-icon-wrap">${iconSvg}</div>
      <div class="toast-content">
        ${title ? `<strong class="toast-title">${title}</strong>` : ""}
        <p class="toast-message">${message}</p>
        ${actionBtnHtml}
      </div>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
      <div class="toast-progress"><div class="toast-progress-bar" style="animation-duration: ${duration}ms"></div></div>
    `;

    parent.appendChild(toast);

    // Bind action button
    if (action && action.callback) {
      const actionEl = toast.querySelector(".toast-action-btn");
      if (actionEl) {
        actionEl.addEventListener("click", () => {
          action.callback();
          dismiss();
        });
      }
    }

    function dismiss() {
      toast.classList.add("toast-leaving");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }

    const closeBtn = toast.querySelector(".toast-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", dismiss);
    }

    let timer = setTimeout(dismiss, duration);

    // Pause on hover
    toast.addEventListener("mouseenter", () => {
      clearTimeout(timer);
      const bar = toast.querySelector(".toast-progress-bar");
      if (bar) bar.style.animationPlayState = "paused";
    });

    toast.addEventListener("mouseleave", () => {
      const bar = toast.querySelector(".toast-progress-bar");
      if (bar) bar.style.animationPlayState = "running";
      timer = setTimeout(dismiss, 2000);
    });

    return { dismiss };
  }

  return {
    show,
    success: (msg, title = "Success") => show({ title, message: msg, type: "success" }),
    error: (msg, title = "Notice") => show({ title, message: msg, type: "error" }),
    info: (msg, title = "Information") => show({ title, message: msg, type: "info" }),
    warning: (msg, title = "Attention") => show({ title, message: msg, type: "warning" })
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Toast;
}
