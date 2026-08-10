# Implementation Plan — Neo Nature Website

## Objective

Implement the client’s website feedback while keeping the project aligned with a luxury, futuristic, investor-focused resort identity.

The website should feel:

- premium
- polished
- rich but restrained
- nature-connected
- futuristic
- trustworthy for investors
- visually expressive without overusing color

## Source References

- Client feedback: [`docs/client-feedback.md`](docs/client-feedback.md)
- Premium color palette: [`docs/color-palette.md`](docs/color-palette.md)
- Main homepage: [`app/page.tsx`](app/page.tsx:13)
- Global styles: [`app/globals.css`](app/globals.css:3)
- Layout font setup: [`app/layout.tsx`](app/layout.tsx:1)
- Navigation: [`components/layout/Navbar.tsx`](components/layout/Navbar.tsx:15)

---

## Current Implementation Gaps

| Client requirement | Current issue | File |
|---|---|---|
| Use one font family, preferably Urbanist | Current site uses Libre Caslon Text and Hanken Grotesk | [`app/layout.tsx`](app/layout.tsx:1) |
| Follow Royal Beige palette | Current site uses old bone, sand, charcoal, black, green, blue, cyan, and grey-heavy colors | [`app/globals.css`](app/globals.css:3) |
| No grey or shaded tone colors | Current components use neutral grey text and grey backgrounds | [`components/home/MarketOpportunity.tsx`](components/home/MarketOpportunity.tsx:36) |
| Navigation should be Home, Experience, Amenities, Invest, FAQ, Contact Us | Current navigation is Vision, Masterplan, Technology, Investment | [`components/layout/Navbar.tsx`](components/layout/Navbar.tsx:15) |
| Hero should use slideshow/video and remove unnecessary text | Current hero uses a single image, black overlay, and floating glass card | [`components/home/Hero.tsx`](components/home/Hero.tsx:31) |
| Masterplan should be full bleed and expressive | Current masterplan is contained and uses a teal background | [`components/masterplan/Masterplan.tsx`](components/masterplan/Masterplan.tsx:11) |
| Investment page needs value, form, location advantage, and positioning | Current investment page is only metric cards | [`components/investment/InvestmentStrategy.tsx`](components/investment/InvestmentStrategy.tsx:6) |
| Contact Us should start with a key image and include booking form | No Contact Us page currently exists | [`app/page.tsx`](app/page.tsx:13) |
| Footer should not use unrelated text | Footer still contains “Architecture for a Responsive Environment” | [`components/layout/Footer.tsx`](components/layout/Footer.tsx:3) |

---

## Phase 1 — Design Foundation

### 1. Typography

Update the font system to use one consistent font family across the website.

Recommended direction:

- Use Urbanist as the primary and only font family.
- Use font weight, size, spacing, and letter-spacing to create hierarchy.
- Avoid mixing serif and sans-serif fonts.

Files to update:

- [`app/layout.tsx`](app/layout.tsx:1)
- [`app/globals.css`](app/globals.css:3)

### 2. Centralized color system

Create a centralized color system for the whole website.

All colors should be editable from one place.

Recommended central location:

- [`app/globals.css`](app/globals.css:3)

The color system should use semantic variables such as:

- background primary
- background secondary
- surface
- surface muted
- text primary
- text secondary
- accent primary
- accent secondary
- border subtle
- overlay dark
- success/nature accent

This will allow the whole website to stay consistent and easy to update.

### 3. Remove conflicting colors

Remove or replace:

- blue
- cyan
- pure black
- heavy grey
- dark green/teal backgrounds
- neutral grey text
- shaded/grey card backgrounds

These conflict with the client’s Royal Beige direction.

---

## Phase 2 — Navigation and Logo

Update [`components/layout/Navbar.tsx`](components/layout/Navbar.tsx:15).

### Required navigation

Use:

- Home
- Experience
- Amenities
- Invest
- FAQ
- Contact Us

### Design requirements

- Move navigation more to the right.
- Do not keep it centered.
- Use the premium palette.
- Remove blue/cyan active states.
- Add logo placeholder if no final logo is available.
- Add page loading logo placeholder.

---

## Phase 3 — Homepage Rebuild

Current homepage order is defined in [`app/page.tsx`](app/page.tsx:17).

### Required homepage flow

1. Hero slideshow / short video
2. Resort tagline next to the hero title
3. Project brief after the first slideshow
4. Key facts
5. Resort positioning
6. Key features in one scene, 4/5 features together
7. Full-bleed masterplan
8. Masterplan key spots, one key image per location
9. Location map in the same color tone
10. Floating phone/WhatsApp icon only
11. Strong final homepage ending

### Hero requirements

Update [`components/home/Hero.tsx`](components/home/Hero.tsx:31).

Client wants:

- slideshow of ¾ image
- short video
- reels can be added later
- remove unnecessary text
- resort tagline comes next to the title
- use the project color palette
- avoid black-heavy overlays
- avoid floating glass cards that feel unrelated

### Remove from homepage ending

Remove:

- right-side text
- “Architecture for a responsive environment”
- conventional boring ending style

---

## Phase 4 — Masterplan

Update [`components/masterplan/Masterplan.tsx`](components/masterplan/Masterplan.tsx:11).

### Requirements

- Masterplan must be full bleed.
- Masterplan is the heart of the page.
- Make it expressive.
- Use one key image per masterplan location.
- Use the same color tone across the section.
- Replace the current contained teal section.

---

## Phase 5 — Experience Page

### Requirements

- Start with a key image.
- Key image should be full bleed.
- Use a strong layout composition.
- Picture should not be only 30/35%.
- Avoid background colors that hide the project palette.
- Clients want to see the color of the project, not the layout color.

### Experience zones

- Lobby / lounge
- Villas
- Hotels
- Nature
- Restaurants
- Culture
- Events
- Waterfront

### Layout direction

Use the reference direction of:

- 70%+ content/layout area
- key image with 2/3 small images
- strong editorial composition

---

## Phase 6 — Amenities Page

### Requirements

- Every page starts with a key image.
- Key image should be full bleed.
- Picture should be around half of the page.
- Picture ratio should be around 40/50%.
- Add reference key images.
- Use the premium palette.
- Avoid grey backgrounds.

---

## Phase 7 — Investment Page

Update [`components/investment/InvestmentStrategy.tsx`](components/investment/InvestmentStrategy.tsx:6) and [`app/investment/page.tsx`](app/investment/page.tsx:3).

### Requirements

- Add value.
- Add a form.
- Add location advantage.
- Add positioning.
- Initially add Chuti resort investment information.
- Do not use the same kind of graphics shown in the reference.
- Use 70%+ layout.
- Use key image with 2/3 small images.
- Use premium investor-focused colors.

### Investment tone

The investment page should feel:

- confident
- high-value
- polished
- credible
- exclusive
- opportunity-driven

---

## Phase 8 — Contact Us Page

Create a new Contact Us page because it does not currently exist.

### Requirements

- Page starts with a key image.
- Add a booking form.
- Add a brief.
- Add phone/WhatsApp contact information.
- Use the same premium palette.
- Keep the design polished and minimal.

---

## Phase 9 — Footer Cleanup

Update [`components/layout/Footer.tsx`](components/layout/Footer.tsx:3).

### Remove

- “Architecture for a Responsive Environment”

### Keep or replace with

- Neo-Nature
- relevant project description
- investor contact details
- location
- phone/WhatsApp if available

---

## Phase 10 — Technology and Sustainability Pages

Update:

- [`components/technology/Technology.tsx`](components/technology/Technology.tsx:9)
- [`components/sustainability/Sustainability.tsx`](components/sustainability/Sustainability.tsx:9)

### Requirements

- Remove dark green/teal-heavy backgrounds.
- Use the centralized premium palette.
- Keep futuristic technology messaging but make it feel luxury resort-oriented.
- Use images and layout to support the investor story.

---

## Phase 11 — Vision Page

Update:

- [`app/vision/page.tsx`](app/vision/page.tsx:257)

### Requirements

- Use the premium palette.
- Keep the page luxurious and investor-focused.
- Avoid grey or shaded tone backgrounds.
- Use the same color system across the site.

---

## Assets Needed

To fully match the client references, the following assets are needed:

- final logo
- page loading logo
- hero slideshow or short video
- full-bleed masterplan image
- masterplan location map
- experience key images
- investment key image
- investment small supporting images
- contact page key image
- booking form fields
- phone number
- WhatsApp number

---

## Recommended Implementation Order

1. Centralized color palette and typography
2. Navigation update
3. Homepage hero
4. Homepage post-hero flow
5. Masterplan
6. Investment page
7. Experience and amenities structure
8. Contact Us page
9. Footer cleanup
10. Technology and sustainability color updates
11. Vision page color updates
12. Final QA against [`docs/client-feedback.md`](docs/client-feedback.md)

---

## QA Checklist

Before delivery, verify:

- [ ] Urbanist or approved single font is used across the website.
- [ ] All colors come from the centralized palette.
- [ ] No grey or shaded tone color is used.
- [ ] Blue/cyan colors are removed.
- [ ] Navigation includes Home, Experience, Amenities, Invest, FAQ, Contact Us.
- [ ] Navigation is more right-aligned.
- [ ] Hero uses slideshow/video direction.
- [ ] Hero removes unnecessary text.
- [ ] Resort tagline is placed next to the title.
- [ ] Project brief appears after the first slideshow.
- [ ] Key facts are added.
- [ ] Resort positioning is added.
- [ ] Key features are grouped in one scene.
- [ ] Masterplan is full bleed.
- [ ] Masterplan feels expressive.
- [ ] Location map uses the same color tone.
- [ ] Investment page has value, form, location advantage, and positioning.
- [ ] Contact Us page starts with a key image.
- [ ] Booking form is added.
- [ ] Footer no longer contains unrelated text.
