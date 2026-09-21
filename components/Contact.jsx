'use client'
import { useEffect, useRef, useState } from 'react'
import { SITE } from '../lib/site'
const BLUEPEEK_ENDPOINT = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/submit-form'
const empty = {name: '', business: '', email: '', phone: '', message: ''}
export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const successRef = useRef(null)
  const pending = useRef(false)
  useEffect(() => { if (status === 'sent') successRef.current?.focus() }, [status])
  function change(key, value) { setForm(f => ({...f, [key]: value})); setErrors(e => ({...e, [key]: undefined})) }
  async function submit(event) {
    event.preventDefault()
    if (pending.current) return
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.business.trim()) nextErrors.business = 'Please enter your business name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = 'Please enter a valid email address.'
    if (form.phone.trim() && !/^[+\d\s().-]{8,25}$/.test(form.phone.trim())) nextErrors.phone = 'Please enter a valid phone number.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) { document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus(); return }
    pending.current = true
    setStatus('sending')
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch(BLUEPEEK_ENDPOINT, {
        method: 'POST', headers: {'Content-Type': 'application/json'}, signal: controller.signal,
        body: JSON.stringify({formSlug: 'contact', domain: window.location.hostname, data: Object.fromEntries(Object.entries(form).map(([k,v]) => [k,v.trim()]))}),
      })
      if (!response.ok) throw new Error('Enquiry submission failed')
      setStatus('sent'); setForm(empty)
    } catch { setStatus('error') }
    finally { clearTimeout(timeout); pending.current = false }
  }
  return (<section id="contact" className="bp-section bp-contact bp-soft"><span id="quote-form" className="bp-anchor" /><div className="bp-wrap bp-contact-grid">
    <div className="bp-contact-copy"><p className="bp-kicker">Let’s talk</p><h2>Your next chapter<br />starts here.</h2><p>Tell us a little about your business. We’ll get back to you within one business day with clear, honest advice and a free quote.</p><a className="bp-contact-email" href={`mailto:${SITE.email}`}>{SITE.email}<span aria-hidden="true">↗</span></a><div className="bp-contact-phones"><a href="tel:0402923253">Jac · 0402 923 253</a><a href="tel:0468955806">Zach · 0468 955 806</a></div><a href="/free-quote" className="bp-text-link">Prefer a quick callback? <span aria-hidden="true">→</span></a></div>
    <div className="bp-form-area">
      {status === 'sent' ? <div className="bp-success" ref={successRef} tabIndex={-1} role="status"><span aria-hidden="true">✓</span><h3>Thanks — we’ve got it.</h3><p>We’ll be in touch within one business day.</p><button type="button" className="bp-text-link" onClick={() => setStatus('idle')}>Send another enquiry <span aria-hidden="true">→</span></button></div> :
      <form onSubmit={submit} noValidate aria-label="Get a free quote" aria-busy={status === 'sending'}>
        <div className="bp-fields">{[['name','Your name','text','name'],['business','Business name','text','organization'],['email','Email address','email','email'],['phone','Phone number','tel','tel']].map(([key,label,type,complete]) => <div className="bp-field" key={key}><label htmlFor={`contact-${key}`}>{label}{key !== 'phone' ? ' *' : <span> (optional)</span>}</label><input id={`contact-${key}`} name={key} type={type} autoComplete={complete} required={key !== 'phone'} maxLength={key === 'email' ? 254 : 150} value={form[key]} onChange={e => change(key,e.target.value)} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `error-${key}` : undefined} disabled={status === 'sending'} />{errors[key] && <p className="bp-field-error" id={`error-${key}`}>{errors[key]}</p>}</div>)}</div>
        <div className="bp-field"><label htmlFor="contact-message">What do you have in mind? <span>(optional)</span></label><textarea id="contact-message" name="message" rows={4} maxLength={5000} value={form.message} onChange={e => change('message',e.target.value)} placeholder="A new website, a fresh start, or something smarter…" disabled={status === 'sending'} /></div>
        {status === 'error' && <p className="bp-form-error" role="alert">Your enquiry couldn’t be sent. Please try again, or <a href={`mailto:${SITE.email}`}>email us directly</a>.</p>}
        <button className="bp-button bp-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending your enquiry…' : 'Send enquiry'}<span aria-hidden="true">→</span></button>
        <p className="bp-form-note">Free, no-obligation quote. Your details are handled under our <a href="/privacy">privacy policy</a>.</p>
      </form>}
    </div>
  </div></section>)
}
