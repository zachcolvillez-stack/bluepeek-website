import { SITE } from '../../lib/site'
import LegalLayout from '../../components/site/LegalLayout'

export const metadata = {
  title: 'Privacy Policy | Bluepeek',
  description: 'How Bluepeek collects, uses and protects your personal information.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 2026">
      <p>{SITE.name} respects your privacy. This policy explains what personal information we collect and how we use it, in line with the Australian Privacy Principles.</p>
      <h2 className="text-white text-xl font-semibold pt-2">What we collect</h2>
      <p>When you contact us or submit an enquiry form, we collect the details you provide, such as your name, business name, email, phone number and message. We may also collect basic analytics about how visitors use this site.</p>
      <h2 className="text-white text-xl font-semibold pt-2">How we use it</h2>
      <p>We use your information solely to respond to your enquiry, provide our services, and improve our site. We do not sell your personal information to third parties.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Storage and security</h2>
      <p>Your information is stored securely with reputable service providers and retained only as long as needed for the purposes above or as required by law.</p>
      <h2 className="text-white text-xl font-semibold pt-2">Your rights</h2>
      <p>You can ask us to access, correct or delete the personal information we hold about you at any time by emailing <a href={`mailto:${SITE.email}`} style={{ color: '#9fb6ff' }}>{SITE.email}</a>.</p>
    </LegalLayout>
  )
}
