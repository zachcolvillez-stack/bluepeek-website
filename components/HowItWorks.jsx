'use client'
import { motion } from 'framer-motion'

const STEPS = [
  { number: '01', title: 'Free Chat',         description: "We jump on a quick call (15 minutes, no pressure) to chat about your business and what you're hoping to achieve. If we're not the right fit, we'll tell you straight up." },
  { number: '02', title: 'We Build It',       description: "We design and build your website, keeping you in the loop every step. You'll see drafts, give feedback, and we make changes until you're happy." },
  { number: '03', title: 'Launch & Support',  description: "Your new website goes live. We make sure it's running smoothly, walk you through how to use it, and stick around to help when you need us." },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">The Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Simple. Honest. Done Right.
          </h2>
          <p className="text-slate-600 text-lg max-w-lg mx-auto">
            No jargon, no surprises. Just a straightforward way to get your business online properly.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-12 left-[calc(16.67%-1px)] right-[calc(16.67%-1px)] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #cbd5e1 20%, #cbd5e1 80%, transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
              <motion.div key={step.number}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-white"
                  style={{ background: 'radial-gradient(circle, #eff6ff 0%, #ffffff 100%)', border: '1px solid #bfdbfe' }}>
                  <span className="text-3xl font-black gradient-text">{step.number}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16">
          <a href="#contact"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
            Book your free chat today →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
