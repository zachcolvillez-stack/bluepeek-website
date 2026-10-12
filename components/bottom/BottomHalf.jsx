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
