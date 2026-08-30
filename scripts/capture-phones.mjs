// Full-page mobile captures for the three-phone showcase.
// Usage: node scripts/capture-phones.mjs

import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'public', 'screenshots', 'phones')

const TARGETS = [
  { slug: 'jasmine', url: 'https://jasminehealthandspa.com.au' },
]

await fs.mkdir(OUT, { recursive: true })
const browser = await chromium.launch()

for (const t of TARGETS) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  })
  const page = await ctx.newPage()
  console.log(`📱 ${t.slug} — ${t.url}`)
  try {
    await page.goto(t.url, { waitUntil: 'networkidle', timeout: 45000 })
    // Scroll the full height so lazy images and scroll-triggered animations
    // resolve, then return to the top before capturing.
    await page.evaluate(async () => {
      const step = window.innerHeight
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise(r => setTimeout(r, 300))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1500)
    const out = path.join(OUT, `${t.slug}.jpg`)
    await page.screenshot({ path: out, fullPage: true, type: 'jpeg', quality: 78 })
    const { size } = await fs.stat(out)
    const dims = await page.evaluate(() => ({ w: document.body.scrollWidth, h: document.body.scrollHeight }))
    console.log(`   ✓ ${t.slug}.jpg — ${(size / 1024).toFixed(0)}KB · ${dims.w}×${dims.h} CSS px`)
  } catch (err) {
    console.log(`   ✗ Failed: ${err.message}`)
  }
  await ctx.close()
}

await browser.close()
console.log('Done.')
