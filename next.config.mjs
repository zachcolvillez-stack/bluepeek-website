/** @type {import('next').NextConfig} */
const nextConfig = {
  // Local dev only: hide the Next.js badge so design screenshots are clean.
  devIndicators: false,
  poweredByHeader: false,
  async headers() {
    return [
      // Baseline security headers. Deliberately no script-src CSP: GA, GTM,
      // Meta Pixel and Google Ads inject scripts a strict policy would block.
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        ],
      },
      // Homepage film: every URL carries ?v=<hash> from scripts/build-film.mjs.
      { source: '/film/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ]
  },
  async rewrites() {
    return [
      // Business-specific SMS URLs. The dashboard owns the public preview
      // metadata and sends visitors to that business's existing demo homepage.
      { source: '/demo/:code', destination: 'https://bluepeekdashboard.com.au/d/:code' },
    ]
  },
  async redirects() {
    return [
      // Flattened SEO URLs — old nested paths 301 to root-level slugs
      { source: '/services/:slug', destination: '/:slug', permanent: true },
      // Only old nested website-industry paths; /industries/<trade> are live growth hubs.
      { source: '/industries/:slug(websites-for-.*)', destination: '/:slug', permanent: true },

      // Review systems page consolidated into the Google review system hub
      { source: '/review-systems', destination: '/google-reviews', permanent: true },

      // NFC review chips. A chip is physical and cannot be reprogrammed once it
      // is on a client's counter, so a card written with this domain instead of
      // go.bluepeek.online would 404 here forever. Clients have already
      // reported taps landing on a 404 from cards carrying the wrong host, so
      // these two rules exist purely as a net for any card written with the
      // brand domain someone remembered rather than the one on the label.
      {
        source: '/n/:cardId',
        destination: 'https://go.bluepeek.online/n/:cardId',
        permanent: true,
      },
      {
        source: '/r/:slug',
        destination: 'https://go.bluepeek.online/r/:slug',
        permanent: true,
      },
    ]
  },
}
export default nextConfig
