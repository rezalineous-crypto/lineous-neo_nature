# PURURA Homepage Section Redesign Plan

## Current Structure Analysis

### Existing Sections (in order):
1. **Hero** (Hero.tsx) — Video background, two-column text + video layout
2. **ProjectBrief** — Image slideshow + text grid (image | text)
3. **KeyFacts** — Background image with 4 fact cards
4. **ResortPositioning** — Background image with metrics cards
5. **KeyFeatures** — Image + text with feature cards grid
6. **MasterplanExplorer** — Interactive masterplan with hotspots
7. **InvestmentInquiry** — Form with text (two-column)
8. **VillaCollection** — 3-column image cards
9. **Technology** — Background image with feature grid
10. **Footer** — Centered layout with CTA

### Problems:
- Repetitive image + text pattern
- Generic card grids
- No horizontal scroll sections
- No pinned storytelling
- No dramatic whitespace
- No overlapping elements
- No architectural details
- Background is always dark/void
- No visual tension or rhythm variation

---

## New Section Design Plan

### Section 1: HERO — Cinematic Full-Screen Arrival
**Composition:** Full-bleed image with cinema camera drift
**Story:** Arrival — the visitor enters the world of PURURA
**Feeling:** Cinematic, immersive, editorial
**Key Elements:**
- Full-bleed background image with subtle cinema camera drift (sinusoidal movement)
- Magazine-style editorial typography in lower-left
- Asymmetric text placement
- Eyebrow text: "Valuka, Bangladesh"
- Headline: "Regenerative / Intelligent / Hospitality" (stacked, varying sizes)
- Subheadline with breathing room
- Two CTAs: "Investment Opportunities" + "Explore Masterplan"
- Scroll indicator at bottom center
- Overlay system: radial gradient + bottom gradient + top gradient + warm light accent

**Technical:**
- `useAnimationFrame` for cinema drift
- `motion.div` for text reveals with stagger
- `clamp()` for fluid typography
- Video or image background

---

### Section 2: PHILOSOPHY — Giant Typography Pause
**Composition:** Almost completely white/ivory, gigantic typography, enormous whitespace
**Story:** Discovery — what is PURURA?
**Feeling:** Calm, confident, architectural
**Key Elements:**
- Ivory/cream background (#F5F5F0 or similar)
- Enormous typography: "A DIFFERENT KIND OF ESCAPE"
- Enormous whitespace — the empty space IS the design
- One small supporting image (architectural detail)
- Tiny architectural annotation: "PURURA / VALUKA / BANGLADESH"
- No cards, no gradients, no decorative shapes
- Just typography and one image

**Technical:**
- `clamp(4rem, 12vw, 14rem)` for giant typography
- `leading-none` or `leading-[0.9]`
- Negative letter-spacing for tight editorial feel
- Image positioned with intention (not centered)

---

### Section 3: THE LAND — Asymmetric Landscape
**Composition:** Huge asymmetric landscape image + parallax
**Story:** Immersion — the natural setting
**Feeling:** Expansive, organic, cinematic
**Key Elements:**
- Full-bleed tall landscape image (portrait or ultra-wide)
- Image extends beyond viewport edges
- Small architectural annotation: "THE LAND / 200+ ACRES"
- Minimal text overlay
- Parallax at 0.08x (subtle camera movement)
- Image scale changes 1.0 → 1.05 on scroll

**Technical:**
- `ParallaxImage` with low intensity
- `useScroll` + `useTransform` for scale
- Image positioned with negative margins to extend beyond grid

---

### Section 4: THE RESORT — Horizontal Scroll Chapter
**Composition:** Pinned horizontal scroll with images and typography
**Story:** Exploration — moving through the resort
**Feeling:** Cinematic, journey-like, discovery
**Key Elements:**
- Section pins to viewport
- Vertical scroll drives horizontal movement
- 4-5 images arranged horizontally
- Typography moves at different rate (0.04x vs 0.14x for images)
- Chapter title: "THE RESORT"
- Each image has a small caption
- No carousel controls, no arrows, no dots
- Images enter from different vertical positions

**Technical:**
- `useScroll` with `pin` functionality
- `useTransform` for horizontal translation
- Different `useTransform` rates for different elements
- `will-change: transform` for performance

---

### Section 5: ARCHITECTURE — Pinned Storytelling
**Composition:** Large pinned image + changing architectural statements
**Story:** The built environment
**Feeling:** Sophisticated, detailed, architectural
**Key Elements:**
- Large image stays pinned
- Text changes as user scrolls
- 4 chapters: "THE LAND" → "THE WATER" → "THE ARCHITECTURE" → "THE EXPERIENCE"
- Chapter numbers: 01/04, 02/04, etc.
- Architectural annotations appear
- Image subtly transforms between states

**Technical:**
- `position: sticky` for pinned image
- `useInView` for text changes
- Fade transitions between chapters

---

### Section 6: MASTERPLAN — Interactive Architectural Canvas
**Composition:** Large masterplan image with interactive hotspots
**Story:** The masterplan — exploring the resort layout
**Feeling:** Technical, detailed, exploratory
**Key Elements:**
- Keep existing MasterplanExplorer but enhance
- Camera slowly moves across masterplan on scroll
- Different areas highlight as you scroll
- Buildings subtly illuminate
- Labels appear with architectural annotations
- Supporting imagery appears

**Technical:**
- Enhance existing MasterplanExplorer
- Add scroll-driven camera movement
- Add progressive reveal of locations

---

### Section 7: EXPERIENCES — Editorial Image Collage
**Composition:** Different sized images at different positions
**Story:** The experiences offered
**Feeling:** Varied, dynamic, editorial
**Key Elements:**
- 5-6 images of different sizes
- Different vertical offsets
- Some images move at different parallax speeds
- Gallery composes itself as you scroll
- No grid — asymmetric placement
- Small captions with architectural style

**Technical:**
- `ParallaxImage` with varying intensities
- `useInView` for reveal
- Absolute positioning for asymmetric layout

---

### Section 8: RESIDENCES — Dark Forest Cinematic
**Composition:** Dark/forest background with oversized typography
**Story:** The private residences
**Feeling:** Intimate, luxurious, dramatic
**Key Elements:**
- Deep forest green or warm charcoal background
- Oversized typography: "PRIVATE VILLA DISTRICTS"
- Image sequence (3 villa types)
- Small architectural annotations
- Minimal text

**Technical:**
- Background color transition from previous section
- `clamp(3rem, 8vw, 7rem)` for typography
- Image sequence with staggered reveals

---

### Section 9: INVESTMENT — Restrained Editorial
**Composition:** Highly structured, minimal decoration
**Story:** Investment opportunity
**Feeling:** Professional, confident, structured
**Key Elements:**
- Ivory or stone background
- Highly structured layout
- Architectural annotations: "INVESTMENT STRATEGY / 01"
- Minimal decoration
- Key metrics with architectural treatment
- Form integrated elegantly

**Technical:**
- Grid-based but with intentional asymmetry
- Thin lines as section dividers
- Monospace typography for data

---

### Section 10: LEGACY — Cinematic Closing
**Composition:** Almost empty, enormous typography + cinematic image
**Story:** Legacy — the lasting impact
**Feeling:** Timeless, confident, aspirational
**Key Elements:**
- Almost completely empty
- Enormous typography: "THE FUTURE OF ESCAPE"
- One cinematic image reveal
- Tiny location coordinates
- No CTAs, no forms
- Just presence

**Technical:**
- `clamp(5rem, 15vw, 18rem)` for typography
- Image reveal on scroll
- Minimal animation

---

## Color Palette (Restrained)

- **Ivory:** #F5F5F0 (light sections)
- **Warm cream:** #EDEDE8
- **Stone:** #E5E5E0
- **Muted beige:** #D5D5D0
- **Dark forest green:** #1b281c
- **Warm charcoal:** #1A1A1E
- **Muted champagne/gold:** #C9A45A (used extremely sparingly)

## Typography Scale

- **Giant:** `clamp(4rem, 12vw, 14rem)` — Philosophy, Legacy
- **Display:** `clamp(2rem, 5vw, 4.5rem)` — Section titles
- **Headline:** `clamp(1.5rem, 3vw, 2.5rem)` — Sub-sections
- **Body:** `clamp(1rem, 1.5vw, 1.25rem)` — Paragraphs
- **Eyebrow:** `11px` uppercase tracking-[0.45em] — Labels
- **Annotation:** `10px` uppercase tracking-[0.3em] — Architectural details

## Animation Principles

1. **Subtle cinema movement** — not exaggerated web animation
2. **Different rates for different layers** — 0.04x to 0.20x
3. **Staggered reveals** — image → label → headline → description → CTA
4. **Quiet micro-motion** — 2-5px movement, 1-3% scale changes
5. **Performance-first** — GPU transforms, `will-change` only where needed

## Responsive Strategy

- **Desktop:** Highly editorial, complex compositions
- **Tablet:** Simplified but still designed
- **Mobile:** Preserve drama, simplify horizontal interactions, reduce parallax
