'use client'
import { useEffect, useRef } from 'react'
import s from './Intro.module.css'

/**
 * Intro: the page turns from film to story. One viewport, starting on the
 * exact colour the film fades to (#f6f8fc), so the handoff has no seam.
 *
 * One idea: three things, numbered. One visual: an open product showroom of three real
 * things (a live client site, Bluepeek's own leads inbox, a real review
 * plaque). Scroll moment: the headline lights up word by word as it rises,
 * landing on the two-tone headline. Without JS / reduced motion it renders lit.
 */
const LINE1 = ['A', 'website', 'is', 'the', 'start.']
const LINE2 = ['Customers', 'are', 'the', 'point.']
const ITEMS = [
  { n: '1', href: '#work', name: 'Websites & local SEO', detail: 'Built to be found.', kind: 'phone', src: '/bottom/p1/superior.webp', bar: '#120d0f', alt: 'Superior Garage’s live mobile website, built by Bluepeek' },
  { n: '2', href: '#ads', name: 'Custom ad campaigns', detail: 'Turn attention into enquiries.', kind: 'phone', src: '/bottom/p1/leads.webp', bar: '#ffffff', light: true, alt: 'The Bluepeek app’s leads inbox, demo workspace' },
  { n: '3', href: '#systems', name: 'AI systems', detail: 'Keep your business moving.', kind: 'photo', src: '/bottom/assets/plaque-black.webp', alt: 'A Bluepeek tap-to-review plaque' },
]

const clamp = (x) => Math.min(1, Math.max(0, x))
const ease = (x) => x * x * (3 - 2 * x)

function Status({ light }) {
  return (
    <span className={s.status} data-light={light ? '' : undefined} aria-hidden="true">
      <span>9:41</span>
      <svg viewBox="0 0 66 12">
        <g fill="currentColor">
          <rect x="0" y="7.5" width="3" height="4" rx=".8" /><rect x="4.4" y="5.3" width="3" height="6.2" rx=".8" />
          <rect x="8.8" y="3" width="3" height="8.5" rx=".8" /><rect x="13.2" y=".6" width="3" height="10.9" rx=".8" />
          <path d="M28.7 10.9 26.6 8.7a3 3 0 0 1 4.2 0Z" />
          <rect x="43" y=".9" width="20" height="10.2" rx="3.2" fill="none" stroke="currentColor" strokeOpacity=".5" />
          <rect x="44.8" y="2.7" width="16.4" height="6.6" rx="1.7" />
        </g>
        <path d="M23.6 5.9a7 7 0 0 1 10.2 0M21.2 3.5a10.4 10.4 0 0 1 15 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export default function Intro() {
  const titleRef = useRef(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return
    const words = Array.from(title.querySelectorAll('[data-w]'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = -1
    const paint = () => {
      raf = 0
      const vh = window.innerHeight
      const top = title.getBoundingClientRect().top
      // Lights while the headline rises from the bottom of the viewport to its upper fifth.
      const p = clamp((vh * 1.0 - top) / (vh * 0.8))
      if (Math.abs(p - last) < 0.002) return
      last = p
      const n = words.length
      words.forEach((el, i) => {
        const w = ease(clamp(p * (n + 1.5) - i))
        const to = el.dataset.w === 'dim' ? 0.55 : 1
        el.style.color = `rgba(12,23,51,${(0.14 + (to - 0.14) * w).toFixed(3)})`
      })
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(paint) }
    paint()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      words.forEach((el) => { el.style.color = '' })
    }
  }, [])

  return (
    <section id="intro" className={s.root} aria-labelledby="intro-title">
      <div className={s.inner}>
        <p className={s.eyebrow}>What we do</p>
        <h2 id="intro-title" ref={titleRef} className={s.title}>
          <span className={s.line}>
            {LINE1.map((w, i) => (
              <span key={w} data-w="">{w}{i < LINE1.length - 1 ? ' ' : ''}</span>
            ))}
          </span>
          <span className={`${s.line} ${s.dim}`}>
            {LINE2.map((w, i) => (
              <span key={w + i} data-w="dim">{w}{i < LINE2.length - 1 ? ' ' : ''}</span>
            ))}
          </span>
        </h2>

        <ol className={s.bento}>
          {ITEMS.map((it) => (
            <li key={it.n}>
              <a href={it.href} className={s.tile} data-kind={it.kind}>
                <span className={s.visual}>
                  {it.kind === 'phone' ? (
                    <span className={s.phone}>
                      <span className={s.screen} style={{ background: it.bar }}>
                        <Status light={it.light} />
                        <span className={s.island} />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={it.src} alt={it.alt} loading="lazy" decoding="async" />
                      </span>
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className={s.photo} src={it.src} alt={it.alt} loading="lazy" decoding="async" />
                  )}
                </span>
                <span className={s.label}>
                  <span className={s.num}>0{it.n}</span>
                  <span className={s.labelCopy}>
                    <span className={s.name}>{it.name}<span className={s.arrow} aria-hidden="true">↗</span></span>
                    <span className={s.detail}>{it.detail}</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
