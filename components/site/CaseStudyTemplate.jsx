import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, ExternalLink } from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import ChatWidget from '../ChatWidget'

/* Case study page template — light premium, factual (no invented metrics). */
export default function CaseStudyTemplate({ breadcrumb = [], study, content, related = [] }) {
  return (
    <>
      <SiteHeader />

      <main className="relative pt-28">
        <div className="hero-glow" style={{ top: '-6%', left: '-4%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(155,135,245,0.12) 0%, transparent 70%)' }} />

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

        {/* Header */}
        <section className="relative max-w-4xl mx-auto px-6 pb-10">
          <span className="eyebrow">Case Study · {study.industry}</span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-4" style={{ color: '#1a1730' }}>{study.title}</h1>
          <p className="text-base md:text-lg" style={{ color: '#565471' }}>{study.location}</p>
        </section>

        {/* Live screenshot */}
        <section className="relative max-w-4xl mx-auto px-6 mb-12">
          <a href={study.url} target="_blank" rel="noopener noreferrer" className="card group block overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#f4f3fb', borderBottom: '1px solid rgba(99,91,168,0.12)' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d8d2f0' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d8d2f0' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d8d2f0' }} />
              <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
                style={{ background: '#ffffff', color: '#8c8aa3', border: '1px solid rgba(99,91,168,0.12)' }}>
                {study.url.replace('https://', '').replace('www.', '')}
              </div>
              <ExternalLink size={12} style={{ color: '#8c8aa3' }} />
            </div>
            <div className="relative aspect-[16/9] overflow-hidden" style={{ background: '#f4f3fb' }}>
              <img src={study.image} alt={`${study.title} website homepage built by Bluepeek`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
            </div>
          </a>
          <div className="mt-4">
            <a href={study.url} target="_blank" rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm">
              Visit the live site <ExternalLink size={14} />
            </a>
          </div>
        </section>

        {/* Brief + built */}
        <div className="relative max-w-4xl mx-auto px-6 space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: '#1a1730' }}>The brief</h2>
            <p className="text-base leading-relaxed" style={{ color: '#565471' }}>{content.brief}</p>
          </section>
          <section>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4" style={{ color: '#1a1730' }}>What we built</h2>
            <p className="text-base leading-relaxed mb-5" style={{ color: '#565471' }}>{content.built}</p>
            <ul className="space-y-2.5">
              {content.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-base" style={{ color: '#565471' }}>
                  <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #7fb0f7 0%, #8f86f3 55%, #a78bf5 100%)' }}>
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="relative max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-sm font-bold uppercase tracking-wider mb-5" style={{ color: '#8ba0c6' }}>Explore more</h2>
            <div className="flex flex-wrap gap-2.5">
              {related.map(r => (
                <Link key={r.href} href={r.href}
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#c2d2ee' }}>
                  {r.label} <ChevronRight size={13} />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="relative max-w-4xl mx-auto px-6 py-16">
          <div className="rounded-3xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(140deg,#4f86f7 0%,#6f6ff5 55%,#9b6bf2 100%)', boxShadow: '0 24px 60px rgba(123,111,245,0.35)' }}>
            <h2 className="relative text-2xl md:text-3xl font-bold text-white mb-3">Want a site like this?</h2>
            <p className="relative text-base mb-7 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Tell us about your business and we’ll reply within 24 hours — free quote, no pressure.
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
