'use client'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { film } from '../lib/film'
import { openEnquire } from '../lib/enquire'
import { useReviewAgg } from '../lib/useReviews'
import { SITE } from '../lib/site'

/**
 * Homepage film: "Bluepeek Descent".
 *
 * Part 1, the fall: one continuous AI film (space → re-entry → clouds → the
 * laptop lands and opens), played by the scroll position. The <video> is never
 * played, only seeked; the encode (scripts/build-film.mjs: no B-frames, a
 * keyframe every 12 frames, one file per clip) keeps each seek a few ms.
 * Engine copied from the scroll-film kit (~/Developer/bluepeek/scroll-film-kit).
 *
 * Part 2, the screen: the film parks on its last frame and the laptop never
 * moves again. Live HTML is projected onto the laptop's screen (a homography
 * onto the four screen corners measured on that frame), and the scroll drives
 * what is on it: it boots, builds a site, then scrolls real client work. At
 * the end the camera dives into the screen and the page carries on below.
 *
 * Text never waits on JS: the opening chapter (with the page's h1) renders at
 * full opacity and the poster is a plain <img>, so it can be the LCP element.
 */

// Section length in viewport heights: the fall, then the screen.
const FILM_SCREENS = film.scrollScreens
const SCREEN_SCREENS = 6
const TOTAL = FILM_SCREENS + SCREEN_SCREENS
const FILM_END = FILM_SCREENS / TOTAL

// Inside display corners on the film's last frame (1920×1080 px), clockwise
// from top left. Measured on bluepeek-film/review/last.png.
const QUAD = [[689, 420], [1190, 420], [1196, 700], [683, 700]]
const SRC_W = 1920
const SRC_H = 1080
const SM_W = 1000
const SM_LEFT = Math.round(SRC_W * film.focalX.lg - SM_W / 2)
// The HTML screen is laid out at this size, then projected onto QUAD.
const SCREEN_W = 1200
const SCREEN_H = 664

const [B1, B2, B3, B4] = film.clipStarts.map((c) => c * FILM_END)
// Copy windows, in whole-section progress. The fall's follow the clip joins.
const CHAPTERS = [
  { id: 'c1', from: 0.035 * FILM_END, to: B1, kicker: 'From scratch', title: 'Designed from scratch.', dim: 'No templates. Ever.' },
  { id: 'c2', from: B1, to: B2, kicker: 'Search', title: 'Built to be found.', dim: 'SEO in every page we ship.' },
  { id: 'c3', from: B2, to: B3, kicker: 'Speed', title: 'Fast on every phone.', dim: 'Because that’s where your customers are.' },
  { id: 'c4', from: B3, to: B4 + (FILM_END - B4) * 0.55, kicker: 'The offer', title: 'First month free.', dim: 'Then from $99 a month.' },
]
// The screen phase, in screen-phase progress (0–1).
const S = { boot: 0.02, build: 0.1, live: 0.34, work: 0.4, more: 0.68, dive: 0.86 }
const SCREEN_COPY = [
  { id: 's1', from: 0.0, to: S.work, kicker: 'How we build', title: 'Watch a site come together.', dim: 'Layout, words, photos, live.' },
  { id: 's2', from: S.work, to: S.more, kicker: 'Coastal 2PAC', title: 'Real sites.', dim: 'For real Australian businesses.' },
  { id: 's3', from: S.more, to: S.dive, kicker: 'Selected work', title: 'Every one, built by hand.', dim: 'Ceramic Coating · Marlin Glass · Jasmine Spa' },
]
const WORK = [
  { src: '/images/ceramic-coating-preview.webp', name: 'Ceramic Coating Gold Coast' },
  { src: '/screenshots/showcase/marlinsglass.jpg', name: 'Marlin Glass Fencing' },
  { src: '/screenshots/jasmine.webp', name: 'Jasmine Health & Spa' },
]

/** Scroll progress → (fractional) film frame, through the pacing map. */
function frameAt(p) {
  const map = film.timeMap
  let lo = 0
  let hi = map.length - 1
  if (p <= 0) return 0
  if (p >= 1) return hi
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (map[mid] <= p) lo = mid
    else hi = mid
  }
  return lo + (p - map[lo]) / (map[hi] - map[lo] || 1)
}
function segmentAt(f) {
  let i = 0
  while (i < film.segments.length - 1 && f >= film.segments[i + 1].start) i++
  return i
}
const ss = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/** CSS matrix3d taking a w×h box onto quad q (TL, TR, BR, BL). */
function quadMatrix(w, h, q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3
  const den = dx1 * dy2 - dx2 * dy1
  const g = (dx3 * dy2 - dx2 * dy3) / den
  const k = (dx1 * dy3 - dx3 * dy1) / den
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${x0},${y0},0,1)`
}

/**
 * Runs inline while the HTML is still parsing, before React hydrates: shows
 * the branded intro (<html data-film-intro>, 2.5 s cap) and holds scrolling
 * (<html data-film-hold>, 8 s cap, 3 s on touch) so nobody races past a film
 * that hasn't loaded. DescentFilm takes both over once it hydrates.
 */
const HOLD_SCRIPT = `(function(){
if(window.__filmHold)return;
var c=navigator.connection;if(c&&c.saveData)return;
var held=true,y=window.scrollY,d=document.documentElement,
k={" ":1,PageDown:1,PageUp:1,ArrowDown:1,ArrowUp:1,End:1,Home:1},
o={passive:false};
function stop(e){if(held)e.preventDefault()}
function key(e){var t=e.target;if(held&&k[e.key]&&!(t&&t.closest&&t.closest("input,textarea,select,[contenteditable]")))e.preventDefault()}
function pin(){if(held&&Math.abs(window.scrollY-y)>1)window.scrollTo(0,y)}
function endIntro(){d.removeAttribute("data-film-intro")}
function release(){endIntro();if(!held)return;held=false;removeEventListener("wheel",stop,o);removeEventListener("touchmove",stop,o);removeEventListener("keydown",key);removeEventListener("scroll",pin);d.removeAttribute("data-film-hold")}
addEventListener("wheel",stop,o);addEventListener("touchmove",stop,o);addEventListener("keydown",key);addEventListener("scroll",pin,{passive:true});
d.setAttribute("data-film-hold","");d.setAttribute("data-film-intro","");
setTimeout(endIntro,2500);setTimeout(release,("ontouchstart" in window||navigator.maxTouchPoints>0)?3000:8000);
window.__filmHold={release:release,endIntro:endIntro,get held(){return held}};
})()`

/** Film downloads, shared across mounts (Strict Mode would otherwise fetch twice). */
const downloads = new Map()
function download(url) {
  const existing = downloads.get(url)
  if (existing) return existing
  const d = { blob: null, progress: 0, listeners: new Set() }
  d.blob = (async () => {
    const r = await fetch(url)
    if (!r.ok) throw new Error(String(r.status))
    const total = Number(r.headers.get('content-length')) || 0
    if (!total || !r.body) return r.blob()
    const reader = r.body.getReader()
    const chunks = []
    let received = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      received += value.length
      d.progress = received / total
      d.listeners.forEach((l) => l(d.progress))
    }
    return new Blob(chunks, { type: 'video/mp4' })
  })()
  d.blob.catch(() => downloads.delete(url))
  downloads.set(url, d)
  return d
}
let pendingRelease = 0

export default function DescentFilm() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const cameraRef = useRef(null)
  const filmRef = useRef(null)
  const frameRef = useRef(null)
  const screenRef = useRef(null)
  const [loading, setLoading] = useState(null)
  const agg = useReviewAgg()

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const camera = cameraRef.current
    const layer = filmRef.current
    const frame = frameRef.current
    const screen = screenRef.current
    if (!section || !stage || !camera || !layer || !frame || !screen) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const portrait = window.matchMedia('(max-aspect-ratio: 1/1)').matches
    const size = portrait ? 'sm' : 'lg'
    const FW = portrait ? SM_W : SRC_W
    const quad = QUAD.map(([x, y]) => [portrait ? x - SM_LEFT : x, y])
    screen.style.transform = quadMatrix(SCREEN_W, SCREEN_H, quad)
    frame.style.width = `${FW}px`
    frame.style.height = `${SRC_H}px`
    let cancelled = false
    const objectUrls = []

    let target = 0
    let current = 0
    let dirty = true
    let wallSpent = false
    const halfFrame = 0.5 / film.fps

    // One seek at a time per video; the latest requested time wins.
    const makeSeeker = (video) => {
      let seeking = false
      let pending = null
      const seek = (t) => {
        if (seeking) { pending = t; return }
        if (Math.abs(video.currentTime - t) < halfFrame) return
        seeking = true
        video.currentTime = t
      }
      const onSeeked = () => {
        seeking = false
        if (pending !== null) { const t = pending; pending = null; seek(t) }
      }
      video.addEventListener('seeked', onSeeked)
      return { seek, dispose: () => video.removeEventListener('seeked', onSeeked) }
    }
    const makeTrack = (url, start, frames) => {
      const video = document.createElement('video')
      video.muted = true
      video.playsInline = true
      video.disablePictureInPicture = true
      video.preload = 'none'
      video.tabIndex = -1
      video.setAttribute('aria-hidden', 'true')
      video.className = 'film-video'
      layer.appendChild(video)
      return { video, seeker: makeSeeker(video), ready: false, url, start, frames }
    }
    const stills = film.stills.map((f) => {
      const img = document.createElement('img')
      img.alt = ''
      img.decoding = 'async'
      img.fetchPriority = 'low'
      img.setAttribute('aria-hidden', 'true')
      img.className = 'film-video'
      img.src = `/film/stills/${size}-${String(f).padStart(4, '0')}.webp?v=${film.version}`
      layer.appendChild(img)
      return { frame: f, img }
    })
    let stillShown = null
    const showStill = (img) => {
      if (img === stillShown) return
      stillShown?.removeAttribute('data-on')
      img?.setAttribute('data-on', '')
      stillShown = img
    }
    const totalFrames = film.timeMap.length
    const preview = makeTrack(film.preview[size], 0, totalFrames)
    const segs = film.segments.map((g) => makeTrack(g[size], g.start, g.frames))
    const tracks = [preview, ...segs]
    let shown = null
    const show = (t) => {
      if (t === shown) return
      shown?.video.removeAttribute('data-on')
      t?.video.setAttribute('data-on', '')
      shown = t
    }

    /* -- Intro + scroll hold ----------------------------------------- */
    window.clearTimeout(pendingRelease)
    const hold = window.__filmHold
    const held = () => Boolean(hold?.held)
    const release = () => { hold?.release(); setLoading(null) }
    const saveData = Boolean(navigator.connection?.saveData)

    /* -- Loading: whole files into memory, current segment first ------ */
    const blobUrl = async (url, onProgress) => {
      const d = download(url)
      if (onProgress) { onProgress(d.progress); d.listeners.add(onProgress) }
      try { return URL.createObjectURL(await d.blob) } finally { if (onProgress) d.listeners.delete(onProgress) }
    }
    // iOS Safari may never fire loadeddata on an unplayed video, so force the
    // first frame with a muted play/pause plus a tiny seek.
    const attach = (video, url) => new Promise((resolve, reject) => {
      let done = false
      const finish = () => { if (!done) { done = true; resolve() } }
      video.addEventListener('error', () => reject(video.error), { once: true })
      video.addEventListener('loadeddata', finish, { once: true })
      video.addEventListener('loadedmetadata', () => {
        video.addEventListener('seeked', finish, { once: true })
        video.play().then(() => video.pause()).catch(() => {}).finally(() => { video.currentTime = 0.001 })
        window.setTimeout(finish, 1500)
      }, { once: true })
      video.preload = 'auto'
      video.src = url
      video.load()
    })
    const loadTrack = async (t, onProgress) => {
      const url = await blobUrl(t.url, onProgress)
      if (cancelled) return
      objectUrls.push(url)
      await attach(t.video, url)
      if (cancelled) return
      t.ready = true
      dirty = true
      wallSpent = false
    }
    let pct = -1
    const load = async () => {
      const first = segmentAt(frameAt(Math.min(1, current / FILM_END)))
      try {
        await loadTrack(segs[first], (p) => {
          const n = Math.floor(p * 100)
          if (held() && n >= pct + 2) setLoading((pct = n))
        })
      } catch { /* fall through to the preview */ }
      if (cancelled) return
      release()
      for (const t of [preview, ...segs.slice(first + 1), ...segs.slice(0, first).reverse()]) {
        if (cancelled) return
        try { await loadTrack(t) } catch { /* the preview covers a missing segment */ }
        if (!cancelled) release()
      }
    }
    if (saveData) window.addEventListener('scroll', load, { once: true, passive: true })
    else load()

    /* -- Layout: map the film frame onto the viewport (object-fit: cover) */
    let vw = 0, vh = 0, coverScale = 1, offX = 0, offY = 0
    let scr = { cx: 0, cy: 0, w: 1, h: 1 }
    const measure = () => {
      vw = stage.clientWidth
      vh = stage.clientHeight
      coverScale = Math.max(vw / FW, vh / SRC_H)
      offX = (vw - FW * coverScale) / 2
      offY = (vh - SRC_H * coverScale) / 2
      frame.style.transform = `translate(${offX}px,${offY}px) scale(${coverScale})`
      const xs = quad.map((p) => p[0]), ys = quad.map((p) => p[1])
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys)
      scr = { cx: offX + ((x0 + x1) / 2) * coverScale, cy: offY + ((y0 + y1) / 2) * coverScale, w: (x1 - x0) * coverScale, h: (y1 - y0) * coverScale }
      camera.style.transformOrigin = `${scr.cx}px ${scr.cy}px`
      dirty = true
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)

    /* -- Soft wall at the end of what has loaded (film part only) ----- */
    const playableUntil = () => {
      if (preview.ready) return 1
      let end = -1
      for (const g of segs) { if (!g.ready) break; end = g.start + g.frames - 1 }
      return end < 0 ? 0 : film.timeMap[end] * FILM_END
    }
    const root = document.documentElement
    let walled = false
    let wallSince = 0
    const readScroll = () => {
      const r = section.getBoundingClientRect()
      const span = r.height - window.innerHeight
      target = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      const limit = playableUntil()
      const pinned = r.top <= 0 && r.bottom >= window.innerHeight
      let wall = !held() && !wallSpent && pinned && limit > 0 && limit < 1 && target > limit && target - limit < 0.2
      const now = performance.now()
      if (wall && !walled) wallSince = now
      if (wall && now - wallSince > 1500) { wall = false; wallSpent = true }
      if (wall) { target = limit; window.scrollTo(0, window.scrollY + r.top + span * limit) }
      if (wall !== walled) {
        walled = wall
        if (wall) root.setAttribute('data-film-wall', '')
        else root.removeAttribute('data-film-wall')
      }
    }

    const copyEls = Array.from(stage.querySelectorAll('[data-from]'))
    const workEls = Array.from(screen.querySelectorAll('[data-work]'))
    const strip = screen.querySelector('[data-strip]')
    const rail = screen.querySelector('[data-rail]')
    const boot = screen.querySelector('[data-boot]')
    const bootBar = screen.querySelector('[data-boot-bar]')
    const ring = stage.querySelector('[data-ring]')
    const fade = stage.querySelector('[data-fade]')
    const scrim = stage.querySelector('[data-scrim]')
    const poster = stage.querySelector('.film-poster')
    let lastStep = -1
    let raf = 0
    let last = performance.now()

    const tick = (now) => {
      const dt = Math.min(1000, now - last)
      last = now
      readScroll()
      const k = reduce ? 1 : 1 - Math.exp(-dt / 55)
      const prev = current
      current += (target - current) * k
      if (Math.abs(target - current) < 0.00005) current = target

      if (current !== prev || dirty) {
        dirty = false
        // Film: parked on its last frame for the whole screen phase.
        const fp = Math.min(1, current / FILM_END)
        const f = frameAt(fp)
        const i = segmentAt(f)
        const seg = segs[i]
        if (seg.ready) {
          seg.seeker.seek(Math.min(f - seg.start, seg.frames - 1) / film.fps)
          show(seg)
          const next = segs[i + 1]
          if (next?.ready && next !== shown) next.seeker.seek(0)
          const prevSeg = segs[i - 1]
          if (prevSeg?.ready && prevSeg !== shown) prevSeg.seeker.seek((prevSeg.frames - 1) / film.fps)
        } else if (preview.ready && fp > 0.002) {
          preview.seeker.seek(f / film.fps)
          show(preview)
        } else {
          show(null)
        }
        // The poster (frame 0, space) only shows before any video does.
        if (poster) poster.style.visibility = shown || stillShown ? 'hidden' : 'visible'
        if (shown || fp <= 0.002) showStill(null)
        else {
          let pick = null
          for (const st of stills) if (st.frame <= f && st.img.complete) pick = st.img
          showStill(pick)
        }

        // Screen phase progress.
        const sp = Math.max(0, (current - FILM_END) / (1 - FILM_END))
        stage.style.setProperty('--sp', sp.toFixed(4))
        // The screen wakes as the lid finishes opening.
        screen.style.opacity = String(ss(FILM_END - 0.01, FILM_END + 0.004, current))
        // Camera: a gentle push-in while the screen works, then the dive.
        // Phones: the screen is wider than the viewport, so ease back until it
        // fits (the stage's sky-to-cloud backdrop shows at the feathered edges).
        const fit = Math.min(1, (0.92 * vw) / scr.w)
        const push = portrait ? (fit - 1) * ss(0, S.build, sp) : 0.28 * ss(S.boot, S.build + 0.06, sp)
        if (portrait) stage.toggleAttribute('data-fit', sp > 0 && sp < 0.97)
        const fill = Math.max(vw / scr.w, vh / scr.h) * 1.04
        const dive = reduce ? 0 : ss(S.dive, 1, sp)
        const base = 1 + push
        const scale = base + (fill - base) * dive * dive
        // Phones: also slide the screen to the exact centre while easing back.
        const tx = portrait ? (vw / 2 - scr.cx) * ss(0, S.build, sp) : 0
        camera.style.transform = sp > 0 ? `translateX(${tx}px) scale(${scale})` : ''
        if (fade) fade.style.opacity = String(ss(0.93, 1, sp))
        // Daylight chapters: a soft top scrim keeps white copy readable on the sky.
        if (scrim) scrim.style.opacity = String(ss(B1, B2, current) * (1 - ss(FILM_END - 0.03, FILM_END, current)))

        // Screen content.
        if (boot) boot.style.opacity = String(1 - ss(S.build - 0.02, S.build + 0.01, sp))
        if (bootBar) bootBar.style.transform = `scaleX(${ss(S.boot, S.build - 0.03, sp)})`
        const step = sp < S.build ? 0 : sp < S.build + 0.06 ? 1 : sp < S.build + 0.12 ? 2 : sp < S.build + 0.18 ? 3 : 4
        if (step !== lastStep) { lastStep = step; screen.dataset.step = String(step) }
        const workIn = ss(S.work - 0.02, S.work + 0.02, sp)
        for (const el of workEls) {
          const which = el.dataset.work
          if (which === 'build') el.style.opacity = String(1 - workIn)
          if (which === 'strip') el.style.opacity = String(workIn * (1 - ss(S.more - 0.02, S.more + 0.01, sp)))
          if (which === 'rail') el.style.opacity = String(ss(S.more - 0.02, S.more + 0.01, sp))
        }
        if (strip) strip.style.transform = `translate3d(0,${-ss(S.work + 0.02, S.more - 0.03, sp) * 79.25}%,0)`
        if (rail) {
          const c = Math.min(1, Math.max(0, (sp - S.more) / (S.dive - S.more))) * (WORK.length - 1)
          const ci = Math.floor(c)
          const pos = Math.min(WORK.length - 1, ci + ss(0.45, 1, c - ci))
          rail.style.transform = `translate3d(${-pos * 100}%,0,0)`
        }

        // Copy: each block eases in and out across its own window.
        for (const el of copyEls) {
          const phase = el.dataset.phase
          const x = phase === 'screen' ? sp : current
          const from = Number(el.dataset.from)
          const to = Number(el.dataset.to)
          const isIntro = el.dataset.intro === ''
          const len = to - from
          const vin = isIntro ? 1 : ss(from, from + len * 0.2, x)
          const vout = 1 - ss(to - len * 0.2, to, x)
          const v = phase === 'screen' && current < FILM_END ? 0 : Math.min(vin, vout)
          el.style.opacity = String(v)
          el.style.transform = `translate3d(0,${(1 - vin) * 24 - (1 - vout) * 24}px,0)`
          el.style.visibility = v < 0.01 ? 'hidden' : 'visible'
        }
        if (ring) ring.style.strokeDashoffset = String(1 - current)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      pendingRelease = window.setTimeout(() => window.__filmHold?.release(), 0)
      document.documentElement.removeAttribute('data-film-wall')
      window.removeEventListener('scroll', load)
      stills.forEach((st) => st.img.remove())
      for (const t of tracks) {
        t.seeker.dispose()
        t.video.removeAttribute('src')
        t.video.load()
        t.video.remove()
      }
      objectUrls.forEach((u) => URL.revokeObjectURL(u))
    }
  }, [])

  return (
    <section ref={sectionRef} className="bp-film" aria-label="Bluepeek: a laptop falls from space and lands in the clouds" style={{ height: `${TOTAL * 100}svh` }}>
      <link rel="preload" as="fetch" href={film.segments[0].lg} crossOrigin="anonymous" media="(min-aspect-ratio: 1001/1000)" />
      <link rel="preload" as="fetch" href={film.segments[0].sm} crossOrigin="anonymous" media="(max-aspect-ratio: 1/1)" />
      <script dangerouslySetInnerHTML={{ __html: HOLD_SCRIPT }} />

      {/* Intro: shown while <html data-film-intro> is set (2.5 s at most). */}
      <div className="film-intro">
        <div className="film-intro-main">
          <Logo size={64} textColor="#fff" />
          <div aria-hidden="true" className="film-intro-track">
            {loading === null
              ? <div className="film-intro-bar film-intro-bar--indeterminate" />
              : <div className="film-intro-bar" style={{ width: `${Math.max(loading, 4)}%` }} />}
          </div>
          <p role="status" className="t-label film-dim">[ Preparing for launch ]</p>
        </div>
        <div className="film-intro-foot">
          <p>In a hurry? Talk to us now.</p>
          <div className="film-intro-actions">
            <a href={`tel:${SITE.phone}`} className="t-pill t-pill--line">Call {SITE.phoneDisplay}</a>
            <a href="#contact" className="t-pill t-pill--solid" onClick={(e) => { e.preventDefault(); openEnquire() }}>Get a free quote <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>

      <div ref={stageRef} className="bp-film-stage">
        <div ref={cameraRef} className="bp-film-camera">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={film.poster} alt="" fetchPriority="high" decoding="async" className="film-poster" />
          {/* Film-frame coordinates (1920×1080, or the 1000×1080 phone crop),
              cover-fitted to the stage: the film and the projected screen live
              in the same box, so any camera move keeps them locked together. */}
          <div ref={frameRef} className="bp-film-frame" aria-hidden="true">
            <div ref={filmRef} className="bp-film-layer" />
            <div className="bp-wisps"><i /><i /><i /><i /></div>
            <div ref={screenRef} className="bp-screen" data-step="0" style={{ width: SCREEN_W, height: SCREEN_H }}>
              <div data-boot className="bp-screen-boot">
                <span className="bp-screen-mark">Blue<span>peek</span></span>
                <span className="bp-screen-bootbar"><i data-boot-bar /></span>
              </div>
              <div data-work="build" className="bp-build">
                <div className="bp-build-nav"><b /><span /><span /><span /><em /></div>
                <div className="bp-build-hero">
                  <div className="bp-build-copy">
                    <p className="bp-build-kicker"><span>Nerang · Gold Coast</span></p>
                    <h3><span>Ceramic coating,</span><span>done properly.</span></h3>
                    <p className="bp-build-text"><span>Paint correction, coating and detailing from a studio that takes its time.</span></p>
                    <div className="bp-build-buttons"><i>Get a quote</i><em>Our work</em></div>
                  </div>
                  <div className="bp-build-photo"><img src="/images/ceramic-coating-preview.webp" alt="" /></div>
                </div>
                <div className="bp-build-live"><i />Live</div>
              </div>
              <div data-work="strip" className="bp-screen-strip">
                <img data-strip src="/images/coastal-2pac-scroll-3200.webp" alt="" />
              </div>
              <div data-work="rail" className="bp-screen-railwrap">
                <div data-rail className="bp-screen-rail">
                  {WORK.map((w) => <img key={w.src} src={w.src} alt="" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div data-scrim className="bp-film-scrim" aria-hidden="true" />
        <div data-fade className="bp-film-fade" aria-hidden="true" />

        {/* Copy: centred above the laptop. */}
        <div className="bp-film-copy">
          <div data-intro="" data-from="0" data-to={0.04 * FILM_END} className="bp-film-ch">
            <p className="t-label film-accent">[ Bluepeek · Gold Coast ]</p>
            <h1 className="t-display">Websites that land.<span>Gold Coast web design by Bluepeek.</span></h1>
            <div className="bp-film-actions">
              <a href="#contact" className="t-pill t-pill--solid" onClick={(e) => { e.preventDefault(); openEnquire('New website or redesign') }}>Get a free quote <span aria-hidden="true">→</span></a>
              <a href="#work" className="t-pill t-pill--line">See our work</a>
            </div>
          </div>
          {CHAPTERS.map((c) => (
            <div key={c.id} data-from={c.from} data-to={c.to} className="bp-film-ch bp-film-ch--later">
              <p className="t-label film-accent">[ {c.kicker} ]</p>
              <h2 className="t-display">{c.title}<span>{c.dim}</span></h2>
              {c.id === 'c4' && (
                <div className="bp-film-actions">
                  <a href="#contact" className="t-pill t-pill--solid" onClick={(e) => { e.preventDefault(); openEnquire('New website or redesign') }}>Start my website <span aria-hidden="true">→</span></a>
                </div>
              )}
            </div>
          ))}
          {SCREEN_COPY.map((c) => (
            <div key={c.id} data-phase="screen" data-tone="ink" data-from={c.from} data-to={c.to} className="bp-film-ch bp-film-ch--later">
              <p className="t-label film-accent">[ {c.kicker} ]</p>
              <h2 className="t-display">{c.title}<span>{c.dim}</span></h2>
            </div>
          ))}
        </div>

        {/* Opening proof points: fade out with the opening chapter. */}
        <dl data-intro="" data-from="0" data-to={0.04 * FILM_END} className="bp-film-ch bp-film-proof">
          <div><dt className="sr-only">Google rating</dt><dd className="t-display">{agg.ratingValue}★</dd><dd className="t-label film-dim">Google · {agg.reviewCount} reviews</dd></div>
          <div><dt className="sr-only">Offer</dt><dd className="t-display">1st month</dd><dd className="t-label film-dim">Free, then from $99/mo</dd></div>
          <div className="bp-film-proof-3"><dt className="sr-only">Where</dt><dd className="t-display">Gold Coast</dd><dd className="t-label film-dim">Working Australia-wide</dd></div>
        </dl>

        <div aria-hidden="true" className="bp-film-ring">
          <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" /><circle data-ring cx="24" cy="24" r="22" pathLength={1} strokeDasharray="1 1" strokeDashoffset="1" /></svg>
          <span className="t-label">Scroll</span>
        </div>

        <div role="status" className="film-loading">
          <span aria-hidden="true" className="film-loading-track"><span style={{ width: `${loading ?? 0}%` }} /></span>
          <span className="t-label">Loading{loading !== null && <b> {loading}%</b>}</span>
        </div>
      </div>
    </section>
  )
}
