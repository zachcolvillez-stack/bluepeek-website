'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   THREE PHONES — one per industry, rising as you scroll.
   Desktop: pinned stage. The phones rise and settle at staggered
   depths, then each screenshot scrolls inside its own frame.
   Mobile / reduced-motion: a simple stacked row, no pinning.
   ═══════════════════════════════════════════════════════════════ */

// One shared travel distance so every screenshot scrolls at the same rate.
// All three captures are now 780x7000, so the same value is safe for each
// and shows far more of every page than the old 56% cap allowed.
const TRAVEL = '-70%'

const PHONES = [
  {
    slug: 'artisan',
    industry: 'Trades',
    name: 'Artisan Concrete',
    domain: 'artisanconcretewa.com.au',
    url: 'https://artisanconcretewa.com.au',
    shot: '/screenshots/phones/artisan.jpg',
  },
  {
    slug: 'jasmine',
    industry: 'Health & beauty',
    name: 'Jasmine Health Spa',
    domain: 'jasminehealthandspa.com.au',
    url: 'https://jasminehealthandspa.com.au',
    shot: '/screenshots/phones/jasmine.jpg',
  },
  {
    slug: 'rodano',
    industry: 'Retail',
    name: 'Rodano Flowers',
    domain: 'rodanoflowers.com.au',
    url: 'https://rodanoflowers.com.au',
    shot: '/screenshots/phones/rodano.jpg',
  },
]

/* A single phone. `rise` and `shotY` are motion values supplied by the
   pinned stage; when they're absent the phone renders static. */
function Phone({ phone, rise, shotY, eager, className = '' }) {
  return (
    <motion.div style={rise ? { y: rise } : undefined}
      className={`w-full max-w-[248px] ${className}`}>
      <div className="relative rounded-[36px] p-[8px]"
        style={{ background: 'var(--ink)', boxShadow: '0 32px 70px rgba(15,26,48,0.30)' }}>
        <div className="relative rounded-[29px] overflow-hidden" style={{ background: '#fff', aspectRatio: '390 / 800' }}>
          <motion.img
            src={phone.shot}
            alt={`The ${phone.name} website on a phone`}
            className="absolute top-0 left-0 w-full h-auto"
            loading={eager ? 'eager' : 'lazy'}
            style={shotY ? { y: shotY } : undefined}
          />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-[18px] rounded-full" style={{ background: 'var(--ink)' }} />
        </div>
      </div>

      <div className="mt-5 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] mb-1.5" style={{ color: 'var(--lapiz)' }}>
          {phone.industry}
        </p>
        <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{phone.name}</p>
        <a href={phone.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs mt-1.5 hover:underline" style={{ color: 'var(--muted)' }}>
          {phone.domain} <ExternalLink size={11} />
        </a>
      </div>
    </motion.div>
  )
}

/* ── Desktop: pinned stage ─────────────────────────────────────── */
function PinnedPhones() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // All three phones share ONE rise value and ONE scroll value, so they move
  // as a single unit. The centre phone's higher resting position is a static
  // CSS offset, not an animation difference — that keeps them in sync.
  const rise = useTransform(scrollYProgress, [0.00, 0.28], ['66%', '2%'])

  // All three captures are the same size, so one shared value keeps them
  // moving at an identical rate with no desync.
  // Ends at 0.78, not 0.95: the sticky stage starts leaving the viewport around
  // 0.8, so anything after that scrolls where nobody can see it.
  const shot = useTransform(scrollYProgress, [0.30, 0.78], ['0%', TRAVEL])

  const headingY = useTransform(scrollYProgress, [0, 0.25], [0, -12])
  const headingOpacity = useTransform(scrollYProgress, [0.2, 0.42], [1, 0.55])



  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: '240vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-start pt-32">
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="text-center px-6 mb-4 shrink-0">
          <h2 className="font-display text-4xl xl:text-5xl mb-4">
            Built for whatever you do.
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text)' }}>
            Three live client sites, three completely different industries — the same standard underneath.
          </p>
        </motion.div>

        <div className="flex-1 flex items-start justify-center gap-10 xl:gap-16 px-6 pb-4">
          {PHONES.map((p, i) => (
            <Phone key={p.slug} phone={p} rise={rise} shotY={shot} eager={i === 1}
              className={i === 1 ? '-mt-8' : ''} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Mobile / reduced motion: static row, no pinning ───────────── */
function StaticPhones() {
  return (
    <div className="lg:hidden px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl mb-4">Built for whatever you do.</h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text)' }}>
          Three live client sites, three completely different industries — the same standard underneath.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-6">
        {PHONES.map((p, i) => (
          <Phone key={p.slug} phone={p} eager={i === 0} />
        ))}
      </div>
    </div>
  )
}

export default function ThreePhones() {
  const reduced = useReducedMotion()
  return (
    <section id="industries" className="relative" style={{ background: 'var(--bg-2)' }}>
      {reduced ? <div className="hidden lg:block"><StaticPhonesDesktopFallback /></div> : <PinnedPhones />}
      <StaticPhones />
    </section>
  )
}

/* Reduced-motion desktop: same static row, just wider. */
function StaticPhonesDesktopFallback() {
  return (
    <div className="px-6 py-24">
      <div className="text-center mb-14">
        <h2 className="font-display text-4xl xl:text-5xl mb-4">Built for whatever you do.</h2>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--text)' }}>
          Three live client sites, three completely different industries — the same standard underneath.
        </p>
      </div>
      <div className="flex items-start justify-center gap-16">
        {PHONES.map((p, i) => <Phone key={p.slug} phone={p} eager={i === 1} />)}
      </div>
    </div>
  )
}
