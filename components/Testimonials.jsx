'use client'
import { motion } from 'framer-motion'
import { PhoneCall, Sparkles, Clock, CheckCircle2 } from 'lucide-react'

const PAINS = [
  {
    icon: PhoneCall,
    pain: '“I need more calls and enquiries.”',
    solution: 'We build websites designed to convert — clear calls-to-action, click-to-call buttons and lead capture that turn visitors into real enquiries.',
  },
  {
    icon: Sparkles,
    pain: '“My current website looks outdated.”',
    solution: 'A premium, modern site that makes you look as professional as you are — and instantly more trustworthy than your competitors.',
  },
  {
    icon: Clock,
    pain: '“I don’t have time to chase enquiries.”',
    solution: 'AI assistants and automations reply, qualify and follow up for you — so leads never go cold while you’re on the job.',
  },
  {
    icon: CheckCircle2,
    pain: '“I just want something simple that works.”',
    solution: 'No jargon, no lock-in contracts, no months of waiting. Most sites go live in 1–2 weeks and you own everything.',
  },
]

export default function Testimonials() {
  return (
    <section id="solutions" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">Built For Local Owners</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#0c1c34' }}>
            We solve the problems<br />local businesses actually have.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#475569' }}>
            If any of these sound familiar, you’re exactly who Blue Peek builds for.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PAINS.map((p, i) => (
            <motion.div key={p.pain}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-7"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(47,95,208,0.09)' }}>
                  <p.icon size={20} style={{ color: '#16335c' }} />
                </div>
                <div>
                  <p className="text-lg font-bold mb-2 leading-snug" style={{ color: '#0c1c34' }}>{p.pain}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider mt-1 flex-shrink-0 gradient-text">Fixed</span>
                    <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{p.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
