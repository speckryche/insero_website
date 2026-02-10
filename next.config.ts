import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
