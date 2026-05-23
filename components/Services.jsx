'use client'
import { Globe, Sparkles, BarChart3, Megaphone } from 'lucide-react'

const SERVICES = [
  {
    icon: Globe,
    title: 'Custom Websites',
    tag: 'Available Now',
    description: 'Fast, mobile-friendly websites built to turn local visitors into paying customers. Yours to own from day one.',
    points: ['Mobile-first & fast loading', 'Built to rank on Google', 'Designed around your brand', 'Easy contact & booking forms'],
    available: true,
  },
  {
    icon: Sparkles,
    title: 'Smart Automation',
    tag: 'Available Now',
    description: "Save hours each week with tools that handle enquiries, bookings, and FAQs — even when you're on the tools.",
    points: ['Auto-reply to enquiries', 'Online booking systems', '24/7 AI chat assistant', 'Frees up your time'],
    available: true,
  },
  {
    icon: BarChart3,
    title: 'SEO & Google Ads',
    tag: 'Coming Soon',
    description: 'Get found at the top of Google when locals search for your services. Paid and organic — built for Perth.',
    points: ['Local SEO that works', 'Google Ads management', 'Monthly reports', 'No long-term contracts'],
    available: false,
  },
  {
    icon: Megaphone,
    title: 'Social Media',
    tag: 'Coming Soon',
    description: 'Consistent, professional posts across Facebook and Instagram — keeping your business top of mind locally.',
    points: ['Content creation & posting', 'Brand-consistent design', 'Reply & engagement support', 'Local growth strategies'],
    available: false,
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>What We Do</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#f5f5f7' }}>
            Everything your business<br />needs to grow online.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#8a8a93' }}>
            From your first website to smart automation — we handle the digital side so you can focus on the work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SERVICES.map((s) => (
            <div key={s.title} className="card p-8" style={!s.available ? { opacity: 0.55 } : {}}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: s.available ? 'rgba(34,211,238,0.1)' : 'rgba(255,255,255,0.04)' }}>
                  <s.icon size={20} style={{ color: s.available ? '#22d3ee' : '#8a8a93' }} />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full"
                  style={s.available
                    ? { background: 'rgba(34,211,238,0.08)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)' }
                    : { background: 'rgba(255,255,255,0.04)', color: '#8a8a93', border: '1px solid #232328' }}>
                  {s.tag}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3" style={{ color: '#f5f5f7' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#8a8a93' }}>{s.description}</p>

              <ul className="space-y-2.5">
                {s.points.map(p => (
                  <li key={p} className="flex items-center gap-3 text-sm" style={{ color: '#b4b4bb' }}>
                    <div className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: s.available ? '#22d3ee' : '#3a3a42' }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-sm" style={{ color: '#8a8a93' }}>
            Every project tailored to your business — <a href="#contact" className="font-semibold" style={{ color: '#22d3ee' }}>get a free quote</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
