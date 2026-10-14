'use client'
import { useRef } from 'react'
import { openEnquire } from '../../lib/enquire'
import { useProgress, Phone, Headline, Eyebrow } from './parts'
import s from './Ads.module.css'

/**
 * 2 · Custom ad campaigns, on the film's space black. One idea, shown as the
 * product on two phones: their search (a Google results page with the ad on
 * top) and your phone (the lead arriving, then the weekly optimisation). The
 * notifications arrive as the phones rise into view. Both screens are an
 * example ("Your Business"); the only figures stated are the published prices.
 */
const NOTES = [
  { app: 'Google Ads', when: 'now', title: 'New call from your ad', body: 'Searched “mechanic near me” · 4 min call' },
  { app: 'Bluepeek', when: '2m ago', title: 'New quote request', body: 'Logbook service · from your Facebook ad' },
  { app: 'Bluepeek', when: 'Mon', title: 'Your campaign was optimised', body: 'Weak keywords paused, best ads given more budget' },
]

function Search() {
  return (
    <div className={s.search}>
      <div className={s.sTop}>
        <span className={s.sTime}>9:41</span>
        <div className={s.sBar}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" /><path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
          <span>mechanic near me</span>
        </div>
        <div className={s.sTabs}><b>All</b><span>Maps</span><span>Images</span><span>News</span></div>
      </div>
      <div className={s.ad}>
        <p className={s.sponsored}>Sponsored</p>
        <div className={s.adSite}>
          <span className={s.fav}>YB</span>
          <span><b>Your Business</b><em>yourbusiness.com.au</em></span>
        </div>
        <p className={s.adHead}>Logbook Servicing Near You | Book Online Today</p>
        <p className={s.adBody}>Dealer-quality servicing without the dealer price. Same-week bookings available.</p>
        <div className={s.adLinks}>
          <span className={s.call}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z" fill="currentColor" /></svg>
            Call
          </span>
          <span>Book a service</span>
          <span>Directions</span>
        </div>
      </div>
      <div className={s.organic} aria-hidden="true">
        {[['Google Maps', 'maps.google.com', 'Mechanics near you · Open now'], ['Local directory', 'example.com.au', 'Best mechanics in your area, reviewed']].map(([site, url, title]) => (
          <div key={site} className={s.org}>
            <span className={s.orgSite}><i />{site} · {url}</span>
            <span className={s.orgTitle}>{title}</span>
            <span className={s.orgText}>Compare opening hours, reviews and prices for local workshops.</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Lock() {
  return (
    <div className={s.lock}>
      <div className={s.clock}>
        <span className={s.date}>Wednesday 14 October</span>
        <span className={s.time}>9:41</span>
      </div>
      <div className={s.notes}>
        {NOTES.map((n, i) => (
          <div key={n.title} className={s.note} style={{ '--t': (0.42 + i * 0.12).toFixed(2) }}>
            <span className={s.noteIcon} data-app={n.app === 'Google Ads' ? 'g' : 'b'} aria-hidden="true">{n.app === 'Google Ads' ? 'G' : ''}</span>
            <span className={s.noteText}>
              <span className={s.noteHead}><b>{n.title}</b><em>{n.when}</em></span>
              <span>{n.body}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Ads() {
  const stageRef = useRef(null)
  useProgress(stageRef, 'pin')
  return (
    <section id="ads" className={s.root} aria-labelledby="ads-h">
      <div ref={stageRef} className={s.pin}>
        <div className={s.pinStage}>
      <header className={s.top}>
        <Eyebrow>2 · Custom ad campaigns</Eyebrow>
        <Headline id="ads-h" className={s.title} lead="Ads that pay their way." dim="From their search to your phone." />
      </header>

      <div className={s.stage}>
        <figure className={s.device}>
          <Phone className={s.phone} label="Example: a Google search for 'mechanic near me' with Your Business's ad at the top and a Call button">
            <Search />
          </Phone>
          <figcaption>Their search</figcaption>
        </figure>
        <span className={s.arrow} aria-hidden="true" />
        <figure className={s.device}>
          <Phone className={s.phone} label="Example: your lock screen with a new call from your ad, a new quote request, and a weekly optimisation report">
            <Lock />
          </Phone>
          <figcaption>Your phone</figcaption>
        </figure>
      </div>
      <p className={s.example}>Example campaign for a local mechanic</p>
        </div>
      </div>

      <div className={s.bottom}>
        <p className={s.lit}>We write Google and Meta campaigns for <b>your services and your suburbs</b>, track <b>every call and form</b>, and tune them <b>every week</b>.</p>
        <dl className={s.stats}>
          <div>
            <dt>Your first month</dt>
            <dd className={s.num}>$199</dd>
            <dd className={s.what}>to build and launch</dd>
          </div>
          <div>
            <dt>Then</dt>
            <dd className={s.num}>$299<span className={s.per}>/mo</span></dd>
            <dd className={s.what}>management and tracking</dd>
          </div>
          <div>
            <dt>Optimised</dt>
            <dd className={s.num}>Weekly</dd>
            <dd className={s.what}>by the people who built it</dd>
          </div>
        </dl>
        <a href="#contact" className={s.pill} onClick={(e) => { e.preventDefault(); openEnquire('Google Ads leads') }}>Start a campaign <span aria-hidden="true">→</span></a>
      </div>
    </section>
  )
}
