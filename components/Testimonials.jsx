'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Sarah M.',
    business: 'Cafe Owner, Subiaco',
    rating: 5,
    text: "Zach made the whole process so easy. I had a new website live in under two weeks and I've already had three new enquiries through it. Genuinely couldn't recommend more.",
  },
  {
    name: 'Tom R.',
    business: 'Plumber, Joondalup',
    rating: 5,
    text: "Honest pricing, no jargon, and a website that actually brings in calls. Most importantly he takes care of all the tech stuff so I can focus on the job.",
  },
  {
    name: 'Mel K.',
    business: 'Hair Studio, Fremantle',
    rating: 5,
    text: "The booking system Bluepeek set up has been a game-changer. Saves me hours every week and my clients love how easy it is.",
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">What Clients Say</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            Trusted by Local<br />Perth Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, i) => (
            <motion.div key={r.name}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl p-7 bg-[#0a1628]/80 backdrop-blur-md border border-white/8 hover:border-blue-500/20 card-glow transition-all duration-300"
            >
              <Quote size={28} className="text-blue-500/40 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mb-5">&ldquo;{r.text}&rdquo;</p>
              <div className="pt-4 border-t border-white/5">
                <p className="text-white font-semibold text-sm">{r.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{r.business}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
