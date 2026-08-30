// Renders the FULL email signature card as an animated asset.
// Same gloss sweep across the logo, plus a soft sheen across the whole card.
// Three backgrounds: white (email), transparent (overlay), green (chroma key).
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const FRAMES = 20
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
    <div id="sheen" style="position:absolute;inset:0;pointer-events:none;
         background:linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.30) 50%, transparent 60%);
         transform:translateX(-130%)"></div>
  </div>
<script>
  const sheen = document.getElementById('sheen')
  const logo = document.querySelector('img[alt="Blue Peek"]')
  if (logo) {
    const w = logo.parentElement
    w.style.position = 'relative'; w.style.display = 'inline-block'; w.style.overflow = 'hidden'
    w.style.borderRadius = '16px'
    const g = document.createElement('div')
    g.id = 'logoGloss'
    g.style.cssText = 'position:absolute;inset:0;pointer-events:none;background:linear-gradient(105deg,transparent 36%,rgba(255,255,255,0.55) 50%,transparent 64%);transform:translateX(-140%)'
    w.appendChild(g)
  }
  window.setFrame = (t) => {
    // logo gloss leads
    const g = document.getElementById('logoGloss')
    if (g) {
      const p = Math.min(1, Math.max(0, (t - 0.05) / 0.40))
      g.style.transform = 'translateX(' + (-140 + 280 * p) + '%)'
    }
    // card sheen follows, slower and softer
    const s = Math.min(1, Math.max(0, (t - 0.25) / 0.55))
    sheen.style.transform = 'translateX(' + (-130 + 260 * s) + '%)'
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
