import type { Metadata } from 'next';
import { ZoomPageClient } from './ZoomPageClient';
import { zoomFaq } from './faq';

export const metadata: Metadata = {
  title: 'Zoom for Business: AI Phone, Contact Center & Pricing | Insero',
  description:
    "Zoom's AI-first business phone and contact center — with AI Companion included at no extra cost. Sourced through Insero, an independent advisor, at zero cost to you. Get a free quote.",
  keywords: [
    'Zoom',
    'Zoom for business',
    'Zoom Phone',
    'Zoom Phone pricing',
    'Zoom AI Companion',
    'Zoom AI',
    'Zoom Contact Center',
    'Zoom Workplace',
    'Zoom AI Receptionist',
    'Zoom vs RingCentral',
    'business phone AI',
  ],
  openGraph: {
    title: 'Zoom for Business: AI Phone, Contact Center & Pricing | Insero',
    description:
      "Zoom's AI-first business phone and contact center — with AI Companion included at no extra cost. Sourced through Insero at zero cost.",
    url: 'https://insero.cloud/zoom',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Zoom for Business — sourced through Insero' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoom for Business: AI Phone, Contact Center & Pricing | Insero',
    description:
      "Zoom's AI-first business phone with AI Companion included — explained honestly. Source it through Insero at zero cost.",
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: 'https://insero.cloud/zoom',
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
      name: 'Zoom',
      item: 'https://insero.cloud/zoom',
    },
  ],
};

// Service schema: Zoom platform, offered through Insero
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Zoom Business Communications',
  serviceType: 'Cloud Business Phone & Contact Center',
  brand: {
    '@type': 'Brand',
    name: 'Zoom',
  },
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
    description:
      'Independent telecom advisor that sources Zoom and other providers at zero cost to the customer.',
  },
  description:
    "Zoom's AI-first business phone (Zoom Phone), meetings, team chat, and contact center, with AI Companion included at no extra cost — sourced and supported through Insero, an independent advisor, at no added cost.",
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Zoom Solutions',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Zoom Phone Business Calling' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Companion (included with eligible plans)' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Zoom Contact Center' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Meetings, Video & Team Chat' } },
    ],
  },
};

// FAQPage schema, generated from the same data the page renders
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: zoomFaq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function ZoomPage() {
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
      <ZoomPageClient />
    </>
  );
}
