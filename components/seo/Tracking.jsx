'use client'
import { useEffect } from 'react'
import Script from 'next/script'
import { track } from '../../lib/track'

// Loads GTM (preferred) or GA4 only when their IDs are configured, and reports
// phone, email and booking clicks from anywhere on the site as events.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID

export default function Tracking() {
  useEffect(() => {
    function onClick(event) {
      const el = event.target.closest?.('a, button')
      if (!el) return
      const href = el.getAttribute('href') || ''
      const label = (el.textContent || '').trim().slice(0, 80)
      if (href.startsWith('tel:')) track('phone_click', { link_url: href, link_text: label })
      else if (href.startsWith('mailto:')) track('email_click', { link_url: href, link_text: label })
      else if (el.dataset.track === 'booking') track('booking_click', { link_url: href, link_text: label })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  if (GTM_ID) {
    return (
      <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
    )
  }
  if (GA4_ID) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA4_ID}');`}</Script>
      </>
    )
  }
  return null
}
