# Bluepeek search visibility baseline — 1 October 2026

## Observations

Google searches from Molendinar, Australia, with personalised results disabled showed Bluepeek first among unpaid map listings for “web design gold coast”, but absent from the first page of standard web results for that phrase, “seo gold coast”, and “marketing agency gold coast”. This is a location-specific spot check, not a city-wide rank or a Search Console average. The signed-in Google account manages the Business Profile. The profile displayed 5.0 stars from 49 reviews.

The website, SEO and marketing service pages return HTTP 200, are indexable, have self-referencing canonicals, and are in the sitemap. Google Search Console showed no property for the personal Zach account, zach@bluepeek.com.au, or jac@bluepeek.com.au during the check. Other accounts may own an existing property.

## Measurement

- Verify https://www.bluepeek.com.au/ in Search Console and submit https://www.bluepeek.com.au/sitemap.xml. A domain property can be added separately if access to DNS is available.
- Inspect the homepage, /website-design-gold-coast, /seo-gold-coast and /marketing-agency-gold-coast. Request indexing after successful live inspection where appropriate.
- Compare Search Console clicks, impressions, CTR and average position by page and query over 28-day periods. Separate brand searches from service searches. Recent changes need time to be crawled and assessed.
- Compare form leads and phone_click events by landing_page and page_path. A phone_click measures a tap on a phone link, not a connected call or qualified enquiry.
- Review lead quality and sales separately; an event is not proof of a booked customer.

## Attribution fields

Every form already sends attribution to Bluepeek Forms. The update preserves the entry page across internal navigation for organic and direct visitors as well as tagged campaigns.

- landing_page: entry path for the current visit; a visit expires after 30 minutes of inactivity.
- conversion_page: path where the form is submitted.
- session_source and referrer: current visit source and referring hostname.
- campaign_landing_page, UTMs and click identifiers: latest tagged campaign touch, retained up to 90 days. These may describe an earlier paid visit, so do not treat them as the current session source.

Vercel Analytics, dataLayer and configured Google events include landing_page, page_path, session_source and referrer. Analytics does not receive the stored click identifiers through these added properties. Google Ads IDs and conversion label were already configured in production; this change preserves them. GA4/GTM were not listed among production environment variables at inspection.

## Verification

Node regression tests cover organic entry persistence, campaign retention, expiry, restricted browser storage, and campaign replacement. Production build and desktop/mobile UI checks pass. Blank form validation was tested without submitting a lead or notifying the team. Case study cards use existing documented deliverables; no performance or revenue claims were added.
