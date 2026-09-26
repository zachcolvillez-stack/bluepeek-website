import Image from 'next/image'
import MarketingShowcase from './MarketingShowcase'
import GrowthSystem from './site/GrowthSystem'
const projects = [
  { name: 'Ceramic Coating Gold Coast', category: 'Ceramic coating & detailing', image: '/images/ceramic-coating-preview.webp', url: 'https://ceramic-coating-gold-coast-preview.vercel.app', description: 'A considered website for a Nerang coating studio, with the coating, correction and detailing work set out plainly.' },
  { name: 'Marlin Glass Fencing', category: 'Glass fencing & balustrades', image: '/screenshots/showcase/marlinsglass.jpg', url: 'https://marlinsglassfencing.com.au', description: 'A Hervey Bay pool fencing and balustrade specialist, with the service area mapped out and a measure-and-quote request in one tap.' },
  { name: 'Jasmine Health & Spa', category: 'Health & wellness', image: '/screenshots/jasmine.webp', url: 'https://jasminehealthandspa.com.au', description: 'A calm, considered website with a full treatment menu, gift vouchers and easy online booking.', caseStudy: '/work/jasmine-health-and-spa' },
]
const process = [
  ['A conversation', 'We get to know your business, your goals and what you need from your website.'],
  ['Design & build', 'You see the work as it takes shape, with time for feedback and refinements.'],
  ['Ready to launch', 'We handle the technical details and make sure everything works before going live.'],
  ['Here for what’s next', 'Ongoing support and useful automation as your business grows.'],
]
export default function HomeSections() {
  return (<>
    <section id="work" className="bp-section bp-work"><span id="industries" className="bp-anchor" />
      <div className="bp-wrap">
        <div className="bp-section-heading"><div><p className="bp-kicker">Selected work</p><h2>Good businesses.<br />Better first impressions.</h2></div><a href="/gallery" className="bp-text-link">View all work <span aria-hidden="true">↗</span></a></div>
        <div className="bp-projects">{projects.map((p, i) => <article className={`bp-project ${i === 2 ? 'bp-project-wide' : ''}`} key={p.name}>
          <a className="bp-project-image" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.name} (opens in a new tab)`}><Image src={p.image} alt={`${p.name} website designed by Bluepeek`} width={1200} height={750} sizes="(max-width: 760px) 92vw, (max-width: 1400px) 46vw, 600px" /></a>
          <div className="bp-project-info"><p className="bp-project-category">{p.category}</p><h3><a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}<span aria-hidden="true">↗</span></a></h3><p>{p.description}</p>{p.caseStudy && <a className="bp-text-link" href={p.caseStudy}>Explore the project <span aria-hidden="true">→</span></a>}</div>
        </article>)}</div>
      </div>
    </section>
    <MarketingShowcase />
    <section id="services" className="bp-section bp-soft"><div className="bp-wrap">
      <div className="bp-section-heading"><div><p className="bp-kicker">One growth system</p><h2>Get found. Get leads.<br />Get chosen.</h2></div><p className="bp-section-intro">Bluepeek helps Australian businesses grow through Google Ads, Meta Ads, high-converting websites, Google Reviews, SEO, social media and AI automation.</p></div>
      <GrowthSystem headingLevel="h2" />
      <div className="bp-additional"><p>Not sure which stage is costing you work? <strong>Start with a free audit.</strong></p><a href="/services" className="bp-text-link">See all services <span aria-hidden="true">→</span></a></div>
    </div></section>
    <section id="how-it-works" className="bp-section bp-process"><div className="bp-wrap">
      <div className="bp-section-heading"><div><p className="bp-kicker">The process</p><h2>A clear path from<br />first chat to launch.</h2></div><p className="bp-section-intro">You work directly with the people<br />who design and build your site.</p></div>
      <ol className="bp-process-grid">{process.map(([title, description], i) => <li key={title}><span className="bp-index">0{i + 1}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </div></section>
    <section id="our-story" className="bp-section bp-about bp-soft"><div className="bp-wrap bp-about-grid">
      <div className="bp-about-copy"><p className="bp-kicker">Meet Bluepeek</p><h2>Two people.<br />Personally invested.</h2><p>We’re Jac and Zach, the founders of Bluepeek. Based on the Gold Coast, we run Google Ads, build websites and set up review and follow-up systems for businesses across Australia.</p><p>No account managers or outsourcing. When you call, you speak to one of the two people who built your site.</p><a href="/about" className="bp-text-link">More about us <span aria-hidden="true">→</span></a></div>
      <div className="bp-founders">{[['Zach Colville', '/founders/zach.jpg'], ['Jac Thomas-Rees', '/founders/jac.jpg']].map(([name, photo]) => <figure key={name}><Image src={photo} alt={`${name}, founder and owner of Bluepeek`} width={900} height={1200} sizes="(max-width: 760px) 44vw, 24vw" /><figcaption><strong>{name}</strong><span>Founder & Owner</span></figcaption></figure>)}</div>
    </div></section>
  </>)
}
