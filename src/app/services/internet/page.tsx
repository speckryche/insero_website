import type { Metadata } from 'next';
import { InternetPageClient } from './InternetPageClient';

export const metadata: Metadata = {
  title: 'Internet Connectivity - Fiber, Dedicated & Broadband Solutions',
  description:
    'Find the best business internet solution for your needs. Compare fiber, dedicated internet, broadband, and 5G options from 100+ carriers. Free consultation and carrier comparison.',
  keywords: [
    'business internet',
    'fiber internet',
    'dedicated internet access',
    'DIA',
    'broadband',
    '5G business internet',
    'enterprise internet',
    'internet service provider',
    'ISP comparison',
  ],
  openGraph: {
    title: 'Internet Connectivity Solutions | Insero',
    description:
      'Compare internet options from 100+ carriers. Find the best speed, reliability, and price for your business.',
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
