'use client'
import { useReviewFeed } from '../lib/useReviews'
export default function Reviews() {
  const { reviews, mapsUrl } = useReviewFeed()
  return (<section id="reviews" className="bp-section bp-reviews"><div className="bp-wrap">
    <div className="bp-section-heading"><div><p className="bp-kicker">Kind words</p><h2>From the people<br />we work with.</h2></div>{mapsUrl && <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="bp-text-link">Read reviews on Google <span aria-hidden="true">↗</span></a>}</div>
    <div className="bp-review-grid">{reviews.slice(0,3).map(r => <figure key={r.author}><blockquote>“{r.text}”</blockquote><figcaption><strong>{r.author}</strong><span>Google review</span></figcaption></figure>)}</div>
  </div></section>)
}
