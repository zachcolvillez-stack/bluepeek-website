// Public, unauthenticated endpoint behind the free SEO audit. Anyone on the
// internet can make this server fetch a URL, so the interesting parts are the
// limits, not the scoring: see lib/seo-audit-server.js for the SSRF guard.
import { NextResponse } from 'next/server'
import { normaliseDomain, CACHE_MS } from '../../../lib/seo-audit'
import { auditDomain } from '../../../lib/seo-audit-server'
import { logAudit, clientIp } from '../../../lib/seo-audit-log'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Per-instance, in-memory, and therefore leaky across serverless instances -
// it thins out abuse rather than stopping it. The real backstop is the result
// cache below, which means a hammered domain costs one crawl per 15 minutes.
const WINDOW_MS = 60 * 1000
const MAX_PER_WINDOW = 6
const hits = new Map()
const cache = new Map()

function rateLimited(ip) {
  if (!ip) return false
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (!times.some(t => now - t < WINDOW_MS)) hits.delete(key)
  }
  return recent.length > MAX_PER_WINDOW
}

function cached(domain) {
  const entry = cache.get(domain)
  if (entry && Date.now() - entry.at < CACHE_MS) return entry.result
  if (entry) cache.delete(domain)
  return null
}

export async function POST(request) {
  let body
  try { body = await request.json() } catch { body = {} }

  // Honeypot - same convention as the enquiry forms.
  if (body?._hp) return NextResponse.json({ ok: true, ignored: true })

  const domain = normaliseDomain(body?.domain)
  if (!domain) {
    return NextResponse.json(
      { ok: false, error: 'Enter a website address, like yourbusiness.com.au' },
      { status: 400 },
    )
  }

  const ip = clientIp(request)
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'That is a lot of audits. Give it a minute and try again.' },
      { status: 429 },
    )
  }

  const hit = cached(domain)
  if (hit) return NextResponse.json({ ...hit, cached: true })

  let result
  try {
    result = await auditDomain(domain)
  } catch (error) {
    console.error('[seo-audit] crawl failed:', error?.message ?? error)
    return NextResponse.json(
      { ok: false, error: "Something went wrong running that audit. Try again in a moment." },
      { status: 502 },
    )
  }

  cache.set(domain, { at: Date.now(), result })
  if (cache.size > 500) cache.delete(cache.keys().next().value)

  // Logged after the result is in hand and never awaited into the response path:
  // the visitor's result does not wait on our record-keeping.
  logAudit(result, request).catch(() => {})

  return NextResponse.json(result)
}
