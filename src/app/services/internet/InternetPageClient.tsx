'use client';

import { ServicePage } from '@/components/sections/ServicePage';
import {
  Globe,
  Lightning,
  Buildings,
  WifiHigh,
  Broadcast
} from '@phosphor-icons/react';

const features = [
  {
    icon: Lightning,
    title: 'Fiber Internet',
    description:
      'Symmetric upload and download speeds for businesses that need reliable, high-performance connectivity.',
  },
  {
    icon: Buildings,
    title: 'Dedicated Internet Access',
    description:
      'Guaranteed bandwidth with SLA-backed uptime for mission-critical operations.',
  },
  {
    icon: WifiHigh,
    title: 'Broadband Solutions',
    description:
      'Cost-effective cable and DSL options for smaller offices or backup connectivity.',
  },
  {
    icon: Broadcast,
    title: 'Wireless & 5G',
    description:
      'Fixed wireless and 5G solutions for locations where wired connections aren\'t available.',
  },
];

const benefits = [
  'Compare options from all carriers available to your location',
  'Find the best price for your speed needs',
  'Professional installation coordination',
  'Single point of contact for support',
  'No carrier bias - we recommend what\'s best',
  'Ongoing account management',
];

export function InternetPageClient() {
  return (
    <ServicePage
      title="Internet Connectivity"
      description="Speed and reliability optimized for your specific needs. We compare options from multiple carriers to find you the perfect connection at the best price."
      icon={Globe}
      color="var(--color-internet)"
      gradient="from-[var(--color-secondary)] via-emerald-900 to-[var(--color-secondary-dark)]"
      features={features}
      benefits={benefits}
      image="/images/services/internet_service_page.png"
      ctaTitle="Ready to Upgrade Your Internet?"
      ctaDescription="Get a free quote comparison from multiple carriers. See all your options in one place."
    />
  );
}
