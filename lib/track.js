// Conversion events, ready for GTM / GA4 / Google Ads conversion tracking.
// Events go to window.dataLayer (GTM), gtag (GA4 direct) and Vercel Analytics.
// Event names follow GA4's recommended set where one exists.
//
//   generate_lead   - any enquiry or audit form submitted successfully (primary)
//   form_start      - first interaction with a lead form (secondary, once per form per page)
//   phone_click     - tel: link clicked (secondary)
//   email_click     - mailto: link clicked (secondary)
//   booking_click   - element marked data-track="booking" clicked (secondary)
//
// Google Ads: when NEXT_PUBLIC_GADS_ID and NEXT_PUBLIC_GADS_LEAD_LABEL are set
// (and GTM is not), generate_lead also sends the Ads conversion directly, with
// a per-lead transaction_id so Google discards any duplicate. If GTM is used
// instead, fire the Ads tag in GTM from the generate_lead event, never both.
import { track as vercelTrack } from '@vercel/analytics'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID
const GADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GADS_LEAD_LABEL

export function newLeadId() {
  return `bp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  const payload = { page_path: window.location.pathname, ...params }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload)
    if (event === 'generate_lead' && !GTM_ID && GADS_ID && GADS_LEAD_LABEL) {
      window.gtag('event', 'conversion', { send_to: `${GADS_ID}/${GADS_LEAD_LABEL}`, transaction_id: params.lead_id || '' })
    }
  }
  try { vercelTrack(event, payload) } catch {}
}

const started = new Set()
export function trackFormStart(formVariant) {
  if (started.has(formVariant)) return
  started.add(formVariant)
  track('form_start', { form_variant: formVariant })
}
