import { notFound } from 'next/navigation'
import { SERVICES, SITE, u } from '../../../lib/site'
import { SERVICE_CONTENT, relatedLinks } from '../../../lib/content'
import { serviceSchema, faqSchema, breadcrumbSchema } from '../../../lib/schema'
import LandingTemplate from '../../../components/site/LandingTemplate'
import JsonLd from '../../../components/seo/JsonLd'

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const c = SERVICE_CONTENT[slug]
  if (!c) return {}
  const path = u.service(slug)
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

export default async function ServicePage({ params }) {
  const { slug } = await params
  const c = SERVICE_CONTENT[slug]
  if (!c) notFound()

  const path = u.service(slug)
  const breadcrumb = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/#services' },
    { name: c.eyebrow, href: path },
  ]

  return (
    <>
      <LandingTemplate
        breadcrumb={breadcrumb}
        eyebrow={c.eyebrow}
        h1={c.h1}
        lead={c.lead}
        sections={c.sections}
        faqs={c.faqs}
        related={relatedLinks({ excludeService: slug })}
      />
      <JsonLd data={serviceSchema({ name: c.eyebrow, description: c.metaDescription, path })} />
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
    </>
  )
}
