import type { Metadata } from 'next';
import { ZoomPageClient } from './ZoomPageClient';
import { zoomFaq } from './faq';

export const metadata: Metadata = {
  title: 'Zoom Phone for Business: AI Phone, Contact Center & Pricing',
  description:
    "Zoom Phone and Zoom Contact Center pricing in one place, with AI Companion included. Sourced through Insero, an independent advisor, at zero cost.",
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
    title: 'Zoom Phone for Business: AI Phone, Contact Center & Pricing | Insero',
    description:
      'Zoom Phone and Zoom Contact Center pricing in one place, with AI Companion included at no extra cost. Sourced through Insero at zero cost.',
    url: 'https://insero.cloud/zoom',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Zoom Phone for Business — sourced through Insero' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoom Phone for Business: AI Phone, Contact Center & Pricing | Insero',
    description:
      'Zoom Phone with AI Companion included — explained honestly, with published pricing. Source it through Insero at zero cost.',
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

// WebPage schema. `about` is the correct way to say "this page is about Zoom" —
// a descriptive statement of subject matter. It carries none of the implication
// that `brand` did on the Service block, which asserted Insero provides a
// Zoom-branded service. sameAs pins the entity to Zoom's own domain so search
// engines resolve it unambiguously.
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://insero.cloud/zoom',
  url: 'https://insero.cloud/zoom',
  name: 'Zoom Phone for Business: AI Phone, Contact Center & Pricing',
  description:
    "Zoom Phone and Zoom Contact Center — explained honestly, with published list pricing consolidated in one place.",
  about: {
    '@type': 'Brand',
    name: 'Zoom',
    sameAs: 'https://www.zoom.com',
  },
  isPartOf: {
    '@type': 'WebSite',
    url: 'https://insero.cloud',
    name: 'Insero',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
};

// Service schema: Insero's OWN advisory and sourcing service.
//
// This deliberately does not declare `brand: Zoom`. Pairing a Zoom brand with
// Insero as `provider` asserts, in machine-readable form, that Insero provides
// a Zoom-branded service — which reads as an authorized or endorsed
// relationship. The service described here is the one Insero actually performs:
// independent advisory and sourcing. Zoom is named as subject matter in the
// description, not as the brand of the service, and the offer catalog lists
// Insero's services rather than Zoom products.
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
      'Independent telecom advisor. Insero is not affiliated with, endorsed by, sponsored by, or authorized by Zoom Video Communications, Inc.',
  },
  description:
    'Independent advisory and sourcing for cloud business phone and contact center services, including Zoom Phone and Zoom Contact Center. Insero is an independent advisor and is not affiliated with or endorsed by Zoom Video Communications, Inc.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
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
