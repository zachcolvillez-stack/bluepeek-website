import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { SITE } from '../../../lib/site'
import { BLOG_POSTS, getPostBySlug } from '../../../lib/blog'
import { articleSchema, faqSchema, breadcrumbSchema } from '../../../lib/schema'
import SiteHeader from '../../../components/site/SiteHeader'
import SiteFooter from '../../../components/site/SiteFooter'
import EnquireWidget from '../../../components/EnquireWidget'
import JsonLd from '../../../components/seo/JsonLd'
import ContentBlocks from '../../../components/site/ContentBlocks'
import RichText, { plainText } from '../../../components/site/RichText'
import { linkFor } from '../../../lib/growth'

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  const path = `/blog/${slug}`
  return {
    title: { absolute: `${post.metaTitle || post.title} | Bluepeek` },
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
  const service = post.primaryService && linkFor(post.primaryService)
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
            <RichText text={post.intro} />
          </p>

          <div className="space-y-10 bp-article">
            {post.sections.map((s, i) => (
              <section key={i}>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4" style={{ color: 'var(--ink)' }}>{s.h2}</h2>
                <ContentBlocks block={s} />
                {s.subsections?.map((sub, j) => (
                  <div key={j} className="mt-6">
                    <h3 className="text-lg font-bold tracking-tight mb-3" style={{ color: 'var(--ink)' }}>{sub.h3}</h3>
                    <ContentBlocks block={sub} />
                  </div>
                ))}
              </section>
            ))}
          </div>

          {service && (
            <aside className="bp-mp-answer mt-12" aria-label="Related Bluepeek service">
              <h2>Want this done for you?</h2>
              <p>{service.blurb} <Link className="bp-inline-link" href={service.href}>See our {service.label} service</Link>.</p>
            </aside>
          )}

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
                    <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text)' }}><RichText text={f.a} /></p>
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
            <a href={service ? `${service.href}#audit` : '/#contact'} className="relative btn-white inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm">
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
      <EnquireWidget />

      <JsonLd data={articleSchema({ title: post.title, description: post.description, path, datePublished: post.date, dateModified: post.updated })} />
      {post.faqs?.length > 0 && <JsonLd data={faqSchema(post.faqs.map(f => ({ q: f.q, a: plainText(f.a) })))} />}
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
    </>
  )
}
