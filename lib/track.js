// Conversion events, ready for GTM / GA4 / Google Ads conversion tracking.
// Events go to window.dataLayer (GTM), gtag (GA4 direct) and Vercel Analytics.
// Event names follow GA4's recommended set where one exists.
//
//   generate_lead   - any enquiry or audit form submitted successfully
//   phone_click     - tel: link clicked
//   email_click     - mailto: link clicked
//   booking_click   - element marked data-track="booking" clicked
import { track as vercelTrack } from '@vercel/analytics'

export function track(event, params = {}) {
  if (typeof window === 'undefined') return
  const payload = { page_path: window.location.pathname, ...params }
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...payload })
  if (typeof window.gtag === 'function') window.gtag('event', event, payload)
  try { vercelTrack(event, payload) } catch {}
}
