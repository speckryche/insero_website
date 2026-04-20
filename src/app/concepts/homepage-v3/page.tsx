import type { Metadata } from 'next';
import Link from 'next/link';
import { ConceptHero } from './sections/ConceptHero';
import { ConceptCarrierLogosWrapper } from './sections/ConceptCarrierLogosServer';
import { ConceptPainPoints } from './sections/ConceptPainPoints';
import { ConceptServices } from './sections/ConceptServices';
import { ConceptHowItWorks } from './sections/ConceptHowItWorks';
import { ConceptWhyInsero } from './sections/ConceptWhyInsero';
import { ConceptFinalCTA } from './sections/ConceptFinalCTA';
import { FAQ } from '@/components/sections/FAQ';
import { ConceptFooter } from './sections/ConceptFooter';
import { ConceptHeaderOverride } from './sections/ConceptHeaderOverride';

export const metadata: Metadata = {
  title: 'Homepage Concept V3 - Insero',
  robots: { index: false, follow: false },
};

const faqItems = [
  {
    question: 'What does Insero cost?',
    answer:
      'Our consulting services are completely free to you. Carriers pay us directly when we help you find the right solution, so you get expert guidance at zero cost.',
  },
  {
    question: 'How do you help my business save money?',
    answer:
      'We compare solutions from multiple carriers to find the best fit for your needs. Our carrier-agnostic approach means we recommend based on your requirements, not commission rates, often uncovering savings on voice, internet, and network services.',
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

export default function HomepageConceptV3() {
  return (
    <>
      {/* Header overrides for white-background concept page */}
      {/* Header styling handled by ConceptHeaderOverride */}
      <ConceptHeaderOverride />

      <ConceptHero />
      <ConceptCarrierLogosWrapper />
      <ConceptPainPoints />
      <ConceptServices />
      <ConceptHowItWorks />
      <ConceptWhyInsero />

      {/* FAQ with light gray background + reduced top padding */}
      <div className="[&>section]:!bg-[#f8fafb] [&>section]:!pt-12 [&>section]:lg:!pt-16">
        <FAQ items={faqItems} />
      </div>

      <ConceptFinalCTA />

      {/* Concept footer — hide the default footer, show ours */}
      <style>{`
        body.concept-v3 footer:not(.concept-footer) { display: none !important; }
      `}</style>
      <ConceptFooter />
    </>
  );
}
