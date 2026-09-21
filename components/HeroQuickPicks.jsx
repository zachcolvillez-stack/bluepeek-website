'use client'
import { ArrowRight } from 'lucide-react'
import { CHOICES, OTHER_CHOICE, openEnquire } from '../lib/enquire'

/**
 * The same tiles the contact section uses, in glass over the hero photo.
 * One tap opens the enquiry with the service already chosen.
 */
export default function HeroQuickPicks() {
  return (
    <div className="bp-hero-picks">
      <p id="bp-hero-picks-label">What do you need?</p>
      <div className="bp-enq bp-enq-hero" role="group" aria-labelledby="bp-hero-picks-label">
        <div className="bp-enq-grid">
          {CHOICES.map(choice => (
            <button key={choice} type="button" className="bp-enq-choice" onClick={() => openEnquire(choice)}>
              <span>{choice}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <button type="button" className="bp-enq-choice bp-enq-wide" onClick={() => openEnquire(OTHER_CHOICE)}>
          <span>{OTHER_CHOICE}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
