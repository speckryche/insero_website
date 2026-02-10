import type { Metadata } from 'next';
import { InternetPageClient } from './InternetPageClient';

export const metadata: Metadata = {
  title: 'Business Internet Provider Comparison | Fiber, DIA & Broadband Solutions',
  description:
    'Compare business internet providers across fiber, dedicated internet access, broadband, and 5G. Get the best pricing from 100+ carriers — free consultation.',
  keywords: [
    'business internet provider comparison',
    'dedicated internet access for business',
    'business fiber internet providers',
    'best business internet service',
    'DIA',
    'broadband',
    '5G business internet',
    'enterprise internet',
    'ISP comparison',
    'ethernet dedicated internet vs broadband',
  ],
  openGraph: {
    title: 'Business Internet Provider Comparison | Insero',
    description:
      'Compare business internet providers across fiber, dedicated internet, broadband, and 5G from 100+ carriers. Free consultation.',
    url: 'https://insero.cloud/services/internet',
  },
  alternates: {
    canonical: 'https://insero.cloud/services/internet',
  },
};

// Breadcrumb Schema for better SERP appearance
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://insero.cloud',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://insero.cloud/services',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Internet Connectivity',
      item: 'https://insero.cloud/services/internet',
    },
  ],
};

// JSON-LD Service Schema
const internetServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Internet Connectivity Solutions',
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
  description:
    'Business internet solutions including fiber, dedicated internet access, broadband, and 5G connectivity.',
  serviceType: 'Internet Connectivity',
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Internet Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Fiber Internet',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Dedicated Internet Access',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Broadband Solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wireless & 5G',
        },
      },
    ],
  },
};

export default function InternetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(internetServiceSchema),
        }}
      />
      <InternetPageClient />
    </>
  );
}
