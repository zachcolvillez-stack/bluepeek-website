import LaptopVisual from './LaptopVisual'
import HeroQuickPicks from './HeroQuickPicks'
export default function Hero() {
  return (
    <section id="hero" className="bp-hero" aria-labelledby="hero-heading">
      <div className="bp-wrap bp-hero-layout"><div className="bp-hero-copy">
        <h1 id="hero-heading" className="bp-hero-title">More local customers, without the agency runaround.</h1>
        <p className="bp-hero-description">Websites, Google Reviews, ads and AI automations for Australian businesses. Gold Coast based, working Australia-wide.</p>
        <HeroQuickPicks />
        <div className="bp-actions"><a href="#work" className="bp-text-link">See our work <span aria-hidden="true">→</span></a></div>
      </div></div>
      <LaptopVisual />
    </section>
  )
}
