import type { Metadata } from 'next';
import { AuditPageClient } from './AuditPageClient';
import { carrierAccessPhrase } from '@/data/carrier-access';

export const metadata: Metadata = {
  title: 'Telecom Cost & Risk Assessment, No Cost to You',
  description:
    `No-cost telecom cost and risk assessment. We compare ${carrierAccessPhrase} to find savings on your internet and phone services. Takes 15 minutes.`,
  keywords: [
    'no-cost telecom assessment',
    'telecom cost assessment',
    'telecom expense management',
    'telecom cost reduction',
    'business phone savings',
    'internet cost review',
    'carrier comparison',
    'telecom risk assessment',
  ],
  openGraph: {
    title: 'Telecom Cost & Risk Assessment, No Cost to You | Insero',
    description:
      `No-cost telecom cost and risk assessment. We compare ${carrierAccessPhrase} to find savings on your internet and phone services. Takes 15 minutes.`,
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
    name: 'Telecom Cost & Risk Assessment',
    description:
      `Get a no-cost telecom cost and risk assessment for your business. We compare ${carrierAccessPhrase} to find savings on internet and phone services.`,
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
      `No-cost assessment of your business telecom services including line-by-line bill analysis, price benchmarking across ${carrierAccessPhrase}, and redundancy risk assessment.`,
    provider: {
      '@type': 'Organization',
      name: 'Insero',
      url: 'https://insero.cloud',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'No-cost telecom assessment with no obligation',
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
