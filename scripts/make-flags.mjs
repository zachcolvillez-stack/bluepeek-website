// England and Wales subdivision-flag emoji rendered to PNG.
// They are unsupported on Windows and much of Android (they fall back to
// letters), so shipping images keeps them correct on every platform.
import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'public', 'flags')

const FLAGS = [
  { slug: 'england', emoji: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}' },
  { slug: 'wales',   emoji: '\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}' },
]

const browser = await chromium.launch()
for (const f of FLAGS) {
  const page = await browser.newPage({ viewport: { width: 128, height: 96 }, deviceScaleFactor: 3 })
  await page.setContent(`<body style="margin:0;display:flex;align-items:center;justify-content:center;height:96px;background:transparent">
    <span style="font-size:76px;line-height:1;font-family:'Apple Color Emoji','Segoe UI Emoji',sans-serif">${f.emoji}</span></body>`)
  await page.waitForTimeout(400)
  const el = await page.$('span')
  await el.screenshot({ path: path.join(OUT, `${f.slug}.png`), omitBackground: true })
  await page.close()
  console.log(`✓ ${f.slug}.png`)
}
await browser.close()
