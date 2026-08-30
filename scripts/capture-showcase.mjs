// Above-fold desktop captures for the homepage showcase grid.
import { chromium } from 'playwright'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'public', 'screenshots', 'showcase')
await fs.mkdir(OUT, { recursive: true })

const SITES = [
  { slug: 'artisanconcrete', url: 'https://artisanconcretewa.com.au' },
  { slug: 'rodanoflowers',   url: 'https://rodanoflowers.com.au' },
  { slug: 'empirecuts',      url: 'https://empirecuts.com.au' },
  { slug: 'bobutcher',       url: 'https://bobutcher.com.au' },
  { slug: 'marlinsglass',    url: 'https://marlinsglassfencing.com.au' },
  { slug: 'harmonymassage',  url: 'https://harmonyhomemassage.com.au' },
  { slug: 'texturedbarber',  url: 'https://texturedbarberlounge.com.au' },
  { slug: 'superpainting',   url: 'https://superpaintingwa.com.au' },
]

const browser = await chromium.launch()
for (const s of SITES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  try {
    await page.goto(s.url, { waitUntil: 'networkidle', timeout: 45000 })
    await page.waitForTimeout(2200)
    const out = path.join(OUT, `${s.slug}.jpg`)
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1440, height: 900 }, type: 'jpeg', quality: 78 })
    const { size } = await fs.stat(out)
    console.log(`✓ ${s.slug} — ${(size/1024).toFixed(0)}KB`)
  } catch (e) {
    console.log(`✗ ${s.slug}: ${e.message.split('\n')[0]}`)
  }
  await ctx.close()
}
await browser.close()
