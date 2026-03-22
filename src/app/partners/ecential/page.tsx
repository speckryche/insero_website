import type { Metadata } from 'next';
import { EcentialLanding } from './EcentialLanding';

const pageUrl = 'https://insero.cloud/partners/ecential';

export const metadata: Metadata = {
  title: 'Childcare Phone Systems | Ecential x Insero',
  description:
    'Modern cloud phone systems built for childcare centers. Stop missing enrollment calls. Auto-attendant, mobile app, after-hours routing — free assessment, no obligation.',
  keywords: [
    'childcare phone system',
    'daycare phone system',
    'childcare center VoIP',
    'childcare communication solutions',
    'UCaaS childcare',
    'childcare enrollment calls',
    'cloud phone system daycare',
  ],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: pageUrl,
    title: 'Stop Losing Enrollment Calls | Ecential x Insero',
    description:
      'A modern phone system built for childcare centers. Every parent inquiry gets answered, even when your hands are full. Free assessment.',
    siteName: 'Ecential x Insero',
    images: [
      {
        url: '/ecential_logo.jpg',
        width: 1339,
        height: 396,
        alt: 'Ecential - Childcare Voice Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Childcare Phone Systems | Ecential x Insero',
    description:
      'Modern cloud phone systems built for childcare centers. Stop missing enrollment calls. Free assessment.',
  },
  alternates: {
    canonical: pageUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Childcare Voice Solutions by Ecential & Insero',
  description:
    'Modern cloud-based phone systems designed for childcare centers. Auto-attendant, mobile app, after-hours routing, and more.',
  url: pageUrl,
  provider: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
  },
  areaServed: 'US',
  serviceType: 'Telecommunications Consulting',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free phone system assessment for childcare centers',
  },
};

export default function EcentialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EcentialLanding />
    </>
  );
}
