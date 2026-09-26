import Link from 'next/link'
import { STAGES, PAGES } from '../../lib/growth'

// The five-stage Bluepeek growth system. `current` highlights the stage a page
// belongs to; `compact` renders the one-line strip used on service pages.
export default function GrowthSystem({ current, compact = false, headingLevel = 'h2', title, intro }) {
  const H = headingLevel
  const Sub = headingLevel === 'h2' ? 'h3' : 'h4'
  if (compact) {
    return (
      <nav className="bp-gs-strip" aria-label="The Bluepeek growth system">
        <ol>
          {STAGES.map(s => (
            <li key={s.id} className={s.id === current ? 'is-current' : undefined} aria-current={s.id === current ? 'step' : undefined}>
              <Link href={PAGES[s.pages[0]].path}><span className="bp-gs-step">{s.step}</span>{s.name}</Link>
            </li>
          ))}
        </ol>
      </nav>
    )
  }
  return (
    <section className="bp-gs" aria-labelledby="growth-system-heading">
      {(title || intro) && (
        <div className="bp-gs-head">
          {title && <H id="growth-system-heading">{title}</H>}
          {intro && <p>{intro}</p>}
        </div>
      )}
      <ol className="bp-gs-grid">
        {STAGES.map(s => (
          <li key={s.id} className={s.id === current ? 'is-current' : undefined}>
            <span className="bp-gs-step">{s.step}</span>
            <Sub>{s.name}</Sub>
            <p>{s.summary}</p>
            <ul>
              {s.pages.map(slug => (
                <li key={slug}><Link href={PAGES[slug].path}>{PAGES[slug].label}</Link></li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}
