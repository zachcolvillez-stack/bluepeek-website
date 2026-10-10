'use client'
import { useId } from 'react'

/**
 * Bluepeek brand mark: the glass cube (chosen 10-10 for the film homepage)
 * beside the lowercase "bluepeek" wordmark.
 *
 * The cube is the same isometric cube as the old blue app tile, drawn as
 * frosted glass with lit edges. The tile (/brand/logo.png) remains the
 * favicon / app icon.
 *
 * Props:
 *   size       - px size of the cube (default 36)
 *   showText   - render the wordmark beside it (default true)
 *   tone       - 'light' for light backgrounds (ink edges, blue-tinted glass),
 *                'dark' for dark or photographic ones (white glass)
 *   textColor  - wordmark colour override
 */
export default function Logo({ size = 36, showText = true, tone = 'light', textColor }) {
  const id = useId().replace(/:/g, '')
  const dark = tone === 'dark'
  const edge = dark ? '#fff' : '#1b2233'
  const top = dark ? ['#fff', 0.55, '#fff', 0.22] : ['#0B3ED9', 0.28, '#0B3ED9', 0.1]
  const left = dark ? ['#cfdcff', 0.35, '#7f9cff', 0.12] : ['#0B3ED9', 0.42, '#0B3ED9', 0.2]
  const right = dark ? ['#fff', 0.18, '#fff', 0.05] : ['#0B3ED9', 0.16, '#0B3ED9', 0.05]
  const grad = (key, [c0, o0, c1, o1], x2, y2, x1 = 0) => (
    <linearGradient id={`${id}${key}`} x1={x1} y1="0" x2={x2} y2={y2}>
      <stop offset="0" stopColor={c0} stopOpacity={o0} />
      <stop offset="1" stopColor={c1} stopOpacity={o1} />
    </linearGradient>
  )
  return (
    <span className="bp-mark" style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32, userSelect: 'none' }}>
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" style={{ flexShrink: 0, display: 'block' }}>
        <defs>
          {grad('t', top, 0, 1)}
          {grad('l', left, 1, 1)}
          {grad('r', right, 0, 1, 1)}
        </defs>
        <path d="M24 4.5 41 14.2 24 24 7 14.2Z" fill={`url(#${id}t)`} />
        <path d="M7 14.2 24 24v19.5L7 33.8Z" fill={`url(#${id}l)`} />
        <path d="M41 14.2 24 24v19.5l17-9.7Z" fill={`url(#${id}r)`} />
        <g fill="none" stroke={edge} strokeWidth="1.25" strokeLinejoin="round">
          <path d="M24 4.5 41 14.2v19.6L24 43.5 7 33.8V14.2Z" strokeOpacity=".95" />
          <path d="M7 14.2 24 24l17-9.8M24 24v19.5" strokeOpacity=".7" />
        </g>
      </svg>
      {showText && (
        <span
          className="bp-wordmark"
          style={{
            color: textColor || (dark ? '#fff' : 'var(--ink)'),
            fontFamily: 'var(--font-tight), Inter, Arial, sans-serif',
            fontWeight: 400,
            fontSize: size * 0.6,
            letterSpacing: '-0.035em',
            lineHeight: 1,
          }}
        >
          bluepeek
        </span>
      )}
    </span>
  )
}
