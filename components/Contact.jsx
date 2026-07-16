'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, Gift, ShieldCheck, MapPin, Cpu } from 'lucide-react'

const BLUEPEEK_ENDPOINT = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/submit-form'
const CONTACT_EMAIL = 'info@bluepeek.com.au'

const TRUST = [
  { icon: Gift,        label: 'Free, no-obligation quote' },
  { icon: ShieldCheck, label: 'Straight answers, no hard sell' },
  { icon: MapPin,      label: 'Local Perth team' },
  { icon: Cpu,         label: 'Websites and automation' },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', business: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(BLUEPEEK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSlug: 'contact',
          domain: typeof window !== 'undefined' ? window.location.hostname : 'bluepeek.com.au',
          data: {
            name: form.name, business: form.business, email: form.email,
            phone: form.phone, message: form.message,
          },
        }),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', business: '', email: '', phone: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inp = "w-full rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
  const inpStyle = { background: '#f7f9fc', border: '1px solid rgba(12,28,52,0.12)', color: '#0c1c34' }
  const onFocus = (e) => { e.target.style.borderColor = '#0c1c34' }
  const onBlur  = (e) => { e.target.style.borderColor = 'rgba(12,28,52,0.12)' }

  return (
    <section id="contact" className="section-tint relative py-28 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* ── Left: pitch + trust ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:pt-6">
          <span className="eyebrow">Let’s Talk</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#0c1c34' }}>
            Let’s build a website your business is proud of.
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#475569' }}>
            Tell us a little about your business and we’ll reply within one business day with clear, honest advice - whether you need a new website, smarter automation, or both.
          </p>

          <div className="space-y-3.5 mb-8">
            {TRUST.map(t => (
              <div key={t.label} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(47,95,208,0.09)' }}>
                  <t.icon size={16} style={{ color: '#16335c' }} />
                </span>
                <span className="text-sm font-medium" style={{ color: '#475569' }}>{t.label}</span>
              </div>
            ))}
          </div>

          <a href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm"
            style={{ background: '#f7f9fc', border: '1px solid rgba(12,28,52,0.12)', color: '#0c1c34' }}>
            <Mail size={16} style={{ color: '#16335c' }} />
            {CONTACT_EMAIL}
          </a>
        </motion.div>

        {/* ── Right: form card ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="card-light p-8">
          {status === 'sent' ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(47,95,208,0.09)' }}>
                <CheckCircle size={28} style={{ color: '#16335c' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0c1c34' }}>Thanks - we’ve got it.</h3>
              <p className="mb-6" style={{ color: '#475569' }}>We’ll be in touch within one business day.</p>
              <button onClick={() => setStatus('idle')} className="text-sm font-semibold" style={{ color: '#16335c' }}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#475569' }}>Your Name *</label>
                  <input required className={inp} style={inpStyle} placeholder="John Smith" onFocus={onFocus} onBlur={onBlur}
                    value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#475569' }}>Business Name *</label>
                  <input required className={inp} style={inpStyle} placeholder="Smith Plumbing" onFocus={onFocus} onBlur={onBlur}
                    value={form.business} onChange={e => set('business', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#475569' }}>Email *</label>
                  <input required type="email" className={inp} style={inpStyle} placeholder="john@business.com.au" onFocus={onFocus} onBlur={onBlur}
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#475569' }}>Phone</label>
                  <input type="tel" className={inp} style={inpStyle} placeholder="04xx xxx xxx" onFocus={onFocus} onBlur={onBlur}
                    value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#475569' }}>Tell us about your business</label>
                <textarea rows={4} className={inp + ' resize-none'} style={inpStyle} onFocus={onFocus} onBlur={onBlur}
                  placeholder="What do you do, do you have a website already, and what would you like it to achieve?"
                  value={form.message} onChange={e => set('message', e.target.value)} />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
                  style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(248,113,113,0.35)', color: '#fca5a5' }}>
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {status === 'sending' ? 'Sending…' : <><Send size={15} /> Send Enquiry</>}
              </button>

              <p className="text-xs text-center pt-1" style={{ color: '#7e889f' }}>
                Or email us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold" style={{ color: '#16335c' }}>
                  {CONTACT_EMAIL}
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
