import type { Metadata } from 'next';
import { HomeHero } from '@/components/home/HomeHero';
import { CityBlockScroll } from '@/components/home/CityBlockScroll';
import { ProposalReveal } from '@/components/home/ProposalReveal';
import { PickOneLine } from '@/components/home/PickOneLine';
import { IntakeSection } from '@/components/home/IntakeSection';
import { HowWeGetPaid } from '@/components/home/HowWeGetPaid';
import { ServicesGrid } from '@/components/home/ServicesGrid';
import { HomeFAQ, type FAQItem } from '@/components/home/HomeFAQ';
import { LearnTeaser } from '@/components/home/LearnTeaser';
import { FinalCTABand } from '@/components/home/FinalCTABand';
import { Testimonials } from '@/components/sections/Testimonials';
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

// FAQ data. Rendered by HomeFAQ and serialised into the FAQPage schema below,
// so what Google reads is exactly what is on screen.
const faqItems: FAQItem[] = [
  {
    question: 'What does Insero cost?',
    answer: 'Nothing. Carriers pay us when you sign up. No fees, no retainer, no obligation.',
  },
  {
    question: 'Will I pay more than going direct?',
    answer:
      "No. The carrier's price is the same either way. We often know about promotions you wouldn't hear about on your own.",
  },
  {
    question: 'What size businesses do you work with?',
    answer:
      'One location to hundreds. Small and mid-size businesses are our sweet spot, and we bring in carrier specialists for bigger projects.',
  },
  {
    question: 'How long does it take?',
    answer:
      'Your side-by-side usually takes a few business days. Install depends on the service: days for voice, longer if new fiber has to be built.',
  },
  {
    question: 'Do I have to switch everything at once?',
    answer: 'No. Plenty of customers start with one service and add more later.',
  },
  {
    question: 'What happens after install?',
    answer:
      "You work directly with the carrier you picked. They handle your service and support. When your contract comes up for renewal, we'll compare the market again so you're not stuck auto-renewing.",
  },
];

// FAQ Schema for Google featured snippets
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="hm">
        <HomeHero />
        <CityBlockScroll />
        <ProposalReveal />
        <PickOneLine />
        <IntakeSection />
        <HowWeGetPaid />
        <ServicesGrid />
      </div>
      {/* Outside the .hm wrapper on purpose: home.css styles bare h2/h3 under
          .hm, and unlayered rules there would override this component's
          Tailwind spacing. Approved quotes only, in review as well as
          production. Scott Anderson's approved quote is left off this page
          because it names the founder, which the homepage brand rules forbid;
          it is not edited, because a testimonial is the customer's verbatim
          words. */}
      <Testimonials approvedOnly excludeIds={['scott-anderson']} />
      <div className="hm">
        <HomeFAQ items={faqItems} />
        <LearnTeaser />
        <FinalCTABand />
      </div>
    </>
  );
}
