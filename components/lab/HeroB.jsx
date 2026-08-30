'use client'
import { ArrowUpRight } from 'lucide-react'

/* B — STUDIO INDEX
   Near-black, dense, left-aligned. Reads like a design studio's index page:
   numbered client rail, hard rules, tight sans. Fixes "floaty and generic". */

const CLIENTS = [
  ['01', 'Jasmine Health Spa', 'Day spa · Ascot WA'],
  ['02', 'Superior Garage', 'Automotive · Malaga WA'],
  ['03', 'Rodano Flowers', 'Florist · Perth WA'],
  ['04', 'Bo Butcher', 'Butcher · Perth WA'],
  ['05', 'Empire Cuts', 'Barbershop · Brisbane QLD'],
]

export default function HeroB() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-28 pb-10"
      style={{ background: '#0a0a0b', color: '#f2f2f0' }}>

      <div className="grid lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-20 items-start pt-8">
        <div>
          <div className="flex items-center gap-3 mb-10 text-[11px] font-mono uppercase tracking-[0.18em]" style={{ color: '#6f6f72' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#5cd48b' }} />
            Available for new projects
          </div>
          <h1 className="tracking-tight"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'clamp(2.5rem,6.2vw,5.25rem)', lineHeight: 0.98, letterSpacing: '-0.045em' }}>
            We build the<br />websites local<br />businesses are<br />judged by.
          </h1>
        </div>

        {/* Numbered client rail */}
        <div className="lg:pt-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] mb-5" style={{ color: '#6f6f72' }}>Selected work</div>
          <ul>
            {CLIENTS.map(([n, name, meta]) => (
              <li key={n} className="group flex items-baseline gap-4 py-3.5 cursor-pointer"
                style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
                <span className="text-[11px] font-mono shrink-0" style={{ color: '#6f6f72' }}>{n}</span>
                <span className="flex-1">
                  <span className="block text-[15px] font-medium transition-transform group-hover:translate-x-1">{name}</span>
                  <span className="block text-[13px] mt-0.5" style={{ color: '#8a8a8e' }}>{meta}</span>
                </span>
                <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: '#8a8a8e' }} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom rail */}
      <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <p className="max-w-md text-[15px] leading-relaxed pt-8" style={{ color: '#8a8a8e' }}>
          Perth-built websites and lead-capture systems for Australian businesses. Live in one to two weeks. No lock-in, and you own everything.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <a href="#contact" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
            style={{ background: '#f2f2f0', color: '#0a0a0b' }}>
            Start a project
          </a>
          <a href="#work" className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold"
            style={{ border: '1px solid rgba(255,255,255,0.22)', color: '#f2f2f0' }}>
            All work
          </a>
        </div>
      </div>
    </section>
  )
}
