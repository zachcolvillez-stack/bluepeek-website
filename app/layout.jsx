import './globals.css'

export const metadata = {
  title: 'Bluepeek — Premium Websites & AI for Perth Businesses',
  description: 'Bluepeek builds high-converting websites and AI lead-capture systems for Perth businesses. Perth website design, local SEO, automation — no lock-in, you own everything. Get a free quote.',
  keywords: ['Perth website design', 'websites for local businesses', 'AI automation for small businesses', 'lead capture systems', 'high-converting websites', 'no lock-in websites', 'web design Perth', 'Bluepeek'],
  openGraph: {
    title: 'Bluepeek — Premium Websites & AI for Perth Businesses',
    description: 'High-converting websites and AI lead-capture systems for Perth businesses. Built in Perth, no lock-in, you own everything.',
    type: 'website',
    locale: 'en_AU',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
