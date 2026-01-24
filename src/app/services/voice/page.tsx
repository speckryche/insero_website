import type { Metadata } from 'next';
import { VoicePageClient } from './VoicePageClient';

export const metadata: Metadata = {
  title: 'Voice Connectivity - VoIP, Cloud PBX & Unified Communications',
  description:
    'Modern business phone systems that scale with your needs. VoIP, Cloud PBX, unified communications, call center solutions, and SIP trunking. Reduce costs by up to 60%.',
  keywords: [
    'VoIP',
    'Cloud PBX',
    'business phone systems',
    'unified communications',
    'call center solutions',
    'SIP trunking',
    'voice over IP',
    'UCaaS',
    'hosted PBX',
  ],
  openGraph: {
    title: 'Voice Connectivity Solutions | Insero',
    description:
      'Modern VoIP and unified communications solutions. Reduce phone costs by up to 60% with cloud-based phone systems.',
    url: 'https://insero.cloud/services/voice',
  },
  alternates: {
    canonical: 'https://insero.cloud/services/voice',
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
      name: 'Voice Connectivity',
      item: 'https://insero.cloud/services/voice',
    },
  ],
};

// JSON-LD Service Schema
const voiceServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Voice Connectivity Solutions',
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
  description:
    'Modern phone systems including VoIP, Cloud PBX, unified communications, call center solutions, and SIP trunking.',
  serviceType: 'Voice Connectivity',
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Voice Solutions',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'VoIP & Cloud PBX',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Unified Communications',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Call Center Solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SIP Trunking',
        },
      },
    ],
  },
};

export default function VoicePage() {
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
          __html: JSON.stringify(voiceServiceSchema),
        }}
      />
      <VoicePageClient />
    </>
  );
}
