import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Telecom Brokerage Services | Voice, Internet, SD-WAN & Security',
  description:
    'Vendor-agnostic telecom brokerage services: compare Voice/VoIP, business internet, SD-WAN, and cybersecurity providers. Free carrier comparison from 100+ providers.',
  keywords: [
    'telecom brokerage services',
    'vendor agnostic telecom consulting',
    'voice solutions',
    'VoIP services',
    'business internet',
    'SD-WAN',
    'managed cybersecurity',
    'telecom services',
    'carrier comparison',
  ],
  openGraph: {
    title: 'Telecom Brokerage Services | Insero',
    description:
      'Vendor-agnostic telecom brokerage: compare Voice, Internet, SD-WAN, and Security providers. Free carrier comparison from 100+ providers.',
    url: 'https://insero.cloud/services',
  },
  alternates: {
    canonical: 'https://insero.cloud/services',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
