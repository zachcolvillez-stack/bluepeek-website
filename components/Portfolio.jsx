'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const PROJECTS = [
  { image: '/screenshots/cafe.png',       industry: 'Hospitality', title: 'Brew & Bean Cafe',      location: 'Subiaco',    description: 'Online menu, table reservations and Instagram feed — built mobile-first for walk-by traffic.', href: '/examples/cafe' },
  { image: '/screenshots/plumber.png',    industry: 'Trade',       title: 'Reilly Plumbing & Gas', location: 'Joondalup',  description: 'Quote-first design with click-to-call buttons — built for tradies who need leads, fast.',       href: '/examples/plumber' },
  { image: '/screenshots/salon.png',      industry: 'Beauty',      title: 'Indigo Hair Studio',    location: 'Fremantle',  description: 'Premium booking system, treatment menu and stylist portfolios — fully self-service.',         href: '/examples/salon' },
  { image: '/screenshots/restaurant.png', industry: 'Restaurant',  title: 'The Long Table',        location: 'Northbridge',description: 'Full reservation flow, seasonal menu updates and integrated online ordering.',                href: '/examples/restaurant' },
]

export default function Portfolio() {
  return (
    <section id="work" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-4">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-5">
            Built for Real<br />Local Businesses
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Click any project to view the live demo — fully designed homepages built for real industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 card-glow cursor-pointer block"
            >
              {/* Browser-style chrome bar */}
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 border-b border-slate-200">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] text-slate-500 bg-white rounded text-center font-mono truncate">
                  bluepeek.com.au{p.href}
                </div>
              </div>

              {/* Screenshot */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-50">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-slate-700 border border-slate-200 shadow-sm">
                  {p.industry}
                </span>
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 px-5 py-2.5 bg-white text-blue-600 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    View Live Demo →
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  <ArrowUpRight size={18} className="text-slate-400 group-hover:text-blue-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
                <p className="text-xs text-slate-500 mb-3">{p.location}, WA</p>
                <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10">
          <p className="text-sm text-slate-600">
            Want to be our next case study?{' '}
            <a href="#contact" className="text-blue-600 hover:text-blue-700 font-medium">Get in touch →</a>
          </p>
          <p className="text-[10px] text-slate-400 mt-3">Example projects shown for illustration purposes.</p>
        </motion.div>
      </div>
    </section>
  )
}
