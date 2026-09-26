import Link from 'next/link'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import EnquireWidget from '../../components/EnquireWidget'
import JsonLd from '../../components/seo/JsonLd'
import { breadcrumbSchema } from '../../lib/schema'
import { CASE_STUDIES, SITE, u } from '../../lib/site'
import { linkFor } from '../../lib/growth'

export const metadata = {
  title: 'Case Studies: Websites and Growth Systems We Built',
  description: 'Real Bluepeek client projects for Australian mechanics, salons, spas and trades. What each business needed, what we built and the live site. No invented results.',
  alternates: { canonical: '/work' },
  openGraph: { url: `${SITE.url}/work`, title: 'Bluepeek case studies', type: 'website' },
}

export default function WorkPage() {
  const breadcrumb = [{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]
  return (
    <>
      <SiteHeader />
      <main className="bp-mp" id="main-content">
        <div className="bp-mp-wrap">
          <header className="bp-mp-hero">
            <h1>Case studies</h1>
            <p className="bp-mp-lead">Real projects for real Australian businesses. Each one explains what the business needed, what we built and which services it used, with a link to the live site. We only publish measured results where we have the data to back them up.</p>
          </header>
          <section className="bp-mp-section">
            <h2>Client projects</h2>
            <ul className="bp-mp-cards">
              {CASE_STUDIES.map(c => (
                <li key={c.slug}>
                  <Link href={u.work(c.slug)}>
                    <strong>{c.title}</strong>
                    <span>{c.industry} · {c.location}</span>
                    <span>{(c.services || []).map(s => linkFor(s)?.label).filter(Boolean).join(' · ')}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="bp-mp-section">
            <h2>More of our work</h2>
            <p>Browse every live client website in the <Link className="bp-inline-link" href="/gallery">website gallery</Link>, or see how we approach <Link className="bp-inline-link" href="/industries">marketing for your industry</Link>.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
      <EnquireWidget />
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
    </>
  )
}
