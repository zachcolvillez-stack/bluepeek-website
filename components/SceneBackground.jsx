'use client'

const SCENES = {
  hero: {
    position: 'center 55%',
    scale: 1.08,
    overlay: 'linear-gradient(180deg, rgba(2,8,23,0.55) 0%, rgba(2,8,23,0.6) 50%, rgba(2,8,23,0.95) 100%)',
    tint: 'radial-gradient(ellipse at center top, rgba(59,130,246,0.15) 0%, transparent 60%)',
  },
  services: {
    position: 'center 25%',
    scale: 1.45,
    overlay: 'linear-gradient(180deg, rgba(2,8,23,0.7) 0%, rgba(2,8,23,0.65) 50%, rgba(2,8,23,0.95) 100%)',
    tint: 'radial-gradient(ellipse at top right, rgba(99,102,241,0.18) 0%, transparent 60%)',
  },
  work: {
    position: '30% 40%',
    scale: 1.3,
    overlay: 'linear-gradient(180deg, rgba(2,8,23,0.72) 0%, rgba(2,8,23,0.7) 50%, rgba(2,8,23,0.95) 100%)',
    tint: 'radial-gradient(ellipse at right, rgba(99,102,241,0.18) 0%, transparent 60%)',
  },
  'how-it-works': {
    position: '70% 60%',
    scale: 1.25,
    overlay: 'linear-gradient(180deg, rgba(2,8,23,0.75) 0%, rgba(2,8,23,0.7) 50%, rgba(2,8,23,0.95) 100%)',
    tint: 'radial-gradient(ellipse at left, rgba(59,130,246,0.2) 0%, transparent 60%)',
  },
  reviews: {
    position: 'center 50%',
    scale: 1.2,
    overlay: 'linear-gradient(180deg, rgba(2,8,23,0.7) 0%, rgba(2,8,23,0.65) 50%, rgba(2,8,23,0.95) 100%)',
    tint: 'radial-gradient(ellipse at top left, rgba(96,165,250,0.2) 0%, transparent 60%)',
  },
  about: {
    position: 'center 85%',
    scale: 1.55,
    overlay: 'linear-gradient(180deg, rgba(2,8,23,0.7) 0%, rgba(2,8,23,0.6) 50%, rgba(2,8,23,0.95) 100%)',
    tint: 'radial-gradient(ellipse at bottom, rgba(96,165,250,0.22) 0%, transparent 60%)',
  },
  contact: {
    position: 'center 35%',
    scale: 1.15,
    overlay: 'linear-gradient(180deg, rgba(2,8,23,0.78) 0%, rgba(2,8,23,0.72) 50%, rgba(2,8,23,0.95) 100%)',
    tint: 'radial-gradient(ellipse at center, rgba(59,130,246,0.25) 0%, transparent 50%)',
  },
}

export default function SceneBackground({ scene }) {
  const s = SCENES[scene] || SCENES.hero

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Background image — transitions position & scale */}
      <div
        className="absolute inset-0 transition-all ease-out"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: s.position,
          transform: `scale(${s.scale})`,
          transitionDuration: '1800ms',
        }}
      />
      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 transition-all ease-out"
        style={{ background: s.overlay, transitionDuration: '1800ms' }}
      />
      {/* Blue tint that shifts per scene */}
      <div
        className="absolute inset-0 transition-all ease-out"
        style={{ background: s.tint, transitionDuration: '1800ms' }}
      />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,58,95,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,95,0.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  )
}
