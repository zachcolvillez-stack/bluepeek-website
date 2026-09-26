// Marketing attribution for leads. On every page load we look for campaign
// parameters (UTMs and ad click ids). When a visit carries any, it replaces the
// stored touch; plain or direct visits keep the last one. The stored touch is
// attached to every lead so the CRM can report source, campaign and keyword.
const KEY = 'bp_attr'
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid']
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000

export function captureAttribution() {
  if (typeof window === 'undefined') return
  try {
    const q = new URLSearchParams(window.location.search)
    const touch = {}
    for (const p of PARAMS) if (q.get(p)) touch[p] = q.get(p).slice(0, 200)
    if (!Object.keys(touch).length) return
    touch.landing_page = window.location.pathname
    touch.referrer = document.referrer ? new URL(document.referrer).hostname : ''
    touch.ts = Date.now()
    localStorage.setItem(KEY, JSON.stringify(touch))
  } catch {}
}

// Flat fields for the lead payload. Falls back to the current page and
// referrer so organic and direct leads still say where they landed.
export function attributionFields() {
  if (typeof window === 'undefined') return {}
  let touch = null
  try {
    touch = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (touch && Date.now() - touch.ts > MAX_AGE_MS) touch = null
  } catch {}
  if (!touch) {
    let ref = ''
    try { ref = document.referrer ? new URL(document.referrer).hostname : '' } catch {}
    touch = { landing_page: window.location.pathname, referrer: ref }
  }
  const out = {}
  for (const [k, v] of Object.entries(touch)) if (k !== 'ts' && v) out[k] = v
  return out
}
