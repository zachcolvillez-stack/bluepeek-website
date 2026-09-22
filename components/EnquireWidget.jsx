'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Sparkles } from 'lucide-react'
import EnquireFlow from './EnquireFlow'
import { ENQUIRE_EVENT } from '../lib/enquire'

/**
 * The floating enquiry panel, and the site's single answer to "get a quote".
 *
 * Every "Get a free quote" on the site is an <a href="#contact">. Rather than
 * rewrite fourteen of them across pages and templates, this intercepts the
 * click and opens the panel where the visitor already is - no long scroll to
 * the bottom of the page and no lost momentum. Without JavaScript the anchors
 * still work and still land on the contact section, which runs the same flow.
 */
export default function EnquireWidget() {
  const [open, setOpen] = useState(false)
  const [service, setService] = useState(null)
  // Extra detail from whatever opened the panel (the SEO audit sends the
  // domain and score). Cleared on close with everything else.
  const [context, setContext] = useState(null)
  const [status, setStatus] = useState('idle')
  const [tucked, setTucked] = useState(false)
  const onStatus = useCallback(value => setStatus(value), [])
  const launcherRef = useRef(null)
  const panelRef = useRef(null)

  // Any CTA on the page, plus openEnquire() from the hero quick picks.
  useEffect(() => {
    function onOpen(event) {
      setService(event.detail?.service ?? null)
      setContext(event.detail?.context ?? null)
      setOpen(true)
    }
    function onClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = event.target.closest?.('a[href$="#contact"], a[href$="#quote-form"]')
      if (!link) return
      event.preventDefault()
      setService(null)
      setContext(null)
      setOpen(true)
    }
    window.addEventListener(ENQUIRE_EVENT, onOpen)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener(ENQUIRE_EVENT, onOpen)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    function onKey(event) { if (event.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // While the contact section's own copy of this flow is on screen, the
  // floating button is both redundant and in the way, so it steps aside.
  useEffect(() => {
    const card = document.querySelector('.bp-enq-card')
    if (!card || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setTucked(entry.isIntersecting))
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  // Opening from a CTA should land the visitor inside the panel, not leave
  // their focus somewhere up the page behind it.
  useEffect(() => {
    if (open && !service) panelRef.current?.querySelector('.bp-enq-choice')?.focus()
  }, [open, service])

  function close() {
    // The flow unmounts with the panel, so the picked service goes with it -
    // reopening should start from the top rather than a half-filled step.
    setOpen(false)
    setService(null)
    setContext(null)
    setStatus('idle')
    launcherRef.current?.focus()
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className={`bp-enquire-launcher${tucked && !open ? ' bp-enquire-tucked' : ''}`}
        aria-expanded={open}
        aria-controls="bp-enquire-panel"
        tabIndex={tucked && !open ? -1 : 0}
        onClick={() => { open ? close() : setOpen(true) }}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Sparkles size={17} aria-hidden="true" />}
        <span>{open ? 'Close' : 'Enquire'}</span>
      </button>

      {open && (
        <div
          id="bp-enquire-panel"
          ref={panelRef}
          className="bp-enquire-panel"
          role="dialog"
          aria-labelledby="bp-enquire-title"
        >
          <div className="bp-enquire-head">
            <div>
              <h2 id="bp-enquire-title">Start your project now</h2>
              <p>{subhead(service, status)}</p>
            </div>
            <button type="button" onClick={close} aria-label="Close enquiry">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="bp-enquire-body">
            <EnquireFlow variant="panel" service={service} onService={setService} onStatus={onStatus} context={context} />
          </div>
        </div>
      )}
    </>
  )
}

function subhead(service, status) {
  if (status === 'sent') return 'One of us will call you personally.'
  if (service) return 'Two details and we\u2019ll call you back.'
  return 'Pick what you need. We\u2019ll reply within one business day.'
}
