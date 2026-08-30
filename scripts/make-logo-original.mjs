// Renders the ORIGINAL brand logo (the blue→purple gradient tile from
// app/icon.svg as it was) at signature size. No colour changes.
import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'public', 'email', 'logo-original.png')

const svg = `<svg width="124" height="124" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bp-grad" x1="10" y1="6" x2="92" y2="96" gradientUnits="userSpaceOnUse">
      <stop stop-color="#4f86f7"/><stop offset="0.55" stop-color="#6f6ff5"/><stop offset="1" stop-color="#9b6bf2"/>
    </linearGradient>
  </defs>
  <rect x="4" y="4" width="92" height="92" rx="26" fill="url(#bp-grad)"/>
  <g stroke="#ffffff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round" fill="none">
    <path d="M50 26 L72 38 L72 62 L50 74 L28 62 L28 38 Z"/>
    <path d="M50 26 L50 50 M50 50 L72 38 M50 50 L28 38"/>
  </g>
</svg>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 124, height: 124 }, deviceScaleFactor: 2 })
await page.setContent(`<body style="margin:0;background:#fff">${svg}</body>`)
await page.waitForTimeout(200)
await page.screenshot({ path: OUT })
await browser.close()
console.log('✓ logo-original.png')
