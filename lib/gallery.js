import { CLIENT_SITES } from './site'

// ─── Vercel → Gallery auto-sync ────────────────────────────────────
// The /gallery page calls getGallerySites(). When a Vercel API token is
// configured it pulls every live project from Vercel, filters out our
// private/internal apps, and merges any NEW site in alongside the curated
// CLIENT_SITES list. Curated entries always win (they keep their nice
// industry/location/local screenshot); brand-new projects get an auto
// entry with a screenshot captured on the fly via /api/screenshot.
//
// If there is no token, or the Vercel call fails for any reason, we simply
// return the curated CLIENT_SITES — the gallery never breaks.

const VERCEL_API = 'https://api.vercel.com'

// Projects that must NEVER appear on the public gallery (private SaaS / CRM /
// the marketing site itself / template). Extendable via GALLERY_EXCLUDE env.
const DEFAULT_EXCLUDE = [
  'bluepeek-dashboard',
  'bluepeek-crm',
  'perth-leads',
  'bluepeek-website',
  '_client-template',
]

function excludeList() {
  const extra = (process.env.GALLERY_EXCLUDE || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)
  return new Set([...DEFAULT_EXCLUDE, ...extra])
}

function normDomain(url = '') {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/+$/, '')
    .toLowerCase()
}

// "tyre-warriors" → "Tyre Warriors"
function prettifyName(name = '') {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim()
}

// Pick a project's live production URL, preferring a custom domain over the
// default *.vercel.app alias.
function productionUrl(project) {
  const prod = project?.targets?.production
  if (!prod) return null // no production deployment = not live yet
  const aliases = Array.isArray(prod.alias) ? prod.alias.filter(Boolean) : []
  const custom = aliases.find(a => !a.endsWith('.vercel.app'))
  const domain = custom || aliases[0] || `${project.name}.vercel.app`
  return `https://${normDomain(domain)}`
}

async function fetchVercelSites(token) {
  const params = new URLSearchParams({ limit: '100' })
  if (process.env.VERCEL_TEAM_ID) params.set('teamId', process.env.VERCEL_TEAM_ID)

  const res = await fetch(`${VERCEL_API}/v9/projects?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
    // Refresh hourly so newly-deployed sites show up on their own.
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Vercel API responded ${res.status}`)

  const { projects = [] } = await res.json()
  const excluded = excludeList()

  return projects
    .filter(p => !excluded.has((p.name || '').toLowerCase()))
    .map(p => {
      const url = productionUrl(p)
      if (!url) return null
      return {
        title: prettifyName(p.name),
        industry: 'Website',
        location: '',
        url,
        image: `/api/screenshot?url=${encodeURIComponent(url)}`,
        auto: true,
      }
    })
    .filter(Boolean)
}

// Merge: curated CLIENT_SITES first (canonical), then any Vercel project we
// don't already have an entry for (matched by domain).
function mergeGallery(curated, vercelSites) {
  const have = new Set(curated.map(c => normDomain(c.url)))
  const extras = vercelSites.filter(v => !have.has(normDomain(v.url)))
  return [...curated, ...extras]
}

export async function getGallerySites() {
  const token = process.env.VERCEL_API_TOKEN
  if (!token) return CLIENT_SITES

  try {
    const vercelSites = await fetchVercelSites(token)
    return mergeGallery(CLIENT_SITES, vercelSites)
  } catch (err) {
    console.error('[gallery] Vercel sync failed, falling back to curated list:', err)
    return CLIENT_SITES
  }
}
