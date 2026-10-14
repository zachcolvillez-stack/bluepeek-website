'use client'
import { openEnquire } from '../../lib/enquire'
import { Headline, Eyebrow } from './parts'
import s from './Websites.module.css'

/**
 * 1 · Websites & local SEO. Three beats, one idea each:
 *   1  Pinned: a real client site scrolls inside a large browser window while
 *      another real client's mobile site sits on a phone in front of it.
 *   2  The proof, as numerals bigger than the headline (sourced).
 *   3  Full-bleed street map of Nerang (OpenStreetMap) with a Maps rank grid
 *      that climbs to the top as it rises into view. Labelled as an example.
 */

// Every live client site. Add a new one here (screenshot in /public) and the wall grows.
const SITES = [
  { title: "A Grade Tyre & Auto", where: "Nerang", url: "https://agradeauto.com.au", image: '/bottom/wall/a-grade-tyre-auto.webp' },
  { title: "Airborne Suspension & Mechanical", where: "Malaga, WA", url: "https://www.airbornesuspensionandmechanical.com.au", image: '/bottom/wall/airborne-suspension-mechanical.webp' },
  { title: "Adiza Hair Collections", where: "Wagga Wagga", url: "https://adizahaircollections.com.au", image: '/bottom/wall/adiza-hair-collections.webp' },
  { title: "Anytime Laser & Beauty", where: "Liverpool, Sydney", url: "https://anytimelaser.com.au", image: '/bottom/wall/anytime-laser-beauty.webp' },
  { title: "Artisan Concrete", where: "Stoneville, WA", url: "https://artisanconcretewa.com.au", image: '/bottom/wall/artisan-concrete.webp' },
  { title: "Attention Detailing", where: "Nerang", url: "https://attentiondetailing.com.au", image: '/bottom/wall/attention-detailing.webp' },
  { title: "B Yoga", where: "Shepparton", url: "https://www.byoga.com.au", image: '/bottom/wall/b-yoga.webp' },
  { title: "Barberz Den", where: "Kiara, WA", url: "https://www.barberzden.com.au", image: '/bottom/wall/barberz-den.webp' },
  { title: "Beauty Escape", where: "Massage & waxing", url: "https://beautyescapemassage.com.au", image: '/bottom/wall/beauty-escape.webp' },
  { title: "Bluestar Mechanics", where: "Coburg, VIC", url: "https://bluestarmechanics.com.au", image: '/bottom/wall/bluestar-mechanics.webp' },
  { title: "Bo Butcher", where: "Girrawheen, WA", url: "https://www.bobutcher.com.au", image: '/bottom/wall/bo-butcher.webp' },
  { title: "Byron Bay Tiles & Bathrooms", where: "Byron Bay", url: "https://byronbaytiles.com.au", image: '/bottom/wall/byron-bay-tiles-bathrooms.webp' },
  { title: "Ceramics Gold Coast", where: "Gold Coast", url: "https://ceramicsgoldcoast.com.au", image: '/bottom/wall/ceramics-gold-coast.webp' },
  { title: "Coastal 2PAC", where: "Molendinar", url: "https://coastal2pac.com.au", image: '/bottom/wall/coastal-2pac.webp' },
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
  { title: "Rayan Tiling Services", where: "Gosnells, WA", url: "https://www.rayantilingservices.com.au", image: '/bottom/wall/rayan-tiling-services.webp' },
  { title: "Renz Auto Panel Repairs", where: "Malaga, WA", url: "https://renzautopanelrepairs.com.au", image: '/bottom/wall/renz-auto-panel-repairs.webp' },
  { title: "Rodano Flowers", where: "Wattleup, WA", url: "https://rodanoflowers.com.au", image: '/bottom/wall/rodano-flowers.webp' },
  { title: "Signmakers Gold Coast", where: "Burleigh Heads", url: "https://www.signmakers.com.au", image: '/bottom/wall/signmakers-gold-coast.webp' },
  { title: "SPR Performance", where: "Queensland", url: "https://sprperformance.com.au", image: '/bottom/wall/spr-performance.webp' },
  { title: "S.T.S.B Gardening", where: "Albury", url: "https://stsbgardening.com.au", image: '/bottom/wall/s-t-s-b-gardening.webp' },
  { title: "Superior Garage", where: "Malaga, WA", url: "https://superiorgarage.com.au", image: '/bottom/wall/superior-garage.webp' },
  { title: "Super Painting", where: "Maddington, WA", url: "https://superpaintingwa.com.au", image: '/bottom/wall/super-painting.webp' },
  { title: "Textured Barber Lounge", where: "Beeliar, WA", url: "https://www.texturedbarberlounge.com.au", image: '/bottom/wall/textured-barber-lounge.webp' },
  { title: "The Blend Boss Barber Shop", where: "Spearwood, WA", url: "https://theblendbossbarbershop.com.au", image: '/bottom/wall/the-blend-boss-barber-shop.webp' },
  { title: "True Shine Painters", where: "Werribee, VIC", url: "https://www.trueshinepainters.com.au", image: '/bottom/wall/true-shine-painters.webp' },
  { title: "Union Road Mechanic", where: "Invergordon, VIC", url: "https://unionroadmechanic.com.au", image: '/bottom/wall/union-road-mechanic.webp' },
  { title: "Westside Cycles", where: "Adelaide", url: "https://www.westsidecycle.com.au", image: '/bottom/wall/westside-cycles.webp' },
  { title: "Whitech Utility Locates", where: "East Perth", url: "https://whitech.net.au", image: '/bottom/wall/whitech-utility-locates.webp' },
  { title: "Premier Autotune", where: "Gold Coast", url: "https://www.premierautotune.com.au", image: '/bottom/wall/premier-autotune.webp' },
  { title: "A S Panel Repair", where: "Southport", url: "https://www.aspanelrepair.com.au", image: '/bottom/wall/a-s-panel-repair.webp' },
]
// Four rows, each with its own share of the sites (shuffled so trades mix).
const MIXED = SITES.map((x, i) => [((i * 37) % SITES.length), x]).sort((a, b) => a[0] - b[0]).map(([, x]) => x)
const ROWS = [0, 1, 2, 3].map((r) => MIXED.filter((_, i) => i % 4 === r))

// Real weekly enquiry counts from BluePeek Forms (genuine submissions only,
// BluePeek's own site excluded), complete weeks starting Monday 8 June 2026.
const WEEKS = [2, 3, 12, 14, 11, 19, 29, 18, 24, 30, 29, 41, 42, 48, 48, 65, 75, 99]
const WEEK0 = new Date(2026, 5, 8)
const TOTAL = 649 // to 14 October 2026, including the part week
const STORIES = [
  { name: 'Attention Detailing', where: 'Nerang', url: 'https://attentiondetailing.com.au', domain: 'attentiondetailing.com.au', num: '75', what: 'enquiries in its first four weeks online', img: '/bottom/proof/attention.webp', alt: 'A black four-wheel drive inside the Attention Detailing workshop', weeks: [12, 17, 33] },
  { name: 'Textured Barber Lounge', where: 'Beeliar, WA', url: 'https://www.texturedbarberlounge.com.au', domain: 'texturedbarberlounge.com.au', num: '282', what: 'bookings and enquiries since June', img: '/bottom/proof/textured.webp', alt: 'Barber chairs inside Textured Barber Lounge', weeks: [5, 9, 9, 16, 16, 10, 12, 15, 16, 18, 29, 29, 22, 20, 25, 25] },
  { name: 'S.T.S.B Gardening', where: 'Albury', url: 'https://stsbgardening.com.au', domain: 'stsbgardening.com.au', num: '20', what: 'quote requests since July, in a regional town', img: '/bottom/proof/stsb.webp', alt: 'An S.T.S.B gardener edging a lawn', weeks: [2, 0, 1, 0, 1, 1, 2, 2, 4, 4, 1, 2] },
]

function WeeklyChart() {
  const W = 1000, H = 300, P = 8, max = 110
  const x = (i) => P + (i / (WEEKS.length - 1)) * (W - 2 * P)
  const y = (v) => H - 24 - (v / max) * (H - 54)
  const pts = WEEKS.map((v, i) => [x(i), y(v)])
  const line = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ')
  const area = `${line} L${x(WEEKS.length - 1)},${H - 24} L${x(0)},${H - 24} Z`
  const months = []
  WEEKS.forEach((_, i) => {
    const d = new Date(WEEK0.getTime() + i * 7 * 864e5)
    if (i === 0 || d.getDate() <= 7) months.push([x(i), d.toLocaleString('en-AU', { month: 'short' })])
  })
  const peak = WEEKS.length - 1
  return (
    <figure className={s.chart} aria-label={`Weekly enquiries across client sites, rising from ${WEEKS[0]} in the week of 8 June to ${WEEKS[peak]} in the week of 5 October 2026`}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="wkArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0B3ED9" stopOpacity=".18" />
            <stop offset="1" stopColor="#0B3ED9" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75, 100].map((v) => <line key={v} x1="0" x2={W} y1={y(v)} y2={y(v)} className={s.grid} vectorEffect="non-scaling-stroke" />)}
        <path d={area} fill="url(#wkArea)" />
        <path d={line} className={s.line} vectorEffect="non-scaling-stroke" />
      </svg>
      {[25, 50, 75, 100].map((v) => <span key={v} className={s.yTick} style={{ top: `${(y(v) / H) * 100}%` }}>{v}</span>)}
      <span className={s.peak} style={{ left: `${(x(peak) / W) * 100}%`, top: `${(y(WEEKS[peak]) / H) * 100}%` }}><b>{WEEKS[peak]}</b> in one week</span>
      <div className={s.months} aria-hidden="true">{months.map(([mx, m]) => <span key={m + mx} style={{ left: `${(mx / W) * 100}%` }}>{m}</span>)}</div>
      <figcaption className={s.chartCap}>Enquiries per week, all client sites</figcaption>
    </figure>
  )
}

function Bars({ data }) {
  const max = Math.max(...data)
  return (
    <div className={s.bars} aria-hidden="true">
      {data.map((v, i) => <span key={i} style={{ height: `${Math.max(3, (v / max) * 100)}%` }} data-last={i === data.length - 1 ? '' : undefined} />)}
    </div>
  )
}

export default function Websites() {

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
            <p className={s.heroNum}>{TOTAL}</p>
            <p className={s.heroLabel}>genuine enquiries through our clients’ websites since June</p>
          </div>
          <WeeklyChart />
        </div>
        <ul className={s.stories}>
          {STORIES.map((c) => (
            <li key={c.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.alt} loading="lazy" decoding="async" />
              <p className={s.storyWho}>{c.name} · {c.where}</p>
              <p className={s.storyNum}>{c.num}</p>
              <p className={s.storyWhat}>{c.what}</p>
              <Bars data={c.weeks} />
              <a className={s.storyLink} href={c.url} target="_blank" rel="noopener noreferrer">{c.domain} <span aria-hidden="true">↗</span></a>
            </li>
          ))}
        </ul>
        <p className={s.source}>Source: BluePeek Forms, genuine submissions only (spam and test entries removed), to 14 October 2026. Enquiries are requests, not confirmed jobs.</p>
      </div>

      {/* Beat 3: how local search works. */}
      <div className={s.local}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={s.map} src="/bottom/p1/nerang-map.svg" alt="" aria-hidden="true" />
        <div className={s.localInner}>
          <div className={s.localCopy}>
            <Eyebrow>Local SEO · Google Maps</Eyebrow>
            <Headline as="h3" className={s.localHead} lead="Top of the map." dim="Suburb by suburb." />
            <ol className={s.steps}>
              <li><span>1</span><p><b>Someone nearby searches.</b> “Mechanic near me”, “detailing Nerang”.</p></li>
              <li><span>2</span><p><b>Google shows three businesses</b> on the map, above everything else.</p></li>
              <li><span>3</span><p><b>We get you into those three</b> with your Business Profile, suburb pages and reviews.</p></li>
            </ol>
            <div className={s.cta}>
              <a href="#contact" className={s.pill} onClick={(e) => { e.preventDefault(); openEnquire('New website or redesign') }}>Start my website <span aria-hidden="true">→</span></a>
              <span className={s.offer}>First month free, then from $99/mo.</span>
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
