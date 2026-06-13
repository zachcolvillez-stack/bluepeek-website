'use client'
import { motion } from 'framer-motion'
import { Search, PenTool, Rocket, LineChart } from 'lucide-react'

const STEPS = [
  { number: '01', icon: Search,    title: 'Discovery',        description: 'A relaxed conversation about your business, your goals and what success looks like. If Blue Peek isn’t the right fit, we’ll tell you upfront.' },
  { number: '02', icon: PenTool,   title: 'Design & Build',   description: 'We design and build your site with you in the loop — drafts, feedback and refinements until it’s exactly right.' },
  { number: '03', icon: Rocket,    title: 'Launch',           description: 'Your site goes live quickly. We handle the technical details and make sure everything runs cleanly from day one.' },
  { number: '04', icon: LineChart, title: 'Support & Growth', description: 'We stay on hand — support when you need it, plus automation that keeps enquiries coming in long after launch.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-tint relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">The Process</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#f4f7fd' }}>
            Simple, honest,<br />done right.
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#aab3c9' }}>
            No jargon and no surprises — just a clear path from our first conversation to a website that earns enquiries.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting timeline (desktop) */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(159,182,255,0.35) 15%, rgba(159,182,255,0.35) 85%, transparent)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div key={step.number}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="rounded-2xl flex items-center justify-center"
                    style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #7fb0f7 0%, #8f86f3 55%, #a78bf5 100%)', boxShadow: '0 12px 28px rgba(120,140,255,0.35)' }}>
                    <step.icon size={26} className="text-white" />
                  </div>
                  <span className="absolute -top-2 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: '#0e1424', color: '#9fb6ff', border: '1.5px solid rgba(255,255,255,0.16)' }}>
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2.5" style={{ color: '#f4f7fd' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#aab3c9' }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14">
          <button onClick={() => { const el = document.getElementById('contact'); el?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn-primary inline-flex items-center px-7 py-3.5 rounded-full text-sm">
            Book your free discovery chat
          </button>
        </motion.div>
      </div>
    </section>
  )
}
