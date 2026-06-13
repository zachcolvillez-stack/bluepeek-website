'use client'

/**
 * Light, minimal background — mostly white with soft pastel purple/blue
 * glows that fade naturally into the page. Sits behind all content.
 */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ background: '#ffffff' }}>
      {/* Soft blue glow — top right */}
      <div
        className="absolute"
        style={{
          top: '-200px',
          right: '-140px',
          width: '720px',
          height: '720px',
          background: 'radial-gradient(circle, rgba(125,179,250,0.16) 0%, transparent 66%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Pastel purple glow — mid left */}
      <div
        className="absolute"
        style={{
          top: '38%',
          left: '-220px',
          width: '660px',
          height: '660px',
          background: 'radial-gradient(circle, rgba(155,135,245,0.14) 0%, transparent 68%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Faint lavender wash — bottom */}
      <div
        className="absolute"
        style={{
          bottom: '-260px',
          right: '8%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(180,165,250,0.10) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
    </div>
  )
}
