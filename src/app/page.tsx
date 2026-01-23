import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { Services } from '@/components/sections/Services';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WhyInsero } from '@/components/sections/WhyInsero';
import { CarrierLogos } from '@/components/sections/CarrierLogosServer';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'Insero | Cloud & Connectivity Consulting - Zero Cost Expert Guidance',
  description:
    'Get expert cloud and connectivity consulting at zero cost. Insero helps businesses save money on voice, internet, SD-WAN, and security solutions. Free consultation available.',
  keywords: [
    'cloud consulting',
    'connectivity consulting',
    'telecom broker',
    'voice solutions',
    'business internet',
    'SD-WAN',
    'network security',
    'free consultation',
    'carrier comparison',
  ],
  openGraph: {
    title: 'Insero | Cloud & Connectivity Consulting',
    description:
      'Expert guidance at zero cost to you. We compare 100+ carriers to find the best solutions for your business.',
    url: 'https://insero.cloud',
  },
  alternates: {
    canonical: 'https://insero.cloud',
  },
};

// JSON-LD for homepage
const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Insero',
  description:
    'Expert cloud and connectivity consulting at zero cost. We help businesses find the best voice, internet, SD-WAN, and security solutions.',
  url: 'https://insero.cloud',
  priceRange: 'Free',
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cloud & Connectivity Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Voice Connectivity',
          description: 'VoIP, Cloud PBX, and unified communications solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Internet Connectivity',
          description: 'Fiber, dedicated internet, and broadband solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SD-WAN & Redundancy',
          description: 'Software-defined networking and failover solutions',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Network Security',
          description: 'Firewall, threat protection, and VPN services',
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />
      <Hero />
      <PainPoints />
      <Services />
      <HowItWorks />
      <WhyInsero />
      <CarrierLogos />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
