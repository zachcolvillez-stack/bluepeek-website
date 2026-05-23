'use client'
import { motion } from 'framer-motion'
import { MapPin, Clock, ShieldCheck, Phone } from 'lucide-react'

const PILLARS = [
  { icon: MapPin,      title: 'Local & Personable', description: "We work with Perth businesses. Real people, real conversations, and a coffee in person if you're nearby." },
  { icon: Clock,       title: 'Fast Turnaround',    description: 'Most websites delivered in 1–2 weeks. No drawn-out months of waiting — just honest, fast work.' },
  { icon: ShieldCheck, title: 'You Own Everything', description: 'No lock-in contracts. You own your domain, your site, your content — walk away any time.' },
  { icon: Phone,       title: 'Direct Access',      description: "You talk to me directly. No account managers, no offshore teams. The person building your site is the person answering your messages." },
]

export default function WhyUs() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>Why Bluepeek</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#f5f5f7' }}>
            A different kind<br />of web designer.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#8a8a93' }}>
            Big agencies charge big prices and treat you like a number. We're built differently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card flex gap-5 p-7"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,211,238,0.1)' }}>
                <p.icon size={19} style={{ color: '#22d3ee' }} />
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#f5f5f7' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8a8a93' }}>{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="card text-center p-10"
        >
          <div className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center"
            style={{ background: '#22d3ee' }}>
            <span className="text-2xl font-black" style={{ color: '#0a0a0c' }}>b</span>
          </div>
          <p className="text-base md:text-lg leading-relaxed max-w-lg mx-auto" style={{ color: '#b4b4bb' }}>
            "I started Bluepeek because too many great local businesses were being held back by terrible (or no) websites. Every business deserves a digital presence that actually works — without paying agency prices."
          </p>
          <p className="text-sm mt-5" style={{ color: '#22d3ee' }}>— Zach, Founder of Bluepeek</p>
        </motion.div>
      </div>
    </section>
  )
}
