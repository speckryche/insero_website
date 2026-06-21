'use client';

import { ServicePage } from '@/components/sections/ServicePage';
import {
  GitBranch,
  ArrowsClockwise,
  ChartBar,
  Stack
} from '@phosphor-icons/react';

const features = [
  {
    icon: GitBranch,
    title: 'SD-WAN Implementation',
    description:
      'Software-defined networking that intelligently routes traffic across multiple connections for optimal performance.',
  },
  {
    icon: ArrowsClockwise,
    title: 'Automatic Failover',
    description:
      'Seamless switching between connections when issues are detected, keeping your business running.',
  },
  {
    icon: ChartBar,
    title: 'Traffic Prioritization',
    description:
      'Ensure critical applications get the bandwidth they need with intelligent QoS policies.',
  },
  {
    icon: Stack,
    title: 'Multi-Site Connectivity',
    description:
      'Connect all your locations with a unified network that\'s easy to manage and scale.',
  },
];

const benefits = [
  'Eliminate single points of failure',
  'Reduce WAN costs by 30-50%',
  'Improve application performance',
  'Centralized management for all sites',
  'Built-in security features',
  'Simple deployment and scaling',
];

const relatedReading = [
  {
    href: '/resources/do-you-need-sdwan',
    label: 'SD-WAN',
    title: 'Do You Actually Need SD-WAN? A Decision Framework',
    description:
      'A vendor-neutral framework for when SD-WAN earns its cost — and when a simpler failover setup is enough.',
  },
  {
    href: '/resources/business-internet-buyers-guide',
    label: 'Internet',
    title: 'The Business Internet Buyer’s Guide: What Actually Matters',
    description:
      'How redundancy, SLA, and failover fit into sourcing the right connections for an SD-WAN deployment.',
  },
  {
    href: '/resources/fiber-vs-cable-business-internet',
    label: 'Internet',
    title: 'Fiber vs Cable for Business: An Honest Comparison',
    description:
      'Why pairing different infrastructure types makes the strongest backup for automatic failover.',
  },
];

export function SDWANPageClient() {
  return (
    <ServicePage
      title="SD-WAN & Redundancy"
      description="Never lose connection again. Intelligent network management that keeps your business running no matter what happens to any single connection."
      icon={GitBranch}
      color="var(--color-sdwan)"
      gradient="from-[var(--color-secondary)] via-violet-900 to-[var(--color-secondary-dark)]"
      features={features}
      benefits={benefits}
      relatedReading={relatedReading}
      image="/images/services/sdwan_service_page.png"
      ctaTitle="Ready for a More Resilient Network?"
      ctaDescription="Get a free network assessment and discover how SD-WAN can improve your reliability and reduce costs."
    />
  );
}
