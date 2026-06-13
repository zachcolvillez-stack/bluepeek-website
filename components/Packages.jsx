'use client'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight } from 'lucide-react'

const PACKAGES = [
  {
    name: 'Starter',
    tagline: 'Get online and look the part.',
    features: [
      'Custom 3-page website',
      'Mobile-first & fast loading',
      'Contact & enquiry form',
      'Google-ready basics',
      'You own everything',
    ],
    popular: false,
    hasAI: false,
  },
  {
    name: 'Growth',
    tagline: 'A website that captures and follows up your leads.',
    features: [
      'Everything in Starter',
      'Up to 5 custom pages',
      '24/7 AI chatbot assistant',
      'Automated lead capture & follow-up',
      'Online booking system',
      'Local SEO setup',
    ],
    popular: true,
    hasAI: true,
  },
  {
    name: 'Scale',
    tagline: 'A complete system built to grow with your business.',
    features: [
      'Everything in Growth',
      '8+ pages & landing pages',
      'Advanced AI automation',
      'Lead pipeline & CRM setup',
      'Priority support',
      'Ongoing growth & improvements',
    ],
    popular: false,
    hasAI: true,
  },
]

export default function Packages({ onCTA }) {
  return (
    <section id="packages" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">Packages</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#ffffff' }}>
            Built to bring you leads —<br />priced to fit your business.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#c2d2ee' }}>
            Every package is custom-quoted to fit your goals. No lock-in, no hidden fees — and you own everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PACKAGES.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-3xl p-8"
              style={p.popular
                ? { background: 'linear-gradient(160deg, rgba(79,134,247,0.18), rgba(155,107,242,0.12))', border: '1.5px solid rgba(123,111,245,0.6)', boxShadow: '0 24px 60px rgba(123,111,245,0.25)', transform: 'scale(1.03)' }
                : { background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                  style={{ background: 'linear-gradient(135deg, #4f86f7, #9b6bf2)', boxShadow: '0 6px 16px rgba(123,111,245,0.5)' }}>
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold mb-1.5" style={{ color: '#ffffff' }}>{p.name}</h3>
              <p className="text-sm mb-6" style={{ color: '#9bb0d4' }}>{p.tagline}</p>

              {p.hasAI && (
                <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(123,111,245,0.14)', border: '1px solid rgba(123,111,245,0.3)' }}>
                  <Sparkles size={15} style={{ color: '#c9bcff' }} />
                  <span className="text-xs font-semibold" style={{ color: '#dcd4ff' }}>Includes 24/7 AI Chatbot</span>
                </div>
              )}

              <ul className="space-y-3 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#e3ebf9' }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #4f86f7, #9b6bf2)' }}>
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <button onClick={() => onCTA?.('contact')}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm ${p.popular ? 'btn-primary' : 'btn-secondary'}`}>
                Get a Quote
                <ArrowRight size={15} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm mt-10" style={{ color: '#8ba0c6' }}>
          Need something different? <a href="#contact" onClick={(e) => { e.preventDefault(); onCTA?.('contact') }} className="font-semibold" style={{ color: '#ffffff' }}>Ask for a custom quote →</a>
        </motion.p>
      </div>
    </section>
  )
}
