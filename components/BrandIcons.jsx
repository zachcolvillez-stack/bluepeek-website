'use client'

/* Real platform marks. lucide-react has no TikTok glyph, so all three are
   defined here as paths for a consistent weight and size. */

export function InstagramMark({ size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookMark({ size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.02H7.9v-2.92h2.54V9.84c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.92h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
    </svg>
  )
}

export function TikTokMark({ size = 18, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.68 5.68 0 0 0-.77-.05 5.66 5.66 0 1 0 5.66 5.66V9.01a7.35 7.35 0 0 0 4.29 1.37V7.3a4.29 4.29 0 0 1-3.21-1.48Z" />
    </svg>
  )
}

/** Row of platform marks, used where a single generic icon would be vaguer. */
export function SocialMarks({ size = 18, className = '', style }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} style={style}>
      <InstagramMark size={size} />
      <FacebookMark size={size} />
      <TikTokMark size={size} />
    </span>
  )
}
