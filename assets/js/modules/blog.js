/**
 * HavenNest Lodge & Budget Hotel - Blog & Travel Guides Engine
 * Category filtering, live search, bookmarking, and interactive article reader modal.
 */

const BlogEngine = (function () {
  let currentCategory = "all";
  let searchQuery = "";
  let bookmarkedIds = new Set();

  function loadBookmarks() {
    try {
      const saved = localStorage.getItem("haven_blog_bookmarks");
      if (saved) {
        bookmarkedIds = new Set(JSON.parse(saved));
      }
    } catch (e) {
      bookmarkedIds = new Set();
    }
  }

  function saveBookmarks() {
    try {
      localStorage.setItem("haven_blog_bookmarks", JSON.stringify([...bookmarkedIds]));
    } catch (e) {}
  }

  function toggleBookmark(id) {
    if (bookmarkedIds.has(id)) {
      bookmarkedIds.delete(id);
      if (typeof Toast !== "undefined") {
        Toast.info("Article removed from saved reads");
      }
    } else {
      bookmarkedIds.add(id);
      if (typeof Toast !== "undefined") {
        Toast.success("Article saved to your bookmarks!");
      }
    }
    saveBookmarks();
    updateBookmarkButtons();
  }

  function updateBookmarkButtons() {
    document.querySelectorAll(".blog-bookmark-btn").forEach((btn) => {
      const id = btn.getAttribute("data-id");
      if (bookmarkedIds.has(id)) {
        btn.classList.add("active");
        btn.setAttribute("aria-label", "Remove from bookmarks");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-label", "Save article");
      }
    });
  }

  function getFilteredPosts() {
    if (typeof BLOG_DATA === "undefined") return [];

    return BLOG_DATA.filter((post) => {
      const matchesCategory =
        currentCategory === "all" || post.category === currentCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }

  function renderFeaturedPost() {
    const container = document.getElementById("featured-blog-container");
    if (!container || typeof BLOG_DATA === "undefined") return;

    const featured = BLOG_DATA.find((p) => p.isFeatured) || BLOG_DATA[0];
    if (!featured) return;

    container.innerHTML = `
      <article class="featured-blog-card" aria-label="Featured Travel Guide">
        <div class="featured-blog-media">
          <img src="${featured.coverImage}" alt="${featured.title}" class="featured-blog-img" loading="eager" />
          <span class="badge badge-accent featured-badge">Editor's Top Pick</span>
        </div>
        <div class="featured-blog-content">
          <div class="blog-meta-row">
            <span class="badge badge-neutral">${featured.categoryLabel}</span>
            <span class="blog-meta-dot">•</span>
            <span class="blog-meta-time">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${featured.readTime}
            </span>
            <span class="blog-meta-dot">•</span>
            <span class="blog-meta-date">${featured.publishedDate}</span>
          </div>
          <h2 class="featured-blog-title">
            <a href="javascript:void(0)" class="open-article-btn" data-id="${featured.id}">${featured.title}</a>
          </h2>
          <p class="featured-blog-excerpt">${featured.excerpt}</p>
          <div class="featured-author-footer">
            <div class="blog-author-info">
              <img src="${featured.author.avatar}" alt="${featured.author.name}" class="author-avatar-img" />
              <div>
                <span class="author-name">${featured.author.name}</span>
                <span class="author-role">${featured.author.role}</span>
              </div>
            </div>
            <div class="featured-actions">
              <button type="button" class="btn btn-primary open-article-btn" data-id="${featured.id}">
                <span>Read Full Story</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderGrid() {
    const grid = document.getElementById("blog-posts-grid");
    const countDisplay = document.getElementById("blog-count-display");
    if (!grid) return;

    const posts = getFilteredPosts();

    if (countDisplay) {
      countDisplay.textContent = `Showing ${posts.length} ${posts.length === 1 ? "article" : "articles"}`;
    }

    if (posts.length === 0) {
      grid.innerHTML = `
        <div class="blog-empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon-wrap">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </div>
          <h3 class="empty-title">No travel guides found</h3>
          <p class="empty-subtitle">We couldn't find any articles matching "${searchQuery}". Try a different keyword or reset filters.</p>
          <button type="button" class="btn btn-outline" id="reset-blog-filters-btn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-blog-filters-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          currentCategory = "all";
          searchQuery = "";
          const searchInput = document.getElementById("blog-search-input");
          if (searchInput) searchInput.value = "";
          document.querySelectorAll(".blog-filter-tab").forEach((tab) => {
            tab.classList.toggle("active", tab.getAttribute("data-category") === "all");
          });
          renderGrid();
        });
      }
      return;
    }

    grid.innerHTML = posts
      .map((post) => {
        const isBookmarked = bookmarkedIds.has(post.id);
        return `
        <article class="blog-card" aria-label="${post.title}">
          <div class="blog-card-media">
            <img src="${post.coverImage}" alt="${post.title}" class="blog-card-img" loading="lazy" />
            <span class="badge badge-accent blog-card-badge">${post.categoryLabel}</span>
            <button type="button" class="blog-bookmark-btn ${isBookmarked ? "active" : ""}" data-id="${post.id}" aria-label="${isBookmarked ? "Remove from bookmarks" : "Save article"}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>

          <div class="blog-card-content">
            <div class="blog-card-meta">
              <span class="blog-meta-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${post.readTime}
              </span>
              <span class="blog-meta-dot">•</span>
              <span class="blog-meta-item">${post.publishedDate}</span>
            </div>

            <h3 class="blog-card-title">
              <a href="javascript:void(0)" class="open-article-btn" data-id="${post.id}">
                ${post.title}
              </a>
            </h3>

            <p class="blog-card-excerpt">${post.excerpt}</p>

            <div class="blog-card-footer">
              <div class="blog-card-author">
                <img src="${post.author.avatar}" alt="${post.author.name}" class="author-thumb-img" />
                <span class="author-thumb-name">${post.author.name}</span>
              </div>
              <button type="button" class="btn-text open-article-btn" data-id="${post.id}">
                <span>Read Article</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    updateBookmarkButtons();
  }

  function openArticleModal(id) {
    if (typeof BLOG_DATA === "undefined") return;
    const post = BLOG_DATA.find((p) => p.id === id);
    if (!post) return;

    const modal = document.getElementById("blog-reader-modal");
    if (!modal) return;

    // Populate modal contents
    const modalImage = document.getElementById("modal-blog-img");
    const modalCategory = document.getElementById("modal-blog-category");
    const modalTitle = document.getElementById("modal-blog-title");
    const modalAuthorImg = document.getElementById("modal-blog-author-img");
    const modalAuthorName = document.getElementById("modal-blog-author-name");
    const modalAuthorRole = document.getElementById("modal-blog-author-role");
    const modalDate = document.getElementById("modal-blog-date");
    const modalReadTime = document.getElementById("modal-blog-readtime");
    const modalBody = document.getElementById("modal-blog-body");
    const modalTags = document.getElementById("modal-blog-tags");
    const modalShareBtn = document.getElementById("modal-blog-share-btn");

    if (modalImage) modalImage.src = post.coverImage;
    if (modalCategory) modalCategory.textContent = post.categoryLabel;
    if (modalTitle) modalTitle.textContent = post.title;
    if (modalAuthorImg) modalAuthorImg.src = post.author.avatar;
    if (modalAuthorName) modalAuthorName.textContent = post.author.name;
    if (modalAuthorRole) modalAuthorRole.textContent = post.author.role;
    if (modalDate) modalDate.textContent = post.publishedDate;
    if (modalReadTime) modalReadTime.textContent = post.readTime;
    if (modalBody) modalBody.innerHTML = post.contentHtml;

    if (modalTags) {
      modalTags.innerHTML = (post.tags || [])
        .map((t) => `<span class="badge badge-neutral">${t}</span>`)
        .join("");
    }

    if (modalShareBtn) {
      modalShareBtn.onclick = function () {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
        }
        if (typeof Toast !== "undefined") {
          Toast.success("Article link copied to clipboard!");
        }
      };
    }

    modal.classList.add("active");
    document.body.classList.add("modal-open");
  }

  function closeArticleModal() {
    const modal = document.getElementById("blog-reader-modal");
    if (!modal) return;
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  function bindEvents() {
    // Filter tabs
    document.querySelectorAll(".blog-filter-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".blog-filter-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        currentCategory = tab.getAttribute("data-category") || "all";
        renderGrid();
      });
    });

    // Search input
    const searchInput = document.getElementById("blog-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderGrid();
      });
    }

    // Delegation for opening article modal and bookmarking
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest(".open-article-btn");
      if (openBtn) {
        e.preventDefault();
        const id = openBtn.getAttribute("data-id");
        if (id) openArticleModal(id);
        return;
      }

      const bookmarkBtn = e.target.closest(".blog-bookmark-btn");
      if (bookmarkBtn) {
        e.preventDefault();
        const id = bookmarkBtn.getAttribute("data-id");
        if (id) toggleBookmark(id);
        return;
      }

      const closeBtn = e.target.closest(".blog-modal-close-btn");
      if (closeBtn) {
        e.preventDefault();
        closeArticleModal();
        return;
      }

      // Backdrop click
      if (e.target.classList.contains("blog-modal-backdrop")) {
        closeArticleModal();
      }
    });

    // Escape key to close modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeArticleModal();
      }
    });

    // Sidebar newsletter form
    const newsForm = document.getElementById("blog-newsletter-form");
    if (newsForm) {
      newsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = newsForm.querySelector("input[type='email']");
        if (input && input.value.trim()) {
          input.value = "";
          if (typeof Toast !== "undefined") {
            Toast.success("Subscribed! Thank you for following our travel updates.");
          }
        }
      });
    }
  }

  function init() {
    loadBookmarks();
    renderFeaturedPost();
    renderGrid();
    bindEvents();
  }

  return {
    init,
    openArticleModal,
    closeArticleModal,
    setCategory: (cat) => {
      currentCategory = cat;
      renderGrid();
    }
  };
})();

// Auto-initialize if DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", BlogEngine.init);
} else {
  BlogEngine.init();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = BlogEngine;
}
