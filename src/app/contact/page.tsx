import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us - Schedule Your Free Consultation',
  description:
    'Schedule a free consultation with Insero. Get expert cloud and connectivity advice at zero cost. No pressure, no obligation. Contact us today.',
  keywords: [
    'contact',
    'free consultation',
    'telecom consulting',
    'cloud consulting',
    'connectivity advice',
    'schedule consultation',
    'get quote',
  ],
  openGraph: {
    title: 'Contact Us | Insero',
    description:
      'Schedule your free consultation. Expert guidance at zero cost to you.',
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
      telephone: '+1-123-456-7890',
      contactType: 'sales',
      email: 'info@insero.cloud',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
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
