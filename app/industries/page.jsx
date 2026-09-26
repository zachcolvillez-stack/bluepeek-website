import Link from 'next/link'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import EnquireWidget from '../../components/EnquireWidget'
import JsonLd from '../../components/seo/JsonLd'
import { breadcrumbSchema } from '../../lib/schema'
import { INDUSTRY_PAGES } from '../../lib/pages'
import { industryPath } from '../../lib/growth'
import { INDUSTRIES, SITE, u } from '../../lib/site'

export const metadata = {
  title: 'Marketing for Trades and Local Service Businesses',
  description: 'How Bluepeek combines Google Ads, websites, Google Business Profile, Google Reviews and AI follow-up for mechanics, detailers, tradies, tilers and landscapers.',
  alternates: { canonical: '/industries' },
  openGraph: { url: `${SITE.url}/industries`, title: 'Industries Bluepeek works with', type: 'website' },
}

export default function IndustriesPage() {
  const breadcrumb = [{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }]
  return (
    <>
      <SiteHeader />
      <main className="bp-mp" id="main-content">
        <div className="bp-mp-wrap">
          <header className="bp-mp-hero">
            <h1>Marketing systems for trades and local services</h1>
            <p className="bp-mp-lead">A mechanic, a ceramic coating studio and a landscaper win customers in different ways. These guides show how we set up search ads, landing pages, Google Business Profile, reviews and follow-up for each one.</p>
          </header>

          <section className="bp-mp-section">
            <h2>Growth systems by industry</h2>
            <ul className="bp-mp-cards">
              {Object.values(INDUSTRY_PAGES).map(p => (
                <li key={p.slug}><Link href={industryPath(p.slug)}><strong>{p.nav}</strong><span>{p.metaDescription}</span></Link></li>
              ))}
            </ul>
          </section>

          <section className="bp-mp-section">
            <h2>Websites by industry</h2>
            <p>Just need the website? These pages cover what a site for each trade needs to include.</p>
            <ul className="bp-mp-cards">
              {INDUSTRIES.map(i => <li key={i.slug}><Link href={u.industry(i.slug)}><strong>{i.title}</strong></Link></li>)}
            </ul>
          </section>
        </div>
      </main>
      <SiteFooter />
      <EnquireWidget />
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
    </>
  )
}
