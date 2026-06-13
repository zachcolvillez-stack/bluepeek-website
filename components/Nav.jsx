'use client'
import { useState, useEffect } from 'react'
import Logo from './Logo'

export default function Nav({ onNavigate, currentScene }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', id: 'services' },
    { label: 'Pricing',  id: 'packages' },
    { label: 'Work',     id: 'work' },
    { label: 'Gallery',  href: '/gallery' },
    { label: 'Process',  id: 'how-it-works' },
    { label: 'Contact',  id: 'contact' },
  ]

  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled
        ? { background: 'rgba(8,27,62,0.78)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.10)', boxShadow: '0 8px 30px rgba(0,0,0,0.25)' }
        : { background: 'transparent' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => handleClick(e, 'hero')}>
          <Logo size={38} />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.label} href={`#${l.id}`} onClick={(e) => handleClick(e, l.id)}
              className="text-sm font-medium transition-all px-4 py-2 rounded-lg"
              style={currentScene === l.id
                ? { color: '#ffffff', background: 'rgba(255,255,255,0.10)' }
                : { color: '#aebfe6' }}
              onMouseEnter={(e) => { if (currentScene !== l.id) e.currentTarget.style.color = '#ffffff' }}
              onMouseLeave={(e) => { if (currentScene !== l.id) e.currentTarget.style.color = '#aebfe6' }}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" onClick={(e) => handleClick(e, 'contact')}
          className="hidden md:inline-flex items-center btn-primary px-5 py-2.5 rounded-full text-sm">
          Get a Free Quote
        </a>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: '#ffffff' }} aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 space-y-1"
          style={{ background: 'rgba(8,27,62,0.97)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
          {links.map(l => (
            <a key={l.label} href={`#${l.id}`} onClick={(e) => handleClick(e, l.id)}
              className="block py-2.5 font-medium transition-colors" style={{ color: '#aebfe6' }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}
            className="block w-full text-center btn-primary px-5 py-3 rounded-full text-sm mt-3">
            Get a Free Quote
          </a>
        </div>
      )}
    </nav>
  )
}
