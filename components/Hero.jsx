'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Check, Star, ExternalLink } from 'lucide-react'

const TRUST = ['Built in Perth', '1–2 Week Turnaround', 'No Lock-In', 'You Own Everything']

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Soft hero glows (subtle, on white) */}
      <div className="hero-glow" style={{ top: '-8%', right: '-6%', width: '560px', height: '560px', background: 'radial-gradient(circle, rgba(47,95,208,0.10) 0%, transparent 68%)' }} />
      <div className="hero-glow" style={{ bottom: '-14%', left: '-8%', width: '460px', height: '460px', background: 'radial-gradient(circle, rgba(12,28,52,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        {/* ── Left: copy ── */}
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow"><MapPin size={12} /> Perth · Servicing all of WA</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.06] mt-6 mb-6"
            style={{ color: '#0c1c34' }}>
            Websites that make local businesses <span className="gradient-text">look established.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#475569' }}>
            Blue Peek designs clean, professional websites and smart digital systems that help Australian businesses build trust, capture leads, and turn visitors into enquiries.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
            <button onClick={() => onCTA('contact')}
              className="group btn-primary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm w-full sm:w-auto justify-center">
              Get a Website
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button onClick={() => onCTA('work')}
              className="btn-secondary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm w-full sm:w-auto justify-center">
              View Our Work
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3">
            {TRUST.map(t => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#0c1c34' }}>
                  <Check size={11} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium" style={{ color: '#475569' }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: real work, framed ── */}
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block">
          {/* Depth card peeking behind */}
          <div className="absolute -right-5 top-8 bottom-8 left-10 rounded-3xl"
            style={{ background: '#f7f9fc', border: '1px solid rgba(12,28,52,0.08)', transform: 'rotate(3deg)' }} />

          {/* Primary browser frame */}
          <div className="relative rounded-3xl overflow-hidden float-soft"
            style={{ background: '#ffffff', border: '1px solid rgba(12,28,52,0.10)', boxShadow: '0 28px 64px rgba(12,28,52,0.16)' }}>
            <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#f7f9fc', borderBottom: '1px solid rgba(12,28,52,0.08)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
              <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
                style={{ background: '#ffffff', color: '#7e8aa0', border: '1px solid rgba(12,28,52,0.08)' }}>
                adizahaircollections.com.au
              </div>
              <ExternalLink size={12} style={{ color: '#a9b6c8' }} />
            </div>
            <div className="relative aspect-[16/11] overflow-hidden" style={{ background: '#eff4fb' }}>
              <img src="/screenshots/adizahaircollections.png" alt="A premium website Blue Peek designed for a local business"
                className="w-full h-full object-cover object-top"
                onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
          </div>

          {/* Floating review chip */}
          <div className="absolute -left-6 bottom-10 glass rounded-2xl px-4 py-3 float-soft-delay" style={{ borderRadius: '16px' }}>
            <div className="flex items-center gap-1 mb-1">
              {[0,1,2,3,4].map(i => <Star key={i} size={12} style={{ color: '#0c1c34', fill: '#0c1c34' }} />)}
            </div>
            <p className="text-xs font-semibold" style={{ color: '#0c1c34' }}>Real sites, live & ranking</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
