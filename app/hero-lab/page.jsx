import HeroA from '../../components/lab/HeroA'
import HeroB from '../../components/lab/HeroB'
import HeroC from '../../components/lab/HeroC'

export const metadata = {
  title: 'Hero lab',
  robots: { index: false, follow: false },
}

function Label({ letter, name, note }) {
  return (
    <div className="sticky top-0 z-50 px-6 py-2.5 flex flex-wrap items-baseline gap-x-3"
      style={{ background: '#000', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
      <span className="font-mono text-xs font-bold">{letter}</span>
      <span className="text-sm font-semibold">{name}</span>
      <span className="text-xs" style={{ color: '#9a9aa0' }}>{note}</span>
    </div>
  )
}

export default function HeroLab() {
  return (
    <main>
      <Label letter="A" name="The work is the hero" note="Dark · real client sites filling the screen · copy stays modest" />
      <HeroA />
      <Label letter="B" name="Studio index" note="Near-black · dense, left-aligned, numbered client rail · tight sans" />
      <HeroB />
      <Label letter="C" name="Bright & confident" note="Warm off-white · near-black type · one screenshot carrying the weight" />
      <HeroC />
    </main>
  )
}
