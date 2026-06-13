'use client'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

/* Reusable grid of live client-site cards (browser chrome + screenshot). */
export default function GalleryGrid({ sites = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map((c, i) => (
        <motion.a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
          className="card group overflow-hidden text-left flex flex-col"
        >
          {/* Browser chrome bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.25)' }} />
            <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
              style={{ background: 'rgba(0,0,0,0.2)', color: '#aebfe6', border: '1px solid rgba(255,255,255,0.08)' }}>
              {c.url.replace(/^https?:\/\/(www\.)?/, '')}
            </div>
            <ExternalLink size={12} style={{ color: '#8ba0c6' }} />
          </div>

          {/* Screenshot */}
          <div className="relative aspect-[16/10] overflow-hidden" style={{ background: '#0e2a5e' }}>
            <img src={c.image} alt={`${c.title} — ${c.industry} website in ${c.location} built by Bluepeek`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(8,27,62,0.85)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
              {c.industry}
            </span>
          </div>

          {/* Caption */}
          <div className="px-5 py-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold" style={{ color: '#ffffff' }}>{c.title}</h3>
              <p className="text-xs" style={{ color: '#8ba0c6' }}>{c.location}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap" style={{ color: '#aebfe6' }}>
              Visit <ExternalLink size={12} />
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  )
}
