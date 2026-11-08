'use client'
import { useEffect, useState } from 'react'
import { fetchResults, RESULTS_REFRESH_MS, resultDate, weeklySummary } from '../../lib/results'
import { openEnquire } from '../../lib/enquire'
import { Headline, Eyebrow } from './parts'
import s from './Websites.module.css'
import { FEATURED_SITES } from '../../lib/site'

/**
 * 1 · Websites & local SEO. Three beats, one idea each:
 *   1  Pinned: a real client site scrolls inside a large browser window while
 *      another real client's mobile site sits on a phone in front of it.
 *   2  The proof, as numerals bigger than the headline (sourced).
 *   3  Full-bleed street map of Nerang (OpenStreetMap) with a Maps rank grid
 *      that climbs to the top as it rises into view. Labelled as an example.
 */

// Every live client site. Add a new one here (screenshot in /public) and the wall grows.
const OTHER_SITES = [
  { title: "A Grade Tyre & Auto", where: "Nerang", url: "https://agradeauto.com.au", image: '/bottom/wall/a-grade-tyre-auto.webp' },
  { title: "Airborne Suspension & Mechanical", where: "Malaga, WA", url: "https://www.airbornesuspensionandmechanical.com.au", image: '/screenshots/gallery-20261102/airborne.webp' },
  { title: "Adiza Hair Collections", where: "Wagga Wagga", url: "https://adizahaircollections.com.au", image: '/screenshots/gallery-20261102/adiza.webp' },
  { title: "Anytime Laser & Beauty", where: "Liverpool, Sydney", url: "https://anytimelaser.com.au", image: '/bottom/wall/anytime-laser-beauty.webp' },
  { title: "Artisan Concrete", where: "Stoneville, WA", url: "https://artisanconcretewa.com.au", image: '/bottom/wall/artisan-concrete.webp' },
  { title: "Attention Detailing", where: "Nerang", url: "https://attentiondetailing.com.au", image: '/bottom/wall/attention-detailing.webp' },
  { title: "B Yoga", where: "Shepparton", url: "https://www.byoga.com.au", image: '/bottom/wall/b-yoga.webp' },
  { title: "Beauty Escape", where: "Massage & waxing", url: "https://beautyescapemassage.com.au", image: '/bottom/wall/beauty-escape.webp' },
  { title: "Bo Butcher", where: "Girrawheen, WA", url: "https://www.bobutcher.com.au", image: '/bottom/wall/bo-butcher.webp' },
  { title: "Ceramics Gold Coast", where: "Gold Coast", url: "https://ceramicsgoldcoast.com.au", image: '/bottom/wall/ceramics-gold-coast.webp' },
  { title: "Coastal 2PAC", where: "Molendinar", url: "https://coastal2pac.com.au", image: '/screenshots/gallery-20261102/coastal.webp' },
  { title: "D Wright Painting & Decorating", where: "Heathridge, WA", url: "https://dwrightpaintinganddecorating.com.au", image: '/bottom/wall/d-wright-painting-decorating.webp' },
  { title: "Egg Decorating Supplies", where: "Gold Coast", url: "https://www.eggdecoratingsupplies.com.au", image: '/bottom/wall/egg-decorating-supplies.webp' },
  { title: "Empire Cuts", where: "Taigum, QLD", url: "https://empirecuts.com.au", image: '/bottom/wall/empire-cuts.webp' },
  { title: "Fair Dinkum Drainage", where: "Nerang", url: "https://fairdinkumdrainage.com.au", image: '/bottom/wall/fair-dinkum-drainage.webp' },
  { title: "Fastbraking Nerang", where: "Nerang", url: "https://nerangcarservice.com.au", image: '/bottom/wall/fastbraking-nerang.webp' },
  { title: "Freddy's Auto Care", where: "Craigieburn, VIC", url: "https://freddysautocare.com.au", image: '/bottom/wall/freddy-s-auto-care.webp' },
  { title: "GM Auto Mechanics", where: "Southport", url: "https://gmautomechanics.com.au", image: '/bottom/wall/gm-auto-mechanics.webp' },
  { title: "Granville Auto", where: "Granville, NSW", url: "https://granvilleautomechanic.com.au", image: '/bottom/wall/granville-auto.webp' },
  { title: "Harmony Home Massage", where: "Sippy Downs", url: "https://harmonyhomemassage.com.au", image: '/bottom/wall/harmony-home-massage.webp' },
  { title: "Jasmine Health & Spa", where: "Ascot, WA", url: "https://jasminehealthandspa.com.au", image: '/bottom/wall/jasmine-health-spa.webp' },
  { title: "Kartech Automotive", where: "Automotive", url: "https://kartechautomotive.com.au", image: '/bottom/wall/kartech-automotive.webp' },
  { title: "Krakin Automotive", where: "Automotive", url: "https://krakinautomotive.com.au", image: '/bottom/wall/krakin-automotive.webp' },
  { title: "Lazer Lures", where: "Fishing lures", url: "https://www.lazerlures.com.au", image: '/bottom/wall/lazer-lures.webp' },
  { title: "Lui's Mechanical Repairs", where: "Hamilton Hill, WA", url: "https://luismechanicalrepairs.com.au", image: '/bottom/wall/lui-s-mechanical-repairs.webp' },
  { title: "Malaga Smash Repair", where: "Malaga, WA", url: "http://www.malagasmashrepair.com.au/", image: '/bottom/wall/malaga-smash-repair.webp' },
  { title: "Marlin Glass Fencing", where: "Hervey Bay", url: "https://marlinsglassfencing.com.au", image: '/bottom/wall/marlin-glass-fencing.webp' },
  { title: "Renz Auto Panel Repairs", where: "Malaga, WA", url: "https://renzautopanelrepairs.com.au", image: '/bottom/wall/renz-auto-panel-repairs.webp' },
  { title: "Rodano Flowers", where: "Wattleup, WA", url: "https://rodanoflowers.com.au", image: '/bottom/wall/rodano-flowers.webp' },
  { title: "Signmakers Gold Coast", where: "Burleigh Heads", url: "https://www.signmakers.com.au", image: '/bottom/wall/signmakers-gold-coast.webp' },
  { title: "SPR Performance", where: "Queensland", url: "https://sprperformance.com.au", image: '/bottom/wall/spr-performance.webp' },
  { title: "S.T.S.B Gardening", where: "Albury", url: "https://stsbgardening.com.au", image: '/bottom/wall/s-t-s-b-gardening.webp' },
  { title: "Superior Garage", where: "Malaga, WA", url: "https://superiorgarage.com.au", image: '/screenshots/gallery-20261102/superior.webp' },
  { title: "Super Painting", where: "Maddington, WA", url: "https://superpaintingwa.com.au", image: '/bottom/wall/super-painting.webp' },
  { title: "Textured Barber Lounge", where: "Beeliar, WA", url: "https://www.texturedbarberlounge.com.au", image: '/bottom/wall/textured-barber-lounge.webp' },
  { title: "The Blend Boss Barber Shop", where: "Spearwood, WA", url: "https://theblendbossbarbershop.com.au", image: '/bottom/wall/the-blend-boss-barber-shop.webp' },
  { title: "True Shine Painters", where: "Werribee, VIC", url: "https://www.trueshinepainters.com.au", image: '/bottom/wall/true-shine-painters.webp' },
  { title: "Union Road Mechanic", where: "Invergordon, VIC", url: "https://unionroadmechanic.com.au", image: '/bottom/wall/union-road-mechanic.webp' },
  { title: "Westside Cycles", where: "Adelaide", url: "https://www.westsidecycle.com.au", image: '/bottom/wall/westside-cycles.webp' },
  { title: "Whitech Utility Locates", where: "East Perth", url: "https://whitech.net.au", image: '/bottom/wall/whitech-utility-locates.webp' },
  { title: "A S Panel Repair", where: "Southport", url: "https://www.aspanelrepair.com.au", image: '/bottom/wall/a-s-panel-repair.webp' },
]
// Lead every row with freshly captured selected work, then the wider collection.
const domain = url => new URL(url).hostname.replace(/^www\./, '')
const SITES = [
  ...FEATURED_SITES.map(site => ({ ...site, where: site.location })),
  ...OTHER_SITES.filter(site => !FEATURED_SITES.some(featured => domain(featured.url) === domain(site.url))),
]
const ROWS = [0, 1, 2, 3].map(r => SITES.filter((_, i) => i % 4 === r))

// Real weekly enquiry counts from BluePeek Forms (genuine submissions only,
// BluePeek's own site excluded), complete weeks starting Monday 8 June 2026.
const WEEKS = [2, 3, 12, 14, 11, 19, 29, 18, 24, 30, 29, 41, 42, 48, 48, 65, 75, 99]
const FALLBACK_WEEKS = WEEKS.map((count, i) => ({ start: new Date(Date.UTC(2026, 5, 8 + i * 7)).toISOString().slice(0, 10), count }))
const TOTAL = 649 // to 14 October 2026, including the part week
const STORIES = [
  { name: 'Attention Detailing', where: 'Nerang', url: 'https://attentiondetailing.com.au', domain: 'attentiondetailing.com.au', num: '54', what: 'quote form submissions, 17 September–9 October 2026', img: '/bottom/proof/attention.webp', alt: 'A black four-wheel drive inside the Attention Detailing workshop', story: '/work/attention-detailing' },
  { name: 'Textured Barber Lounge', where: 'Beeliar, WA', url: 'https://www.texturedbarberlounge.com.au', domain: 'texturedbarberlounge.com.au', num: '282', what: 'booking requests and enquiries, 26 June–14 October 2026', story: '/blog/textured-barber-lounge-beeliar-local-seo', img: '/bottom/proof/textured.webp', alt: 'Barber chairs inside Textured Barber Lounge', weeks: [5, 9, 9, 16, 16, 10, 12, 15, 16, 18, 29, 29, 22, 20, 25, 25] },
  { name: 'S.T.S.B Gardening', where: 'Albury', url: 'https://stsbgardening.com.au', domain: 'stsbgardening.com.au', num: '20', what: 'quote requests from July to 14 October 2026', story: '/blog/stsb-gardening-albury-wodonga-local-seo', img: '/bottom/proof/stsb.webp', alt: 'An S.T.S.B gardener edging a lawn', weeks: [2, 0, 1, 0, 1, 1, 2, 2, 4, 4, 1, 2] },
]

function WeeklyChart({ weeks }) {
  const W = 1000, H = 300, P = 8
  const { max: highest, peak } = weeklySummary(weeks)
  const step = Math.max(1, Math.ceil(highest / 4))
  const max = step * 4
  const ticks = [1, 2, 3, 4].map(n => n * step)
  const x = i => P + (i / Math.max(1, weeks.length - 1)) * (W - 2 * P)
  const y = v => H - 24 - (v / max) * (H - 54)
  const pts = weeks.map((week, i) => [x(i), y(week.count)])
  const line = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ')
  const area = `${line} L${x(weeks.length - 1)},${H - 24} L${x(0)},${H - 24} Z`
  const months = []
  weeks.forEach((week, i) => {
    const d = new Date(`${week.start}T00:00:00Z`)
    if (i === 0 || d.getUTCDate() <= 7) months.push([x(i), d.toLocaleString('en-AU', { month: 'short', timeZone: 'UTC' })])
  })
  const peakWeek = weeks[peak]
  return (
    <figure className={s.chart} aria-label={peakWeek ? `Weekly enquiries across client sites, ${resultDate(weeks[0].start)} to ${resultDate(weeks[weeks.length - 1].start)}. Highest completed week: ${peakWeek.count} enquiries, starting ${resultDate(peakWeek.start)}.` : 'No completed reporting weeks yet.'}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="wkArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0B3ED9" stopOpacity=".18" />
            <stop offset="1" stopColor="#0B3ED9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map(v => <line key={v} x1="0" x2={W} y1={y(v)} y2={y(v)} className={s.grid} vectorEffect="non-scaling-stroke" />)}
        {weeks.length > 0 && <><path d={area} fill="url(#wkArea)" /><path d={line} className={s.line} vectorEffect="non-scaling-stroke" /></>}
      </svg>
      {ticks.map(v => <span key={v} className={s.yTick} style={{ top: `${(y(v) / H) * 100}%` }}>{v}</span>)}
      {peakWeek && <span className={s.peak} style={{ left: `${(x(peak) / W) * 100}%`, top: `${(y(peakWeek.count) / H) * 100}%`, transform: peak === 0 ? 'translate(0,-150%)' : undefined }}><b>{peakWeek.count}</b> week of {resultDate(peakWeek.start)}</span>}
      <div className={s.months} aria-hidden="true">{months.map(([mx, m]) => <span key={m + mx} style={{ left: `${(mx / W) * 100}%` }}>{m}</span>)}</div>
      <figcaption className={s.chartCap}>Enquiries per completed week</figcaption>
    </figure>
  )
}

function Bars({ data }) {
  const max = Math.max(1, ...data)
  return (
    <div className={s.bars} aria-hidden="true">
      {data.map((v, i) => <span key={i} style={{ height: `${(v / max) * 100}%` }} data-last={i === data.length - 1 ? '' : undefined} />)}
    </div>
  )
}

export default function Websites({ results }) {
  const [live, setLive] = useState(results)
  useEffect(() => {
    let active = true
    let controller
    async function refresh() {
      if (document.visibilityState !== 'visible') return
      controller?.abort()
      controller = new AbortController()
      const next = await fetchResults('/api/results', { cache: 'no-store', signal: controller.signal })
      if (active && next) setLive(next)
    }
    const interval = window.setInterval(refresh, RESULTS_REFRESH_MS)
    return () => { active = false; controller?.abort(); window.clearInterval(interval) }
  }, [])
  const weeks = live?.weeks ?? FALLBACK_WEEKS
  const total = live?.total ?? TOTAL
  const period = live ? `${resultDate(live.periodStart)}–${resultDate(live.asOf)}` : null
  const stories = STORIES.map(story => {
    const client = live?.clients.find(client => client.domain === story.domain)
    return client ? { ...story, num: client.total.toLocaleString('en-AU'), what: `recorded website enquiries, ${period}`, weeks: client.weeks.map(week => week.count) } : story
  })

  return (
    <section id="work" className={s.root} aria-labelledby="work-h">
      {/* Beat 1: the work, all of it. */}
      <div className={s.wallBeat}>
        <header className={s.head}>
          <Eyebrow>1 · Websites &amp; local SEO</Eyebrow>
          <Headline id="work-h" className={s.title} lead="Websites that get found." dim="Built from scratch, for one business." />
          <p className={s.count}>{SITES.length} live client sites and counting · hover to pause, tap to visit</p>
        </header>
        <div className={s.wall}>
          <div className={s.plane}>
            {ROWS.map((row, r) => (
              <div key={r} className={s.row} data-dir={r % 2 ? 'right' : 'left'} style={{ '--dur': `${110 + r * 14}s` }}>
                {[...row, ...row].map((site, i) => (
                  <a key={`${site.title}-${i}`} href={site.url} target="_blank" rel="noopener noreferrer" className={s.site} tabIndex={i >= row.length ? -1 : undefined} aria-hidden={i >= row.length ? 'true' : undefined}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={site.image} alt={i >= row.length ? '' : `${site.title} website, built by Bluepeek`} loading="lazy" decoding="async" />
                    <span className={s.siteCap}><b>{site.title}</b>{site.where}</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beat 2: the proof, as real data. */}
      <div className={s.proof}>
        <Headline as="h3" className={s.proofHead} lead="Built to bring in work." dim="Every enquiry, counted." />
        <div className={s.hero}>
          <div className={s.heroStats}>
            <p className={s.heroNum}>{total.toLocaleString('en-AU')}</p>
            <p className={s.heroLabel}>{live ? 'recorded enquiries through our clients’ websites since June' : 'genuine enquiries through our clients’ websites to 14 October 2026 (saved snapshot)'}</p>
          </div>
          <WeeklyChart weeks={weeks} />
        </div>
        {live && <p className={s.source}>Current week, starting {resultDate(live.currentWeek.start)}: {live.currentWeek.count.toLocaleString('en-AU')} enquiries so far. This partial week is excluded from the chart.</p>}
        <ul className={s.stories}>
          {stories.map((c) => (
            <li key={c.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.alt} loading="lazy" decoding="async" />
              <p className={s.storyWho}>{c.name} · {c.where}</p>
              <p className={s.storyNum}>{c.num}</p>
              <p className={s.storyWhat}>{c.what}</p>
              {c.weeks && <Bars data={c.weeks} />}
              <a className={s.storyLink} href={c.story}>Read {c.name}’s case study <span aria-hidden="true">→</span></a>
              <a className={s.storyLink} href={c.url} target="_blank" rel="noopener noreferrer">{c.domain} <span aria-hidden="true">↗</span></a>
            </li>
          ))}
        </ul>
        <p className={s.source}>Source: BluePeek Forms. {live ? `Spam and identified internal tests excluded; BluePeek and preview sites excluded. Updated ${resultDate(live.asOf)}; all counts cover ${period}. Updates every five minutes while this page is visible. Case studies retain their original reporting periods.` : 'Live results are unavailable. Showing the saved 14 October 2026 snapshot of genuine submissions, with spam and identified test entries removed under the historical reporting rules. Card reporting periods differ and are shown above.'} Enquiries are requests, not confirmed jobs.</p>
      </div>

      {/* Beat 3: how local search works. */}
      <div className={s.local}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.map} src="/bottom/p1/nerang-map.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" />
        <div className={s.localInner}>
          <div className={s.localCopy}>
            <Eyebrow>Local SEO · Google Maps</Eyebrow>
            <Headline as="h3" className={s.localHead} lead="Top of the map." dim="Suburb by suburb." />
            <ol className={s.steps}>
              <li><span>1</span><p><b>Someone nearby searches.</b> “Mechanic near me”, “detailing Nerang”.</p></li>
              <li><span>2</span><p><b>Google can show nearby businesses</b> in map results alongside ads and website listings.</p></li>
              <li><span>3</span><p><b>We improve your local visibility</b> with your Business Profile, useful local pages and genuine reviews.</p></li>
            </ol>
            <div className={s.cta}>
              <a href="#contact" className={s.pill} onClick={(e) => { e.preventDefault(); openEnquire('New website or redesign') }}>Start my website <span aria-hidden="true">→</span></a>
              <span className={s.offer}>First month free, then from $149/mo.</span>
            </div>
          </div>
          <figure className={s.pack} aria-label="Example Google search for mechanic near me, showing a map with three businesses and Your Business ranked first">
            <div className={s.packSearch}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" /><path d="m15.5 15.5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" /></svg>
              mechanic near me
            </div>
            <div className={s.packMap} aria-hidden="true">
              <span className={s.mapPin} data-me="" style={{ left: '46%', top: '42%' }} />
              <span className={s.mapPin} style={{ left: '70%', top: '24%' }} />
              <span className={s.mapPin} style={{ left: '24%', top: '66%' }} />
            </div>
            <ul className={s.results}>
              {[['Your Business', '5.0', 'Open · Closes 5 pm', true], ['Another workshop', '4.3', 'Open · Closes 4 pm'], ['A third workshop', '4.1', 'Closed · Opens 8 am']].map(([name, r, hours, me], i) => (
                <li key={name} data-me={me ? '' : undefined}>
                  <span className={s.rank}>{i + 1}</span>
                  <span className={s.resText}>
                    <b>{name}</b>
                    <em>{r} ★★★★★ · Mechanic</em>
                    <em>{hours}</em>
                  </span>
                  {me && <span className={s.resBtns}><i>Call</i><i>Directions</i></span>}
                </li>
              ))}
            </ul>
            <figcaption>Example search</figcaption>
          </figure>
        </div>
        <p className={s.credit}>Map data © OpenStreetMap contributors</p>
      </div>
    </section>
  )
}
