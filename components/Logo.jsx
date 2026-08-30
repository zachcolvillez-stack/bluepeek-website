'use client'

/**
 * Bluepeek brand mark — the real logo asset, used everywhere.
 * Single source: /brand/logo.png. Do not redraw it in SVG.
 *
 * Props:
 *   size       - px size of the tile (default 36)
 *   showText   - render the "bluepeek" wordmark beside it (default true)
 *   textColor  - wordmark colour (default the site ink; footer passes white)
 */
export default function Logo({ size = 36, showText = true, textColor = 'var(--ink)' }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <img
        src="/brand/logo-256.png"
        alt=""
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.26,
          flexShrink: 0,
          boxShadow: '0 4px 12px rgba(11,62,217,0.28)',
        }}
      />
      {showText && (
        <span className="font-bold text-lg tracking-tight" style={{ color: textColor }}>Bluepeek</span>
      )}
    </span>
  )
}
