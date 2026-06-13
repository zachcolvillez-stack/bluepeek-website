'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Check } from 'lucide-react'

const TRUST = ['Built in Perth', '1–2 Week Turnaround', 'No Lock-In', 'You Own Everything']

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Soft hero glows */}
      <div className="hero-glow" style={{ top: '-10%', right: '-5%', width: '560px', height: '560px', background: 'radial-gradient(circle, rgba(79,134,247,0.22) 0%, transparent 70%)' }} />
      <div className="hero-glow" style={{ bottom: '-15%', left: '-8%', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(155,107,242,0.18) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
        {/* ── Left: copy ── */}
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow"><MapPin size={12} /> Perth · Servicing all of WA</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.08] mt-6 mb-6"
            style={{ color: '#1a1730' }}>
            Websites that make local businesses <span className="gradient-text">look established.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#565471' }}>
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
                  style={{ background: 'linear-gradient(135deg, #7fb0f7, #a78bf5)' }}>
                  <Check size={11} className="text-white" strokeWidth={3} />
                </span>
                <span className="text-sm font-medium" style={{ color: '#565471' }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: hero illustration ── */}
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block">
          <img
            src="/hero-desk.png"
            alt="Laptop on a desk displaying custom Blue Peek website designs and dashboards"
            className="float-soft w-full h-auto"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 8%, #000 92%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
