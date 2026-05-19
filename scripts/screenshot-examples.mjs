import { chromium } from 'playwright'
import fs from 'fs'

const PAGES = [
  { url: 'https://bluepeek.com.au/examples/cafe',       file: 'cafe.png' },
  { url: 'https://bluepeek.com.au/examples/plumber',    file: 'plumber.png' },
  { url: 'https://bluepeek.com.au/examples/salon',      file: 'salon.png' },
  { url: 'https://bluepeek.com.au/examples/restaurant', file: 'restaurant.png' },
]

const OUT_DIR = 'public/screenshots'
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
})
const page = await context.newPage()

for (const { url, file } of PAGES) {
  console.log(`📸 ${url}`)
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
  // Hide demo banner during screenshot
  await page.evaluate(() => {
    const banner = document.body.firstElementChild
    if (banner && banner.textContent.includes('Example design')) banner.style.display = 'none'
  })
  await page.waitForTimeout(2500)
  await page.screenshot({
    path: `${OUT_DIR}/${file}`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  })
}

await browser.close()
console.log('✅ All screenshots saved to', OUT_DIR)
