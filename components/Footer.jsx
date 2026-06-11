'use client'
import { Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, Music2 } from 'lucide-react'
import { activeSocials } from '../lib/social'

const CONTACT_EMAIL = 'info@bluepeek.com.au'

// lucide has no TikTok glyph — Music2 is the conventional stand-in.
const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: Music2,
  linkedin: Linkedin,
  youtube: Youtube,
}

export default function Footer({ onNavigate }) {
  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate?.(id)
  }

  return (
    <footer className="relative px-6 pt-16 pb-10" style={{ background: '#0b2350' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#2f63d9' }}>
                <span className="text-base font-black text-white">b</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">bluepeek</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#9bb3d9' }}>
              Premium websites and AI lead-capture systems for Perth businesses. Built to get you found, look professional, and grow.
            </p>
          </div>

          {/* Links */}
          <div className="md:text-center">
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#6f8bc0' }}>Explore</p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="#services"     onClick={(e) => handleClick(e, 'services')}     className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>Services</a>
              <a href="#work"         onClick={(e) => handleClick(e, 'work')}         className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>Our Work</a>
              <a href="#how-it-works" onClick={(e) => handleClick(e, 'how-it-works')} className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>Process</a>
              <a href="#contact"      onClick={(e) => handleClick(e, 'contact')}      className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#6f8bc0' }}>Get in touch</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white mb-3" style={{ color: '#bcd0f0' }}>
              <Mail size={15} /> {CONTACT_EMAIL}
            </a>
            <p className="flex items-center md:justify-end gap-2 text-sm" style={{ color: '#9bb3d9' }}>
              <MapPin size={15} /> Perth, Western Australia
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8">
          <p className="text-xs" style={{ color: '#6f8bc0' }}>© {new Date().getFullYear()} Bluepeek. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#6f8bc0' }}>Premium websites & AI · Built in Perth</p>
        </div>
      </div>
    </footer>
  )
}
