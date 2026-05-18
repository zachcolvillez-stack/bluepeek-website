'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center">
      <div className="relative max-w-5xl mx-auto px-6 text-center pt-24 pb-20">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-sm font-medium mb-8">
          <Zap size={13} className="fill-current" />
          Perth&apos;s Web & AI Studio
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-6"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
        >
          <span className="text-white">Your Business,</span>
          <br />
          <span className="gradient-text">Built to Dominate.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
        >
          Bluepeek builds premium websites and intelligent AI tools for Perth&apos;s local businesses —
          so you attract more customers, look more professional, and stop losing work to competitors online.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => onCTA('contact')}
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-base transition-all btn-glow">
            Start Your Project
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={() => onCTA('services')}
            className="flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition-all">
            See What We Do
          </button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-8 mt-16 pt-12 border-t border-white/10">
          {[
            { value: '1–2 Weeks', label: 'Average delivery' },
            { value: '100%', label: 'Perth local' },
            { value: '24/7', label: 'AI that works for you' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>{stat.value}</p>
              <p className="text-xs text-slate-300 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
