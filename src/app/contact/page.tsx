import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Insero — Free Telecom Advice, No Obligation',
  description:
    'Tell us about your setup and get free, vendor-agnostic advice on voice, internet, SD-WAN, and security. Email or phone, your choice.',
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
    title: 'Contact Insero — Free Telecom Advice, No Obligation | Insero',
    description:
      'Tell us about your setup and get free, vendor-agnostic advice at zero cost to you.',
    url: 'https://insero.cloud/contact',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Insero - Cloud & Connectivity Consulting' }],
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
  description: 'Get in touch with Insero for free cloud and connectivity advice.',
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
      addressLocality: 'Medford',
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
