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
  'Reduce phone costs by up to 60%',
  'Scale instantly without new hardware',
  'Work from anywhere with mobile apps',
  'Enterprise features at SMB prices',
  'No long-term contracts required',
  '24/7 support and monitoring',
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
      ctaTitle="Ready to Modernize Your Phone System?"
      ctaDescription="Get a free assessment and discover how much you could save with modern voice solutions."
    />
  );
}
