import SiteHeader from './SiteHeader'
import SiteFooter from './SiteFooter'

// Shared shell for legal pages (Terms, Privacy) — matches the site chrome so
// the pages feel native, not bolted on. Content is passed as children.
export default function LegalLayout({ title, updated, children }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 sm:px-6 pt-28 pb-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-sm mb-10" style={{ color: '#7e889f' }}>Last updated: {updated}</p>
        <div className="space-y-6 text-[15px] leading-relaxed" style={{ color: '#c4ccdd' }}>
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
