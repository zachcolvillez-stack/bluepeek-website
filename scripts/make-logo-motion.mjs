// Animated Blue Peek mark, rendered frame-by-frame from the real logo asset.
// Produces three backgrounds from one animation:
//   solid  — brand tile, for the email signature
//   alpha  — transparent, for overlaying on anything (true alpha)
//   green  — #00FF00 chroma key, for video editors that need keying
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SIZE = 240
const FRAMES = 40

const MODES = {
  solid: { page: '#ffffff', tile: true },
  alpha: { page: null,      tile: true },   // transparent page behind the tile
  green: { page: '#00FF00', tile: true },
}

function html(bg) {
  return `<!doctype html><html><body style="margin:0;${bg ? `background:${bg}` : 'background:transparent'}">
<div style="width:${SIZE}px;height:${SIZE}px;position:relative;overflow:hidden;border-radius:${SIZE * 0.26}px">
  <img id="tile" src="http://localhost:4791/brand/logo.png"
       style="width:100%;height:100%;display:block;transform-origin:50% 50%">
  <!-- gloss sweep -->
  <div id="shine" style="position:absolute;inset:0;pointer-events:none;
       background:linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.42) 50%, transparent 62%);
       transform:translateX(-140%)"></div>
</div>
<script>
  const tile = document.getElementById('tile')
  const shine = document.getElementById('shine')
  const ease = x => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)
  window.setFrame = (t) => {
    // gloss sweeps across between 12% and 62% of the loop
    const s = (t - 0.12) / 0.5
    shine.style.transform = 'translateX(' + (-140 + 280 * Math.min(1, Math.max(0, s))) + '%)'
    // the tile breathes very slightly so the mark feels alive, not jittery
    const b = 1 + 0.018 * Math.sin(t * Math.PI * 2)
    tile.style.transform = 'scale(' + b + ')'
  }
  window.setFrame(0)
</script></body></html>`
}

const browser = await chromium.launch()
for (const [mode, cfg] of Object.entries(MODES)) {
  const out = path.join(ROOT, 'public', 'email', 'frames-' + mode)
  await fs.rm(out, { recursive: true, force: true })
  await fs.mkdir(out, { recursive: true })

  const page = await browser.newPage({
    viewport: { width: SIZE, height: SIZE },
    deviceScaleFactor: 2,
    ...(cfg.page ? {} : { }),
  })
  await page.setContent(html(cfg.page))
  await page.waitForTimeout(500)

  for (let i = 0; i < FRAMES; i++) {
    await page.evaluate(t => window.setFrame(t), i / FRAMES)
    await page.screenshot({
      path: path.join(out, String(i).padStart(2, '0') + '.png'),
      omitBackground: !cfg.page,
    })
  }
  await page.close()
  console.log(`✓ ${mode}: ${FRAMES} frames`)
}
await browser.close()
