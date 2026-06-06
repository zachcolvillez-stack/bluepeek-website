'use client'

/**
 * Premium light background — crisp white with very subtle navy/blue
 * glows and a faint dot grid. Sits behind all content, never blocks clicks.
 */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Faint dot grid for texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(11,35,80,0.045) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.6,
        }}
      />

      {/* Soft blue glow — top right */}
      <div
        className="absolute"
        style={{
          top: '-180px',
          right: '-120px',
          width: '620px',
          height: '620px',
          background: 'radial-gradient(circle, rgba(47,99,217,0.10) 0%, transparent 68%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Soft navy glow — bottom left */}
      <div
        className="absolute"
        style={{
          bottom: '-200px',
          left: '-160px',
          width: '560px',
          height: '560px',
          background: 'radial-gradient(circle, rgba(11,35,80,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
    </div>
  )
}
