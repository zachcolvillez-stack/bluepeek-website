// Records every free-audit run to the CRM Supabase so the dashboard can show
// who is auditing their own site and what they scored - that list is the whole
// point of putting the tool on the site.
//
// Deliberately fire-and-forget: a logging failure must never cost a visitor
// their result. If the env vars are unset the tool still works and this no-ops,
// so the page can ship before the key is added in Vercel.
//
// NOTE the project ref. This is the CRM/dashboard Supabase (jephyb...), NOT the
// BluePeek Forms project (bumjk...) that the enquiry flow posts to. Mixing the
// two is an easy and very confusing mistake.
import crypto from 'node:crypto'

const URL_ENV = process.env.CRM_SUPABASE_URL
const KEY_ENV = process.env.CRM_SUPABASE_SERVICE_ROLE_KEY

let warned = false

/**
 * Visitor IPs are personal data and we have no reason to hold them. A salted
 * hash still lets us spot one person auditing thirty domains, or the same
 * domain being hammered, without storing who they are.
 */
function hashIp(ip) {
  if (!ip) return null
  const salt = process.env.AUDIT_IP_SALT || 'bluepeek-seo-audit'
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
}

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || null
}

export async function logAudit(result, request) {
  if (!URL_ENV || !KEY_ENV) {
    if (!warned) {
      warned = true
      console.warn('[seo-audit] CRM_SUPABASE_URL / CRM_SUPABASE_SERVICE_ROLE_KEY unset — audits are not being logged.')
    }
    return
  }

  const row = {
    domain: result.domain,
    reachable: Boolean(result.ok),
    score: result.ok ? result.score : null,
    grade: result.ok ? result.grade : null,
    issues: result.ok ? result.issues : null,
    https: result.ok ? result.https : null,
    fetch_ms: result.ok ? result.fetchMs : null,
    // Store the per-check detail so a follow-up call can open with the actual
    // findings instead of "you scored badly".
    checks: result.ok ? result.checks : null,
    referrer: request.headers.get('referer')?.slice(0, 500) || null,
    user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
    country: request.headers.get('x-vercel-ip-country') || null,
    region: request.headers.get('x-vercel-ip-country-region') || null,
    ip_hash: hashIp(clientIp(request)),
  }

  try {
    const response = await fetch(`${URL_ENV.replace(/\/$/, '')}/rest/v1/seo_audits`, {
      method: 'POST',
      headers: {
        apikey: KEY_ENV,
        Authorization: `Bearer ${KEY_ENV}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(6000),
    })
    if (!response.ok) {
      // Log the status, not the body - the body can echo the row back.
      console.warn(`[seo-audit] log failed: ${response.status}`)
    }
  } catch (error) {
    console.warn('[seo-audit] log error:', error?.message ?? error)
  }
}
