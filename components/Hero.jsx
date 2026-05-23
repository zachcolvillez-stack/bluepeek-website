'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="relative max-w-5xl mx-auto px-6 text-center pt-32 pb-24">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-10"
          style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee' }}>
          <MapPin size={12} />
          Perth · Servicing all of WA
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-7" style={{ color: '#f5f5f7' }}>
          Websites that<br />
          <span className="gradient-text">actually bring in customers.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: '#8a8a93' }}>
          Custom-built websites and AI lead-capture systems for Perth businesses.
          No templates, no lock-in, no jargon. Just sites that work.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => onCTA('contact')}
            className="group btn-primary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold">
            Get a Free Quote
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button onClick={() => onCTA('work')}
            className="btn-secondary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold">
            See Our Work
          </button>
        </motion.div>

        {/* Stats strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-24 pt-12" style={{ borderTop: '1px solid #1f1f24' }}>
          {[
            { value: '1–2 wks', label: 'Idea to live site' },
            { value: '100%',   label: 'You own it' },
            { value: 'Perth',  label: 'Local, no offshore' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold" style={{ color: '#f5f5f7' }}>{stat.value}</p>
              <p className="text-xs mt-1 tracking-wide uppercase" style={{ color: '#8a8a93' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
