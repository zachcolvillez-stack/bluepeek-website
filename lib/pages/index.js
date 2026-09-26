// Registry of the core money pages. Each page is a plain data file in this
// folder (shape: see any page file); MoneyPageTemplate renders them.
// Root-level service pages resolve through app/[slug], industry hubs through
// app/industries/[slug].
import googleAdsGoldCoast from './google-ads-gold-coast'
import googleAdsManagement from './google-ads-management'
import metaAdsGoldCoast from './meta-ads-gold-coast'
import socialMediaMarketingGoldCoast from './social-media-marketing-gold-coast'
import googleReviews from './google-reviews'
import googleReviewCards from './google-review-cards'
import googleBusinessProfileManagement from './google-business-profile-management'
import websiteDesignGoldCoast from './website-design-gold-coast'
import aiAutomationGoldCoast from './ai-automation-gold-coast'
import aiAutomationAustralia from './ai-automation-australia'
import mechanics from './industries/mechanics'
import carDetailers from './industries/car-detailers'
import tradies from './industries/tradies'
import tilers from './industries/tilers'
import landscapers from './industries/landscapers'

const bySlug = list => Object.fromEntries(list.map(p => [p.slug, p]))

export const SERVICE_PAGES = bySlug([
  googleAdsGoldCoast,
  googleAdsManagement,
  metaAdsGoldCoast,
  socialMediaMarketingGoldCoast,
  googleReviews,
  googleReviewCards,
  googleBusinessProfileManagement,
  websiteDesignGoldCoast,
  aiAutomationGoldCoast,
  aiAutomationAustralia,
])

export const INDUSTRY_PAGES = bySlug([mechanics, carDetailers, tradies, tilers, landscapers])
