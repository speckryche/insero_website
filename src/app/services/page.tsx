import type { Metadata } from 'next';
import { ServicesPageClient } from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services - Voice, Internet, SD-WAN & Security Solutions',
  description:
    'Explore Insero\'s cloud and connectivity services: Voice/VoIP, Internet connectivity, SD-WAN & redundancy, and network security. Free consultation and carrier comparison.',
  keywords: [
    'voice solutions',
    'VoIP services',
    'business internet',
    'SD-WAN',
    'network security',
    'telecom services',
    'cloud connectivity',
    'unified communications',
  ],
  openGraph: {
    title: 'Our Services | Insero',
    description:
      'Voice, Internet, SD-WAN, and Security solutions. We compare top carriers to find the perfect fit for your business.',
    url: 'https://insero.cloud/services',
  },
  alternates: {
    canonical: 'https://insero.cloud/services',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
