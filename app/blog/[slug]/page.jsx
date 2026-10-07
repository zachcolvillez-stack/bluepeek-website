import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { SITE } from '../../../lib/site'
import { BLOG_POSTS, getPostBySlug } from '../../../lib/blog'
import { articleSchema, faqSchema, breadcrumbSchema } from '../../../lib/schema'
import SiteHeader from '../../../components/site/SiteHeader'
import SiteFooter from '../../../components/site/SiteFooter'
import ChatWidget from '../../../components/ChatWidget'
import JsonLd from '../../../components/seo/JsonLd'

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const path = `/blog/${slug}`
  return {
    title: `${post.title} | Bluepeek Blog`,
    description: post.description,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE.url}${path}`,
      type: 'article',
      publishedTime: post.date,
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description },
  }
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const path = `/blog/${slug}`
  const breadcrumb = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ]

  return (
    <>
      <SiteHeader />
      <main className="relative pt-28 pb-24 px-6">
        <div className="hero-glow" style={{ top: '-6%', right: '-4%', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(47,95,208,0.10) 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-xs mb-6" style={{ color: 'var(--muted)' }}>
            {breadcrumb.map((b, i) => (
              <span key={b.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight size={12} style={{ color: 'var(--muted)' }} />}
                {i < breadcrumb.length - 1
                  ? <Link href={b.path} className="transition-colors" style={{ color: 'var(--muted)' }}>{b.name}</Link>
                  : <span style={{ color: 'var(--text)' }}>{b.name}</span>}
              </span>
            ))}
          </nav>

          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted)' }}>
            {new Date(post.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })} · {post.readTime}
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6" style={{ color: 'var(--ink)' }}>
            {post.title}
          </h1>

          <p className="text-base md:text-lg leading-relaxed mb-10" style={{ color: 'var(--text)' }}>
            {post.intro}
          </p>

          <div className="space-y-10">
            {post.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>{s.h2}</h2>

                {s.table && (
                  <div className="overflow-x-auto mb-5 card p-0" style={{ borderRadius: '8px' }}>
                    <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: 'var(--bg-2)' }}>
                          {s.table.headers.map((h) => (
                            <th key={h} className="text-left font-semibold px-4 py-3" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--hairline)' }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((row, ri) => (
                          <tr key={ri} style={{ borderTop: ri > 0 ? '1px solid rgba(12,28,52,0.08)' : undefined }}>
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-4 py-3" style={{ color: 'var(--text)' }}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="text-base leading-relaxed mb-4" style={{ color: 'var(--text)' }}>{p}</p>
                ))}

                {s.bullets?.length > 0 && (
                  <ul className="space-y-2.5 mt-2">
                    {s.bullets.map((b, k) => (
                      <li key={k} className="flex items-start gap-3 text-base" style={{ color: 'var(--text)' }}>
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2.5" style={{ background: '#16335c' }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {post.faqs?.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6" style={{ color: 'var(--ink)' }}>Frequently asked questions</h2>
              <div className="space-y-3">
                {post.faqs.map((f, i) => (
                  <details key={i} className="card p-5 group" style={{ borderRadius: '8px' }}>
                    <summary className="flex items-center justify-between cursor-pointer list-none font-semibold" style={{ color: 'var(--ink)' }}>
                      {f.q}
                      <ChevronRight size={18} className="transition-transform group-open:rotate-90 flex-shrink-0 ml-3" style={{ color: 'var(--muted)' }} />
                    </summary>
                    <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text)' }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 site-callout p-10 text-center relative overflow-hidden">
            <h2 className="relative text-2xl md:text-3xl font-bold mb-3">Ready to get more leads?</h2>
            <p className="relative text-base mb-7 max-w-lg mx-auto" style={{ color: 'var(--text)' }}>
              Tell us about your business and we&apos;ll reply within 24 hours - free quote, no pressure.
            </p>
            <a href="/#contact" className="relative btn-white inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm">
              Get a Free Quote <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-12">
            <Link href="/blog" className="text-sm font-semibold inline-flex items-center gap-1.5" style={{ color: '#16335c' }}>
              ← Back to all guides
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />

      <JsonLd data={articleSchema({ title: post.title, description: post.description, path, datePublished: post.date, dateModified: post.updated })} />
      {post.faqs?.length > 0 && <JsonLd data={faqSchema(post.faqs)} />}
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
    </>
  )
}
