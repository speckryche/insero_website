import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

const title = 'About Insero | Built by a Telecom Industry Veteran';
const description =
  'Insero is run by Speck Hansen, who spent 25+ years in telecom and previously owned a CLEC. Independent, vendor-neutral, paid by providers — not customers.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'about insero',
    'speck hansen',
    'telecom broker',
    'independent telecom advisor',
    'vendor-neutral telecom',
    'pacific northwest telecom agent',
    'hunter communications agent',
    'former CLEC owner',
  ],
  openGraph: {
    title,
    description,
    url: 'https://insero.cloud/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'About Insero' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://insero.cloud/about',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Speck Hansen',
  jobTitle: 'Founder',
  worksFor: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
  description:
    '25+ year telecom industry veteran. Previously built and sold InfoStructure, a Pacific Northwest CLEC, to Hunter Communications. Founder of Insero.',
  knowsAbout: [
    'Telecom Brokerage',
    'CLEC Operations',
    'Voice Connectivity',
    'Business Internet',
    'SD-WAN',
    'Carrier Negotiation',
  ],
  url: 'https://insero.cloud/about',
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutPageClient />
    </>
  );
}
