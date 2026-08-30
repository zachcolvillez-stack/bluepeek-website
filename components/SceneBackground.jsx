'use client'

/** White canvas with faint lapiz washes. Sits behind all content. */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute" style={{
        top: '-220px', right: '-160px', width: '720px', height: '720px',
        background: 'radial-gradient(circle, rgba(43,76,155,0.09) 0%, transparent 66%)', filter: 'blur(80px)',
      }} />
      <div className="absolute" style={{
        top: '44%', left: '-240px', width: '660px', height: '660px',
        background: 'radial-gradient(circle, rgba(43,76,155,0.06) 0%, transparent 68%)', filter: 'blur(90px)',
      }} />
    </div>
  )
}
