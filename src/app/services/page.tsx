import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Telecom Brokerage Services | Voice, Internet, SD-WAN & Security',
  description:
    'Vendor-agnostic telecom brokerage: compare Voice/VoIP, internet, SD-WAN, and cybersecurity from 100+ providers. Free consultation.',
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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Insero - Cloud & Connectivity Consulting' }],
  },
  alternates: {
    canonical: 'https://insero.cloud/services',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
