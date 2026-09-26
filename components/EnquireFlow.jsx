'use client'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { CHOICES, OTHER_CHOICE, ENQUIRE_ENDPOINT } from '../lib/enquire'
import { track } from '../lib/track'

/**
 * The whole enquiry in two steps: click the job, then leave a number.
 * Used by the floating panel and, in `inline` form, by the contact section -
 * one flow, so a visitor never meets two different versions of it.
 */
export default function EnquireFlow({ variant = 'panel', service, onService, onStatus, autoFocus = true, context = null }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')   // idle | sending | sent | error
  const hp = useRef('')
  const nameRef = useRef(null)
  const doneRef = useRef(null)
  const id = variant === 'inline' ? 'enq-inline' : 'enq-panel'

  useEffect(() => { if (service && status === 'idle' && autoFocus) nameRef.current?.focus() }, [service, status, autoFocus])
  useEffect(() => { if (status === 'sent') doneRef.current?.focus() }, [status])
  useEffect(() => { onStatus?.(status) }, [status, onStatus])

  function change(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  function restart() {
    onService(null)
    setForm({ name: '', phone: '', email: '' })
    setErrors({})
    setStatus('idle')
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^[+\d\s().-]{8,25}$/.test(form.phone.trim())) next.phone = 'Please enter a phone number we can call.'
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Please check this email address.'
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${Object.keys(next)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch(ENQUIRE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          formSlug: 'contact',
          domain: window.location.hostname.replace(/^www\./, ''),
          data: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            enquiry: service,
            source: context?.source ?? (variant === 'inline' ? 'enquire section' : 'enquire panel'),
            // Field order is preserved in the notification email, so the audit
            // findings sit after the contact details and before the honeypot.
            ...(context?.fields ?? {}),
            _hp: hp.current,
          },
        }),
      })
      if (!response.ok) throw new Error('Enquiry submission failed')
      setStatus('sent')
      track('generate_lead', { form_variant: variant, enquiry: service })
    } catch {
      setStatus('error')
    } finally {
      clearTimeout(timeout)
    }
  }

  if (status === 'sent') {
    return (
      <div className={`bp-enq bp-enq-${variant} bp-enq-done`} ref={doneRef} tabIndex={-1} role="status">
        <span className="bp-enq-tick" aria-hidden="true"><Check size={22} /></span>
        <h3>Thanks, we’ve got it.</h3>
        <p>We’ll call you about <strong>{service}</strong> within one business day.</p>
        <button type="button" className="bp-enq-again" onClick={restart}>
          Send another enquiry <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    )
  }

  if (!service) {
    return (
      <div className={`bp-enq bp-enq-${variant}`}>
        <div className="bp-enq-grid">
          {CHOICES.map(label => (
            <button key={label} type="button" className="bp-enq-choice" onClick={() => onService(label)}>
              <span>{label}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <button type="button" className="bp-enq-choice bp-enq-wide" onClick={() => onService(OTHER_CHOICE)}>
          <span>{OTHER_CHOICE}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </button>
        <p className="bp-enq-note">Free quote · No obligation · No lock-in</p>
      </div>
    )
  }

  return (
    <form className={`bp-enq bp-enq-${variant}`} onSubmit={submit} noValidate aria-busy={status === 'sending'}>
      <div className="bp-enq-picked">
        <span>{service}</span>
        <button type="button" onClick={() => onService(null)}>Change</button>
      </div>

      <div className="bp-enq-fields">
        <div className="bp-enq-field">
          <label htmlFor={`${id}-name`}>Your name</label>
          <input
            id={`${id}-name`} ref={nameRef} name="name" type="text" autoComplete="name"
            maxLength={150} value={form.name} onChange={e => change('name', e.target.value)}
            disabled={status === 'sending'}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-err-name` : undefined}
          />
          {errors.name && <p className="bp-enq-error" id={`${id}-err-name`}>{errors.name}</p>}
        </div>

        <div className="bp-enq-field">
          <label htmlFor={`${id}-phone`}>Phone number</label>
          <input
            id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel"
            maxLength={25} value={form.phone} onChange={e => change('phone', e.target.value)}
            disabled={status === 'sending'}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${id}-err-phone` : undefined}
          />
          {errors.phone && <p className="bp-enq-error" id={`${id}-err-phone`}>{errors.phone}</p>}
        </div>
      </div>

      <div className="bp-enq-field">
        <label htmlFor={`${id}-email`}>Email <span>(optional)</span></label>
        <input
          id={`${id}-email`} name="email" type="email" autoComplete="email"
          maxLength={254} value={form.email} onChange={e => change('email', e.target.value)}
          disabled={status === 'sending'}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-err-email` : undefined}
        />
        {errors.email && <p className="bp-enq-error" id={`${id}-err-email`}>{errors.email}</p>}
      </div>

      {/* Hidden from people, tempting to bots. */}
      <input
        className="bp-enq-hp" tabIndex={-1} autoComplete="off" aria-hidden="true"
        onChange={e => { hp.current = e.target.value }}
      />

      {status === 'error' && (
        <p className="bp-enq-error" role="alert">
          That didn’t send. Please try again, or call Zach on <a href="tel:0468955806">0468 955 806</a>.
        </p>
      )}

      <button className="bp-enq-send" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        <ArrowRight size={16} aria-hidden="true" />
      </button>
      <p className="bp-enq-note">We only use this to call you back. See our <a href="/privacy">privacy policy</a>.</p>
    </form>
  )
}
