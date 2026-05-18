'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
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

  const inp = "w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"

  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">Let&apos;s Chat</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Get Your Free Quote
          </h2>
          <p className="text-slate-600 text-lg">
            Tell us a bit about your business — we&apos;ll get back within 24 hours. No pressure, no sales pitch.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl p-8 bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg shadow-blue-500/5">

          {status === 'sent' ? (
            <div className="text-center py-12">
              <CheckCircle size={48} className="text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Thanks — we got it!</h3>
              <p className="text-slate-600 mb-6">We&apos;ll be in touch within 24 hours.</p>
              <button onClick={() => setStatus('idle')}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                Send another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium">Your Name *</label>
                  <input required className={inp} placeholder="John Smith"
                    value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium">Business Name *</label>
                  <input required className={inp} placeholder="Smith Plumbing"
                    value={form.business} onChange={e => set('business', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium">Email *</label>
                  <input required type="email" className={inp} placeholder="john@business.com.au"
                    value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1.5 font-medium">Phone</label>
                  <input type="tel" className={inp} placeholder="04xx xxx xxx"
                    value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1.5 font-medium">Tell us about your business</label>
                <textarea rows={4} className={inp + ' resize-none'}
                  placeholder="What do you do? Got a website already? What are you hoping to achieve?"
                  value={form.message} onChange={e => set('message', e.target.value)} />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email us directly.
                </div>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-base transition-all btn-glow disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                {status === 'sending' ? 'Sending...' : <><Send size={16} /> Send Enquiry</>}
              </button>

              <p className="text-xs text-slate-500 text-center pt-1">
                Or email directly at{' '}
                <a href="mailto:zach@bluepeek.com.au" className="text-blue-600 hover:underline">
                  zach@bluepeek.com.au
                </a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
