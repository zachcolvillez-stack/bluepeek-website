import { SITE } from '../../lib/site'
import LegalLayout from '../../components/site/LegalLayout'

export const metadata = {
  title: 'Terms of Service | Bluepeek',
  description: 'The terms governing use of the Bluepeek website and our web design, hosting and AI services.',
  alternates: { canonical: '/terms' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="July 2026">
      <p>These terms govern your use of the {SITE.name} website and the website design, hosting, maintenance and AI services we provide. By engaging {SITE.name} or using this site, you agree to them.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Our services</h2>
      <p>{SITE.name} designs, builds and maintains websites and related digital and AI systems for businesses. The specific scope, deliverables, fees and timeline for any project are set out in the proposal or invoice we agree with you before work begins.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Fees and payment</h2>
      <p>Fees are quoted per project or as an ongoing monthly plan. Upfront and monthly amounts are as stated in your agreed proposal. Monthly maintenance is billed from the date your site goes live. Payments are handled securely by our payment provider.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Ownership and content</h2>
      <p>On full payment, you own the content and final website we deliver for your business. You are responsible for ensuring any material you supply (text, images, logos) is accurate and that you hold the rights to use it.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Cancellation</h2>
      <p>Ongoing plans can be cancelled with reasonable notice as set out in your agreement. Fees already paid for completed work are non-refundable.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Liability</h2>
      <p>We take care to deliver reliable, professional work, but to the extent permitted by law our liability is limited to the fees paid for the service in question. Nothing in these terms excludes rights you have under the Australian Consumer Law.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Contact</h2>
      <p>Questions about these terms? Email <a href={`mailto:${SITE.email}`} style={{ color: '#9fb6ff' }}>{SITE.email}</a>.</p>
    </LegalLayout>
  )
}
