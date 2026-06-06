'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

const PROJECTS = [
  {
    image:       '/screenshots/superiorgarage.png',
    url:         'https://superiorgarage.com.au',
    domain:      'superiorgarage.com.au',
    caseStudy:   '/work/superior-garage',
    industry:    'Automotive',
    title:       'Superior Garage',
    location:    'Malaga, WA',
    description: 'Mechanical workshop site with online booking, transparent pricing and 7-day service info — built to convert phone calls.',
  },
  {
    image:       '/screenshots/54fadez.png',
    url:         'https://54fadez.com.au',
    domain:      '54fadez.com.au',
    caseStudy:   '/work/54-fadez',
    industry:    'Barbershop',
    title:       '54 Fadez',
    location:    'Perth, WA',
    description: 'Modern barbershop site with online bookings, gallery and service menu — designed to fill the chairs and grow the brand.',
  },
  {
    image:       '/screenshots/airborne.png',
    url:         'https://www.airbornesuspensionandmechanical.com.au',
    domain:      'airbornesuspensionandmechanical.com.au',
    caseStudy:   '/work/airborne-suspension-mechanical',
    industry:    '4WD & Suspension',
    title:       'Airborne Suspension & Mechanical',
    location:    'Malaga, WA',
    description: 'Premium suspension and 4WD specialist site — showcasing decades of expertise, lift-kit builds and trusted local service.',
  },
  {
    image:       '/screenshots/aeandac.png',
    url:         'https://www.aeandacservicecenter.com.au',
    domain:      'aeandacservicecenter.com.au',
    caseStudy:   '/work/ae-ac-service-center',
    industry:    'Auto Electrical',
    title:       'AE & AC Service Center',
    location:    'Malaga, WA',
    description: 'Auto electrical and air-con specialist — workshop-grade diagnostics and clear service info built to earn trust online.',
  },
]

export default function Portfolio() {
  return (
    <section id="work" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">Our Work</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#ffffff' }}>
            Real Perth businesses,<br />live and online.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#c2d2ee' }}>
            A look at recent client websites — click through to see them live.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a key={p.title}
              href={p.url} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card group overflow-hidden block text-left"
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
                <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
                  style={{ background: 'rgba(0,0,0,0.2)', color: '#aebfe6', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {p.domain}
                </div>
                <ExternalLink size={12} style={{ color: '#8ba0c6' }} />
              </div>

              {/* Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: '#0e2a5e' }}>
                <img src={p.image} alt={p.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.style.display = 'none' }} />
                <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(8,27,62,0.85)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                  {p.industry}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-bold" style={{ color: '#ffffff' }}>{p.title}</h3>
                  <ArrowUpRight size={18} style={{ color: '#8ba0c6' }}
                    className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-xs font-medium mb-3 gradient-text inline-block">{p.location}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#c2d2ee' }}>{p.description}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#ffffff' }}>
                  Visit site
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12">
          <p className="text-sm" style={{ color: '#c2d2ee' }}>
            Want to be our next case study?{' '}
            <a href="#contact" className="font-semibold" style={{ color: '#ffffff' }}>Get in touch →</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
