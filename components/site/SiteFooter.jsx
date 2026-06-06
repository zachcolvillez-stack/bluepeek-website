import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { SITE, SERVICES, INDUSTRIES, u } from '../../lib/site'

/* Rich footer with sitewide internal links — used across all pages. */
export default function SiteFooter() {
  return (
    <footer className="relative px-6 pt-16 pb-10" style={{ background: '#0b2350' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#4f86f7,#9b6bf2)' }}>
                <span className="text-base font-black text-white">b</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">bluepeek</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#9bb3d9' }}>
              Premium websites and AI lead-capture systems for Perth businesses. Built to get you found, look professional, and grow.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#6f8bc0' }}>Services</p>
            <div className="flex flex-col gap-2.5 text-sm">
              {SERVICES.map(s => (
                <Link key={s.slug} href={u.service(s.slug)} className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>{s.title}</Link>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#6f8bc0' }}>Industries</p>
            <div className="flex flex-col gap-2.5 text-sm">
              {INDUSTRIES.map(i => (
                <Link key={i.slug} href={u.industry(i.slug)} className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>{i.title}</Link>
              ))}
            </div>
          </div>

          {/* Company / contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#6f8bc0' }}>Company</p>
            <div className="flex flex-col gap-2.5 text-sm mb-4">
              <Link href="/" className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>Home</Link>
              <a href="/#work" className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>Our Work</a>
              <a href="/#contact" className="transition-colors hover:text-white" style={{ color: '#bcd0f0' }}>Contact</a>
            </div>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white mb-2" style={{ color: '#bcd0f0' }}>
              <Mail size={15} /> {SITE.email}
            </a>
            <p className="flex items-center gap-2 text-sm" style={{ color: '#9bb3d9' }}>
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
