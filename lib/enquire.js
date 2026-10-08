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
  'AI automation': 'Get your AI automations set up',
}

// Hero offers: the four things we lead with, each with its published offer.
// One tap opens the enquiry with that service picked. Offers are the published
// ones only (website, Google Ads and review-card pages); add no new prices here.
export const HERO_OFFERS = [
  { service: 'New website or redesign', title: 'A new website', offer: 'First month free, then from $99/mo', logo: '/images/coastal-2pac-preview.webp', fill: true },
  { service: 'Google Reviews system', title: 'More Google reviews', offer: 'Review cards from $39', logo: '/brand/platforms/google-color.svg' },
  { service: 'Google Ads leads', title: 'Ads that bring in leads', offer: '$199 first month, then $299/mo', logo: '/brand/platforms/googleads-color.svg' },
  { service: 'AI automation', title: 'AI automations', offer: 'Instant replies and lead follow-up', logo: '/brand/logo-256.png', fill: true },
]

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
