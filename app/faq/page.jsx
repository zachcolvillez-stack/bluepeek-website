import SceneBackground from '../../components/SceneBackground'
import SiteHeader from '../../components/site/SiteHeader'
import SiteFooter from '../../components/site/SiteFooter'
import FAQ from '../../components/FAQ'
import { HOME_FAQS } from '../../lib/faqs'
import JsonLd from '../../components/seo/JsonLd'
import { faqSchema } from '../../lib/schema'
import { SITE } from '../../lib/site'

export const metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers about cost, timelines, ownership, AI automation, SEO and the areas Blue Peek covers. Gold Coast based, working with businesses across Australia.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | Bluepeek',
    description: 'Cost, timelines, ownership, AI automation, SEO and coverage areas.',
    url: `${SITE.url}/faq`,
  },
}

export default function FaqPage() {
  return (
    <main className="relative">
      <SceneBackground />
      <div className="relative z-10">
        <SiteHeader />
        <div className="pt-24">
          <FAQ />
        </div>
        <SiteFooter />
      </div>
      {/* The FAQ schema moves with the content — it does real work for AI answer engines. */}
      <JsonLd data={faqSchema(HOME_FAQS)} />
    </main>
  )
}
