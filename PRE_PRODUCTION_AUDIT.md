# Pre-Production Audit — Purura Resort Website

**Date:** 2026-08-15  
**Status:** Audit Complete — Fixes Pending  
**Purpose:** Track all pre-production issues by category with fix status

---

## How to Use This Document

- Each issue has a **Status** field: `Pending`, `In Progress`, or `Fixed`
- Update the status as fixes are completed
- Do not delete issues — mark them as fixed and keep the record
- Add new issues discovered during fixes to the appropriate section

---

## 1. DATA ISSUES

### 1.1 Corrupted Investment Data
- **Severity:** Critical
- **File:** `lib/investment-data.ts`
- **Issue:** Content appears copied from a smart city project (NEOM-style). Contains references to "PURURA Investment Office (NIO)", "PURURA Investment Fund (NIF)", "World Economic Forum", "FII Institute", "15 sectors", "100+ countries", "global talent attraction". Links like `/our-business/partners/wef/davos` and `/purura-investment-office` are unrelated to a resort.
- **Fix Required:** Replace with resort-appropriate content about Purura, Valuka, Bangladesh investment opportunities.
- **Status:** Pending

### 1.2 ROI Config Data Mismatch
- **Severity:** High
- **Files:** `lib/roi-calculator-data.ts`, `config/roi-config.json`
- **Issue:** Investment type names do not match between the two files.
  - `roi-calculator-data.ts`: "Luxury Villa", "Premium Villa", "Resort Share"
  - `roi-config.json`: "Villa", "Premium V", "Resort Share"
- **Fix Required:** Synchronize names and values across both files.
- **Status:** Pending

### 1.3 Placeholder Text in Production Pages
- **Severity:** High
- **Files:**
  - `app/experience/page.tsx` — "Every zone should feel premium, visual, and connected to the project palette"
  - `app/amenities/page.tsx` — "The amenities should be presented through strong key imagery..."
  - `app/technology/page.tsx` — "Technology is embedded into every guest interaction..."
  - `components/home/ProjectBrief.tsx` — Generic description placeholder
- **Fix Required:** Replace with final copy.
- **Status:** Pending

### 1.4 Typos in Components
- **Severity:** Medium
- **Files:**
  - `components/home/ResortPositioning.tsx:66` — "Dhakas expanding" → "Dhaka's expanding"
  - `components/home/ResortPositioning.tsx:68` — "Bangladeshs" → "Bangladesh's"
  - `components/home/ResortPositioning.tsx:68` — "eco-inteligent desitination" → "eco-intelligent destination"
- **Fix Required:** Correct all typos.
- **Status:** Pending

---

## 2. UI/UX ISSUES

### 2.1 Broken Video Reference in Hero
- **Severity:** Critical
- **File:** `components/home/Hero.tsx:53`
- **Issue:** References `/demo.mp4` which does not exist in `public/`.
- **Fix Required:** Add the video file or replace with a valid reference.
- **Status:** Pending

### 2.2 Placeholder WhatsApp Number
- **Severity:** High
- **File:** `components/layout/WhatsAppButton.tsx:5`
- **Issue:** Uses placeholder number `1234567890`.
- **Fix Required:** Replace with actual WhatsApp number.
- **Status:** Pending

### 2.3 Empty Components (0 bytes)
- **Severity:** High
- **Files:**
  - `components/home/FinancialStrategy.tsx`
  - `components/home/InvestmentCTA.tsx`
  - `components/home/Villas.tsx`
- **Issue:** These components are empty but may be referenced or planned for use.
- **Fix Required:** Either implement content or remove references.
- **Status:** Pending

### 2.4 Non-Functional Forms
- **Severity:** High
- **Files:**
  - `components/investment/ContactForm.tsx` — No submit handler
  - `app/contact-us/page.tsx` — No submit handler
  - `components/investment/InvestmentInquiry.tsx` — Simulates submission with `setTimeout`, no real API call
  - `components/investment/InvestmentStrategy.tsx` — Sets local state only, no submission
- **Fix Required:** Add form submission handlers or clearly mark as "coming soon".
- **Status:** Pending

### 2.5 Broken Navigation Anchors
- **Severity:** Medium
- **Files:**
  - `app/experience/page.tsx` — Dropdown items reference `#lobby`, `#villas`, `#hotels`, `#nature` which do not exist
  - `app/amenities/page.tsx` — Dropdown items reference `#restaurants`, `#culture`, `#events`, `#waterfront` which do not exist
- **Fix Required:** Either add the anchor sections or remove the dropdown items.
- **Status:** Pending

### 2.6 Confusing SectionNav Label
- **Severity:** Low
- **File:** `app/page.tsx:32`
- **Issue:** SectionNav item labeled "InvestmentInquiry" uses a component ID instead of a user-friendly name.
- **Fix Required:** Rename to "Investment" or "Inquiry".
- **Status:** Pending

### 2.7 Performance — Large Video Assets
- **Severity:** Medium
- **Files:** `public/AnimationOpt/` directory
- **Issue:** Total ~63MB of video files (hero-video1.mp4, hero-video2.mp4, resort-entry.mp4, video1.mp4, video2.mp4). No lazy loading or compression evident.
- **Fix Required:** Compress videos, use WebM format, implement lazy loading.
- **Status:** Pending

### 2.8 Global CSS Transitions
- **Severity:** Medium
- **File:** `app/globals.css:70-79`
- **Issue:** Global `* { transition: ... }` on all elements causes performance issues.
- **Fix Required:** Scope transitions to specific elements or remove global rule.
- **Status:** Pending

---

## 3. BRAND & CONTENT ISSUES

### 3.1 Brand Identity Confusion
- **Severity:** Critical
- **Issue:** Site oscillates between luxury resort, smart city, and tech startup positioning. The corrupted `investment-data.ts` reinforces the wrong brand.
- **Fix Required:** Define a single brand voice: Luxury eco-resort for high-net-worth investors. Rewrite all copy to match.
- **Status:** Pending

### 3.2 Inconsistent Tone Across Sections
- **Severity:** Medium
- **Issue:**
  - Footer: "BEGIN your journey" — poetic
  - Investment pages: "OPEN FOR BUSINESS" — corporate
  - Homepage: "Regenerative Hospitality" — nature-focused
  - Corrupted data: "15 sectors", "global talent" — smart city
- **Fix Required:** Align tone across all sections.
- **Status:** Pending

---

## 4. COLOR & DESIGN SYSTEM ISSUES

### 4.1 Palette Document vs Implementation Mismatch
- **Severity:** Critical
- **Files:** `docs/color-palette.md`, `app/globals.css`
- **Issue:** Palette doc specifies warm beige/ivory with champagne gold, explicitly avoiding blue/cyan. However, `globals.css` defines dark theme with `--color-chrome1: #8EC5FF` (blue), `--color-chrome2: #C9A9FF` (purple), `--color-chrome3: #FF9EC4` (pink). These are used extensively.
- **Fix Required:** Decide on one palette direction and unify all colors.
- **Status:** Pending

### 4.2 Inconsistent Section Backgrounds
- **Severity:** High
- **Files:**
  - `components/layout/Footer.tsx:12` — `bg-ivory` (light) breaks dark theme
  - `components/investment/InvestmentInquiry.tsx:124` — `bg-ivory` breaks dark theme
  - `components/home/Banner.tsx:56` — Teal/cyan gradients violate palette rules
- **Fix Required:** Unify all section backgrounds to match chosen palette.
- **Status:** Pending

### 4.3 Hardcoded Colors Throughout Codebase
- **Severity:** High
- **Files:** Multiple
- **Issue:** Many components use hardcoded hex values instead of CSS variables:
  - `components/ui/GoldCTAButton.tsx` — `#C4A552`, `#f4fcf5`, `#182019`, `#F0E4BC`
  - `components/layout/Navbar.tsx` — `#0D1A12`
  - `components/layout/WhatsAppButton.tsx` — `rgba(201, 169, 255, 0.4)`
  - `components/investment/ROICalculator.tsx` — `#C9A9FF`, `#8EC5FF`
  - `components/masterplan/MasterplanExplorer.tsx` — `#C9A45A`
- **Fix Required:** Replace all hardcoded colors with CSS custom properties.
- **Status:** Pending

---

## 5. FUNCTIONALITY ISSUES

### 5.1 Missing SEO Metadata
- **Severity:** Medium
- **Files:** `app/layout.tsx`, all page files
- **Issue:** Only basic metadata in layout. No per-page titles/descriptions, no Open Graph tags, no Twitter Cards, no sitemap.xml, no robots.txt, no structured data.
- **Fix Required:** Add per-page metadata, OG tags, sitemap, robots.txt, JSON-LD.
- **Status:** Pending

### 5.2 Accessibility Gaps
- **Severity:** Medium
- **Issue:**
  - Missing `lang` attributes on some interactive elements
  - No skip-to-content link
  - Form inputs lack explicit `id`/`htmlFor` associations in some places
  - Color contrast may fail on some `text-haze/40` combinations
- **Fix Required:** Add accessibility improvements.
- **Status:** Pending

### 5.3 Error Handling
- **Severity:** Medium
- **Files:**
  - `components/investment/ROICalculator.tsx:63` — Silently fails on API error
  - No loading states for form submissions
  - No error messages for failed operations
- **Fix Required:** Add error boundaries, loading states, and error messages.
- **Status:** Pending

### 5.4 Theme Toggle Disabled
- **Severity:** Low
- **Files:** `components/layout/Navbar.tsx:210`, `app/layout.tsx`
- **Issue:** ThemeToggle is commented out in Navbar. ThemeProvider exists but toggle is not exposed to users.
- **Fix Required:** Either implement theme toggle or remove theme infrastructure if not needed.
- **Status:** Pending

---

## 6. MISSING PRODUCTION ESSENTIALS

### 6.1 No Sitemap or Robots.txt
- **Severity:** Medium
- **Fix Required:** Generate `sitemap.xml` and `robots.txt`.
- **Status:** Pending

### 6.2 No Form Backend
- **Severity:** High
- **Issue:** All forms are client-side only. No API routes for form submission, no email notifications, no data storage.
- **Fix Required:** Implement API routes for contact and investment inquiries.
- **Status:** Pending

### 6.3 No Analytics
- **Severity:** Low
- **Fix Required:** Add GA4 or similar analytics tracking.
- **Status:** Pending

---

## Summary Count

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Data | 1 | 2 | 1 | 0 | 4 |
| UI/UX | 1 | 3 | 3 | 1 | 8 |
| Brand & Content | 1 | 0 | 1 | 0 | 2 |
| Color & Design | 1 | 2 | 0 | 0 | 3 |
| Functionality | 0 | 1 | 3 | 1 | 5 |
| Production Essentials | 0 | 1 | 1 | 1 | 3 |
| **Total** | **4** | **9** | **9** | **3** | **25** |

---

## Fix Priority Order

1. **P0 (Critical — Block Production):**
   - 1.1 Corrupted investment data
   - 2.1 Broken video reference
   - 3.1 Brand identity confusion
   - 4.1 Palette mismatch

2. **P1 (High — Fix Before Launch):**
   - 1.2 ROI config mismatch
   - 1.3 Placeholder text
   - 2.2 Placeholder WhatsApp
   - 2.3 Empty components
   - 2.4 Non-functional forms
   - 4.2 Inconsistent backgrounds
   - 4.3 Hardcoded colors
   - 6.2 No form backend

3. **P2 (Medium — Fix Soon After Launch):**
   - 1.4 Typos
   - 2.5 Broken navigation anchors
   - 2.6 Confusing SectionNav label
   - 2.7 Large video assets
   - 2.8 Global CSS transitions
   - 3.2 Inconsistent tone
   - 5.1 Missing SEO
   - 5.2 Accessibility gaps
   - 5.3 Error handling
   - 6.1 No sitemap/robots.txt

4. **P3 (Low — Nice to Have):**
   - 5.4 Theme toggle disabled
   - 6.3 No analytics
