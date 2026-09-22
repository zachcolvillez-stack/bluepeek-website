'use client'
import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
const links = [['Work', '#work'], ['Services', '#services'], ['About', '#our-story'], ['Free SEO Audit', '/seo-audit']]
export default function Nav({ home = true }) {
  const sectionHref = (href) => (href.startsWith('/') || home) ? href : `/${href}`
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  useEffect(() => {
    function escape(event) {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
    }
    document.addEventListener('keydown', escape)
    return () => document.removeEventListener('keydown', escape)
  }, [open])
  return (
    <header className="bp-header">
      <div className="bp-wrap bp-header-row">
        <a href="/" aria-label="Bluepeek home" className="bp-logo"><Logo size={36} /></a>
        <nav className="bp-desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={sectionHref(href)}>{label}</a>)}</nav>
        <button ref={toggle} className="bp-menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}<span aria-hidden="true">{open ? '×' : '☰'}</span></button>
      </div>
      <nav id="mobile-navigation" className="bp-mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {[...links, ['Packages', '#packages'], ['Get a free quote', '#contact']].map(([label, href]) => <a key={href} href={sectionHref(href)} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>)}
      </nav>
    </header>
  )
}
