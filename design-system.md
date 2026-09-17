# Bluepeek Design System

Extracted from `app/globals.css`, `tailwind.config.js`, `app/layout.jsx` and component usage.
This is the reference the **System critic** judges adherence against. Rules are written to be
checkable by looking, not interpreted.

Direction: **light, premium, editorial.** Crisp white base, soft off-white panels, deep navy as
the primary accent. Blue is interactive only and used sparingly.

---

## Colour

Tokens are declared on `:root` in `app/globals.css`. Use the token, never a raw hex, in new CSS.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#ffffff` | Main background |
| `--bg-2` | `#f7f9fc` | Soft off-white section |
| `--bg-3` | `#eff4fb` | Faint blue-tint panel, image placeholder |
| `--navy` / `--ink` | `#0c1c34` | Primary accent and all headings |
| `--navy-2` | `#16335c` | Lifted navy, gradient top stop |
| `--blue` | `#2f5fd0` | Interactive blue accent, used sparingly |
| `--brand-ink` | `#1b3c70` | Accent text legible on white |
| `--text-body` | `#475569` | Body copy |
| `--muted` | `#7e8aa0` | Muted labels, meta, domain chrome |
| `--line` | `rgba(12,28,52,0.10)` | Hairline border |
| `--line-2` | `rgba(12,28,52,0.16)` | Hairline border, hover/stronger |

**Rules**

- Exactly three background surfaces: `#ffffff`, `#f7f9fc`, `#eff4fb`. No fourth.
- Navy is the accent. Blue `#2f5fd0` appears at most twice per screen, and only on something
  interactive or on a glow.
- Borders are always navy at low alpha, never grey.
- Selection is `#0c1c34` on white.

### Retired palette — must not reappear

The site previously ran a purple-tinted brand. These values were removed and any reappearance is
a system failure, not a style choice:

| Retired | Replaced by |
|---|---|
| `#d8d2f0` | `#d4dcea` (browser-chrome dots) |
| `#8c8aa3` | `#7e8aa0` (muted) |
| `#565471` | `#475569` (body) |
| `#7c5fe0` | `#2f5fd0` (interactive blue) |
| `#f4f3fb` | `#eff4fb` (tint panel) |
| `rgba(99,91,168,0.12)` | `rgba(12,28,52,0.10)` (hairline) |
| `rgba(91,77,168,0.10)` | `rgba(12,28,52,0.08)` (header shadow) |
| `#4f86f7 → #6f6ff5 → #9b6bf2` | `#2347c4 → #15306a → #0a1730` (brand mark) |

Grep check: no hex in the left column may appear anywhere in `app/`, `components/` or `lib/`.

## Brand mark

Rounded square, gradient `#2347c4 → #15306a → #0a1730` at 135°, white cube outline,
`rx="26"` on a 100×100 viewBox, stroke-width 5, full centre vertical stroke.

Canonical source is `components/Logo.jsx`. `app/icon.svg`, `app/apple-icon.svg`,
`app/opengraph-image.jsx` and `public/logo.png` must all match it. A blue→purple gradient
(`#4f86f7 → #9b6bf2`) is the **old** mark and must not reappear.

## Typography

- Headings: **Plus Jakarta Sans**, weights 500/600/700/800, `var(--font-heading)`
- Body: **Inter**, `var(--font-body)`
- Both loaded via `next/font/google` with `display: 'swap'`
- Headings carry `letter-spacing: -0.02em`
- Body sets `font-feature-settings: 'ss01', 'cv01'`

**Scale in use** — keep to these, do not introduce new steps:

| Role | Class |
|---|---|
| Page h1 | `text-3xl md:text-5xl`, `font-bold tracking-tight` |
| Section h2 | `text-3xl` / `text-2xl`, `font-bold tracking-tight` |
| Card title | `text-xl` / `text-lg`, `font-bold` |
| Body | `text-base leading-relaxed` |
| Meta / label | `text-sm`, or `text-xs font-semibold uppercase tracking-wider` |

**Rules**

- At most three type sizes in any one section.
- Headings are always `--ink`. Body is always `--text-body`. Never body-coloured headings.
- Uppercase is reserved for small meta labels at `text-xs` with `tracking-wider`.

## Surfaces and depth

Three shadow tiers only, all navy-tinted:

- `--shadow-sm` — resting cards
- `--shadow-md` — glass chips, secondary hover
- `--shadow-lg` — elevated panels, card hover

**Cards** — `.card`: white, 1px `--line`, **22px radius**, `--shadow-sm`.
Hover lifts `translateY(-4px)`, border to `--line-2`, shadow to `--shadow-lg`, over 300ms.

> Known drift: some components override radius inline (`20px` on blog cards, `16px` on the hero
> review chip). `22px` is canonical; prefer `.card` over inline radius in new work.

**Glass** — `.glass`: `rgba(255,255,255,0.78)` + `blur(16px)`, near-white border.
Only for chips floating on top of imagery.

## Buttons

| Class | Look |
|---|---|
| `.btn-primary` | Navy gradient `#16335c → #0c1c34`, white text, 600 |
| `.btn-secondary` | White, navy text, `--line-2` hairline, 600 |
| `.btn-white` | Solid white on navy panels, navy text, 700 |

All lift `translateY(-2px)` on hover over 180ms. Primary also brightens 1.08.

## Motion

- Library is **framer-motion**; reveals use `whileInView` with `viewport={{ once: true }}`
- Standard entrance: `opacity 0 → 1`, `y: 24 → 0`, **duration 0.5–0.6s**
- Signature easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Hover transforms: 180ms (buttons), 300ms (cards), 700ms (image scale `1 → 1.05`)
- Ambient: `.float-soft` 6s, `.float-soft-delay` 5s, `.pulse-dot` 2s, all infinite ease-in-out

**Rules**

- Nothing animates for under 180ms.
- Motion resolves in one direction — content rises, never drops in.
- All ambient animation is disabled under `prefers-reduced-motion: reduce`. Any new ambient
  animation must be added to that block in `globals.css`.

## Imagery

- Client screenshots are **WebP**, served from `public/screenshots/`
- Presented inside a browser-chrome frame: three `#d4dcea` dots, mono domain label at
  `text-[10px]` in `--muted`, `ExternalLink` icon
- Containers are `relative` + fixed aspect (`16/11` hero and featured, `16/10` gallery) with
  `object-cover object-top`
- Static images use `next/image` with `fill` + `sizes`; the hero carries `priority`
- Placeholder behind any loading image is `#eff4fb`

**Rule:** portfolio imagery is real client work. Never substitute generated or stock imagery for
a screenshot of a site actually built.

## House style

These are enforced conventions, not preferences:

- **No em dashes** in copy. Use a spaced hyphen.
- **No eyebrow badges** above headings. `.eyebrow` is `display: none !important` and stays that way.
- Australian English and AU locale formatting (`en-AU` dates).
- Copy is factual and specific. No superlatives that cannot be substantiated.
- Review counts and ratings are synced from live Google data, never hand-written.
