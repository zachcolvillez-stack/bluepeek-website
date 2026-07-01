'use client'
import { motion } from 'framer-motion'
import { Star, ArrowUpRight } from 'lucide-react'
import { REVIEWS, REVIEW_AGG, REVIEWS_SOURCE_URL } from '../lib/reviews'

function Stars({ n = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={15} style={{ color: i < n ? '#0c1c34' : '#d4dcea', fill: i < n ? '#0c1c34' : '#d4dcea' }} />
      ))}
    </div>
  )
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <span className="eyebrow">Reviews</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-6" style={{ color: '#0c1c34' }}>
            What our clients say.
          </h2>

          {/* Aggregate rating badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ background: '#f7f9fc', border: '1px solid rgba(12,28,52,0.10)' }}>
            <span className="text-3xl font-bold" style={{ color: '#0c1c34' }}>{REVIEW_AGG.ratingValue}</span>
            <span>
              <Stars n={5} />
              <span className="block text-xs mt-0.5" style={{ color: '#7e8aa0' }}>{REVIEW_AGG.reviewCount} Google reviews</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.author}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="card p-6 flex flex-col"
            >
              <Stars n={r.rating} />
              <p className="text-base leading-relaxed my-4 flex-1" style={{ color: '#334155' }}>“{r.text}”</p>
              <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(12,28,52,0.08)' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #16335c, #0c1c34)' }}>
                  {initials(r.author)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: '#0c1c34' }}>{r.author}</p>
                  <p className="text-xs" style={{ color: '#7e8aa0' }}>via Google</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {REVIEWS_SOURCE_URL && (
          <div className="text-center mt-12">
            <a href={REVIEWS_SOURCE_URL} target="_blank" rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm">
              Read all reviews on Google <ArrowUpRight size={15} />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
