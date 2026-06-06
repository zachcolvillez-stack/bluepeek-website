import { notFound } from 'next/navigation'
import { SERVICES, INDUSTRIES, CASE_STUDIES, SITE, u } from '../../lib/site'
import { SERVICE_CONTENT, industryContent, relatedLinks } from '../../lib/content'
import { serviceSchema, faqSchema, breadcrumbSchema } from '../../lib/schema'
import LandingTemplate from '../../components/site/LandingTemplate'
import JsonLd from '../../components/seo/JsonLd'

// Resolve a slug to either a service or industry page payload
function resolve(slug) {
  const svc = SERVICES.find(s => s.slug === slug)
  if (svc && SERVICE_CONTENT[slug]) {
    return {
      kind: 'service',
      meta: svc,
      content: SERVICE_CONTENT[slug],
      breadcrumbParent: { name: 'Services', href: '/#services' },
    }
  }
  const ind = INDUSTRIES.find(i => i.slug === slug)
  if (ind) {
    const content = industryContent(slug)
    if (content) {
      return {
        kind: 'industry',
        meta: ind,
        content,
        breadcrumbParent: { name: 'Industries', href: '/#work' },
      }
    }
  }
  return null
}

export function generateStaticParams() {
  return [...SERVICES, ...INDUSTRIES].map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const r = resolve(slug)
  if (!r) return {}
  const c = r.content
  const path = `/${slug}`
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${SITE.url}${path}`,
      type: 'website',
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: c.h1 }],
    },
    twitter: { card: 'summary_large_image', title: c.metaTitle, description: c.metaDescription },
  }
}

export default async function Page({ params }) {
  const { slug } = await params
  const r = resolve(slug)
  if (!r) notFound()

  const c = r.content
  const path = `/${slug}`
  const breadcrumb = [
    { name: 'Home', href: '/' },
    r.breadcrumbParent,
    { name: r.meta.nav || c.h1, href: path },
  ]

  // Internal links
  let related
  if (r.kind === 'service') {
    related = relatedLinks({ excludeService: slug })
  } else {
    related = relatedLinks({ excludeIndustry: slug })
    if (c.example) {
      const cs = CASE_STUDIES.find(x => x.slug === c.example)
      if (cs) related.unshift({ label: `Case study: ${cs.title}`, href: u.work(cs.slug) })
    }
  }

  return (
    <>
      <LandingTemplate
        breadcrumb={breadcrumb}
        eyebrow={c.eyebrow}
        h1={c.h1}
        lead={c.lead}
        sections={c.sections}
        faqs={c.faqs}
        related={related}
      />
      <JsonLd data={serviceSchema({
        name: r.meta.title || c.h1,
        description: c.metaDescription,
        path,
        serviceType: r.kind === 'industry' ? 'Website design' : (r.meta.title || c.eyebrow),
      })} />
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
    </>
  )
}
