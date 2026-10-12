'use client'
import { useEffect, useId, useRef } from 'react'
import { openEnquire } from '../../lib/enquire'
import s from './Ads.module.css'

/*
 * 2 · Custom ad campaigns.
 *
 * Two phones: a customer's Google search with the ad on top ("your ad on
 * their phone") and the owner's lock screen with the tracked leads ("their
 * call on yours"). The scroll moment: the stage pins, the phones stand up and
 * the cost-per-lead line is drawn week by week, so scrolling down pushes the
 * cost down.
 *
 * EVERYTHING inside the phones is an example. Tidewater Plumbing is a demo
 * business (no AU business by that name found 10 Oct 2026), the phone number
 * is in ACMA's range reserved for fiction ((07) 5550 xxxx), and the numbers are
 * illustrative: Bluepeek has no campaign results to quote. The report card
 * carries a Demo tag and the figure has a caption saying so.
 */

const CPL = [46, 43, 39, 36, 33, 31, 29, 27] // demo cost per lead, weeks 1-8
const CW = 346 // chart viewBox width
const CH = 76
const PAD = 7
const yOf = (v) => 9 + ((47 - v) / (47 - 26)) * 56
const PTS = CPL.map((v, i) => [PAD + (i / 7) * (CW - PAD * 2), yOf(v)])
const LINE = PTS.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
const AREA = `${LINE} L${PTS[7][0].toFixed(1)} ${CH} L${PTS[0][0].toFixed(1)} ${CH} Z`

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function Ads() {
  const uid = useId().replace(/:/g, '')
  const track = useRef(null)
  const spacer = useRef(null)
  const phoneA = useRef(null)
  const phoneB = useRef(null)
  const reveal = useRef(null)
  const head = useRef(null)
  const cpl = useRef(null)
  const week = useRef(null)
  const delta = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let lastP = -1
    let lastWeek = -1

    const render = (p) => {
      // 1. the phones stand up into place (first half of the moment)
      const a = easeOut(clamp(p / 0.5))
      const b = easeOut(clamp((p - 0.06) / 0.5))
      if (phoneA.current) phoneA.current.style.setProperty('--arrival', (1 - a).toFixed(4))
      if (phoneB.current) phoneB.current.style.setProperty('--arrival', (1 - b).toFixed(4))

      // 2. the cost-per-lead line is drawn week by week
      const t = easeInOut(clamp((p - 0.2) / 0.8))
      const x = PAD + t * (CW - PAD * 2)
      const seg = Math.min(6, Math.floor(t * 7))
      const f = t * 7 - seg
      const y = PTS[seg][1] + (PTS[seg + 1][1] - PTS[seg][1]) * f
      if (reveal.current) reveal.current.setAttribute('width', (x + 1).toFixed(1))
      if (head.current) {
        head.current.setAttribute('cx', x.toFixed(1))
        head.current.setAttribute('cy', y.toFixed(1))
      }
      const w = Math.min(7, Math.floor(t * 7 + 1e-6))
      if (w !== lastWeek) {
        lastWeek = w
        if (cpl.current) cpl.current.textContent = `$${CPL[w]}`
        if (week.current) week.current.textContent = `Week ${w + 1}`
        if (delta.current) delta.current.textContent = w ? `↓ $${CPL[0] - CPL[w]} since week 1` : 'First week live'
      }
    }

    const paint = () => {
      raf = 0
      const el = track.current
      if (!el) return
      const vh = window.innerHeight
      const pin = spacer.current ? spacer.current.offsetHeight : 0
      const top = el.getBoundingClientRect().top
      const start = vh * 0.5 // moment begins as the section reaches mid-screen
      const end = -pin * 0.92 // and lands just before the pin lets go
      const p = Math.round(clamp((start - top) / (start - end)) * 2000) / 2000
      if (p === lastP) return // nothing to do (e.g. while the film above plays)
      lastP = p
      render(p)
    }

    const queue = () => { if (!raf) raf = requestAnimationFrame(paint) }
    const attach = () => {
      paint()
      window.addEventListener('scroll', queue, { passive: true })
      window.addEventListener('resize', queue)
    }
    const detach = () => {
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }
    // Reduced motion: no movement, everything at its final state.
    const onPref = () => {
      if (reduce.matches) { detach(); lastP = -1; lastWeek = -1; render(1) } else attach()
    }
    if (reduce.matches) render(1)
    else attach()
    reduce.addEventListener?.('change', onPref)
    return () => {
      detach()
      reduce.removeEventListener?.('change', onPref)
    }
  }, [])

  const plan = (e) => { e.preventDefault(); openEnquire('Google Ads leads') }

  return (
    <section id="ads" className={s.root} aria-labelledby="ads-title">
      <div ref={track} className={s.track}>
        <div className={s.stage}>
          <header className={s.head}>
            <p className={s.eyebrow}>2 · Custom ad campaigns</p>
            <h2 id="ads-title" className={s.title}>
              <span className={s.line}>Your ad on their phone.</span>
              <span className={`${s.line} ${s.dim}`}>Their call on yours.</span>
            </h2>
          </header>

          <figure className={s.scene} aria-label="Example: a Google search for a blocked drain in Burleigh shows a demo plumber's ad first, and the owner's phone shows the tracked call, a form lead from Instagram and the cost per lead falling week by week.">
            {/* Their phone: the Google search, your ad on top */}
            <div ref={phoneA} className={`${s.phone} ${s.phoneA}`} aria-hidden="true">
              <div className={s.screen}>
                <div className={s.serp}>
                  <StatusBar />
                  <div className={s.sbar}>
                    <img className={s.g} src="/brand/platforms/google-color.svg" alt="" width="20" height="20" />
                    <span className={s.q}>blocked drain burleigh</span>
                    <Close className={s.x} />
                  </div>
                  <div className={s.tabs}>
                    <span className={s.tabOn}>All</span><span>Maps</span><span>Images</span><span>News</span><span>Videos</span>
                  </div>
                  <div className={s.ad}>
                    <p className={s.spons}>Sponsored</p>
                    <div className={s.adv}>
                      <span className={s.fav}><Drop /></span>
                      <span className={s.advText}>
                        <span className={s.advName}>Tidewater Plumbing</span>
                        <span className={s.advUrl}>tidewaterplumbing.com.au</span>
                      </span>
                      <Kebab className={s.kebab} />
                    </div>
                    <p className={s.adTitle}>Blocked Drain in Burleigh? | Local Plumber Here Today</p>
                    <p className={s.adDesc}>Licensed plumbers for blocked drains, burst pipes and hot water. Upfront price before we start.</p>
                    <p className={s.adLoc}><Pin className={s.pin} />Burleigh Heads · Open 24 hours</p>
                    <div className={s.chips}>
                      <span className={`${s.chip} ${s.chipOn}`}><PhoneIcon className={s.chipIcon} />Call</span>
                      <span className={s.chip}><Directions className={s.chipIcon} />Directions</span>
                      <span className={s.chip}>Book online</span>
                    </div>
                    <ul className={s.links}>
                      <li>Blocked drains<Chevron className={s.chev} /></li>
                      <li>Hot water systems<Chevron className={s.chev} /></li>
                      <li>Emergency plumber<Chevron className={s.chev} /></li>
                    </ul>
                  </div>
                  <div className={s.paa}>
                    <p className={s.paaTitle}>People also ask</p>
                    <p className={s.paaQ}>How do plumbers clear a blocked drain?<ChevronDown className={s.chevD} /></p>
                    <p className={s.paaQ}>Is a blocked drain an emergency?<ChevronDown className={s.chevD} /></p>
                  </div>
                  {/* Safari's bottom bar */}
                  <div className={s.safari}>
                    <span className={s.addr}><Lock className={s.lockIco} />google.com</span>
                    <span className={s.homeBarDark} />
                  </div>
                </div>
              </div>
              <Island />
            </div>

            {/* Your phone: the call, the form, and what each lead cost */}
            <div ref={phoneB} className={`${s.phone} ${s.phoneB}`} aria-hidden="true">
              <div className={s.screen}>
                <div className={s.lock}>
                  <StatusBar light />
                  <p className={s.date}>Saturday 10 October</p>
                  <p className={s.clock}>9:41</p>
                  <div className={s.notes}>
                    <div className={s.note}>
                      <img className={s.appIcon} src="/brand/logo-glass-512.png" alt="" width="38" height="38" />
                      <div className={s.noteText}>
                        <p className={s.noteTop}><span>New call from your Google ad</span><span className={s.noteTime}>now</span></p>
                        <p className={s.noteBody}>4 min call · searched “blocked drain burleigh”</p>
                      </div>
                    </div>
                    <div className={s.note}>
                      <img className={s.appIcon} src="/brand/logo-glass-512.png" alt="" width="38" height="38" />
                      <div className={s.noteText}>
                        <p className={s.noteTop}><span>New quote request</span><span className={s.noteTime}>38m ago</span></p>
                        <p className={s.noteBody}>From your Instagram ad · hot water system</p>
                      </div>
                    </div>
                    <div className={`${s.note} ${s.report}`}>
                      <div className={s.repHead}>
                        <img className={s.repIcon} src="/brand/logo-glass-512.png" alt="" width="24" height="24" />
                        <span className={s.repTitle}>Cost per lead</span>
                        <span className={s.demo}>Demo</span>
                      </div>
                      <div className={s.repRow}>
                        <span ref={cpl} className={s.repNum}>$27</span>
                        <span className={s.repMeta}>
                          <span ref={week} className={s.repWeek}>Week 8</span>
                          <span ref={delta} className={s.repDelta}>↓ $19 since week 1</span>
                        </span>
                      </div>
                      <svg className={s.chart} viewBox={`0 0 ${CW} ${CH}`} preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                          <linearGradient id={`${uid}a`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#0B3ED9" stopOpacity=".16" />
                            <stop offset="1" stopColor="#0B3ED9" stopOpacity="0" />
                          </linearGradient>
                          <clipPath id={`${uid}c`}>
                            <rect ref={reveal} x="0" y="0" width={CW} height={CH} />
                          </clipPath>
                        </defs>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                          <line key={i} x1={PTS[i][0]} x2={PTS[i][0]} y1="4" y2={CH} className={s.grid} />
                        ))}
                        <g clipPath={`url(#${uid}c)`}>
                          <path d={AREA} fill={`url(#${uid}a)`} />
                          <path d={LINE} className={s.line2} />
                          {PTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.4" className={s.dot} />)}
                        </g>
                        <circle ref={head} cx={PTS[7][0]} cy={PTS[7][1]} r="4.2" className={s.headDot} />
                      </svg>
                      <p className={s.axis}><span>Wk 1</span><span>Wk 8</span></p>
                    </div>
                  </div>
                  <span className={`${s.lockBtn} ${s.lockBtnL}`}><Torch /></span>
                  <span className={`${s.lockBtn} ${s.lockBtnR}`}><Camera /></span>
                  <span className={s.homeBar} />
                </div>
              </div>
              <Island />
            </div>
            <figcaption className={s.caption}>Example campaign · Demo business and illustrative figures.</figcaption>
          </figure>
        </div>
        <div ref={spacer} className={s.spacer} aria-hidden="true" />
      </div>

      <div className={s.after}>
        <p className={s.lede}>
          Google Ads for the moment they search, Facebook and Instagram for the moment they
          scroll, each one <b>built around your services and the suburbs you work in</b>.{' '}
          <b>Every call and form is tracked</b>, so you always know what a lead costs. Then{' '}
          <b>we tune your campaigns every week</b> to bring that cost down.
        </p>
        <dl className={s.facts}>
          <div className={s.fact}>
            <dt className={s.factLabel}>First month</dt>
            <dd className={s.factNum}>$199</dd>
            <dd className={s.factCap}>of campaign management</dd>
          </div>
          <div className={s.fact}>
            <dt className={s.factLabel}>Then</dt>
            <dd className={s.factNum}>$299<span className={s.per}>/mo</span></dd>
            <dd className={s.factCap}>plus ad spend, billed by Google or Meta</dd>
          </div>
        </dl>
        <div className={s.actions}>
          <a href="#contact" className={s.pill} onClick={plan}>Plan my campaign</a>
          <a href="/google-ads-management" className={s.more}>How we run ads <span className={s.arrow} aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  )
}

/* ---------- small pieces of phone chrome (all decorative) ---------- */

function Island() {
  return <span className={s.island} />
}

function StatusBar({ light = false }) {
  // On a lock screen iOS shows the big clock instead of the status-bar time.
  return (
    <div className={`${s.status} ${light ? s.statusLight : ''}`}>
      <span className={s.time}>{light ? '' : '9:41'}</span>
      <span className={s.icons}>
        <svg viewBox="0 0 18 12" className={s.sig}><rect x="0" y="7.6" width="3.2" height="4.4" rx="1" /><rect x="4.9" y="5.2" width="3.2" height="6.8" rx="1" /><rect x="9.8" y="2.7" width="3.2" height="9.3" rx="1" /><rect x="14.7" y="0" width="3.2" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12" className={s.wifi}><path d="M8 2.1c2.5 0 4.8 1 6.5 2.6l1.2-1.3A11.3 11.3 0 0 0 8 .3 11.3 11.3 0 0 0 .3 3.4l1.2 1.3A9.4 9.4 0 0 1 8 2.1Zm0 3.5c1.6 0 3 .6 4.1 1.6l1.2-1.3A7.8 7.8 0 0 0 8 3.8c-2 0-3.9.8-5.3 2.1l1.2 1.3A5.9 5.9 0 0 1 8 5.6Zm0 3.4c.7 0 1.3.3 1.8.7L8 11.6 6.2 9.7c.5-.4 1.1-.7 1.8-.7Z" /></svg>
        <svg viewBox="0 0 27 13" className={s.batt}><rect x=".5" y=".5" width="23" height="12" rx="3.6" fill="none" stroke="currentColor" strokeOpacity=".38" /><rect x="2.2" y="2.2" width="19.6" height="8.6" rx="2.1" /><path d="M25 4.4v4.2c.9-.3 1.5-1.1 1.5-2.1S25.9 4.7 25 4.4Z" fillOpacity=".4" /></svg>
      </span>
    </div>
  )
}

const Close = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" /></svg>
)
const Kebab = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="12" cy="19" r="1.9" /></svg>
)
const Drop = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.2s-6 6.6-6 10.9a6 6 0 0 0 12 0C18 9.8 12 3.2 12 3.2Zm-2.6 11.2c.2 1.5 1.3 2.6 2.8 2.8.4 0 .7.4.6.8 0 .4-.4.7-.8.6a4.7 4.7 0 0 1-4-4c0-.4.3-.8.7-.8.4-.1.7.2.7.6Z" /></svg>
)
const Pin = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2a7 7 0 0 0-7 7c0 5.1 7 12.8 7 12.8s7-7.7 7-12.8a7 7 0 0 0-7-7Zm0 9.6a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" /></svg>
)
const PhoneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" /></svg>
)
const Directions = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M21.7 11.3l-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4ZM14 14.5V12h-4v3H8v-4a1 1 0 0 1 1-1h5V7.5l3.5 3.5-3.5 3.5Z" /></svg>
)
const Chevron = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 6l6 6-6 6" /></svg>
)
const ChevronDown = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9.5l6 6 6-6" /></svg>
)
const Lock = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7.5a5 5 0 0 1 10 0V10h.5A1.5 1.5 0 0 1 19 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10H7Zm2 0h6V7.5a3 3 0 0 0-6 0V10Z" /></svg>
)
const Torch = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 2.5h8v3.6l-2 3v11.4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9.1l-2-3V2.5Zm4 9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Z" /></svg>
)
const Camera = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.2 4.5h5.6l1.4 2H20a2 2 0 0 1 2 2v9.5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2h3.8l1.4-2ZM12 9a4.2 4.2 0 1 0 0 8.4A4.2 4.2 0 0 0 12 9Zm0 1.8a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8Z" /></svg>
)
