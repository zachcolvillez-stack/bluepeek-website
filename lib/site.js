// Central site config - single source of truth for SEO, URLs, and navigation.

export const SITE = {
  name: 'Bluepeek',
  legalName: 'Bluepeek',
  url: 'https://www.bluepeek.com.au',
  email: 'info@bluepeek.com.au',
  city: 'Gold Coast',
  suburb: 'Molendinar',
  street: '7 Gidgee Court',
  postcode: '4214',
  region: 'Queensland',
  regionCode: 'QLD',
  // Perth stays a serviced area — most live client work is there.
  alsoServes: ['Perth', 'Western Australia'],
  country: 'Australia',
  areaServed: 'Australia',
  tagline: 'Premium websites & AI lead-capture systems for Australian businesses.',
  description:
    'Gold Coast web design & AI automation studio serving all of Australia. We build fast, high-converting websites and smart lead-capture systems that get local businesses found on Google.',
  ogImage: '/og-image.jpg',
}

// Service pages
export const SERVICES = [
  {
    slug: 'website-design',
    nav: 'Website Design',
    title: 'Website Design',
    keyword: 'small business website design Australia',
  },
  {
    slug: 'local-seo',
    nav: 'Local SEO',
    title: 'Local SEO',
    keyword: 'local SEO for small business',
  },
  {
    slug: 'geo-optimisation',
    nav: 'GEO Optimisation',
    title: 'GEO Optimisation',
    keyword: 'generative engine optimisation Australia',
  },
  {
    slug: 'google-ads-management',
    nav: 'Google Ads',
    title: 'Google Ads Management',
    keyword: 'Google Ads management for small business',
  },
  {
    slug: 'review-systems',
    nav: 'Review Systems',
    title: 'Customer Review Systems',
    keyword: 'Google review system for small business',
  },
  {
    slug: 'missed-call-recovery',
    nav: 'Missed Call Recovery',
    title: 'Missed Call Recovery',
    keyword: 'missed call text back system Australia',
  },
  {
    slug: 'ai-phone-agents',
    nav: 'AI Phone Agents',
    title: 'AI Phone Agents',
    keyword: 'AI phone agent for small business Australia',
  },
  {
    slug: 'ai-chatbots',
    nav: 'AI Chatbots',
    title: 'AI Chatbots for Small Business',
    keyword: 'AI chatbot for small business Australia',
  },
  {
    slug: 'lead-follow-up-automation',
    nav: 'Lead Follow-up',
    title: 'Lead Follow-up Automation',
    keyword: 'automated lead follow up Australia',
  },
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
    slug: 'website-design-gold-coast',
    nav: 'Website Design Gold Coast',
    title: 'Website Design Gold Coast',
    keyword: 'Gold Coast website design',
  },
  {
    slug: 'ai-automation-gold-coast',
    nav: 'AI Automation Gold Coast',
    title: 'AI Automation Gold Coast',
    keyword: 'AI automation Gold Coast',
  },
  {
    slug: 'small-business-websites-gold-coast',
    nav: 'Small Business Websites Gold Coast',
    title: 'Small Business Websites Gold Coast',
    keyword: 'small business websites Gold Coast',
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
  { slug: 'websites-for-panel-beaters',  nav: 'Panel Beaters', industry: 'panel beaters',   title: 'Websites for Panel Beaters' },
  { slug: 'websites-for-builders',       nav: 'Builders',      industry: 'builders',        title: 'Websites for Builders' },
  { slug: 'websites-for-electricians',   nav: 'Electricians',  industry: 'electricians',    title: 'Websites for Electricians' },
  { slug: 'websites-for-plumbers',       nav: 'Plumbers',      industry: 'plumbers',        title: 'Websites for Plumbers' },
  { slug: 'websites-for-clinics',        nav: 'Clinics',       industry: 'clinics',         title: 'Websites for Clinics' },
  { slug: 'websites-for-restaurants',    nav: 'Restaurants',   industry: 'restaurants',     title: 'Websites for Restaurants' },
]

// Case studies (real client work - no invented metrics)
export const CASE_STUDIES = [
  { slug: 'jasmine-health-and-spa',           title: 'Jasmine Health & Spa',            industry: 'Health & Spa',     location: 'Ascot, Perth WA', url: 'https://jasminehealthandspa.com.au',             image: '/screenshots/jasmine.webp' },
  { slug: 'superior-garage',                  title: 'Superior Garage',                 industry: 'Automotive',       location: 'Malaga, WA', url: 'https://superiorgarage.com.au',                       image: '/screenshots/superiorgarage.webp' },
  { slug: '54-fadez',                         title: '54 Fadez',                        industry: 'Barbershop',       location: 'Perth, WA',  url: 'https://54fadez.com.au',                              image: '/screenshots/54fadez.webp' },
  { slug: 'airborne-suspension-mechanical',   title: 'Airborne Suspension & Mechanical',industry: '4WD & Suspension', location: 'Malaga, WA', url: 'https://www.airbornesuspensionandmechanical.com.au',  image: '/screenshots/airborne.webp' },
  { slug: 'ae-ac-service-center',             title: 'AE & AC Service Center',          industry: 'Auto Electrical',  location: 'Malaga, WA', url: 'https://www.aeandacservicecenter.com.au',             image: '/screenshots/aeandac.webp' },
  { slug: 'adizahaircollections',             title: 'Adiza Hair Collections',          industry: 'Hair & Braiding',  location: 'Wagga Wagga, NSW', url: 'https://adizahaircollections.com.au',           image: '/screenshots/adizahaircollections.webp' },
]

// Full client gallery - every live client website (includes case studies + sites
// without a dedicated case study). Add a new entry here when a client goes live.
export const CLIENT_SITES = [
  { title: 'Coastal 2PAC', industry: 'Kitchens & joinery', location: 'Gold Coast, QLD', url: 'https://coastal-2pac.vercel.app/', image: '/images/coastal-2pac-preview.webp' },
  { title: 'Rayan Tiling Services', industry: 'Tiling',       location: 'Perth, WA',        url: 'https://rayantilingservices.com.au',  image: '/screenshots/rayantiling.webp' },
  ...CASE_STUDIES,
  { title: 'S.T.S.B Gardening Services', industry: 'Gardening', location: 'Albury, NSW',      url: 'https://stsbgardening.com.au',        image: '/screenshots/stsbgardening.webp' },
  { title: 'Tyre Warriors',         industry: 'Mobile Tyres', location: 'Perth, WA',        url: 'https://tyre-warriors.vercel.app',    image: '/screenshots/tyrewarriors.webp' },
  { title: 'Universe Painting',     industry: 'Painting',     location: 'Perth, WA',        url: 'https://universe-painting.vercel.app',image: '/screenshots/universepainting.webp' },
]

// Service & industry pages live at the root for stronger local SEO
// (e.g. /website-design-perth, /websites-for-mechanics).
export const u = {
  service:  (slug) => `/${slug}`,
  industry: (slug) => `/${slug}`,
  work:     (slug) => `/work/${slug}`,
}
