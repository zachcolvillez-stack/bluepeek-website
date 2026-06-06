/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Flattened SEO URLs — old nested paths 301 to root-level slugs
      { source: '/services/:slug', destination: '/:slug', permanent: true },
      { source: '/industries/:slug', destination: '/:slug', permanent: true },
    ]
  },
}
export default nextConfig
