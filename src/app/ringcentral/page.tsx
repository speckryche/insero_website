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

// Service schema: Insero's OWN advisory and sourcing service.
//
// This deliberately does not declare `brand: RingCentral`. Pairing a
// RingCentral brand with Insero as `provider` asserts, in machine-readable
// form, that Insero provides a RingCentral-branded service — which reads as an
// authorized or endorsed relationship. The service described here is the one
// Insero actually performs: independent advisory and sourcing. RingCentral is
// named as subject matter in the description, not as the brand of the service,
// and the offer catalog lists Insero's services rather than RingCentral's
// products. No trademark symbols in schema values.
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Independent Business Communications Advisory & Sourcing',
  serviceType: 'Telecom Advisory & Sourcing',
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
    description:
      'Independent telecom advisor. Insero is not affiliated with, endorsed by, sponsored by, or authorized by RingCentral, Inc.',
  },
  description:
    'Independent advisory and sourcing for cloud business phone and contact center services, including RingCentral products such as RingEX and RingCX. Insero is an independent advisor and is not affiliated with or endorsed by RingCentral, Inc.',
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Advisory & Sourcing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business phone sourcing and advisory' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Voice AI evaluation and advisory' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contact center sourcing and advisory' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Quoting, contract, and implementation support' } },
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
