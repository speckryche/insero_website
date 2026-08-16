import type { Metadata } from 'next';
import { AuditPageClient } from './AuditPageClient';
import { carrierAccessPhrase } from '@/data/carrier-access';

export const metadata: Metadata = {
  title: 'Free Telecom Cost & Risk Assessment',
  description:
    `Free telecom cost and risk assessment. We compare ${carrierAccessPhrase} to find savings on your internet, phone, and network services. Takes 15 minutes.`,
  keywords: [
    'free telecom assessment',
    'telecom cost assessment',
    'telecom expense management',
    'telecom cost reduction',
    'business phone savings',
    'internet cost review',
    'carrier comparison',
    'telecom risk assessment',
  ],
  openGraph: {
    title: 'Free Telecom Cost & Risk Assessment | Insero',
    description:
      `Free telecom cost and risk assessment. We compare ${carrierAccessPhrase} to find savings on your internet, phone, and network services. Takes 15 minutes.`,
    url: 'https://insero.cloud/audit',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Insero - Cloud & Connectivity Consulting' }],
  },
  alternates: {
    canonical: 'https://insero.cloud/audit',
  },
};

const auditPageSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Telecom Cost & Risk Assessment',
    description:
      `Get a free telecom cost and risk assessment for your business. We compare ${carrierAccessPhrase} to find savings on internet, phone, and network services.`,
    url: 'https://insero.cloud/audit',
    provider: {
      '@type': 'Organization',
      name: 'Insero',
      url: 'https://insero.cloud',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Telecom Cost & Risk Assessment',
    description:
      `Free assessment of your business telecom services including line-by-line bill analysis, price benchmarking across ${carrierAccessPhrase}, and redundancy risk assessment.`,
    provider: {
      '@type': 'Organization',
      name: 'Insero',
      url: 'https://insero.cloud',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free telecom assessment with no obligation',
    },
  },
];

export default function AuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(auditPageSchema),
        }}
      />
      <AuditPageClient />
    </>
  );
}
