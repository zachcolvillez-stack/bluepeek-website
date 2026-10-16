'use client'
import { useRef } from 'react'
import { openEnquire } from '../../lib/enquire'
import { REVIEWS } from '../../lib/reviews'
import { useReviewAgg } from '../../lib/useReviews'
import { useProgress, Phone, Headline, Eyebrow } from './parts'
import s from './Systems.module.css'

/**
 * 3 · AI systems. Two beats, one idea each:
 *   1  The product: Bluepeek's real tap-to-review cards, fanning apart as
 *      they rise into view, shot like an accessory.
 *   2  The automation: one phone where the follow-up thread arrives message by
 *      message (demo workspace), beside Bluepeek's own live Google rating.
 * Every customer receives the same Google review link: no review gating.
 */

const THREAD = [
  { who: 'biz', day: 'Monday 9:02 am', text: 'Hi Sarah, it’s Your Business. Your car’s due for its next service. Want us to book you in?' },
  { who: 'me', text: 'Yes please! Thursday morning?' },
  { who: 'biz', text: 'Booked for Thursday, 8:30 am. See you then.' },
  { who: 'biz', day: 'Thursday 3:42 pm', text: 'Thanks for coming in today, Sarah. Would you mind leaving a quick Google review? It really helps.' },
  { who: 'link' },
  { who: 'me', text: 'Done. Five stars from me!' },
]
const QUOTES = REVIEWS.filter((r) => ['Darren Marshall', 'Adam Sa'].includes(r.author))

export default function Systems() {
  const cardsRef = useRef(null)
  const threadRef = useRef(null)
  useProgress(cardsRef, 'flow')
  useProgress(threadRef, 'flow')
  const agg = useReviewAgg()

  return (
    <section id="systems" className={s.root} aria-labelledby="systems-h">
      {/* Beat 1: the product. */}
      <div ref={cardsRef} className={s.product}>
        <header className={s.head}>
          <Eyebrow>3 · AI systems</Eyebrow>
          <Headline id="systems-h" className={s.title} lead="Reviews on autopilot." dim="Every customer asked. Every time." />
        </header>
        <div className={s.cards} role="img" aria-label="Bluepeek tap-to-review NFC cards in black and white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`${s.card} ${s.cardBlack}`} src="/bottom/sys/card-black.webp" alt="" loading="lazy" decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`${s.card} ${s.cardWhite}`} src="/bottom/sys/card-white.webp" alt="" loading="lazy" decoding="async" />
          <span className={s.floor} aria-hidden="true" />
        </div>
        <p className={s.lit}>Customers tap their phone on the card and land <b>straight on your Google review page</b>. No searching, no typing. Cards and plaques <b>from $39</b>.</p>
      </div>

      {/* Beat 2: the automation. */}
      <div ref={threadRef} className={s.auto}>
        <div className={s.autoInner}>
          <div className={s.copy}>
            <Headline as="h3" className={s.autoHead} lead="The follow-ups" dim="send themselves." />
            <p className={s.lit2}>We connect your <b>booking system or CRM</b>, or import your customer list. After every job, each customer gets <b>a text and an email</b> with the same link to your Google review page, then <b>a reminder</b> when it’s time to book again. More recent reviews help you <b>climb Google Maps</b>.</p>
            <div className={s.ctas}>
              <a href="#contact" className={s.pill} onClick={(e) => { e.preventDefault(); openEnquire('Google Reviews system') }}>Get more Google reviews <span aria-hidden="true">→</span></a>
              <a href="#contact" className={s.link} onClick={(e) => { e.preventDefault(); openEnquire('AI automation') }}>Automate my follow-ups <span aria-hidden="true">→</span></a>
            </div>
          </div>

          <Phone className={s.phone} label="Example text thread from a business to its customer: a service reminder, a booking, then a Google review request with a link">
            <div className={s.sms}>
              <div className={s.smsHead}>
                <span className={s.avatar}>YB</span>
                <span className={s.smsName}>Your Business</span>
                <span className={s.demo}>Demo</span>
              </div>
              <div className={s.msgs}>
                {THREAD.map((m, i) => (
                  <div key={i} className={s.msgRow} style={{ '--t': (0.34 + i * 0.075).toFixed(3) }}>
                    {m.day && <p className={s.day}>{m.day}</p>}
                    {m.who === 'link' ? (
                      <div className={s.linkCard}>
                        <span className={s.g} aria-hidden="true">G</span>
                        <span><b>Your Business</b><em>Write a review · g.page</em></span>
                      </div>
                    ) : (
                      <p className={m.who === 'me' ? s.me : s.biz}>{m.text}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Phone>
        </div>
      </div>

      {/* Beat 3: the proof, our own. */}
      <div className={s.proof}>
        <p className={s.score}>{agg.ratingValue}</p>
        <p className={s.stars} aria-hidden="true">★★★★★</p>
        <p className={s.scoreLabel}>Bluepeek on Google · {agg.reviewCount} reviews</p>
        <ul className={s.quotes}>
          {QUOTES.map((q) => (
            <li key={q.author}><q>{q.text}</q><span>{q.author} · Google review</span></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
