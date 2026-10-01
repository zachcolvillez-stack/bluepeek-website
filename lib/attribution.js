// Record the entry page for each visit, including organic and direct traffic.
// Campaign fields retain the most recent tagged touch for up to 90 days;
// landing_page / session_source always describe the current visit.
const CAMPAIGN_KEY = 'bp_attr'
const SESSION_KEY = 'bp_visit'
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid']
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000
const SESSION_MS = 30 * 60 * 1000
let memoryVisit = null
let memoryCampaign = null

function read(storage, key) {
  try { return JSON.parse(window[storage].getItem(key) || 'null') } catch { return null }
}
function write(storage, key, value) {
  try { window[storage].setItem(key, JSON.stringify(value)) } catch {}
}
function referrerHost() {
  try { return new URL(document.referrer).hostname } catch { return '' }
}
function sourceFor(touch, referrer) {
  if (touch.utm_source) return touch.utm_source
  if (touch.gclid || touch.gbraid || touch.wbraid) return 'google_ads'
  if (touch.msclkid) return 'microsoft_ads'
  if (touch.fbclid) return 'facebook'
  if (/(^|\.)(google\.[a-z.]+|bing\.com|search\.yahoo\.com|duckduckgo\.com)$/.test(referrer)) return 'organic_search'
  return referrer ? 'referral' : 'direct'
}

export function captureAttribution() {
  if (typeof window === 'undefined') return
  const now = Date.now()
  const q = new URLSearchParams(window.location.search)
  const campaign = {}
  for (const p of PARAMS) if (q.get(p)) campaign[p] = q.get(p).slice(0, 200)
  const signature = JSON.stringify(campaign)
  let visit = read('sessionStorage', SESSION_KEY) || memoryVisit
  let referrer = referrerHost()
  if (referrer.replace(/^www\./, '') === window.location.hostname.replace(/^www\./, '')) referrer = ''
  if (!visit || now - visit.last_seen > SESSION_MS || (Object.keys(campaign).length && visit.signature !== signature)) {
    visit = { landing_page: window.location.pathname, referrer, session_source: sourceFor(campaign, referrer), signature, last_seen: now }
  }
  visit.last_seen = now
  memoryVisit = visit
  write('sessionStorage', SESSION_KEY, visit)
  if (Object.keys(campaign).length) {
    memoryCampaign = { ...campaign, landing_page: visit.landing_page, ts: now }
    write('localStorage', CAMPAIGN_KEY, memoryCampaign)
  }
}

export function attributionFields() {
  if (typeof window === 'undefined') return {}
  captureAttribution()
  const visit = memoryVisit || {}
  const campaign = read('localStorage', CAMPAIGN_KEY) || memoryCampaign
  const out = {}
  if (campaign && Number.isFinite(campaign.ts) && Date.now() - campaign.ts <= MAX_AGE_MS) {
    for (const key of PARAMS) if (campaign[key]) out[key] = campaign[key]
    if (campaign.landing_page) out.campaign_landing_page = campaign.landing_page
  }
  for (const key of ['landing_page', 'referrer', 'session_source']) if (visit[key]) out[key] = visit[key]
  out.conversion_page = window.location.pathname
  return out
}

// Keep ad click identifiers and contact details out of analytics properties.
export function analyticsAttribution() {
  const fields = attributionFields()
  return Object.fromEntries(['landing_page', 'session_source', 'referrer'].filter(k => fields[k]).map(k => [k, fields[k]]))
}
