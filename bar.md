# bar.md — the bar for the Bluepeek homepage hero

**Reference:** Apple España homepage — `https://www.apple.com/es/`
**Scope:** homepage hero only.
**Goal in the user's words:** less AI, more professional.

Replaces an earlier teardown against a dark AI-product reference (Dala). That bar was wrong for
this goal in both direction and detail: it prescribed 88px+ display type and -0.04em tracking,
where Apple achieves the target feeling at **56px with slightly positive tracking**. Scale was
never the problem.

---

## The finding that drives this bar

Measured above the fold at 1440×900, both sites:

| | Apple ES | Bluepeek |
|---|---|---|
| Headline size | 56px | 56px |
| Headline weight | 600 | 700 |
| Tagline tracking | +0.196px | −1.4px |
| Box shadows | 0 | 5 |
| Gradients | 0 | 7 |
| Rounded card boxes | 0 | 6 |
| Backdrop-blur elements | 1 (sticky nav) | 4 |
| Text elements | 18 | 9 |

Apple carries twice the text with none of the ornament. "Looks AI" is not a typography problem
here — it is a **decoration-to-content ratio** problem. Every mechanism below is a subtraction.

---

## Mechanisms

Each is checkable in a rendered screenshot or a one-line DOM query.

### 1. Zero box shadows above the fold

Apple: 0. Current: 5. Depth comes from solid-colour contrast between full-width bands, never
from a drop shadow. Any `box-shadow` on an element visible in the first 900px fails. The sticky
nav is exempt.

### 2. Zero gradients above the fold, except the brand mark

Apple: 0. Current: 7. This includes `.gradient-text` on the headline, the `.hero-glow` radial
blobs, and the `.btn-primary` navy gradient — a flat navy fill replaces it. The cube logo keeps
its gradient; nothing else gets one.

### 3. No frosted glass, and no ambient animation

Apple runs one backdrop-blur (the sticky nav) and nothing bobbing. Current: 4 blurs plus
`.float-soft`, `.float-soft-delay` and `.pulse-dot` running forever. Any element that is
perpetually moving, floating, glowing or pulsing above the fold fails. Entrance animations that
play once and resolve are fine.

### 4. Headline weight 600 or lighter, tracking no tighter than -0.01em

Apple sets 56px at weight 600 with open tracking. Current is 700 at -1.4px (-0.025em), which
reads as shouty rather than composed. Keep 56px — it is already correct. Weight 700 fails;
tracking tighter than -0.01em fails.

### 5. Exactly two CTAs — one filled, one outline, both full pills

Apple: filled `#0071e3` plus an outline button of identical size, `border-radius: 980px`, both
17px. Current: two filled buttons competing. Two filled fails. The second action becomes an
outline button in the same navy, not a white card-like button.

### 6. Supporting copy gets bigger, not bolder

Apple's tagline is 28px at weight 400 — hierarchy through size alone. Bluepeek's lead is 18px at
400 under a 700 headline, so weight is doing work that size should do. The lead must reach at
least 22px, and no text above the fold may exceed weight 600.

### 7. At most three distinct type sizes above the fold

Current renders five (56/18/14/12/10). Consolidate to display, lead and one small label size.
A fourth fails. This is what forces the trust chips and review chip to either adopt the label
size or move below the fold.

### 8. Stacked composition, and no simulated browser chrome

Added after round 1. Removing ornament left the generic AI agency-hero archetype intact, and the
brief critic failed the build on exactly that: a left-aligned headline beside a browser-chrome
mockup floated right, over a row of checkmark badges.

Two things fail:
- **The 50/50 text-left / mockup-right split.** Apple stacks — statement first, then the thing
  itself at full width beneath. The split is the template tell.
- **Simulated browser chrome.** Traffic-light dots and a fake URL bar around a screenshot are a
  hallmark of template design. Apple never draws a fake device frame around a product; it shows
  the product. Show the screenshot clean and attribute the client in plain text instead.

Also fails: a row of small checkmark trust badges above the fold.

---

## Explicitly out of scope — do not judge against these

Apple mechanisms that do not transfer, and are **not** failures:

- **Black full-bleed tiles.** Bluepeek stays on white `#ffffff` / `#f7f9fc` per `design-system.md`.
- **Apple blue `#0071e3`.** Accent stays navy `#0c1c34` and blue `#2f5fd0`.
- **SF Pro.** Plus Jakarta Sans and Inter stay.
- **Studio product photography.** Bluepeek has no physical product. The client website screenshot
  is the equivalent hero asset and **must remain** — it is the credibility proof and removing it
  fails the brief. How it is framed is in scope (see mechanism 8); that it is present is not.

## The one thing to hold onto

Apple looks professional because nothing on the screen is trying to prove it is well designed.
Every shadow, gradient, blur and floating chip in the current hero is that kind of proof. Take
them away and what is left — real client work, a clear sentence, one action — is already strong.
