import { chromium } from 'playwright'
import fs from 'fs'

const PAGES = [
  { url: 'http://localhost:3000/examples/cafe',       file: 'cafe.png' },
  { url: 'http://localhost:3000/examples/plumber',    file: 'plumber.png' },
  { url: 'http://localhost:3000/examples/salon',      file: 'salon.png' },
  { url: 'http://localhost:3000/examples/restaurant', file: 'restaurant.png' },
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
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 })
  // Wait for all images on the page to load
  await page.evaluate(() => Promise.all(
    Array.from(document.images).filter(i => !i.complete).map(i =>
      new Promise(res => { i.onload = i.onerror = res })
    )
  ))
  // Hide demo banner
  await page.evaluate(() => {
    const banner = document.body.firstElementChild
    if (banner && banner.textContent.includes('Example design')) banner.style.display = 'none'
  })
  // Extra wait for animations / fonts
  await page.waitForTimeout(3000)
  await page.screenshot({
    path: `${OUT_DIR}/${file}`,
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  })
  const stat = fs.statSync(`${OUT_DIR}/${file}`)
  console.log(`   → ${file} (${Math.round(stat.size / 1024)}KB)`)
}

await browser.close()
console.log('✅ Done')
