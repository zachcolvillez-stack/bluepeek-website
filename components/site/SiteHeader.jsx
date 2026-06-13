'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '../Logo'

/* Header for sub-pages — links back to homepage sections + key pages. */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Services', href: '/#services' },
    { label: 'Pricing',  href: '/#packages' },
    { label: 'Work',     href: '/#work' },
    { label: 'Gallery',  href: '/gallery' },
    { label: 'Process',  href: '/#how-it-works' },
    { label: 'Contact',  href: '/#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled
        ? { background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(99,91,168,0.12)', boxShadow: '0 8px 30px rgba(91,77,168,0.10)' }
        : { background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" aria-label="Bluepeek home"><Logo size={38} /></Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium transition-colors px-4 py-2 rounded-lg" style={{ color: '#aebfe6' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#aebfe6'}>
              {l.label}
            </a>
          ))}
        </div>

        <a href="/#contact" className="hidden md:inline-flex items-center btn-primary px-5 py-2.5 rounded-full text-sm">
          Get a Free Quote
        </a>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: '#ffffff' }} aria-label="Menu">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 py-4 space-y-1"
          style={{ background: 'rgba(8,27,62,0.97)', backdropFilter: 'blur(18px)', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
              className="block py-2.5 font-medium" style={{ color: '#aebfe6' }}>{l.label}</a>
          ))}
          <a href="/#contact" className="block w-full text-center btn-primary px-5 py-3 rounded-full text-sm mt-3">Get a Free Quote</a>
        </div>
      )}
    </nav>
  )
}
