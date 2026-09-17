'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { REVIEW_AGG } from '../lib/reviews'

export default function Hero({ onCTA }) {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center pt-36 px-6">
      {/* ── Statement ── */}
      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.h1 initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.08] mb-6"
          style={{ color: '#0c1c34', letterSpacing: '-0.01em' }}>
          Websites that make local businesses look established.
        </motion.h1>

        <motion.p initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}
          className="text-[22px] leading-[1.5] mb-5 mx-auto max-w-2xl" style={{ color: '#475569' }}>
          Clean, professional websites and smart lead-capture systems for Australian businesses.
        </motion.p>

        <motion.p transition={{ duration: 0.6, delay: 0.14 }}
          className="text-sm mb-9" style={{ color: '#7e8aa0' }}>
          {REVIEW_AGG.ratingValue} from {REVIEW_AGG.reviewCount} Google reviews
          <span className="mx-2">·</span>
          13+ Australian businesses live
        </motion.p>

        <motion.div initial={{ y: 14 }} animate={{ y: 0 }} transition={{ duration: 0.6, delay: 0.16 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => onCTA('contact')}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold w-full sm:w-auto justify-center transition-opacity hover:opacity-90"
            style={{ background: '#0c1c34', color: '#ffffff', border: '1px solid transparent' }}>
            Get a Website
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button onClick={() => onCTA('work')}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold w-full sm:w-auto justify-center transition-colors"
            style={{ background: 'transparent', color: '#0c1c34', border: '1px solid #0c1c34' }}>
            View Our Work
          </button>
        </motion.div>
      </div>

      {/* ── The work itself, shown plainly ── */}
      <motion.div initial={{ y: 20 }} animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-5xl mt-16">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl"
          style={{ background: '#eff4fb' }}>
          <Image src="/screenshots/jasmine.webp" alt="Jasmine Health and Spa, a website Blue Peek designed for a local business in Ascot, Perth"
            fill sizes="(max-width: 1024px) 100vw, 1024px" priority
            className="object-cover object-top" />
        </div>
        <p className="text-sm mt-4 text-center" style={{ color: '#7e8aa0' }}>
          <a href="https://jasminehealthandspa.com.au" target="_blank" rel="noopener noreferrer"
            className="transition-colors hover:underline">
            Jasmine Health &amp; Spa, Ascot WA
          </a>
        </p>
      </motion.div>
    </section>
  )
}
