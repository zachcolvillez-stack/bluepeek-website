'use client'
import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'

// Real client screenshot projected into the four inside display corners of
// the 1672 × 941 photographic plate. The hardware is the photo, not CSS.
const screenTransform = 'matrix3d(0.427224728065,0.00423139701241,0,-0.0000790568396234,-0.108802455293,0.498329646555,0,-0.000037687571209,0,0,1,0,893,185,0,1)'
export default function LaptopVisual() {
  const plane = useRef(null)
  const canvas = useRef(null)
  const screenshot = useRef(null)
  useLayoutEffect(() => {
    const stage = plane.current.closest('.bp-masthead')
    const hero = plane.current.closest('.bp-hero')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 1024px)')
    let frame = 0
    let start = 0
    let travel = 1
    function update() {
      frame = 0
      const progress = motion.matches ? 0 : Math.max(0, Math.min(1, (window.scrollY - start) / travel))
      if (screenshot.current) screenshot.current.style.transform = `translate3d(0,${-progress * 2200}px,0)`
    }
    function measure() {
      stage.dataset.scrollReady = String(!motion.matches)
      const width = plane.current.clientWidth
      const height = plane.current.clientHeight
      const scale = Math.max(width / 1672, height / 941)
      canvas.current.style.transform = `translate(${width - 1672 * scale}px,${height - 941 * scale}px) scale(${scale})`
      const stageTop = stage.getBoundingClientRect().top + window.scrollY
      if (desktop.matches && !motion.matches) {
        start = stageTop
        travel = Math.max(1, stage.offsetHeight - hero.offsetHeight)
      } else {
        const visual = plane.current.parentElement
        start = Math.max(stageTop, visual.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.62)
        travel = Math.max(400, visual.offsetHeight + window.innerHeight * 0.15)
      }
      update()
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update) }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(plane.current)
    window.addEventListener('scroll', onScroll, {passive:true})
    window.addEventListener('resize', measure)
    motion.addEventListener('change', measure)
    desktop.addEventListener('change', measure)
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      motion.removeEventListener('change', measure)
      desktop.removeEventListener('change', measure)
      delete stage.dataset.scrollReady
    }
  }, [])
  return (<div className="bp-hero-visual" role="img" aria-label="An open silver laptop displaying the real Coastal 2PAC website; the website scrolls inside the screen as you scroll this page">
    <div className="bp-photo-plane" ref={plane}>
      <Image className="bp-workspace-photo" src="/images/bluepeek-workspace.webp" alt="" fill sizes="(max-width: 760px) 180vw, (max-width: 1023px) 140vw, 100vw" priority />
      <div className="bp-screen-canvas" ref={canvas}><div className="bp-laptop-screen" aria-hidden="true" style={{transform:screenTransform}}>
        <Image ref={screenshot} src="/images/coastal-2pac-scroll-3200.webp" className="bp-scrolling-site" alt="" width={1200} height={3200} sizes="(max-width: 760px) 80vw, 45vw" priority />
      </div></div>
    </div>
  </div>)
}
