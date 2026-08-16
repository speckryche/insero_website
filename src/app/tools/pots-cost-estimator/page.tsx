import type { Metadata } from 'next';
import { PotsCostEstimator } from '@/components/tools/PotsCostEstimator';
import { PlaybookPromo } from '@/components/lead-magnets/PlaybookPromo';
import { RelatedArticles } from '@/components/tools/RelatedArticles';

export const metadata: Metadata = {
  title: 'POTS Replacement Cost Estimator',
  description:
    "Estimate what it costs to replace your POTS lines — and how much you're overpaying now. Free tool. Get a personalized estimate in under two minutes.",
  alternates: { canonical: 'https://insero.cloud/tools/pots-cost-estimator' },
  openGraph: {
    title: 'POTS Replacement Cost Estimator | Insero',
    description:
      "Estimate what it costs to replace your POTS lines — and how much you're overpaying now. Free tool.",
    url: 'https://insero.cloud/tools/pots-cost-estimator',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Insero POTS Cost Estimator' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'POTS Replacement Cost Estimator',
  url: 'https://insero.cloud/tools/pots-cost-estimator',
  description:
    'Estimate the cost of replacing your POTS (Plain Old Telephone Service) lines with modern alternatives like wireless POTS replacement, VoIP, or UCaaS.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
};

export default function PotsCostEstimatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 lg:pt-40 pb-8 bg-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4 leading-tight">
            POTS Replacement <span className="text-[#008838]">Cost Estimator</span>
          </h1>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
            Find out what you&apos;re really paying for POTS lines, what replacement would cost, and how much you could save by migrating.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container-custom">
          <PotsCostEstimator />
          <PlaybookPromo />
          <RelatedArticles
            articles={[
              {
                href: '/resources/pots-line-replacement-options',
                category: 'POTS Replacement',
                title: 'POTS Lines Are Going Away. Here Are Your Replacement Options.',
                description:
                  'The four real replacement paths, the fire-alarm compliance gotchas, and how to plan the migration.',
              },
              {
                href: '/resources/ucaas-explained',
                category: 'Voice',
                title: 'UCaaS Explained (and Why It’s the Same Thing as Hosted PBX)',
                description:
                  'If you’re replacing desk-phone POTS lines, a cloud phone system is often the cheaper answer.',
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
