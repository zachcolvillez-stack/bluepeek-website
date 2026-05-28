// Capture homepage screenshots of live client sites
// Usage: node scripts/screenshot.mjs

import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR   = path.resolve(__dirname, '..', 'public', 'screenshots')

const SITES = [
  { url: 'https://superiorgarage.com.au', filename: 'superiorgarage.png' },
  { url: 'https://54fadez.com.au',        filename: '54fadez.png' },
]

const browser = await chromium.launch()
const ctx     = await browser.newContext({ viewport: { width: 1440, height: 900 } })

for (const site of SITES) {
  console.log(`📸 ${site.url}`)
  try {
    const page = await ctx.newPage()
    await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(2000)  // let animations settle
    const out = path.join(OUT_DIR, site.filename)
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 } })
    console.log(`   ✓ Saved → ${site.filename}`)
    await page.close()
  } catch (err) {
    console.log(`   ✗ Failed: ${err.message}`)
  }
}

await browser.close()
console.log('Done.')
