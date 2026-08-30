'use client'
import { motion } from 'framer-motion'
import { reveal, revealFrom } from '../lib/motion'

/* Our story — the two people behind Blue Peek.
   Facts only: names, ages, where they're from. No invented backstory. */

const FOUNDERS = [
  { name: 'Jac',     age: 22, from: 'Wales',   photo: '/founders/jac.jpg' },
  { name: 'Zachary', age: 21, from: 'England', photo: '/founders/zach.jpg' },
]

export default function Founders() {
  return (
    <section id="our-story" className="relative px-6 py-24 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-20 items-center">

        {/* Photos */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {FOUNDERS.map((f, i) => (
            <motion.figure key={f.name} {...revealFrom(i === 0 ? 'left' : 'right', i * 0.1)}
              className={i === 1 ? 'sm:mt-10' : ''}>
              <div className="relative rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-lg)', aspectRatio: '3 / 4' }}>
                <img src={f.photo} alt={`${f.name}, co-founder of Blue Peek`}
                  className="w-full h-full object-cover" loading="lazy" width={900} height={1200} />
              </div>
              <figcaption className="mt-3">
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{f.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{f.age} · from {f.from}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Story */}
        <div>
          <motion.h2 {...reveal(0)} className="font-display text-3xl md:text-4xl lg:text-5xl mb-6">
            Two of us. <span className="text-lapiz">That&rsquo;s the whole company.</span>
          </motion.h2>

          <motion.div {...reveal(0.08)} className="space-y-5 text-base md:text-lg leading-relaxed" style={{ color: 'var(--text)' }}>
            <p>
              Blue Peek is Jac and Zachary — 22 and 21, one from Wales and one from England,
              both now building websites for Australian businesses.
            </p>
            <p>
              That size is the point. When you call, you get one of the two people who
              actually built your site. There&rsquo;s no account manager passing your
              question down a chain, and nothing gets outsourced to someone you&rsquo;ll never speak to.
            </p>
            <p>
              We&rsquo;ve built for painters, spas, barbers, mechanics, florists and butchers
              across Australia. Every one of them owns their site outright, with no lock-in contract.
            </p>
          </motion.div>

          <motion.div {...reveal(0.16)} className="flex flex-col sm:flex-row gap-3 mt-9">
            <a href="#contact" className="btn-primary flex items-center justify-center px-7 py-3.5 rounded-full text-sm">
              Talk to us directly
            </a>
            <a href="/about" className="btn-secondary flex items-center justify-center px-7 py-3.5 rounded-full text-sm">
              More about Blue Peek
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
