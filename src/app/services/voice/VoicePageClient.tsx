'use client';

import { ServicePage } from '@/components/sections/ServicePage';
import {
  Microphone,
  ChatTeardropDots,
  PhoneCall,
  Headset,
  Globe
} from '@phosphor-icons/react';

const features = [
  {
    icon: ChatTeardropDots,
    title: 'VoIP & Cloud PBX',
    description:
      'Replace expensive on-premise phone systems with flexible cloud-based solutions that scale with your business.',
  },
  {
    icon: PhoneCall,
    title: 'Unified Communications',
    description:
      'Integrate voice, video, messaging, and collaboration tools into a single platform for seamless communication.',
  },
  {
    icon: Headset,
    title: 'Call Center Solutions',
    description:
      'Professional call center technology with intelligent routing, analytics, and CRM integrations.',
  },
  {
    icon: Globe,
    title: 'SIP Trunking',
    description:
      'Connect your existing PBX to the cloud with SIP trunking for lower costs and greater flexibility.',
  },
];

const benefits = [
  'Reduce phone and voice service expenses',
  'Scale instantly without new hardware',
  'Work from anywhere with mobile apps',
  'Enterprise features at SMB prices',
  'No long-term contracts required',
  '24/7 support and monitoring',
];

const relatedReading = [
  {
    href: '/ringcentral',
    label: 'Provider',
    title: 'What RingCentral Actually Costs — And Whether It\'s Right for You',
    description:
      "RingEX and RingCX list pricing in one place, with the AI add-ons and where a higher tier costs less — explained honestly, sourced at zero cost.",
  },
  {
    href: '/zoom',
    label: 'Provider',
    title: 'What Zoom Phone Actually Costs — And Whether It\'s Right for You',
    description:
      'Zoom Phone with AI included at no extra cost — explained honestly, sourced through Insero at zero cost.',
  },
  {
    href: '/resources/ucaas-explained',
    label: 'Voice',
    title: 'UCaaS Explained (and Why It’s the Same Thing as Hosted PBX)',
    description:
      'What cloud phone systems actually are, what they cost, and how to decide if you need one.',
  },
  {
    href: '/resources/pots-line-replacement-options',
    label: 'POTS Replacement',
    title: 'POTS Lines Are Going Away. Here Are Your Replacement Options.',
    description:
      'Copper is being decommissioned and priced off. Plan your migration for phones, alarms, and fax.',
  },
  {
    href: '/tools/pots-cost-estimator',
    label: 'Free Tool',
    title: 'POTS Replacement Cost Estimator',
    description:
      'See what you’re really paying for POTS lines and how much you could save by migrating.',
  },
];

export function VoicePageClient() {
  return (
    <ServicePage
      title="Voice Connectivity"
      description="Modern phone systems that scale with your business. From VoIP to unified communications, we help you find the perfect solution at the best price."
      icon={Microphone}
      color="var(--color-voice)"
      gradient="from-[var(--color-secondary)] via-blue-900 to-[var(--color-secondary-dark)]"
      features={features}
      benefits={benefits}
      relatedReading={relatedReading}
      image="/images/services/voice_service_page.png"
      ctaTitle="Ready to Modernize Your Phone System?"
      ctaDescription="Get a free assessment and discover how much you could save with modern voice solutions."
    />
  );
}
