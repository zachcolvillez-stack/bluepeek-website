/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Flattened SEO URLs — old nested paths 301 to root-level slugs
      { source: '/services/:slug', destination: '/:slug', permanent: true },
      { source: '/industries/:slug', destination: '/:slug', permanent: true },

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
