'use client'
import { useRef, useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { ENQUIRE_ENDPOINT } from '../../lib/enquire'
import { track, trackFormStart, newLeadId } from '../../lib/track'
import { attributionFields } from '../../lib/attribution'

// Short audit / enquiry form for money pages. Each variant asks only for what
// that audit needs; everything lands in BluePeek Forms under the `contact` form.
const BUDGETS = ['Not running ads yet', 'Under $500 / month', '$500 - $1,500 / month', '$1,500 - $5,000 / month', '$5,000+ / month']

const VARIANTS = {
  ads:     { enquiry: 'Free Google Ads audit',     fields: ['name', 'business', 'website', 'industry', 'budget', 'phone', 'email'] },
  meta:    { enquiry: 'Free Meta Ads audit',       fields: ['name', 'business', 'website', 'industry', 'budget', 'phone', 'email'] },
  reviews: { enquiry: 'Google reviews enquiry',    fields: ['name', 'business', 'website', 'phone', 'email'] },
  gbp:     { enquiry: 'Free Google visibility audit', fields: ['name', 'business', 'website', 'phone', 'email'] },
  website: { enquiry: 'Free website audit',        fields: ['name', 'business', 'website', 'phone', 'email'] },
  social:  { enquiry: 'Social media enquiry',      fields: ['name', 'business', 'website', 'phone', 'email'] },
  ai:      { enquiry: 'AI automation enquiry',     fields: ['name', 'business', 'website', 'phone', 'email'] },
  general: { enquiry: 'Free growth audit',         fields: ['name', 'business', 'website', 'industry', 'phone', 'email'] },
}

const LABELS = {
  name: 'Your name',
  business: 'Business name',
  website: 'Website or Google profile link',
  industry: 'Industry',
  budget: 'Monthly ad budget',
  phone: 'Phone',
  email: 'Email',
}

export default function LeadForm({ variant = 'general', submitLabel = 'Send', source }) {
  const config = VARIANTS[variant] || VARIANTS.general
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const hp = useRef('')
  const id = `lf-${variant}`

  function change(key, value) {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const v = k => (form[k] || '').trim()
    const next = {}
    if (!v('name')) next.name = 'Please enter your name.'
    if (!v('business')) next.business = 'Please enter your business name.'
    if (!/^[+\d\s().-]{8,25}$/.test(v('phone'))) next.phone = 'Please enter a phone number we can call.'
    if (v('email') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) next.email = 'Please check this email address.'
    setErrors(next)
    if (Object.keys(next).length) {
      document.getElementById(`${id}-${Object.keys(next)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const leadId = newLeadId()
      const data = { name: v('name'), phone: v('phone'), email: v('email'), enquiry: config.enquiry, source: source || window.location.pathname }
      for (const key of ['business', 'website', 'industry', 'budget']) if (v(key)) data[LABELS[key].toLowerCase()] = v(key)
      Object.assign(data, attributionFields(), { lead_id: leadId })
      data._hp = hp.current
      const res = await fetch(ENQUIRE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({ formSlug: 'contact', domain: window.location.hostname.replace(/^www\./, ''), data }),
      })
      if (!res.ok) throw new Error('submit failed')
      setStatus('sent')
      track('generate_lead', { form_variant: variant, enquiry: config.enquiry, budget: v('budget') || undefined, lead_id: leadId })
    } catch {
      setStatus('error')
    } finally {
      clearTimeout(timeout)
    }
  }

  if (status === 'sent') {
    return (
      <div className="bp-lf bp-lf-done" role="status">
        <span className="bp-lf-tick" aria-hidden="true"><Check size={20} /></span>
        <p className="bp-lf-done-title">Thanks, we have your details.</p>
        <p>Jac or Zach will call you within one business day.</p>
      </div>
    )
  }

  return (
    <form className="bp-lf" onSubmit={submit} onFocus={() => trackFormStart(variant)} noValidate aria-busy={status === 'sending'}>
      <div className="bp-lf-grid">
        {config.fields.map(key => (
          <div className={`bp-lf-field ${key === 'website' ? 'bp-lf-wide' : ''}`} key={key}>
            <label htmlFor={`${id}-${key}`}>{LABELS[key]}{key === 'email' || key === 'website' || key === 'industry' ? <span> (optional)</span> : null}</label>
            {key === 'budget' ? (
              <select id={`${id}-${key}`} value={form.budget || ''} onChange={e => change('budget', e.target.value)} disabled={status === 'sending'}>
                <option value="">Select a range</option>
                {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            ) : (
              <input
                id={`${id}-${key}`}
                type={key === 'phone' ? 'tel' : key === 'email' ? 'email' : 'text'}
                inputMode={key === 'phone' ? 'tel' : key === 'website' ? 'url' : undefined}
                autoComplete={{ name: 'name', business: 'organization', phone: 'tel', email: 'email', website: 'url' }[key] || 'off'}
                maxLength={key === 'phone' ? 25 : 200}
                value={form[key] || ''}
                onChange={e => change(key, e.target.value)}
                disabled={status === 'sending'}
                aria-invalid={Boolean(errors[key])}
                aria-describedby={errors[key] ? `${id}-err-${key}` : undefined}
              />
            )}
            {errors[key] && <p className="bp-lf-error" id={`${id}-err-${key}`}>{errors[key]}</p>}
          </div>
        ))}
      </div>
      <input className="bp-enq-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" onChange={e => { hp.current = e.target.value }} />
      {status === 'error' && <p className="bp-lf-error" role="alert">That did not send. Please try again, or call Jac on <a href="tel:0402923253">0402 923 253</a>.</p>}
      <button className="bp-lf-send" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : submitLabel} <ArrowRight size={16} aria-hidden="true" />
      </button>
      <p className="bp-lf-note">Free, no obligation. We only use your details to contact you. See our <a href="/privacy">privacy policy</a>.</p>
    </form>
  )
}
