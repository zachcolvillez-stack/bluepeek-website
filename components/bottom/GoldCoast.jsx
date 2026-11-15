import { Eyebrow } from './parts'
import { GOLD_COAST_FAQS } from '../../lib/faqs'
import s from './GoldCoast.module.css'

/**
 * The homepage's local section: what Google needs to see to rank this page
 * for "web design Gold Coast" (the query it already shows for in the map
 * pack). Plain prose, real Gold Coast clients grouped by suburb, each linked
 * to its story, and local questions. Static on purpose: everything here must
 * be readable in the server HTML.
 */
const SUBURBS = [
  { name: 'Nerang', href: '/website-design-nerang', clients: [
    ['A Grade Tyre & Auto', 'a-grade-tyre-auto-nerang-local-seo'],
    ['Attention Detailing', 'attention-detailing-nerang-local-seo'],
    ['Ceramic Coating Gold Coast', 'ceramic-coating-gold-coast-nerang-local-seo'],
    ['FB Mechanical & Machining', 'fastbraking-nerang-brakes-mechanic-local-seo'],
    ['Fair Dinkum Drainage', 'fair-dinkum-drainage-nerang-local-seo'],
  ] },
  { name: 'Southport', href: '/website-design-southport', clients: [
    ['A S Panel Repair', 'as-panel-repair-southport-local-seo'],
    ['GM Auto Mechanics', 'gm-auto-mechanics-southport-local-seo'],
    ['SPR Performance', 'spr-performance-southport-subaru-local-seo'],
  ] },
  { name: 'Molendinar', clients: [
    ['Coastal 2PAC', 'coastal-2pac-molendinar-local-seo'],
    ['Krakin Automotive', 'krakin-automotive-molendinar-local-seo'],
  ] },
  { name: 'Burleigh Heads', clients: [
    ['Signmakers Gold Coast', 'signmakers-gold-coast-burleigh-heads-local-seo'],
  ] },
]

export default function GoldCoast() {
  return (
    <section id="gold-coast" className={s.root} aria-labelledby="gc-h">
      <div className={s.wrap}>
        <header className={s.head}>
          <Eyebrow>Web design Gold Coast</Eyebrow>
          <h2 id="gc-h" className={s.title}>
            Web design on the Gold Coast,<span className={s.dim}> from a studio in Molendinar.</span>
          </h2>
        </header>

        <div className={s.prose}>
          <p>Bluepeek is a Gold Coast web design studio run by its two founders. Every website starts from a blank page for one business, is written around the searches your customers actually type, and is built to load fast on the phone they are holding.</p>
          <p>Most Gold Coast web design projects go live in one to two weeks. There is no build fee: the first month is free, then plans start at $149 a month with no lock-in, and you own the domain, the content and the site.</p>
          <p>A website only pays when people find it, so local SEO comes with every build: a page for each service, suburb-level copy, Google Business Profile setup, review requests, and call and form tracking that shows what each page brings in.</p>
        </div>

        <div className={s.local}>
          <h3 className={s.sub}>Gold Coast businesses we have built for</h3>
          <div className={s.suburbs}>
            {SUBURBS.map(sb => (
              <div key={sb.name} className={s.suburb}>
                <p className={s.suburbName}>
                  {sb.href ? <a href={sb.href}>Web design {sb.name}</a> : sb.name}
                </p>
                <ul>
                  {sb.clients.map(([name, slug]) => (
                    <li key={slug}><a href={`/blog/${slug}`}>{name}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={s.more}>
            Pricing, process and ranking results are on the <a href="/website-design-gold-coast">Gold Coast website design guide</a>, and trade-specific builds sit under <a href="/industries/mechanics">mechanics</a>, <a href="/industries/car-detailers">car detailers</a>, <a href="/industries/tradies">tradies</a> and <a href="/industries/tilers">tilers</a>.
          </p>
        </div>

        <div className={s.faq}>
          <h3 className={s.sub}>Gold Coast web design questions</h3>
          {GOLD_COAST_FAQS.map(f => (
            <details key={f.q} className={s.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
