import LaptopVisual from './LaptopVisual'
import HeroQuickPicks from './HeroQuickPicks'
export default function Hero() {
  return (
    <section id="hero" className="bp-hero" aria-labelledby="hero-heading">
      <div className="bp-wrap bp-hero-layout"><div className="bp-hero-copy">
        <h1 id="hero-heading" className="bp-hero-lede"><span>Get found.</span><span>Get leads.</span><span>Get chosen.</span></h1>
        <p className="bp-hero-description">Google Ads, Meta Ads, website design, Google Reviews, SEO and AI follow-up for Australian businesses. Based on the Gold Coast.</p>
        <HeroQuickPicks />
        <div className="bp-actions"><a href="#work" className="bp-text-link">See our work <span aria-hidden="true">→</span></a></div>
      </div></div>
      <LaptopVisual />
    </section>
  )
}
