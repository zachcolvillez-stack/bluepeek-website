'use client'
import { useEffect } from 'react'
import Script from 'next/script'
import { track } from '../../lib/track'
import { captureAttribution } from '../../lib/attribution'

// Loads GTM (preferred) or gtag (GA4 and/or Google Ads) only when their IDs are
// configured, stores ad/UTM attribution for leads, and reports
// phone, email and booking clicks from anywhere on the site as events.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// Meta pixel runs alongside whichever Google route is active.
function MetaPixel() {
  if (!META_PIXEL_ID) return null
  return <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}</Script>
}

export default function Tracking() {
  useEffect(() => {
    captureAttribution()
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
      <>
        <MetaPixel />
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}</Script>
      </>
    )
  }
  if (GA4_ID || GADS_ID) {
    const configs = [GA4_ID, GADS_ID].filter(Boolean).map(id => `gtag('config','${id}');`).join('')
    return (
      <>
        <MetaPixel />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID || GADS_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());${configs}`}</Script>
      </>
    )
  }
  return <MetaPixel />
}
