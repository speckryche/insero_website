import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  trailingSlash: false,
  // Gated lead-magnet PDFs live outside public/ so they cannot be fetched
  // directly, and the route reads them via a process.cwd() path that
  // @vercel/nft cannot trace. Without this they are absent from the
  // serverless bundle and every download 500s in production while working
  // fine locally. See src/app/api/lead-magnets/[slug]/route.ts.
  outputFileTracingIncludes: {
    '/api/lead-magnets/[slug]': ['./src/assets/collateral/**'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect www to non-www for canonical consistency
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.insero.cloud',
          },
        ],
        destination: 'https://insero.cloud/:path*',
        permanent: true,
      },
      {
        source: '/solutions',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/team',
        destination: '/',
        permanent: true,
      },
      {
        source: '/providers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/home-2',
        destination: '/',
        permanent: true,
      },
      {
        source: '/real-world-examples',
        destination: '/services',
        permanent: true,
      },
      // Old WordPress URLs confirmed 404ing in Google Search Console
      {
        source: '/what-we-do',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/category/blog',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/2023/09/01/this-is-the-second-blog-post',
        destination: '/resources',
        permanent: true,
      },
      // Broad catch-alls for common WordPress URL structures
      {
        source: '/category/:slug*',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/tag/:slug*',
        destination: '/resources',
        permanent: true,
      },
      {
        source: '/author/:slug*',
        destination: '/resources',
        permanent: true,
      },
      // Old dated permalink pattern (e.g. /2023/09/01/some-post)
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug*',
        destination: '/resources',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
