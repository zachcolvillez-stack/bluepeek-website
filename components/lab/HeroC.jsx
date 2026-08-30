'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

/* C — BRIGHT & CONFIDENT
   Warm off-white, near-black type, one hero screenshot carrying real weight.
   Included in case the objection was "dark", not "layout". */

export default function HeroC() {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-10 pt-28 pb-16 overflow-hidden"
      style={{ background: '#f6f5f2' }}>
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
        <div>
          <h1 className="tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 1.02, color: '#111214', letterSpacing: '-0.035em' }}>
            Your website is the first thing they judge you on.
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-9 max-w-lg" style={{ color: '#55585f' }}>
            Blue Peek builds fast, professional websites and lead-capture systems for Australian businesses. Live in one to two weeks, and yours to keep.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a href="#contact" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
              style={{ background: '#111214', color: '#ffffff' }}>
              Get a website <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#work" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
              style={{ border: '1px solid rgba(17,18,20,0.18)', color: '#111214' }}>
              See the work
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[0,1,2,3,4].map(i => <Star key={i} size={14} style={{ color: '#111214', fill: '#111214' }} />)}
            </div>
            <span className="text-sm" style={{ color: '#55585f' }}>5.0 from 19 Google reviews</span>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
          className="relative hidden lg:block">
          <div className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(17,18,20,0.10)', boxShadow: '0 40px 90px rgba(17,18,20,0.22)' }}>
            <img src="/screenshots/jasmine.png" alt="A website Blue Peek built for a Perth day spa" className="w-full block" />
          </div>
          <div className="absolute -left-8 bottom-12 rounded-xl px-4 py-3"
            style={{ background: '#ffffff', border: '1px solid rgba(17,18,20,0.08)', boxShadow: '0 20px 50px rgba(17,18,20,0.16)' }}>
            <p className="text-xs font-semibold" style={{ color: '#111214' }}>jasminehealthandspa.com.au</p>
            <p className="text-xs mt-0.5" style={{ color: '#7a7d85' }}>Live · built in 9 days</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
