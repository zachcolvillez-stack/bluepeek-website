// The Bluepeek growth system - one model that every service page, the homepage,
// the navigation and the internal-link blocks read from, so a visitor always
// sees the same five stages and each service sits in exactly one of them.

// Every linkable commercial page. `path` is the canonical URL.
export const PAGES = {
  // Get found
  'google-ads-gold-coast':             { path: '/google-ads-gold-coast', label: 'Google Ads Gold Coast', blurb: 'Search campaigns for Gold Coast businesses, managed by the people who build the landing pages.' },
  'google-ads-management':             { path: '/google-ads-management', label: 'Google Ads Management', blurb: 'Google Search campaigns for Australian local businesses, judged by enquiries and booked jobs.' },
  'local-seo':                         { path: '/local-seo', label: 'Local SEO', blurb: 'Site structure, local content and entity signals that help nearby customers find you.' },
  'geo-optimisation':                  { path: '/geo-optimisation', label: 'GEO Optimisation', blurb: 'Clear facts and evidence that AI answer engines can understand and cite.' },
  'google-business-profile-management':{ path: '/google-business-profile-management', label: 'Google Business Profile Management', blurb: 'Categories, services, photos, posts and review flow on the profile that drives Maps calls.' },
  // Get attention
  'meta-ads-gold-coast':               { path: '/meta-ads-gold-coast', label: 'Meta Ads Gold Coast', blurb: 'Facebook and Instagram campaigns for lead generation, retargeting and creative testing.' },
  'social-media-marketing-gold-coast': { path: '/social-media-marketing-gold-coast', label: 'Social Media Marketing Gold Coast', blurb: 'Organic Instagram and Facebook content, planning and management.' },
  // Convert
  'website-design-gold-coast':         { path: '/website-design-gold-coast', label: 'Website Design Gold Coast', blurb: 'Custom, fast websites and landing pages built to turn visits into calls and forms.' },
  'website-design':                    { path: '/website-design', label: 'Website Design', blurb: 'Small business websites for Australian service businesses.' },
  'lead-capture-websites':             { path: '/lead-capture-websites', label: 'Lead Capture Websites', blurb: 'Pages built around one job: turning a visitor into an enquiry.' },
  'small-business-websites-gold-coast':{ path: '/small-business-websites-gold-coast', label: 'Small Business Websites Gold Coast', blurb: 'Professional starter websites for Gold Coast trades and local services.' },
  // Follow up
  'ai-automation-gold-coast':          { path: '/ai-automation-gold-coast', label: 'AI Automation Gold Coast', blurb: 'Instant replies, lead follow-up and booking automation for Gold Coast businesses.' },
  'ai-automation-australia':           { path: '/ai-automation-australia', label: 'AI Automation Australia', blurb: 'Practical AI and automation systems for Australian small businesses.' },
  'lead-follow-up-automation':         { path: '/lead-follow-up-automation', label: 'Lead Follow-up Automation', blurb: 'Automatic replies and reminders so new enquiries do not go cold.' },
  'missed-call-recovery':              { path: '/missed-call-recovery', label: 'Missed Call Recovery', blurb: 'An instant text back when you cannot get to the phone.' },
  'ai-chatbots':                       { path: '/ai-chatbots', label: 'AI Chatbots', blurb: 'Website chat trained on your services that captures the enquiry.' },
  'ai-phone-agents':                   { path: '/ai-phone-agents', label: 'AI Phone Agents', blurb: 'Voice agents that answer, qualify and book calls.' },
  // Build trust
  'google-reviews':                    { path: '/google-reviews', label: 'Google Review System', blurb: 'A review-growth system: requests, links, NFC and QR touchpoints and tracking.' },
  'google-review-cards':               { path: '/google-review-cards', label: 'NFC Google Review Cards', blurb: 'Tap-to-review cards and plaques that open your Google review form.' },
}

export const STAGES = [
  {
    id: 'found', step: '01', name: 'Get found',
    summary: 'Show up when local customers search for what you do.',
    pages: ['google-ads-gold-coast', 'local-seo', 'google-business-profile-management'],
  },
  {
    id: 'attention', step: '02', name: 'Get attention',
    summary: 'Reach people on Facebook and Instagram before and after they search.',
    pages: ['meta-ads-gold-coast', 'social-media-marketing-gold-coast'],
  },
  {
    id: 'convert', step: '03', name: 'Convert',
    summary: 'Turn the click into a call, form or booking.',
    pages: ['website-design-gold-coast', 'lead-capture-websites'],
  },
  {
    id: 'follow-up', step: '04', name: 'Follow up',
    summary: 'Reply fast and keep every enquiry moving towards a booked job.',
    pages: ['ai-automation-gold-coast', 'lead-follow-up-automation'],
  },
  {
    id: 'trust', step: '05', name: 'Build trust',
    summary: 'Turn finished jobs into Google reviews that win the next customer.',
    pages: ['google-reviews', 'google-review-cards'],
  },
]

// Industry growth hubs (/industries/<slug>)
export const INDUSTRY_HUBS = [
  { slug: 'mechanics',     label: 'Mechanics' },
  { slug: 'car-detailers', label: 'Car Detailers' },
  { slug: 'tradies',       label: 'Tradies' },
  { slug: 'tilers',        label: 'Tilers' },
  { slug: 'landscapers',   label: 'Landscapers' },
]

export const industryPath = (slug) => `/industries/${slug}`

// Resolve a slug (money page, existing service page or industry hub) to a link.
export function linkFor(slug) {
  if (PAGES[slug]) return { href: PAGES[slug].path, label: PAGES[slug].label, blurb: PAGES[slug].blurb }
  const hub = INDUSTRY_HUBS.find(h => h.slug === slug)
  if (hub) return { href: industryPath(hub.slug), label: `Marketing for ${hub.label}` }
  return null
}

export function stageOf(slug) {
  return STAGES.find(s => s.pages.includes(slug)) || null
}
