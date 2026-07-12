import type { Metadata } from 'next';
import { RingCentralPageClient } from './RingCentralPageClient';
import { ringCentralFaq } from './faq';

export const metadata: Metadata = {
  title: 'RingCentral for Business: AI Phone, Contact Center & Pricing',
  description:
    "RingCentral's AI-powered business phone, contact center, and agentic voice AI — explained honestly. Source it through Insero, an independent advisor, at zero cost. Get a free quote.",
  keywords: [
    'RingCentral',
    'RingCentral for business',
    'RingCentral pricing',
    'RingCentral AI',
    'RingCentral AI Receptionist',
    'RingSense',
    'RingCX',
    'RingEX',
    'RingCentral contact center',
    'RingCentral vs Zoom',
    'business phone AI',
  ],
  openGraph: {
    title: 'RingCentral for Business: AI Phone, Contact Center & Pricing | Insero',
    description:
      "RingCentral's AI-powered business phone, contact center, and agentic voice AI — explained honestly. Source it through Insero at zero cost.",
    url: 'https://insero.cloud/ringcentral',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'RingCentral for Business — sourced through Insero' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RingCentral for Business: AI Phone, Contact Center & Pricing | Insero',
    description:
      "RingCentral's AI-powered business phone and contact center — explained honestly. Source it through Insero at zero cost.",
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://insero.cloud/ringcentral',
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
      name: 'RingCentral',
      item: 'https://insero.cloud/ringcentral',
    },
  ],
};

// Service schema: RingCentral platform, offered through Insero
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'RingCentral Business Communications',
  serviceType: 'Cloud Business Phone & Contact Center',
  brand: {
    '@type': 'Brand',
    name: 'RingCentral',
  },
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
    description:
      'Independent telecom advisor that sources RingCentral and other providers at zero cost to the customer.',
  },
  description:
    "RingCentral's AI-powered business phone (RingEX), video, messaging, and contact center (RingCX), sourced and supported through Insero — an independent advisor — at no added cost.",
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'RingCentral Solutions',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RingEX Business Phone' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Agentic Voice AI (AI Receptionist, AVA, ACE)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'RingCX AI Contact Center' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Meetings & Team Messaging' } },
    ],
  },
};

// FAQPage schema, generated from the same data the page renders
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: ringCentralFaq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function RingCentralPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RingCentralPageClient />
    </>
  );
}
