'use client'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SITE, SERVICES, INDUSTRIES, u } from '../../lib/site'
import Logo from '../Logo'

const PHONES = [
  { name: 'Jac', number: '0402 923 253' },
  { name: 'Zach', number: '0468 955 806' },
]

/* Rich footer with sitewide internal links - used across all pages. */
export default function SiteFooter() {
  return (
    <footer className="relative px-6 pt-16 pb-10" style={{ background: 'linear-gradient(180deg, #0c1c34 0%, #0a182d 100%)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo size={36} textColor="#ffffff" />
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: '#aab3c9' }}>
              Premium websites and intelligent lead-capture systems for Perth businesses. Built to get you found, look established, and grow.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#7e889f' }}>Services</p>
            <div className="flex flex-col gap-2.5 text-sm">
              {SERVICES.map(s => (
                <Link key={s.slug} href={u.service(s.slug)} className="transition-colors" style={{ color: '#aab3c9' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#9fb6ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#aab3c9'}>{s.title}</Link>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#7e889f' }}>Industries</p>
            <div className="flex flex-col gap-2.5 text-sm">
              {INDUSTRIES.map(i => (
                <Link key={i.slug} href={u.industry(i.slug)} className="transition-colors" style={{ color: '#aab3c9' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#9fb6ff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#aab3c9'}>{i.title}</Link>
              ))}
            </div>
          </div>

          {/* Company / contact */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#7e889f' }}>Company</p>
            <div className="flex flex-col gap-2.5 text-sm mb-4">
              <Link href="/" className="transition-colors" style={{ color: '#aab3c9' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#9fb6ff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#aab3c9'}>Home</Link>
              <a href="/#work" className="transition-colors" style={{ color: '#aab3c9' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#9fb6ff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#aab3c9'}>Our Work</a>
              <a href="/#contact" className="transition-colors" style={{ color: '#aab3c9' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#9fb6ff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#aab3c9'}>Contact</a>
            </div>
            <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 text-sm transition-colors mb-2" style={{ color: '#aab3c9' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#9fb6ff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#aab3c9'}>
              <Mail size={15} /> {SITE.email}
            </a>
            {PHONES.map((p) => (
              <a key={p.name} href={`tel:${p.number.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-sm transition-colors mb-2" style={{ color: '#aab3c9' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#9fb6ff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#aab3c9'}>
                <Phone size={15} /> {p.name} · {p.number}
              </a>
            ))}
            <p className="flex items-center gap-2 text-sm" style={{ color: '#aab3c9' }}>
              <MapPin size={15} /> Perth, Western Australia
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-8">
          <p className="text-xs" style={{ color: '#7e889f' }}>© {new Date().getFullYear()} Bluepeek. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: '#7e889f' }}>
            <a href="/terms" className="transition-colors" style={{ color: '#7e889f' }} onMouseEnter={(e)=>e.currentTarget.style.color='#9fb6ff'} onMouseLeave={(e)=>e.currentTarget.style.color='#7e889f'}>Terms of Service</a>
            <a href="/privacy" className="transition-colors" style={{ color: '#7e889f' }} onMouseEnter={(e)=>e.currentTarget.style.color='#9fb6ff'} onMouseLeave={(e)=>e.currentTarget.style.color='#7e889f'}>Privacy</a>
            <a href="https://bluepeek.com.au" className="transition-colors" style={{ color: '#7e889f' }} onMouseEnter={(e)=>e.currentTarget.style.color='#9fb6ff'} onMouseLeave={(e)=>e.currentTarget.style.color='#7e889f'}>Powered by BluePeek</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
