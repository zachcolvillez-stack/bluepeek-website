# bluepeek.com.au v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild bluepeek.com.au as a dark, cinematic, editorial site whose own craft is the proof of the service, without losing the conversion path or the existing SEO/GEO surface.

**Architecture:** A single dark token layer in `app/globals.css` replaces ~380 hardcoded hex values scattered across 30 components. One shared motion vocabulary in `lib/motion.js` replaces per-component magic numbers. The existing `JasmineShowcase` pinned-scroll mechanic is generalised into a data-driven `ProjectStage` component instantiated three times from `lib/projects.js`. The homepage becomes nine distinct acts instead of twelve same-shaped sections.

**Tech Stack:** Next.js 16 (App Router, JSX not TS), React 18, Tailwind CSS 3, Framer Motion 11, lucide-react, next/font/google, Playwright (screenshot capture only), Vercel.

## Global Constraints

- **No test framework exists in this repo.** Playwright is a devDependency used only by `scripts/screenshot.mjs`. Verification for every task is: `npm run build` succeeds, then visual/DOM check in the browser preview. Do not scaffold Jest/Vitest — that is out of scope.
- **Colour tokens only.** After Task 1, no new hardcoded hex values in components. Reference `var(--token)`.
- **No eyebrow badges** above headings. `.eyebrow` is already `display:none` in CSS; remove the markup as you touch each component.
- **No blue→purple gradients** anywhere (house style).
- **Footer must retain** Terms link and "Powered by BluePeek".
- **Favicon / Safari icon set must survive** (`app/icon.svg`, `app/apple-icon.svg`).
- **All motion obeys `useReducedMotion`**; animate `transform` and `opacity` only.
- **Pinned scroll stages are desktop-only** (`lg` breakpoint and up); mobile gets a static stacked path.
- **Body text ≥4.5:1** against `--bg`. Interactive targets ≥44px.
- **Never fabricate** reviews, ratings, counts, client names, or generated imagery depicting real people or fake businesses. Live review data comes from the existing `https://bluepeekdashboard.com.au/api/public/reviews` endpoint.
- **Git author must remain `JTR.creativeco@gmail.com`** (already configured) or Vercel deploys to Zach's team are rejected.
- **Do not add a `Co-Authored-By` trailer** to commits — `.claude/settings.json` has no `attribution.commit`.
- **Work on a branch**, not `main`.

---

### Task 1: Dark token foundation

**Files:**
- Modify: `app/globals.css` (whole file)
- Modify: `app/layout.jsx:6-7` (font declarations), `app/layout.jsx:78` (html className)

**Interfaces:**
- Produces: CSS custom properties `--bg --surface --surface-2 --text --text-dim --accent --hairline --shadow-sm --shadow-md --shadow-lg`, utility classes `.card .card-light .glass .btn-primary .btn-secondary .btn-white .section-soft .section-tint .divider .hero-glow`, font variables `--font-display` (Fraunces) and `--font-body` (Inter). Every later task consumes these.

- [ ] **Step 1: Create the branch**

```bash
cd ~/Sites/bluepeek-website
git checkout -b feat/v2-dark-cinematic
```

- [ ] **Step 2: Swap the display font in `app/layout.jsx`**

Replace the two font imports and the `html` className. Fraunces is a variable serif with real weight range — high-contrast enough to read editorial, sturdy enough not to shimmer on a dark canvas.

```jsx
import { Inter, Fraunces } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-display',
  display: 'swap',
})
```

And on the `<html>` element:

```jsx
<html lang="en-AU" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
```

- [ ] **Step 3: Rewrite the token block and utilities in `app/globals.css`**

Replace everything from the `body {` rule through the end of the `.eyebrow` rule with the following. Keep the `@tailwind` directives, the `*` reset, the `html` rule, the scrollbar block, the float/pulse keyframes, and the `prefers-reduced-motion` block at the bottom — but update the scrollbar and `::selection` colours as shown.

```css
body {
  background: var(--bg);
  color: var(--text-dim);
  font-family: var(--font-body), -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: 'ss01', 'cv01';
}

h1, h2, h3, h4, h5, h6, .font-display {
  font-family: var(--font-display), Georgia, 'Times New Roman', serif;
  color: var(--text);
  letter-spacing: -0.015em;
  font-weight: 600;
}

/* ═══════════════════════════════════════════════════════════════
   BLUEPEEK v2 — Dark, cinematic, editorial
   Deep navy canvas · one implied light source · work is the glow
   ═══════════════════════════════════════════════════════════════ */
:root {
  --bg:        #070d18;
  --surface:   #0c1c34;
  --surface-2: #12233f;
  --text:      #eef3fb;
  --text-dim:  #93a3bd;
  --muted:     #6c7c96;
  --accent:    #3b82f6;
  --accent-dim: rgba(59,130,246,0.14);
  --hairline:  rgba(255,255,255,0.08);
  --hairline-2: rgba(255,255,255,0.16);
  --lift:      inset 0 1px 0 rgba(255,255,255,0.06);

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.3);
  --shadow-md: 0 6px 16px rgba(0,0,0,0.45), 0 14px 36px rgba(0,0,0,0.35);
  --shadow-lg: 0 12px 28px rgba(0,0,0,0.5), 0 28px 64px rgba(0,0,0,0.45);
}

/* Emphasis text — light navy → accent. NOT blue→purple (house style). */
.gradient-text {
  background: linear-gradient(120deg, #eef3fb 0%, #7fa8f5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-soft { background: var(--surface); }
.section-tint {
  background:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.10) 0%, transparent 60%),
    linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
}

/* ── Cards — raised surface, hairline, top-edge lift ───────────── */
.card {
  background: var(--surface);
  border: 1px solid var(--hairline);
  border-radius: 22px;
  box-shadow: var(--shadow-sm), var(--lift);
  transition: transform 300ms cubic-bezier(0.22,1,0.36,1), box-shadow 300ms, border-color 300ms, background 300ms;
}
.card:hover {
  transform: translateY(-4px);
  background: var(--surface-2);
  border-color: var(--hairline-2);
  box-shadow: var(--shadow-lg), var(--lift);
}

.card-light {
  background: var(--surface-2);
  border: 1px solid var(--hairline);
  border-radius: 22px;
  box-shadow: var(--shadow-lg), var(--lift);
}

/* Glass — smoked, not frosted-white */
.glass {
  background: rgba(12,28,52,0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--hairline-2);
  box-shadow: var(--shadow-md);
}

/* ── Buttons ────────────────────────────────────────────────── */
/* Primary = light on dark. Maximum contrast, unmissable. */
.btn-primary {
  background: var(--text);
  color: #070d18;
  font-weight: 600;
  box-shadow: 0 10px 26px rgba(0,0,0,0.45);
  transition: transform 180ms, box-shadow 180ms, filter 180ms;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 38px rgba(0,0,0,0.55);
  filter: brightness(1.04);
}

/* Secondary = outlined on the canvas */
.btn-secondary {
  background: transparent;
  color: var(--text);
  border: 1px solid var(--hairline-2);
  font-weight: 600;
  transition: transform 180ms, background 180ms, border-color 180ms;
}
.btn-secondary:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,0.05);
  border-color: rgba(255,255,255,0.32);
}

/* Accent button — used once per page at most */
.btn-accent {
  background: var(--accent);
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 10px 26px rgba(59,130,246,0.28);
  transition: transform 180ms, box-shadow 180ms;
}
.btn-accent:hover { transform: translateY(-2px); box-shadow: 0 16px 38px rgba(59,130,246,0.38); }

/* Legacy alias — some components still reference .btn-white */
.btn-white { background: var(--text); color: #070d18; font-weight: 700; box-shadow: var(--shadow-md); transition: transform 180ms, box-shadow 180ms; }
.btn-white:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }

.divider { height: 1px; background: linear-gradient(90deg, transparent, var(--hairline-2), transparent); }

.eyebrow { display: none !important; }
```

Then update the scrollbar and selection rules:

```css
::-webkit-scrollbar { width: 9px; }
::-webkit-scrollbar-track { background: #070d18; }
::-webkit-scrollbar-thumb { background: #1e3358; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #2c4778; }

::selection { background: #eef3fb; color: #070d18; }
```

- [ ] **Step 4: Verify the build compiles**

Run: `npm run build`
Expected: build completes with no errors. Sections will look wrong at this point — components still carry their own light-mode inline hex. That is expected and is what Tasks 5–12 fix.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css app/layout.jsx
git commit -m "feat(theme): dark token foundation + Fraunces display serif"
```

---

### Task 2: Shared motion vocabulary

**Files:**
- Create: `lib/motion.js`

**Interfaces:**
- Produces: `EASE`, `reveal(delay)`, `revealFrom(direction, delay)`, `stagger(gap)`, `hoverLift`. Consumed by every component task from Task 3 onward.

- [ ] **Step 1: Write `lib/motion.js`**

```js
// Shared motion vocabulary. Components import from here — never define
// their own durations, easings or offsets. Three primitives only:
// reveal (enter), stage (scroll-linked, defined per-component via useScroll),
// hover (interactive lift).

export const EASE = [0.22, 1, 0.36, 1]

/** Fade + rise on enter. Fires once when 25% of the element is visible. */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, delay, ease: EASE },
})

/** Directional variant for side-entering elements. */
export const revealFrom = (direction = 'up', delay = 0) => {
  const offset = {
    up:    { y: 16,  x: 0 },
    down:  { y: -16, x: 0 },
    left:  { x: -24, y: 0 },
    right: { x: 24,  y: 0 },
  }[direction]
  return {
    initial: { opacity: 0, ...offset },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, delay, ease: EASE },
  }
}

/** Parent wrapper that staggers its motion children. */
export const stagger = (gap = 0.08) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: gap } },
  },
})

/** Child variant to pair with stagger(). */
export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Interactive lift for cards and links. */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.25, ease: EASE } },
  whileTap: { y: -1 },
}
```

- [ ] **Step 2: Verify it imports cleanly**

Run: `node --input-type=module -e "import('./lib/motion.js').then(m => console.log(Object.keys(m).join(',')))"`
Expected: `EASE,reveal,revealFrom,stagger,staggerChild,hoverLift`

- [ ] **Step 3: Commit**

```bash
git add lib/motion.js
git commit -m "feat(motion): shared motion vocabulary"
```

---

### Task 3: Hero rebuild — the direction check

Build this before the other sections. It is the fastest way to see whether the dark editorial direction is right, and it is cheap to change course here and expensive to change course after ten sections.

**Files:**
- Rewrite: `components/Hero.jsx`
- Modify: `components/SceneBackground.jsx`

**Interfaces:**
- Consumes: `reveal`, `revealFrom` from `lib/motion.js`; tokens from Task 1.
- Produces: `<Hero onCTA={(sectionId) => void} />` — unchanged prop signature, so `app/page.jsx` needs no edit.

- [ ] **Step 1: Flip `components/SceneBackground.jsx` to the dark canvas**

Replace the two wash colours and the base background:

```jsx
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: 'var(--bg)' }}>
      <div className="absolute" style={{
        top: '-220px', right: '-160px', width: '720px', height: '720px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 66%)',
        filter: 'blur(80px)',
      }} />
      <div className="absolute" style={{
        top: '44%', left: '-240px', width: '660px', height: '660px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 68%)',
        filter: 'blur(90px)',
      }} />
    </div>
  )
}
```

- [ ] **Step 2: Rewrite `components/Hero.jsx`**

Structural requirements, all of which differ from the current hero:
- Full viewport (`min-h-screen`), single centred column — not the current two-column copy/screenshot split. The screenshots now belong to the cinematic acts; the hero should not pre-empt them.
- Headline in the display serif at `clamp(2.75rem, 7vw, 4.75rem)`, `leading-[1.02]`, max ~14 words.
- Remove the `<span className="eyebrow">` markup entirely.
- One `.btn-primary` (Get a website) and one `.btn-secondary` (See the work).
- Trust facts as one quiet inline row in `--text-dim`, not four check-badge cells.
- Keep the `onCTA` prop contract.

```jsx
'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { reveal } from '../lib/motion'

const FACTS = ['Built in Perth', 'Live in 1–2 weeks', 'No lock-in', 'You own everything']

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Atmospheric plate slot — replaced with the Higgsfield asset in Task 13 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.h1 {...reveal(0)}
          className="font-display tracking-tight mb-7"
          style={{ fontSize: 'clamp(2.75rem, 7vw, 4.75rem)', lineHeight: 1.02, color: 'var(--text)' }}>
          Websites that make local businesses look <span className="gradient-text">established.</span>
        </motion.h1>

        <motion.p {...reveal(0.08)}
          className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-dim)' }}>
          Blue Peek builds fast, professional websites and lead-capture systems for Australian
          businesses — designed to win the enquiry, not just sit there looking neat.
        </motion.p>

        <motion.div {...reveal(0.16)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <button onClick={() => onCTA('contact')}
            className="group btn-primary flex items-center gap-2 px-8 py-4 rounded-full text-sm w-full sm:w-auto justify-center">
            Get a website
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button onClick={() => onCTA('work')}
            className="btn-secondary flex items-center gap-2 px-8 py-4 rounded-full text-sm w-full sm:w-auto justify-center">
            See the work
          </button>
        </motion.div>

        <motion.div {...reveal(0.28)}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm"
          style={{ color: 'var(--muted)' }}>
          {FACTS.map((f, i) => (
            <span key={f} className="flex items-center gap-5">
              {f}
              {i < FACTS.length - 1 && <span className="w-1 h-1 rounded-full" style={{ background: 'var(--hairline-2)' }} />}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Start the preview and look at it**

Create `.claude/launch.json` if absent:

```json
{
  "version": "0.0.1",
  "configurations": [
    { "name": "bluepeek-website", "runtimeExecutable": "npm", "runtimeArgs": ["run", "dev"], "port": 3000 }
  ]
}
```

Start the preview with `preview_start` using `{name: "bluepeek-website"}`, then screenshot the hero.
Expected: dark canvas, serif headline, no eyebrow badge, two buttons, one quiet facts row. Console free of errors.

- [ ] **Step 4: Stop and get Jac's read on the direction before continuing**

This is a deliberate gate. Show him the hero screenshot. Do not proceed to Task 4 until he confirms the direction.

- [ ] **Step 5: Commit**

```bash
git add components/Hero.jsx components/SceneBackground.jsx .claude/launch.json
git commit -m "feat(hero): dark editorial hero on the new token layer"
```

---

### Task 4: Full-page screenshot capture for the cinematic acts

Acts II and III cannot be built without assets. `public/screenshots/superiorgarage.png` is a 1440×900 above-fold clip; Rodano Flowers has nothing.

**Files:**
- Create: `scripts/capture-stage.mjs`
- Creates assets: `public/screenshots/<slug>/home-desktop-full.jpg`, `public/screenshots/<slug>/home-mobile-full.jpg`

**Interfaces:**
- Produces: for each of `superior-garage` and `rodano-flowers`, a full-page desktop capture at 1440 wide and a full-page mobile capture at 390 wide, JPEG quality 80. `ProjectStage` (Task 5) consumes these paths.

- [ ] **Step 1: Write `scripts/capture-stage.mjs`**

```js
// Full-page desktop + mobile captures for the cinematic ProjectStage sections.
// Usage: node scripts/capture-stage.mjs

import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_ROOT = path.resolve(__dirname, '..', 'public', 'screenshots')

const TARGETS = [
  { slug: 'superior-garage',  url: 'https://superiorgarage.com.au' },
  { slug: 'rodano-flowers',   url: 'https://rodanoflowers.com.au' },
]

const VIEWPORTS = [
  { name: 'home-desktop-full', width: 1440, height: 900 },
  { name: 'home-mobile-full',  width: 390,  height: 844, mobile: true },
]

const browser = await chromium.launch()

for (const t of TARGETS) {
  const dir = path.join(OUT_ROOT, t.slug)
  await fs.mkdir(dir, { recursive: true })

  for (const v of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: 2,
      isMobile: !!v.mobile,
      hasTouch: !!v.mobile,
    })
    const page = await ctx.newPage()
    console.log(`📸 ${t.slug} · ${v.name}`)
    try {
      await page.goto(t.url, { waitUntil: 'networkidle', timeout: 45000 })
      // Scroll the full height so lazy-loaded imagery and scroll-triggered
      // animations resolve before capture, then return to the top.
      await page.evaluate(async () => {
        const step = window.innerHeight
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y)
          await new Promise(r => setTimeout(r, 250))
        }
        window.scrollTo(0, 0)
      })
      await page.waitForTimeout(1500)
      const out = path.join(dir, `${v.name}.jpg`)
      await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 80 })
      const { size } = await fs.stat(out)
      console.log(`   ✓ ${v.name}.jpg — ${(size / 1024 / 1024).toFixed(2)}MB`)
    } catch (err) {
      console.log(`   ✗ Failed: ${err.message}`)
    }
    await ctx.close()
  }
}

await browser.close()
console.log('Done.')
```

- [ ] **Step 2: Run it**

Run: `node scripts/capture-stage.mjs`
Expected: four files written, each logged with its size. If either site fails to load, report it to Jac before substituting a different project — the spec picked these two deliberately.

- [ ] **Step 3: Check the captures are usable**

Run: `sips -g pixelWidth -g pixelHeight public/screenshots/*/home-desktop-full.jpg public/screenshots/*/home-mobile-full.jpg`
Expected: desktop captures 2880px wide (1440 at 2x), tall; mobile 780px wide. Open each in the browser preview and confirm no cookie banner, no broken images, no mid-animation blur. Recapture if any are dirty.

- [ ] **Step 4: Commit**

```bash
git add scripts/capture-stage.mjs public/screenshots/superior-garage public/screenshots/rodano-flowers
git commit -m "feat(assets): full-page desktop + mobile captures for cinematic acts"
```

---

### Task 5: Generalise the pinned stage into `ProjectStage`

**Files:**
- Create: `components/stage/ProjectStage.jsx`
- Create: `lib/projects.js`
- Read for reference: `components/JasmineShowcase.jsx` (the working mechanic — do not delete yet)

**Interfaces:**
- Consumes: `EASE`, `reveal` from `lib/motion.js`.
- Produces: `<ProjectStage project={Project} index={number} />` where

```js
/**
 * @typedef {Object} Project
 * @property {string} slug
 * @property {string} name
 * @property {string} domain          // display only, no protocol
 * @property {string} liveUrl         // full https URL
 * @property {string} description
 * @property {{label: string, value: string}[]} meta   // exactly 3 entries
 * @property {string} desktopShot     // /screenshots/<slug>/home-desktop-full.jpg
 * @property {string} mobileShot      // /screenshots/<slug>/home-mobile-full.jpg
 * @property {string} travel          // e.g. '-72%' — how far the desktop shot scrolls
 */
```

- [ ] **Step 1: Write `lib/projects.js`**

Jasmine's existing capture lives at `/screenshots/jasmine/`, not `/screenshots/jasmine-health-spa/` — keep its real path.

```js
// The three cinematic homepage acts. Range is deliberate: premium services,
// a trade, and retail — so a visitor from any of those recognises themselves.

export const STAGE_PROJECTS = [
  {
    slug: 'jasmine-health-spa',
    name: 'Jasmine Health Spa',
    domain: 'jasminehealthandspa.com.au',
    liveUrl: 'https://jasminehealthandspa.com.au',
    description:
      'A dark, luxurious website for an authentic Thai day spa in Ascot, Perth — designed to feel as calming as the treatments it books.',
    meta: [
      { label: 'Industry',  value: 'Day spa & Thai massage' },
      { label: 'Design',    value: 'Dark luxury · gold on charcoal' },
      { label: 'Delivered', value: '11-page site + booking' },
    ],
    desktopShot: '/screenshots/jasmine/home-desktop-full.jpg',
    mobileShot:  '/screenshots/jasmine/home-mobile-full.jpg',
    travel: '-72%',
  },
  {
    slug: 'superior-garage',
    name: 'Superior Garage',
    domain: 'superiorgarage.com.au',
    liveUrl: 'https://superiorgarage.com.au',
    description:
      'A workshop site built to win the phone call — services, location and booking reachable in one tap from anywhere on the page.',
    meta: [
      { label: 'Industry',  value: 'Automotive workshop' },
      { label: 'Location',  value: 'Malaga, WA' },
      { label: 'Delivered', value: 'Full site + enquiry capture' },
    ],
    desktopShot: '/screenshots/superior-garage/home-desktop-full.jpg',
    mobileShot:  '/screenshots/superior-garage/home-mobile-full.jpg',
    travel: '-72%',
  },
  {
    slug: 'rodano-flowers',
    name: 'Rodano Flowers',
    domain: 'rodanoflowers.com.au',
    liveUrl: 'https://rodanoflowers.com.au',
    description:
      'A wholesale and walk-in florist with an owner portal built in — the client updates photos, hours and text themselves, without calling us.',
    meta: [
      { label: 'Industry',  value: 'Wholesale & retail florist' },
      { label: 'Extra',     value: 'Self-serve owner portal' },
      { label: 'Delivered', value: 'Site + content management' },
    ],
    desktopShot: '/screenshots/rodano-flowers/home-desktop-full.jpg',
    mobileShot:  '/screenshots/rodano-flowers/home-mobile-full.jpg',
    travel: '-72%',
  },
]
```

- [ ] **Step 2: Write `components/stage/ProjectStage.jsx`**

Port the mechanic from `JasmineShowcase.jsx`, parameterised. Requirements:
- Desktop (`lg`+): a `useRef` wrapper of `h-[300vh]` containing a `sticky top-0 h-screen` stage. `useScroll({ target: ref, offset: ['start start', 'end end'] })`. Map `scrollYProgress` with `useTransform` so the desktop screenshot's `y` travels from `0%` to `project.travel`, the phone frame parallaxes in from `x: 60, opacity: 0` to `x: 0, opacity: 1` across the first 40% of progress, and the meta list fades in across 15–35%.
- Below `lg`, or when `useReducedMotion()` is true: render a static stacked layout — heading, description, meta list, a single non-pinned browser frame showing the top of the desktop shot, and the CTA. No `useScroll` work on this path.
- No `.eyebrow` markup. Section heading uses `font-display`.
- Browser chrome bar shows `project.domain` and matches the dark tokens: bar `var(--surface-2)`, hairline border, monospace URL in `var(--muted)`.
- Both CTAs: `View live site` (`.btn-primary`, opens `project.liveUrl` in a new tab with `rel="noopener noreferrer"`) and `Start your project` (`.btn-secondary`, anchors `#contact`).
- Images: `loading="lazy"` on every instance except the first (`index === 0`), which uses `loading="eager"`.
- The stage container gets `id={project.slug}` so the nav can deep-link.

Verify against `components/JasmineShowcase.jsx:120` onward for the exact `useTransform` pattern already proven in this codebase.

- [ ] **Step 3: Render one instance and verify the mechanic**

Temporarily replace `<JasmineShowcase />` in `app/page.jsx` with:

```jsx
import ProjectStage from '../components/stage/ProjectStage'
import { STAGE_PROJECTS } from '../lib/projects'
// ...
<ProjectStage project={STAGE_PROJECTS[0]} index={0} />
```

Run: `npm run build`, then check in the browser preview.
Expected: at desktop width the section pins and the screenshot travels on scroll, identical in feel to the old Jasmine block. At mobile width it does not pin and shows the stacked layout. Console clean.

- [ ] **Step 4: Commit**

```bash
git add components/stage/ProjectStage.jsx lib/projects.js app/page.jsx
git commit -m "feat(stage): data-driven ProjectStage generalised from JasmineShowcase"
```

---

### Task 6: Wire all three acts and retire `JasmineShowcase`

**Files:**
- Modify: `app/page.jsx`
- Delete: `components/JasmineShowcase.jsx`

**Interfaces:**
- Consumes: `ProjectStage`, `STAGE_PROJECTS`.

- [ ] **Step 1: Replace the single instance with all three**

```jsx
{STAGE_PROJECTS.map((project, i) => (
  <ProjectStage key={project.slug} project={project} index={i} />
))}
```

- [ ] **Step 2: Delete the superseded component and its import**

```bash
git rm components/JasmineShowcase.jsx
```

Remove the `import JasmineShowcase from '../components/JasmineShowcase'` line from `app/page.jsx`.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: no unresolved import errors. In the preview, scroll the full homepage: three stages pin in sequence at desktop width, none pin at mobile width, and the page does not jump or trap the scroll between them.

- [ ] **Step 4: Commit**

```bash
git add -A app/page.jsx components/
git commit -m "feat(home): three cinematic acts replace the single Jasmine showcase"
```

---

### Task 7: Merge social proof into one act

**Files:**
- Rewrite: `components/Reviews.jsx` → `components/Proof.jsx`
- Delete: `components/Testimonials.jsx`
- Modify: `app/page.jsx`
- Read: `lib/reviews.js` (existing live-review fetch — reuse, do not reimplement)

**Interfaces:**
- Produces: `<Proof />`, self-fetching, no props.

- [ ] **Step 1: Read the existing data path**

Run: `cat lib/reviews.js components/Reviews.jsx components/Testimonials.jsx`
The live rating and count come from `https://bluepeekdashboard.com.au/api/public/reviews`. Keep that source. Do not hardcode a rating or count — the spec forbids fabricated figures, and the fallback already in `lib/reviews.js` is the only permitted static value.

- [ ] **Step 2: Write `components/Proof.jsx`**

One section, dark, containing: the live aggregate (rating, count, "Google reviews") as a single large display-serif figure; then the individual reviews as `.card` surfaces in a responsive grid; then any written testimonials from the old `Testimonials.jsx` folded into the same grid, visually indistinguishable. Use `stagger()` and `staggerChild` from `lib/motion.js`. No `.eyebrow`. Section id stays `reviews` so existing anchors keep working.

- [ ] **Step 3: Swap it into `app/page.jsx`**

Replace `<Reviews />` and `<Testimonials />` with a single `<Proof />` positioned immediately before `<Contact />`.

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: builds clean. In the preview, the live rating renders a real number (not `undefined` or `NaN`), and there is exactly one social-proof section on the page.

- [ ] **Step 5: Commit**

```bash
git rm components/Testimonials.jsx components/Reviews.jsx
git add components/Proof.jsx app/page.jsx
git commit -m "feat(proof): merge reviews and testimonials into one social-proof act"
```

---

### Task 8: Services absorbs WhyUs

**Files:**
- Rewrite: `components/Services.jsx`
- Delete: `components/WhyUs.jsx`
- Modify: `app/page.jsx`

- [ ] **Step 1: Read both components**

Run: `cat components/Services.jsx components/WhyUs.jsx`
Identify the claims that appear in both. Keep each claim once, in the strongest wording of the two.

- [ ] **Step 2: Rewrite `components/Services.jsx`**

Dark tokens, no inline hex, no `.eyebrow`. Display-serif section heading. Services as `.card` surfaces with `hoverLift`. The WhyUs differentiators become a short supporting row beneath the service cards rather than their own section. Section id stays `services`.

- [ ] **Step 3: Remove `<WhyUs />` from `app/page.jsx` and delete the file**

- [ ] **Step 4: Verify**

Run: `npm run build`, then check the preview.
Expected: one services section, no duplicated claims, no light-mode remnants (grep the file: `grep -c '#[0-9a-fA-F]\{6\}' components/Services.jsx` should return `0`).

- [ ] **Step 5: Commit**

```bash
git rm components/WhyUs.jsx
git add components/Services.jsx app/page.jsx
git commit -m "feat(services): rebuild on dark tokens, absorb WhyUs"
```

---

### Task 9: Process as a scroll-driven sequence

**Files:**
- Rewrite: `components/HowItWorks.jsx` → `components/Process.jsx`
- Modify: `app/page.jsx`

- [ ] **Step 1: Read the current steps**

Run: `cat components/HowItWorks.jsx`
Preserve the actual step content — this is factual copy about how the business runs, not decoration.

- [ ] **Step 2: Write `components/Process.jsx`**

Desktop (`lg`+): a pinned horizontal sequence — a `h-[250vh]` wrapper with a `sticky top-0 h-screen` inner track whose `x` is driven by `useTransform(scrollYProgress, [0, 1], ['0%', '-66%'])`, showing the steps as wide panels moving left as the user scrolls down. Below `lg` or under `useReducedMotion`: a plain vertical numbered list with `reveal()` on each step. Section id stays `how-it-works`.

- [ ] **Step 3: Verify**

Run: `npm run build`, then in the preview scroll through at desktop and mobile widths.
Expected: horizontal travel at desktop, vertical list at mobile, no horizontal overflow on the page body at any width.

- [ ] **Step 4: Commit**

```bash
git rm components/HowItWorks.jsx
git add components/Process.jsx app/page.jsx
git commit -m "feat(process): scroll-driven horizontal process sequence"
```

---

### Task 10: Pricing on dark surfaces

**Files:**
- Rewrite: `components/Packages.jsx`

- [ ] **Step 1: Read the current tiers**

Run: `cat components/Packages.jsx`
Preserve every price and inclusion exactly. Do not invent, round, or "simplify" a price.

- [ ] **Step 2: Rewrite on dark tokens**

`.card` surfaces, one tier marked recommended using `.card-light` plus a single `--accent` hairline — not a badge above a heading. Display-serif prices at a large size. No inline hex. Section id stays `packages`.

- [ ] **Step 3: Verify**

Run: `npm run build` and `grep -c '#[0-9a-fA-F]\{6\}' components/Packages.jsx`
Expected: build clean, grep returns `0`. Prices in the preview match what the old component showed — diff them against `git show HEAD~1:components/Packages.jsx` to be certain.

- [ ] **Step 4: Commit**

```bash
git add components/Packages.jsx
git commit -m "feat(pricing): rebuild package tiers on dark tokens"
```

---

### Task 11: Chrome — Nav, Contact, Footer, MobileCTA, ChatWidget

These share one concern (site chrome and the conversion path) and are verified together.

**Files:**
- Modify: `components/Nav.jsx`, `components/Contact.jsx`, `components/site/SiteFooter.jsx`, `components/MobileCTA.jsx`, `components/ChatWidget.jsx`, `components/Logo.jsx`, `components/site/SiteHeader.jsx`
- Delete: `components/Footer.jsx` if unreferenced

- [ ] **Step 1: Confirm which footer is live**

Run: `grep -rn "components/Footer\|SiteFooter" app components --include=*.jsx`
`app/page.jsx` imports `SiteFooter`. If `Footer.jsx` has no importers, delete it rather than converting it.

- [ ] **Step 2: Convert each file to tokens**

Replace every inline hex with the token that matches its role: page/canvas → `var(--bg)`, panels → `var(--surface)`, headings → `var(--text)`, body → `var(--text-dim)`, labels → `var(--muted)`, borders → `var(--hairline)`. `SiteFooter.jsx` has 46 hex values and `Contact.jsx` has 22 — these are the two biggest.

Nav specifics: scrolled state becomes `rgba(7,13,24,0.82)` with `blur(18px)` and a `var(--hairline)` bottom border; unscrolled stays transparent. Link colours `var(--text-dim)` → `var(--text)` on hover. The Nav links array gains `{ label: 'FAQ', href: '/faq' }` (Task 12 creates that page).

Footer must keep the Terms link and "Powered by BluePeek", and gains an internal link to `/faq`.

Contact: form inputs get `var(--surface-2)` backgrounds, `var(--hairline)` borders, `var(--text)` typed text, and `var(--muted)` placeholders. Verify the placeholder contrast is legible — this is where dark themes most often fail.

- [ ] **Step 3: Verify**

Run: `npm run build`, then `for f in components/Nav.jsx components/Contact.jsx components/site/SiteFooter.jsx components/MobileCTA.jsx components/ChatWidget.jsx components/Logo.jsx components/site/SiteHeader.jsx; do echo "$(grep -c '#[0-9a-fA-F]\{6\}' $f) $f"; done`
Expected: build clean; every count `0` except `Logo.jsx`, whose brand colours are legitimately fixed — leave those.

In the preview: submit the contact form with test data and confirm it still posts. Check the mobile CTA bar is visible and tappable at 390px width.

- [ ] **Step 4: Commit**

```bash
git add components/
git commit -m "feat(chrome): dark nav, contact, footer, mobile CTA and chat widget"
```

---

### Task 12: FAQ moves to its own page

**Files:**
- Create: `app/faq/page.jsx`
- Modify: `components/FAQ.jsx` (keep the component and `HOME_FAQS` export — it holds the content and the schema input)
- Modify: `app/page.jsx` (remove `<FAQ />` and its JSON-LD), `app/sitemap.js`

**Interfaces:**
- Consumes: `HOME_FAQS` and default export from `components/FAQ.jsx`, `faqSchema` from `lib/schema.js`, `JsonLd` from `components/seo/JsonLd`.

- [ ] **Step 1: Create `app/faq/page.jsx`**

A server component with its own `metadata` (title, description, `alternates.canonical: '/faq'`), rendering `<SceneBackground />`, `<Nav />` equivalent chrome consistent with other inner pages, `<FAQ />`, `<SiteFooter />`, and critically `<JsonLd data={faqSchema(HOME_FAQS)} />` — the schema must move with the content, not be dropped.

- [ ] **Step 2: Remove FAQ from the homepage**

Delete `<FAQ />` and the `<JsonLd data={faqSchema(HOME_FAQS)} />` line from `app/page.jsx`, plus the now-unused imports.

- [ ] **Step 3: Add `/faq` to the sitemap**

Run: `cat app/sitemap.js` and add an entry following the existing shape exactly.

- [ ] **Step 4: Verify the schema survived the move**

Run: `npm run build && npm start &` then `curl -s localhost:3000/faq | grep -o '"@type":"FAQPage"'`
Expected: prints `"@type":"FAQPage"`. Then `curl -s localhost:3000/ | grep -c '"@type":"FAQPage"'` should print `0`. Stop the server afterwards.

This check matters: the FAQ is doing real AI-citation work, and silently losing its schema would be a regression that no visual review would catch.

- [ ] **Step 5: Commit**

```bash
git add app/faq app/page.jsx app/sitemap.js components/FAQ.jsx
git commit -m "feat(faq): move FAQ to its own page, schema intact"
```

---

### Task 13: Higgsfield atmospheric assets

**Files:**
- Creates: `public/hero-plate.jpg`
- Modify: `components/Hero.jsx` (the plate slot from Task 3), `app/opengraph-image.jsx`

**Constraint:** abstraction and atmosphere only. No generated people, no generated "client work", no generated business that does not exist. The spec forbids it and it would be a real credibility risk on an agency site.

- [ ] **Step 1: Generate the hero plate**

Use the Higgsfield MCP `generate_image` tool. Prompt along the lines of: deep navy-black abstract field, soft volumetric light from upper centre, subtle atmospheric depth and grain, no objects, no text, no people, cinematic, 16:9. Generate 2–3 variants and pick one.

- [ ] **Step 2: Save, downscale and compress**

Target ≤200KB at 2560px wide. Run: `sips -Z 2560 <downloaded> --out public/hero-plate.jpg && du -h public/hero-plate.jpg`
Expected: under 200KB. If larger, re-export at lower quality — the hero plate is a background and must not delay LCP.

- [ ] **Step 3: Wire it into the hero**

Replace the radial-gradient placeholder div in `components/Hero.jsx` with the image, heavily darkened so the headline keeps its contrast:

```jsx
<div className="absolute inset-0 pointer-events-none" aria-hidden="true">
  <img src="/hero-plate.jpg" alt="" className="w-full h-full object-cover" />
  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,13,24,0.72) 0%, rgba(7,13,24,0.88) 60%, var(--bg) 100%)' }} />
</div>
```

- [ ] **Step 4: Verify contrast did not regress**

In the browser preview, use `javascript_tool` to read the computed colour of the `h1` and sample the plate behind it. Headline must stay ≥4.5:1 against the darkened plate at its lightest point. If not, deepen the overlay — do not lighten the type.

- [ ] **Step 5: Commit**

```bash
git add public/hero-plate.jpg components/Hero.jsx app/opengraph-image.jsx
git commit -m "feat(hero): atmospheric plate behind the headline"
```

---

### Task 14: Inner pages get the dark shell

Without this the site splits personality the moment someone clicks Gallery.

**Files:**
- Modify: `app/about/page.jsx`, `app/gallery/page.jsx`, `app/work/page.jsx`, `app/work/[slug]/page.jsx`, `app/blog/page.jsx`, `app/blog/[slug]/page.jsx`, `app/[slug]/page.jsx`, `app/privacy/page.jsx`, `app/terms/page.jsx`, `components/Portfolio.jsx`, `components/GalleryGrid.jsx`, `components/site/CaseStudyTemplate.jsx`, `components/site/LandingTemplate.jsx`, `components/site/LegalLayout.jsx`

- [ ] **Step 1: Convert every remaining hex to a token**

Same role mapping as Task 11. The heavy files are `CaseStudyTemplate.jsx` (28), `Portfolio.jsx` (25), `LandingTemplate.jsx` (22) and `app/blog/[slug]/page.jsx` (21).

- [ ] **Step 2: Sweep for stragglers**

Run: `grep -rn '#[0-9a-fA-F]\{6\}' app components --include=*.jsx | grep -v Logo.jsx | grep -v opengraph-image`
Expected: no output. `Logo.jsx` and the OG image route keep fixed brand colours by design.

- [ ] **Step 3: Verify every route renders**

Run: `npm run build`
Expected: all static routes prerender without error. Then walk `/`, `/about`, `/gallery`, `/work`, `/blog`, `/faq`, `/privacy`, `/terms` and one `/work/[slug]` in the preview. No white flashes, no unreadable text.

- [ ] **Step 4: Commit**

```bash
git add app components
git commit -m "feat(pages): dark shell across every inner page"
```

---

### Task 15: Performance, accessibility and deploy

**Files:**
- Modify: `components/Portfolio.jsx`, `components/GalleryGrid.jsx`, `components/stage/ProjectStage.jsx`, `next.config.mjs`
- Creates: optimised derivatives under `public/screenshots/`

- [ ] **Step 1: Fix the oversized screenshots**

Several PNGs are 2–4.6MB and served raw: `cafe.png` (4.6MB), `restaurant.png` (3.9MB), `salon.png` (3.3MB), `plumber.png` (2.3MB), `stsbgardening.png` (1.5MB), `airborne.png` (1.2MB), `bluestar.png` (1.1MB), `jasmine.png` (1.0MB). This is a live problem on the current site, not a new one.

Run: `for f in public/screenshots/*.png; do sips -s format jpeg -s formatOptions 78 -Z 1600 "$f" --out "${f%.png}.jpg"; done && du -sh public/screenshots/*.jpg | sort -h | tail -5`
Expected: every derivative well under 400KB. Update the `image` paths in `lib/site.js` (`CASE_STUDIES` and `CLIENT_SITES`) from `.png` to `.jpg`, then delete the PNG originals.

- [ ] **Step 2: Serve them through `next/image`**

In `Portfolio.jsx`, `GalleryGrid.jsx` and `ProjectStage.jsx`, replace raw `<img>` with `next/image`, giving explicit `width`/`height` and `sizes`. Next will emit AVIF/WebP automatically. The tall full-page stage captures keep `<img>` if `next/image` fights their extreme aspect ratio — but they must carry explicit `width`/`height` attributes to avoid layout shift.

- [ ] **Step 3: Run Lighthouse against the production build**

Run: `npm run build && npm start &` then run Lighthouse mobile against `http://localhost:3000`.
Expected: performance no worse than the pre-revamp score. Record both numbers in the commit message. If it regressed, the usual causes here are the hero plate's weight and the tall stage images — fix those before deploying.

- [ ] **Step 4: Accessibility pass**

In the preview, check with `javascript_tool`: every body-text colour resolves to `--text-dim` or lighter against `--bg`; all interactive elements are ≥44px; keyboard-tab through the homepage reaches the nav, both hero CTAs, each stage's live link, and the contact form in a sensible order with a visible focus ring. Add `:focus-visible` styling in `globals.css` if none is present.

- [ ] **Step 5: Verify reduced-motion**

Run `resize_window` with the preview, then set `prefers-reduced-motion` and reload.
Expected: no pinned stages, no scroll-linked transforms, no floating animations — the page reads as a normal document.

- [ ] **Step 6: Commit and deploy**

```bash
git add -A
git commit -m "perf: optimise screenshots, next/image, a11y pass"
git push -u origin feat/v2-dark-cinematic
```

Deploy with `vercel deploy --prod --archive=tgz` — this project is on Zach's team, where env vars are type `sensitive`, so a local `vercel build` always fails. Do not attempt one.

Confirm with Jac before running the production deploy.

---

## Self-review notes

**Spec coverage:** §1 visual system → Task 1. §2 nine acts → Tasks 3, 6, 7, 8, 9, 10, 12. §3 ProjectStage → Task 5. §4 motion → Task 2. §5 Higgsfield → Task 13. §6 capture → Task 4. §7 guardrails → Task 15. §8 file plan → distributed across Tasks 1–14. §9 out of scope → respected; no dashboard, Forms, Reviews platform or UK/IE work appears in any task.

**Known deviation from the spec:** the spec's file plan proposed a `components/dark/` directory. This plan rebuilds components in place instead, because the codebase has no parallel-theme convention and a `dark/` folder would imply a light variant still exists. Import paths across nine pages stay stable as a result.

**Correction to an earlier claim:** `.eyebrow` is already `display: none !important` in the current `globals.css`, so eyebrow badges are suppressed on the live site today even though the markup persists. The markup removal in these tasks is cleanup, not a visible fix.
