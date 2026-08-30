'use client'
import { motion } from 'framer-motion'
import { reveal, revealFrom } from '../lib/motion'

/* Our story — the two people behind Blue Peek.
   Photos side by side on top, the story underneath.
   Facts only: names, ages, where they're from. No invented backstory. */

const FOUNDERS = [
  { name: 'Zachary', age: 21, from: 'England', role: 'Co-Founder',            photo: '/founders/zach.jpg' },
  { name: 'Jac',     age: 22, from: 'Wales',   role: 'Founder',               photo: '/founders/jac.jpg' },
]

export default function Founders() {
  return (
    <section id="our-story" className="relative px-6 py-24 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto">

        <motion.h2 {...reveal(0)} className="font-display text-3xl md:text-4xl lg:text-5xl text-center mb-3">
          Two of us. <span className="text-lapiz">That&rsquo;s the whole company.</span>
        </motion.h2>
        <motion.p {...reveal(0.06)} className="text-center text-base md:text-lg mb-14 max-w-2xl mx-auto"
          style={{ color: 'var(--text)' }}>
          No account managers, no outsourcing. When you call, you get one of the two people who built your site.
        </motion.p>

        {/* Photos */}
        <div className="grid grid-cols-2 gap-5 sm:gap-8 max-w-2xl mx-auto">
          {FOUNDERS.map((f, i) => (
            <motion.figure key={f.name} {...revealFrom(i === 0 ? 'left' : 'right', i * 0.1)}>
              <div className="relative rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-lg)', aspectRatio: '4 / 5' }}>
                <img src={f.photo} alt={`${f.name}, ${f.role} of Blue Peek`}
                  className="w-full h-full object-cover" loading="lazy" width={900} height={1200} />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="text-base font-semibold" style={{ color: 'var(--ink)' }}>{f.name}</p>
                <p className="text-sm mt-0.5" style={{ color: 'var(--lapiz)' }}>{f.role}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{f.age} · from {f.from}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Story underneath */}
        <motion.div {...reveal(0.12)}
          className="mt-16 max-w-2xl mx-auto space-y-5 text-base md:text-lg leading-relaxed"
          style={{ color: 'var(--text)' }}>
          <p>
            Blue Peek is Jac and Zachary — 22 and 21, one from Wales and one from England,
            both now building websites for Australian businesses.
          </p>
          <p>
            That size is the point. There&rsquo;s no chain for your question to travel down, and
            nothing gets handed to someone you&rsquo;ll never speak to. The person who picks up
            the phone is the person who wrote the code.
          </p>
          <p>
            We&rsquo;ve built for painters, spas, barbers, mechanics, concreters, florists and
            butchers across Australia. Every one of them owns their site outright, with no
            lock-in contract.
          </p>
        </motion.div>

        <motion.div {...reveal(0.18)} className="flex flex-col sm:flex-row justify-center gap-3 mt-11">
          <a href="#contact" className="btn-primary flex items-center justify-center px-8 py-4 rounded-full text-sm">
            Talk to us directly
          </a>
          <a href="/about" className="btn-secondary flex items-center justify-center px-8 py-4 rounded-full text-sm">
            More about Blue Peek
          </a>
        </motion.div>
      </div>
    </section>
  )
}
