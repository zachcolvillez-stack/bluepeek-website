'use client'

/**
 * Premium navy background — deep blue base with subtle brand-gradient
 * glows and a faint grid. Sits behind all content, never blocks clicks.
 */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: '#081b3e' }}>
      {/* Faint grid for texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.7,
        }}
      />

      {/* Brand-blue glow — top right */}
      <div
        className="absolute"
        style={{
          top: '-160px',
          right: '-100px',
          width: '640px',
          height: '640px',
          background: 'radial-gradient(circle, rgba(79,134,247,0.18) 0%, transparent 68%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Brand-purple glow — bottom left */}
      <div
        className="absolute"
        style={{
          bottom: '-200px',
          left: '-160px',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(155,107,242,0.14) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
    </div>
  )
}
