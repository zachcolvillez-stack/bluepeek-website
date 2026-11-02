// Central site config - single source of truth for SEO, URLs, and navigation.

export const SITE = {
  name: 'Bluepeek',
  legalName: 'Bluepeek',
  url: 'https://www.bluepeek.com.au',
  email: 'info@bluepeek.com.au',
  phone: '+61402923253',
  phoneDisplay: '0402 923 253',
  founders: ['Jac Thomas-Rees', 'Zach Colville'],
  city: 'Gold Coast',
  suburb: 'Molendinar',
  postcode: '4214',
  region: 'Queensland',
  regionCode: 'QLD',
  // Perth stays a serviced area — most live client work is there.
  alsoServes: ['Perth', 'Western Australia'],
  country: 'Australia',
  areaServed: 'Australia',
  tagline: 'Get found. Get leads. Get chosen.',
  description:
    'Web design and SEO from the Gold Coast for local businesses across Australia: custom websites, local SEO, Google Ads, Google reviews and AI follow-up. First month free, then from $99 a month.',
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

// Case studies (real client work - no invented metrics).
//   problem / services / industryHub : drive the case-study page and its internal links
//   results : ONLY real, measured data. Every field is optional and a metric renders
//             only when it has a value AND `results.source` says where it came from
//             (e.g. 'Google Ads account, 1 Jun - 31 Aug 2026'). Leave it out otherwise.
//             Fields: period, adSpend, clicks, leads, costPerLead, conversionChange,
//             reviewGrowth, websiteChange.
export const CASE_STUDIES = [
  { slug: 'attention-detailing',            title: 'Attention Detailing',             industry: 'Car Detailing',   location: 'Nerang & Molendinar, QLD', url: 'https://attentiondetailing.com.au', image: '/screenshots/gallery-20261102/attention.webp', imageAlt: 'Attention Detailing live website with its workshop photography and online booking', services: ['website-design', 'lead-capture-websites'], results: {
    period: '17 Sep–9 Oct 2026, within the first month online',
    leads: '54 quote form submissions',
    source: 'BluePeek Forms client overview, excluding submissions flagged as spam; Vercel production domain connected 17 Sep 2026. Submissions are enquiries, not confirmed jobs or sales.',
  } },
  { slug: 'jasmine-health-and-spa',         title: 'Jasmine Health & Spa',             industry: 'Health & Spa',     location: 'Ascot, Perth WA',  url: 'https://jasminehealthandspa.com.au',                 image: '/screenshots/gallery-20261102/jasmine.webp',              services: ['website-design', 'lead-capture-websites'], results: {
    clicks: '56 to 98 organic search clicks across consecutive 28-day periods (12 Aug–8 Sep vs 9 Sep–6 Oct 2026)',
    leads: '40 booking form submissions recorded through 9 Oct 2026',
    source: 'Google Search Console web search; BluePeek Forms. Form submissions are enquiries, not confirmed paid appointments. Both search periods followed the website launch.',
  } },
  { slug: 'superior-garage',                title: 'Superior Garage',                  industry: 'Automotive',       location: 'Malaga, WA',       url: 'https://superiorgarage.com.au',                      image: '/screenshots/gallery-20261102/superior.webp',       services: ['website-design', 'local-seo'], industryHub: 'mechanics', results: {
    leads: '16 booking form submissions recorded through 9 Oct 2026',
    source: 'BluePeek Forms. Submissions are enquiries, not confirmed paid appointments; no comparable pre-launch booking baseline is available.',
  } },
  { slug: '54-fadez',                       title: '54 Fadez',                         industry: 'Barbershop',       location: 'Perth, WA',        url: 'https://54fadez.com.au',                             image: '/screenshots/54fadez.webp',              services: ['website-design'] },
  { slug: 'airborne-suspension-mechanical', title: 'Airborne Suspension & Mechanical', industry: '4WD & Suspension', location: 'Malaga, WA',       url: 'https://www.airbornesuspensionandmechanical.com.au', image: '/screenshots/gallery-20261102/airborne.webp',             services: ['website-design', 'local-seo'], industryHub: 'mechanics' },
  { slug: 'ae-ac-service-center',           title: 'AE & AC Service Center',           industry: 'Auto Electrical',  location: 'Malaga, WA',       url: 'https://www.aeandacservicecenter.com.au',            image: '/screenshots/aeandac.webp',              services: ['website-design', 'local-seo'], industryHub: 'mechanics' },
  { slug: 'adizahaircollections',           title: 'Adiza Hair Collections',           industry: 'Hair & Braiding',  location: 'Wagga Wagga, NSW', url: 'https://adizahaircollections.com.au',                image: '/screenshots/gallery-20261102/adiza.webp', services: ['website-design'] },
]

// Selected live designs, captured on 2 November 2026. Shared with the homepage
// wall so our strongest work keeps its order and its current screenshot.
export const FEATURED_SITES = [
  CASE_STUDIES.find(c => c.slug === 'attention-detailing'),
  { title: 'K Lashes Aesthetics & Beauty', industry: 'Beauty Salon', location: 'Hanham, UK', url: 'https://klashesaestheticsandbeauty.co.uk', image: '/screenshots/gallery-20261102/klashes.webp' },
  { title: 'Marlin Glass Fencing', industry: 'Glass Fencing', location: 'Hervey Bay, QLD', url: 'https://marlinsglassfencing.com.au', image: '/screenshots/gallery-20261102/marlin.webp' },
  { title: 'Rodano Flowers', industry: 'Florist', location: 'Wattleup, WA', url: 'https://rodanoflowers.com.au', image: '/screenshots/gallery-20261102/rodano.webp' },
  { title: 'Empire Cuts', industry: 'Barbershop', location: 'Brisbane, QLD', url: 'https://empirecuts.com.au', image: '/screenshots/gallery-20261102/empire.webp' },
  { title: 'True Shine Painters', industry: 'Painting', location: 'Melbourne, VIC', url: 'https://trueshinepainters.com.au', image: '/screenshots/gallery-20261102/trueshine.webp' },
  CASE_STUDIES.find(c => c.slug === 'jasmine-health-and-spa'),
  { title: 'Artisan Concrete', industry: 'Concreting', location: 'Stoneville, WA', url: 'https://artisanconcretewa.com.au', image: '/screenshots/gallery-20261102/artisan.webp' },
]

// Curated entries lead; CRM additions follow without replacing their captures.
export const CLIENT_SITES = [
  ...FEATURED_SITES,
  ...CASE_STUDIES.filter(c => !FEATURED_SITES.some(f => f.url === c.url)),
  { title: 'Coastal 2PAC', industry: 'Kitchens & joinery', location: 'Gold Coast, QLD', url: 'https://coastal2pac.com.au', image: '/screenshots/gallery-20261102/coastal.webp' },
  { title: 'S.T.S.B Gardening Services', industry: 'Gardening', location: 'Albury, NSW', url: 'https://stsbgardening.com.au', image: '/screenshots/stsbgardening.webp' },
  { title: 'Tyre Warriors', industry: 'Mobile Tyres', location: 'Perth, WA', url: 'https://tyre-warriors.vercel.app', image: '/screenshots/tyrewarriors.webp' },
  { title: 'Universe Painting', industry: 'Painting', location: 'Perth, WA', url: 'https://universe-painting.vercel.app', image: '/screenshots/universepainting.webp' },
]

// Service & website-industry pages live at the root (e.g. /website-design-perth,
// /websites-for-mechanics); industry growth hubs live at /industries/<slug>.
export const u = {
  service:  (slug) => `/${slug}`,
  industry: (slug) => `/${slug}`,
  work:     (slug) => `/work/${slug}`,
}
