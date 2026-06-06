import { notFound } from 'next/navigation'
import { CASE_STUDIES, SERVICES, SITE, u } from '../../../lib/site'
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
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: c.metaTitle,
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
    { name: 'Work', href: '/#work' },
    { name: study.title, href: path },
  ]

  // Internal links to other case studies + a couple of services
  const related = [
    ...CASE_STUDIES.filter(x => x.slug !== slug).slice(0, 2).map(x => ({ label: x.title, href: u.work(x.slug) })),
    ...SERVICES.slice(0, 2).map(s => ({ label: s.title, href: u.service(s.slug) })),
  ]

  return (
    <>
      <CaseStudyTemplate breadcrumb={breadcrumb} study={study} content={content} related={related} />
      <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
    </>
  )
}
