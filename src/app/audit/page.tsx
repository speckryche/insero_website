import type { Metadata } from 'next';
import { AuditPageClient } from './AuditPageClient';

export const metadata: Metadata = {
  title: 'Free Telecom Cost Assessment | Find Savings on Internet & Phone',
  description:
    'Free telecom cost and risk assessment for your business. We compare 100+ carriers to find savings on internet, phone, and network services. No cost, no obligation.',
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
    title: 'Free Telecom Cost Assessment | Insero',
    description:
      'Free telecom cost and risk assessment. We compare 100+ carriers to find savings on internet, phone, and network services.',
    url: 'https://insero.cloud/audit',
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
      'Get a free telecom cost & risk assessment for your business. We compare 25+ carriers to find savings on internet, phone, and network services.',
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
      'Free assessment of your business telecom services including line-by-line bill analysis, price benchmarking against 25+ carriers, and redundancy risk assessment.',
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
