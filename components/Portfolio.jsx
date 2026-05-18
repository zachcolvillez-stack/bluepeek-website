'use client'
import { motion } from 'framer-motion'
import { Coffee, Wrench, Scissors, Utensils, ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  {
    icon: Coffee,
    industry: 'Hospitality',
    title: 'Brew & Bean Cafe',
    location: 'Subiaco',
    description: 'Online menu, table reservations and Instagram feed — built mobile-first for walk-by traffic.',
    gradient: 'from-amber-600/40 to-orange-700/20',
  },
  {
    icon: Wrench,
    industry: 'Trade',
    title: 'Reilly Plumbing & Gas',
    location: 'Joondalup',
    description: 'Quote-first design with click-to-call buttons — built for tradies who need leads, fast.',
    gradient: 'from-blue-600/40 to-cyan-700/20',
  },
  {
    icon: Scissors,
    industry: 'Beauty',
    title: 'Indigo Hair Studio',
    location: 'Fremantle',
    description: 'Premium booking system, treatment menu and stylist portfolios — fully self-service.',
    gradient: 'from-pink-600/40 to-rose-700/20',
  },
  {
    icon: Utensils,
    industry: 'Restaurant',
    title: 'The Long Table',
    location: 'Northbridge',
    description: 'Full reservation flow, seasonal menu updates and integrated online ordering.',
    gradient: 'from-emerald-600/40 to-teal-700/20',
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
              <div className={`relative h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 grid-bg opacity-30" />
                <p.icon size={56} className="text-white/40 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80 border border-white/10">
                  {p.industry}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <ArrowUpRight size={18} className="text-slate-600 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-xs text-slate-500 mb-3">{p.location}, WA</p>
                <p className="text-sm text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10">
          <p className="text-sm text-slate-500">
            Want to be our next case study?{' '}
            <a href="#contact" className="text-blue-400 hover:text-blue-300 font-medium">Get in touch →</a>
          </p>
          <p className="text-[10px] text-slate-700 mt-3">Example projects shown for illustration purposes.</p>
        </motion.div>
      </div>
    </section>
  )
}
