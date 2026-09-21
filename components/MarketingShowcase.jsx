import Image from 'next/image'
import { ArrowUpRight, Search, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Wrench, House } from 'lucide-react'

function Platform({ name, icon }) {
  return <span className="bp-platform"><img src={`/brand/platforms/${icon}.svg`} alt="" width="24" height="24" /><span>{name}</span></span>
}

function PostActions() {
  return <div className="bp-post-actions" aria-hidden="true"><Heart /><MessageCircle /><Send /><Bookmark /></div>
}

export default function MarketingShowcase() {
  return <>
    <section id="advertising" className="bp-campaigns" aria-labelledby="bp-ads-heading">
      <div className="bp-wrap">
        <div className="bp-marketing-heading">
          <div><p className="bp-kicker">Beyond the website / Paid advertising</p><h2 id="bp-ads-heading">Good creative.<br /><em>Real attention.</em></h2></div>
          <div className="bp-marketing-intro"><p>Be there when they search.<br />Stand out when they scroll.</p><div className="bp-platforms"><Platform icon="googleads" name="Google Ads" /><Platform icon="meta" name="Meta" /></div></div>
        </div>
        <div className="bp-ad-grid">
          <article className="bp-search-concept">
            <div className="bp-search-stage">
              <div className="bp-search-top"><img src="/brand/platforms/google.svg" width="35" height="35" alt="Google" /><span>Search ad concept</span></div>
              <div className="bp-search-query"><Search size={18} aria-hidden="true" /><span>bathroom renovations near me</span></div>
              <div className="bp-search-result">
                <span className="bp-sponsored">Sponsored · Sample preview</span>
                <div className="bp-search-brand"><span className="bp-trade-mark" aria-hidden="true"><House size={20} /></span><div><strong>Your local renovation team</strong><span>Home services · Sample brand</span></div><MoreHorizontal size={18} aria-hidden="true" /></div>
                <p className="bp-search-title">A better bathroom starts with a conversation.</p>
                <p>From the first idea to the final tile. Explore bathroom renovations, see the work and request a quote from a local team.</p>
                <div className="bp-search-sitelinks"><span>Renovations</span><span>Recent projects</span><span>Request a quote</span></div>
              </div>
              <div className="bp-search-statement"><span>Right place.<br />Right moment.</span><ArrowUpRight aria-hidden="true" /></div>
            </div>
            <div className="bp-ad-caption"><div><h3>Turn searches into first conversations.</h3><p>Home services · Google Search concept</p></div><span className="bp-concept-label">Sample concept</span></div>
          </article>
          <article className="bp-meta-concept">
            <div className="bp-meta-stage">
              <div className="bp-social-profile"><span className="bp-auto-mark" aria-hidden="true"><Wrench size={18} /></span><div><strong>Local Auto</strong><span>Sample brand · Ad concept</span></div><img src="/brand/platforms/instagram.svg" alt="Instagram" width="22" height="22" /></div>
              <div className="bp-auto-ad">
                <div className="bp-auto-copy"><span>Local Auto</span><p>Ready for<br /><em>the road.</em></p></div>
                <Image src="/images/concept-mechanic.webp" alt="Mechanic inspecting a car engine in a bright, tidy local workshop" width={1200} height={900} sizes="(max-width: 760px) 90vw, 42vw" />
                <span className="bp-auto-footer">Servicing. Brakes. Diagnostics.</span>
              </div>
              <div className="bp-ad-preview-cta" aria-hidden="true"><span>Book your next service</span><ArrowUpRight size={20} /></div>
            </div>
            <div className="bp-ad-caption"><div><h3>A good reason to stop scrolling.</h3><p>Automotive · Meta campaign concept</p></div><span className="bp-concept-label">Sample concept</span></div>
          </article>
        </div>
        <div className="bp-marketing-bottom"><p>Concept previews to show what’s possible for your business.</p><a href="#contact" className="bp-text-link">Let’s plan your campaign <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
    <section id="social-media" className="bp-social-showcase" aria-labelledby="bp-social-heading">
      <div className="bp-wrap">
        <div className="bp-marketing-heading">
          <div><p className="bp-kicker">Social media / Content & creative</p><h2 id="bp-social-heading">Good work.<br /><em>Worth sharing.</em></h2></div>
          <div className="bp-marketing-intro"><p>Fresh imagery. A recognisable voice.<br />Content that feels like your brand.</p><div className="bp-platforms"><Platform icon="instagram" name="Instagram" /><Platform icon="facebook" name="Facebook" /></div></div>
        </div>
        <div className="bp-social-gallery">
          <figure className="bp-social-piece bp-trade-piece">
            <div className="bp-social-art bp-trade-art">
              <Image src="/images/concept-home-services.webp" alt="Sample bathroom renovation with warm stone tiles and an oak vanity" width={900} height={1125} sizes="(max-width: 760px) 90vw, 30vw" />
              <div className="bp-trade-copy"><span>Home services / Content concept</span><p>Built on<br /><em>good work.</em></p></div>
              <span className="bp-trade-stamp">In the<br />details.</span>
            </div>
            <figcaption><strong>Show the quality of your work.</strong><span>Trades & home services · Feed concept</span></figcaption>
          </figure>
          <figure className="bp-social-piece bp-studio-piece">
            <div className="bp-studio-art">
              <div className="bp-studio-brand"><Image src="/brand/logo-256.png" alt="" width={30} height={30} /><span>Bluepeek</span><img src="/brand/platforms/instagram.svg" alt="" width="20" height="20" /></div>
              <p className="bp-studio-headline">Small<br />business.<br /><em>Big first<br />impression.</em></p>
              <div className="bp-studio-preview"><Image src="/screenshots/rayantiling.webp" alt="Rayan Tiling Services website featured in a Bluepeek social post concept" width={1280} height={800} sizes="(max-width: 760px) 80vw, 28vw" /></div>
              <div className="bp-studio-footer"><span>Websites with presence.</span><ArrowUpRight aria-hidden="true" /></div>
            </div>
            <figcaption><strong>Your work. Front and centre.</strong><span>Rayan Tiling · Website showcase concept</span></figcaption>
          </figure>
          <figure className="bp-social-piece bp-team-piece">
            <div className="bp-team-post">
              <div className="bp-social-profile"><Image src="/brand/logo-256.png" alt="" width={32} height={32} /><div><strong>Bluepeek</strong><span>Behind the business · Post concept</span></div><MoreHorizontal size={20} aria-hidden="true" /></div>
              <div className="bp-team-portraits">
                <Image src="/founders/jac.jpg" alt="Jac Thomas-Rees, Bluepeek co-founder" width={900} height={1200} sizes="(max-width: 760px) 45vw, 15vw" />
                <Image src="/founders/zach.jpg" alt="Zach Colville, Bluepeek co-founder" width={900} height={1200} sizes="(max-width: 760px) 45vw, 15vw" />
              </div>
              <div className="bp-team-intro">Real people.<br />Your next project.</div>
              <PostActions />
              <p className="bp-post-caption"><strong>Bluepeek</strong> Meet Jac &amp; Zach. Websites, content and campaigns for local businesses, with a team you can talk to.</p>
            </div>
            <figcaption><strong>Put people behind the brand.</strong><span>Bluepeek · Team introduction concept</span></figcaption>
          </figure>
        </div>
        <div className="bp-social-bottom"><p>Sample creative concepts, including AI-generated campaign photography.</p><a href="#contact" className="bp-button">Let’s create your content <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  </>
}
