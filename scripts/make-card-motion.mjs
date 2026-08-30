// Renders the FULL email signature card as an animated asset.
// Same gloss sweep across the logo, plus a soft sheen across the whole card.
// Three backgrounds: white (email), transparent (overlay), green (chroma key).
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const FRAMES = 26
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
  const STEPS = 11, ANGLE = 115
  window.setFrame = (t) => {
    const eased = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 2)
    const stepped = Math.ceil(eased * STEPS) / STEPS
    const p = stepped * 130 - 15
    const mask = 'linear-gradient(' + ANGLE + 'deg, #000 ' + p + '%, rgba(0,0,0,0) ' + (p + 0.5) + '%)'
    card.style.webkitMaskImage = mask
    card.style.maskImage = mask
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
    await p.evaluate(t => window.setFrame(t), i / FRAMES)
    await card.screenshot({
      path: path.join(out, String(i).padStart(2, '0') + '.png'),
      omitBackground: !bg,
    })
  }
  await p.close()
  console.log(`✓ ${who} ${mode}`)
}
await browser.close()
