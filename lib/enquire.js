// Shared vocabulary for the enquire flow. The floating panel, the hero quick
// picks and the bottom-of-page section all read from here so the options a
// visitor sees never drift between the three places they can start.

export const ENQUIRE_ENDPOINT = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/submit-form'

export const CHOICES = [
  'Website redesign',
  'Brand new custom website',
  'SEO & GEO optimisation',
  'AI booking system',
]

export const OTHER_CHOICE = 'Other AI system'

export const ALL_CHOICES = [...CHOICES, OTHER_CHOICE]

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
