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
      {/* Soft blue-white base */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #f0f7ff 0%, #f8fbff 40%, #e8f1ff 100%)' }} />

      {/* Soft dot grid */}
      <div className="absolute inset-0 dot-bg opacity-70" />

      {/* Primary moving blue glow */}
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

      {/* Soft accent shape top right */}
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

      {/* Mountain outlines — layered for depth */}
      <svg
        className="absolute bottom-0 left-0 w-full pointer-events-none"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: '45vh', maxHeight: '450px' }}
        fill="none"
      >
        {/* Back layer — palest, thinnest */}
        <path
          d="M0,300 L80,220 L180,260 L290,180 L400,230 L520,170 L640,220 L760,160 L880,210 L1000,170 L1130,200 L1260,150 L1380,190 L1440,160"
          stroke="rgba(147,197,253,0.6)"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Middle layer */}
        <path
          d="M0,330 L90,260 L200,300 L320,230 L450,275 L580,215 L710,260 L840,205 L970,250 L1110,200 L1250,240 L1380,210 L1440,225"
          stroke="rgba(96,165,250,0.7)"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        {/* Front layer — strongest line */}
        <path
          d="M0,360 L120,310 L260,350 L400,295 L540,335 L680,275 L820,320 L960,280 L1100,310 L1230,270 L1360,295 L1440,285"
          stroke="rgba(59,130,246,0.8)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
