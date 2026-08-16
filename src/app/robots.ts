import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /icon-preview is deliberately absent. It carries a noindex, and a
      // Disallow here would stop crawlers fetching the page at all — which
      // means never reading that noindex, leaving the URL eligible to appear
      // as a bare link. The route also 404s in production now. Disallow only
      // ever weakened it.
      disallow: ['/api/'],
    },
    sitemap: 'https://insero.cloud/sitemap.xml',
  };
}
