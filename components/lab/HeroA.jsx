'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

/* A — THE WORK IS THE HERO
   Dark, but the page is filled with real client sites moving in columns.
   Copy sits left and stays modest. Fixes "empty screen with a big sentence". */

const COL_1 = ['/screenshots/jasmine.png', '/screenshots/barberzden.png', '/screenshots/rayantiling.png', '/screenshots/aeandac.png']
const COL_2 = ['/screenshots/superiorgarage.png', '/screenshots/54fadez.png', '/screenshots/airborne.png', '/screenshots/stsbgardening.png']
const COL_3 = ['/screenshots/bluestar.png', '/screenshots/universepainting.png', '/screenshots/adizahaircollections.png', '/screenshots/tyrewarriors.png']

function Column({ shots, duration, offset }) {
  const loop = [...shots, ...shots]
  return (
    <div className="relative overflow-hidden" style={{ height: '100%' }}>
      <motion.div
        className="flex flex-col gap-4"
        style={{ marginTop: offset }}
        animate={{ y: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}>
        {loop.map((src, i) => (
          <div key={i} className="rounded-xl overflow-hidden shrink-0"
            style={{ border: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 18px 40px rgba(0,0,0,0.5)' }}>
            <img src={src} alt="" className="w-full block" loading="lazy" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function HeroA() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: '#070d18' }}>
      {/* Moving wall of real work */}
      <div className="absolute inset-0 grid grid-cols-3 gap-4 px-4 opacity-[0.55]" aria-hidden="true">
        <Column shots={COL_1} duration={46} offset={0} />
        <Column shots={COL_2} duration={58} offset={-120} />
        <Column shots={COL_3} duration={52} offset={-60} />
      </div>

      {/* Legibility scrim — left-weighted so the work stays visible on the right */}
      <div className="absolute inset-0" aria-hidden="true"
        style={{ background: 'linear-gradient(100deg, #070d18 0%, rgba(7,13,24,0.96) 34%, rgba(7,13,24,0.72) 58%, rgba(7,13,24,0.55) 100%)' }} />

      <div className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-20">
        <div className="max-w-xl">
          <h1 className="tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'clamp(2.25rem,4.6vw,3.5rem)', lineHeight: 1.04, color: '#eef3fb', letterSpacing: '-0.03em' }}>
            Thirty-plus Australian businesses trust us with the first thing their customers see.
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-9" style={{ color: '#93a3bd' }}>
            Blue Peek builds fast, professional websites and lead-capture systems — live in one to two weeks, yours to keep.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
              style={{ background: '#eef3fb', color: '#070d18' }}>
              Get a website <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#work" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
              style={{ border: '1px solid rgba(255,255,255,0.22)', color: '#eef3fb' }}>
              See the work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
