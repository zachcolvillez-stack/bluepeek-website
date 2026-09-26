import { notFound } from 'next/navigation'
import { CASE_STUDIES, SITE, u } from '../../../lib/site'
import { linkFor } from '../../../lib/growth'
import { CASE_CONTENT } from '../../../lib/content'
import { breadcrumbSchema } from '../../../lib/schema'
import CaseStudyTemplate from '../../../components/site/CaseStudyTemplate'
import JsonLd from '../../../components/seo/JsonLd'

export function generateStaticParams() {
  return CASE_STUDIES.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const c = CASE_CONTENT[slug]
  const study = CASE_STUDIES.find(x => x.slug === slug)
  if (!c || !study) return {}
  const path = u.work(slug)
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: { absolute: c.metaTitle },
      description: c.metaDescription,
      url: `${SITE.url}${path}`,
      type: 'article',
      images: [{ url: study.image, alt: `${study.title} website by Bluepeek` }],
    },
    twitter: { card: 'summary_large_image', title: c.metaTitle, description: c.metaDescription },
  }
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const content = CASE_CONTENT[slug]
  const study = CASE_STUDIES.find(x => x.slug === slug)
  if (!content || !study) notFound()

  const path = u.work(slug)
  const breadcrumb = [
    { name: 'Home', href: '/' },
    { name: 'Work', href: '/work' },
    { name: study.title, href: path },
  ]

  // Services this project used, the industry hub it proves, then sibling studies
  const services = (study.services || []).map(linkFor).filter(Boolean)
  const hub = study.industryHub && linkFor(study.industryHub)
  const related = [
    ...(hub ? [{ label: hub.label, href: hub.href }] : []),
    ...CASE_STUDIES.filter(x => x.slug !== slug).slice(0, 2).map(x => ({ label: x.title, href: u.work(x.slug) })),
    { label: 'Google Ads management', href: '/google-ads-management' },
    { label: 'Google review system', href: '/google-reviews' },
  ]

  return (
    <>
      <CaseStudyTemplate breadcrumb={breadcrumb} study={study} content={content} related={related} services={services} />
      <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
    </>
  )
}
