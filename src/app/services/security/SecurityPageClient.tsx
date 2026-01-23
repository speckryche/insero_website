'use client';

import { ServicePage } from '@/components/sections/ServicePage';
import {
  ShieldCheck,
  LockKey,
  Warning,
  HardDrives,
  Eye
} from '@phosphor-icons/react';

const features = [
  {
    icon: LockKey,
    title: 'Firewall Solutions',
    description:
      'Next-generation firewalls that protect your network from modern threats without slowing you down.',
  },
  {
    icon: Warning,
    title: 'Threat Protection',
    description:
      'Advanced threat detection and prevention to stop malware, ransomware, and phishing attacks.',
  },
  {
    icon: HardDrives,
    title: 'VPN Services',
    description:
      'Secure remote access for your team with enterprise-grade VPN solutions.',
  },
  {
    icon: Eye,
    title: 'Security Monitoring',
    description:
      '24/7 monitoring and response to detect and neutralize threats before they cause damage.',
  },
];

const benefits = [
  'Enterprise security at SMB budgets',
  'Simplified management and reporting',
  'Compliance-ready solutions',
  'Expert implementation and support',
  'Unified threat management',
  'Regular security assessments',
];

export function SecurityPageClient() {
  return (
    <ServicePage
      title="Security"
      description="Protection without complexity. Enterprise-grade security made accessible for businesses of all sizes. Don't let your business become a statistic."
      icon={ShieldCheck}
      color="var(--color-security)"
      gradient="from-[var(--color-secondary)] via-red-900 to-[var(--color-secondary-dark)]"
      features={features}
      benefits={benefits}
      ctaTitle="Ready to Protect Your Business?"
      ctaDescription="Get a free security assessment and discover your vulnerabilities before attackers do."
    />
  );
}
