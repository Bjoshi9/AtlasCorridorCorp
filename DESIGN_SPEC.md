# DESIGN_SPEC.md — Atlas Corridor Corp Landing Page

Source: `reference/atlas-corridor-screenshot.png` (1170×2532, full-page capture). Read this alongside the image itself — descriptions below are precise but the image is the tiebreaker for anything ambiguous.

Page outline: **Header/Nav → Hero → Stats bar → Why Choose Us → How It Works → CTA banner → Footer**

---

## 1. Header / Navigation
- Sticky, full-width, `--navy-900` background, ~72–80px tall, horizontal padding matching the container.
- **Left:** logo mark (angular gold/white triangular "A"/flag shape) + wordmark "ATLAS" (bold, white, larger) with "CORRIDOR CORP" beneath it in smaller gold letter-spaced caps.
- **Center-right nav links:** Home · About · Our Process · Services · Contact — white text. "Home" is the active page: gold text with a short gold underline beneath it. Hover state on others → gold.
- **Right:** "Get In Touch" button — pill shape, transparent fill, 1–2px gold border, gold text.
- **Mobile:** collapse the 5 links behind a hamburger icon; keep logo and the button visible.

## 2. Hero Section
- `--navy-900` background, full-bleed, faint white world-map dot-grid texture overlay (low opacity, decorative only). Bottom edge is a soft S-curve (SVG wave) into the light section below — the stats card sits on top of this curve (see §3).
- Large decorative graphic: an earth-from-space image with visible city lights, positioned right-of-center behind/around the exchange-rate card, with 3–4 glowing gold arc "flight paths" converging on it. **This asset can't be reproduced exactly — see §11.**
- **Copy (verbatim):**
  - H1, two lines: "Your Trusted Partner for" / "Global **Money Transfers**" — "Global" stays white, "Money Transfers" is `--gold-500`.
  - Paragraph: "Fast, secure and reliable remittance services to send money across the world." — off-white/muted.
  - Button 1 (primary): **Send Money Now →** — `--gold-500` fill, `--navy-900` text, pill radius, trailing arrow icon.
  - Button 2 (secondary): **Get Best Rates** — outline (white/gold border), white text, transparent fill.
- **Trust row** — 3 items in a horizontal row, each a line icon (white stroke, ~28px) plus two lines of text:
  1. Shield icon — "Secure & Safe" / "Your money is 100% protected"
  2. Clock icon — "Fast Transfers" / "Quick delivery to your loved ones"
  3. Headset icon — "24/7 Support" / "We are here to help you anytime"
- **Floating card**, upper-right, `--white` background, `--radius-lg`, drop shadow, ~380px wide, floats partway over the hero curve:
  - Title: "Check Exchange Rate" (`--navy-900`, bold)
  - Label "You Send" → input showing **1,000.00** + currency pill "🇺🇸 USD ⌄"
  - Label "Receiver Gets" → input showing **83,450.00** + currency pill "🇮🇳 INR ⌄"
  - Row: "Exchange Rate" ⋯ "1 USD = 83.45 INR"
  - Row: "Transfer Fee" ⋯ "3.99 USD"
  - Button: **Get Started** — full width, `--navy-900` fill, white text
  - **Behavior:** typing a new "You Send" amount recalculates "Receiver Gets" live as `amount × 83.45`, formatted with thousands separators and 2 decimals. Transfer fee stays a flat display value; it isn't netted out of the shown conversion.

## 3. Stats Bar
- `--white` rounded card (`--radius-lg`), pulled up with negative margin so it overlaps the hero's bottom curve, centered, container width, soft shadow.
- 5 items, evenly spaced, each: outline navy icon above a bold navy number above a small gray label.
  1. people icon — **50K+** — Happy Customers
  2. globe icon — **200+** — Countries Served
  3. paper-plane icon — **$1B+** — Money Transferred
  4. shield-check icon — **99.9%** — Secure Transfers
  5. clock icon — **15+** — Years of Trust
- Mobile: 2 columns (wraps to 3 rows).

## 4. Why Choose Us
- Background: `--bg-light`.
- Eyebrow: "WHY CHOOSE US" — `--gold-500`, uppercase, letter-spacing ~0.08em, centered, small/bold.
- H2: "Secure. Fast. Reliable." — `--navy-900`, centered, bold.
- Subhead: "We make international money transfers simple, affordable and hassle-free." — `--text-gray`, centered.
- Grid of 6 cards (3×2 desktop / 2×3 tablet / 1-col mobile). Each card: a circular `--cream-100` badge (~64px) with a `--navy-900` icon centered inside, a bold navy title, and a `--text-gray` two-line description:
  1. Lock icon — **Bank-Level Security** — "Advanced encryption keeps your money safe."
  2. Bolt icon — **Lightning Fast** — "Quick transfers to bank accounts worldwide."
  3. Tag icon — **Best Exchange Rates** — "Competitive rates with transparent fees."
  4. Phone icon — **Easy & Convenient** — "Send money online anytime, anywhere."
  5. People icon — **Dedicated Support** — "Friendly support team ready to assist you."
  6. Shield-check icon — **Trusted & Compliant** — "Fully licensed and regulated."

## 5. How It Works
- Background: white — same section as §4 visually, no seam between them.
- Eyebrow: "HOW IT WORKS" — `--gold-500`, centered.
- H2: "Send Money in 4 Simple Steps" — `--navy-900`, centered, bold.
- 4 steps in a horizontal row (stack vertically on mobile with a vertical dashed connector instead), joined by a horizontal dashed connector line. Each step:
  - `--navy-900` filled circle (~64px) with a white icon
  - a small `--gold-500` circular number badge (~24px) overlapping the bottom-right edge of the circle
  - bold navy title, `--text-gray` description below
  1. person icon, badge "1" — **Create Account** — "Sign up in minutes and verify your identity."
  2. paper-plane icon, badge "2" — **Enter Details** — "Provide receiver details and transfer amount."
  3. credit-card icon, badge "3" — **Make Payment** — "Choose your preferred payment method."
  4. check icon, badge "4" — **Money Delivered** — "Receiver gets the money quickly and securely."
  - Connector line color: dashed, sampled as inconclusive from the screenshot (average included too much surrounding whitespace) — start with `--gold-500` at reduced opacity or a light gray; compare against the reference image and adjust.

## 6. CTA Banner
- **Inset**, not full-bleed: sits within the container with visible page margin left and right. `--navy-800` (or `--navy-900`) background, `--radius-lg` (~28–32px), generous padding (~48–56px).
- Left: 3D-style graphic — a phone with an upward arrow/dollar sign, a globe, and floating gold coins ($ and €). **See §11.**
- Middle/right: H2 "Ready to Send Money?" (white, bold) + paragraph "Join thousands of happy customers who trust Atlas Corridor Corp for their remittances." (light gray/muted).
- Far right: **Send Money Now →** button, `--gold-500` fill, `--navy-900` text.
- Mobile: stack graphic → heading → paragraph → button, centered.

## 7. Footer
- Background: white.
- Row 1: logo + wordmark, then description paragraph — "Atlas Corridor Corp is a trusted global remittance service provider, helping individuals and businesses send money securely across the world." — plus 4 circular `--navy-900` social icons (Facebook, Twitter, LinkedIn, Instagram; white glyphs).
- 4 link columns:
  - **Quick Links** — Home, About Us, Our Process, Services, Contact Us
  - **Services** — Online Money Transfer, Bank Transfer, Cash Pickup, Business Payments, Currency Exchange
  - **Support** — Help Center, FAQs, Terms & Conditions, Privacy Policy
  - **Contact Us** (each row with a small navy icon):
    - phone icon — +1 (123) 456-7890
    - mail icon — info@atlascorridor.com
    - pin icon — 123 Business Avenue, New York, NY 10001, USA
- Divider (`--border-light`), then centered small text: "© 2024 Atlas Corridor Corp. All Rights Reserved."

## 8. Type scale (starting point — true up visually against the reference)
| Role | Size | Weight | Family |
|---|---|---|---|
| H1 (hero) | 44–56px | 700 | Poppins |
| H2 (section) | 32–40px | 700 | Poppins |
| Card/step titles | 18–20px | 600 | Poppins |
| Stat numbers | 30–34px | 700 | Poppins |
| Body | 15–16px | 400 | Inter |
| Eyebrow labels | 13–14px | 600 | Inter, uppercase, letter-spacing 0.08em |

## 9. Spacing & container
- `--container-max: 1170px` (matches the reference's native width), centered, ~20–24px side padding on mobile.
- Section vertical padding: ~88–96px desktop, 48–56px mobile.
- Card radius: 16–20px for feature cards, ~20–24px for the exchange widget. Buttons: pill-rounded (matches the reference — both hero buttons and the header CTA read as fully rounded).

## 10. Responsive behavior (the reference only shows one desktop-width layout — these are sensible additions, not literal source content)
- Nav collapses to a hamburger under 1024px.
- Exchange-rate card moves out of the floating position and sits below the hero copy under 1024px.
- Stats: 5 → 2 columns under 640px.
- Why Choose Us: 6 → 2 columns under 768px, 1 column under 480px.
- How It Works: horizontal row → vertical stack with a vertical dashed connector under 768px.
- CTA banner content and footer columns stack under 640px.

## 11. Assets that can't be reproduced exactly
The hero earth/flight-path graphic and the CTA phone/coins/globe graphic are custom photographic or 3D-rendered assets. I can describe their composition and placement (above), but I can't hand you the original image files. Three options, roughly in order of least licensing risk:
1. **CSS/SVG approximation (default — build this first):** a navy circle with a subtle radial gradient, a faint dot-grid overlay, and 3–4 SVG bezier arcs animated via `stroke-dashoffset`, each ending in a small pulsing dot. Stylized rather than photographic, but free, fast, and zero licensing risk.
2. **Public-domain source:** NASA's *Black Marble* / *Visible Earth* night-lights imagery is public domain and visually close to the reference. Search "NASA Black Marble" at visibleearth.nasa.gov.
3. **Licensed stock or a 3D-icon pack** for the CTA graphic specifically (Freepik, 3dicons.co, or a Blender-rendered custom asset) — check the license covers your intended use before shipping it.

Whichever you pick, save it to `assets/hero-graphic.*` and `assets/cta-graphic.*` — the layout in §2 and §6 assumes those paths exist.

## 12. Fidelity checklist (walk this after building, image side-by-side)
- [ ] Nav has 5 links, gold active-state + underline on "Home", outlined gold "Get In Touch" button
- [ ] Hero H1 breaks into two lines with "Money Transfers" in gold
- [ ] Both hero buttons present with correct fill/outline treatment and the right-arrow on the primary one
- [ ] Exchange card recalculates live and reproduces the 1,000 USD → 83,450 INR example at load
- [ ] Stats card visually overlaps the hero's bottom curve (not two flat stacked sections)
- [ ] All 6 "Why Choose Us" cards present with cream (not gray) icon circles
- [ ] All 4 "How It Works" steps present with gold numbered badges and a connecting line
- [ ] CTA banner has visible page margin on both sides (inset, not full-bleed)
- [ ] Footer has exactly 4 link columns plus working `mailto:`/`tel:` links
- [ ] No hex color in the CSS that isn't one of the tokens in `CLAUDE.md`
