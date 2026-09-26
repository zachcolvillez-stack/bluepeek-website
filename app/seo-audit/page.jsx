import { ArrowRight } from 'lucide-react'
import Nav from '../../components/Nav'
import HomeFooter from '../../components/HomeFooter'
import EnquireWidget from '../../components/EnquireWidget'
import SeoAudit from '../../components/SeoAudit'
import JsonLd from '../../components/seo/JsonLd'
import { SITE } from '../../lib/site'
import { breadcrumbSchema, faqSchema } from '../../lib/schema'

const TITLE = 'Free SEO Audit: Check Your Website in 10 Seconds'
const DESCRIPTION =
  'Enter your domain and get an instant, free SEO score for your website. We check titles, headings, schema, mobile, speed, sitemap and more. No email required.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/seo-audit' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE.url}/seo-audit`,
    type: 'website',
  },
}

const FAQS = [
  {
    q: 'Is the SEO audit really free?',
    a: 'Yes. Enter your domain and the full score and breakdown appear straight away. There is no email gate, no signup and no obligation.',
  },
  {
    q: 'What does the audit actually check?',
    a: 'It loads your homepage the way a search engine does and grades twelve on-page fundamentals: HTTPS, page title, search description, main heading, content depth, business schema, mobile viewport, link previews, canonical URL, load time, robots.txt and sitemap.',
  },
  {
    q: 'Does a good score mean I will rank first on Google?',
    a: 'No. This grades the on-page technical SEO a crawler reads on your homepage. Rankings also depend on your content, your backlinks, your Google Business Profile and your competitors.',
  },
  {
    q: 'What happens after the audit?',
    a: 'Nothing, unless you want it to. If you would like the issues fixed, you can ask us for a free quote and we will call you within one business day. No lock-in contracts.',
  },
]

const breadcrumb = [
  { name: 'Home', path: '/' },
  { name: 'Free SEO Audit', path: '/seo-audit' },
]

export default function SeoAuditPage() {
  return (
    <div className="bp-home">
      <a className="bp-skip" href="#main-content">Skip to content</a>
      <JsonLd data={breadcrumbSchema(breadcrumb)} />
      <JsonLd data={faqSchema(FAQS)} />

      {/* The nav sits absolutely inside a masthead on the homepage; here it
          needs a plain relative band above the content. */}
      <div className="bp-audit-masthead"><Nav home={false} /></div>

      <main id="main-content">
        <section className="bp-section bp-audit-hero">
          <div className="bp-wrap">
            <p className="bp-kicker">Free tool</p>
            <h1 className="bp-audit-h1">Audit your site&rsquo;s SEO now.</h1>
            <p className="bp-audit-lede">
              Enter your domain. We read your homepage exactly the way Google does and score the twelve things
              that decide whether local customers ever find you. No email, no signup: the result is on the screen
              in about ten seconds.
            </p>
            <SeoAudit />
          </div>
        </section>

        <section className="bp-section bp-soft">
          <div className="bp-wrap bp-audit-faq">
            <div>
              <p className="bp-kicker">Common questions</p>
              <h2>Straight answers.</h2>
              <p className="bp-section-intro">
                Still wondering something? Ask us and we&rsquo;ll tell you honestly whether your site needs work.
              </p>
              <a className="bp-text-link" href="#contact">Get a free quote <span aria-hidden="true">&rarr;</span></a>
            </div>
            <dl>
              {FAQS.map(f => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <HomeFooter />
      <EnquireWidget />
    </div>
  )
}
