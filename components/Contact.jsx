'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Mail, Gift, ShieldCheck, MapPin, Cpu } from 'lucide-react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgoqeber'
const CONTACT_EMAIL = 'info@bluepeek.com.au'

const TRUST = [
  { icon: Gift,        label: 'Free quote, no obligation' },
  { icon: ShieldCheck, label: 'No pressure, no hard sell' },
  { icon: MapPin,      label: 'Local Perth support' },
  { icon: Cpu,         label: 'Website + AI options' },
]

export default function Contact() {
  const [form, setForm]     = useState({ name: '', business: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name, business: form.business, email: form.email,
          phone: form.phone, message: form.message,
          _replyto: form.email,
          _subject: `New Bluepeek Enquiry — ${form.business || form.name}`,
        }),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', business: '', email: '', phone: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inp = "w-full rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
  const inpStyle = { background: '#f6f9fc', border: '1px solid #e4eaf3', color: '#0f1e38' }

  return (
    <section id="contact" className="section-tint relative py-28 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* ── Left: pitch + trust ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:pt-6">
          <span className="eyebrow">Let’s Talk</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#0f1e38' }}>
            Ready to turn your website into a lead machine?
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: '#46566f' }}>
            Tell us about your business and we’ll reply within 24 hours with honest advice — whether that’s a new site, AI automation, or both.
          </p>

          <div className="space-y-3.5 mb-8">
            {TRUST.map(t => (
              <div key={t.label} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#dbe8fc' }}>
                  <t.icon size={16} style={{ color: '#0b2350' }} />
                </span>
                <span className="text-sm font-medium" style={{ color: '#0f1e38' }}>{t.label}</span>
              </div>
            ))}
          </div>

          <a href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl font-medium text-sm"
            style={{ background: '#ffffff', border: '1px solid #e4eaf3', color: '#0b2350', boxShadow: '0 2px 8px rgba(11,35,80,0.05)' }}>
            <Mail size={16} style={{ color: '#2f63d9' }} />
            {CONTACT_EMAIL}
          </a>
        </motion.div>

        {/* ── Right: form card ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="card p-8">
          {status === 'sent' ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: '#dbe8fc' }}>
                <CheckCircle size={28} style={{ color: '#0b2350' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0f1e38' }}>Thanks — we got it!</h3>
              <p className="mb-6" style={{ color: '#46566f' }}>We’ll be in touch within 24 hours.</p>
              <button onClick={() => setStatus('idle')} className="text-sm font-semibold" style={{ color: '#0b2350' }}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#46566f' }}>Your Name *</label>
                  <input required className={inp} style={inpStyle} placeholder="John Smith"
                    value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#46566f' }}>Business Name *</label>
                  <input required className={inp} style={inpStyle} placeholder="Smith Plumbing"
                    value={form.business} onChange={e => set('business', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#46566f' }}>Email *</label>
                  <input required type="email" className={inp} style={inpStyle} placeholder="john@business.com.au"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#46566f' }}>Phone</label>
                  <input type="tel" className={inp} style={inpStyle} placeholder="04xx xxx xxx"
                    value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5 font-semibold" style={{ color: '#46566f' }}>Tell us about your business</label>
                <textarea rows={4} className={inp + ' resize-none'} style={inpStyle}
                  placeholder="What do you do? Got a website already? What are you hoping to achieve?"
                  value={form.message} onChange={e => set('message', e.target.value)} />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {status === 'sending' ? 'Sending…' : <><Send size={15} /> Send Enquiry</>}
              </button>

              <p className="text-xs text-center pt-1" style={{ color: '#7a8aa3' }}>
                Or email us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold" style={{ color: '#0b2350' }}>
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
