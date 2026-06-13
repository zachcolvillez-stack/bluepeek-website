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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#1a1730' }}>
            Built to bring you leads —<br />priced to fit your business.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#565471' }}>
            Every Blue Peek package is custom-quoted to fit your goals. No lock-in, no hidden fees — and you own everything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PACKAGES.map((p, i) => (
            <motion.div key={p.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-3xl p-8"
              style={p.popular
                ? { background: 'rgba(124,95,224,0.06)', border: '1.5px solid rgba(155,135,245,0.45)', boxShadow: '0 24px 60px rgba(123,111,245,0.18)', transform: 'scale(1.03)' }
                : { background: '#ffffff', border: '1px solid rgba(99,91,168,0.12)', boxShadow: '0 2px 10px rgba(91,77,168,0.06)' }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                  style={{ background: 'linear-gradient(135deg, #7fb0f7 0%, #8f86f3 55%, #a78bf5 100%)', boxShadow: '0 6px 16px rgba(140,120,235,0.28)' }}>
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold mb-1.5" style={{ color: '#1a1730' }}>{p.name}</h3>
              <p className="text-sm mb-6" style={{ color: '#8c8aa3' }}>{p.tagline}</p>

              {p.hasAI && (
                <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(124,95,224,0.08)', border: '1px solid rgba(124,95,224,0.16)' }}>
                  <Sparkles size={15} style={{ color: '#7c5fe0' }} />
                  <span className="text-xs font-semibold" style={{ color: '#7c5fe0' }}>Includes 24/7 AI chatbot</span>
                </div>
              )}

              <ul className="space-y-3 mb-8">
                {p.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#565471' }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'linear-gradient(135deg, #7fb0f7 0%, #8f86f3 55%, #a78bf5 100%)' }}>
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
