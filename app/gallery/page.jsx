import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CLIENT_SITES, SITE } from '../../lib/site'
import GalleryGrid from '../../components/GalleryGrid'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import ChatWidget from '../../components/ChatWidget'

export const metadata = {
  title: 'Gallery — Client Websites We’ve Built | Bluepeek',
  description: 'Browse the full gallery of live websites Bluepeek has built for Perth small businesses — barbers, mechanics, tradies, salons and more. Tap any to visit the real site.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery — Client Websites We’ve Built | Bluepeek',
    description: 'Every live client website Bluepeek has built, in one place.',
    url: `${SITE?.url || ''}/gallery`,
    type: 'website',
  },
}

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative pt-28 pb-24 px-6">
        <div className="hero-glow" style={{ top: '-6%', left: '-4%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(155,107,242,0.18) 0%, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow">Gallery</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#ffffff' }}>
              Every site we&apos;ve built,<br />in one place.
            </h1>
            <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: '#c2d2ee' }}>
              A growing collection of live client websites for Perth small businesses. Tap any to visit the real thing.
            </p>
          </div>

          <GalleryGrid sites={CLIENT_SITES} />

          <div className="text-center mt-16">
            <p className="text-base mb-5" style={{ color: '#c2d2ee' }}>Want your business here?</p>
            <Link href="/#contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold">
              Get a free quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ChatWidget />
    </>
  )
}
