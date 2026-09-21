'use client'
import { useState, useRef, useEffect } from 'react'
import { X, ArrowRight, Check, Sparkles } from 'lucide-react'

const BLUEPEEK_ENDPOINT = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/submit-form'

/* One click picks the job. Two fields send it. Nothing to type until the
   visitor has already committed to something. */
const CHOICES = [
  'Website redesign',
  'Brand new custom website',
  'SEO & GEO optimisation',
  'AI booking system',
]
const OTHER = 'Other AI system'

export default function EnquireWidget() {
  const [open, setOpen] = useState(false)
  const [choice, setChoice] = useState(null)
  const [form, setForm] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')   // idle | sending | sent | error
  const hp = useRef('')
  const panelRef = useRef(null)
  const launcherRef = useRef(null)
  const nameRef = useRef(null)
  const doneRef = useRef(null)

  // Close on Escape, and hand focus back to the launcher.
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Move focus to the field the visitor is meant to fill next.
  useEffect(() => { if (choice && status === 'idle') nameRef.current?.focus() }, [choice, status])
  useEffect(() => { if (status === 'sent') doneRef.current?.focus() }, [status])

  function close() {
    setOpen(false)
    launcherRef.current?.focus()
  }

  function reset() {
    setChoice(null)
    setForm({ name: '', phone: '' })
    setErrors({})
    setStatus('idle')
  }

  function change(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[+\d\s().-]{8,25}$/.test(form.phone.trim())) next.phone = 'Please enter a phone number we can call.'
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(`enquire-${Object.keys(next)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch(BLUEPEEK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formSlug: 'contact',
          domain: window.location.hostname.replace(/^www\./, ''),
          data: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            enquiry: choice,
            source: 'enquire widget',
            _hp: hp.current,
          },
        }),
      })
      if (!response.ok) throw new Error('Enquiry submission failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    } finally {
      clearTimeout(timeout)
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="bp-enquire-launcher"
        aria-expanded={open}
        aria-controls="bp-enquire-panel"
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
          aria-modal="false"
          aria-labelledby="bp-enquire-title"
        >
          <div className="bp-enquire-head">
            <div>
              <h2 id="bp-enquire-title">Start your project now</h2>
              <p>{status === 'sent'
                ? 'One of us will call you personally.'
                : choice ? 'Two details and we’ll call you back.' : 'Pick what you need. We’ll reply within one business day.'}</p>
            </div>
            <button type="button" onClick={close} aria-label="Close enquiry">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {status === 'sent' ? (
            <div className="bp-enquire-done" ref={doneRef} tabIndex={-1} role="status">
              <span className="bp-enquire-tick" aria-hidden="true"><Check size={22} /></span>
              <h3>Thanks — we’ve got it.</h3>
              <p>We’ll call you about <strong>{choice}</strong> within one business day.</p>
              <button type="button" className="bp-enquire-again" onClick={reset}>
                Send another enquiry <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          ) : !choice ? (
            <div className="bp-enquire-choices">
              <div className="bp-enquire-grid">
                {CHOICES.map(label => (
                  <button key={label} type="button" className="bp-enquire-choice" onClick={() => setChoice(label)}>
                    <span>{label}</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </button>
                ))}
              </div>
              <button type="button" className="bp-enquire-choice bp-enquire-wide" onClick={() => setChoice(OTHER)}>
                <span>{OTHER}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className="bp-enquire-note">Free quote. No obligation, no lock-in.</p>
            </div>
          ) : (
            <form className="bp-enquire-form" onSubmit={submit} noValidate aria-busy={status === 'sending'}>
              <div className="bp-enquire-picked">
                <span>{choice}</span>
                <button type="button" onClick={() => setChoice(null)}>Change</button>
              </div>

              <div className="bp-enquire-field">
                <label htmlFor="enquire-name">Your name</label>
                <input
                  id="enquire-name" ref={nameRef} name="name" type="text" autoComplete="name"
                  maxLength={150} value={form.name} onChange={e => change('name', e.target.value)}
                  disabled={status === 'sending'}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'enquire-error-name' : undefined}
                />
                {errors.name && <p className="bp-enquire-error" id="enquire-error-name">{errors.name}</p>}
              </div>

              <div className="bp-enquire-field">
                <label htmlFor="enquire-phone">Phone number</label>
                <input
                  id="enquire-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel"
                  maxLength={25} value={form.phone} onChange={e => change('phone', e.target.value)}
                  disabled={status === 'sending'}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'enquire-error-phone' : undefined}
                />
                {errors.phone && <p className="bp-enquire-error" id="enquire-error-phone">{errors.phone}</p>}
              </div>

              {/* Honeypot - hidden from people, tempting to bots. */}
              <input
                className="bp-enquire-hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
                onChange={e => { hp.current = e.target.value }}
              />

              {status === 'error' && (
                <p className="bp-enquire-error" role="alert">
                  That didn’t send. Please try again, or call Zach on <a href="tel:0468955806">0468 955 806</a>.
                </p>
              )}

              <button className="bp-enquire-send" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
              <p className="bp-enquire-note">We only use this to call you back. See our <a href="/privacy">privacy policy</a>.</p>
            </form>
          )}
        </div>
      )}
    </>
  )
}
