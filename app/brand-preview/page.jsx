export const metadata = { title: 'Brand motion preview', robots: { index: false, follow: false } }

const VARIANTS = [
  { src: '/email/logo-animated.gif',            label: 'Email GIF',        note: '110px · 99KB · for the signature', bg: '#ffffff' },
  { src: '/brand/motion/logo-alpha.webp',       label: 'Transparent WebP', note: '320px · 141KB · true alpha',        bg: 'orange' },
  { src: '/brand/motion/logo-alpha.png',        label: 'Transparent APNG', note: '240px · 1.2MB · true alpha',        bg: 'photo' },
  { src: '/brand/motion/logo-greenscreen.gif',  label: 'Green screen',     note: '320px · 556KB · #00FF00 key',       bg: '#111111' },
]

function bgStyle(bg) {
  if (bg === 'orange') return { background: 'linear-gradient(135deg,#ff6a1a,#ffb020)' }
  if (bg === 'photo') return { backgroundImage: 'url(/screenshots/phones/rodano.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }
  return { background: bg }
}

export default function BrandPreview() {
  return (
    <main style={{ minHeight: '100vh', background: '#0d1117', padding: '48px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontSize: 30, marginBottom: 8 }}>Blue Peek animated mark</h1>
        <p style={{ color: '#8b98a9', marginBottom: 40, fontSize: 15 }}>
          Gloss sweep. Each variant on a background that proves what it does.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24 }}>
          {VARIANTS.map(v => (
            <div key={v.src} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #232b36' }}>
              <div style={{ ...bgStyle(v.bg), display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 36, minHeight: 220 }}>
                <img src={v.src} alt={v.label} style={{ width: 150, height: 150, display: 'block' }} />
              </div>
              <div style={{ padding: '14px 16px', background: '#151b23' }}>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0 }}>{v.label}</p>
                <p style={{ color: '#8b98a9', fontSize: 12, margin: '4px 0 0' }}>{v.note}</p>
                <a href={v.src} download style={{ color: '#4E9BFF', fontSize: 12, textDecoration: 'none' }}>download</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
