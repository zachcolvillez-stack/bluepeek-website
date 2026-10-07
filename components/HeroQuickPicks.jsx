'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MapPin, Megaphone, Phone, Star } from 'lucide-react'
import { QUALIFY_GOALS, QUALIFY_HELP, QUALIFY_SITES, openEnquire, qualify } from '../lib/enquire'

const GOAL_ICONS = { calls: Phone, maps: MapPin, reviews: Star, social: Megaphone }
const goalLabel = id => QUALIFY_GOALS.find(goal => goal.id === id)?.label ?? 'Not sure yet'
const siteLabel = id => QUALIFY_SITES.find(site => site.id === id)?.label

/**
 * Two-question qualifier over the hero photo. The answers pick the service,
 * then the enquiry panel opens with it chosen and both answers attached.
 */
export default function HeroQuickPicks() {
  const [goal, setGoal] = useState(null)
  const [site, setSite] = useState(null)
  const question = useRef(null)
  const step = !goal ? 1 : goal !== QUALIFY_HELP && goal !== 'reviews' && !site ? 2 : 3
  const result = step === 3 ? qualify(goal, site) : null

  // Move focus with the step so keyboard and screen reader users follow along.
  const moved = useRef(false)
  useEffect(() => {
    if (moved.current) question.current?.focus({ preventScroll: true })
    moved.current = true
  }, [step])

  function restart() { setGoal(null); setSite(null) }
  function start() {
    const fields = { goal: goalLabel(goal) }
    if (site) fields.website = siteLabel(site)
    openEnquire(result.service, { source: 'hero qualifier', fields })
  }

  return (
    <div className="bp-qual" aria-live="polite">
      <div className="bp-qual-top">
        <span>{step === 3 ? 'Our suggestion' : `Question ${step} of 2`}</span>
        <span className="bp-qual-dots" aria-hidden="true"><i className="on" /><i className={step > 1 ? 'on' : ''} /></span>
      </div>

      {step === 1 && <>
        <p id="bp-qual-q" ref={question} tabIndex={-1} className="bp-qual-q">What do you want more of?</p>
        <div className="bp-qual-goals" role="group" aria-labelledby="bp-qual-q">
          {QUALIFY_GOALS.map(({ id, label }) => {
            const Icon = GOAL_ICONS[id]
            return (
              <button key={id} type="button" className="bp-qual-opt" onClick={() => setGoal(id)}>
                <span className="bp-qual-icon"><Icon size={16} aria-hidden="true" /></span>
                <span>{label}</span>
              </button>
            )
          })}
          <button type="button" className="bp-qual-opt bp-qual-help" onClick={() => setGoal(QUALIFY_HELP)}>
            <span>Not sure yet, help me choose</span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
      </>}

      {step === 2 && <>
        <p id="bp-qual-q" ref={question} tabIndex={-1} className="bp-qual-q">Do you have a website now?</p>
        <div className="bp-qual-sites" role="group" aria-labelledby="bp-qual-q">
          {QUALIFY_SITES.map(({ id, label }) => (
            <button key={id} type="button" className="bp-qual-opt" onClick={() => setSite(id)}>
              <span>{label}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <button type="button" className="bp-qual-back" onClick={() => setGoal(null)}>Back</button>
      </>}

      {step === 3 && <>
        <p ref={question} tabIndex={-1} className="bp-qual-q">Here is where we would start</p>
        <div className="bp-qual-rec">
          <strong>{result.title}</strong>
          <p>{result.body}</p>
          <span>{result.offer}</span>
        </div>
        <button type="button" className="bp-qual-go" onClick={start}>Start my enquiry <ArrowRight size={16} aria-hidden="true" /></button>
        <button type="button" className="bp-qual-back" onClick={restart}>Start again</button>
      </>}
    </div>
  )
}
