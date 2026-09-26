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
