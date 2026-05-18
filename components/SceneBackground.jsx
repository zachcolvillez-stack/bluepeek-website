'use client'

const SCENES = {
  hero:           { glowX: '50%', glowY: '0%',   glowSize: '900px', glowColor: 'rgba(59,130,246,0.18)' },
  services:       { glowX: '85%', glowY: '15%',  glowSize: '800px', glowColor: 'rgba(99,102,241,0.16)' },
  work:           { glowX: '10%', glowY: '30%',  glowSize: '850px', glowColor: 'rgba(59,130,246,0.16)' },
  'how-it-works': { glowX: '90%', glowY: '50%',  glowSize: '750px', glowColor: 'rgba(96,165,250,0.18)' },
  reviews:        { glowX: '15%', glowY: '60%',  glowSize: '800px', glowColor: 'rgba(99,102,241,0.16)' },
  about:          { glowX: '80%', glowY: '80%',  glowSize: '900px', glowColor: 'rgba(59,130,246,0.18)' },
  contact:        { glowX: '50%', glowY: '40%',  glowSize: '1000px', glowColor: 'rgba(59,130,246,0.20)' },
}

export default function SceneBackground({ scene }) {
  const s = SCENES[scene] || SCENES.hero

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base white */}
      <div className="absolute inset-0 bg-white" />

      {/* Soft dot grid */}
      <div className="absolute inset-0 dot-bg opacity-60" />

      {/* Moving blue glow */}
      <div
        className="absolute transition-all ease-out"
        style={{
          left: s.glowX,
          top: s.glowY,
          transform: 'translate(-50%, -50%)',
          width: s.glowSize,
          height: s.glowSize,
          background: `radial-gradient(circle, ${s.glowColor} 0%, transparent 70%)`,
          transitionDuration: '1800ms',
          filter: 'blur(20px)',
        }}
      />

      {/* Soft secondary glow */}
      <div
        className="absolute transition-all ease-out opacity-50"
        style={{
          right: s.glowX,
          bottom: s.glowY,
          transform: 'translate(50%, 50%)',
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, rgba(147,197,253,0.15) 0%, transparent 70%)`,
          transitionDuration: '2200ms',
          filter: 'blur(30px)',
        }}
      />
    </div>
  )
}
