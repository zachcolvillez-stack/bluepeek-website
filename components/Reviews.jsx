'use client'
import { useEffect, useState } from 'react'
import { REVIEWS, REVIEWS_SOURCE_URL } from '../lib/reviews'
const LIVE_REVIEWS_URL = 'https://bluepeekdashboard.com.au/api/public/reviews'
export default function Reviews() {
  const [reviews, setReviews] = useState(REVIEWS)
  const [mapsUrl, setMapsUrl] = useState(REVIEWS_SOURCE_URL)
  useEffect(() => {
    let cancelled = false
    fetch(LIVE_REVIEWS_URL)
      .then(r => r.ok ? r.json() : null)
      .then(j => {
        if (cancelled || !j?.ok || !j.reviews?.length) return
        setReviews(j.reviews.map(r => ({author:r.author,rating:r.rating,text:r.text})))
        if (j.mapsUrl) setMapsUrl(j.mapsUrl)
      }).catch(() => {})
    return () => { cancelled = true }
  }, [])
  return (<section id="reviews" className="bp-section bp-reviews"><div className="bp-wrap">
    <div className="bp-section-heading"><div><p className="bp-kicker">Kind words</p><h2>From the people<br />we work with.</h2></div>{mapsUrl && <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="bp-text-link">Read reviews on Google <span aria-hidden="true">↗</span></a>}</div>
    <div className="bp-review-grid">{reviews.slice(0,3).map(r => <figure key={r.author}><blockquote>“{r.text}”</blockquote><figcaption><strong>{r.author}</strong><span>Google review</span></figcaption></figure>)}</div>
  </div></section>)
}
