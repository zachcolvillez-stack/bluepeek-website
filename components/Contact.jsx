'use client'
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mgoqeber'

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
          _subject: `New Bluepeek Enquiry — ${form.business}`,
        }),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', business: '', email: '', phone: '', message: '' }) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const inp = "w-full rounded-xl px-4 py-3 text-sm placeholder-slate-600 transition-all"
  const inpStyle = {
    background: '#0a0a0c',
    border: '1px solid #232328',
    color: '#f5f5f7',
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>Let's Chat</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#f5f5f7' }}>
            Get your free quote.
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#8a8a93' }}>
            Tell us about your business — we'll reply within 24 hours.<br />No pressure, no sales pitch.
          </p>
        </div>

        <div className="card p-8">

          {status === 'sent' ? (
            <div className="text-center py-12">
              <CheckCircle size={44} style={{ color: '#22d3ee' }} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#f5f5f7' }}>Thanks — we got it!</h3>
              <p className="mb-6" style={{ color: '#8a8a93' }}>We'll be in touch within 24 hours.</p>
              <button onClick={() => setStatus('idle')}
                className="text-sm transition-colors" style={{ color: '#22d3ee' }}>
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 font-medium" style={{ color: '#8a8a93' }}>Your Name *</label>
                  <input required className={inp} style={inpStyle} placeholder="John Smith"
                    value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 font-medium" style={{ color: '#8a8a93' }}>Business Name *</label>
                  <input required className={inp} style={inpStyle} placeholder="Smith Plumbing"
                    value={form.business} onChange={e => set('business', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs mb-1.5 font-medium" style={{ color: '#8a8a93' }}>Email *</label>
                  <input required type="email" className={inp} style={inpStyle} placeholder="john@business.com.au"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs mb-1.5 font-medium" style={{ color: '#8a8a93' }}>Phone</label>
                  <input type="tel" className={inp} style={inpStyle} placeholder="04xx xxx xxx"
                    value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5 font-medium" style={{ color: '#8a8a93' }}>Tell us about your business</label>
                <textarea rows={4} className={inp + ' resize-none'} style={inpStyle}
                  placeholder="What do you do? Got a website already? What are you hoping to achieve?"
                  value={form.message} onChange={e => set('message', e.target.value)} />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5' }}>
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {status === 'sending' ? 'Sending...' : <><Send size={15} /> Send Enquiry</>}
              </button>

              <p className="text-xs text-center pt-1" style={{ color: '#8a8a93' }}>
                Or email directly at{' '}
                <a href="mailto:zach@bluepeek.com.au" style={{ color: '#22d3ee' }}>
                  zach@bluepeek.com.au
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
