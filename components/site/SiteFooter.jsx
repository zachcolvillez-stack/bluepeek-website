import Link from 'next/link'
import { Mail, MapPin } from 'lucide-react'
import { SITE, SERVICES, INDUSTRIES, u } from '../../lib/site'

/* Rich footer with sitewide internal links — used across all pages. */
export default function SiteFooter() {
  return (
    <footer className="relative px-6 pt-16 pb-10" style={{ background: 'linear-gradient(180deg, #0a0e1a 0%, #080b14 100%)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7fb0f7 0%, #8f86f3 55%, #a78bf5 100%)' }}>
                <span className="text-base font-black text-white">b</span>
              </div>
              <span className="font-bold text-lg tracking-tight" style={{ color: '#f4f7fd' }}>bluepeek</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#565471' }}>
              Premium websites and intelligent lead-capture systems for Perth businesses. Built to get you found, look established, and grow.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#8c8aa3' }}>Services</p>
            <div className="flex flex-col gap-2.5 text-sm">
              {SERVICES.map(s => (
                <Link key={s.slug} href={u.service(s.slug)} className="transition-colors" style={{ color: '#565471' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#7c5fe0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#565471'}>{s.title}</Link>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#8c8aa3' }}>Industries</p>
            <div className="flex flex-col gap-2.5 text-sm">
              {INDUSTRIES.map(i => (
                <Link key={i.slug} href={u.industry(i.slug)} className="transition-colors" style={{ color: '#565471' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#7c5fe0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#565471'}>{i.title}</Link>
              ))}
            </div>
          </div>

          {/* Company / contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#8c8aa3' }}>Company</p>
            <div className="flex flex-col gap-2.5 text-sm mb-4">
              <Link href="/" className="transition-colors" style={{ color: '#565471' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#7c5fe0'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#565471'}>Home</Link>
              <a href="/#work" className="transition-colors" style={{ color: '#565471' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#7c5fe0'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#565471'}>Our Work</a>
              <a href="/#contact" className="transition-colors" style={{ color: '#565471' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#7c5fe0'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#565471'}>Contact</a>
            </div>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-sm transition-colors mb-2" style={{ color: '#565471' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#7c5fe0'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#565471'}>
              <Mail size={15} /> {SITE.email}
            </a>
            <p className="flex items-center gap-2 text-sm" style={{ color: '#565471' }}>
              <MapPin size={15} /> Perth, Western Australia
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8">
          <p className="text-xs" style={{ color: '#8c8aa3' }}>© {new Date().getFullYear()} Bluepeek. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#8c8aa3' }}>Premium websites & smart systems · Built in Perth</p>
        </div>
      </div>
    </footer>
  )
}
