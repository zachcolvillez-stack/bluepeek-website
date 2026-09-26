import Link from 'next/link'
import { ArrowRight, ChevronRight, Phone } from 'lucide-react'
import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'
import EnquireWidget from '../EnquireWidget'
import RichText from './RichText'
import ContentBlocks from './ContentBlocks'
import LeadForm from './LeadForm'
import GrowthSystem from './GrowthSystem'
import { linkFor, stageOf } from '../../lib/growth'
import { getPostBySlug } from '../../lib/blog'
import { CASE_STUDIES, u } from '../../lib/site'

/**
 * Template for the core money pages (service + industry hubs). Server-rendered
 * so every word, link and answer is in the HTML crawlers and answer engines read.
 * Content shape is documented in lib/pages/README (see lib/pages/index.js).
 */
export default function MoneyPageTemplate({ page, breadcrumb }) {
  const stage = page.stage || stageOf(page.slug)?.id
  const related = (page.related || []).map(linkFor).filter(Boolean)
  const guides = (page.guides || []).map(getPostBySlug).filter(Boolean)
  const studies = (page.caseStudies || []).map(s => CASE_STUDIES.find(c => c.slug === s)).filter(Boolean)
  const cta = page.cta || { label: 'Get a Free Growth Audit', form: 'general' }

  return (
    <>
      <SiteHeader />
      <main className="bp-mp" id="main-content">
        <div className="bp-mp-wrap">
          <nav aria-label="Breadcrumb" className="bp-mp-crumbs">
            <ol>
              {breadcrumb.map((b, i) => (
                <li key={b.href}>
                  {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
                  {i < breadcrumb.length - 1 ? <Link href={b.href}>{b.name}</Link> : <span aria-current="page">{b.name}</span>}
                </li>
              ))}
            </ol>
          </nav>

          <header className="bp-mp-hero">
            <h1>{page.h1}</h1>
            <p className="bp-mp-lead"><RichText text={page.lead} /></p>
            <div className="bp-mp-actions">
              <a href="#audit" className="bp-mp-btn">{cta.label} <ArrowRight size={16} aria-hidden="true" /></a>
              <a href="tel:0402923253" className="bp-mp-call"><Phone size={15} aria-hidden="true" /> Call Jac on 0402 923 253</a>
            </div>
          </header>

          {page.answer && (
            <section className="bp-mp-answer" aria-labelledby="quick-answer">
              <h2 id="quick-answer">{page.answer.q}</h2>
              <p><RichText text={page.answer.a} /></p>
            </section>
          )}

          {stage && <GrowthSystem current={stage} compact />}
        </div>

        <div className="bp-mp-wrap bp-mp-body">
          {page.sections.map((s, i) => (
            <section key={i} id={s.id} className="bp-mp-section">
              <h2>{s.h2}</h2>
              <ContentBlocks block={s} />
              {s.subsections?.map((sub, j) => (
                <div key={j} className="bp-mp-sub">
                  <h3>{sub.h3}</h3>
                  <ContentBlocks block={sub} />
                </div>
              ))}
            </section>
          ))}
        </div>

        {studies.length > 0 && (
          <div className="bp-mp-wrap">
            <section className="bp-mp-section">
              <h2>{page.caseStudiesTitle || 'Related client work'}</h2>
              <ul className="bp-mp-cards">
                {studies.map(c => (
                  <li key={c.slug}>
                    <Link href={u.work(c.slug)}><strong>{c.title}</strong><span>{c.industry} · {c.location}</span></Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        <div className="bp-mp-wrap">
          <section id="audit" className="bp-mp-audit" aria-labelledby="audit-heading">
            <div>
              <h2 id="audit-heading">{cta.label}</h2>
              <p>{cta.note || 'Tell us a little about your business. One of the founders will look at what you have now and call you with honest, specific advice.'}</p>
            </div>
            <LeadForm variant={cta.form} submitLabel={cta.submit || 'Request my audit'} />
          </section>

          {page.faqs?.length > 0 && (
            <section className="bp-mp-section bp-mp-faq">
              <h2>{page.faqTitle || 'Frequently asked questions'}</h2>
              {page.faqs.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}<ChevronRight size={18} aria-hidden="true" /></summary>
                  <p><RichText text={f.a} /></p>
                </details>
              ))}
            </section>
          )}

          {related.length > 0 && (
            <section className="bp-mp-section">
              <h2>{page.relatedTitle || 'Services that work alongside this'}</h2>
              <ul className="bp-mp-cards">
                {related.map(r => (
                  <li key={r.href}><Link href={r.href}><strong>{r.label}</strong>{r.blurb && <span>{r.blurb}</span>}</Link></li>
                ))}
              </ul>
            </section>
          )}

          {guides.length > 0 && (
            <section className="bp-mp-section">
              <h2>Guides for business owners</h2>
              <ul className="bp-mp-guides">
                {guides.map(g => <li key={g.slug}><Link href={`/blog/${g.slug}`}>{g.title}</Link></li>)}
              </ul>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
      <EnquireWidget />
    </>
  )
}
