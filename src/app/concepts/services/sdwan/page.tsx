'use client';

import { ConceptServicePage } from '../sections/ConceptServicePage';
import { ConceptHeaderOverride } from '../../homepage-v3/sections/ConceptHeaderOverride';
import { ConceptFooter } from '../../homepage-v3/sections/ConceptFooter';
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

export default function ConceptSDWANPage() {
  return (
    <>
      <ConceptHeaderOverride />
      <style>{`
        body.concept-v3 footer:not(.concept-footer) { display: none !important; }
      `}</style>

      <ConceptServicePage
        title="SD-WAN & Redundancy"
        description="Never lose connection again. Intelligent network management that keeps your business running no matter what happens to any single connection."
        icon={GitBranch}
        color="#8b5cf6"
        features={features}
        benefits={benefits}
        image="/images/services/sdwan_service_page.png"
        ctaTitle="Ready for a More Resilient Network?"
        ctaDescription="Get a free network assessment and discover how SD-WAN can improve your reliability and reduce costs."
      />

      <ConceptFooter />
    </>
  );
}
