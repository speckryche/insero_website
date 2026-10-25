import type { Metadata } from 'next';
import { HomeHero } from '@/components/home/HomeHero';
import { CarrierBand } from '@/components/home/CarrierBand';
import { HomeIntro } from '@/components/home/HomeIntro';
import { PillarStack } from '@/components/home/PillarStack';
import { ProposalPick } from '@/components/home/ProposalPick';
import { ReceiptSection } from '@/components/home/ReceiptSection';
import { ServicesSquares } from '@/components/home/ServicesSquares';
import { TestimonialRotator } from '@/components/home/TestimonialRotator';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { LearnBooklets } from '@/components/home/LearnBooklets';
import '@/components/home/home.css';

// The hero subtitle, verbatim, so the search snippet says what the page says.
const description =
  'Internet, voice and the rest of your tech. We get quotes from every carrier and line them up side by side. Free to you, because the carriers pay us.';

export const metadata: Metadata = {
  title: 'Insero — Independent Telecom & Technology Advisors | Zero Cost',
  description,
  keywords: [
    'telecom broker',
    'telecom consultant',
    'vendor agnostic telecom consulting',
    'compare telecom providers for business',
    'telecom cost reduction consultant',
    'cloud consulting',
    'connectivity consulting',
    'telecom brokerage services',
    'carrier comparison',
    'free telecom consultation',
  ],
  openGraph: {
    title: 'Insero — Independent Telecom & Technology Advisors',
    description,
    url: 'https://insero.cloud',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Insero - Cloud & Connectivity Consulting' }],
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
      {/* Homepage v3, parts 1-2 of 3: hero through Learn. The green line
          (GreenLine.tsx) is parked and not rendered. The new sections sit
          outside .hm on purpose: home.css styles bare h2/h3 under .hm, and
          unlayered rules there would override their Tailwind utilities.
          overflow-x: clip, not hidden, so the sticky cards and the pinned
          proposal still stick. */}
      <div className="overflow-x-clip">
        <div className="hm">
          <HomeHero />
        </div>
        <CarrierBand />
        <HomeIntro />
        <PillarStack />
        <ProposalPick />
        <ReceiptSection />
        <ServicesSquares />
        <TestimonialRotator />
        <FaqAccordion />
        <LearnBooklets />
        {/* Temporary target for every #get-started link; part 3 replaces it
            with the real form. */}
        <div id="get-started" />
      </div>
    </>
  );
}
