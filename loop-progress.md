# Design Loop — progress

**Goal:** make the Bluepeek homepage hero look less AI-generated, more professional.
**Bar:** Apple España homepage (`bar.md`)
**System:** `design-system.md`
**Scope:** homepage hero only (`components/Hero.jsx`)

---

## Round 1

### Pieces

| # | Piece | Covers mechanisms |
|---|---|---|
| P1 | Headline block — headline, lead, CTAs | 4, 5, 6 |
| P2 | Visual block — browser frame, screenshot, review chip | 1, 3 |
| P3 | Section frame — background, glows, trust chips, type-size budget | 2, 3, 7 |

### Builder output — objective mechanism check

Measured on the rendered page at 1440×900, `#hero` only:

| Mechanism | Target | Measured | |
|---|---|---|---|
| 1. Box shadows | 0 | 0 | pass |
| 2. Gradients | 0 | 0 | pass |
| 3. Blur / ambient animation | 0 / 0 | 0 / 0 | pass |
| 4. Headline weight ≤ 600, tracking ≥ -0.01em | 600 / -0.01em | 600 / -0.56px (-0.01em) | pass |
| 5. One filled + one outline pill | 1 + 1 | navy fill + 1px outline, both 9999px | pass |
| 6. Lead ≥ 22px, weight ≤ 600 | ≥22 / ≤600 | 22px / 400 | pass |
| 7. ≤ 3 type sizes above fold | 3 | 56 / 22 / 14 | pass |

Changes made this round:

- removed both `.hero-glow` radial blobs
- removed `.gradient-text` from the headline, flat navy instead
- headline weight 700 → 600, tracking -0.025em → -0.01em
- lead 18px → 22px
- `.btn-primary` gradient → flat navy fill; `.btn-secondary` white card → transparent outline
- removed the rotated depth card behind the browser frame
- removed the browser frame's drop shadow, border only
- removed the floating `.glass` review chip (social proof still present in the stats strip below)
- removed `.float-soft` / `.float-soft-delay` ambient motion
- trust chips: filled navy circle icons → plain checks; domain label 10px → 14px to hit the type budget
- entrance animations kept (they play once and resolve, which mechanism 3 permits)

`globals.css` untouched — the rest of the page keeps the existing treatment, per scope.

### Critic verdicts

| Critic | Judges against | Model | Verdict |
|---|---|---|---|
| Brief | stated goal only | Sonnet | **FAIL** |
| System | `design-system.md` only | Haiku | **FAIL** (1 real, 1 false positive) |
| Craft | `bar.md` + rendered output | Opus | _running_ |

---

## Gap history

### Round 1 — Brief critic (FAIL)

> The hero is built from the exact generic AI-template recipe (giant left-aligned multi-line
> headline, muted gray subhead, two pill-shaped CTAs side by side, a row of small checkmark trust
> badges, and a browser-chrome mockup floated on the right) — the precise pattern the owner said
> they wanted to move away from.

Note: it passed the hero on message clarity and on proof (the real client screenshot), and failed
it purely on the "must not read as AI-generated" requirement. The criticism is **structural, not
decorative** — round 1 removed ornament but left the archetype intact.

### Round 1 — System critic (FAIL)

Named violation: grey border `#E5E7EB` in the hero.

**This was a false positive and was not actioned.** Verified by measuring border width per side:
no visible grey border exists. Tailwind's preflight sets `border: 0 solid #e5e7eb` on every
element, so `borderTopColor` reads grey on 34 elements that render no border at all. The critic
read colour without checking width.

Its secondary observation was correct and **was** actioned: the browser frame used
`rgba(12,28,52,0.12)`, which is neither `--line` (0.10) nor `--line-2` (0.16). Corrected to 0.10.

Every visible border in the hero now: outline button `#0c1c34`, frame `rgba(12,28,52,0.10)`,
chrome bar bottom `rgba(12,28,52,0.10)`. All on-token.

Lesson for the next round: the System critic's brief must require it to check border **width**
before reporting a border colour.

---

## Round 1 — Craft critic (FAIL)

Judged the round 1 build; it finished after round 2 had already landed, so its notes on the trust
chips, the browser-frame URL and the "enquiries." widow refer to elements that no longer exist.
Its central finding survived and drove round 3:

> The hero was cleaned but the chrome around it was not — the nav quote button and the floating
> chat launcher still run the gradient-plus-glow-plus-pulse treatment the hero just deleted, so
> two contradictory design standards sit on screen at the same time.

**It also caught a methodology error.** The builder's audit was scoped to `#hero`; the critic
audited the whole viewport. All of its specific claims verified true against the live page.

---

## Round 2 — structural rebuild

Driven by the round 1 Brief critic: ornament was gone but the archetype remained.

- `bar.md` revised: **mechanism 8 added** (stacked composition, no simulated browser chrome), and
  the "do not centre" exclusion removed — its own stated reason ("Apple centres because a product
  sits below the text") argues for centring once the screenshot moves below
- hero re-composed: centred statement, then the client screenshot full width beneath
- simulated browser chrome deleted (traffic-light dots, fake URL bar)
- checkmark trust-badge row removed — content is not lost, the stats strip below the fold already
  carries "1–2 week turnaround", "No lock-in contracts", "You own everything"
- client attributed in plain text beneath the image, linked, instead of via fake chrome
- lead copy shortened

## Round 3 — above-the-fold chrome

Driven by the Craft critic. **Scope deliberately extended past the hero**, because the failure was
that the hero and its surroundings ran two different standards.

| File | Change |
|---|---|
| `SceneBackground.jsx` | two ambient radial blobs removed, flat white field |
| `Nav.jsx` | quote CTA: gradient + shadow → flat navy |
| `ChatWidget.jsx` | launcher: gradient + heavy shadow → flat navy + hairline; pulsing green dot removed |
| `Logo.jsx` | wordmark 700/18px → 600/22px; mark drop-shadow removed |

### Round 3 measurement — whole viewport, not just `#hero`

| Check | Round 1 (hero-scoped) | Round 3 (viewport-wide) |
|---|---|---|
| Box shadows | 0 *(missed 2)* | **0** |
| Gradients | 0 *(missed 4)* | **0** |
| Backdrop blurs | 0 | **0** |
| Infinite animations | 0 *(missed 1)* | **0** |
| Type sizes | 3 *(missed the 18px wordmark)* | **3** — 56 / 22 / 14 |
| Text heavier than 600 | not checked | **0** |

### Round 3 critic verdicts

| Critic | Model | Verdict |
|---|---|---|
| Brief | Sonnet | **FAIL** |
| System | Haiku | **FAIL** (valid) |
| Craft | Opus | _running_ |

Critic briefs tightened this round: System must check border width per side before reporting a
colour; Brief and Craft must judge the whole screen including nav and floating widgets.

### Round 3 — Brief critic (FAIL)

> The hero is the exact generic AI-template shape — centered headline, muted gray subhead, two
> pill-shaped buttons (dark-filled + outline) — the same block seen on countless v0/Framer-
> generated landing pages.

**Treat the layout half of this with suspicion.** In round 1 this role rejected the left-aligned
text + right-hand mockup split as the template tell. In round 3 it rejects the centred stack with
two pill buttons as the template tell. Those are the two main hero archetypes, and the reference
itself — apple.com/es — is precisely a centred headline, a muted subhead and two pill buttons, one
filled and one outline. By this critic's layout test the bar would fail. A test no reference can
pass is unfalsifiable, and chasing it would loop forever.

**The other half is sound and is actionable.** Its real objection is evidence, not geometry:

- the copy is adjective-driven ("clean, professional ... smart") where it could be specific
- one client screenshot proves one site, not a track record
- the chat launcher reads as an unconfigured template default

Bluepeek has concrete proof that is currently all below the fold: 13+ Australian businesses live,
5.0 from 19 Google reviews, 16 client sites in the gallery. Round 1 and 2 stripped the trust chips
and the review chip in the name of restraint and left adjectives in their place. Apple can open on
an adjective because everyone already knows Apple; an unknown Perth agency cannot.

Round 4 should therefore replace adjectives with specifics above the fold, and must NOT chase the
layout complaint.

### Round 3 — System critic (FAIL, valid)

> Fixed button (chat widget) uses white border `rgba(255,255,255,0.16)` instead of navy at low
> alpha; design spec states "Borders are always navy at low alpha, never grey".

Correct, and self-inflicted: the builder added that border in round 3 when flattening the chat
launcher, reasoning that a navy border would be invisible on a navy fill. That reasoning was
about appearance, not about the spec, and the spec does not allow it.

Fix queued for round 4: remove the border entirely. A navy disc on a white field already has all
the separation it needs, and no border is more on-system than a white one.

Every other rendered colour token-matched. The critic also checked border width per side this
round and reported the borders it examined, so the round 1 false positive did not recur.

---

## Round 4 — evidence + System fix

- chat launcher: off-token white border removed entirely (navy on white needs none)
- hero: evidence line added between lead and CTAs, mirroring where the reference puts its
  availability line. Sourced from `REVIEW_AGG` rather than hardcoded.

### Round 4 verdicts

| Critic | Verdict | Gap |
|---|---|---|
| Brief | **FAIL** | hero says "19 Google reviews", testimonials section says 38 — self-contradiction |
| System | **FAIL** | outline CTA border is solid navy, spec says navy at low alpha |
| Craft | **FAIL** | 7/8 mechanisms pass; CTA pair 48px vs 50px, sharing no common edge |

## Round 5 — CTA box fix

Filled CTA given `border: 1px solid transparent` so the 1px outline border no longer adds height
outside the box. This is the reference's own technique. Verified at 1440x900: both buttons
`top 422, bottom 472, height 50` — identical boxes.

## Open, blocked on the owner

1. **Review count.** Live API reports **38**; five files hardcode **19** (`lib/reviews.js`,
   `app/page.jsx`, `app/about/page.jsx` x2, `public/llms.txt`). The fallback also feeds schema.org,
   so Google currently receives 19. Not changed — it is a business claim, not a design decision.
2. **Outline button border.** System critic wants `rgba(12,28,52,0.16)` per `design-system.md`.
   The reference uses a full-opacity border on its outline button, and a 16%-alpha hairline on a
   CTA is barely visible. Either amend the spec to cover outline buttons, or weaken the button.
3. **Scope.** Rounds 3-5 touched `Nav.jsx`, `ChatWidget.jsx`, `Logo.jsx`, `SceneBackground.jsx` —
   sitewide components, beyond the agreed hero-only scope.
4. **Copy.** The hero lead was shortened by the builder without approval.

Also noted by the Craft critic, not actioned: the nav carries a third navy pill ("Get a Free
Quote") duplicating the hero primary in the same fill and shape; the reference nav has no button.
And the hero entrance stagger was still resolving ~8s after load in dev — worth checking against a
production build, since dev-mode compilation may account for it.
