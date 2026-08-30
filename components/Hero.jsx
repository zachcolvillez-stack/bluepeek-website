'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { reveal, revealFrom } from '../lib/motion'

const FACTS = ['Built on the Gold Coast', 'Live in 1–2 weeks', 'No lock-in', 'You own everything']

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-32 pb-20 overflow-hidden">
      {/* Lapiz wash — colour with intent, kept off the type */}
      <div className="hero-glow" style={{ top: '-10%', right: '-8%', width: '620px', height: '620px', background: 'radial-gradient(circle, rgba(43,76,155,0.16) 0%, transparent 68%)' }} />
      <div className="hero-glow" style={{ bottom: '-16%', left: '-10%', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(43,76,155,0.08) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-[1.08fr_1fr] gap-14 items-center">
        <div>
          <motion.h1 {...reveal(0)}
            className="font-display mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.25rem)', lineHeight: 1.02 }}>
            Websites that make local businesses look <span className="text-lapiz">established.</span>
          </motion.h1>

          <motion.p {...reveal(0.08)}
            className="text-base md:text-lg leading-relaxed mb-9 max-w-xl" style={{ color: 'var(--text)' }}>
            Blue Peek builds fast, professional websites and lead-capture systems for Australian
            businesses — designed to win the enquiry, not just sit there looking neat.
          </motion.p>

          <motion.div {...reveal(0.16)} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-9">
            <button onClick={() => onCTA('contact')}
              className="group btn-primary flex items-center gap-2 px-8 py-4 rounded-full text-sm justify-center">
              Get a website
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button onClick={() => onCTA('industries')}
              className="btn-secondary flex items-center gap-2 px-8 py-4 rounded-full text-sm justify-center">
              See the work
            </button>
          </motion.div>

          <motion.div {...reveal(0.24)} className="flex items-center gap-3 mb-7">
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map(i => <Star key={i} size={14} style={{ color: 'var(--lapiz)', fill: 'var(--lapiz)' }} />)}
            </div>
            <span className="text-sm" style={{ color: 'var(--text)' }}>5.0 from 19 Google reviews</span>
          </motion.div>

          <motion.div {...reveal(0.3)}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ color: 'var(--muted)' }}>
            {FACTS.map((f, i) => (
              <span key={f} className="flex items-center gap-5">
                {f}
                {i < FACTS.length - 1 && <span className="w-1 h-1 rounded-full" style={{ background: 'var(--hairline-2)' }} />}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Real work, framed */}
        <motion.div {...revealFrom('right', 0.12)} className="relative hidden lg:block">
          <div className="absolute -right-4 top-10 bottom-10 left-12 rounded-3xl"
            style={{ background: 'var(--lapiz-tint)', border: '1px solid var(--hairline)', transform: 'rotate(3deg)' }} />
          <div className="relative rounded-3xl overflow-hidden"
            style={{ background: '#fff', border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex items-center gap-1.5 px-4 py-2.5"
              style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--hairline)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
              <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
                style={{ background: '#fff', color: 'var(--muted)', border: '1px solid var(--hairline)' }}>
                jasminehealthandspa.com.au
              </div>
            </div>
            <div className="relative aspect-[16/11] overflow-hidden" style={{ background: 'var(--lapiz-tint)' }}>
              <img src="/screenshots/jasmine.png" alt="A website Blue Peek built for a Perth day spa"
                className="w-full h-full object-cover object-top" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
