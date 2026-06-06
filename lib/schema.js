import { SITE } from './site'

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`

// Organization + LocalBusiness/ProfessionalService (sitewide identity)
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    slogan: SITE.tagline,
    areaServed: {
      '@type': 'City',
      name: 'Perth',
      containedInPlace: { '@type': 'State', name: 'Western Australia' },
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Perth',
      addressRegion: 'WA',
      addressCountry: 'AU',
    },
    knowsAbout: [
      'Website design', 'AI automation', 'Lead capture systems',
      'Local SEO', 'Small business websites', 'Web development',
    ],
    sameAs: [],
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
    areaServed: { '@type': 'City', name: 'Perth' },
    audience: { '@type': 'BusinessAudience', name: 'Perth small businesses' },
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
