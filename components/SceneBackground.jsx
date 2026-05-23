'use client'

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Solid dark base */}
      <div className="absolute inset-0" style={{ background: '#0a0a0c' }} />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-bg opacity-60" />

      {/* Single soft cyan accent — top right, faint */}
      <div
        className="absolute"
        style={{
          top: '-200px',
          right: '-200px',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Top fade for header readability */}
      <div className="absolute top-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #0a0a0c 0%, transparent 100%)' }} />
    </div>
  )
}
