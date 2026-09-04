# Pre-Publication Audit — Purura Resort

I've gone through your color tokens, theming, components, data, assets, and metadata. Your project has a clear design intent (warm beige + champagne gold luxury resort), but the implementation still leaks the old "smart-city blue/purple" system in many places, and several non-color issues will also block a clean production launch.

## A. COLOR & TONALITY (your primary concern)

### A1. The blue/purple ghost is still everywhere — CRITICAL
[`docs/color-palette.md`](docs/color-palette.md:22) explicitly forbids blue, cyan, teal, and purple. The CSS tokens were refactored to the warm palette, but ~60+ live usages of the old palette remain:

- [`components/home/Banner.tsx:56`](components/home/Banner.tsx:56) — teal `#163f4d → #0d3445 → #092c3b` gradient (and 3 more "discover/invest/retreat" teal variants)
- [`components/home/KeyFeatures.tsx:43`](components/home/KeyFeatures.tsx:43) — `rgba(142,197,255,...)` + `rgba(201,169,255,...)`
- [`components/home/ProjectBrief.tsx:42`](components/home/ProjectBrief.tsx:42) — same
- [`components/home/Masterplan.tsx:26`](components/home/Masterplan.tsx:26) — same
- [`components/masterplan/MasterplanExplorer.tsx:87`](components/masterplan/MasterplanExplorer.tsx:87) — `rgba(142,197,255,0.04)`
- [`components/villas/VillaCollection.tsx:12`](components/villas/VillaCollection.tsx:12) — `rgba(142,197,255,0.06)`
- [`components/investment/DiscoverBanner.tsx:10`](components/investment/DiscoverBanner.tsx:10), [`WhyInvest.tsx:62`](components/investment/WhyInvest.tsx:62), [`WhatHappensNext.tsx:53`](components/investment/WhatHappensNext.tsx:53), [`ContactForm.tsx:15`](components/investment/ContactForm.tsx:15), [`InquirySuccess.tsx:16`](components/investment/InquirySuccess.tsx:16) — all blue/purple radials
- [`components/masterplan/InfoPanel.tsx:26`](components/masterplan/InfoPanel.tsx:26) — Planned badge is purple `#C9A9FF`
- [`components/investment/ROICalculator.tsx:400-431`](components/investment/ROICalculator.tsx:400) — chart strokes `#C9A9FF` / `#8EC5FF`
- [`components/masterplan/MasterPlanMap.tsx:34-87`](components/masterplan/MasterPlanMap.tsx:34) — map spot colors include `#8EC5FF`, `#C9A9FF`, `#3ab0c0`, `#4a8c3f`
- [`components/layout/BrandIntro.tsx:62-63`](components/layout/BrandIntro.tsx:62) — blue/purple radial overlays
- [`components/home/Philosophy.tsx:126`](components/home/Philosophy.tsx:126), [`Experiences.tsx:216`](components/home/Experiences.tsx:216) — grid lines hardcoded `#EDEDE8`

**Impact:** Every section flickers between luxury-warm and tech-blue. **Solution:** Sweep all `rgba(142,197,255,...)` and `rgba(201,169,255,...)` instances to warm equivalents — `rgba(201,164,90,...)` (champagne) and `rgba(31,26,21,...)` (bone) at low opacities. Remap MasterPlanMap spot palette to champagne, cognac, bronze, olive, cream.

### A2. ScrollColorTransition uses raw RGB colors outside the token system — HIGH
[`components/home/ScrollColorTransition.tsx:6`](components/home/ScrollColorTransition.tsx:6) hardcodes ten RGB tuples including forbidden `[10,10,12]` near-black and `[27,40,28]` forest-green. A 15% opacity wash covers the whole homepage in non-palette colors while scrolling. **Solution:** Define `transitionPalette` from the same RGB values as your CSS tokens (`[248,243,234]`, `[241,230,216]`, `[255,253,248]`, `[43,33,25]`, `[74,69,36]`, `[201,164,90]`).

### A3. Full-screen menu uses off-palette `#1a2e1a` — HIGH
[`components/layout/Navbar.tsx:282`](components/layout/Navbar.tsx:282) and [`:441`](components/layout/Navbar.tsx:441) use `#1a2e1a` (forest green) for the menu background — the "tech" hue, not the warm dark `#2B2119` defined in `--color-overlay`. The premium menu reveal breaks tonal continuity. **Solution:** Replace with `bg-overlay` or a new `--color-menu-dark` token.

### A4. Status semantics use wrong hues — MEDIUM
[`components/masterplan/InfoPanel.tsx:26`](components/masterplan/InfoPanel.tsx:26): Planned = purple, In Progress = gold, Completed = bright green `#4a8c3f`. Purple and bright green are forbidden; the traffic-light feel is wrong for luxury. **Solution:** Champagne = In Progress, cognac = Planned, forest olive `#4E4524` = Completed (all existing tokens).

### A5. Color contrast fails on muted text — MEDIUM
[`docs/color-usage.md:158`](docs/color-usage.md:158) lists `text-haze/40`, `text-haze/50`, `text-bone/30/40/50` as heavily used. On warm beige (`#F8F3EA`), `text-haze/40` ≈ `#D5CAB5`, contrast ratio ≈ 2.7:1 — fails WCAG AA (needs 4.5:1). Unreadable in bright sunlight. **Solution:** Treat 30/40/50 opacity text as decorative-only. Use `text-haze/70` minimum for required copy.

### A6. Hardcoded hex inside components defeats tokenization — MEDIUM
[`components/layout/Navbar.tsx:485`](components/layout/Navbar.tsx:485): `text-[#C9A45A]`; [`components/ui/GoldCTAButton.tsx:24`](components/ui/GoldCTAButton.tsx:24): `rgba(201, 164, 90, ...)`; [`components/layout/SectionNav.tsx:249`](components/layout/SectionNav.tsx:249): `#B8A88A`; [`components/layout/WhatsAppButton.tsx:64`](components/layout/WhatsAppButton.tsx:64): `rgba(201, 164, 90, ...)`. **Solution:** Replace with token classes (`text-champagne`, `bg-overlay/50`) or `var(--color-…)`.

### A7. Theme toggle is dead code — MEDIUM
[`components/layout/Navbar.tsx:212`](components/layout/Navbar.tsx:212) has `<ThemeToggle />` commented out; [`components/ThemeToggle.tsx`](components/ThemeToggle.tsx) is a 149-byte stub; the inline script in [`app/layout.tsx:55`](app/layout.tsx:55) clears theme keys and forces `data-theme="light"` — so dark mode is impossible by design. **Solution:** Pick one direction — wire the toggle in, or remove the dead dark-theme block + ThemeProvider + inline script.

### A8. `.text-shadow-*` doesn't switch with theme — LOW
[`app/globals.css:213-222`](app/globals.css:213) hardcodes `rgba(31, 26, 21, 0.5)` — on a dark theme, dark shadows on dark backgrounds become invisible anti-shadows. **Solution:** Use `var(--color-overlay)` or define dark variants.

## B. NON-COLOR PRE-PUBLICATION CONCERNS

### B1. Asset weight will destroy first paint — CRITICAL
[`public/AnimationOpt/`](public/AnimationOpt/) has **5 MP4s totaling ~120 MB** (hero-video1.mp4 = 43 MB, hero-video2.mp4 = 28 MB). [`public/Opt video/`](public/Opt%20video/) has **9 WebMs totaling ~330 MB**. None stream, none lazy-load. **Solution:** Convert hero videos to WebM (VP9) 1080p, target < 4 MB each. Use AVIF/WebP poster frames. Lazy-load below-fold clips. Consider HLS/DASH for cinematic backgrounds.

### B2. `purura-logo.png` is 1 MB — HIGH
[`public/purura-logo.png`](public/purura-logo.png) is 1,070,550 bytes. **Solution:** Convert to WebP + SVG fallback.

### B3. Next.js 16 + dependency version mismatches — HIGH
[`package.json:18`](package.json:18) lists `"next": "16.2.6"`. Next 16 has breaking changes (async `params`, removed legacy `next/image` APIs, changed `metadata` behavior). Several pages may fail at build time. **Solution:** Run `npm run build`, resolve every deprecation warning. Also [`package.json:17`](package.json:17) lists `"lucide-react": "^1.18.0"` — Lucide uses 0.x versioning; version 1.x may not exist. **Solution:** Pin to actual stable version (~0.4xx).

### B4. SEO/metadata is a skeleton — HIGH
[`app/layout.tsx:37`](app/layout.tsx:37) has only generic title/description. No `openGraph`, no `twitter` card, no canonical URL, no `metadataBase`, no JSON-LD schema, no per-page metadata, no `sitemap.ts`, no `robots.ts`, no `manifest.webmanifest`. **Solution:** Add per-page metadata exports, static `app/sitemap.ts`, `app/robots.ts`, JSON-LD `Organization` + `RealEstateListing`.

### B5. Forms don't submit anywhere — HIGH
[`components/investment/ContactForm.tsx`](components/investment/ContactForm.tsx), [`InvestmentInquiry.tsx`](components/investment/InvestmentInquiry.tsx), and [`app/contact-us/page.tsx`](app/contact-us/page.tsx) are client-side only with `setTimeout` mocks. A real investor fills the form, sees a success toast, nothing arrives. **Solution:** Wire to POST API routes, persist or email (Resend/SendGrid) or forward to CRM. Add rate limiting + CAPTCHA.

### B6. Corrupted content still references NEOM/smart-city — CRITICAL
[`lib/investment-data.ts`](lib/investment-data.ts) still mentions "PURURA Investment Office (NIO)", "World Economic Forum", "FII Institute", "15 sectors", "100+ countries", routes like `/our-business/partners/wef/davos`. An investor reads "WEF/Davos partner" and sees copied boilerplate. **Solution:** Rewrite with Purura / Valuka / Bangladesh-specific ROI drivers, real partners, real sectors.

### B7. Three empty component files — HIGH
[`components/home/FinancialStrategy.tsx`](components/home/FinancialStrategy.tsx), [`InvestmentCTA.tsx`](components/home/InvestmentCTA.tsx), [`Villas.tsx`](components/home/Villas.tsx) are 0 bytes. Will crash the build if imported. **Solution:** Remove or implement.

### B8. Broken anchor links in dropdown nav — MEDIUM
[`components/layout/Navbar.tsx:19-31`](components/layout/Navbar.tsx:19) routes to `/experience#lobby`, `#hotels`, `#nature`, `/amenities#restaurants`, `#culture`, `#events`, `#waterfront` — none exist on destination pages. **Solution:** Add corresponding `id` anchors.

### B9. Placeholder WhatsApp number — HIGH
[`components/layout/WhatsAppButton.tsx:5`](components/layout/WhatsAppButton.tsx:5) uses `1234567890`. A prospective investor taps it and chats with a stranger. **Solution:** Replace with actual business number + country code (env var preferred).

### B10. Global `* { transition }` causes jank — MEDIUM
[`app/globals.css:70`](app/globals.css:70) puts a 0.5s transition on every property of every element. Every paint triggers a transition check. **Solution:** Scope to a `.theme-transitioning *` class toggled briefly on theme change.

### B11. ROI config + leftover backup file — MEDIUM
Audit claims 1.2 is Fixed, but [`config/roi-config.backup.json`](config/roi-config.backup.json) is still shipped. **Solution:** Delete backup. Verify every key matches between [`lib/roi-calculator-data.ts`](lib/roi-calculator-data.ts) and [`config/roi-config.json`](config/roi-config.json).

### B12. ROI calculator error handling is partial — MEDIUM
No `try/catch` around submit, no retry, no validation format. **Solution:** Inline field validation (email, phone `+880` format), surface backend errors in Toast, add retry.

### B13. Brand intro blocks first paint for 3 seconds — MEDIUM
[`components/layout/Navbar.tsx:148`](components/layout/Navbar.tsx:148) plays a `BrandIntro` with `minimumDuration={3000}`. Time-to-interactive = 3s minimum. **Solution:** Reduce to ~800ms or use `sessionStorage` to skip on repeat visits, or play only on `/`.

### B14. Accessibility incomplete — MEDIUM
- `text-bone/30`, `text-haze/40` fail WCAG AA on small text (see A5).
- No `:focus-visible` styles beyond the skip-link.
- `motion.div`s everywhere with no `useReducedMotion()` gating.
- Decorative motion needs `aria-hidden="true"`.

**Solution:** Add global `:focus-visible { outline: 2px solid var(--color-champagne) }`. Wrap Framer Motion in `useReducedMotion()`.

### B15. `grain-overlay` references a missing asset — LOW
[`app/globals.css:116`](app/globals.css:116) defines `.grain-overlay` but `background-image: url("/noise.svg")` is commented out and the file doesn't exist. Still added in [`app/layout.tsx:81`](app/layout.tsx:81). **Solution:** Remove or implement.

### B16. README is default Next.js boilerplate — LOW
[`README.md`](README.md) is the `create-next-app` default. **Solution:** Replace with project-specific README (setup, env vars, deployment, design system).

### B17. `lucide-react` pinned to a non-existent version — MEDIUM
[`package.json:17`](package.json:17): `"lucide-react": "^1.18.0"`. Lucide uses 0.x versioning; 1.18 likely doesn't exist. Build may break in CI. **Solution:** `npm view lucide-react versions`, pin to actual stable (~0.4xx).

### B18. No environment variable documentation — MEDIUM
No `.env.example`, no mention of `ADMIN_PASSWORD_HASH`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, etc. **Solution:** Add `.env.example` with placeholders.

## Summary Priority

| Priority | Items | Effort |
|---|---|---|
| **P0 — Block production** | A1, A2, A3, B1, B6, B9 | 2–3 days |
| **P1 — High** | A4, A6, B2, B3, B4, B5, B7, B10 | 2–3 days |
| **P2 — Medium** | A5, A7, A8, B8, B11, B12, B13, B14, B17, B18 | 1–2 days |
| **P3 — Low** | B15, B16 | 30 min |

**The single most damaging issue is the tonal split** — the site is shipping two color systems at once. Fixing A1–A3 alone will perceptibly transform the production site.

**The second most damaging is B1 (asset weight)** — 450 MB of video in `/public` will destroy LCP and tank investor first impressions.

No code changes made — audit only. Ready to execute fixes on your go-ahead.