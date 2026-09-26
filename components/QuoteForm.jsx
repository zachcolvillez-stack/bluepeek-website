'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, AlertCircle, Phone } from 'lucide-react'
import { track, trackFormStart, newLeadId } from '../lib/track'
import { attributionFields } from '../lib/attribution'

const ENDPOINT = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/submit-form'

const TRADES = [
  'Trades & construction', 'Auto & mechanical', 'Beauty & salon',
  'Health & wellness', 'Food & hospitality', 'Retail', 'Something else',
]

const SITE_STATUS = [
  { v: 'none',     label: 'No website yet' },
  { v: 'outdated', label: 'Have one, it’s dated' },
  { v: 'current',  label: 'Have one, want better' },
]

/**
 * Lead capture for the sales call. Four fields only — every extra one costs
 * completions. Posts to Bluepeek Forms with slug `quote` so these are
 * separable from general contact enquiries in the dashboard.
 */
export default function QuoteForm({ compact = false, id = 'quote-form' }) {
  const [form, setForm] = useState({ name: '', phone: '', trade: '', site: '' })
  const [status, setStatus] = useState('idle')
  const [touched, setTouched] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const phoneOk = /^0[45]\d{2}\s?\d{3}\s?\d{3}$|^0[2-8]\s?\d{4}\s?\d{4}$/.test(form.phone.replace(/\s/g, ''))
  const ready = form.name.trim().length > 1 && phoneOk

  const submit = async (e) => {
    e.preventDefault()
    setTouched(true)
    if (!ready) return
    setStatus('sending')
    const leadId = newLeadId()
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSlug: 'quote',
          domain: typeof window !== 'undefined' ? window.location.hostname : 'bluepeek.com.au',
          data: {
            name: form.name,
            phone: form.phone,
            trade: form.trade || 'Not specified',
            existingSite: form.site || 'Not specified',
            source: typeof window !== 'undefined' ? window.location.pathname : '/',
            ...attributionFields(),
            lead_id: leadId,
          },
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) track('generate_lead', { form_variant: 'quote', enquiry: 'Free quote', lead_id: leadId })
    } catch { setStatus('error') }
  }

  if (status === 'sent') {
    return (
      <div className="card-light p-8 text-center" id={id}>
        <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--lapiz)' }} />
        <h3 className="text-2xl mb-3">You’re in, {form.name.split(' ')[0]}.</h3>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text)' }}>
          One of us, Jac or Zach, will call you on <strong style={{ color: 'var(--ink)' }}>{form.phone}</strong> within
          one business day. No hard sell, just a straight conversation about what your business needs.
        </p>
      </div>
    )
  }

  const inp = 'w-full rounded-xl px-4 py-3.5 text-base transition-all focus:outline-none'
  const inpStyle = (bad) => ({
    background: '#fff',
    border: `1.5px solid ${bad ? '#e06666' : 'rgba(6,20,63,0.14)'}`,
    color: 'var(--ink)',
  })

  return (
    <form onSubmit={submit} onFocus={() => trackFormStart('quote')} id={id} className={`card-light ${compact ? 'p-6' : 'p-7 md:p-8'}`} noValidate>
      <h3 className={`${compact ? 'text-xl' : 'text-2xl'} mb-1.5`}>Get a free quote</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text)' }}>
        Takes 20 seconds. We’ll call you back, no obligation.
      </p>

      <div className="space-y-3.5">
        <div>
          <input
            className={inp} style={inpStyle(touched && form.name.trim().length < 2)}
            placeholder="Your name" value={form.name}
            onChange={e => set('name', e.target.value)} autoComplete="name" />
        </div>

        <div>
          <input
            className={inp} style={inpStyle(touched && !phoneOk)}
            placeholder="Mobile number" value={form.phone} inputMode="tel"
            onChange={e => set('phone', e.target.value)} autoComplete="tel" />
          {touched && !phoneOk && (
            <p className="text-xs mt-1.5" style={{ color: '#c04545' }}>
              Enter an Australian number, e.g. 0412 345 678
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 mt-5" style={{ color: 'var(--muted)' }}>
            What do you do?
          </p>
          <div className="flex flex-wrap gap-2">
            {TRADES.map(t => (
              <button key={t} type="button" onClick={() => set('trade', t === form.trade ? '' : t)}
                className="text-sm px-3.5 py-2 rounded-full transition-all"
                style={form.trade === t
                  ? { background: 'var(--lapiz)', color: '#fff', border: '1px solid var(--lapiz)' }
                  : { background: '#fff', color: 'var(--text)', border: '1px solid rgba(6,20,63,0.14)' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider mb-2 mt-5" style={{ color: 'var(--muted)' }}>
            Website right now?
          </p>
          <div className="grid grid-cols-3 gap-2">
            {SITE_STATUS.map(s => (
              <button key={s.v} type="button" onClick={() => set('site', s.v === form.site ? '' : s.v)}
                className="text-xs px-2 py-2.5 rounded-xl transition-all leading-tight"
                style={form.site === s.v
                  ? { background: 'var(--lapiz)', color: '#fff', border: '1px solid var(--lapiz)' }
                  : { background: '#fff', color: 'var(--text)', border: '1px solid rgba(6,20,63,0.14)' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" disabled={status === 'sending'}
        className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base mt-7">
        {status === 'sending' ? 'Sending…' : 'Call me back'}
        {status !== 'sending' && <ArrowRight size={18} />}
      </button>

      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm mt-3" style={{ color: '#c04545' }}>
          <AlertCircle size={15} /> That didn’t send. Call us instead on 0402 923 253.
        </p>
      )}

      <p className="flex items-center justify-center gap-1.5 text-xs mt-4" style={{ color: 'var(--muted)' }}>
        <Phone size={12} /> We call once. No spam, no mailing list.
      </p>
    </form>
  )
}
