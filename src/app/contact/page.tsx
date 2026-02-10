import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Schedule a Free Telecom Consultation',
  description:
    'Schedule a free consultation with a vendor-agnostic telecom broker. Get expert guidance on voice, internet, SD-WAN, and security at zero cost. No pressure, no obligation.',
  keywords: [
    'free telecom consultation',
    'telecom consultant',
    'telecom broker consultation',
    'cloud consulting',
    'connectivity advice',
    'schedule consultation',
    'telecom cost reduction',
  ],
  openGraph: {
    title: 'Schedule a Free Telecom Consultation | Insero',
    description:
      'Schedule a free consultation with a vendor-agnostic telecom broker. Expert guidance at zero cost to you.',
    url: 'https://insero.cloud/contact',
  },
  alternates: {
    canonical: 'https://insero.cloud/contact',
  },
};

// JSON-LD ContactPage Schema
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Insero',
  description: 'Schedule a free consultation with Insero for cloud and connectivity consulting.',
  url: 'https://insero.cloud/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'Insero',
    url: 'https://insero.cloud',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-844-252-3185',
      contactType: 'sales',
      email: 'sales@insero.cloud',
      availableLanguage: 'English',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jacksonville',
      addressRegion: 'OR',
      addressCountry: 'US',
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageSchema),
        }}
      />
      <ContactPageClient />
    </>
  );
}
