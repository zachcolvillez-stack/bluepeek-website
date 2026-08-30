// Blue Peek animated mark — DIAGONAL SLAT REVEAL.
// The artwork is cut into leaning parallelogram bands. Each band slides in
// along its own diagonal and fades up, staggered left to right, so mid-way
// you see alternating revealed / empty diagonal rectangles.
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SIZE = 240
const FRAMES = 16
const BANDS = 6
const LEAN = 22        // % of width the top edge leads the bottom by

const MODES = { solid: '#ffffff', alpha: null, green: '#00FF00' }

function html(bg) {
  return `<!doctype html><html><body style="margin:0;${bg ? `background:${bg}` : 'background:transparent'}">
<div id="stage" style="width:${SIZE}px;height:${SIZE}px;position:relative;overflow:hidden">
</div>
<script>
  const BANDS = ${BANDS}, LEAN = ${LEAN}, SIZE = ${SIZE}
  const stage = document.getElementById('stage')
  const bands = []
  // Each band is a diagonal slice of the same image, clipped to a parallelogram.
  for (let i = 0; i < BANDS; i++) {
    const w = 100 / BANDS
    const x0 = i * w, x1 = (i + 1) * w
    const d = document.createElement('div')
    d.style.cssText =
      'position:absolute;inset:0;will-change:transform,opacity;' +
      'clip-path:polygon(' + (x0 + LEAN) + '% 0%, ' + (x1 + LEAN) + '% 0%, ' +
                             x1 + '% 100%, ' + x0 + '% 100%)'
    const img = document.createElement('img')
    img.src = 'http://localhost:4791/brand/logo.png'
    img.style.cssText = 'width:100%;height:100%;display:block;border-radius:' + (SIZE * 0.26) + 'px'
    d.appendChild(img)
    stage.appendChild(d)
    bands.push(d)
  }
  const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)
  window.setFrame = (i) => {
    const t = i / (${FRAMES} - 1)
    bands.forEach((b, k) => {
      // each band starts a little after the one to its left
      const start = (k / BANDS) * 0.55
      const p = ease((t - start) / 0.45)
      b.style.opacity = p
      // slides in along the diagonal it leans on
      b.style.transform = 'translate(' + ((1 - p) * 14) + '%, ' + ((1 - p) * -6) + '%)'
    })
  }
  window.setFrame(0)
</script></body></html>`
}

const browser = await chromium.launch()
for (const [mode, bg] of Object.entries(MODES)) {
  const out = path.join(ROOT, 'public', 'email', 'frames-' + mode)
  await fs.rm(out, { recursive: true, force: true })
  await fs.mkdir(out, { recursive: true })
  const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 })
  await page.setContent(html(bg))
  await page.waitForTimeout(700)
  for (let i = 0; i < FRAMES; i++) {
    await page.evaluate(i => window.setFrame(i), i)
    await page.screenshot({ path: path.join(out, String(i).padStart(2,'0') + '.png'), omitBackground: !bg })
  }
  await page.close()
  console.log(`✓ ${mode}`)
}
await browser.close()
