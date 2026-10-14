'use client'
import { useEffect, useRef, useState } from 'react'
import s from './parts.module.css'

/*
 * Shared pieces for the bottom half (everything after the Descent film), so
 * every section speaks one visual language: scroll progress as a CSS
 * variable, count-up numerals, and the two devices we render in code.
 *
 * Progress is written to `--p` on the element (0 → 1). Without JavaScript,
 * or with reduced motion, `--p` stays at its CSS default of 1, which is the
 * finished composition, so nothing is ever stuck half-revealed.
 */

const clamp = (x) => Math.min(1, Math.max(0, x))

/**
 * Writes scroll progress to `--p` on ref.current.
 *  mode 'pin':  0 when the element's top reaches the viewport top, 1 when its
 *               bottom reaches the viewport bottom (for a tall wrapper around
 *               a sticky stage).
 *  mode 'flow': 0 when the element's top enters at the bottom of the
 *               viewport, 1 when its centre reaches the viewport centre.
 */
export function useProgress(ref, mode = 'flow') {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      let p
      if (mode === 'pin') {
        const span = r.height - vh
        p = span > 0 ? clamp(-r.top / span) : 1
      } else {
        p = clamp((vh - r.top) / (vh / 2 + r.height / 2))
      }
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref, mode])
}

/** A numeral that counts up once when it scrolls into view. Renders the final value first. */
export function CountUp({ to, decimals = 0, prefix = '', suffix = '', className }) {
  const ref = useRef(null)
  const [val, setVal] = useState(to)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.9) return // already on screen: leave it final
    setVal(0)
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = (t) => {
        const k = clamp((t - t0) / 1100)
        setVal(to * (1 - Math.pow(1 - k, 3)))
        if (k < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])
  return <span ref={ref} className={className}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

/** An iPhone-proportioned phone in code. Children render as the screen. */
export function Phone({ children, className = '', label }) {
  return (
    <div className={`${s.phone} ${className}`} role={label ? 'img' : undefined} aria-label={label}>
      <div className={s.screen}>
        {children}
        <span className={s.island} aria-hidden="true" />
      </div>
    </div>
  )
}

/** A Safari-style window in code. */
export function Browser({ url, children, className = '' }) {
  return (
    <div className={`${s.browser} ${className}`}>
      <div className={s.chrome} aria-hidden="true">
        <span className={s.lights}><i /><i /><i /></span>
        <span className={s.url}>{url}</span>
        <span />
      </div>
      <div className={s.viewport}>{children}</div>
    </div>
  )
}

/** Two-tone headline: line one full strength, line two dimmed. */
export function Headline({ as: Tag = 'h2', lead, dim, className = '', id }) {
  return (
    <Tag id={id} className={`${s.h} ${className}`}>
      {lead}
      {dim && <span className={s.dim}>{dim}</span>}
    </Tag>
  )
}

/** Spaced-caps eyebrow with a fine rule before it. */
export function Eyebrow({ children, className = '' }) {
  return <p className={`${s.eyebrow} ${className}`}>{children}</p>
}
