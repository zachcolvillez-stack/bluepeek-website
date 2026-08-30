// Blue Peek animated mark — DIAGONAL BAND REVEAL.
// Matches the reference: starts from nothing, the artwork is revealed left to
// right behind a stepped diagonal edge (reads as diagonal rectangles filling
// in), then holds. Reference does the reveal in ~0.45s then holds ~5.5s.
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SIZE = 240
const FRAMES = 16          // reveal frames (reference: 16 @30ms = 480ms)
const STEPS = 16           // diagonal bands — one per frame, no duplicates
const ANGLE = 115          // diagonal direction

const MODES = { solid: '#ffffff', alpha: null, green: '#00FF00' }

function html(bg) {
  return `<!doctype html><html><body style="margin:0;${bg ? `background:${bg}` : 'background:transparent'}">
<div id="stage" style="width:${SIZE}px;height:${SIZE}px;position:relative">
  <img id="tile" src="http://localhost:4791/brand/logo.png"
       style="width:100%;height:100%;display:block;border-radius:${SIZE * 0.26}px">
</div>
<script>
  const tile = document.getElementById('tile')
  // A hard diagonal edge, quantised into STEPS so it fills in as bands
  // rather than a smooth gradient — that is what reads as "rectangles".
  const ANGLE = ${ANGLE}
  const TARGET = tile
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
  const out = path.join(ROOT, 'public', 'email', 'frames-' + mode)
  await fs.rm(out, { recursive: true, force: true })
  await fs.mkdir(out, { recursive: true })
  const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 2 })
  await page.setContent(html(bg))
  await page.waitForTimeout(600)
  for (let i = 0; i < FRAMES; i++) {
    await page.evaluate(i => window.setFrame(i), i)
    await page.screenshot({ path: path.join(out, String(i).padStart(2,'0') + '.png'), omitBackground: !bg })
  }
  await page.close()
  console.log(`✓ ${mode}`)
}
await browser.close()
