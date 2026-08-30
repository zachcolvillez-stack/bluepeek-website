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
const FRAMES = 26          // reveal frames; the hold is added at assembly time
const STEPS = 9            // number of diagonal bands
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
  const STEPS = ${STEPS}, ANGLE = ${ANGLE}
  window.setFrame = (t) => {
    const eased = 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 2)
    const stepped = Math.ceil(eased * STEPS) / STEPS       // quantised progress
    const p = stepped * 130 - 15                            // -15%..115% sweep
    const mask = 'linear-gradient(' + ANGLE + 'deg, #000 ' + p + '%, rgba(0,0,0,0) ' + (p + 0.5) + '%)'
    tile.style.webkitMaskImage = mask
    tile.style.maskImage = mask
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
    await page.evaluate(t => window.setFrame(t), i / (FRAMES - 1))
    await page.screenshot({ path: path.join(out, String(i).padStart(2,'0') + '.png'), omitBackground: !bg })
  }
  await page.close()
  console.log(`✓ ${mode}`)
}
await browser.close()
