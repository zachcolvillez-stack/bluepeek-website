'use client'
import { motion } from 'framer-motion'
import { Globe, Sparkles, BarChart3, Megaphone } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Custom Websites',
    tag: 'Available Now',
    tagColor: 'text-blue-600 bg-blue-50 border-blue-200',
    description: 'Beautiful, fast websites built to attract local customers and turn them into paying jobs. Looks great on every phone, easy for you to update.',
    points: ['Mobile-friendly & fast loading', 'Built to rank on Google', 'Designed around your brand', 'Easy contact & booking forms'],
    border: 'hover:border-blue-300',
  },
  {
    icon: Sparkles,
    title: 'Smart Automation',
    tag: 'Available Now',
    tagColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    description: "Save hours every week with simple tools that handle enquiries, bookings, and customer questions — even when you're flat out on the job.",
    points: ['Auto-reply to enquiries', 'Online booking systems', '24/7 chat assistant', 'Frees up your time'],
    border: 'hover:border-indigo-300',
  },
  {
    icon: BarChart3,
    title: 'SEO & Google Ads',
    tag: 'Coming Soon',
    tagColor: 'text-slate-500 bg-slate-100 border-slate-200',
    description: 'Get found at the top of Google when locals search for your services. Paid and organic strategies built for local businesses.',
    points: ['Local SEO that works', 'Google Ads management', 'Monthly reports', 'No long-term contracts'],
    muted: true,
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    tag: 'Coming Soon',
    tagColor: 'text-slate-500 bg-slate-100 border-slate-200',
    description: 'Consistent, professional posts across Facebook and Instagram — keeping your business top of mind for local customers.',
    points: ['Content creation & posting', 'Brand-consistent design', 'Reply & engagement support', 'Local growth strategies'],
    muted: true,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">What We Do</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Everything Your Business<br />Needs to Grow Online
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
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
                  ? 'bg-white/60 backdrop-blur-md border-slate-200 opacity-70'
                  : `bg-white/90 backdrop-blur-md border-slate-200 ${s.border}`
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                s.muted ? 'bg-slate-100' : 'bg-blue-50'
              }`}>
                <s.icon size={22} className={s.muted ? 'text-slate-400' : 'text-blue-500'} />
              </div>

              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${s.tagColor}`}>
                {s.tag}
              </span>

              <h3 className={`text-xl font-bold mb-3 ${s.muted ? 'text-slate-500' : 'text-slate-900'}`}>{s.title}</h3>
              <p className={`text-sm leading-relaxed mb-6 ${s.muted ? 'text-slate-400' : 'text-slate-600'}`}>{s.description}</p>

              <ul className="space-y-2">
                {s.points.map(p => (
                  <li key={p} className={`flex items-center gap-2.5 text-sm ${s.muted ? 'text-slate-400' : 'text-slate-600'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.muted ? 'bg-slate-300' : 'bg-blue-500'}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12">
          <p className="text-slate-600 text-base">
            Most websites <span className="text-slate-900 font-bold">from $1,500</span> — fixed pricing, no surprises.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
