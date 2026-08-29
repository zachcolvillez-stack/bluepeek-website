'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { reveal } from '../lib/motion'

const FACTS = ['Built in Perth', 'Live in 1–2 weeks', 'No lock-in', 'You own everything']

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Atmospheric plate slot — the generated asset lands here in Task 13 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        <motion.h1 {...reveal(0)}
          className="font-display tracking-tight mb-7"
          style={{ fontSize: 'clamp(2.75rem, 7vw, 4.75rem)', lineHeight: 1.02, color: 'var(--text)' }}>
          Websites that make local businesses look <span className="gradient-text">established.</span>
        </motion.h1>

        <motion.p {...reveal(0.08)}
          className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: 'var(--text-dim)' }}>
          Blue Peek builds fast, professional websites and lead-capture systems for Australian
          businesses — designed to win the enquiry, not just sit there looking neat.
        </motion.p>

        <motion.div {...reveal(0.16)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
          <button onClick={() => onCTA('contact')}
            className="group btn-primary flex items-center gap-2 px-8 py-4 rounded-full text-sm w-full sm:w-auto justify-center">
            Get a website
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button onClick={() => onCTA('work')}
            className="btn-secondary flex items-center gap-2 px-8 py-4 rounded-full text-sm w-full sm:w-auto justify-center">
            See the work
          </button>
        </motion.div>

        <motion.div {...reveal(0.28)}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm"
          style={{ color: 'var(--muted)' }}>
          {FACTS.map((f, i) => (
            <span key={f} className="flex items-center gap-5">
              {f}
              {i < FACTS.length - 1 && <span className="w-1 h-1 rounded-full" style={{ background: 'var(--hairline-2)' }} />}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
