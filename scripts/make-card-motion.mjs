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
  // Diagonal slat reveal: the card is cloned into leaning parallelogram bands,
  // each sliding in on its own diagonal, staggered left to right.
  const BANDS = 8, LEAN = 16
  const card = document.getElementById('card')
  const src = card.innerHTML
  const rect = card.getBoundingClientRect()
  card.innerHTML = ''
  card.style.position = 'relative'
  card.style.width = rect.width + 'px'
  card.style.height = rect.height + 'px'
  const bands = []
  for (let i = 0; i < BANDS; i++) {
    const w = 100 / BANDS
    const x0 = i * w, x1 = (i + 1) * w
    const d = document.createElement('div')
    d.style.cssText =
      'position:absolute;top:0;left:0;width:' + rect.width + 'px;height:' + rect.height + 'px;' +
      'will-change:transform,opacity;clip-path:polygon(' +
      (x0 + LEAN) + '% 0%, ' + (x1 + LEAN) + '% 0%, ' + x1 + '% 100%, ' + x0 + '% 100%)'
    d.innerHTML = src
    card.appendChild(d)
    bands.push(d)
  }
  const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)
  window.setFrame = (i) => {
    const t = i / (${FRAMES} - 1)
    bands.forEach((b, k) => {
      const start = (k / BANDS) * 0.55
      const p = ease((t - start) / 0.45)
      b.style.opacity = p
      b.style.transform = 'translate(' + ((1 - p) * 9) + '%, ' + ((1 - p) * -4) + '%)'
    })
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
