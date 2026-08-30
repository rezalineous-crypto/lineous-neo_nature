# Complete Color Configuration & Usage Documentation — Purura Resort

> **Project:** lineous-neo_nature (Purura Resort)
> **Last Updated:** 2026-08-29
> **Source Files Analyzed:** All `.tsx`, `.ts`, and `.css` files in the project

---

## Table of Contents

1. [CSS Custom Properties (Theme Tokens)](#1-css-custom-properties-theme-tokens)
2. [Tailwind Color Classes](#2-tailwind-color-classes)
3. [CSS Utility Classes](#3-css-utility-classes)
4. [Hardcoded Hex Colors](#4-hardcoded-hex-colors)
5. [RGBA / Inline Colors](#5-rgba--inline-colors)
6. [RGB Dynamic Colors](#6-rgb-dynamic-colors)
7. [Page-by-Page Color Breakdown](#7-page-by-page-color-breakdown)
8. [Component-Level Color Usage](#8-component-level-color-usage)
9. [Non-Standard / Out-of-Palette Colors](#9-non-standard--out-of-palette-colors)
10. [Atmospheric Gradients](#10-atmospheric-gradients)
11. [Text Colors](#11-text-colors)
12. [Background Colors](#12-background-colors)
13. [Border Colors](#13-border-colors)
14. [Shadow Colors](#14-shadow-colors)
15. [Color Usage Summary by Category](#15-color-usage-summary-by-category)

---

## 1. CSS Custom Properties (Theme Tokens)

All core colors are defined as CSS custom properties in [`app/globals.css`](app/globals.css:3). The project uses a dual-theme system (light/dark) controlled via `data-theme` attribute on the `<html>` element.

### Light Theme (Default)

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--color-void` | `#F8F3EA` | Main background | Page background, large sections |
| `--color-secondary` | `#F1E6D8` | Secondary background | Section transitions, depth |
| `--color-graphite` | `#FFFDF8` | Surface / card background | Cards, forms, elevated panels |
| `--color-line` | `#D8C8B7` | Border / divider | Card borders, dividers, lines |
| `--color-bone` | `#1F1A15` | Primary text | Headings, body text, labels |
| `--color-haze` | `#5A4A3A` | Secondary text | Captions, metadata, supporting text |
| `--color-chrome1` | `#C9A45A` | Primary accent | CTA, highlights, gold accents |
| `--color-chrome2` | `#8D391F` | Secondary accent | Strong CTA, booking actions |
| `--color-chrome3` | `#9E7150` | Tertiary accent | Borders, icons, section accents |
| `--color-ivory` | `#F5F5F0` | Luxury palette | Warm white, elevated surfaces |
| `--color-cream` | `#EDEDE8` | Luxury palette | Warm cream, subtle backgrounds |
| `--color-stone` | `#E5E5E0` | Luxury palette | Light stone, muted surfaces |
| `--color-sand` | `#D5D5D0` | Luxury palette | Warm sand, subtle backgrounds |
| `--color-charcoal` | `#1A1A1E` | Luxury palette | Dark text, form backgrounds |
| `--color-charcoal-warm` | `#2A2520` | Luxury palette | Warm dark text |
| `--color-forest` | `#4E4524` | Luxury palette | Nature accents, eco references |
| `--color-champagne` | `#C9A45A` | Luxury palette | Champagne gold (same as chrome1) |
| `--color-overlay` | `#2B2119` | Overlay | Image overlays, darkening layers |

### Dark Theme

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--color-void` | `#2B2119` | Main background | Page background, dark sections |
| `--color-secondary` | `#1F1A15` | Secondary background | Section depth |
| `--color-graphite` | `#1A1A1E` | Surface / card background | Cards, forms, elevated panels |
| `--color-line` | `#3A3530` | Border / divider | Card borders, dividers |
| `--color-bone` | `#F5F5F0` | Primary text | Headings, body text (light text on dark) |
| `--color-haze` | `#9A9AA0` | Secondary text | Captions, metadata (muted gray) |
| `--color-chrome1` | `#C9A45A` | Primary accent | CTA, highlights (same as light) |
| `--color-chrome2` | `#8D391F` | Secondary accent | Strong CTA (same as light) |
| `--color-chrome3` | `#9E7150` | Tertiary accent | Borders, icons (same as light) |
| `--color-ivory` | `#F5F5F0` | Luxury palette | Warm white (same as bone) |
| `--color-cream` | `#EDEDE8` | Luxury palette | Warm cream (same as light) |
| `--color-stone` | `#E5E5E0` | Luxury palette | Light stone (same as light) |
| `--color-sand` | `#D5D5D0` | Luxury palette | Warm sand (same as light) |
| `--color-charcoal` | `#1A1A1E` | Luxury palette | Dark text (same as light) |
| `--color-charcoal-warm` | `#2A2520` | Luxury palette | Warm dark (same as light) |
| `--color-forest` | `#4E4524` | Luxury palette | Nature accents (same as light) |
| `--color-champagne` | `#C9A45A` | Luxury palette | Champagne gold (same as chrome1) |
| `--color-overlay` | `#2B2119` | Overlay | Overlays (same as void dark) |

### Theme-Invariant Colors (Same in Both Themes)

| Token | Hex |
|---|---|
| `--color-chrome1` | `#C9A45A` |
| `--color-chrome2` | `#8D391F` |
| `--color-chrome3` | `#9E7150` |
| `--color-cream` | `#EDEDE8` |
| `--color-stone` | `#E5E5E0` |
| `--color-sand` | `#D5D5D0` |
| `--color-charcoal` | `#1A1A1E` |
| `--color-charcoal-warm` | `#2A2520` |
| `--color-forest` | `#4E4524` |
| `--color-champagne` | `#C9A45A` |

---

## 2. Tailwind Color Classes

The project uses Tailwind CSS with custom color tokens mapped to CSS variables. The following Tailwind classes are used throughout the codebase:

### Background Classes

| Class | Resolves To (Light) | Resolves To (Dark) | Usage |
|---|---|---|---|
| `bg-void` | `#F8F3EA` | `#2B2119` | Main page/section backgrounds |
| `bg-secondary` | `#F1E6D8` | `#1F1A15` | Secondary backgrounds |
| `bg-graphite` | `#FFFDF8` | `#1A1A1E` | Card/surface backgrounds |
| `bg-graphite/50` | `#FFFDF8` at 50% | `#1A1A1E` at 50% | Semi-transparent card backgrounds |
| `bg-graphite/30` | `#FFFDF8` at 30% | `#1A1A1E` at 30% | Hover states on cards |
| `bg-graphite/40` | `#FFFDF8` at 40% | `#1A1A1E` at 40% | Hover states |
| `bg-graphite/70` | `#FFFDF8` at 70% | `#1A1A1E` at 70% | Hover states |
| `bg-graphite/95` | `#FFFDF8` at 95% | `#1A1A1E` at 95% | Modal/panel backgrounds |
| `bg-graphite/20` | `#FFFDF8` at 20% | `#1A1A1E` at 20% | Subtle overlays |
| `bg-overlay` | `#2B2119` | `#2B2119` | Image overlays, darkening |
| `bg-overlay/10` | `#2B2119` at 10% | `#2B2119` at 10% | Subtle overlay |
| `bg-overlay/18` | `#2B2119` at 18% | `#2B2119` at 18% | Image overlay |
| `bg-overlay/20` | `#2B2119` at 20% | `#2B2119` at 20% | Image overlay |
| `bg-overlay/30` | `#2B2119` at 30% | `#2B2119` at 30% | Image overlay |
| `bg-overlay/40` | `#2B2119` at 40% | `#2B2119` at 40% | Dim overlay |
| `bg-overlay/60` | `#2B2119` at 60% | `#2B2119` at 60% | Image overlay |
| `bg-overlay/70` | `#2B2119` at 70% | `#2B2119` at 70% | Image overlay |
| `bg-void/25` | `#F8F3EA` at 25% | `#2B2119` at 25% | Image overlay |
| `bg-void/80` | `#F8F3EA` at 80% | `#2B2119` at 80% | Gradient overlay |
| `bg-void/85` | `#F8F3EA` at 85% | `#2B2119` at 85% | Navbar scrolled bg |
| `bg-void/50` | `#F8F3EA` at 50% | `#2B2119` at 50% | Gradient overlay |
| `bg-void/95` | `#F8F3EA` at 95% | `#2B2119` at 95% | Panel background |
| `bg-black/20` | `rgba(0,0,0,0.2)` | `rgba(0,0,0,0.2)` | Section transition overlay |
| `bg-black/30` | `rgba(0,0,0,0.3)` | `rgba(0,0,0,0.3)` | Map overlay |
| `bg-black/50` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.5)` | Image overlay |
| `bg-white/90` | `rgba(255,255,255,0.9)` | `rgba(255,255,255,0.9)` | Form background (InvestmentInquiry) |
| `bg-white/10` | `rgba(255,255,255,0.1)` | `rgba(255,255,255,0.1)` | Form background |
| `bg-white/20` | `rgba(255,255,255,0.2)` | `rgba(255,255,255,0.2)` | Form background |
| `bg-ivory/70` | `#F5F5F0` at 70% | `#F5F5F0` at 70% | Form input background |
| `bg-ivory/10` | `#F5F5F0` at 10% | `#F5F5F0` at 10% | CTA badge background |
| `bg-charcoal` | `#1A1A1E` | `#1A1A1E` | Button background |
| `bg-charcoal-warm` | `#2A2520` | `#2A2520` | Button hover |
| `bg-chrome1` | `#C9A45A` | `#C9A45A` | CTA button background |
| `bg-chrome2` | `#8D391F` | `#8D391F` | CTA button background |
| `bg-chrome1/10` | `#C9A45A` at 10% | `#C9A45A` at 10% | Badge background |
| `bg-chrome1/20` | `#C9A45A` at 20% | `#C9A45A` at 20% | Accent background |
| `bg-chrome1/30` | `#C9A45A` at 30% | `#C9A45A` at 30% | Badge background |
| `bg-chrome1/40` | `#C9A45A` at 40% | `#C9A45A` at 40% | Hover border |
| `bg-chrome1/50` | `#C9A45A` at 50% | `#C9A45A` at 50% | Hover state |
| `bg-chrome2/20` | `#8D391F` at 20% | `#8D391F` at 20% | Accent background |
| `bg-chrome2/30` | `#8D391F` at 30% | `#8D391F` at 30% | Accent background |
| `bg-line` | `#D8C8B7` | `#3A3530` | Progress bar, dividers |
| `bg-line/50` | `#D8C8B7` at 50% | `#3A3530` at 50% | Progress bar track |
| `bg-line/30` | `#D8C8B7` at 30% | `#3A3530` at 30% | Border |
| `bg-line/20` | `#D8C8B7` at 20% | `#3A3530` at 20% | Border |
| `bg-line/15` | `#D8C8B7` at 15% | `#3A3530` at 15% | Border |
| `bg-bone` | `#1F1A15` | `#F5F5F0` | Text underline, link lines |
| `bg-bone/25` | `#1F1A15` at 25% | `#F5F5F0` at 25% | Input border |
| `bg-bone/50` | `#1F1A15` at 50% | `#F5F5F0` at 50% | Input border |
| `bg-bone/80` | `#1F1A15` at 80% | `#F5F5F0` at 80% | Text |
| `bg-bone/40` | `#1F1A15` at 40% | `#F5F5F0` at 40% | Text |
| `bg-bone/30` | `#1F1A15` at 30% | `#F5F5F0` at 30% | Text |
| `bg-bone/70` | `#1F1A15` at 70% | `#F5F5F0` at 70% | Text |
| `bg-haze` | `#5A4A3A` | `#9A9AA0` | Secondary text |
| `bg-haze/40` | `#5A4A3A` at 40% | `#9A9AA0` at 40% | Text |
| `bg-haze/50` | `#5A4A3A` at 50% | `#9A9AA0` at 50% | Text |
| `bg-haze/60` | `#5A4A3A` at 60% | `#9A9AA0` at 60% | Text |
| `bg-champagne` | `#C9A45A` | `#C9A45A` | Accent (same as chrome1) |
| `bg-champagne/70` | `#C9A45A` at 70% | `#C9A45A` at 70% | Border |
| `bg-champagne/90` | `#C9A45A` at 90% | `#C9A45A` at 90% | Hover |
| `bg-champagne/10` | `#C9A45A` at 10% | `#C9A45A` at 10% | Hover |
| `bg-cream` | `#EDEDE8` | `#EDEDE8` | Grid background |
| `bg-forest` | `#4E4524` | `#4E4524` | Nature accent |
| `bg-stone` | `#E5E5E0` | `#E5E5E0` | Subtle surface |
| `bg-sand` | `#D5D5D0` | `#D5D5D0` | Subtle surface |
| `bg-[#0c0c0c]` | `#0c0c0c` | `#0c0c0c` | Hardcoded near-black (Legacy image containers) |

### Text Classes

| Class | Resolves To (Light) | Resolves To (Dark) | Usage |
|---|---|---|---|
| `text-bone` | `#1F1A15` | `#F5F5F0` | Primary text, headings |
| `text-bone/25` | `#1F1A15` at 25% | `#F5F5F0` at 25% | Input border |
| `text-bone/30` | `#1F1A15` at 30% | `#F5F5F0` at 30% | Text |
| `text-bone/40` | `#1F1A15` at 40% | `#F5F5F0` at 40% | Text |
| `text-bone/50` | `#1F1A15` at 50% | `#F5F5F0` at 50% | Text |
| `text-bone/60` | `#1F1A15` at 60% | `#F5F5F0` at 60% | Text |
| `text-bone/70` | `#1F1A15` at 70% | `#F5F5F0` at 70% | Text |
| `text-bone/80` | `#1F1A15` at 80% | `#F5F5F0` at 80% | Text |
| `text-bone/90` | `#1F1A15` at 90% | `#F5F5F0` at 90% | Text |
| `text-haze` | `#5A4A3A` | `#9A9AA0` | Secondary text, captions |
| `text-haze/30` | `#5A4A3A` at 30% | `#9A9AA0` at 30% | Text |
| `text-haze/40` | `#5A4A3A` at 40% | `#9A9AA0` at 40% | Text |
| `text-haze/50` | `#5A4A3A` at 50% | `#9A9AA0` at 50% | Text |
| `text-haze/60` | `#5A4A3A` at 60% | `#9A9AA0` at 60% | Text |
| `text-chrome1` | `#C9A45A` | `#C9A45A` | Accent text, links |
| `text-chrome1/10` | `#C9A45A` at 10% | `#C9A45A` at 10% | Subtle accent |
| `text-chrome1/20` | `#C9A45A` at 20% | `#C9A45A` at 20% | Subtle accent |
| `text-chrome1/30` | `#C9A45A` at 30% | `#C9A45A` at 30% | Subtle accent |
| `text-chrome1/40` | `#C9A45A` at 40% | `#C9A45A` at 40% | Subtle accent |
| `text-chrome1/50` | `#C9A45A` at 50% | `#C9A45A` at 50% | Subtle accent |
| `text-chrome2` | `#8D391F` | `#8D391F` | Secondary accent text |
| `text-chrome2/20` | `#8D391F` at 20% | `#8D391F` at 20% | Subtle accent |
| `text-chrome2/30` | `#8D391F` at 30% | `#8D391F` at 30% | Subtle accent |
| `text-graphite` | `#FFFDF8` | `#1A1A1E` | Text on dark backgrounds |
| `text-graphite/30` | `#FFFDF8` at 30% | `#1A1A1E` at 30% | Subtle text |
| `text-graphite/40` | `#FFFDF8` at 40% | `#1A1A1E` at 40% | Subtle text |
| `text-graphite/50` | `#FFFDF8` at 50% | `#1A1A1E` at 50% | Subtle text |
| `text-graphite/60` | `#FFFDF8` at 60% | `#1A1A1E` at 60% | Subtle text |
| `text-charcoal` | `#1A1A1E` | `#1A1A1E` | Dark text |
| `text-charcoal-warm` | `#2A2520` | `#2A2520` | Warm dark text |
| `text-charcoal-warm/35` | `#2A2520` at 35% | `#2A2520` at 35% | Placeholder text |
| `text-white` | `#FFFFFF` | `#FFFFFF` | Pure white (icons, markers) |
| `text-white/30` | `#FFFFFF` at 30% | `#FFFFFF` at 30% | Subtle white text |
| `text-white/40` | `#FFFFFF` at 40% | `#FFFFFF` at 40% | Subtle white text |
| `text-white/50` | `#FFFFFF` at 50% | `#FFFFFF` at 50% | Subtle white text |
| `text-white/90` | `#FFFFFF` at 90% | `#FFFFFF` at 90% | Near-white text |
| `text-void` | `#F8F3EA` | `#2B2119` | Text on dark backgrounds |
| `text-void` | `#F8F3EA` | `#2B2119` | Text on dark backgrounds |

### Border Classes

| Class | Resolves To (Light) | Resolves To (Dark) | Usage |
|---|---|---|---|
| `border-line` | `#D8C8B7` | `#3A3530` | Card borders, dividers |
| `border-line/50` | `#D8C8B7` at 50% | `#3A3530` at 50% | Subtle border |
| `border-line/30` | `#D8C8B7` at 30% | `#3A3530` at 30% | Subtle border |
| `border-line/20` | `#D8C8B7` at 20% | `#3A3530` at 20% | Subtle border |
| `border-line/15` | `#D8C8B7` at 15% | `#3A3530` at 15% | Subtle border |
| `border-bone/25` | `#1F1A15` at 25% | `#F5F5F0` at 25% | Input border |
| `border-bone/50` | `#1F1A15` at 50% | `#F5F5F0` at 50% | Input border |
| `border-charcoal` | `#1A1A1E` | `#1A1A1E` | Form border |
| `border-charcoal/[0.10]` | `#1A1A1E` at 10% | `#1A1A1E` at 10% | Form border |
| `border-charcoal/[0.18]` | `#1A1A1E` at 18% | `#1A1A1E` at 18% | Form border hover |
| `border-chrome1` | `#C9A45A` | `#C9A45A` | Accent border |
| `border-chrome1/30` | `#C9A45A` at 30% | `#C9A45A` at 30% | Badge border |
| `border-chrome1/40` | `#C9A45A` at 40% | `#C9A45A` at 40% | Hover border |
| `border-chrome1/50` | `#C9A45A` at 50% | `#C9A45A` at 50% | Hover border |
| `border-chrome1/70` | `#C9A45A` at 70% | `#C9A45A` at 70% | Navbar border |
| `border-chrome2/20` | `#8D391F` at 20% | `#8D391F` at 20% | Accent border |
| `border-white/10` | `#FFFFFF` at 10% | `#FFFFFF` at 10% | Subtle border |
| `border-white/30` | `#FFFFFF` at 30% | `#FFFFFF` at 30% | Marker border |
| `border-white/50` | `#FFFFFF` at 50% | `#FFFFFF` at 50% | Marker border |
| `border-transparent` | transparent | transparent | Transparent border |

### Shadow Classes

| Class | Resolves To | Usage |
|---|---|---|
| `shadow-[0_8px_32px_rgba(0,0,0,0.4)]` | `rgba(0,0,0,0.4)` | Tooltip shadow |
| `shadow-[0_8px_32px_rgba(0,0,0,0.3)]` | `rgba(0,0,0,0.3)` | Toast shadow |
| `shadow-[0_8px_32px_rgba(0,0,0,0.5)]` | `rgba(0,0,0,0.5)` | Dialog shadow |
| `shadow-2xl` | Tailwind default | Panel shadow |
| `shadow-black/30` | `rgba(0,0,0,0.3)` | Toast shadow |
| `shadow-black/40` | `rgba(0,0,0,0.4)` | Theme selector shadow |
| `shadow-black/50` | `rgba(0,0,0,0.5)` | Dialog shadow |
| `drop-shadow-2xl` | Tailwind default | Masterplan image shadow |
| `shadow-[0_12px_30px_rgba(26,26,30,0.16)]` | `rgba(26,26,30,0.16)` | Button shadow |
| `shadow-[0_16px_36px_rgba(26,26,30,0.20)]` | `rgba(26,26,30,0.20)` | Button hover shadow |
| `shadow-[0_35px_100px_rgba(26,26,30,0.12)]` | `rgba(26,26,30,0.12)` | Form shadow |
| `shadow-[0_8px_30px_rgba(26,26,30,0.05)]` | `rgba(26,26,30,0.05)` | Form shadow |
| `shadow-[0_24px_80px_rgba(0,0,0,0.3)]` | `rgba(0,0,0,0.3)` | InvestmentStrategy shadow |
| `shadow-[0_18px_60px_rgba(31,26,21,0.1)]` | `rgba(31,26,21,0.1)` | Navbar shadow |
| `shadow-[0_0_30px_rgba(142,197,255,0.3)]` | `rgba(142,197,255,0.3)` | MasterPlanMap CTA hover |
| `shadow-[0_0_55px_rgba(201,164,90,0.16)]` | `rgba(201,164,90,0.16)` | Banner expanded shadow |
| `shadow-[0_0_20px_rgba(248,243,234,0.35)]` | `rgba(248,243,234,0.35)` | Banner default shadow |
| `shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]` | `rgba(255,255,255,0.8)` | Form input inset highlight |

---

## 3. CSS Utility Classes

Defined in [`app/globals.css`](app/globals.css:131):

### `.text-gradient-chrome`
```css
background: linear-gradient(115deg, var(--color-chrome1) 0%, var(--color-chrome2) 45%, var(--color-chrome3) 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```
**Colors used:** `#C9A45A` → `#8D391F` → `#9E7150`

### `.text-outlined`
```css
-webkit-text-stroke: 3px rgba(31, 26, 21, 0.25);
color: transparent;
font-weight: 900;
letter-spacing: -0.02em;
line-height: 0.85;
```
**Dark theme override:** `-webkit-text-stroke: 3px rgba(245, 245, 240, 0.25);`

### `.text-shadow-sm`
```css
text-shadow: 0 1px 2px rgba(31, 26, 21, 0.5);
```

### `.text-shadow-md`
```css
text-shadow: 0 2px 4px rgba(31, 26, 21, 0.5), 0 1px 2px rgba(31, 26, 21, 0.3);
```

### `.text-shadow-lg`
```css
text-shadow: 0 4px 8px rgba(31, 26, 21, 0.5), 0 2px 4px rgba(31, 26, 21, 0.3);
```

### `.text-shadow-light`
```css
text-shadow: 0 1px 3px rgba(245, 245, 240, 0.3), 0 1px 2px rgba(245, 245, 240, 0.2);
```

### `.chrome-underline`
```css
background: linear-gradient(115deg, var(--color-chrome1), var(--color-chrome2), var(--color-chrome3));
```

### `.architectural-line`
```css
background: linear-gradient(90deg, transparent, var(--color-line), transparent);
opacity: 0.5;
```

### `.annotation`
```css
font-family: var(--font-mono);
font-size: var(--text-annotation); /* 10px */
text-transform: uppercase;
letter-spacing: 0.3em;
opacity: 0.5;
```

---

## 4. Hardcoded Hex Colors

### Main Palette (from CSS tokens)

| Hex | Token | Role |
|---|---|---|
| `#F8F3EA` | `--color-void` (light) | Main background |
| `#F1E6D8` | `--color-secondary` (light) | Secondary background |
| `#FFFDF8` | `--color-graphite` (light) | Surface / card background |
| `#D8C8B7` | `--color-line` (light) | Border / divider |
| `#1F1A15` | `--color-bone` (light) | Primary text |
| `#5A4A3A` | `--color-haze` (light) | Secondary text |
| `#C9A45A` | `--color-chrome1` / `--color-champagne` | Primary accent (gold) |
| `#8D391F` | `--color-chrome2` | Secondary accent (cognac) |
| `#9E7150` | `--color-chrome3` | Tertiary accent (bronze) |
| `#F5F5F0` | `--color-ivory` (light) / `--color-bone` (dark) | Luxury ivory |
| `#EDEDE8` | `--color-cream` | Luxury cream |
| `#E5E5E0` | `--color-stone` | Luxury stone |
| `#D5D5D0` | `--color-sand` | Luxury sand |
| `#1A1A1E` | `--color-charcoal` | Luxury charcoal |
| `#2A2520` | `--color-charcoal-warm` | Luxury warm charcoal |
| `#4E4524` | `--color-forest` | Luxury forest |
| `#2B2119` | `--color-overlay` / `--color-void` (dark) | Overlay / dark background |

### Dark Theme Variants

| Hex | Token | Role |
|---|---|---|
| `#2B2119` | `--color-void` (dark) | Main background (dark) |
| `#1F1A15` | `--color-secondary` (dark) | Secondary background (dark) |
| `#1A1A1E` | `--color-graphite` (dark) | Surface / card background (dark) |
| `#3A3530` | `--color-line` (dark) | Border / divider (dark) |
| `#F5F5F0` | `--color-bone` (dark) | Primary text (dark) |
| `#9A9AA0` | `--color-haze` (dark) | Secondary text (dark) |

### Non-Palette Hardcoded Hex Colors

#### Banner.tsx — Teal/Cyan Palette (Idle State)

| Hex | Usage |
|---|---|
| `#163f4d` | Linear gradient start (idle) |
| `#0d3445` | Linear gradient mid (idle) |
| `#092c3b` | Linear gradient end (idle) |

#### Banner.tsx — Teal/Cyan Palette (Discover State)

| Hex | Usage |
|---|---|
| `#1b5260` | Linear gradient start (discover) |
| `#104052` | Linear gradient mid (discover) |
| `#0b3040` | Linear gradient end (discover) |

#### Banner.tsx — Teal/Cyan Palette (Invest State)

| Hex | Usage |
|---|---|
| `#183f45` | Linear gradient start (invest) |
| `#123b43` | Linear gradient mid (invest) |
| `#0d3039` | Linear gradient end (invest) |

#### Banner.tsx — Teal/Cyan Palette (Retreat State)

| Hex | Usage |
|---|---|
| `#164956` | Linear gradient start (retreat) |
| `#0f3949` | Linear gradient mid (retreat) |
| `#092f3e` | Linear gradient end (retreat) |

#### Legacy.tsx

| Hex | Usage |
|---|---|
| `#0c0c0c` | Near-black background for image containers |

#### Masterplan Location Accent Colors (`lib/masterplan-locations.ts`)

| Hex | Location | Usage |
|---|---|---|
| `#C9A45A` | Arrival Pavilion, Amphitheater | Gold accent |
| `#8EC5FF` | Luxury Hotel | Blue accent |
| `#C9A9FF` | Resort Villas, Event Hall | Purple accent |
| `#4a8c3f` | Lagoon, Wellness Center | Green accent |
| `#8b7355` | Marina | Brown accent |
| `#3ab0c0` | Sports Complex | Teal accent |
| `#f5e6d3` | Restaurants | Cream accent |

#### MasterPlanMap.tsx Spot Colors

| Hex | Spot | Usage |
|---|---|---|
| `#f5e6d3` | Private Beach | Spot marker |
| `#8EC5FF` | Luxury Villas | Spot marker |
| `#3ab0c0` | Ocean Bar | Spot marker |
| `#4a8c3f` | Spa Retreat | Spot marker |
| `#8b7355` | Yacht Dock | Spot marker |

#### MasterPlanMap.tsx Journey Path Colors

| Hex | Path | Usage |
|---|---|---|
| `#8EC5FF` | Villa → Beach | Path stroke |
| `#C9A9FF` | Beach → Bar | Path stroke |
| `#4a8c3f` | Bar → Spa | Path stroke |
| `#f5e6d3` | Spa → Dock | Path stroke |

#### ROICalculator.tsx SVG Colors

| Hex | Usage |
|---|---|
| `#9A9AA0` | Axis labels, legend text (gray) |
| `#C9A9FF` | Purple data line, data points, legend |
| `#8EC5FF` | Blue data line, data points, legend |

#### InfoPanel.tsx Status Colors

| Hex | Status | Usage |
|---|---|---|
| `#C9A9FF` | Planned | Status badge color |
| `#C9A45A` | Under-construction | Status badge color |
| `#4a8c3f` | Completed | Status badge color |

#### SectionNav.tsx

| Hex | Usage |
|---|---|
| `#B8A88A` | Active hover dash line color |

#### HUD.tsx

| Hex | Usage |
|---|---|
| `#C9A45A` | Accent color passed as prop (gold) |

#### MasterplanExplorer.tsx

| Hex | Usage |
|---|---|
| `#C9A45A` | HUD accent color prop |

---

## 5. RGBA / Inline Colors

### Banner.tsx

| RGBA | Usage |
|---|---|
| `rgba(0, 0, 0, 0.01)` | Card background color (all states) |
| `rgba(197, 168, 102, 0.9)` | Card border (all states) |
| `rgba(105,143,150,0.24)` | Idle radial gradient 1 |
| `rgba(30,94,108,0.35)` | Idle radial gradient 2 |
| `rgba(143,181,185,0.38)` | Discover radial gradient 1 |
| `rgba(36,111,126,0.42)` | Discover radial gradient 2 |
| `rgba(181,159,101,0.22)` | Invest radial gradient 1 |
| `rgba(72,101,85,0.35)` | Invest radial gradient 2 |
| `rgba(105,151,158,0.34)` | Retreat radial gradient 1 |
| `rgba(42,91,103,0.4)` | Retreat radial gradient 2 |
| `rgba(221,201,146,0.6)` | Invest hover border |
