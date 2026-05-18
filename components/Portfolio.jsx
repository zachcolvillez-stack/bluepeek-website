'use client'
import { motion } from 'framer-motion'
import { Coffee, Wrench, Scissors, Utensils, ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    icon: Coffee,
    industry: 'Cafe',
    title: 'Local Cafe — Subiaco',
    description: 'Modern site with online menu, table bookings and Instagram integration.',
    gradient: 'from-amber-600/30 to-orange-700/20',
    badge: 'Recent',
  },
  {
    icon: Wrench,
    industry: 'Tradie',
    title: 'Plumbing Co — Joondalup',
    description: 'Quote-form-first design, mobile-optimised for tradies on the go.',
    gradient: 'from-blue-600/30 to-cyan-700/20',
    badge: 'Recent',
  },
  {
    icon: Scissors,
    industry: 'Salon',
    title: 'Hair Studio — Fremantle',
    description: 'Premium booking system, gallery and treatment menu.',
    gradient: 'from-pink-600/30 to-rose-700/20',
    badge: 'Recent',
  },
  {
    icon: Utensils,
    industry: 'Restaurant',
    title: 'Eatery — Northbridge',
    description: 'Reservation system, full menu and ordering integration.',
    gradient: 'from-emerald-600/30 to-teal-700/20',
    badge: 'Recent',
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            Built for Real<br />Perth Businesses
          </h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            From cafes to tradies, here&apos;s a taste of what we build for local Perth businesses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-[#0a1628]/80 backdrop-blur-md border border-white/8 hover:border-blue-500/30 transition-all duration-300 card-glow cursor-pointer"
            >
              {/* Image area (placeholder) */}
              <div className={`relative h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <p.icon size={56} className="text-white/40 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
                  {p.industry}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <ArrowUpRight size={18} className="text-slate-600 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-slate-500 mt-10">
          Want to be our next case study?{' '}
          <a href="#contact" className="text-blue-400 hover:text-blue-300 font-medium">Get in touch →</a>
        </motion.p>
      </div>
    </section>
  )
}
