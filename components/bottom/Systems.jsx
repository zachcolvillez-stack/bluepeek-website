'use client'
import { useEffect, useRef } from 'react'
import { openEnquire } from '../../lib/enquire'
import { useReviewAgg } from '../../lib/useReviews'
import { REVIEWS } from '../../lib/reviews'
import s from './Systems.module.css'

/**
 * 3 · AI systems.
 *
 * One pinned stage, four beats, one phone. Each beat is a single idea: a
 * headline and a short paragraph beside one large, complete product render.
 *   1 After the job: the review request arrives by text AND email.
 *   2 In person: the customer taps a Bluepeek NFC card, Google's review page opens.
 *   3 Later: the rebooking email brings them back; fresh reviews lift Maps rank.
 *   4 Proof: Bluepeek's own Google reviews (live rating, verbatim quotes) + CTA.
 * Every route lands on the business's Google review page (no review gating).
 *
 * The section is 3.15 viewports tall; the stage pins for 2.15 of them and swaps
 * beats at fixed points, so any viewport-sized slice shows one settled beat.
 * Without JS, or with reduced motion, the four beats simply stack.
 */

const pick = (p) => (p < 0.15 ? 0 : p < 0.48 ? 1 : p < 0.82 ? 2 : 3)
const SHOWN = ['Katia V', 'Darren Marshall', 'Adam Sa']
  .map((n) => REVIEWS.find((r) => r.author === n))
  .filter(Boolean)
const monthYear = (d) => new Date(d + 'T00:00:00').toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })

export default function Systems() {
  const agg = useReviewAgg()
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const staticLayout = window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 899px), (max-height: 649px)')
    const beats = [...el.querySelectorAll('[data-beat]')]
    let raf = 0
    let cur = -1
    const update = () => {
      raf = 0
      if (staticLayout.matches) {
        el.classList.remove(s.armed)
        beats.forEach((b) => { b.removeAttribute('aria-hidden'); b.inert = false })
        cur = -1
        return
      }
      el.classList.add(s.armed)
      const r = el.getBoundingClientRect()
      const span = r.height - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1
      const i = pick(p)
      if (i !== cur) {
        beats.forEach((b, k) => {
          b.classList.toggle(s.on, k === i)
          b.setAttribute('aria-hidden', String(k !== i))
          b.inert = k !== i
        })
        cur = i
      }
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    staticLayout.addEventListener('change', onScroll)
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      el.classList.remove(s.armed)
      beats.forEach((b) => { b.removeAttribute('aria-hidden'); b.inert = false })
      staticLayout.removeEventListener('change', onScroll)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="systems" ref={root} className={s.root} aria-labelledby="systems-title">
      <div className={s.stage}>
        {/* 1 · the ask, by text and email */}
        <div className={`${s.beat} ${s.on}`} data-beat="0">
          <div className={s.grid}>
            <div className={s.text}>
              <p className={s.eyebrow}>3 · AI systems</p>
              <h2 id="systems-title" className={s.title}>
                <span>Finish the job.</span>
                <span className={s.dim}>The review request sends itself.</span>
              </h2>
              <p className={s.lede}>
                Bluepeek connects to your booking system, CRM or customer list. <b>After every job, each customer gets a text and an email with a link straight to your Google review page.</b>
              </p>
            </div>
            <div className={s.visual}>
              <Phone tone="dark" label="Example lock screen: a text and an email from A Grade Auto asking for a Google review">
                <div className={s.lock}>
                  <span className={`${s.demo} ${s.demoDark}`}>Demo</span>
                  <p className={s.date}>Thursday 9 April</p>
                  <p className={s.clock}>3:42</p>
                  <div className={s.stack}>
                    <div className={s.note}>
                      <span className={`${s.app} ${s.appMsg}`}>
                        <svg viewBox="0 0 24 24"><path d="M12 4.5c-4.7 0-8.5 3-8.5 6.8 0 2.2 1.3 4.1 3.3 5.4-.2 1.1-.8 2.2-1.7 3 1.9-.1 3.5-.8 4.6-1.8.7.1 1.5.2 2.3.2 4.7 0 8.5-3 8.5-6.8S16.7 4.5 12 4.5Z" fill="#fff" /></svg>
                      </span>
                      <div className={s.noteBody}>
                        <p className={s.noteHead}><b>A Grade Auto</b><span>now</span></p>
                        <p>Thanks for coming in today, Sarah! Would you mind leaving us a quick Google review? g.page/r/agradeauto</p>
                      </div>
                    </div>
                    <div className={s.note}>
                      <span className={`${s.app} ${s.appMail}`}>
                        <svg viewBox="0 0 24 24"><rect x="3.5" y="6" width="17" height="12" rx="2.2" fill="#fff" /><path d="m4.5 7.5 7.5 5.6 7.5-5.6" fill="none" stroke="#1e7cf2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <div className={s.noteBody}>
                        <p className={s.noteHead}><b>A Grade Auto</b><span>now</span></p>
                        <p><b className={s.subj}>How did we go today?</b>Your review helps other drivers find us. Tap to leave it on Google.</p>
                      </div>
                    </div>
                  </div>
                  <div className={s.lockFoot}><i /><i /></div>
                </div>
              </Phone>
            </div>
          </div>
        </div>

        {/* 2 · tap the card, Google opens */}
        <div className={s.beat} data-beat="1">
          <div className={s.grid}>
            <div className={s.text}>
              <p className={s.eyebrow}>3 · AI systems</p>
              <h3 className={s.title}>
                <span>One tap at the counter.</span>
                <span className={s.dim}>Review cards from $39.</span>
              </h3>
              <p className={s.lede}>
                <b>Customers tap their phone on a Bluepeek card or plaque, and your Google review page opens.</b> No searching for your business name.
              </p>
            </div>
            <div className={`${s.visual} ${s.pair}`}>
              <figure className={s.card}>
                <img src="/bottom/p3/card-black.webp" width="463" height="812" loading="lazy" decoding="async" alt="Bluepeek NFC review card" />
              </figure>
              <Phone label="Example: Google's review page for A Grade Auto, opened by tapping the card">
                <div className={s.gsheet}>
                  <span className={s.demo}>Demo</span>
                  <div className={s.gTop}>
                    <svg className={s.x} viewBox="0 0 12 12"><path d="m2 2 8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                    <span className={s.gBiz}><img src="/brand/platforms/google-color.svg" alt="" width="48" height="48" />A Grade Auto</span>
                  </div>
                  <div className={s.gWho}>
                    <span className={s.gAva}>S</span>
                    <span><b>Sarah</b><small>Posting publicly across Google</small></span>
                  </div>
                  <div className={s.gStars} aria-hidden="true">
                    {Array.from({ length: 5 }, (_, i) => (
                      <svg key={i} viewBox="0 0 24 24"><path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                    ))}
                  </div>
                  <div className={s.gField}>Share details of your own experience at this place</div>
                  <div className={s.gPhotos}>Add photos and videos</div>
                  <div className={s.gPost}>Post</div>
                </div>
              </Phone>
            </div>
          </div>
        </div>

        {/* 3 · the follow-up brings them back */}
        <div className={s.beat} data-beat="2">
          <div className={s.grid}>
            <div className={s.text}>
              <p className={s.eyebrow}>3 · AI systems</p>
              <h3 className={s.title}>
                <span>Then it brings them back.</span>
                <span className={s.dim}>Rebooking by text and email.</span>
              </h3>
              <p className={s.lede}>
                <b>When a customer is due again, Bluepeek sends the reminder for you</b>, by text and by email. More visits mean more fresh reviews, and <b>recent reviews help you rank higher on Google Maps.</b>
              </p>
            </div>
            <div className={s.visual}>
              <Phone label="Example email from A Grade Auto reminding Sarah to book her next service">
                <div className={s.mail}>
                  <div className={s.mailNav}>
                    <span className={s.inbox}><svg viewBox="0 0 12 20"><path d="M10 2 2 10l8 8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>Inbox</span>
                    <span className={s.demo}>Demo</span>
                  </div>
                  <div className={s.mailFrom}>
                    <span className={s.mailAva}>AG</span>
                    <span className={s.mailWho}><b>A Grade Auto</b><small>To: Sarah</small></span>
                    <span className={s.mailTime}>9:00 am</span>
                  </div>
                  <p className={s.mailSubj}>Sarah, your next service is due</p>
                  <div className={s.mailBody}>
                    <p>Hi Sarah,</p>
                    <p>It’s been six months since your last service with us. Pick a time that suits you and we’ll have you in and out.</p>
                    <span className={s.mailBtn}>Book my service</span>
                    <p className={s.mailSign}>A Grade Auto<br />Nerang QLD</p>
                    <p className={s.mailUnsub}>Unsubscribe</p>
                  </div>
                </div>
              </Phone>
            </div>
          </div>
        </div>

        {/* 4 · proof + call to action */}
        <div className={s.beat} data-beat="3">
          <div className={s.grid}>
            <div className={s.text}>
              <p className={s.eyebrow}>3 · AI systems</p>
              <h3 className={s.title}>
                <span>We’re rated {agg.ratingValue} on Google.</span>
                <span className={s.dim}>Across {agg.reviewCount} real reviews.</span>
              </h3>
              <p className={s.lede}>
                Set up your <b>review requests, tap cards and follow-ups</b> in one go.
              </p>
              <div className={s.ctas}>
                <a href="#contact" className={s.pill} onClick={(e) => { e.preventDefault(); openEnquire('Google Reviews system') }}>Get more Google reviews</a>
                <a href="#contact" className={s.more} onClick={(e) => { e.preventDefault(); openEnquire('AI automation') }}>Automate my follow-ups <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className={s.visual}>
              <Phone label={`Bluepeek's Google reviews: rated ${agg.ratingValue} from ${agg.reviewCount} reviews`}>
                <div className={s.revs}>
                  <p className={s.revSrc}><img src="/brand/platforms/google-color.svg" alt="" width="48" height="48" />Google reviews</p>
                  <p className={s.revBiz}>Bluepeek</p>
                  <div className={s.revScore}>
                    <b>{agg.ratingValue}</b>
                    <Stars />
                    <span>{agg.reviewCount} reviews</span>
                  </div>
                  <ul className={s.revList}>
                    {SHOWN.map((r) => (
                      <li key={r.author}>
                        <p className={s.revHead}><span className={s.revAva}>{r.author[0]}</span><b>{r.author}</b></p>
                        <p className={s.revMeta}><Stars /> <span>{monthYear(r.date)}</span></p>
                        <p className={s.revText}>{r.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Phone>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stars() {
  return (
    <span className={s.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24"><path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8Z" /></svg>
      ))}
    </span>
  )
}

/** A phone built in CSS. Everything inside is sized in em off the phone width. */
function Phone({ tone = 'light', label, children }) {
  return (
    <div className={`${s.phone} ${tone === 'dark' ? s.phoneDark : ''}`} role="img" aria-label={label}>
      <i className={`${s.key} ${s.k1}`} />
      <i className={`${s.key} ${s.k2}`} />
      <i className={`${s.key} ${s.k3}`} />
      <i className={`${s.key} ${s.k4}`} />
      <div className={s.bezel}>
        <div className={s.screen} aria-hidden="true">
          <span className={s.island} />
          <div className={s.status}>
            <b>3:42</b>
            <span className={s.sys}>
              <svg viewBox="0 0 18 12" width="1.45em" height="0.95em"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
              <svg viewBox="0 0 16 12" width="1.3em" height="0.95em"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4Zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 0 0 8 4c-1.8 0-3.4.7-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3ZM8 9.4l2.1-2.2A3.2 3.2 0 0 0 8 6.4c-.8 0-1.5.3-2.1.8L8 9.4Z" /></svg>
              <svg viewBox="0 0 27 13" width="2.05em" height="1em"><rect x=".5" y=".5" width="23" height="12" rx="3.6" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="16.5" height="9" rx="2.2" /><path d="M25 4.4v4.2c.9-.3 1.5-1.1 1.5-2.1s-.6-1.8-1.5-2.1Z" opacity=".45" /></svg>
            </span>
          </div>
          <div className={s.view}>{children}</div>
          <span className={s.home} />
        </div>
      </div>
    </div>
  )
}
