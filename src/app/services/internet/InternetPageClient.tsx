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

const relatedReading = [
  {
    href: '/resources/fiber-vs-cable-business-internet',
    label: 'Internet',
    title: 'Fiber vs Cable for Business: An Honest Comparison',
    description:
      'When fiber is worth the premium, when cable still wins, and how to find what’s available at your address.',
  },
  {
    href: '/resources/business-internet-buyers-guide',
    label: 'Internet',
    title: 'The Business Internet Buyer’s Guide: What Actually Matters',
    description:
      'SLA, install timeline, redundancy, contract terms — and the carrier tactics to watch out for.',
  },
  {
    href: '/tools/bandwidth-calculator',
    label: 'Free Tool',
    title: 'Business Internet Bandwidth Calculator',
    description:
      'Figure out how much bandwidth your team actually needs in under a minute.',
  },
];

export function InternetPageClient() {
  return (
    <ServicePage
      title="Internet Connectivity"
      description="Speed and reliability optimized for your specific needs. We compare options from multiple carriers to find you the perfect connection at the best price."
      icon={Globe}
      color="var(--color-internet)"
      ctaColor="var(--color-accent-cta)"
      headerCtaColor="var(--color-accent-cta)"
      gradient="from-[var(--color-secondary)] via-emerald-900 to-[var(--color-secondary-dark)]"
      features={features}
      benefits={benefits}
      relatedReading={relatedReading}
      image="/images/services/internet_service_page.png"
      ctaTitle="Ready to Upgrade Your Internet?"
      ctaDescription="Tell us what you need and we'll compare options from multiple carriers, so you can see them all in one place."
    />
  );
}
