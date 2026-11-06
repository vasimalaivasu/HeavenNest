# HavenNest - Budget Hotel & Lodge HTML5 Template

> **Comfortable Stays. Honest Prices.**
> A modern, fast, ThemeForest-ready HTML5 template tailored for budget hotels, lodges, homestays, highway motels, and guest houses.

---

## 🌟 Overview

**HavenNest** is a brochure-style, conversion-focused HTML5 template with **NO dashboards**, **NO authentication**, and **NO backend dependencies**. The primary conversion goal is the intuitive **Booking Enquiry Form** equipped with live pricing estimation, date validation, and pre-formatted WhatsApp deep-linking.

Inspired by the fluid UI/UX, micro-interactions, smooth scrolling, and accessible navigation patterns of modern high-conversion web apps, HavenNest delivers an original, welcoming visual identity built with warm off-white tones, deep navy brand bases, and warm terracotta accents.

---

## 🚀 Key Highlights & Features

- **100% Frontend-Based:** Pure HTML5, CSS3, Vanilla ES6 JavaScript. No React, Vue, PHP, or Node build step required.
- **Light & Dark Mode:** Usable dark mode (deep navy/charcoal) with automatic LocalStorage preference memory.
- **Full RTL (Right-to-Left) Support:** Built with CSS Logical Properties (`margin-inline`, `padding-inline`, etc.) for seamless Arabic/Hebrew layouts.
- **Interactive Booking Enquiry Engine:**
  - Real-time cost estimator (Night count × Room rate × Rooms).
  - Check-in / check-out date constraints (past dates blocked, checkout after checkin).
  - Stepper controls for Rooms, Adults, and Children.
  - Auto-generated Enquiry Reference ID (e.g. `ENQ-2026-8341`).
  - Draft autosave to LocalStorage so guests never lose their input.
  - Direct WhatsApp conversion link (`wa.me`) with pre-filled enquiry details.
- **Room Details Modal:** Interactive modal with multi-image gallery switcher, inclusions, exclusions, house rules, and tariff breakdown.
- **Accessible Lightbox:** Full-screen gallery viewer with keyboard controls (Escape, Arrow Left/Right) and image counter.
- **Filterable Tariff Schedule:** Live category filtering (Standard, Deluxe, Family, Dorm, AC, Non-AC) and sorting by price/capacity.
- **Dual Currency Display:** Quick toggle between USD ($) and INR (₹) with real-time recalculation.
- **Mobile First Navigation:** Sticky navbar, responsive drawer menu, and mobile sticky bottom action bar ("Call" & "Enquire").
- **SEO & Schema.org Structured Data:** Semantic JSON-LD for `LodgingBusiness` and `ContactPage`.
- **Zero Dead Buttons:** Every button, tab, accordion, stepper, and counter is interactive.

---

## 📁 File Structure

```text
havennest-template/
├── index.html              # Home 1 - Classic Lodge (Hero, Quick Bar, Showcase, Why Choose Us, Gallery, FAQ)
├── home-2.html             # Home 2 - Transit Stay (Split Hero, Live Rate Calculator, Travel Style Tabs, Deals)
├── rooms.html              # Rooms & Tariff Page (Filters, Sort, Full Tariff Table, FAQs)
├── facilities.html         # Facilities Page (Grouped In-room, Hotel Services, Safety, House Rules)
├── blog.html               # Travel Blog & Guides (Search, Categories, Bookmarks & Article Modal)
├── contact.html            # Contact Page & Interactive Booking Enquiry Form
├── 404.html                # Custom Hotel-Themed 404 Error Page
├── terms.html              # Stay Policies, Cancellation & Privacy
├── README.md               # Documentation & Overview
├── docs/                   # Buyer Documentation
│   ├── index.html          # Documentation Browser
│   └── docs.css            # Documentation Stylesheet
└── assets/
    ├── css/
    │   └── style.css       # Master Stylesheet (Variables, Dark Theme, RTL, Components)
    ├── images/
    │   ├── logo-icon.svg   # Scalable Vector Brand Logo
    │   └── favicon.svg     # Scalable Vector Browser Favicon
    └── js/
        ├── main.js         # Entry Point, Counters & FAQ Accordions
        ├── data/
        │   ├── images.js   # Centralized Image URL Registry
        │   ├── rooms-data.js # Master Room Database & Tariffs
        │   └── blog-data.js  # Master Travel Guides & Articles Database
        └── modules/
            ├── storage.js      # Safe LocalStorage Wrapper
            ├── theme.js        # Light / Dark Switcher
            ├── rtl.js          # RTL / LTR Switcher
            ├── toast.js        # Notification Toasts
            ├── modal.js        # Accessible Room Modal
            ├── lightbox.js     # Full-Screen Gallery Viewer
            ├── filters.js      # Live Room Sorting & Category Tabs
            ├── enquiry-form.js # Form validation & Live Price Calculator
            ├── blog.js         # Category Filter, Live Search & Article Reader Modal
            └── navigation.js   # Sticky Nav, Drawer & Currency Switcher
```

---

## 🎨 Customization Guide

### 1. Colors & Branding
All colors are defined via CSS custom properties in `assets/css/style.css`:
```css
:root {
  --brand-navy: #0B253A;       /* Base brand color */
  --brand-accent: #D96B27;     /* Primary CTA accent */
  --brand-accent-hover: #BF5A1B;
  --bg-page: #FAF7F2;          /* Light cream surface */
  --bg-surface: #FFFFFF;
}
```

### 2. Changing Phone, Social & WhatsApp Links
- **Phone:** Search for `tel:+18004567890` in HTML files and replace with your business number.
- **Social Login Links:** In the footer of all HTML files, links are pre-configured to redirect to Facebook, Instagram, and Twitter login portals (`https://www.facebook.com/login/`, `https://www.instagram.com/accounts/login/`, `https://twitter.com/i/flow/login`). Replace them with your brand profile handles if desired.
- **WhatsApp:** In `assets/js/modules/enquiry-form.js`, update:
  ```javascript
  const hotelNumber = "919876543210"; // International format without +
  ```

### 3. Replacing Photos
Open `assets/js/data/images.js` to replace any image URL with your own local file path (e.g. `assets/images/rooms/deluxe.jpg`).

### 4. Updating Rooms & Pricing
Open `assets/js/data/rooms-data.js` to modify room names, descriptions, weekday rates, weekend rates, and amenities.

---

## 📬 Connecting Enquiry Form to Email

### Formspree
In `contact.html`, add your Formspree endpoint to the `<form>` tag:
```html
<form action="https://formspree.io/f/YOUR_ENDPOINT_ID" method="POST">
```

### EmailJS
Include the EmailJS browser SDK in `contact.html` and trigger `emailjs.send()` inside `handleSubmit()` in `assets/js/modules/enquiry-form.js`.

---

## 🌐 Browser Compatibility

- Google Chrome (latest)
- Mozilla Firefox (latest)
- Apple Safari (latest)
- Microsoft Edge (latest)
- iOS Safari & Android Chrome

---

## 📄 License & Credits

- Typography: **Outfit** and **Inter** by Google Fonts
- Photography: Curated high-resolution hospitality photos via **Unsplash**
- Designed for ThemeForest & TemplateMonster commercial distribution.
