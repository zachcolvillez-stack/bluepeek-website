// Central site config — single source of truth for SEO, URLs, and navigation.

export const SITE = {
  name: 'Bluepeek',
  legalName: 'Bluepeek',
  url: 'https://www.bluepeek.com.au',
  email: 'info@bluepeek.com.au',
  city: 'Perth',
  region: 'Western Australia',
  regionCode: 'WA',
  country: 'Australia',
  areaServed: 'Perth, Western Australia',
  tagline: 'Premium websites & AI lead-capture systems for Perth businesses.',
  description:
    'Bluepeek designs high-converting websites and AI automation for Perth small businesses — built to get you found on Google, look professional, and turn visitors into leads. No lock-in, you own everything.',
  ogImage: '/hero-bg.jpg',
}

// Service pages
export const SERVICES = [
  {
    slug: 'website-design-perth',
    nav: 'Website Design',
    title: 'Website Design Perth',
    keyword: 'Perth website design',
  },
  {
    slug: 'ai-automation-perth',
    nav: 'AI Automation',
    title: 'AI Automation Perth',
    keyword: 'AI automation Perth',
  },
  {
    slug: 'small-business-websites-perth',
    nav: 'Small Business Websites',
    title: 'Small Business Websites Perth',
    keyword: 'small business websites Perth',
  },
  {
    slug: 'lead-capture-websites',
    nav: 'Lead Capture Websites',
    title: 'Lead Capture Websites',
    keyword: 'lead capture websites',
  },
]

// Industry pages
export const INDUSTRIES = [
  { slug: 'websites-for-mechanics',     nav: 'Mechanics',     industry: 'mechanics',      title: 'Websites for Mechanics' },
  { slug: 'websites-for-barbers',       nav: 'Barbers',       industry: 'barbershops',    title: 'Websites for Barbers' },
  { slug: 'websites-for-painters',      nav: 'Painters',      industry: 'painters',       title: 'Websites for Painters' },
  { slug: 'websites-for-tradies',       nav: 'Tradies',       industry: 'tradies',        title: 'Websites for Tradies' },
  { slug: 'websites-for-cafes',         nav: 'Cafes',         industry: 'cafes',          title: 'Websites for Cafes' },
  { slug: 'websites-for-beauty-salons', nav: 'Beauty Salons', industry: 'beauty salons',  title: 'Websites for Beauty Salons' },
]

// Case studies (real client work — no invented metrics)
export const CASE_STUDIES = [
  { slug: 'superior-garage',                  title: 'Superior Garage',                 industry: 'Automotive',       location: 'Malaga, WA', url: 'https://superiorgarage.com.au',                       image: '/screenshots/superiorgarage.png' },
  { slug: '54-fadez',                         title: '54 Fadez',                        industry: 'Barbershop',       location: 'Perth, WA',  url: 'https://54fadez.com.au',                              image: '/screenshots/54fadez.png' },
  { slug: 'airborne-suspension-mechanical',   title: 'Airborne Suspension & Mechanical',industry: '4WD & Suspension', location: 'Malaga, WA', url: 'https://www.airbornesuspensionandmechanical.com.au',  image: '/screenshots/airborne.png' },
  { slug: 'ae-ac-service-center',             title: 'AE & AC Service Center',          industry: 'Auto Electrical',  location: 'Malaga, WA', url: 'https://www.aeandacservicecenter.com.au',             image: '/screenshots/aeandac.png' },
  { slug: 'adizahaircollections',             title: 'Adiza Hair Collections',          industry: 'Hair & Braiding',  location: 'Wagga Wagga, NSW', url: 'https://adizahaircollections.com.au',           image: '/screenshots/adizahaircollections.png' },
]

// Service & industry pages live at the root for stronger local SEO
// (e.g. /website-design-perth, /websites-for-mechanics).
export const u = {
  service:  (slug) => `/${slug}`,
  industry: (slug) => `/${slug}`,
  work:     (slug) => `/work/${slug}`,
}
