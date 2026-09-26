import Link from 'next/link'
import SiteHeader from '../components/site/SiteHeader'
import SiteFooter from '../components/site/SiteFooter'

export const metadata = { title: 'Page not found', robots: { index: false, follow: true } }

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bp-mp" id="main-content">
        <div className="bp-mp-wrap">
          <header className="bp-mp-hero">
            <h1>That page does not exist</h1>
            <p className="bp-mp-lead">The link may be old or mistyped. These will get you back on track:</p>
          </header>
          <ul className="bp-mp-cards">
            <li><Link href="/"><strong>Home</strong></Link></li>
            <li><Link href="/services"><strong>Services</strong><span>Google Ads, websites, Google Reviews, SEO and AI follow-up</span></Link></li>
            <li><Link href="/industries"><strong>Industries</strong></Link></li>
            <li><Link href="/work"><strong>Case studies</strong></Link></li>
            <li><Link href="/blog"><strong>Guides</strong></Link></li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
