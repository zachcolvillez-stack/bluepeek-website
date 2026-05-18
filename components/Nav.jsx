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
      scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" onClick={(e) => handleClick(e, 'hero')} className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Bluepeek" className="w-20 h-20 object-contain" />
          <span className="text-slate-900 font-bold text-lg tracking-tight">bluepeek</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.label} href={`#${l.id}`} onClick={(e) => handleClick(e, l.id)}
              className={`text-sm transition-all px-4 py-2 rounded-lg ${
                currentScene === l.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" onClick={(e) => handleClick(e, 'contact')}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold transition-all btn-glow">
          Get a Free Quote
        </a>

        {/* Mobile menu button */}
        <button className="md:hidden text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-4 space-y-2">
          {links.map(l => (
            <a key={l.label} href={`#${l.id}`} onClick={(e) => handleClick(e, l.id)}
              className="block text-slate-700 hover:text-slate-900 transition-colors py-2">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleClick(e, 'contact')}
            className="block w-full text-center px-5 py-2.5 rounded-lg bg-blue-500 text-white text-sm font-semibold mt-2">
            Get a Free Quote
          </a>
        </div>
      )}
    </nav>
  )
}
