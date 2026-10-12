'use client'
import { useEffect, useRef } from 'react'
import { openEnquire } from '../../lib/enquire'
import s from './Websites.module.css'

/**
 * 1 · Websites & local SEO, as one pinned stage with three beats, one idea
 * and one large visual each:
 *   1  We build custom websites: a live client site in a browser and on a
 *      phone; the page scrolls inside the window as you scroll.
 *   2  The proof, as headline-size numerals (BluePeek Forms, Search Console).
 *   3  Local search made tangible: a full-bleed street map of Nerang (real
 *      OpenStreetMap data) with a Maps rank grid that turns from "before" to
 *      "after" as you scroll. The ranks are a labelled example.
 * Without JS (or with reduced motion) the beats simply stack, fully readable.
 */

// Beat windows in stage progress: [fade in from, to, fade out from, to].
const BEATS = [[-1, -1, 0.33, 0.4], [0.38, 0.45, 0.66, 0.72], [0.7, 0.77, 2, 2]]
const GRID = [0.72, 0.89] // stage progress over which the ranks improve

const N = 7
const C = (N - 1) / 2
const hash = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x) }
const CELLS = Array.from({ length: N * N }, (_, k) => {
  const i = k % N, j = Math.floor(k / N)
  const d = Math.hypot(i - C, j - C)
  const r = hash(k)
  const before = d === 0 ? 7 : Math.round(9 + d * 3.1 + r * 5)
  const after = d === 0 ? 1 : Math.max(1, Math.min(9, Math.round(0.5 + Math.max(0, d - 1) + r * 1.2)))
  return { k, gx: i - C, gy: j - C, before, after, start: 0.56 * (d / Math.hypot(C, C)) }
})
const clamp = (x) => Math.min(1, Math.max(0, x))
const ease = (x) => x * x * (3 - 2 * x)
const ss = (a, b, x) => (b <= a ? (x >= b ? 1 : 0) : ease(clamp((x - a) / (b - a))))
const rankAt = (c, g) => Math.round(c.before + (c.after - c.before) * ease(clamp((g - c.start) / 0.44)))
const tier = (r) => (r <= 3 ? 'top' : r <= 10 ? 'mid' : 'low')
const label = (r) => (r > 20 ? '20+' : String(r))
const avg = (g) => CELLS.reduce((a, c) => a + Math.min(21, rankAt(c, g)), 0) / CELLS.length
const AVG_BEFORE = avg(0).toFixed(1)
const AVG_AFTER = avg(1).toFixed(1)

const PROOF = [
  { num: '56→98', label: 'organic Google clicks across consecutive 28-day periods', client: 'Jasmine Health & Spa · Ascot WA' },
  { num: '16', label: 'service bookings requested online', client: 'Superior Garage · Malaga WA' },
]

function Status() {
  return (
    <span className={s.status} aria-hidden="true">
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

function Phone({ src, alt, bar, scroll, className = '' }) {
  return (
    <div className={`${s.phone} ${className}`}>
      <div className={s.screen} style={{ background: bar }}>
        <Status />
        <span className={s.island} aria-hidden="true" />
        <div className={s.page} data-page={scroll ? '' : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  )
}

export default function Websites() {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const staticMode = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 760px) and (max-height: 780px)')
    const startMotion = () => {
    if (staticMode.matches) return () => {}
    root.setAttribute('data-pin', '')
    const beats = Array.from(root.querySelectorAll('[data-beat]'))
    const pages = Array.from(root.querySelectorAll('[data-page]'))
    const dots = Array.from(root.querySelectorAll('[data-k]'))
    const states = Array.from(root.querySelectorAll('[data-state]'))
    let raf = 0
    let last = -1
    const paint = (force) => {
      raf = 0
      const r = root.getBoundingClientRect()
      const span = r.height - window.innerHeight
      const p = span > 0 ? clamp(-r.top / span) : 0
      if (!force && Math.abs(p - last) < 0.0005) return
      last = p
      beats.forEach((el, i) => {
        const [a, b, c, d] = BEATS[i]
        const vin = ss(a, b, p)
        const vout = 1 - ss(c, d, p)
        const v = Math.min(vin, vout)
        el.style.opacity = v.toFixed(3)
        el.style.transform = `translate3d(0,${((1 - vin) * 32 - (1 - vout) * 32).toFixed(1)}px,0)`
        el.style.visibility = v < 0.01 ? 'hidden' : 'visible'
      })
      // Beat 1: the live site scrolls inside its window.
      const k = 0.55 * ease(clamp(p / 0.33))
      for (const el of pages) {
        const travel = el.scrollHeight - el.parentElement.clientHeight
        el.style.transform = `translate3d(0,${(-k * Math.max(0, travel)).toFixed(1)}px,0)`
      }
      // Beat 3: ranks improve from the centre outward.
      const g = clamp((p - GRID[0]) / (GRID[1] - GRID[0]))
      for (const el of dots) {
        const rank = rankAt(CELLS[el.dataset.k], g)
        const t = tier(rank)
        if (el.dataset.t !== t) el.dataset.t = t
        const txt = label(rank)
        if (el.textContent !== txt) el.textContent = txt
      }
      const after = g >= 0.5
      states.forEach((el) => el.toggleAttribute('data-on', (el.dataset.state === 'after') === after))
    }
    const queue = () => { if (!raf) raf = requestAnimationFrame(() => paint(false)) }
    paint(true)
    const onLoad = () => { cancelAnimationFrame(raf); paint(true) }
    root.querySelectorAll('img').forEach((img) => img.addEventListener('load', onLoad))
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', onLoad)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', onLoad)
      root.querySelectorAll('img').forEach((img) => img.removeEventListener('load', onLoad))
      root.removeAttribute('data-pin')
      ;[...beats, ...pages].forEach((el) => { el.style.cssText = '' })
      dots.forEach((el) => {
        const rank = CELLS[el.dataset.k].after
        el.dataset.t = tier(rank)
        el.textContent = label(rank)
      })
      states.forEach((el) => el.toggleAttribute('data-on', el.dataset.state === 'after'))
    }
    }
    let stopMotion = startMotion()
    const syncMode = () => {
      stopMotion()
      stopMotion = startMotion()
    }
    staticMode.addEventListener('change', syncMode)
    return () => {
      staticMode.removeEventListener('change', syncMode)
      stopMotion()
    }
  }, [])

  return (
    <section ref={rootRef} id="work" className={s.root} aria-labelledby="work-title">
      <div className={s.stage}>
        {/* Beat 1 · we build custom websites */}
        <div className={`${s.beat} ${s.b1}`} data-beat="1">
          <p className={s.eyebrow}>1 · Websites &amp; local SEO</p>
          <h2 id="work-title" className={s.title}>
            We build custom websites.<span className={s.dim}>Designed from scratch, for one business.</span>
          </h2>
          <div className={s.devices}>
            <div className={s.browser}>
              <div className={s.chrome} aria-hidden="true">
                <span className={s.lights}><i /><i /><i /></span>
                <span className={s.url}>jasminehealthandspa.com.au</span>
              </div>
              <div className={s.viewport}>
                <div className={s.page} data-page="">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/bottom/assets/jasmine-desktop.webp" alt="Jasmine Health & Spa’s live website, designed and built by Bluepeek" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            <Phone className={s.b1phone} src="/bottom/assets/jasmine-mobile.webp" alt="The same site on a phone" bar="#1b1612" scroll />
          </div>
          <p className={s.caption}>Jasmine Health &amp; Spa, Ascot WA. Live site, built by Bluepeek.</p>
        </div>

        {/* Beat 2 · the proof */}
        <div className={`${s.beat} ${s.b2}`} data-beat="2">
          <Phone className={s.b2phone} src="/bottom/p1/attention.webp" alt="Attention Detailing’s live mobile website, built by Bluepeek" bar="#0b0b0b" />
          <div className={s.proof}>
            <p className={s.eyebrow}>Real sites, real enquiries</p>
            <p className={s.big}>54</p>
            <p className={s.bigLabel}>quote requests in its first month online.</p>
            <p className={s.client}>Attention Detailing · Nerang QLD</p>
            <dl className={s.row}>
              {PROOF.map((x) => (
                <div key={x.num}>
                  <dt className="sr-only">{x.client}</dt>
                  <dd className={s.mid}>{x.num}</dd>
                  <dd className={s.midLabel}>{x.label}</dd>
                  <dd className={s.client}>{x.client}</dd>
                </div>
              ))}
            </dl>
            <p className={s.source}>Enquiries and bookings recorded by BluePeek Forms; clicks from Google Search Console. To 9 Oct 2026.</p>
          </div>
        </div>

        {/* Beat 3 · local search, made tangible */}
        <div className={`${s.beat} ${s.b3}`} data-beat="3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.map} src="/bottom/p1/nerang-map.svg" alt="" aria-hidden="true" />
          <div className={s.wash} aria-hidden="true" />
          <div className={s.b3copy}>
            <p className={s.eyebrow}>Local SEO · Google Maps</p>
            <h3 className={s.title2}>Top of the map.<span className={s.dim}>Suburb by suburb.</span></h3>
            <p className={s.body}>
              We tune your <b>Google Business Profile</b>, build a page for every suburb you serve and track
              your rank street by street, so <b>nearby searches find you first</b>.
            </p>
            <div className={s.actions}>
              <a href="#contact" className={s.pill} onClick={(e) => { e.preventDefault(); openEnquire('New website or redesign') }}>
                Start my website <span aria-hidden="true">→</span>
              </a>
              <p className={s.offer}>First month free, then from $99/mo.</p>
            </div>
          </div>
          <figure className={s.rank} aria-label={`Example: Google Maps rank for “mechanic near me” across Nerang, average position ${AVG_BEFORE} before and ${AVG_AFTER} after local SEO`}>
            <figcaption className={s.rankHead}>Example · “mechanic near me” across Nerang</figcaption>
            <div className={s.grid} aria-hidden="true">
              {CELLS.map((c) => (
                <span key={c.k} data-k={c.k} data-t={tier(c.after)} data-home={c.k === (N * N - 1) / 2 ? '' : undefined} className={s.dot} style={{ '--gx': c.gx, '--gy': c.gy }}>
                  {label(c.after)}
                </span>
              ))}
            </div>
            <div className={s.states} aria-hidden="true">
              <span data-state="before"><em>Before</em><b>{AVG_BEFORE}</b></span>
              <i className={s.arrowLine} />
              <span data-state="after" data-on=""><em>After</em><b>{AVG_AFTER}</b></span>
              <span className={s.statesNote}>average Maps position</span>
            </div>
          </figure>
          <p className={s.osm}>Map data © OpenStreetMap</p>
        </div>
      </div>
    </section>
  )
}
