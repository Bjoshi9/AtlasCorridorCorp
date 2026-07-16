# CLAUDE.md — Atlas Corridor Corp Landing Page

## What this project is
A close rebuild of one marketing landing page (money-transfer / remittance brand "Atlas Corridor Corp") from a reference screenshot. Single page, no backend, no CMS, no build step.

**Reference image:** `reference/atlas-corridor-screenshot.png` — open/view this file directly before building and again after, to true up spacing and proportions. It's a full-page capture at 1170px wide; treat 1170px as the desktop container width.

**Full content + layout spec:** `DESIGN_SPEC.md` — read it in full before writing any HTML. Every string of copy in there is verbatim from the reference; don't paraphrase it.

## Stack (fixed — don't swap in a framework)
- Plain HTML5 + CSS3 (custom properties) + vanilla JS (ES6)
- No bundler, no npm install required to run it — opening `index.html`, or serving the folder with any static file server, must just work
- Fonts: Google Fonts `<link>` — **Poppins** 600/700 for headings, **Inter** 400/500/600 for body
- Icons: **Lucide** (static CDN build, outline/line style — matches the reference's icon weight)
- Currency flags in the rate widget: emoji (🇺🇸 🇮🇳), no image assets needed

## File structure to produce
```
index.html
css/styles.css
js/main.js
assets/
  logo.svg
  hero-graphic.(svg|jpg)   — read DESIGN_SPEC.md §11 before sourcing this
  cta-graphic.(svg|png)    — read DESIGN_SPEC.md §11 before sourcing this
reference/
  atlas-corridor-screenshot.png   (already here — don't delete)
```

## Design tokens
Sampled directly from flat-fill regions of the reference screenshot (sub-1.0 std-dev patches, i.e. actual solid fills, not eyeballed) — treat `--navy-900` and `--gold-500` as exact. `--text-gray` and `--cream-100` are close approximations since text/edges can't be sampled as reliably; true those two up visually.

```css
:root {
  --navy-900: #00183B;   /* header, hero bg, headings, step-icon circles, social icons */
  --navy-800: #001B42;   /* CTA banner — marginally lighter than navy-900, optional gradient partner */
  --gold-500: #E2B859;   /* buttons, highlighted headline word, badges, eyebrow labels */
  --gold-600: #C7A24E;   /* gold hover/active state */
  --cream-100: #F0E7D4;  /* icon-circle fill, "Why Choose Us" cards */
  --bg-light:  #F5F5F7;  /* section bg: stats bar / why-choose-us / how-it-works */
  --white:     #FFFFFF;  /* elevated cards: exchange-rate widget, footer */
  --text-gray: #64748B;  /* body copy on light backgrounds — approximate */
  --border-light: #E5E7EB;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 28px;
  --container-max: 1170px;
}
```

## Conventions
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, one `<section>` per block, `<footer>`
- BEM-ish class names: `.hero__card`, `.stats__item`, `.steps__badge`
- Copy every headline, button label, and stat number from `DESIGN_SPEC.md` exactly as written
- Mobile-first CSS; breakpoints at 768px and 1024px (the reference only shows the desktop layout — mobile stacking rules are specified in `DESIGN_SPEC.md` §10 as sensible defaults, not literal reference content)
- Gold is an accent, never a large body-text or background fill outside buttons/badges/eyebrow labels (contrast)
- The exchange-rate widget should actually calculate: changing "You Send" recalculates "Receiver Gets" at the fixed rate (1 USD = 83.45 INR), formatted with thousands separators. This is a *static* site, not a static image of one — client-side JS is expected.
- No ad-hoc hex values in the CSS — everything traces back to a token above.

## Build order
1. Read `DESIGN_SPEC.md` in full.
2. Scaffold `index.html` with every section as an empty semantic shell, top to bottom.
3. Build `styles.css`: tokens → base/reset → layout grid, then section by section.
4. Fill in copy exactly as specified.
5. Wire up `js/main.js`: mobile nav toggle, exchange-rate calculator, smooth-scroll for in-page nav links.
6. View `reference/atlas-corridor-screenshot.png` next to the rendered page and walk the checklist in `DESIGN_SPEC.md` §12.

If a `.claude/agents/design-reviewer.md` subagent is present in this project, invoke it after step 6 instead of self-grading — it's set up to compare the build against the checklist and the reference image directly.
