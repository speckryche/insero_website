import type { Metadata } from 'next';
import { BandwidthCalculator } from '@/components/tools/BandwidthCalculator';
import { RelatedArticles } from '@/components/tools/RelatedArticles';

export const metadata: Metadata = {
  title: 'Business Internet Bandwidth Calculator | Insero',
  description:
    'Calculate how much business internet bandwidth your team actually needs. Free tool from Insero — get a personalized estimate in under a minute.',
  alternates: { canonical: 'https://insero.cloud/tools/bandwidth-calculator' },
  openGraph: {
    title: 'Business Internet Bandwidth Calculator | Insero',
    description:
      'Calculate how much business internet bandwidth your team actually needs. Free tool — personalized estimate in under a minute.',
    url: 'https://insero.cloud/tools/bandwidth-calculator',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Insero Bandwidth Calculator' }],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Business Internet Bandwidth Calculator',
  url: 'https://insero.cloud/tools/bandwidth-calculator',
  description:
    'Calculate how much business internet bandwidth your team actually needs based on headcount, usage patterns, and reliability requirements.',
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

export default function BandwidthCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 lg:pt-40 pb-8 bg-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4 leading-tight">
            Business Internet <span className="text-[#008838]">Bandwidth Calculator</span>
          </h1>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
            How much internet does your business actually need? Answer a few questions and get a defensible recommendation in under a minute.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="container-custom">
          <BandwidthCalculator />
          <RelatedArticles
            articles={[
              {
                href: '/resources/fiber-vs-cable-business-internet',
                category: 'Internet',
                title: 'Fiber vs Cable for Business: An Honest Comparison',
                description:
                  'Once you know your bandwidth target, here’s how to choose the right connection type for it.',
              },
              {
                href: '/resources/business-internet-buyers-guide',
                category: 'Internet',
                title: 'The Business Internet Buyer’s Guide: What Actually Matters',
                description:
                  'Beyond speed — SLA, redundancy, install timeline, and the contract terms to watch for.',
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
