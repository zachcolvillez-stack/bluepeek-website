'use client'
import Link from 'next/link'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import ChatWidget from '../ChatWidget'

/**
 * Reusable premium landing template for service & industry pages.
 * Pure presentational server component - keeps the light pastel brand system.
 *
 * Props:
 *   breadcrumb : [{ name, href }]
 *   eyebrow    : string
 *   h1         : string
 *   lead       : string (sub-headline)
 *   sections   : [{ h2, paragraphs:[], bullets:[] }]
 *   faqs       : [{ q, a }]
 *   related    : [{ label, href }]   internal links
 */
export default function LandingTemplate({ breadcrumb = [], eyebrow, h1, lead, sections = [], faqs = [], related = [] }) {
  return (
    <>
      <SiteHeader />

      <main className="relative pt-28">
        {/* Hero glow */}
        <div className="hero-glow" style={{ top: '-6%', right: '-4%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(125,179,250,0.14) 0%, transparent 70%)' }} />

        {/* Breadcrumb */}
        <div className="relative max-w-4xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs mb-6" style={{ color: '#8c8aa3' }}>
            {breadcrumb.map((b, i) => (
              <span key={b.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} style={{ color: '#8c8aa3' }} />}
                {i < breadcrumb.length - 1
                  ? <Link href={b.href} className="transition-colors" style={{ color: '#8c8aa3' }} onMouseEnter={(e) => e.currentTarget.style.color = '#7c5fe0'} onMouseLeave={(e) => e.currentTarget.style.color = '#8c8aa3'}>{b.name}</Link>
                  : <span style={{ color: '#565471' }}>{b.name}</span>}
              </span>
            ))}
          </nav>
        </div>

        {/* Hero */}
        <section className="relative max-w-4xl mx-auto px-6 pb-12">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mt-5 mb-5" style={{ color: '#1a1730' }}>{h1}</h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: '#565471' }}>{lead}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/#contact" className="group btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm">
              Get a Free Quote <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="/#work" className="btn-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm">
              See Our Work
            </a>
          </div>
        </section>

        {/* Content sections */}
        <div className="relative max-w-4xl mx-auto px-6 py-10 space-y-12">
          {sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: '#1a1730' }}>{s.h2}</h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="text-base leading-relaxed mb-4" style={{ color: '#565471' }}>{p}</p>
              ))}
              {s.bullets?.length > 0 && (
                <ul className="space-y-2.5 mt-5">
                  {s.bullets.map((b, k) => (
                    <li key={k} className="flex items-start gap-3 text-base" style={{ color: '#565471' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'linear-gradient(135deg, #16335c 0%, #0c1c34 100%)' }}>
                        <Check size={11} className="text-white" strokeWidth={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="relative max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8" style={{ color: '#1a1730' }}>Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <details key={i} className="card p-5 group" style={{ borderRadius: '16px' }}>
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold" style={{ color: '#1a1730' }}>
                    {f.q}
                    <ChevronRight size={18} className="transition-transform group-open:rotate-90 flex-shrink-0 ml-3" style={{ color: '#8c8aa3' }} />
                  </summary>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: '#565471' }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Related internal links */}
        {related.length > 0 && (
          <section className="relative max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: '#7e8aa0' }}>Explore more</h2>
            <div className="flex flex-wrap gap-2.5">
              {related.map(r => (
                <Link key={r.href} href={r.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                  style={{ background: '#ffffff', border: '1px solid rgba(12,28,52,0.12)', color: '#475569' }}>
                  {r.label} <ChevronRight size={13} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="relative max-w-4xl mx-auto px-6 py-16">
          <div className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(140deg, #16335c 0%, #0c1c34 100%)', boxShadow: '0 24px 60px rgba(12,28,52,0.30)' }}>
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 70%)' }} />
            <h2 className="relative text-2xl md:text-3xl font-bold text-white mb-3">Ready to get more leads?</h2>
            <p className="relative text-base mb-7 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Tell us about your business and we’ll reply within 24 hours - free quote, no pressure.
            </p>
            <a href="/#contact" className="relative btn-white inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm">
              Get a Free Quote <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ChatWidget />
    </>
  )
}
