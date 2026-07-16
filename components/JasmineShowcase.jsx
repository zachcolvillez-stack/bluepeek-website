'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════
   JASMINE SHOWCASE - cinematic scroll-driven featured project
   Desktop: pinned full-viewport stage, the real site screenshot
   travels through a browser frame while a phone frame parallaxes in.
   Mobile / reduced-motion: simple stacked reveal, no pinning.
   ═══════════════════════════════════════════════════════════════ */

const DESKTOP_SHOT = '/screenshots/jasmine/home-desktop-full.jpg'   // 1440 × 7968
const MOBILE_SHOT  = '/screenshots/jasmine/home-mobile-full.jpg'    // 780 × 3900
const DOMAIN       = 'jasminehealthandspa.com.au'
const LIVE_URL     = 'https://jasminehealthandspa.com.au'

const META = [
  { label: 'Industry',  value: 'Day spa & Thai massage' },
  { label: 'Design',    value: 'Dark luxury · gold on charcoal' },
  { label: 'Delivered', value: '11-page site + booking' },
]

const DESCRIPTION =
  'A dark, luxurious website for an authentic Thai day spa in Ascot, Perth - designed to feel as calming as the treatments it books.'

/* ── Shared pieces ────────────────────────────────────────────── */

function BrowserBar() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2.5"
      style={{ background: '#f7f9fc', borderBottom: '1px solid rgba(12,28,52,0.08)' }}>
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f2b8b5' }} />
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f5dcae' }} />
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#b7dbc0' }} />
      <div className="flex-1 mx-3 px-3 py-0.5 text-[10px] rounded text-center font-mono truncate"
        style={{ background: '#ffffff', color: '#7e8aa0', border: '1px solid rgba(12,28,52,0.08)' }}>
        {DOMAIN}
      </div>
      <ExternalLink size={12} style={{ color: '#a9b6c8' }} />
    </div>
  )
}

function ShowcaseHeader({ align = 'between' }) {
  return (
    <div className={align === 'between'
      ? 'flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6'
      : 'flex flex-col gap-6'}>
      <div className="max-w-xl">
        <span className="eyebrow">Featured Project</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-4" style={{ color: '#0c1c34' }}>
          Jasmine Health Spa
        </h2>
        <p className="text-base md:text-lg leading-relaxed" style={{ color: '#475569' }}>
          {DESCRIPTION}
        </p>
      </div>
      <dl className="flex flex-row lg:flex-col flex-wrap gap-x-8 gap-y-3 lg:pb-1 shrink-0">
        {META.map(m => (
          <div key={m.label}>
            <dt className="text-[11px] font-bold uppercase tracking-wider mb-0.5" style={{ color: '#1b3c70' }}>{m.label}</dt>
            <dd className="text-sm font-medium" style={{ color: '#475569' }}>{m.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ShowcaseCTA({ className = '', style }) {
  return (
    <motion.div style={style}
      className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${className}`}>
      <a href={LIVE_URL} target="_blank" rel="noopener noreferrer"
        className="group btn-primary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm w-full sm:w-auto justify-center">
        View live demo
        <ExternalLink size={15} className="group-hover:translate-x-0.5 transition-transform" />
      </a>
      <a href="#contact"
        className="btn-secondary flex items-center gap-2 px-7 py-3.5 rounded-full text-sm w-full sm:w-auto justify-center">
        Start your project <ArrowUpRight size={15} />
      </a>
    </motion.div>
  )
}

/* Phone frame - navy bezel, screenshot scrolls inside */
function PhoneFrame({ imgStyle, className = '', style, autoScroll = false }) {
  const imgProps = autoScroll
    ? {
        initial: { y: '0%' },
        whileInView: { y: '-54%' },
        transition: { duration: 7, ease: 'easeInOut', delay: 0.8 },
        viewport: { once: true, amount: 0.6 },
      }
    : { style: imgStyle }
  return (
    <motion.div style={style}
      className={`rounded-[34px] p-[7px] ${className}`}
      aria-hidden="true">
      <div className="absolute inset-0 rounded-[34px]"
        style={{ background: '#0c1c34', boxShadow: '0 24px 56px rgba(12,28,52,0.28)' }} />
      <div className="relative rounded-[27px] overflow-hidden" style={{ background: '#141210', aspectRatio: '390 / 800' }}>
        <motion.img src={MOBILE_SHOT} alt="" width={780} height={3900} loading="lazy"
          className="absolute top-0 left-0 w-full h-auto"
          {...imgProps} />
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-[18px] rounded-full" style={{ background: '#0c1c34' }} />
      </div>
    </motion.div>
  )
}

/* ── Desktop: pinned cinematic stage (md and up) ──────────────── */

function PinnedStage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Main beat - screenshot travels up inside the browser frame
  const frameScale = useTransform(scrollYProgress, [0, 0.22], [1.04, 1])
  const imgY       = useTransform(scrollYProgress, [0.04, 0.86], ['0%', '-86%'])
  // Secondary beat - phone slides in and parallaxes at a different rate
  const phoneOpacity = useTransform(scrollYProgress, [0.28, 0.4], [0, 1])
  const phoneY       = useTransform(scrollYProgress, [0.28, 0.48], [90, 0])
  const phoneImgY    = useTransform(scrollYProgress, [0.34, 0.92], ['0%', '-54%'])
  // Closing beat - CTA settles in
  const ctaOpacity = useTransform(scrollYProgress, [0.78, 0.9], [0, 1])
  const ctaY       = useTransform(scrollYProgress, [0.78, 0.9], [24, 0])
  const ctaEvents  = useTransform(scrollYProgress, v => (v > 0.76 ? 'auto' : 'none'))

  return (
    <div ref={ref} className="relative hidden md:block" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="max-w-6xl mx-auto w-full px-6 pt-24 pb-10 flex-1 flex flex-col min-h-0">
          <div className="pb-8">
            <ShowcaseHeader />
          </div>

          {/* Stage */}
          <div className="relative flex-1 min-h-0">
            {/* Desktop browser frame */}
            <motion.div
              className="relative mx-auto rounded-2xl overflow-hidden w-full"
              style={{
                scale: frameScale,
                maxWidth: 'min(880px, calc((100vh - 360px) * 1.55))',
                background: '#ffffff',
                border: '1px solid rgba(12,28,52,0.10)',
                boxShadow: '0 28px 64px rgba(12,28,52,0.16)',
              }}>
              <BrowserBar />
              <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10', background: '#141210' }}>
                <motion.img src={DESKTOP_SHOT} width={1440} height={7968} loading="lazy"
                  alt="Jasmine Health Spa homepage - dark luxury Thai day spa website built by Blue Peek"
                  className="absolute top-0 left-0 w-full h-auto"
                  style={{ y: imgY, willChange: 'transform' }} />
                {/* soft inner vignette for depth */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: 'inset 0 -32px 48px -32px rgba(12,28,52,0.35)' }} />
              </div>
            </motion.div>

            {/* Phone frame - parallax companion */}
            <PhoneFrame
              className="absolute bottom-2 right-[2%] lg:right-[6%] w-[168px] lg:w-[196px] z-10"
              style={{ opacity: phoneOpacity, y: phoneY }}
              imgStyle={{ y: phoneImgY, willChange: 'transform' }} />

            {/* Closing CTA */}
            <ShowcaseCTA
              className="absolute inset-x-0 bottom-6 z-20"
              style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaEvents }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Mobile (<md): simple stacked reveal, no pinning ──────────── */

function StackedReveal() {
  return (
    <div className="md:hidden px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <ShowcaseHeader align="stack" />
        </motion.div>

        {/* Phone frame - the legible frame at this width; screenshot auto-scrolls once in view */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}
          className="relative flex justify-center mt-12 mb-12">
          <div className="relative w-[228px]">
            <PhoneFrame className="relative w-full" autoScroll />
          </div>
        </motion.div>

        <ShowcaseCTA />
      </div>
    </div>
  )
}

/* ── Reduced motion: static composed layout, no transforms ────── */

function StaticLayout() {
  return (
    <div className="px-6 py-24 md:py-28">
      <div className="max-w-6xl mx-auto">
        <ShowcaseHeader />
        <div className="relative mt-12 mb-12">
          <div className="relative mx-auto rounded-2xl overflow-hidden w-full max-w-[880px]"
            style={{ background: '#ffffff', border: '1px solid rgba(12,28,52,0.10)', boxShadow: '0 28px 64px rgba(12,28,52,0.16)' }}>
            <BrowserBar />
            <div className="relative overflow-hidden" style={{ aspectRatio: '16 / 10', background: '#141210' }}>
              <img src={DESKTOP_SHOT} width={1440} height={7968} loading="lazy"
                alt="Jasmine Health Spa homepage - dark luxury Thai day spa website built by Blue Peek"
                className="absolute top-0 left-0 w-full h-auto" />
            </div>
          </div>
          <div className="hidden md:block absolute bottom-[-24px] right-[4%] w-[180px]">
            <PhoneFrame className="relative w-full" imgStyle={{}} />
          </div>
        </div>
        <ShowcaseCTA />
      </div>
    </div>
  )
}

/* ── Export ───────────────────────────────────────────────────── */

export default function JasmineShowcase() {
  const reduceMotion = useReducedMotion()
  return (
    <section id="featured" className="section-tint relative">
      {reduceMotion ? (
        <StaticLayout />
      ) : (
        <>
          <PinnedStage />
          <StackedReveal />
        </>
      )}
    </section>
  )
}
