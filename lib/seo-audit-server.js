// =============================================================================
// Free SEO audit - the crawl and the score. Server only.
// =============================================================================
// Ported from the dashboard's src/lib/portal/seo-score.ts, which grades a
// client's site inside the portal. Two things are different here, and both are
// because this endpoint is PUBLIC and the domain comes from a stranger:
//
//   1. Every fetch goes through safeFetch(), which resolves DNS and refuses to
//      talk to anything on a private/loopback/link-local address, revalidating
//      on each redirect hop. Without that, "audit any domain" is a request
//      forgery tool pointed at our own infrastructure.
//   2. It tries https, then www, then http, and SCORES the outcome - a lot of
//      the businesses we want to pitch are http-only, and "no HTTPS" is a real
//      finding rather than a reason to give up.
//
// No external APIs, no keys, no PageSpeed - pure fetch + parse, so it stays
// fast enough to run inline while someone watches a spinner.
// =============================================================================
import dns from 'node:dns/promises'
import net from 'node:net'
import { gradeFor } from './seo-audit'

const UA = 'Mozilla/5.0 (compatible; BluepeekAudit/1.0; +https://www.bluepeek.com.au/seo-audit)'
const MAX_BYTES = 2 * 1024 * 1024   // a homepage past 2MB of HTML is already a finding
const MAX_HOPS = 4

// --- SSRF guard --------------------------------------------------------------

function isPrivateIPv4(ip) {
  const p = ip.split('.').map(Number)
  if (p.length !== 4 || p.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return true
  const [a, b] = p
  if (a === 0 || a === 10 || a === 127) return true
  if (a === 169 && b === 254) return true                  // link-local
  if (a === 172 && b >= 16 && b <= 31) return true
  if (a === 192 && b === 168) return true
  if (a === 192 && (b === 0 || b === 88)) return true       // IETF protocol / 6to4 relay
  if (a === 100 && b >= 64 && b <= 127) return true         // CGNAT
  if (a === 198 && (b === 18 || b === 19)) return true       // benchmarking
  if (a === 198 && b === 51) return true                     // TEST-NET-2
  if (a === 203 && b === 0) return true                      // TEST-NET-3
  if (a >= 224) return true                                  // multicast + reserved
  return false
}

function isPrivateIPv6(ip) {
  const v = ip.toLowerCase().split('%')[0]
  if (v === '::' || v === '::1') return true
  // IPv4-mapped / -compatible: judge the embedded v4 address instead.
  const mapped = v.match(/^::(?:ffff:)?(\d+\.\d+\.\d+\.\d+)$/)
  if (mapped) return isPrivateIPv4(mapped[1])
  if (/^f[cd]/.test(v)) return true                          // unique local fc00::/7
  if (/^fe[89ab]/.test(v)) return true                       // link-local fe80::/10
  if (/^ff/.test(v)) return true                             // multicast
  return false
}

/** Throws if the hostname resolves anywhere we must not send a request. */
async function assertPublicHost(hostname) {
  const host = hostname.toLowerCase().replace(/\.$/, '')
  if (!host || net.isIP(host)) throw new Error('blocked host')
  if (/(^|\.)(localhost|local|internal|intranet|lan|home|corp|test|example|invalid|onion)$/.test(host)) {
    throw new Error('blocked host')
  }
  let addresses
  try {
    addresses = await dns.lookup(host, { all: true, verbatim: true })
  } catch {
    throw new Error('dns failed')
  }
  if (!addresses.length) throw new Error('dns failed')
  for (const { address, family } of addresses) {
    const priv = family === 6 ? isPrivateIPv6(address) : isPrivateIPv4(address)
    if (priv) throw new Error('blocked host')
  }
}

/** Read a response body but stop at MAX_BYTES, so one huge page can't sink us. */
async function readCapped(response) {
  const reader = response.body?.getReader()
  if (!reader) return ''
  const chunks = []
  let total = 0
  try {
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.length
      chunks.push(value)
      if (total >= MAX_BYTES) { await reader.cancel().catch(() => {}); break }
    }
  } catch {
    // A truncated body is still worth scoring - keep what arrived.
  }
  return new TextDecoder('utf-8', { fatal: false }).decode(
    chunks.length === 1 ? chunks[0] : Buffer.concat(chunks.map(c => Buffer.from(c))),
  )
}

/**
 * Fetch with redirects followed BY HAND, so every hop is re-validated. Using
 * redirect:'follow' would let a public host 302 us onto 127.0.0.1 after the
 * check had already passed.
 */
async function safeFetch(startUrl, { timeout = 10000, method = 'GET' } = {}) {
  let url = startUrl
  const started = Date.now()
  for (let hop = 0; hop <= MAX_HOPS; hop++) {
    let parsed
    try { parsed = new URL(url) } catch { return null }
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null
    if (parsed.username || parsed.password) return null
    try { await assertPublicHost(parsed.hostname) } catch { return null }

    let response
    try {
      response = await fetch(parsed.toString(), {
        method,
        headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml,*/*' },
        redirect: 'manual',
        signal: AbortSignal.timeout(timeout),
        cache: 'no-store',
      })
    } catch { return null }

    const location = response.headers.get('location')
    if (response.status >= 300 && response.status < 400 && location) {
      let next
      try { next = new URL(location, parsed).toString() } catch { return null }
      url = next
      continue
    }
    return {
      status: response.status,
      body: method === 'HEAD' ? '' : await readCapped(response),
      headers: response.headers,
      finalUrl: parsed.toString(),
      ms: Date.now() - started,
    }
  }
  return null   // redirect loop
}

// --- Parsing helpers ---------------------------------------------------------

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”' }

/**
 * Decode the handful of entities that actually turn up in titles and headings.
 * These strings get shown back to the visitor, and "Design &amp; Automation" in
 * our own result panel reads as a bug in us, not in their site.
 */
function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
}

/** Tags become a space, not nothing - otherwise "<span>a</span><span>b</span>" reads as "ab". */
function textFrom(html) {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

// --- The score ---------------------------------------------------------------

/**
 * Reach the homepage however it actually answers: https, then www over https,
 * then plain http. Returns which one worked so the HTTPS check can score it.
 */
async function reachHome(domain) {
  const attempts = [
    { url: `https://${domain}/`, https: true, www: false },
    { url: `https://www.${domain}/`, https: true, www: true },
    { url: `http://${domain}/`, https: false, www: false },
    { url: `http://www.${domain}/`, https: false, www: true },
  ]
  for (const attempt of attempts) {
    const res = await safeFetch(attempt.url, { timeout: 12000 })
    if (res && res.status === 200 && res.body) return { ...attempt, res }
  }
  // One retry on the primary - a single blip shouldn't turn a real site into an F.
  await new Promise(r => setTimeout(r, 1200))
  const retry = await safeFetch(`https://${domain}/`, { timeout: 20000 })
  if (retry && retry.status === 200 && retry.body) {
    return { url: `https://${domain}/`, https: true, www: false, res: retry }
  }
  return null
}

export async function auditDomain(domain) {
  const fetchedAt = new Date().toISOString()
  const reached = await reachHome(domain)

  if (!reached) {
    // ok:false means "we couldn't check it", NOT "it scored zero". The UI must
    // say so rather than showing this as an F.
    return {
      ok: false, domain, score: 0, grade: 'F', checks: [], fetchedAt,
      reason: "We couldn't load that site. Check the address, or try again in a minute.",
    }
  }

  const { res, https } = reached
  const base = new URL(res.finalUrl).origin
  const h = res.body
  const checks = []
  const push = (key, label, ok, detail, weight, fix) =>
    checks.push({ key, label, ok, detail, weight, fix })

  // HTTPS - a browser warning on the door outranks every other finding.
  push('https', 'Secure connection (HTTPS)', https ? 'pass' : 'fail',
    https ? 'Served securely over HTTPS.'
          : 'No HTTPS: browsers show visitors a “Not secure” warning, and Google ranks it down.',
    10, 'Certificate installed and every page forced to HTTPS.')

  // Title
  const title = decodeEntities((h.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '')).trim()
  push('title', 'Page title',
    title.length >= 20 && title.length <= 65 ? 'pass' : title ? 'warn' : 'fail',
    title ? `“${title.slice(0, 60)}” (${title.length} characters)`
          : 'No page title: Google shows your bare domain in the results instead.',
    16, 'A title written around what you do and where you do it.')

  // Meta description. Quote-aware capture (backref to the opening quote) so an
  // apostrophe inside the text doesn't truncate the match.
  const desc = decodeEntities(h.match(/<meta[^>]+name=["']description["'][^>]+content=(["'])([\s\S]*?)\1/i)?.[2]
    ?? h.match(/<meta[^>]+content=(["'])([\s\S]*?)\1[^>]+name=["']description["']/i)?.[2] ?? '')
    .replace(/\s+/g, ' ').trim()
  push('description', 'Search description',
    desc.length >= 70 && desc.length <= 165 ? 'pass' : desc ? 'warn' : 'fail',
    desc ? `${desc.length} characters` : 'No description: Google writes its own, and it is usually worse.',
    12, 'A description that reads like an ad, not a sentence Google guessed.')

  // H1
  const h1 = textFrom(h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '')
  push('h1', 'Main heading (H1)', h1 ? 'pass' : 'warn',
    h1 ? `“${h1.slice(0, 55)}”` : 'No clear main heading: Google has to guess what the page is about.',
    8, 'One clear heading naming the service and the suburb.')

  // Content depth, measured without JavaScript - which is how a crawler sees it.
  const words = textFrom(
    h.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<!--[\s\S]*?-->/g, ' '),
  ).split(' ').filter(Boolean).length
  push('content', 'Content depth', words >= 300 ? 'pass' : words >= 120 ? 'warn' : 'fail',
    `${words} words Google can read on the homepage`,
    12, 'Real copy about your services, written for search and for customers.')

  // LocalBusiness schema
  const hasLocal = /"@type"\s*:\s*"?(LocalBusiness|[A-Za-z]*Business|Store|ProfessionalService|HairSalon|AutoRepair|Plumber|Electrician|Dentist|Restaurant)"?/i.test(h)
  push('schema', 'Business data (schema)', hasLocal ? 'pass' : 'warn',
    hasLocal ? 'Structured business data found.'
             : 'No business schema: this is what feeds your hours, rating and map pin into Google.',
    12, 'LocalBusiness schema with your hours, address, phone and reviews.')

  // Mobile viewport
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(h)
  push('mobile', 'Mobile-friendly', viewport ? 'pass' : 'fail',
    viewport ? 'Mobile viewport is set.'
             : 'No mobile viewport: the site renders desktop-width on phones, where most local searches happen.',
    12, 'Built mobile-first and tested on real phone widths.')

  // Open Graph
  const hasOg = /<meta[^>]+property=["']og:(title|image)["']/i.test(h)
  push('og', 'Link previews (social)', hasOg ? 'pass' : 'warn',
    hasOg ? 'Shares show a rich preview.'
          : 'No preview image or title when someone shares your site in a message or on Facebook.',
    6, 'Preview image and title so shared links look deliberate.')

  // Canonical
  const canon = h.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? ''
  const canonHost = canon ? canon.replace(/^https?:\/\/(www\.)?/, '').split(/[/?#]/)[0] : ''
  const canonOk = !canon || canonHost === domain
  push('canonical', 'Canonical URL', canon ? (canonOk ? 'pass' : 'fail') : 'warn',
    canon ? (canonOk ? 'Set correctly.' : `Points at a different domain (${canonHost}): this can hide your site from Google entirely.`)
          : 'No canonical tag: duplicate versions of a page can compete with each other.',
    8, 'One canonical address per page, www and non-www settled.')

  // robots.txt + sitemap.xml, plus a SECOND timed hit on the homepage.
  //
  // One cold sample is not a number worth grading anyone on - the same site
  // measured 1.7s and 5.3s minutes apart in testing, which is the difference
  // between a pass and a fail on nothing but network weather. Taking the faster
  // of two requests measures what the site can actually do, and it rides along
  // with these two fetches so it costs almost no wall-clock time.
  const [robots, sitemap, second] = await Promise.all([
    safeFetch(`${base}/robots.txt`, { timeout: 7000 }),
    safeFetch(`${base}/sitemap.xml`, { timeout: 7000 }),
    safeFetch(res.finalUrl, { timeout: 12000 }),
  ])

  const samples = [res.ms, second?.status === 200 ? second.ms : null].filter(n => typeof n === 'number')
  const ms = Math.min(...samples)
  push('speed', 'Homepage load time', ms < 1500 ? 'pass' : ms < 3500 ? 'warn' : 'fail',
    `${(ms / 1000).toFixed(1)}s to deliver the homepage${samples.length > 1 ? ' (fastest of two requests' : ' (measured'} from our server just now)`,
    10, 'A build that delivers the page in well under a second.')

  const robotsOk = robots && robots.status === 200
  const blocksAll = robotsOk && /disallow:\s*\/\s*$/im.test(robots.body)
  push('robots', 'Crawl rules (robots.txt)', robotsOk ? (blocksAll ? 'fail' : 'pass') : 'warn',
    robotsOk ? (blocksAll ? 'Your robots.txt blocks Google from the whole site.' : 'Present and not blocking Google.')
             : 'No robots.txt found.',
    6, 'Crawl rules that let Google in and keep it off the junk.')
  const sitemapOk = sitemap && sitemap.status === 200
  push('sitemap', 'Sitemap', sitemapOk ? 'pass' : 'warn',
    sitemapOk ? 'Present: helps Google find every page.' : 'No sitemap.xml: Google has to find your pages by luck.',
    8, 'A sitemap that regenerates itself as pages are added.')

  const total = checks.reduce((s, c) => s + c.weight, 0)
  const earned = checks.reduce((s, c) => s + (c.ok === 'pass' ? c.weight : c.ok === 'warn' ? c.weight * 0.4 : 0), 0)
  const score = Math.round((earned / total) * 100)
  const issues = checks.filter(c => c.ok !== 'pass').length

  return {
    ok: true,
    domain,
    finalUrl: res.finalUrl,
    https,
    score,
    grade: gradeFor(score),
    // Every check here is on-page and every one of them is fixed by a rebuild,
    // so the projection is the full 100 rather than a number we invented to
    // look modest. The UI states plainly what the 100 covers.
    projectedScore: 100,
    issues,
    fetchMs: ms,
    words,
    checks,
    fetchedAt,
  }
}
