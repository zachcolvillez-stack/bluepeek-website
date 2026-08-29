'use client'

/**
 * Dark, cinematic background — deep navy canvas with faint blue washes
 * that fade into the page. Sits behind all content.
 */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: 'var(--bg)' }}>
      {/* Blue wash — top right */}
      <div
        className="absolute"
        style={{
          top: '-220px',
          right: '-160px',
          width: '720px',
          height: '720px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 66%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Fainter wash — mid left */}
      <div
        className="absolute"
        style={{
          top: '44%',
          left: '-240px',
          width: '660px',
          height: '660px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 68%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  )
}
