'use client'
import { motion } from 'framer-motion'
import { Globe, Sparkles, Search, Megaphone, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Custom Websites',
    tag: 'Core Offer',
    featured: true,
    description: 'High-converting, mobile-first websites designed to turn visitors into paying customers — and built to rank on Google.',
    points: ['Designed around your brand', 'Built to rank locally', 'Lightning-fast & mobile-first', 'Yours to own — no lock-in'],
  },
  {
    icon: Sparkles,
    title: 'AI & Smart Automation',
    tag: 'Core Offer',
    featured: true,
    description: 'Lead-capture systems and AI assistants that answer enquiries, book jobs and follow up — even when you’re on the tools.',
    points: ['24/7 AI enquiry assistant', 'Automatic lead follow-up', 'Online booking systems', 'Never miss a customer'],
  },
  {
    icon: Search,
    title: 'SEO & Google Ads',
    tag: 'Available',
    featured: false,
    description: 'Get found at the top of Google when locals search for what you do — paid and organic, built for Perth.',
    points: ['Local SEO that works', 'Google Ads management', 'Clear monthly reporting'],
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    tag: 'Available',
    featured: false,
    description: 'Consistent, professional posts that keep your business top of mind across Facebook and Instagram.',
    points: ['Content creation & posting', 'Brand-consistent design', 'Local growth strategies'],
  },
]

export default function Services() {
  return (
    <section id="services" className="section-soft relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">What We Do</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#ffffff' }}>
            Everything your business<br />needs to win online.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#c2d2ee' }}>
            From a premium website to AI that captures every lead — we handle the digital side so you can focus on the work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-8 relative overflow-hidden"
              style={s.featured ? { borderColor: 'rgba(123,111,245,0.4)' } : {}}
            >
              {s.featured && (
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #4f86f7, #9b6bf2)' }} />
              )}

              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={s.featured
                    ? { background: 'linear-gradient(135deg, #4f86f7, #9b6bf2)', boxShadow: '0 8px 20px rgba(123,111,245,0.4)' }
                    : { background: 'rgba(255,255,255,0.08)' }}>
                  <s.icon size={22} className="text-white" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={s.featured
                    ? { background: 'rgba(123,111,245,0.18)', color: '#c9bcff', border: '1px solid rgba(123,111,245,0.35)' }
                    : { background: 'rgba(255,255,255,0.06)', color: '#8ba0c6' }}>
                  {s.tag}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2.5" style={{ color: '#ffffff' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#c2d2ee' }}>{s.description}</p>

              <ul className="space-y-2.5">
                {s.points.map(p => (
                  <li key={p} className="flex items-center gap-3 text-sm" style={{ color: '#e3ebf9' }}>
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg, #4f86f7, #9b6bf2)' }} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12">
          <a href="#contact" className="inline-flex items-center gap-2 font-semibold text-sm group" style={{ color: '#aebfe6' }}>
            Not sure what you need? Get a free quote
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
