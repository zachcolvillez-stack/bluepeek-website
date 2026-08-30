// Small PNG icons for the email signature. Email can't use icon fonts or
// inline SVG reliably, so each glyph is rendered to its own PNG.
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'public', 'email')
await fs.mkdir(OUT, { recursive: true })

const LAPIZ = '#0B3ED9'

const ICONS = {
  web: `<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18a15 15 0 010-18"/>`,
  instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="${LAPIZ}" stroke="none"/>`,
  linkedin: `<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M7.2 10.2v7M7.2 7.1v.02M11.4 17v-4a2.4 2.4 0 014.8 0v4"/>`,
  facebook: `<path d="M14.5 8.5h2.2V5.6h-2.4c-2.2 0-3.6 1.4-3.6 3.6v1.6H8.4v3h2.3V21h3.1v-7.2h2.4l.4-3h-2.8V9.6c0-.7.3-1.1.7-1.1z" fill="${LAPIZ}" stroke="none"/>`,
  youtube: `<rect x="2.5" y="6" width="19" height="12" rx="3.5"/><path d="M10.4 9.7l4.6 2.3-4.6 2.3z" fill="${LAPIZ}" stroke="none"/>`,
}

const VERIFIED = `
<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path fill="${LAPIZ}" d="M12 1.6l2.5 1.9 3.1-.3 1 3 2.8 1.4-1 3 1 3-2.8 1.4-1 3-3.1-.3L12 22.4l-2.5-1.9-3.1.3-1-3-2.8-1.4 1-3-1-3 2.8-1.4 1-3 3.1.3z"/>
  <path d="M8.2 12.2l2.6 2.6 5-5.2" stroke="#fff" stroke-width="2.1" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 48, height: 48 }, deviceScaleFactor: 2 })

for (const [name, body] of Object.entries(ICONS)) {
  const svg = `<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g stroke="${LAPIZ}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`
  await page.setContent(`<body style="margin:0;background:#fff">${svg}</body>`)
  await page.waitForTimeout(80)
  await page.screenshot({ path: path.join(OUT, `icon-${name}.png`) })
  console.log(`✓ icon-${name}.png`)
}

await page.setContent(`<body style="margin:0;background:#fff">${VERIFIED}</body>`)
await page.waitForTimeout(80)
await page.screenshot({ path: path.join(OUT, 'verified.png') })
console.log('✓ verified.png')

await browser.close()
