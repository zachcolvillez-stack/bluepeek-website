// Shared vocabulary for the enquire flow. The floating panel, the hero quick
// picks and the bottom-of-page section all read from here so the options a
// visitor sees never drift between the three places they can start.

export const ENQUIRE_ENDPOINT = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/submit-form'

export const CHOICES = [
  'New website or redesign',
  'Google Ads leads',
  'SEO & Google profile',
  'Google Reviews system',
  'Meta & Instagram ads',
  'Not sure yet, help me choose',
]

// Panel heading per picked service. Anything not listed (the SEO audit's
// service, or no pick yet) falls back to the generic heading.
export const CHOICE_TITLES = {
  'New website or redesign': 'Get your new website started',
  'Google Ads leads': 'Get more leads from Google Ads',
  'SEO & Google profile': 'Get found on Google',
  'Google Reviews system': 'Get your Google Reviews system set up',
  'Meta & Instagram ads': 'Get your Meta & Instagram ads running',
  'Not sure yet, help me choose': 'Let\u2019s work out what you need',
}

// Hero qualifier: two questions that land on one of the CHOICES above, so the
// lead arrives with the service picked and both answers attached. Offers are
// the published ones only (website + Google Ads pages); add no new prices here.
export const QUALIFY_GOALS = [
  { id: 'calls', label: 'More calls and enquiries' },
  { id: 'maps', label: 'Show up on Google Maps' },
  { id: 'reviews', label: 'Get more Google reviews' },
  { id: 'social', label: 'Reach locals on Instagram' },
]
export const QUALIFY_HELP = 'help'

export const QUALIFY_SITES = [
  { id: 'good', label: 'Yes, and it works well' },
  { id: 'dated', label: 'Yes, but it is dated' },
  { id: 'none', label: 'No website yet' },
]

const QUALIFY_RESULTS = {
  calls: { service: 'Google Ads leads', title: 'Google Ads', body: 'Search ads that put you in front of people ready to call, with tracking that shows which clicks became jobs.', offer: '$199 first month, then $299/mo. Ad spend separate.' },
  maps: { service: 'SEO & Google profile', title: 'SEO and your Google profile', body: 'Fix your Google Business Profile, local pages and listings so you show up in the map pack for your suburbs.', offer: 'Start with a free SEO audit' },
  reviews: { service: 'Google Reviews system', title: 'A Google Reviews system', body: 'Tap-to-review plaques and follow-up messages so happy customers actually leave the review.', offer: 'We quote it on a short call' },
  social: { service: 'Meta & Instagram ads', title: 'Meta and Instagram ads', body: 'Local ads on Instagram and Facebook built around your best work and current offers.', offer: 'We quote it on a short call' },
  site: { service: 'New website or redesign', title: 'Start with the website', body: 'Ads and SEO send people to your site, so it needs to turn visits into calls first. We can add the rest once it is live.', offer: 'First month free, then from $99/mo. No build fee.' },
  help: { service: 'Not sure yet, help me choose', title: 'Let’s work it out together', body: 'Tell us a little about the business and a founder will suggest where to start.', offer: 'No obligation' },
}

/**
 * Recommendation for a goal + website answer. Reviews do not depend on the
 * website, so they skip the website-first rule every other goal follows.
 */
export function qualify(goal, site) {
  if (goal === QUALIFY_HELP) return QUALIFY_RESULTS.help
  if (goal !== 'reviews' && site && site !== 'good') return QUALIFY_RESULTS.site
  return QUALIFY_RESULTS[goal]
}

export const ENQUIRE_EVENT = 'bp:enquire-open'

/**
 * Open the floating enquiry panel, optionally with a service already picked.
 *
 * `context` is any extra flat key/value detail to carry into the lead - the SEO
 * audit uses it to send the domain and score that prompted the enquiry, so the
 * notification email arrives with the findings already attached.
 */
export function openEnquire(service = null, context = null) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(ENQUIRE_EVENT, { detail: { service, context } }))
}
