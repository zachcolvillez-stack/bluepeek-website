# bluepeek.com.au v2 — design spec

Date: 2026-08-30
Status: approved (Jac)

## Problem

The current site is informative but visually generic. Twelve homepage sections all
share one rhythm — eyebrow, heading, paragraph, card grid — so nothing lands and the
site does not demonstrate the craft it is selling. Reviews and Testimonials duplicate
each other; WhyUs overlaps Services; Packages interrupts momentum. Colour values are
hardcoded inline across ~18 components, so there is no theme layer to change.

The one section with real craft is `JasmineShowcase` — a pinned, scroll-driven stage.
That mechanic is the seed of the redesign.

## Goal

Craft **and** conversion. The site itself is the portfolio piece, structured so the
enquiry path stays obvious. Primary visitor: an Australian local-business owner
(trade, salon, spa, retail) who arrived from an SMS, an NFC tap, or search.

## 1. Visual system

Dark, cinematic, premium.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#070d18` | page canvas |
| `--surface` | `#0c1c34` | raised cards, panels |
| `--surface-2` | `#12233f` | nested surfaces |
| `--text` | `#eef3fb` | primary type |
| `--text-dim` | `#93a3bd` | secondary type (≥4.5:1 on `--bg`) |
| `--accent` | `#3b82f6` | single accent, used sparingly |
| `--hairline` | `rgba(255,255,255,0.08)` | borders |

Defined once in `app/globals.css` as CSS custom properties; components reference
tokens, never raw hex. Depth comes from one implied light source: a hairline top-edge
highlight (`inset 0 1px 0 rgba(255,255,255,0.06)`) plus a large soft drop shadow. No
blur-heavy glassmorphism. Glow is reserved for client screenshots so the work is the
brightest thing on the page.

**Type:** editorial serif display face for headings (clamp up to ~76px desktop)
against a neutral sans for body. The scale swings hard between large and small
rather than sitting at one size per section. Fonts loaded via `next/font` with
explicit fallback stacks.

**House style enforced:** no eyebrow badges above headings (currently on Hero,
Jasmine and most sections — all removed), no blue→purple gradients, footer carries
Terms and "Powered by BluePeek", favicon/Safari icon set retained.

## 2. Homepage structure — nine acts

1. **Hero** — full viewport. Serif headline, one primary action, one secondary,
   trust facts as a single quiet line. Behind it a Higgsfield-generated atmospheric
   plate, heavily darkened. No card grid.
2. **Proof strip** — 5.0 · 19 Google reviews · 30+ businesses live · 1–2 weeks ·
   you own everything. One line, immediately under the fold.
3. **Act I — Jasmine Health Spa.** Cinematic pinned stage. Dark luxury, gold on
   charcoal — already the strongest build and native to a dark canvas.
4. **Act II — Superior Garage.** A trade. Cinematic pinned stage. This is the act
   that converts, because it is the visitor recognising themselves.
5. **Act III — Rodano Flowers.** Retail. Cinematic pinned stage, and the one that
   also shows the `/manage` owner portal — proving systems, not just pages.
6. **The grid** — remaining work, CRM-driven as today, linking to `/work` and `/gallery`.
7. **Process** — the 1–2 week path as a scroll-driven horizontal sequence, not three
   static cards.
8. **Pricing** — packages kept, dark surfaces, one clearly recommended tier.
9. **Proof → Contact** — Google reviews and written testimonials merged into a single
   social-proof moment flowing directly into the contact form.

FAQ moves to its own `/faq` page, retaining `faqSchema` JSON-LD and gaining internal
links from the footer and contact section, so no GEO/AI-citation value is lost.

## 3. Component: `ProjectStage`

The Jasmine mechanic generalised into one data-driven component.

- Props: `{ name, domain, liveUrl, description, meta[], desktopShot, mobileShot, theme }`
- Desktop (`lg` and up): pinned full-viewport stage via `useScroll` /
  `useTransform`; full-page desktop screenshot travels vertically through a browser
  frame; phone frame parallaxes in with the mobile capture; meta facts reveal on scroll.
- Below `lg`, or `prefers-reduced-motion`: collapses to a stacked static reveal with
  no pinning — the behaviour `JasmineShowcase` already implements correctly.
- Three instances driven by `lib/projects.js`. `JasmineShowcase.jsx` is deleted once
  `ProjectStage` reproduces it.

## 4. Motion system

One shared vocabulary in `lib/motion.js` — no per-component magic numbers.
Three primitives only:

- `reveal` — fade + 16px rise on enter, viewport `once: true`
- `stage` — scroll-linked transforms, desktop only
- `hover` — subtle scale/lift on interactive surfaces

All obey `useReducedMotion`. Animation restricted to `transform` and `opacity`.

## 5. Higgsfield assets

Used only for atmosphere and abstraction: the hero plate, section transition
textures, and optionally a new OG image. **Never** generated people, generated
"client work", or anything readable as a fabricated testimonial or a business that
does not exist. Real client screenshots remain the subject of the page.

## 6. Screenshot capture

Only Jasmine currently has full-page desktop (1440×7968) and mobile (780×3900)
captures. Acts II and III have no usable assets — `superiorgarage.png` is an
above-fold clip only; Rodano Flowers has none.

`scripts/screenshot.mjs` captures above-fold clips at 1440×900. A `fullPage: true`
variant plus a 390-wide mobile context is required to produce Act II and Act III
assets before those sections can be built.

## 7. Performance and accessibility guardrails

- Screenshots served as AVIF/WebP at real display sizes via `next/image`. Several
  existing PNGs are 2–4.6MB and are a live mobile problem today.
- Pinned stages are desktop-only; mobile gets the static path.
- Body text meets 4.5:1 against the canvas; interactive targets ≥44px.
- Enquiry reachable in one tap from anywhere via the existing mobile CTA bar.
- Lighthouse mobile run before deploy; no regression against the current score.

## 8. File plan

**New:** `components/stage/ProjectStage.jsx`, `lib/projects.js`, `lib/motion.js`,
theme tokens in `app/globals.css`, `app/faq/page.jsx`, rebuilt sections under
`components/dark/`.

**Rebuilt:** `Hero`, `Services`, `Packages`, `Process`, `Proof`, `Contact`, `Nav`,
`Footer`, plus dark shells for `/work`, `/gallery`, `/about`, `/blog`.

**Removed / merged:** `Testimonials.jsx` → Proof, `WhyUs.jsx` → Services,
`JasmineShowcase.jsx` → `ProjectStage`, `Reviews.jsx` → Proof.

## 9. Out of scope

Dashboard, Forms, Reviews platform, and UK/IE sites are untouched. No repositioning
of BluePeek as a multi-product platform — this remains the web-design front door.

## Success criteria

- Homepage reads as nine distinct acts, no two sharing the same rhythm.
- Three cinematic project stages working on desktop, degrading cleanly on mobile.
- No hardcoded hex values in components; all colour flows from tokens.
- No eyebrow badges anywhere on the site.
- FAQ schema still served, from `/faq`.
- Lighthouse mobile performance no worse than the current site.
