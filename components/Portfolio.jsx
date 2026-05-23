'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

const PROJECTS = [
  { image: '/screenshots/cafe.png',       industry: 'Hospitality', title: 'Brew & Bean Cafe',      location: 'Subiaco',     description: 'Online menu, table reservations and Instagram feed — built mobile-first for walk-by traffic.' },
  { image: '/screenshots/plumber.png',    industry: 'Trade',       title: 'Reilly Plumbing & Gas', location: 'Joondalup',   description: 'Quote-first design with click-to-call buttons — built for tradies who need leads, fast.' },
  { image: '/screenshots/salon.png',      industry: 'Beauty',      title: 'Indigo Hair Studio',    location: 'Fremantle',   description: 'Premium booking system, treatment menu and stylist portfolios — fully self-service.' },
  { image: '/screenshots/restaurant.png', industry: 'Restaurant',  title: 'The Long Table',        location: 'Northbridge', description: 'Full reservation flow, seasonal menu updates and integrated online ordering.' },
]

export default function Portfolio() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="work" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>Our Work</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#f5f5f7' }}>
            Built for real<br />Perth businesses.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#8a8a93' }}>
            A snapshot of recent homepage designs across different industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.button key={p.title} onClick={() => setLightbox(p)}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card group overflow-hidden cursor-pointer block text-left"
            >
              {/* Browser-style chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#1a1a1e', borderBottom: '1px solid #232328' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
                  style={{ background: '#0a0a0c', color: '#8a8a93', border: '1px solid #232328' }}>
                  {p.title.toLowerCase().replace(/[^a-z]/g, '')}.com.au
                </div>
              </div>

              {/* Screenshot preview */}
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: '#0f0f12' }}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ background: 'rgba(10,10,12,0.8)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.2)' }}>
                  {p.industry}
                </span>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-semibold" style={{ color: '#f5f5f7' }}>{p.title}</h3>
                  <ArrowUpRight size={18} style={{ color: '#8a8a93' }} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-xs mb-3" style={{ color: '#22d3ee' }}>{p.location}, WA</p>
                <p className="text-sm leading-relaxed" style={{ color: '#8a8a93' }}>{p.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12">
          <p className="text-sm" style={{ color: '#8a8a93' }}>
            Want to be our next case study?{' '}
            <a href="#contact" className="font-semibold" style={{ color: '#22d3ee' }}>Get in touch →</a>
          </p>
          <p className="text-[10px] mt-3" style={{ color: '#5a5a62' }}>Example projects shown for illustration purposes.</p>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(8px)' }}
          >
            <button onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#f5f5f7' }}>
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full rounded-xl overflow-hidden shadow-2xl cursor-default"
              style={{ background: '#131316', border: '1px solid #232328' }}
            >
              <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#1a1a1e', borderBottom: '1px solid #232328' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#3a3a42' }} />
                <div className="flex-1 mx-3 px-3 py-0.5 text-[11px] rounded text-center font-mono"
                  style={{ background: '#0a0a0c', color: '#8a8a93' }}>
                  {lightbox.title.toLowerCase().replace(/[^a-z]/g, '')}.com.au
                </div>
              </div>
              <img src={lightbox.image} alt={lightbox.title} className="w-full h-auto" />
              <div className="p-5">
                <h3 className="font-semibold" style={{ color: '#f5f5f7' }}>{lightbox.title}</h3>
                <p className="text-xs mt-1" style={{ color: '#8a8a93' }}>{lightbox.industry} · {lightbox.location}, WA</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
