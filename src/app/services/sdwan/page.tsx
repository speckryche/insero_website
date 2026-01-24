import type { Metadata } from 'next';
import { SDWANPageClient } from './SDWANPageClient';

export const metadata: Metadata = {
  title: 'SD-WAN & Network Redundancy - Intelligent Network Solutions',
  description:
    'Never lose connection with SD-WAN and network redundancy solutions. Automatic failover, traffic prioritization, and multi-site connectivity. Reduce WAN costs by 30-50%.',
  keywords: [
    'SD-WAN',
    'software-defined WAN',
    'network redundancy',
    'failover solutions',
    'load balancing',
    'WAN optimization',
    'multi-site connectivity',
    'network resilience',
    'business continuity',
  ],
  openGraph: {
    title: 'SD-WAN & Redundancy Solutions | Insero',
    description:
      'Intelligent network management with automatic failover. Reduce WAN costs by 30-50% while improving reliability.',
    url: 'https://insero.cloud/services/sdwan',
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
