'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  { name: 'Sarah Mitchell', business: 'Owner · Brew & Bean Cafe',     location: 'Subiaco',   rating: 5, text: "Honestly didn't think we needed a website. Three weeks after launch we've had bookings from people who literally said they found us on Google. Zach made the whole thing feel easy." },
  { name: 'Tom Reilly',     business: 'Reilly Plumbing & Gas',        location: 'Joondalup', rating: 5, text: "I'm a tradie, not a tech guy. Zach got me — no jargon, just a site that actually brings in calls. Phone's been ringing more this month than all year." },
  { name: 'Melissa K.',     business: 'Founder · Indigo Hair Studio', location: 'Fremantle', rating: 5, text: "The new booking system has been a game-changer. Saves me hours every week and clients keep saying how easy it is. Worth every cent." },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>What Clients Say</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#f5f5f7' }}>
            Trusted by local<br />Perth businesses.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-7"
            >
              <Quote size={24} style={{ color: 'rgba(34,211,238,0.3)' }} className="mb-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={13} style={{ color: '#22d3ee', fill: '#22d3ee' }} />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#b4b4bb' }}>&ldquo;{r.text}&rdquo;</p>
              <div className="pt-4 flex items-center gap-3" style={{ borderTop: '1px solid #232328' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0"
                  style={{ background: 'rgba(34,211,238,0.1)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)' }}>
                  {r.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <p className="font-semibold text-sm leading-tight" style={{ color: '#f5f5f7' }}>{r.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8a8a93' }}>{r.business} · {r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[10px]" style={{ color: '#5a5a62' }}>Example reviews shown for illustration purposes.</p>
      </div>
    </section>
  )
}
