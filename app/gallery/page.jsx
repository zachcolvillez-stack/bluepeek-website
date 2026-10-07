import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '../../lib/site'
import { getGallerySites } from '../../lib/gallery'
import GalleryGrid from '../../components/GalleryGrid'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import ChatWidget from '../../components/ChatWidget'

export const metadata = {
  title: 'Gallery - Client Websites We’ve Built | Bluepeek',
  description: 'Browse selected live websites Bluepeek has built for Australian businesses - barbers, mechanics, tradies, salons and more. Tap any to visit the real site.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery - Client Websites We’ve Built | Bluepeek',
    description: 'Selected client websites built by Bluepeek for Australian businesses.',
    url: `${SITE?.url || ''}/gallery`,
    type: 'website',
  },
}

// Re-pull the Vercel project list hourly so newly-deployed sites appear here
// on their own (see lib/gallery.js).
export const revalidate = 3600

export default async function GalleryPage() {
  const sites = await getGallerySites()
  return (
    <>
      <SiteHeader />
      <main className="relative pt-28 pb-24 px-6">
        <div className="hero-glow" style={{ top: '-6%', left: '-4%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(47,95,208,0.10) 0%, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow">Gallery</span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: 'var(--ink)' }}>
              Our work.<br />Your next first impression.
            </h1>
            <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: 'var(--text)' }}>
              A selection of live websites for Australian businesses, with recent projects up front. Tap any to visit the real thing.
            </p>
          </div>

          <GalleryGrid sites={sites} />

          <div className="text-center mt-16">
            <p className="text-base mb-5" style={{ color: 'var(--text)' }}>Want your business here?</p>
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
