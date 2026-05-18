'use client'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Sarah Mitchell',
    business: 'Owner · Brew & Bean Cafe',
    location: 'Subiaco',
    rating: 5,
    text: "Honestly didn't think we needed a website. Three weeks after launch we've had bookings from people who literally said they found us on Google. Zach was patient with all my questions and made the whole thing feel easy.",
  },
  {
    name: 'Tom Reilly',
    business: 'Reilly Plumbing & Gas',
    location: 'Joondalup',
    rating: 5,
    text: "I'm a tradie, not a tech guy. Zach got me — no jargon, no upsells, just a website that actually brings in calls. Phone's been ringing more in the last month than it did all year.",
  },
  {
    name: 'Melissa K.',
    business: 'Founder · Indigo Hair Studio',
    location: 'Fremantle',
    rating: 5,
    text: "The new booking system has been a game-changer. Saves me hours every week and clients keep telling me how easy it is to use. Worth every cent.",
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
            Trusted by Local<br />Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
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
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-blue-400/20 flex items-center justify-center text-blue-300 font-bold text-sm flex-shrink-0">
                  {r.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{r.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{r.business} · {r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[10px] text-slate-700">Example reviews shown for illustration purposes.</p>
      </div>
    </section>
  )
}
