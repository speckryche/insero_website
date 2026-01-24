import type { Metadata } from 'next';
import { SecurityPageClient } from './SecurityPageClient';

export const metadata: Metadata = {
  title: 'Network Security - Firewall, Threat Protection & VPN Solutions',
  description:
    'Enterprise-grade security made accessible. Firewall solutions, threat protection, VPN services, and 24/7 security monitoring. Protect your business without complexity.',
  keywords: [
    'network security',
    'firewall solutions',
    'threat protection',
    'VPN services',
    'security monitoring',
    'cybersecurity',
    'business security',
    'managed security',
    'SIEM',
  ],
  openGraph: {
    title: 'Network Security Solutions | Insero',
    description:
      'Enterprise-grade security at SMB budgets. Firewall, threat protection, VPN, and 24/7 monitoring.',
    url: 'https://insero.cloud/services/security',
  },
  alternates: {
    canonical: 'https://insero.cloud/services/security',
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
      name: 'Network Security',
      item: 'https://insero.cloud/services/security',
    },
  ],
};

// JSON-LD Service Schema
const securityServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Network Security Solutions',
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
  description:
    'Enterprise-grade security solutions including firewalls, threat protection, VPN services, and 24/7 security monitoring.',
  serviceType: 'Network Security',
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Security Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Firewall Solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Threat Protection',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'VPN Services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Security Monitoring',
        },
      },
    ],
  },
};

export default function SecurityPage() {
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
          __html: JSON.stringify(securityServiceSchema),
        }}
      />
      <SecurityPageClient />
    </>
  );
}
