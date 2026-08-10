# Premium Color Palette — Neo Nature

## Design Direction

The Neo Nature website should feel like a luxury futuristic resort designed for high-value investors.

The color system should be:

- posh
- rich
- polished
- aesthetic
- calm
- premium
- nature-connected
- investor-friendly
- futuristic but not cold
- harmonious
- not overused

The palette should avoid:

- grey backgrounds
- shaded grey tones
- pure black
- blue
- cyan
- heavy green/teal
- excessive gold
- overly dark sections
- cheap gradient effects

---

## Recommended Premium Palette

| Role | Token Name | Hex | Usage |
|---|---|---:|---|
| Primary background | `--color-bg-primary` | `#F8F3EA` | Main website background, large calm sections |
| Secondary background | `--color-bg-secondary` | `#F1E6D8` | Soft section transitions, premium beige depth |
| Surface | `--color-surface` | `#FFFDF8` | Cards, forms, premium content panels |
| Surface muted | `--color-surface-muted` | `#EBDCCB` | Subtle panels, dividers, image overlays |
| Text primary | `--color-text-primary` | `#1F1A15` | Main headings, body text, investor copy |
| Text secondary | `--color-text-secondary` | `#5A4A3A` | Supporting text, captions, metadata |
| Accent primary | `--color-accent-primary` | `#C9A45A` | Premium CTA, highlights, thin lines, luxury details |
| Accent secondary | `--color-accent-secondary` | `#8D391F` | Strong CTA, booking actions, selective emphasis |
| Bronze depth | `--color-bronze-depth` | `#9E7150` | Borders, icons, section accents |
| Nature accent | `--color-nature-accent` | `#4E4524` | Eco/nature references, sustainability accents |
| Dark foundation | `--color-dark-foundation` | `#2B2119` | Hero overlays, footer depth, dark premium sections |
| Soft border | `--color-border-subtle` | `#D8C8B7` | Cards, forms, dividers |

---

## Client-Provided Palette Reference

| Usage | Hex |
|---|---:|
| Background | `#F7F4F0` |
| Primary Dark | `#1F1D1A` |
| Luxury Bronze | `#C2822A` |
| Accent Cognac | `#8D391F` |
| Warm Stone | `#C8B6A8` |
| Architectural Brown | `#9E7150` |
| Olive Bronze | `#4E4524` |

The recommended premium palette above is refined from the client’s Royal Beige direction for a more investor-focused luxury resort identity.

---

## Recommended Usage Ratio

| Color family | Usage |
|---|---:|
| Ivory / beige backgrounds | 65–75% |
| Surface panels and cards | 10–15% |
| Text and dark foundation | 8–12% |
| Champagne gold / bronze accents | 5–8% |
| Cognac CTA accents | 2–5% |
| Olive nature accents | 2–4% |

The palette should feel restrained. Gold and bronze should be used as luxury details, not as the dominant color.

---

## Page Usage Guide

### Homepage

- Background: `#F8F3EA`
- Hero overlay: `#2B2119` at controlled opacity
- Main text: `#1F1A15`
- CTA: `#C9A45A`
- Secondary CTA: transparent with `#9E7150` border
- Nature accents: `#4E4524`

### Investment Page

- Background: `#F8F3EA`
- Cards: `#FFFDF8`
- Text: `#1F1A15`
- Investor value highlights: `#C9A45A`
- Booking/inquiry CTA: `#8D391F`
- Borders: `#D8C8B7`

### Masterplan

- Background: `#F1E6D8`
- Map accents: `#9E7150`
- Key location highlights: `#C9A45A`
- Nature zones: `#4E4524`
- Text: `#1F1A15`

### Experience and Amenities

- Background: `#F8F3EA`
- Image-heavy sections should show the project imagery clearly.
- Avoid layout colors that overpower the project photos.
- Use bronze and ivory for labels and dividers.

### Contact Us

- Background: `#F8F3EA`
- Form surface: `#FFFDF8`
- Primary submit button: `#8D391F`
- Secondary button: `#C9A45A`
- Text: `#1F1A15`

### Footer

- Background: `#2B2119`
- Text: `#F8F3EA`
- Muted text: `#D8C8B7`
- Accent line: `#C9A45A`

---

## Centralized Website Token System

All colors should be stored in one central place:

- [`app/globals.css`](app/globals.css:3)

Recommended semantic token structure:

| Semantic token | Purpose |
|---|---|
| `--color-bg-primary` | Main page background |
| `--color-bg-secondary` | Secondary background sections |
| `--color-surface` | Cards, forms, panels |
| `--color-surface-muted` | Subtle surfaces |
| `--color-text-primary` | Main text |
| `--color-text-secondary` | Supporting text |
| `--color-accent-primary` | Luxury accent |
| `--color-accent-secondary` | Strong CTA accent |
| `--color-bronze-depth` | Borders and architectural details |
| `--color-nature-accent` | Eco/nature accent |
| `--color-dark-foundation` | Dark premium sections |
| `--color-border-subtle` | Soft dividers |

This makes the palette easy to edit dynamically from one place.

---

## Do Not Use

Avoid these in the website:

- grey backgrounds
- shaded grey cards
- blue colors
- cyan colors
- pure black backgrounds
- heavy teal/green sections
- excessive gold gradients
- low-contrast grey text
- cold futuristic colors
- overly dark pages that hide the Royal Beige direction

---

## Visual Personality

The final visual system should feel like:

- luxury resort
- premium investment opportunity
- futuristic but warm
- nature-led
- elegant
- restrained
- editorial
- high-end hospitality
- confident and polished

The goal is to attract investors by making Neo Nature feel exclusive, valuable, and future-ready.
