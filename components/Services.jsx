'use client'
import { motion } from 'framer-motion'
import { Globe, Bot, BarChart3, Megaphone } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Website Design & Development',
    tag: 'Available Now',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    description: 'Custom-built, lightning-fast websites that look premium and turn visitors into paying customers.',
    points: [
      'Mobile-first & fully responsive',
      'Built for speed & Google rankings',
      'Designed around your brand',
      'Enquiry & booking integrations',
    ],
    glow: 'rgba(59,130,246,0.08)',
    border: 'hover:border-blue-500/30',
  },
  {
    icon: Bot,
    title: 'AI Integration',
    tag: 'Available Now',
    tagColor: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    description: 'Intelligent AI tools built directly into your website — automating enquiries, bookings, and customer service 24/7.',
    points: [
      'AI chatbots that qualify leads',
      'Automated enquiry responses',
      'Smart booking systems',
      'Works while you sleep',
    ],
    glow: 'rgba(99,102,241,0.08)',
    border: 'hover:border-indigo-500/30',
  },
  {
    icon: BarChart3,
    title: 'SEO & Google Ads',
    tag: 'Coming Soon',
    tagColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
    description: 'Get found at the top of Google when locals search for your services. Paid and organic strategies tailored for Perth.',
    points: [
      'Local SEO optimisation',
      'Google Ads management',
      'Monthly performance reports',
      'Keyword & competitor research',
    ],
    glow: 'rgba(30,58,95,0.05)',
    border: 'hover:border-slate-600/30',
    muted: true,
  },
  {
    icon: Megaphone,
    title: 'Social Media & Content',
    tag: 'Coming Soon',
    tagColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
    description: 'Consistent, professional content across Facebook and Instagram — keeping your business top of mind for local customers.',
    points: [
      'Content creation & scheduling',
      'Brand-consistent design',
      'Community management',
      'Growth strategies',
    ],
    glow: 'rgba(30,58,95,0.05)',
    border: 'hover:border-slate-600/30',
    muted: true,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
            Everything Your Business<br />Needs to Win Online
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            From your first website to full AI automation — Bluepeek handles the digital side so you can focus on running your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 border transition-all duration-300 card-glow ${
                s.muted
                  ? 'bg-[#0a1628]/50 backdrop-blur-md border-white/5 opacity-60'
                  : `bg-[#0a1628]/80 backdrop-blur-md border-white/8 ${s.border}`
              }`}
              style={{ boxShadow: `inset 0 0 60px ${s.glow}` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                s.muted ? 'bg-white/5' : 'bg-blue-500/15'
              }`}>
                <s.icon size={22} className={s.muted ? 'text-slate-600' : 'text-blue-400'} />
              </div>

              {/* Tag */}
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${s.tagColor}`}>
                {s.tag}
              </span>

              <h3 className={`text-xl font-bold mb-3 ${s.muted ? 'text-slate-500' : 'text-white'}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${s.muted ? 'text-slate-700' : 'text-slate-400'}`}>{s.description}</p>

              <ul className="space-y-2">
                {s.points.map(p => (
                  <li key={p} className={`flex items-center gap-2.5 text-sm ${s.muted ? 'text-slate-700' : 'text-slate-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.muted ? 'bg-slate-700' : 'bg-blue-500'}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
