'use client'
import { ALL_CHOICES, openEnquire } from '../lib/enquire'

/** One tap from the hero to the enquiry, with the service already chosen. */
export default function HeroQuickPicks() {
  return (
    <div className="bp-hero-picks">
      <p id="bp-hero-picks-label">What do you need?</p>
      <div role="group" aria-labelledby="bp-hero-picks-label">
        {ALL_CHOICES.map(choice => (
          <button key={choice} type="button" onClick={() => openEnquire(choice)}>
            {choice}<span aria-hidden="true">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}
