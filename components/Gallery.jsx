'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CLIENT_SITES } from '../lib/site'
import GalleryGrid from './GalleryGrid'

/* Homepage teaser — shows a handful of live sites, links to the full /gallery page. */
export default function Gallery() {
  const preview = CLIENT_SITES.slice(0, 6)
  return (
    <section id="gallery" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">Gallery</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#ffffff' }}>
            A snapshot of our<br />client websites.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#c2d2ee' }}>
            Real Perth businesses, live online — tap any to visit, or browse the full gallery.
          </p>
        </motion.div>

        <GalleryGrid sites={preview} />

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12">
          <Link href="/gallery" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold">
            View the full gallery <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
