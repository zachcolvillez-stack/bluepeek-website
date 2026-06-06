import { notFound } from 'next/navigation'
import { INDUSTRIES, CASE_STUDIES, SITE, u } from '../../../lib/site'
import { industryContent, relatedLinks } from '../../../lib/content'
import { serviceSchema, faqSchema, breadcrumbSchema } from '../../../lib/schema'
import LandingTemplate from '../../../components/site/LandingTemplate'
import JsonLd from '../../../components/seo/JsonLd'

export function generateStaticParams() {
  return INDUSTRIES.map(i => ({ slug: i.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const c = industryContent(slug)
  if (!c) return {}
  const path = u.industry(slug)
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

export default async function IndustryPage({ params }) {
  const { slug } = await params
  const c = industryContent(slug)
  if (!c) notFound()

  const meta = INDUSTRIES.find(i => i.slug === slug)
  const path = u.industry(slug)
  const breadcrumb = [
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/#work' },
    { name: meta?.nav || c.h1, href: path },
  ]

  // Internal links — include matching case study if one exists
  const related = relatedLinks({ excludeIndustry: slug })
  if (c.example) {
    const cs = CASE_STUDIES.find(x => x.slug === c.example)
    if (cs) related.unshift({ label: `Case study: ${cs.title}`, href: u.work(cs.slug) })
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
      <JsonLd data={serviceSchema({ name: meta?.title || c.h1, description: c.metaDescription, path, serviceType: 'Website design' })} />
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
    </>
  )
}
