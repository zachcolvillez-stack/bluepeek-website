import { notFound } from 'next/navigation'
import { SERVICES, INDUSTRIES, CASE_STUDIES, u } from '../../lib/site'
import { SERVICE_CONTENT, industryContent, relatedLinks } from '../../lib/content'
import { SERVICE_PAGES } from '../../lib/pages'
import { serviceSchema, faqSchema, breadcrumbSchema } from '../../lib/schema'
import LandingTemplate from '../../components/site/LandingTemplate'
import MoneyPageTemplate from '../../components/site/MoneyPageTemplate'
import { plainText } from '../../components/site/RichText'
import JsonLd from '../../components/seo/JsonLd'
import { metadataFor } from '../../lib/meta'

// Resolve a slug to a money page, a legacy service page or a website-industry page.
function resolve(slug) {
  if (SERVICE_PAGES[slug]) return { kind: 'money', page: SERVICE_PAGES[slug] }
  const svc = SERVICES.find(s => s.slug === slug)
  if (svc && SERVICE_CONTENT[slug]) {
    return { kind: 'service', meta: svc, content: SERVICE_CONTENT[slug], breadcrumbParent: { name: 'Services', href: '/services' } }
  }
  const ind = INDUSTRIES.find(i => i.slug === slug)
  const content = ind && industryContent(slug)
  if (content) {
    return { kind: 'industry', meta: ind, content, breadcrumbParent: { name: 'Industries', href: '/industries' } }
  }
  return null
}

export const dynamicParams = false

export function generateStaticParams() {
  const slugs = new Set([...Object.keys(SERVICE_PAGES), ...SERVICES.map(s => s.slug), ...INDUSTRIES.map(i => i.slug)])
  return [...slugs].filter(slug => resolve(slug)).map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const r = resolve(slug)
  if (!r) return {}
  return metadataFor(r.kind === 'money' ? r.page : r.content, `/${slug}`)
}

export default async function Page({ params }) {
  const { slug } = await params
  const r = resolve(slug)
  if (!r) notFound()
  const path = `/${slug}`

  if (r.kind === 'money') {
    const p = r.page
    const breadcrumb = [{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: p.nav, href: path }]
    return (
      <>
        <MoneyPageTemplate page={p} breadcrumb={breadcrumb} />
        <JsonLd data={serviceSchema({ name: p.nav, description: p.metaDescription, path, serviceType: p.serviceType, area: p.area })} />
        {p.faqs?.length > 0 && <JsonLd data={faqSchema(p.faqs.map(f => ({ q: f.q, a: plainText(f.a) })))} />}
        <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
      </>
    )
  }

  const c = r.content
  const breadcrumb = [{ name: 'Home', href: '/' }, r.breadcrumbParent, { name: r.meta.nav || c.h1, href: path }]
  let related
  if (r.kind === 'service') {
    related = relatedLinks({ excludeService: slug })
  } else {
    related = relatedLinks({ excludeIndustry: slug })
    const cs = c.example && CASE_STUDIES.find(x => x.slug === c.example)
    if (cs) related.unshift({ label: `Case study: ${cs.title}`, href: u.work(cs.slug) })
  }

  return (
    <>
      <LandingTemplate breadcrumb={breadcrumb} eyebrow={c.eyebrow} h1={c.h1} lead={c.lead} sections={c.sections} faqs={c.faqs} related={related} />
      <JsonLd data={serviceSchema({
        name: r.meta.title || c.h1,
        description: c.metaDescription,
        path,
        serviceType: r.kind === 'industry' ? 'Website design' : (r.meta.title || c.eyebrow),
        area: /gold-coast/.test(slug) ? 'gold-coast' : 'australia',
      })} />
      <JsonLd data={faqSchema(c.faqs)} />
      <JsonLd data={breadcrumbSchema(breadcrumb.map(b => ({ name: b.name, path: b.href })))} />
    </>
  )
}
