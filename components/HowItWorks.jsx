'use client'
import { motion } from 'framer-motion'

const STEPS = [
  {
    number: '01',
    title: 'Free Discovery Call',
    description: "We jump on a free 15-minute call to understand your business, your goals, and what your customers care about. No pressure — just a conversation.",
  },
  {
    number: '02',
    title: 'We Design & Build',
    description: "Our team gets to work building your custom website or AI integration. We keep you updated every step of the way and deliver fast — typically within 1–2 weeks.",
  },
  {
    number: '03',
    title: 'Launch & Grow',
    description: "Your new site goes live. Customers find you easier, enquiries come in, and your business looks as professional as it is. We support you after launch too.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Simple. Fast. Done.
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Getting a premium website shouldn&apos;t be complicated. Here&apos;s exactly how it works.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #1e3a5f 20%, #1e3a5f 80%, transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
              <motion.div key={step.number}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                {/* Number circle */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
                  style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.03) 100%)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <span className="text-3xl font-black gradient-text">{step.number}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA nudge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16">
          <a href="#contact"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">
            Book your free call today →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
