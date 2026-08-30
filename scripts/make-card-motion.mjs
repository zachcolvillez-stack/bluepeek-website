// Renders the FULL email signature card as an animated asset.
// Same gloss sweep across the logo, plus a soft sheen across the whole card.
// Three backgrounds: white (email), transparent (overlay), green (chroma key).
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const FRAMES = 16
const who = process.argv[2] || 'jac'

let sig = await fs.readFile(path.join(ROOT, 'public', 'email', `signature-${who}.html`), 'utf8')
sig = sig.replaceAll('https://www.bluepeek.com.au/email/', 'http://localhost:4791/email/')

const MODES = {
  white: '#ffffff',
  alpha: null,
  green: '#00FF00',
}

function page(bg) {
  return `<!doctype html><html><body style="margin:0;padding:24px;${bg ? `background:${bg}` : 'background:transparent'}">
  <div id="card" style="display:inline-block;position:relative;overflow:hidden;border-radius:14px">
    ${sig}

  </div>
<script>
  // Diagonal band reveal — the whole card is masked in behind a stepped
  // diagonal edge, matching the reference animation.
  const card = document.getElementById('card')
  const ANGLE = 115
  const TARGET = document.getElementById('card')
  // Wipe-front positions measured frame-by-frame off the reference GIF,
  // so the motion curve is theirs rather than an approximation.
  const CURVE = [0.0,0.0258,0.0581,0.1032,0.1806,0.2968,0.4645,0.671,0.7871,0.8645,0.9161,0.9548,0.9806,0.9871,0.9935,1.0]
  window.setFrame = (i) => {
    const f = CURVE[Math.min(CURVE.length - 1, Math.max(0, i))]
    // Their first reveal frame already shows ~18% of the width, and the
    // last is complete: map the curve onto 18%..100% so every frame differs.
    const p = 18 + f * 82
    const mask = 'linear-gradient(' + ANGLE + 'deg, #000 ' + p + '%, rgba(0,0,0,0) ' + (p + 0.5) + '%)'
    TARGET.style.webkitMaskImage = mask
    TARGET.style.maskImage = mask
  }
  window.setFrame(0)
</script></body></html>`
}

const browser = await chromium.launch()
for (const [mode, bg] of Object.entries(MODES)) {
  const out = path.join(ROOT, 'public', 'brand', 'motion', `card-${who}-${mode}`)
  await fs.rm(out, { recursive: true, force: true })
  await fs.mkdir(out, { recursive: true })

  const p = await browser.newPage({ viewport: { width: 1200, height: 620 }, deviceScaleFactor: 2 })
  await p.setContent(page(bg))
  await p.waitForTimeout(1400)
  const card = await p.$('#card')

  for (let i = 0; i < FRAMES; i++) {
    await p.evaluate(i => window.setFrame(i), i)
    await card.screenshot({
      path: path.join(out, String(i).padStart(2, '0') + '.png'),
      omitBackground: !bg,
    })
  }
  await p.close()
  console.log(`✓ ${who} ${mode}`)
}
await browser.close()
