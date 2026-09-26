import { SITE } from './site'
import { activeSocials } from './social'
import { PAGES } from './growth'

const ORG_ID = `${SITE.url}/#organization`
const SITE_ID = `${SITE.url}/#website`

// Every profile/citation that describes Bluepeek - feeds schema `sameAs`,
// which is how search + answer engines confidently resolve the entity.
// Add Google Business Profile / directory URLs here as they go live.
function sameAsUrls() {
  return activeSocials().map(s => s.url)
}

// Organization + ProfessionalService (sitewide identity, declared once with @id;
// every other node references it). Review markup is deliberately absent: Google
// treats reviews a business publishes about itself as self-serving and ineligible,
// so the real Google reviews stay visible on the page and are linked, not marked up.
export function organizationSchema(live) {
  const sameAs = [...sameAsUrls(), ...(live?.mapsUrl ? [live.mapsUrl] : [])]
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    description: SITE.description,
    logo: `${SITE.url}/brand/logo-256.png`,
    image: `${SITE.url}${SITE.ogImage}`,
    slogan: SITE.tagline,
    founder: SITE.founders.map(name => ({ '@type': 'Person', name, jobTitle: 'Founder & Owner', worksFor: { '@id': ORG_ID } })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.street,
      addressLocality: SITE.suburb,
      addressRegion: SITE.regionCode,
      postalCode: SITE.postcode,
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'City', name: 'Gold Coast' },
      { '@type': 'Country', name: 'Australia' },
    ],
    contactPoint: [
      { '@type': 'ContactPoint', telephone: SITE.phone, email: SITE.email, contactType: 'sales', areaServed: 'AU', availableLanguage: 'English' },
    ],
    knowsAbout: [
      'Google Ads management', 'Meta Ads', 'Facebook advertising', 'Instagram advertising',
      'Social media marketing', 'Google Business Profile optimisation', 'Google review management',
      'NFC Google review cards', 'Website design', 'Landing pages', 'Local SEO',
      'Generative engine optimisation', 'AI automation', 'Lead follow-up automation', 'Conversion tracking',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bluepeek growth services',
      itemListElement: Object.values(PAGES).map(p => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: p.label, url: `${SITE.url}${p.path}` },
      })),
    },
    ...(sameAs.length ? { sameAs } : {}),
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

// Service schema for a service page. `area` is 'gold-coast' or 'australia'.
export function serviceSchema({ name, description, path, serviceType, area = 'australia' }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE.url}${path}#service`,
    name,
    description,
    serviceType: serviceType || name,
    url: `${SITE.url}${path}`,
    provider: { '@id': ORG_ID },
    areaServed: area === 'gold-coast'
      ? [{ '@type': 'City', name: 'Gold Coast' }, { '@type': 'State', name: 'Queensland' }]
      : { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'BusinessAudience', name: 'Australian local and small businesses' },
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

// Article schema for a blog post
export function articleSchema({ title, description, path, datePublished, dateModified }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE.url}${path}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-AU',
    mainEntityOfPage: `${SITE.url}${path}`,
  }
}

// AboutPage schema for the /about entity page
export function aboutPageSchema({ path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${SITE.url}${path}`,
    name: `About ${SITE.name}`,
    mainEntity: { '@id': ORG_ID },
    inLanguage: 'en-AU',
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
