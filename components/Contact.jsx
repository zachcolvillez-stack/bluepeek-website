import { SITE } from '../lib/site'
import EnquireInline from './EnquireInline'

export default function Contact() {
  return (
    <section id="contact" className="bp-section bp-contact bp-soft">
      <span id="quote-form" className="bp-anchor" />
      <div className="bp-wrap bp-contact-grid">
        <div className="bp-contact-copy">
          <p className="bp-kicker">Let’s talk</p>
          <h2>Your next chapter<br />starts here.</h2>
          <p>Tell us what you need and we’ll get back to you within one business day with clear, honest advice and a free quote.</p>
          <a className="bp-contact-email" href={`mailto:${SITE.email}`}>{SITE.email}<span aria-hidden="true">↗</span></a>
          <div className="bp-contact-phones">
            <a href="tel:0402923253">Jac · 0402 923 253</a>
            <a href="tel:0468955806">Zach · 0468 955 806</a>
          </div>
          <a href="/free-quote" className="bp-text-link">Rather send us the details? <span aria-hidden="true">→</span></a>
        </div>
        <EnquireInline />
      </div>
    </section>
  )
}
