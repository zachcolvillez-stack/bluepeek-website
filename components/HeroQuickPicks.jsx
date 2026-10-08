'use client'
import { ArrowRight } from 'lucide-react'
import { HERO_OFFERS, openEnquire } from '../lib/enquire'

/**
 * The four things we lead with, each with its published offer, over the hero
 * photo. One tap opens the enquiry panel with that service already picked.
 * Platform offers use the real colour logos; website and AI use the computer
 * and robot emoji, since neither has a platform logo.
 */
export default function HeroQuickPicks() {
  const source = { source: 'hero offers' }
  return (
    <div className="bp-qual">
      <p id="bp-qual-q" className="bp-qual-q">What do you need?</p>
      <div className="bp-qual-goals" role="group" aria-labelledby="bp-qual-q">
        {HERO_OFFERS.map(({ service, title, offer, logo, emoji }) => (
          <button key={service} type="button" className="bp-qual-opt" onClick={() => openEnquire(service, source)}>
            <span className="bp-qual-icon" aria-hidden="true">{emoji ?? <img src={logo} alt="" width={18} height={18} />}</span>
            <span>{title}<small>{offer}</small></span>
          </button>
        ))}
        <button type="button" className="bp-qual-opt bp-qual-help" onClick={() => openEnquire('Not sure yet, help me choose', source)}>
          <span>Not sure yet, help me choose</span>
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
