'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

const PROJECTS = [
  {
    image:       '/screenshots/jasmine.png',
    url:         'https://jasminehealthandspa.com.au',
    domain:      'jasminehealthandspa.com.au',
    caseStudy:   '/work/jasmine-health-and-spa',
    industry:    'Health & Spa',
    title:       'Jasmine Health & Spa',
    location:    'Ascot, Perth WA',
    description: 'Authentic Thai wellness and massage site — a calm, premium design with a full treatment menu, vouchers and easy online booking.',
  },
  {
    image:       '/screenshots/bluestar.png',
    url:         'https://bluestarmechanics.com.au',
    domain:      'bluestarmechanics.com.au',
    caseStudy:   '/work/bluestar-mechanics',
    industry:    'Mechanic',
    title:       'Bluestar Mechanics',
    location:    'Coburg, VIC',
    description: 'Family-owned mechanic site for all makes and models — servicing, roadworthy certificates and diagnostics, built to earn local trust.',
  },
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
]

function BrowserChrome({ domain }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: '#f7f9fc', borderBottom: '1px solid rgba(12,28,52,0.08)' }}>
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#d4dcea' }} />
      <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
        style={{ background: '#ffffff', color: '#7e8aa0', border: '1px solid rgba(12,28,52,0.08)' }}>
        {domain}
      </div>
      <ExternalLink size={12} style={{ color: '#a9b6c8' }} />
    </div>
  )
}

function IndustryTag({ children }) {
  return (
    <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(255,255,255,0.92)', color: '#0c1c34', border: '1px solid rgba(12,28,52,0.10)', backdropFilter: 'blur(8px)' }}>
      {children}
    </span>
  )
}

export default function Portfolio() {
  const [featured, ...rest] = PROJECTS
  return (
    <section id="work" className="section-soft relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">Our Work</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#0c1c34' }}>
            Real local businesses,<br />live and online.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#475569' }}>
            A selection of recent websites Blue Peek has built — click through to see each one live.
          </p>
        </motion.div>

        {/* Featured project — large, two-column */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="card group overflow-hidden grid md:grid-cols-2 mb-6">
          <a href={featured.url} target="_blank" rel="noopener noreferrer" className="block order-1 md:order-none">
            <BrowserChrome domain={featured.domain} />
            <div className="relative aspect-[16/11] md:aspect-auto md:h-full overflow-hidden" style={{ background: '#eff4fb' }}>
              <img src={featured.image} alt={`${featured.title} — ${featured.industry} website built by Blue Peek`}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.currentTarget.style.display = 'none' }} />
              <IndustryTag>{featured.industry}</IndustryTag>
            </div>
          </a>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: '#1b3c70' }}>Featured Project</span>
            <h3 className="text-2xl font-bold mb-1.5" style={{ color: '#0c1c34' }}>{featured.title}</h3>
            <p className="text-sm font-medium mb-4" style={{ color: '#2f5fd0' }}>{featured.location}</p>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#475569' }}>{featured.description}</p>
            <div className="flex items-center gap-4">
              <Link href={featured.caseStudy} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#0c1c34' }}>
                View case study <ArrowUpRight size={15} />
              </Link>
              <a href={featured.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: '#7e8aa0' }}>
                Visit site <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Remaining projects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card group overflow-hidden text-left flex flex-col"
            >
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block">
                <BrowserChrome domain={p.domain} />
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: '#eff4fb' }}>
                  <img src={p.image} alt={`${p.title} — ${p.industry} website in ${p.location} built by Blue Peek`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  <IndustryTag>{p.industry}</IndustryTag>
                </div>
              </a>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0c1c34' }}>{p.title}</h3>
                <p className="text-xs font-medium mb-3" style={{ color: '#2f5fd0' }}>{p.location}</p>
                <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: '#475569' }}>{p.description}</p>
                <div className="flex items-center gap-4">
                  <Link href={p.caseStudy} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: '#0c1c34' }}>
                    Case study <ArrowUpRight size={14} />
                  </Link>
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: '#7e8aa0' }}>
                    Visit <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 mt-12">
          <Link href="/gallery" className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm">
            See the full gallery <ArrowUpRight size={15} />
          </Link>
          <p className="text-sm" style={{ color: '#475569' }}>
            Want to be our next case study?{' '}
            <a href="#contact" className="font-semibold" style={{ color: '#0c1c34' }}>Get in touch →</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
