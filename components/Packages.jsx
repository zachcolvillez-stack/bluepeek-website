const packages = [
  {name: 'Starter', tagline: 'Get online and look the part.', features: ['Custom 3-page website', 'Mobile-first & fast loading', 'Contact & enquiry form', 'Google-ready basics', 'You own everything']},
  {name: 'Growth', tagline: 'A website that captures and follows up your leads.', features: ['Everything in Starter', 'Up to 5 custom pages', '24/7 AI chatbot assistant', 'Automated lead capture & follow-up', 'Online booking system', 'Local SEO setup']},
  {name: 'Scale', tagline: 'A complete system built to grow with your business.', features: ['Everything in Growth', '8+ pages & landing pages', 'Advanced AI automation', 'Lead pipeline & CRM setup', 'Priority support', 'Ongoing growth & improvements']},
]
export default function Packages() {
  return (<section id="packages" className="bp-section"><div className="bp-wrap">
    <div className="bp-section-heading"><div><p className="bp-kicker">Packages</p><h2>The right fit.<br />From the start.</h2></div><p className="bp-section-intro">Every package is custom-quoted to your goals.<br />No lock-in, no hidden fees. You own everything.</p></div>
    <div className="bp-packages">{packages.map(p => <article key={p.name}><p className="bp-package-note">{p.name === 'Growth' ? 'Most popular' : 'Custom quoted'}</p><h3>{p.name}</h3><p className="bp-package-tagline">{p.tagline}</p><ul>{p.features.map(f => <li key={f}><span aria-hidden="true">✓</span>{f}</li>)}</ul><a href="#contact" className="bp-text-link">Get a free quote<span aria-hidden="true">↗</span></a></article>)}</div>
    <p className="bp-package-custom">Need something different? <a href="#contact">Ask for a custom quote →</a></p>
  </div></section>)
}
