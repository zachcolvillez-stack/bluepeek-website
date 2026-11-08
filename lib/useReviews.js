'use client'
import { useContext } from 'react'
import { ReviewContext } from '../components/ReviewProvider'

export function useReviewFeed() {
  return useContext(ReviewContext)
}

export function useReviewAgg() {
  return useReviewFeed()
}
