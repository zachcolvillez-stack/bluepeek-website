'use client'
import { motion } from 'framer-motion'
import { Search, PenTool, Rocket, LineChart } from 'lucide-react'

const STEPS = [
  { number: '01', icon: Search,    title: 'Discovery',        description: 'A quick, no-pressure chat about your business, your goals and what success looks like. If we’re not the right fit, we’ll say so.' },
  { number: '02', icon: PenTool,   title: 'Design & Build',   description: 'We design and build your site with you in the loop — drafts, feedback and changes until it’s exactly right.' },
  { number: '03', icon: Rocket,    title: 'Launch',           description: 'Your site goes live, fast. We handle the technical side and make sure everything runs perfectly from day one.' },
  { number: '04', icon: LineChart, title: 'Support & Growth', description: 'We stick around — support when you need it, plus AI and automation to keep the leads coming in.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-tint relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">The Process</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#1a1730' }}>
            Simple, honest,<br />done right.
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#565471' }}>
            No jargon and no surprises — just a clear path from our first conversation to a website that earns enquiries.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting timeline (desktop) */}
          <div className="hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-0.5"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(123,111,245,0.5) 15%, rgba(123,111,245,0.5) 85%, transparent)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div key={step.number}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative inline-flex items-center justify-center mb-5">
                  <div className="rounded-2xl flex items-center justify-center"
                    style={{ width: '72px', height: '72px', background: 'linear-gradient(135deg, #4f86f7, #9b6bf2)', boxShadow: '0 12px 28px rgba(123,111,245,0.4)' }}>
                    <step.icon size={26} className="text-white" />
                  </div>
                  <span className="absolute -top-2 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: '#081b3e', color: '#ffffff', border: '1.5px solid rgba(123,111,245,0.6)' }}>
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2.5" style={{ color: '#ffffff' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#c2d2ee' }}>{step.description}</p>
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
