'use client'

/**
 * Light, premium background — crisp white with very subtle navy/blue
 * washes that fade into the page. Sits behind all content.
 */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: '#ffffff' }}>
      {/* Faint blue wash — top right */}
      <div
        className="absolute"
        style={{
          top: '-220px',
          right: '-160px',
          width: '720px',
          height: '720px',
          background: 'radial-gradient(circle, rgba(47,95,208,0.07) 0%, transparent 66%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Faint navy wash — mid left */}
      <div
        className="absolute"
        style={{
          top: '44%',
          left: '-240px',
          width: '660px',
          height: '660px',
          background: 'radial-gradient(circle, rgba(12,28,52,0.05) 0%, transparent 68%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  )
}
