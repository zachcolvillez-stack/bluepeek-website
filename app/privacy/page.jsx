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
    <LegalLayout title="Privacy Policy" updated="November 2026">
      <p>{SITE.name} respects your privacy. This policy explains what personal information we collect and how we use it, in line with the Australian Privacy Principles.</p>
      <h2 className="text-xl font-semibold pt-2">What we collect</h2>
      <p>When you contact us or submit an enquiry form, we collect the details you provide, such as your name, business name, email, phone number and message. We may also collect basic analytics about how visitors use this site.</p>
      <h2 className="text-xl font-semibold pt-2">Analytics, advertising and cookies</h2>
      <p>We may use Google Analytics, Google Ads and Meta (Facebook and Instagram) tools on this site. They use cookies and similar technologies to measure visits, tell us which ads and pages led to an enquiry, and show our ads to people who have visited this site. When you submit an enquiry, we record how you arrived (for example the campaign, ad or search that brought you here) alongside your details so we can see which marketing works. We do not send your name, email or phone number to Google or Meta. You can opt out of personalised ads in your Google and Meta ad settings, or block cookies in your browser.</p>
      <h2 className="text-xl font-semibold pt-2">Connected social media accounts</h2>
      <p>Our internal tools post {SITE.name}&apos;s own content (for example short videos of websites) to social media accounts that a {SITE.name} team member has connected and authorised: TikTok, Instagram, Facebook, Threads, YouTube and LinkedIn. When an account is connected, the platform gives us an access token and, depending on the platform, basic profile information (account ID, username or display name and profile picture), permission to publish videos and captions to that account, and performance figures for the posts we publish (such as views, likes and comments).</p>
      <p>We use this only to show which account content will be posted to, publish the content a team member has prepared and approved, and see how those posts perform. For TikTok, a team member reviews each post before it is published, chooses who can see it and its interaction settings, and discloses any promotional content. We do not read private messages, do not post anything without a team member&apos;s authorisation, do not sell or share this data, and do not use it for advertising or to build profiles of other users.</p>
      <p>Access tokens are stored securely on our servers and used only to make the posts and requests described above. You can disconnect an account at any time in our dashboard, or remove our access in the platform&apos;s own settings (for TikTok: Settings and privacy, Security, Apps and permissions). When an account is disconnected or you ask us to, we delete its tokens and stored profile information within 30 days.</p>
      <p>Our YouTube connection uses YouTube API Services. By using it you agree to the <a href="https://www.youtube.com/t/terms" style={{ color: 'var(--lapiz)' }}>YouTube Terms of Service</a>, and Google&apos;s handling of your data is described in the <a href="https://policies.google.com/privacy" style={{ color: 'var(--lapiz)' }}>Google Privacy Policy</a>. You can revoke our access at <a href="https://security.google.com/settings/security/permissions" style={{ color: 'var(--lapiz)' }}>Google security settings</a>. Our use of information received from Google APIs follows the Google API Services User Data Policy, including the Limited Use requirements.</p>
      <h2 className="text-xl font-semibold pt-2">How we use it</h2>
      <p>We use your information solely to respond to your enquiry, provide our services, and improve our site. We do not sell your personal information to third parties.</p>
      <h2 className="text-xl font-semibold pt-2">Storage and security</h2>
      <p>Your information is stored securely with reputable service providers and retained only as long as needed for the purposes above or as required by law.</p>
      <h2 className="text-xl font-semibold pt-2">Your rights</h2>
      <p>You can ask us to access, correct or delete the personal information we hold about you at any time by emailing <a href={`mailto:${SITE.email}`} style={{ color: 'var(--lapiz)' }}>{SITE.email}</a>.</p>
    </LegalLayout>
  )
}
