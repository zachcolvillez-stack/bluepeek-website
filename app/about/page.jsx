import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '../../lib/site'
import { aboutPageSchema, breadcrumbSchema } from '../../lib/schema'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import ChatWidget from '../../components/ChatWidget'
import JsonLd from '../../components/seo/JsonLd'

export const metadata = {
  title: 'About Bluepeek - Perth Web Design & AI Automation Studio',
  description: 'Bluepeek is a Gold Coast web design and AI automation studio serving businesses across Australia. Custom websites, 24/7 AI chatbots, lead capture and local SEO.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Bluepeek - Perth Web Design & AI Automation Studio',
    description: 'Bluepeek is a Perth WA web design and AI automation studio serving businesses across Australia.',
    url: `${SITE.url}/about`,
    type: 'website',
  },
}

const breadcrumb = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative pt-28 pb-24 px-6">
        <div className="hero-glow" style={{ top: '-6%', right: '-4%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(47,95,208,0.10) 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6" style={{ color: 'var(--ink)' }}>
            About Bluepeek
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: 'var(--text)' }}>
            Bluepeek is a web design and AI automation studio based on the Gold Coast, Queensland, serving small businesses across Australia.
          </p>

          <div className="space-y-9">
            <section>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>Who we are</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text)' }}>
                Bluepeek is a Gold Coast-based web design and AI automation studio. We are a small, hands-on team - Jac Thomas-Rees and Zach Colville - working directly with local business owners right across Australia, rather than handing clients off between account managers.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                We started in Perth building websites for tradies, mechanics, barbers and salons, and now work with small businesses right across Australia.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>What we do</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text)' }}>
                Bluepeek designs and builds custom websites, 24/7 AI chatbots, lead capture systems, and local SEO for small businesses. Our work includes:
              </p>
              <ul className="space-y-2.5">
                {[
                  'Custom website design and development',
                  '24/7 AI chatbots that answer enquiries and capture leads any time of day',
                  'Automated lead capture and follow-up systems',
                  'Online booking and appointment systems',
                  'Local SEO - so businesses are found on Google in their area',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-3 text-base" style={{ color: 'var(--text)' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5" style={{ background: '#16335c' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>How we work</h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text)' }}>
                Bluepeek builds premium-quality websites without big-agency prices. Most projects go live within one to two weeks. There are no lock-in contracts, and clients own their website, domain and content outright - they can take it elsewhere at any time.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                Bluepeek holds a 5.0-star rating on Google.
              </p>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>Who we work with</h2>
              <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                Bluepeek works primarily with local trades and small businesses - mechanics, barbers, painters, tradies, cafes, beauty salons and similar service businesses - that need a professional website and a reliable way to capture and follow up on enquiries.
              </p>
            </section>
          </div>

          <div className="mt-14 site-callout p-10 text-center relative overflow-hidden">
            <h2 className="relative text-2xl md:text-3xl font-bold mb-3">Want to talk about your business?</h2>
            <p className="relative text-base mb-7 max-w-lg mx-auto" style={{ color: 'var(--text)' }}>
              Get in touch for a free, no-obligation quote - we&apos;ll reply within 24 hours.
            </p>
            <Link href="/#contact" className="relative btn-white inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm">
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />

      <JsonLd data={aboutPageSchema({ path: '/about' })} />
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
    </>
  )
}
