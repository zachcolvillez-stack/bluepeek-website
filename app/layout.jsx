import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SITE } from '../lib/site'
import { organizationSchema, websiteSchema } from '../lib/schema'
import JsonLd from '../components/seo/JsonLd'

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Bluepeek — Perth Website Design & AI Automation for Local Business',
    template: '%s | Bluepeek Perth',
  },
  description: SITE.description,
  keywords: [
    'Perth website design', 'small business websites Perth', 'AI automation Perth',
    'lead capture websites', 'web design Perth', 'websites for tradies',
    'local SEO Perth', 'website designer Perth', 'Bluepeek',
  ],
  authors: [{ name: 'Bluepeek' }],
  creator: 'Bluepeek',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE.url,
    siteName: SITE.name,
    title: 'Bluepeek — Perth Website Design & AI Automation',
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: 'Bluepeek — Perth website design & AI automation' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bluepeek — Perth Website Design & AI Automation',
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
