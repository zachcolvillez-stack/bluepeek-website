'use client'

/**
 * Bluepeek brand mark — rounded square with blue→purple gradient
 * and a white cube outline. Matches the brand logo, scalable SVG.
 *
 * Props:
 *   size       — px size of the icon (default 36)
 *   showText   — render the "bluepeek" wordmark beside it (default true)
 *   textColor  — wordmark colour (default white)
 */
export default function Logo({ size = 36, showText = true, textColor = '#0c1c34' }) {
  const gid = 'bp-grad'
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 4px 12px rgba(79,134,247,0.35))', flexShrink: 0 }}>
        <defs>
          <linearGradient id={gid} x1="10" y1="6" x2="92" y2="96" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f86f7" />
            <stop offset="0.55" stopColor="#6f6ff5" />
            <stop offset="1" stopColor="#9b6bf2" />
          </linearGradient>
        </defs>
        {/* Rounded square */}
        <rect x="4" y="4" width="92" height="92" rx="26" fill={`url(#${gid})`} />
        {/* Cube outline */}
        <g stroke="#ffffff" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" fill="none">
          <path d="M50 26 L72 38 L72 62 L50 74 L28 62 L28 38 Z" />
          <path d="M50 26 L50 50 M50 50 L72 38 M50 50 L28 38" />
        </g>
      </svg>
      {showText && (
        <span className="font-bold text-lg tracking-tight" style={{ color: textColor }}>bluepeek</span>
      )}
    </span>
  )
}
