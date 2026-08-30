export const metadata = { title: 'Brand motion preview', robots: { index: false, follow: false } }

const CARDS = [
  { src: '/brand/motion/card-jac.gif',              label: 'Jac — card GIF',        note: '640px · 532KB · white background', bg: '#ffffff' },
  { src: '/brand/motion/card-jac-alpha.webp',       label: 'Jac — transparent',     note: '640px · 100KB · true alpha',       bg: 'orange' },
  { src: '/brand/motion/card-jac-greenscreen.gif',  label: 'Jac — green screen',    note: '640px · 407KB · #00FF00 key',      bg: '#111' },
  { src: '/brand/motion/card-zach.gif',             label: 'Zach — card GIF',       note: '640px · 614KB · white background', bg: '#ffffff' },
  { src: '/brand/motion/card-zach-alpha.webp',      label: 'Zach — transparent',    note: '640px · 112KB · true alpha',       bg: 'photo' },
  { src: '/brand/motion/card-zach-greenscreen.gif', label: 'Zach — green screen',   note: '640px · 484KB · #00FF00 key',      bg: '#111' },
]

const LOGOS = [
  { src: '/email/logo-animated.gif',           label: 'Logo — email GIF',    note: '110px · 99KB',  bg: '#ffffff' },
  { src: '/brand/motion/logo-alpha.webp',      label: 'Logo — transparent',  note: '320px · 141KB', bg: 'orange' },
  { src: '/brand/motion/logo-greenscreen.gif', label: 'Logo — green screen', note: '320px · 556KB', bg: '#111' },
]

function bgStyle(bg) {
  if (bg === 'orange') return { background: 'linear-gradient(135deg,#ff6a1a,#ffb020)' }
  if (bg === 'photo') return { backgroundImage: 'url(/screenshots/phones/rodano.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }
  return { background: bg }
}

function Grid({ items, wide }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(${wide ? 380 : 230}px,1fr))`, gap: 22, marginBottom: 44 }}>
      {items.map(v => (
        <div key={v.src} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #232b36' }}>
          <div style={{ ...bgStyle(v.bg), display: 'flex', alignItems: 'center', justifyContent: 'center', padding: wide ? 20 : 34, minHeight: wide ? 210 : 200 }}>
            <img src={v.src} alt={v.label} style={{ maxWidth: '100%', width: wide ? '100%' : 140, display: 'block' }} />
          </div>
          <div style={{ padding: '13px 16px', background: '#151b23' }}>
            <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0 }}>{v.label}</p>
            <p style={{ color: '#8b98a9', fontSize: 12, margin: '4px 0 2px' }}>{v.note}</p>
            <a href={v.src} download style={{ color: '#4E9BFF', fontSize: 12, textDecoration: 'none' }}>download</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BrandPreview() {
  return (
    <main style={{ minHeight: '100vh', background: '#0d1117', padding: '48px 24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <h1 style={{ color: '#fff', fontSize: 30, marginBottom: 6 }}>Blue Peek animated assets</h1>
        <p style={{ color: '#8b98a9', marginBottom: 34, fontSize: 15 }}>
          Gloss sweeps the logo, then a softer sheen crosses the whole card. Each on a background that proves what it does.
        </p>

        <h2 style={{ color: '#fff', fontSize: 18, marginBottom: 14 }}>Full signature card</h2>
        <Grid items={CARDS} wide />

        <h2 style={{ color: '#fff', fontSize: 18, marginBottom: 14 }}>Logo only</h2>
        <Grid items={LOGOS} />
      </div>
    </main>
  )
}
