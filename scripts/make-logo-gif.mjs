// Renders the real brand cube SVG frame-by-frame with Playwright so the
// animation uses the actual logo geometry, not a redraw.
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'public', 'email', 'frames')
await fs.rm(OUT, { recursive: true, force: true })
await fs.mkdir(OUT, { recursive: true })

const SIZE = 240
const FRAMES = 30

const html = `<!doctype html><html><body style="margin:0;background:#fff">
<div id="stage" style="width:${SIZE}px;height:${SIZE}px">
<svg id="s" width="${SIZE}" height="${SIZE}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100" height="100" rx="26" fill="#2B4C9B"/>
  <g id="g" stroke="#ffffff" stroke-width="5.2" stroke-linejoin="round" stroke-linecap="round" fill="none">
    <path id="hex" d="M50 26 L72 38 L72 62 L50 74 L28 62 L28 38 Z"/>
    <path id="sp1" d="M50 26 L50 50"/>
    <path id="sp2" d="M50 50 L72 38"/>
    <path id="sp3" d="M50 50 L28 38"/>
  </g>
</svg></div>
<script>
  const ids = ['hex','sp1','sp2','sp3']
  const els = ids.map(i => document.getElementById(i))
  const lens = els.map(e => e.getTotalLength())
  els.forEach((e,i) => { e.style.strokeDasharray = lens[i]; e.style.strokeDashoffset = lens[i] })
  window.setFrame = (t) => {
    // hexagon draws 0 -> 0.66, spokes stagger across 0.55 -> 1
    const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)
    const hexP = ease(t / 0.66)
    els[0].style.strokeDashoffset = lens[0] * (1 - hexP)
    for (let j = 1; j <= 3; j++) {
      const start = 0.55 + (j - 1) * 0.12
      const p = ease((t - start) / 0.33)
      els[j].style.strokeDashoffset = lens[j] * (1 - p)
    }
    const s = 0.92 + 0.08 * ease(t / 0.8)
    document.getElementById('g').setAttribute('transform',
      'translate(50,50) scale(' + s + ') translate(-50,-50)')
  }
</script></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 })
await page.setContent(html)
await page.waitForTimeout(300)

for (let i = 0; i < FRAMES; i++) {
  const t = i / (FRAMES - 1)
  await page.evaluate((t) => window.setFrame(t), t)
  await page.screenshot({ path: path.join(OUT, String(i).padStart(2, '0') + '.png') })
}
await browser.close()
console.log(`✓ ${FRAMES} frames -> ${OUT}`)
