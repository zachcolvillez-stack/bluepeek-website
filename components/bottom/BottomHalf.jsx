'use client'
import { useEffect } from 'react'
import Intro from './Intro'
import Websites from './Websites'
import Ads from './Ads'
import Systems from './Systems'
import Closing from './Closing'

/**
 * Everything after the Descent film. Rhythm: light (intro + 1 Websites),
 * dark (2 Ads), light (3 AI systems), dark (closing). Each section owns its
 * own component + CSS module; shared tokens live in app/bottom.css (.bh).
 */
export default function BottomHalf() {
  useEffect(() => {
    // Child scroll scenes change height during hydration. Resolve a direct
    // section link after those layouts settle, rather than losing its target.
    const id = window.location.hash.slice(1)
    if (!['intro', 'work', 'ads', 'systems', 'contact', 'quote-form'].includes(id)) return
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' })
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    // Section links jump straight there instead of smooth-scrolling through the
    // whole film. (#contact is left alone: EnquireWidget opens the form for it.)
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href^="#"], a[href^="/#"]')
      const id = a?.getAttribute('href').split('#')[1]
      if (!['intro', 'work', 'ads', 'systems'].includes(id)) return
      const el = document.getElementById(id)
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'instant', block: 'start' })
      history.pushState(null, '', `#${id}`)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div className="bh">
      <Intro />
      <Websites />
      <Ads />
      <Systems />
      <Closing />
    </div>
  )
}
