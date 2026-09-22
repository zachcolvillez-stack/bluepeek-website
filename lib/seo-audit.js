// Shared vocabulary for the free SEO audit. Imported by BOTH the client
// component and the API route, so this file must stay pure - no node built-ins,
// no server-only imports, no secrets.

/** Service preselected in the enquiry flow when someone converts off an audit. */
export const AUDIT_SERVICE = 'SEO & GEO optimisation'

/** How long a result stays cached server-side before the same domain re-runs. */
export const CACHE_MS = 15 * 60 * 1000

/**
 * Turn whatever a visitor typed into a bare hostname.
 *
 * Accepts "example.com.au", "https://www.Example.com.au/contact?x=1",
 * "www.example.com.au". Returns null for anything that isn't a plausible
 * public domain - IP literals included, because the audit has no business
 * pointing at one and allowing them widens the SSRF surface for nothing.
 */
export function normaliseDomain(input) {
  if (typeof input !== 'string') return null
  let value = input.trim().toLowerCase()
  if (!value) return null

  // Strip a scheme if they pasted one, then everything from the first / ? #.
  value = value.replace(/^[a-z][a-z0-9+.-]*:\/\//, '')
  value = value.split(/[/?#]/)[0]
  // Credentials and ports are never part of a domain we want to audit.
  if (value.includes('@')) return null
  value = value.split(':')[0]
  value = value.replace(/^www\./, '').replace(/\.$/, '')

  if (!value || value.length > 253) return null
  // Bare IPv4 / anything with a numeric TLD - not a domain.
  if (/^\d+(\.\d+)*$/.test(value)) return null
  // Labels: alphanumeric + hyphen, no leading/trailing hyphen. TLD: 2+ letters.
  if (!/^([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/.test(value)) return null

  return value
}

export function gradeFor(score) {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 65) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

/** Copy for the band the visitor lands in - sets the tone before the pitch. */
export function verdictFor(score) {
  if (score >= 90) return { headline: 'Your site is in good shape.', tone: 'good' }
  if (score >= 80) return { headline: 'Solid, with a few gaps costing you.', tone: 'good' }
  if (score >= 65) return { headline: 'Google is only seeing half your business.', tone: 'mid' }
  if (score >= 50) return { headline: 'Your site is holding you back.', tone: 'bad' }
  return { headline: 'Google can barely read your site.', tone: 'bad' }
}
