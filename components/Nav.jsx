'use client'
import { useState, useEffect } from 'react'

export default function Nav({ onNavigate, currentScene }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services',  id: 'services' },
    { label: 'Our Work',  id: 'work' },
    { label: 'Reviews',   id: 'reviews' },
    { label: 'About',     id: 'about' },
  ]

  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-xl' : ''
    }`}
      style={scrolled
        ? { background: 'rgba(10,10,12,0.75)', borderBottom: '1px solid #1f1f24' }
        : { background: 'transparent' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => handleClick(e, 'hero')} className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#22d3ee' }}>
            <span className="text-base font-black" style={{ color: '#0a0a0c' }}>b</span>
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: '#f5f5f7' }}>bluepeek</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.label} href={`#${l.id}`} onClick={(e) => handleClick(e, l.id)}
              className="text-sm transition-all px-4 py-2 rounded-full"
              style={currentScene === l.id
                ? { color: '#22d3ee', background: 'rgba(34,211,238,0.08)' }
                : { color: '#8a8a93' }}
              onMouseEnter={(e) => { if (currentScene !== l.id) e.currentTarget.style.color = '#f5f5f7' }}
              onMouseLeave={(e) => { if (currentScene !== l.id) e.currentTarget.style.color = '#8a8a93' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" onClick={(e) => handleClick(e, 'contact')}
          className="hidden md:inline-flex items-center btn-primary px-5 py-2 rounded-full text-sm">
          Get a Free Quote
        </a>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: '#f5f5f7' }}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden backdrop-blur-xl px-6 py-4 space-y-2"
          style={{ background: 'rgba(10,10,12,0.95)', borderBottom: '1px solid #1f1f24' }}>
          {links.map(l => (
            <a key={l.label} href={`#${l.id}`} onClick={(e) => handleClick(e, l.id)}
              className="block py-2 transition-colors" style={{ color: '#8a8a93' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f5f5f7'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8a8a93'}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}
            className="block w-full text-center btn-primary px-5 py-2.5 rounded-full text-sm mt-2">
            Get a Free Quote
          </a>
        </div>
      )}
    </nav>
  )
}
