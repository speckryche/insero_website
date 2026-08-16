import type { Metadata } from 'next';
import { SDWANPageClient } from './SDWANPageClient';

export const metadata: Metadata = {
  // `absolute` bypasses the root layout's '%s | Insero' template. A plain
  // string here would render with the suffix appended; this title is meant
  // to stand alone. openGraph.title below is untemplated either way and
  // keeps its own suffix.
  title: { absolute: 'SD-WAN for Business: Redundancy Without the Guesswork' },
  description:
    'Compare SD-WAN providers for failover, traffic prioritization, and multi-site connectivity. Cut WAN costs 30-50%.',
  keywords: [
    'SD-WAN solutions for business',
    'SD-WAN consultant',
    'SD-WAN cost comparison',
    'managed SD-WAN provider',
    'software-defined WAN',
    'network redundancy',
    'failover solutions',
    'WAN optimization',
    'multi-site connectivity',
    'SD-WAN vs MPLS',
  ],
  openGraph: {
    title: 'SD-WAN Solutions for Business | Insero',
    description:
      'Compare SD-WAN providers for automatic failover, traffic prioritization, and multi-site connectivity. Cut WAN costs 30-50%.',
    url: 'https://insero.cloud/services/sdwan',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Insero - Cloud & Connectivity Consulting' }],
  },
  alternates: {
    canonical: 'https://insero.cloud/services/sdwan',
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
      name: 'SD-WAN & Redundancy',
      item: 'https://insero.cloud/services/sdwan',
    },
  ],
};

// JSON-LD Service Schema
const sdwanServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SD-WAN & Network Redundancy Solutions',
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
  description:
    'Software-defined WAN and network redundancy solutions with automatic failover, traffic prioritization, and multi-site connectivity.',
  serviceType: 'SD-WAN & Redundancy',
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SD-WAN Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SD-WAN Implementation',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automatic Failover',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Traffic Prioritization',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Multi-Site Connectivity',
        },
      },
    ],
  },
};

export default function SDWANPage() {
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
          __html: JSON.stringify(sdwanServiceSchema),
        }}
      />
      <SDWANPageClient />
    </>
  );
}
