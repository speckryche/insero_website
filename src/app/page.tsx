import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { Services } from '@/components/sections/Services';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WhyInsero } from '@/components/sections/WhyInsero';
import { CarrierLogos } from '@/components/sections/CarrierLogosServer';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { FAQ } from '@/components/sections/FAQ';

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

// FAQ data
const faqItems = [
  {
    question: 'What does Insero cost?',
    answer:
      'Our consulting services are completely free to you. Carriers pay us directly when we help you find the right solution, so you get expert guidance at zero cost.',
  },
  {
    question: 'How do you help my business save money?',
    answer:
      'We compare solutions from 100+ carriers to find the best fit for your needs. Our carrier-agnostic approach means we recommend based on your requirements, not commission rates, often uncovering savings of 20-50% on voice, internet, and network services.',
  },
  {
    question: 'What types of businesses do you work with?',
    answer:
      'We work with businesses of all sizes, from small businesses with a single location to large enterprises with multiple sites across the country. Our solutions scale to match your needs.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Implementation timelines vary by service. Simple voice solutions can be up and running in days, while complex SD-WAN deployments may take a few weeks. We provide realistic timelines upfront and manage the entire process for you.',
  },
  {
    question: 'Do I have to switch all my services at once?',
    answer:
      "Not at all. We work at your pace. Many clients start with one service to experience our process, then expand to other solutions over time. There's no pressure to change everything at once.",
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
      <Hero />
      <PainPoints />
      <Services />
      <HowItWorks />
      <WhyInsero />
      <CarrierLogos />
      <Testimonials />
      <FAQ items={faqItems} />
      <FinalCTA />
    </>
  );
}
