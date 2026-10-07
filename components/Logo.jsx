'use client'

/**
 * Bluepeek brand mark: the cube on a flat lapiz tile, used in the nav and
 * footer. Flat on purpose (no gradient, gloss or shadow). The glossy app-icon
 * PNG in /brand stays for favicons and social images.
 *
 * Props:
 *   size       - px size of the tile (default 36)
 *   showText   - render the "Bluepeek" wordmark beside it (default true)
 *   textColor  - wordmark colour (default the site ink; footer passes white)
 */
export default function Logo({ size = 36, showText = true, textColor = 'var(--ink)' }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <span
        aria-hidden="true"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: size,
          height: size,
          borderRadius: size * 0.26,
          background: 'var(--lapiz)',
          flexShrink: 0,
        }}
      >
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinejoin="round">
          <path d="M12 2.5 20.5 7.2v9.6L12 21.5 3.5 16.8V7.2Z" />
          <path d="M3.5 7.2 12 12l8.5-4.8M12 12v9.5" />
        </svg>
      </span>
      {showText && (
        <span className="font-bold text-lg tracking-tight" style={{ color: textColor }}>Bluepeek</span>
      )}
    </span>
  )
}
