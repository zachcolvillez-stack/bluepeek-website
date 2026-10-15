import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '../../lib/site'
import { GUIDE_POSTS, CLIENT_POSTS } from '../../lib/blog'
import { HUBS, HUB_ORDER } from '../../lib/hubs'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import EnquireWidget from '../../components/EnquireWidget'

export const metadata = {
  title: 'Guides and Client Stories: Local SEO, Websites, Ads & AI',
  description: 'Practical guides for Australian business owners, and local SEO stories from the businesses we build for in the Gold Coast, Perth, Melbourne, Sydney and beyond.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Bluepeek guides for business owners',
    description: 'Practical guides on Google Ads, Meta Ads, Google reviews, websites and AI follow-up.',
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
              Guides for business owners.
            </h1>
            <p className="text-base md:text-lg max-w-xl" style={{ color: 'var(--text)' }}>
              Practical, factual reading on Google Ads, Meta Ads, Google reviews, websites and AI automation. No fluff.
            </p>
          </div>

          <div className="space-y-6">
            {GUIDE_POSTS.map((p) => (
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

          {CLIENT_POSTS.length > 0 && (
            <section id="client-stories" className="mt-24" aria-labelledby="client-stories-h">
              <h2 id="client-stories-h" className="text-2xl md:text-4xl font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>
                Client stories, suburb by suburb.
              </h2>
              <p className="text-base md:text-lg max-w-2xl mb-12" style={{ color: 'var(--text)' }}>
                How local search works for each business we build for: the searches that matter in their suburb, who Google shows today, and what their site does about it.
              </p>
              {HUB_ORDER.map((hub) => {
                const posts = CLIENT_POSTS.filter((p) => p.hub === hub)
                if (!posts.length) return null
                return (
                  <div key={hub} className="mb-12">
                    <h3 className="text-lg font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>
                      <Link href={HUBS[hub].path}>{HUBS[hub].label}</Link> <span style={{ color: 'var(--muted)', fontWeight: 400 }}>· {posts.length} {posts.length === 1 ? 'story' : 'stories'}</span>
                    </h3>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {posts.map((p) => (
                        <li key={p.slug}>
                          <Link href={`/blog/${p.slug}`} className="card block p-5 h-full" style={{ borderRadius: '8px' }}>
                            <strong className="block mb-1" style={{ color: 'var(--ink)' }}>{p.client.name}</strong>
                            <span className="text-sm" style={{ color: 'var(--muted)' }}>{p.client.trade} · {p.client.suburb ? `${p.client.suburb}, ` : ''}{p.client.state || 'Australia-wide'}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
      <EnquireWidget />
    </>
  )
}
