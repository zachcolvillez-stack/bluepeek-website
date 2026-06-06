'use client'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Check, Zap, MessageSquare, TrendingUp } from 'lucide-react'

const TRUST = ['Built in Perth', '1–2 Week Turnaround', 'No Lock-In', 'You Own Everything']

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Soft hero glows */}
      <div className="hero-glow" style={{ top: '-10%', right: '-5%', width: '560px', height: '560px', background: 'radial-gradient(circle, rgba(47,99,217,0.12) 0%, transparent 70%)' }} />
      <div className="hero-glow" style={{ bottom: '-15%', left: '-8%', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(11,35,80,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
        {/* ── Left: copy ── */}
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="eyebrow"><MapPin size={12} /> Perth · Servicing all of WA</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.08] mt-6 mb-6"
            style={{ color: '#0f1e38' }}>
            Premium websites & AI systems built to bring Perth businesses <span className="gradient-text">more leads.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
            className="text-base md:text-lg leading-relaxed mb-8 max-w-xl" style={{ color: '#46566f' }}>
            We design high-converting websites, lead-capture systems and smart automations for local businesses that want to look professional, get found, and grow.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.24 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
            <button onClick={() => onCTA('contact')}
              className="group btn-primary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm w-full sm:w-auto justify-center">
              Get a Free Quote
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button onClick={() => onCTA('work')}
              className="btn-secondary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm w-full sm:w-auto justify-center">
              See Our Work
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-6 gap-y-3">
            {TRUST.map(t => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: '#dbe8fc' }}>
                  <Check size={11} style={{ color: '#0b2350' }} strokeWidth={3} />
                </span>
                <span className="text-sm font-medium" style={{ color: '#46566f' }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: premium mockup ── */}
        <motion.div initial={{ opacity: 0, scale: 0.96, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block">

          {/* Main browser mockup */}
          <div className="card float-soft overflow-hidden" style={{ borderRadius: '20px' }}>
            <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: '#f6f9fc', borderBottom: '1px solid #e4eaf3' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4deec' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4deec' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4deec' }} />
              <div className="flex-1 mx-3 px-3 py-1 text-[10px] rounded-md text-center font-mono"
                style={{ background: '#ffffff', color: '#7a8aa3', border: '1px solid #e4eaf3' }}>
                yourbusiness.com.au
              </div>
            </div>
            <div className="p-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f6f9fc 100%)' }}>
              {/* fake hero */}
              <div className="h-3 w-24 rounded-full mb-3" style={{ background: '#dbe8fc' }} />
              <div className="h-5 w-3/4 rounded-md mb-2" style={{ background: '#0b2350' }} />
              <div className="h-5 w-1/2 rounded-md mb-4" style={{ background: '#1d4488' }} />
              <div className="h-2 w-full rounded-full mb-1.5" style={{ background: '#e4eaf3' }} />
              <div className="h-2 w-5/6 rounded-full mb-5" style={{ background: '#e4eaf3' }} />
              <div className="flex gap-2 mb-6">
                <div className="h-8 w-28 rounded-lg" style={{ background: 'linear-gradient(180deg, #12356f, #0b2350)' }} />
                <div className="h-8 w-24 rounded-lg" style={{ background: '#ffffff', border: '1px solid #d4deec' }} />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0,1,2].map(i => (
                  <div key={i} className="rounded-lg p-2.5" style={{ background: '#ffffff', border: '1px solid #e4eaf3' }}>
                    <div className="h-5 w-5 rounded-md mb-2" style={{ background: '#dbe8fc' }} />
                    <div className="h-1.5 w-full rounded-full mb-1" style={{ background: '#e4eaf3' }} />
                    <div className="h-1.5 w-2/3 rounded-full" style={{ background: '#eef4fc' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating: new lead notification */}
          <div className="absolute -left-8 top-20 glass float-soft-delay rounded-2xl p-3.5 w-52" style={{ borderRadius: '16px' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2f63d9, #1d4488)' }}>
                <MessageSquare size={16} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: '#22c55e' }} />
                  <p className="text-xs font-bold" style={{ color: '#0b2350' }}>New lead captured</p>
                </div>
                <p className="text-[11px] mt-0.5" style={{ color: '#7a8aa3' }}>Quote request · 2s ago</p>
              </div>
            </div>
          </div>

          {/* Floating: automation flow */}
          <div className="absolute -right-6 bottom-12 glass rounded-2xl p-3.5 w-48 float-soft" style={{ borderRadius: '16px' }}>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} style={{ color: '#2f63d9' }} />
              <p className="text-xs font-bold" style={{ color: '#0b2350' }}>Auto-reply sent</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Check size={11} style={{ color: '#22c55e' }} strokeWidth={3} />
                <div className="h-1.5 flex-1 rounded-full" style={{ background: '#e4eaf3' }} />
              </div>
              <div className="flex items-center gap-1.5">
                <Check size={11} style={{ color: '#22c55e' }} strokeWidth={3} />
                <div className="h-1.5 w-3/4 rounded-full" style={{ background: '#e4eaf3' }} />
              </div>
            </div>
          </div>

          {/* Floating: leads stat */}
          <div className="absolute -right-4 top-2 glass rounded-2xl px-4 py-3 float-soft-delay" style={{ borderRadius: '16px' }}>
            <div className="flex items-center gap-2">
              <TrendingUp size={15} style={{ color: '#22c55e' }} />
              <div>
                <p className="text-base font-bold leading-none" style={{ color: '#0b2350' }}>More calls</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#7a8aa3' }}>from day one</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
