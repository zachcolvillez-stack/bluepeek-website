import LaptopVisual from './LaptopVisual'
export default function Hero() {
  return (
    <section id="hero" className="bp-hero" aria-labelledby="hero-heading">
      <div className="bp-wrap bp-hero-layout"><div className="bp-hero-copy">
        <p className="bp-kicker bp-hero-kicker">Modern websites<br />Real business growth</p>
        <h1 id="hero-heading"><span>A better website.</span><span>A bigger first</span><span>impression.</span></h1>
        <p className="bp-hero-description">Custom websites, AI automation and local SEO for Australian businesses.</p>
        <div className="bp-actions"><a href="#contact" className="bp-button">Get a free quote</a><a href="#work" className="bp-text-link">See our work <span aria-hidden="true">→</span></a></div>
      </div></div>
      <LaptopVisual />
    </section>
  )
}
