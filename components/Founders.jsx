'use client'
import { motion } from 'framer-motion'
import { reveal, revealFrom } from '../lib/motion'

/* Our story — the two people behind Bluepeek.
   Photos side by side on top, the story underneath.
   Facts only: names, ages, where they're from. No invented backstory. */

/** Inline flag. PNG rather than emoji — subdivision flags do not render on
 *  Windows or much of Android, where they fall back to letters. */
function Flag({ src, alt }) {
  return (
    <img src={src} alt={alt} width={19} height={19}
      style={{ width: 19, height: 19, objectFit: 'contain', display: 'inline-block', verticalAlign: '-4px' }} />
  )
}

const FOUNDERS = [
  { name: 'Zach Colville',   age: 21, from: 'England', flag: '/flags/england.png', role: 'Founder & Owner', photo: '/founders/zach.jpg' },
  { name: 'Jac Thomas-Rees', age: 22, from: 'Wales',   flag: '/flags/wales.png',   role: 'Founder & Owner', photo: '/founders/jac.jpg' },
]

export default function Founders() {
  return (
    <section id="our-story" className="relative px-6 py-24 md:py-32" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto">

        <motion.h2 {...reveal(0)} className="font-display text-3xl md:text-4xl lg:text-5xl text-center mb-3">
          Two of us. <span className="text-lapiz">That&rsquo;s the whole company.</span>
        </motion.h2>
        <motion.p {...reveal(0.06)} className="text-center mb-14 max-w-xl mx-auto"
          style={{ color: '#33405e', fontSize: 'clamp(1.05rem, 1.4vw, 1.22rem)', lineHeight: 1.6 }}>
          No account managers, no outsourcing. When you call, you get one of the two people who built your site.
        </motion.p>

        {/* Photos */}
        <div className="grid grid-cols-2 gap-5 sm:gap-8 max-w-2xl mx-auto">
          {FOUNDERS.map((f, i) => (
            <motion.figure key={f.name} {...revealFrom(i === 0 ? 'left' : 'right', i * 0.1)}>
              <div className="relative rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-lg)', aspectRatio: '4 / 5' }}>
                <img src={f.photo} alt={`${f.name}, ${f.role} of Bluepeek`}
                  className="w-full h-full object-cover" loading="lazy" width={900} height={1200} />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="text-base font-semibold" style={{ color: 'var(--ink)' }}>{f.name}</p>
                <p className="text-sm font-medium mt-1" style={{ color: 'var(--lapiz)' }}>{f.role}</p>
                <p className="text-sm mt-1 flex items-center justify-center gap-1.5" style={{ color: '#5a688a' }}>
                  {f.age} · from {f.from}
                  <Flag src={f.flag} alt={f.from} />
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Story underneath */}
        <motion.div {...reveal(0.12)}
          className="mt-16 max-w-xl mx-auto space-y-6"
          style={{ color: '#33405e', fontSize: 'clamp(1.05rem, 1.35vw, 1.19rem)', lineHeight: 1.72 }}>
          <p>
            Bluepeek is Jac and Zach — 22 and 21, one from Wales <Flag src="/flags/wales.png" alt="Wales" />{' '}
            and one from England <Flag src="/flags/england.png" alt="England" />, both now
            building websites for Australian businesses.
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
            More about Bluepeek
          </a>
        </motion.div>
      </div>
    </section>
  )
}
