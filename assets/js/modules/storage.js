/**
 * HavenNest Lodge & Budget Hotel - Storage Module
 * Safe localStorage wrapper with memory fallback for private browsing.
 * Stores only UI preferences, enquiry drafts & demo logs. NO auth/sensitive data.
 */

const Storage = (function () {
  const memoryFallback = {};

  function isLocalStorageAvailable() {
    try {
      const testKey = "__haven_test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  const hasStorage = isLocalStorageAvailable();

  function getItem(key, defaultValue = null) {
    try {
      if (hasStorage) {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : defaultValue;
      }
      return memoryFallback[key] !== undefined ? memoryFallback[key] : defaultValue;
    } catch (e) {
      console.warn("Storage.getItem error for key:", key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    try {
      if (hasStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        memoryFallback[key] = value;
      }
      return true;
    } catch (e) {
      console.warn("Storage.setItem error for key:", key, e);
      return false;
    }
  }

  function removeItem(key) {
    try {
      if (hasStorage) {
        localStorage.removeItem(key);
      } else {
        delete memoryFallback[key];
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  // Keys
  const KEYS = {
    THEME: "haven_theme_mode",
    RTL: "haven_rtl_pref",
    CURRENCY: "haven_currency_pref",
    ENQUIRY_DRAFT: "haven_enquiry_draft",
    ENQUIRY_LOGS: "haven_enquiries_log",
    NEWSLETTER: "haven_newsletter_sub"
  };

  // Clean up any legacy dark mode keys to ensure initial light theme
  try {
    if (hasStorage && localStorage.getItem("haven_theme_pref")) {
      localStorage.removeItem("haven_theme_pref");
    }
  } catch (e) {}

  return {
    // Theme (Default is always light theme)
    getTheme: () => getItem(KEYS.THEME, "light"),
    setTheme: (theme) => setItem(KEYS.THEME, theme),

    // RTL
    getRTL: () => getItem(KEYS.RTL, false),
    setRTL: (isRtl) => setItem(KEYS.RTL, isRtl),

    // Currency ($ or INR ₹)
    getCurrency: () => getItem(KEYS.CURRENCY, "USD"),
    setCurrency: (curr) => setItem(KEYS.CURRENCY, curr),

    // Enquiry Draft (Auto-save)
    getEnquiryDraft: () => getItem(KEYS.ENQUIRY_DRAFT, null),
    saveEnquiryDraft: (draft) => setItem(KEYS.ENQUIRY_DRAFT, draft),
    clearEnquiryDraft: () => removeItem(KEYS.ENQUIRY_DRAFT),

    // Enquiry Submissions Log (For reviewer / client demo proof)
    getEnquiryLogs: () => getItem(KEYS.ENQUIRY_LOGS, []),
    saveEnquiryLog: (enquiry) => {
      const logs = getItem(KEYS.ENQUIRY_LOGS, []);
      logs.unshift(enquiry);
      // Keep up to 20 recent submissions
      if (logs.length > 20) logs.pop();
      setItem(KEYS.ENQUIRY_LOGS, logs);
      return logs;
    },

    // Newsletter
    isNewsletterSubscribed: () => !!getItem(KEYS.NEWSLETTER, false),
    setNewsletterSubscribed: (email) => setItem(KEYS.NEWSLETTER, { email, date: new Date().toISOString() })
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Storage;
}
