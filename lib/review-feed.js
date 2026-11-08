export const REVIEWS_FEED_URL = 'https://bluepeekdashboard.com.au/api/public/reviews'

// Reject unavailable or malformed feeds instead of turning a failure into zero.
export function parseReviewFeed(value) {
  if (!value?.ok || !Number.isInteger(value.reviewCount) || value.reviewCount < 0) return null
  const rating = Number(value.ratingValue)
  if (!Number.isFinite(rating) || rating < 0 || rating > 5) return null
  return {
    ratingValue: rating.toFixed(1),
    reviewCount: value.reviewCount,
    bestRating: '5',
    mapsUrl: typeof value.mapsUrl === 'string' && /^https:\/\/(www\.)?google\.com\/maps\//.test(value.mapsUrl) ? value.mapsUrl : null,
    reviews: Array.isArray(value.reviews) ? value.reviews.filter(r => typeof r?.author === 'string' && typeof r?.text === 'string' && r.text.trim() && Number.isFinite(r.rating) && r.rating >= 1 && r.rating <= 5) : [],
    checkedAt: typeof value.checkedAt === 'string' ? value.checkedAt : null,
  }
}
