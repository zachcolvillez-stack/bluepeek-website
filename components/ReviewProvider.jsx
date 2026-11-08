'use client'
import { createContext, useEffect, useState } from 'react'
import { REVIEW_AGG, REVIEWS, REVIEWS_SOURCE_URL } from '../lib/reviews'
import { parseReviewFeed, REVIEWS_FEED_URL } from '../lib/review-feed'

const fallback = { ...REVIEW_AGG, reviews: REVIEWS, mapsUrl: REVIEWS_SOURCE_URL, checkedAt: '2026-11-08' }
export const ReviewContext = createContext(fallback)

// Share one feed between every score and quote; keep last success on failures.
export default function ReviewProvider({ initialFeed, children }) {
  const [feed, setFeed] = useState(initialFeed || fallback)
  useEffect(() => {
    let cancelled = false
    let inFlight = false
    async function refresh() {
      if (document.visibilityState === 'hidden' || inFlight) return
      inFlight = true
      try {
        const response = await fetch(REVIEWS_FEED_URL, { signal: AbortSignal.timeout(8000) })
        if (!response.ok) return
        const next = parseReviewFeed(await response.json())
        if (next && !cancelled) setFeed(previous => ({
          ...next,
          mapsUrl: next.mapsUrl || previous.mapsUrl,
          reviews: next.reviews.length ? next.reviews : previous.reviews,
        }))
      } catch { /* Keep the verified snapshot while the upstream recovers. */ }
      finally { inFlight = false }
    }
    const retry = !initialFeed ? setTimeout(refresh, 5000) : null
    const interval = setInterval(refresh, 300000)
    return () => { cancelled = true; clearTimeout(retry); clearInterval(interval) }
  }, [initialFeed])
  return <ReviewContext.Provider value={feed}>{children}</ReviewContext.Provider>
}
