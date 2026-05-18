'use client'

const SCENES = {
  hero:           { glowX: '50%', glowY: '10%',  glowColor: 'rgba(59,130,246,0.32)',  secondX: '20%', secondY: '70%', secondColor: 'rgba(147,197,253,0.28)' },
  services:       { glowX: '85%', glowY: '20%',  glowColor: 'rgba(99,102,241,0.30)',  secondX: '15%', secondY: '60%', secondColor: 'rgba(96,165,250,0.25)' },
  work:           { glowX: '15%', glowY: '30%',  glowColor: 'rgba(59,130,246,0.30)',  secondX: '85%', secondY: '70%', secondColor: 'rgba(147,197,253,0.28)' },
  'how-it-works': { glowX: '80%', glowY: '50%',  glowColor: 'rgba(96,165,250,0.32)',  secondX: '20%', secondY: '20%', secondColor: 'rgba(99,102,241,0.25)' },
  reviews:        { glowX: '20%', glowY: '60%',  glowColor: 'rgba(99,102,241,0.30)',  secondX: '80%', secondY: '20%', secondColor: 'rgba(59,130,246,0.28)' },
  about:          { glowX: '75%', glowY: '75%',  glowColor: 'rgba(59,130,246,0.32)',  secondX: '20%', secondY: '30%', secondColor: 'rgba(147,197,253,0.28)' },
  contact:        { glowX: '50%', glowY: '40%',  glowColor: 'rgba(59,130,246,0.35)',  secondX: '80%', secondY: '80%', secondColor: 'rgba(99,102,241,0.28)' },
}

export default function SceneBackground({ scene }) {
  const s = SCENES[scene] || SCENES.hero

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base — soft blue-white instead of pure white */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #f8fbff 50%, #f0f5ff 100%)' }} />

      {/* Soft dot grid */}
      <div className="absolute inset-0 dot-bg opacity-80" />

      {/* Primary moving blue glow — bigger and more visible */}
      <div
        className="absolute transition-all ease-out"
        style={{
          left: s.glowX,
          top: s.glowY,
          transform: 'translate(-50%, -50%)',
          width: '1100px',
          height: '1100px',
          background: `radial-gradient(circle, ${s.glowColor} 0%, transparent 65%)`,
          transitionDuration: '2000ms',
          filter: 'blur(30px)',
        }}
      />

      {/* Secondary moving glow */}
      <div
        className="absolute transition-all ease-out"
        style={{
          left: s.secondX,
          top: s.secondY,
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: `radial-gradient(circle, ${s.secondColor} 0%, transparent 65%)`,
          transitionDuration: '2500ms',
          filter: 'blur(40px)',
        }}
      />

      {/* Static soft accent shapes for depth */}
      <div
        className="absolute"
        style={{
          right: '-200px',
          top: '20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(191,219,254,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '-150px',
          bottom: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(199,210,254,0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle top-right corner gradient for warmth */}
      <div
        className="absolute top-0 right-0 w-full h-1/2"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(96,165,250,0.12) 0%, transparent 60%)',
        }}
      />
    </div>
  )
}
