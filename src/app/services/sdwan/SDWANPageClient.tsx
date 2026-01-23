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
      ctaTitle="Ready for a More Resilient Network?"
      ctaDescription="Get a free network assessment and discover how SD-WAN can improve your reliability and reduce costs."
    />
  );
}
