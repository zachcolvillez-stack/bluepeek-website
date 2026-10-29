'use client'
import { useEffect, useRef } from 'react'
import EnquireInline from '../EnquireInline'
import { SITE } from '../../lib/site'
import s from './Closing.module.css'

/**
 * Closing + contact. The page ends where the film began: in space, above the
 * same horizon as the film's first frame.
 *
 * One scroll moment, a sunrise. On desktop the closing composition (the two
 * founders, the enquiry form, the horizon) pins for a moment while the planet
 * lifts and the sun crests, landing on the film's opening frame just before
 * the footer. Phones and short screens get the same horizon in normal flow,
 * rising as it comes into view.
 *
 * Without JS, or with reduced motion, the horizon simply shows its final lit
 * state; nothing readable depends on the animation.
 */

// Zach on the left, Jac on the right: in their photos they face each other.
const FOUNDERS = [
  { name: 'Zach Colville', phone: '0468 955 806', tel: '+61468955806', img: '/bottom/p4/zach.webp' },
  { name: 'Jac Thomas-Rees', phone: '0402 923 253', tel: '+61402923253', img: '/bottom/p4/jac.webp' },
]

const PINNED = '(min-width: 1081px) and (min-height: 820px)'

export default function Closing() {
  const scene = useRef(null)
  const planet = useRef(null)

  useEffect(() => {
    const sceneEl = scene.current
    const planetEl = planet.current
    if (!sceneEl || !planetEl) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pinned = window.matchMedia(PINNED)
    let frame = 0
    let visible = false
    const update = () => {
      frame = 0
      if (reduce.matches) { planetEl.style.setProperty('--p', '1'); return }
      const vh = window.innerHeight
      let t
      if (pinned.matches) {
        // From the stage arriving (scene top 30% down the screen) to just before it un-pins.
        const top = sceneEl.getBoundingClientRect().top
        const pin = sceneEl.offsetHeight - vh
        t = (vh * 0.3 - top) / (vh * 0.3 + pin * 0.9)
      } else {
        // From the horizon's top edge entering to it sitting fully in view.
        const box = planetEl.getBoundingClientRect()
        t = (vh - box.top) / (box.height + vh * 0.16)
      }
      t = Math.min(1, Math.max(0, t))
      planetEl.style.setProperty('--p', (1 - (1 - t) * (1 - t)).toFixed(4))
    }
    const queue = () => { if (visible && !frame) frame = requestAnimationFrame(update) }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) queue()
    }, { rootMargin: '200px' })
    observer.observe(sceneEl)
    update()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    reduce.addEventListener?.('change', queue)
    pinned.addEventListener?.('change', queue)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      reduce.removeEventListener?.('change', queue)
      pinned.removeEventListener?.('change', queue)
    }
  }, [])

  return (
    <section id="contact" className={s.root} aria-labelledby="contact-title">
      <header className={`${s.wrap} ${s.head}`}>
        <p className={s.eyebrow}>Get a free quote</p>
        <h2 id="contact-title" className={s.title}>
          <span>Talk to the people</span>
          <span className={s.dim}>who&rsquo;ll build it.</span>
        </h2>
        <p className={s.lede}>
          Pick a service and <b>Jac or Zach will call you back within one business day.</b> No
          account managers and no hand-offs, just the two founders, <b>based on the Gold Coast
          and working Australia-wide.</b>
        </p>
      </header>

      <div className={s.scene} ref={scene}>
        <div className={s.stage}>
          <div className={`${s.wrap} ${s.row}`}>
            <ul className={s.founders} aria-label="The founders">
              {FOUNDERS.map(f => (
                <li key={f.name} className={s.founder}>
                  <img
                    className={s.photo} src={f.img} width="640" height="800" loading="lazy" decoding="async"
                    alt={`${f.name}, Bluepeek co-founder`}
                  />
                  <p className={s.name}>{f.name}<span>Co-founder</span></p>
                  <a className={s.phone} href={`tel:${f.tel}`} aria-label={`Call ${f.name} on ${f.phone}`}>{f.phone}</a>
                </li>
              ))}
            </ul>

            <div id="quote-form" className={s.form}>
              <ol className={s.steps} aria-label="Two steps">
                <li data-on="">1 · Choose a service</li>
                <li>2 · Your details</li>
              </ol>
              <h3 className={s.formHead}>Start your project.<span>It takes a minute.</span></h3>
              <EnquireInline />
            </div>
          </div>

          <div className={s.horizon}>
            <p className={s.email}>
              Prefer email? <a href={`mailto:${SITE.email}`}>{SITE.email}<span aria-hidden="true">&rarr;</span></a>
            </p>
            <div className={s.planet} ref={planet} aria-hidden="true">
              <div className={s.frame}>
                <picture>
                  <source media="(max-width: 760px)" srcSet="/bottom/p4/horizon-narrow.webp" />
                  <img className={s.earth} src="/bottom/p4/horizon-wide.webp" alt="" width="2400" height="612" loading="lazy" decoding="async" />
                </picture>
                <span className={s.night} />
                <span className={s.sun} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
