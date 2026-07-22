import { SITE } from './site'
import { activeSocials } from './social'
import { REVIEWS, REVIEW_AGG } from './reviews'

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`

// Every profile/citation that describes Bluepeek - feeds schema `sameAs`,
// which is how search + answer engines confidently resolve the entity.
// Add Google Business Profile / directory URLs here as they go live.
function sameAsUrls() {
  return activeSocials().map(s => s.url)
}

// Organization + LocalBusiness/ProfessionalService (sitewide identity).
// This is the primary entity answer engines (ChatGPT, Perplexity, Google AI)
// read to describe the business - keep it rich, factual and consistent.
export function organizationSchema(liveReviews) {
  const agg = liveReviews?.agg ?? REVIEW_AGG
  const reviews = liveReviews?.reviews ?? REVIEWS
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService', // string form: valid subtype + matches SEO scanners
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: 'Blue Peek',
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    slogan: SITE.tagline,
    priceRange: '$$',
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Perth', addressRegion: 'WA', addressCountry: 'AU' },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Perth',
      addressRegion: 'WA',
      addressCountry: 'AU',
    },
    areaServed: { '@type': 'Country', name: 'Australia' },
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE.email,
      contactType: 'customer service',
      areaServed: 'AU',
      availableLanguage: 'English',
    },
    knowsAbout: [
      'Website design', 'Web development', 'AI automation', 'AI chatbots',
      'Lead capture systems', 'Local SEO', 'Google Ads', 'Small business websites',
      'Conversion optimisation', 'Online booking systems',
    ],
    makesOffer: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Website Design' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI & Automation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO & Google Ads' } },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: agg.ratingValue,
      reviewCount: agg.reviewCount,
      bestRating: agg.bestRating,
    },
    review: reviews.map(r => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      ...(r.date ? { datePublished: r.date } : {}),
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
    sameAs: sameAsUrls(),
  }
}

// WebSite (enables sitelinks search semantics)
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-AU',
  }
}

// Service schema for a service page
export function serviceSchema({ name, description, path, serviceType }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    serviceType: serviceType || name,
    url: `${SITE.url}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'BusinessAudience', name: 'Australian small businesses' },
  }
}

// FAQPage schema from [{q, a}]
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

// BreadcrumbList from [{name, path}]
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  }
}
