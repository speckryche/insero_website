import type { Metadata } from 'next';
import { VoicePageClient } from './VoicePageClient';

export const metadata: Metadata = {
  title: 'Business Phone Systems | Hosted PBX, VoIP & UCaaS Provider Comparison',
  description:
    'Compare hosted PBX, VoIP, and UCaaS providers to find the best business phone system. Expert guidance, zero cost. Reduce phone costs by up to 60%.',
  keywords: [
    'business phone system consultant',
    'hosted PBX for business',
    'UCaaS providers comparison',
    'VoIP',
    'Cloud PBX',
    'business phone systems',
    'unified communications',
    'cloud phone system for business',
    'SIP trunking',
    'UCaaS vs hosted PBX',
  ],
  openGraph: {
    title: 'Business Phone Systems | VoIP & UCaaS Comparison | Insero',
    description:
      'Compare hosted PBX, VoIP, and UCaaS providers to find the best business phone system. Expert guidance at zero cost.',
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
