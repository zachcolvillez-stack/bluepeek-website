'use client'
import { useRef } from 'react'
import { useProgress, Eyebrow } from './parts'
import s from './Intro.module.css'

/**
 * The turn from film to page, on the exact #f6f8fc the film fades to. One
 * idea: the three ways Bluepeek brings in customers. The two-tone headline
 * lights up word by word as it rises into view, and the three are listed
 * large, numbered, as the substance of that same idea.
 */
const LEAD = 'Three ways we bring you customers.'
const DIM = 'Built and run by the two of us.'
const INDEX = [
  ['1', 'Websites & local SEO', 'Custom sites that rank on Google Search and Maps.', '#work'],
  ['2', 'Custom ad campaigns', 'Google and Meta ads, tracked to every call.', '#ads'],
  ['3', 'AI systems', 'Review requests and follow-ups that send themselves.', '#systems'],
]

export default function Intro() {
  const ref = useRef(null)
  useProgress(ref, 'flow')
  const lead = LEAD.split(' ')
  const dim = DIM.split(' ')
  const total = lead.length + dim.length
  const word = (w, k, last) => (
    <span key={k} className={s.w} style={{ '--t': (0.3 + 0.36 * (k / total)).toFixed(3) }}>{w}{last ? '' : ' '}</span>
  )
  return (
    <section id="intro" ref={ref} className={s.root} aria-labelledby="intro-h">
      <div className={s.wrap}>
        <Eyebrow>Bluepeek · Gold Coast</Eyebrow>
        <h2 id="intro-h" className={s.statement}>
          <span className={s.line}>{lead.map((w, i) => word(w, i, i === lead.length - 1))}</span>
          <span className={`${s.line} ${s.dim}`}>{dim.map((w, i) => word(w, lead.length + i, i === dim.length - 1))}</span>
        </h2>
        <ol className={s.index}>
          {INDEX.map(([n, t, d, href]) => (
            <li key={n}>
              <a href={href}>
                <span className={s.n}>{n}</span>
                <span className={s.t}>{t}</span>
                <span className={s.d}>{d}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
