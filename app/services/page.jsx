import Link from 'next/link'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import EnquireWidget from '../../components/EnquireWidget'
import GrowthSystem from '../../components/site/GrowthSystem'
import JsonLd from '../../components/seo/JsonLd'
import { breadcrumbSchema } from '../../lib/schema'
import { PAGES, INDUSTRY_HUBS, industryPath } from '../../lib/growth'
import { SITE } from '../../lib/site'

export const metadata = {
  title: 'Digital Marketing Services for Local Businesses',
  description: 'Google Ads, Meta Ads, websites, Google Reviews, Google Business Profile, SEO, social media and AI follow-up, working as one growth system for Australian businesses.',
  alternates: { canonical: '/services' },
  openGraph: { url: `${SITE.url}/services`, title: 'Bluepeek services: one growth system', type: 'website' },
}

const MORE = ['google-ads-management', 'geo-optimisation', 'website-design', 'small-business-websites-gold-coast', 'ai-automation-australia', 'missed-call-recovery', 'ai-chatbots', 'ai-phone-agents']

export default function ServicesPage() {
  const breadcrumb = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]
  return (
    <>
      <SiteHeader />
      <main className="bp-mp" id="main-content">
        <div className="bp-mp-wrap">
          <header className="bp-mp-hero">
            <h1>Get found. Get leads. Get chosen.</h1>
            <p className="bp-mp-lead">Bluepeek helps Australian businesses grow through Google Ads, Meta Ads, high-converting websites, Google Reviews, SEO, social media and AI automation. Each service is one stage of the same system, so the traffic you pay for turns into enquiries, booked jobs and reviews that win the next customer.</p>
          </header>
          <GrowthSystem title="The Bluepeek growth system" intro="Most businesses need two or three of these, not all five. We start where the biggest leak is." />

          <section className="bp-mp-section">
            <h2>More specialist services</h2>
            <ul className="bp-mp-cards">
              {MORE.map(slug => <li key={slug}><Link href={PAGES[slug].path}><strong>{PAGES[slug].label}</strong><span>{PAGES[slug].blurb}</span></Link></li>)}
            </ul>
          </section>

          <section className="bp-mp-section">
            <h2>Built for your industry</h2>
            <p>See how the system fits the way customers choose a business in your trade.</p>
            <ul className="bp-mp-cards">
              {INDUSTRY_HUBS.map(h => <li key={h.slug}><Link href={industryPath(h.slug)}><strong>Marketing for {h.label.toLowerCase()}</strong></Link></li>)}
            </ul>
          </section>

          <section className="bp-mp-section">
            <h2>Not sure where to start?</h2>
            <p>Run the <Link className="bp-inline-link" href="/seo-audit">free SEO audit</Link> on your website, or call Jac on <a className="bp-inline-link" href="tel:0402923253">0402 923 253</a>. We will tell you honestly which stage is costing you the most work.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
      <EnquireWidget />
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
    </>
  )
}
