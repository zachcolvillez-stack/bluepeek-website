'use client'
import { useEffect, useState } from 'react'
import { REVIEW_AGG } from './reviews'

const LIVE_REVIEWS_URL = 'https://bluepeekdashboard.com.au/api/public/reviews'

/**
 * Live Google rating + count, shared by every component that displays them.
 * Falls back to REVIEW_AGG only until the fetch resolves — never hardcode
 * a review count in a component, it goes stale and overstates the truth.
 */
export function useReviewAgg() {
  const [agg, setAgg] = useState(REVIEW_AGG)
  useEffect(() => {
    let cancelled = false
    fetch(LIVE_REVIEWS_URL)
      .then(r => (r.ok ? r.json() : null))
      .then(j => {
        if (cancelled || !j?.ok) return
        setAgg({
          ratingValue: String(j.ratingValue ?? REVIEW_AGG.ratingValue),
          reviewCount: j.reviewCount ?? REVIEW_AGG.reviewCount,
          bestRating: '5',
        })
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])
  return agg
}
