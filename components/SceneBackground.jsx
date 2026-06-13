'use client'

/**
 * Dark, premium background — deep navy-black with subtle blue/purple
 * city-light glows that fade into the page. Sits behind all content.
 */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080b14 0%, #0a0e1a 50%, #080b14 100%)' }}>
      {/* Cool blue glow — top right */}
      <div
        className="absolute"
        style={{
          top: '-200px',
          right: '-140px',
          width: '720px',
          height: '720px',
          background: 'radial-gradient(circle, rgba(95,155,240,0.16) 0%, transparent 66%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Purple glow — mid left */}
      <div
        className="absolute"
        style={{
          top: '40%',
          left: '-220px',
          width: '660px',
          height: '660px',
          background: 'radial-gradient(circle, rgba(140,110,240,0.14) 0%, transparent 68%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Faint cyan wash — bottom */}
      <div
        className="absolute"
        style={{
          bottom: '-260px',
          right: '8%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(90,200,250,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  )
}
