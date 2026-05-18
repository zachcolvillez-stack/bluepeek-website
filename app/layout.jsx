import './globals.css'

export const metadata = {
  title: 'Bluepeek — Websites & AI for Perth Businesses',
  description: 'Bluepeek builds premium websites and AI integrations for local Perth businesses. Get found online, look professional, and grow.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
