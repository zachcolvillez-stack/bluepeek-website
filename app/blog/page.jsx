import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '../../lib/site'
import { BLOG_POSTS } from '../../lib/blog'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import ChatWidget from '../../components/ChatWidget'

export const metadata = {
  title: 'Blog - Perth Web Design & AI Automation Insights | Bluepeek',
  description: 'Practical guides on web design pricing, choosing a Perth web design agency, and AI automation for small business - written by Bluepeek.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog - Perth Web Design & AI Automation Insights | Bluepeek',
    description: 'Practical guides on web design pricing, choosing a Perth web design agency, and AI automation for small business.',
    url: `${SITE.url}/blog`,
    type: 'website',
  },
}

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative pt-28 pb-24 px-6">
        <div className="hero-glow" style={{ top: '-6%', left: '-4%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(47,95,208,0.10) 0%, transparent 70%)' }} />

        <div className="relative max-w-4xl mx-auto">
          <div className="mb-14">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: 'var(--ink)' }}>
              Guides for Perth business owners.
            </h1>
            <p className="text-base md:text-lg max-w-xl" style={{ color: 'var(--text)' }}>
              Practical, factual reading on web design, pricing and AI automation - no fluff.
            </p>
          </div>

          <div className="space-y-6">
            {BLOG_POSTS.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}
                className="card block p-7 md:p-8 group"
                style={{ borderRadius: '8px' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted)' }}>
                  {new Date(p.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })} · {p.readTime}
                </p>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3" style={{ color: 'var(--ink)' }}>{p.title}</h2>
                <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text)' }}>{p.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#16335c' }}>
                  Read the guide
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  )
}
