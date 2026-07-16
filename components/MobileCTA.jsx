'use client'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * Sticky bottom CTA bar - mobile only.
 * Appears once the user scrolls past the hero, hides near the contact form.
 */
export default function MobileCTA({ onCTA }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 600
      const contact = document.getElementById('contact')
      const nearContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight + 100
        : false
      setShow(past && !nearContact)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 transition-all duration-300"
      style={{
        transform: show ? 'translateY(0)' : 'translateY(120%)',
        opacity: show ? 1 : 0,
        background: 'transparent',
      }}
    >
      <button
        onClick={() => onCTA('contact')}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold"
      >
        Get a Free Quote
        <ArrowRight size={16} />
      </button>
    </div>
  )
}
