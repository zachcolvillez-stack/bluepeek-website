import { notFound } from 'next/navigation'
import { INDUSTRY_PAGES } from '../../../lib/pages'
import { industryPath } from '../../../lib/growth'
import { serviceSchema, faqSchema, breadcrumbSchema } from '../../../lib/schema'
import { metadataFor } from '../../../lib/meta'
import MoneyPageTemplate from '../../../components/site/MoneyPageTemplate'
import { plainText } from '../../../components/site/RichText'
import JsonLd from '../../../components/seo/JsonLd'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(INDUSTRY_PAGES).map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = INDUSTRY_PAGES[slug]
  return page ? metadataFor(page, industryPath(slug)) : {}
}

export default async function IndustryHubPage({ params }) {
  const { slug } = await params
  const page = INDUSTRY_PAGES[slug]
  if (!page) notFound()
  const path = industryPath(slug)
  const breadcrumb = [{ name: 'Home', href: '/' }, { name: 'Industries', href: '/industries' }, { name: page.nav, href: path }]
  return (
    <>
      <MoneyPageTemplate page={page} breadcrumb={breadcrumb} />
      <JsonLd data={serviceSchema({ name: page.nav, description: page.metaDescription, path, serviceType: page.serviceType, area: page.area })} />
      {page.faqs?.length > 0 && <JsonLd data={faqSchema(page.faqs.map(f => ({ q: f.q, a: plainText(f.a) })))} />}
      <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
    </>
  )
}
