import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/icon-preview/', '/api/'],
    },
    sitemap: 'https://insero.cloud/sitemap.xml',
  };
}
