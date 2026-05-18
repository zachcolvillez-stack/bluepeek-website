'use client'
import { motion } from 'framer-motion'
import { MapPin, Clock, ShieldCheck, Phone } from 'lucide-react'

const PILLARS = [
  {
    icon: MapPin,
    title: 'Perth Local',
    description: "We&apos;re based right here in Perth. We understand the local market, local customers, and what Perth businesses actually need.",
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Most projects delivered in 1–2 weeks. No endless back-and-forth, no months of waiting — just fast, quality work.',
  },
  {
    icon: ShieldCheck,
    title: 'You Own Everything',
    description: 'No lock-in contracts. You own your website, your domain, and your content. Walk away any time — no strings attached.',
  },
  {
    icon: Phone,
    title: 'Direct Access',
    description: "You deal with us directly — no account managers, no outsourcing. The person building your site is the person answering your messages.",
  },
]

export default function WhyUs() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Why Bluepeek</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            A Different Kind of<br />Digital Studio
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Big agencies charge big prices and treat you like a number. We&apos;re built differently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {PILLARS.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 p-7 rounded-2xl bg-[#0a1628]/80 backdrop-blur-md border border-white/8 hover:border-blue-500/20 card-glow transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                <p.icon size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: p.description.replace(/&apos;/g, "'") }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Founder note */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="text-center p-8 rounded-2xl border border-white/5 bg-[#040d1a]/70 backdrop-blur-md"
        >
          <img src="/logo.png" alt="Bluepeek" className="w-14 h-14 mx-auto mb-4 object-contain" />
          <p className="text-slate-300 text-sm leading-relaxed max-w-lg mx-auto">
            &ldquo;I started Bluepeek because I saw too many great local Perth businesses being invisible online.
            Every business deserves a digital presence that actually works for them.&rdquo;
          </p>
          <p className="text-slate-600 text-xs mt-4">Zach — Founder, Bluepeek</p>
        </motion.div>
      </div>
    </section>
  )
}
