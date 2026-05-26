'use client'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

const PROJECTS = [
  {
    image:       '/screenshots/superiorgarage.png',
    url:         'https://superiorgarage.com.au',
    domain:      'superiorgarage.com.au',
    industry:    'Automotive',
    title:       'Superior Garage',
    location:    'Malaga, WA',
    description: 'Mechanical workshop site with online booking, transparent pricing, and 7-day service info — built to convert phone calls.',
  },
  {
    image:       '/screenshots/54fadez.png',
    url:         'https://54fadez.com.au',
    domain:      '54fadez.com.au',
    industry:    'Barbershop',
    title:       '54 Fadez',
    location:    'Perth, WA',
    description: 'Modern barbershop site with online bookings, gallery and service menu — designed to fill the chairs and grow the brand.',
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>Our Work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#f5f5f7' }}>
            Real Perth businesses,<br />real results.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#8a8a93' }}>
            A look at recent client websites — live and bringing in customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p) => (
            <a key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group overflow-hidden block text-left"
            >
              {/* Browser-style chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#1a1a1e', borderBottom: '1px solid #232328' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
                  style={{ background: '#0a0a0c', color: '#8a8a93', border: '1px solid #232328' }}>
                  {p.domain}
                </div>
                <ExternalLink size={12} style={{ color: '#8a8a93' }} />
              </div>

              {/* Screenshot preview */}
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: '#0f0f12' }}>
                <img src={p.image} alt={p.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none' }} />
                <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ background: 'rgba(10,10,12,0.8)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)' }}>
                  {p.industry}
                </span>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-semibold" style={{ color: '#f5f5f7' }}>{p.title}</h3>
                  <ArrowUpRight size={18} style={{ color: '#8a8a93' }} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-xs mb-3" style={{ color: '#22d3ee' }}>{p.location}</p>
                <p className="text-sm leading-relaxed" style={{ color: '#8a8a93' }}>{p.description}</p>
                <p className="text-xs mt-4 font-medium" style={{ color: '#22d3ee' }}>Visit site →</p>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm" style={{ color: '#8a8a93' }}>
            Want to be our next case study?{' '}
            <a href="#contact" className="font-semibold" style={{ color: '#22d3ee' }}>Get in touch →</a>
          </p>
        </div>
      </div>
    </section>
  )
}
