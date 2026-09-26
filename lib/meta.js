import { SITE } from './site'

// Page metadata from a content object ({ metaTitle, metaDescription, h1 }).
export function metadataFor({ metaTitle, metaDescription, h1 }, path) {
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${SITE.url}${path}`,
      type: 'website',
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: h1 }],
    },
    twitter: { card: 'summary_large_image', title: metaTitle, description: metaDescription },
  }
}
