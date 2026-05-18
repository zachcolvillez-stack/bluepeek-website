'use client'
import { motion } from 'framer-motion'
import { Globe, Sparkles, BarChart3, Megaphone } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Custom Websites',
    tag: 'Available Now',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    description: 'Beautiful, fast websites built to attract local customers and turn them into paying jobs. Looks great on every phone, easy for you to update.',
    points: [
      'Mobile-friendly & fast loading',
      'Built to rank on Google',
      'Designed around your brand',
      'Easy contact & booking forms',
    ],
    glow: 'rgba(59,130,246,0.08)',
    border: 'hover:border-blue-500/30',
  },
  {
    icon: Sparkles,
    title: 'Smart Automation',
    tag: 'Available Now',
    tagColor: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
    description: "Save hours every week with simple tools that handle enquiries, bookings, and customer questions — even when you're flat out on the job.",
    points: [
      'Auto-reply to enquiries',
      'Online booking systems',
      '24/7 chat assistant',
      'Frees up your time',
    ],
    glow: 'rgba(99,102,241,0.08)',
    border: 'hover:border-indigo-500/30',
  },
  {
    icon: BarChart3,
    title: 'SEO & Google Ads',
    tag: 'Coming Soon',
    tagColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
    description: 'Get found at the top of Google when locals search for your services. Paid and organic strategies built for Perth businesses.',
    points: [
      'Local SEO that works',
      'Google Ads management',
      'Monthly reports',
      'No long-term contracts',
    ],
    glow: 'rgba(30,58,95,0.05)',
    border: 'hover:border-slate-600/30',
    muted: true,
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    tag: 'Coming Soon',
    tagColor: 'text-slate-500 bg-slate-500/10 border-slate-500/20',
    description: 'Consistent, professional posts across Facebook and Instagram — keeping your business top of mind for local customers.',
    points: [
      'Content creation & posting',
      'Brand-consistent design',
      'Reply & engagement support',
      'Local growth strategies',
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
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>
            Everything Your Business<br />Needs to Grow Online
          </h2>
          <p className="text-slate-300 text-lg max-w-xl mx-auto"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>
            From your first website to smart automation — Bluepeek looks after the digital side so you can focus on running your business.
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
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                s.muted ? 'bg-white/5' : 'bg-blue-500/15'
              }`}>
                <s.icon size={22} className={s.muted ? 'text-slate-600' : 'text-blue-400'} />
              </div>

              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${s.tagColor}`}>
                {s.tag}
              </span>

              <h3 className={`text-xl font-bold mb-3 ${s.muted ? 'text-slate-500' : 'text-white'}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${s.muted ? 'text-slate-700' : 'text-slate-300'}`}>{s.description}</p>

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

        {/* Pricing nudge */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12">
          <p className="text-slate-300 text-base">
            Most websites <span className="text-white font-bold">from $1,500</span> — fixed pricing, no surprises.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
