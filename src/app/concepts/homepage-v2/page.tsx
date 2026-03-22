import type { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { Services } from '@/components/sections/Services';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WhyInsero } from '@/components/sections/WhyInsero';
import { CarrierLogosContinuous } from '@/components/sections/CarrierLogosContinuousServer';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { FAQ } from '@/components/sections/FAQ';
import { WaveDivider } from '@/components/ui/WaveDivider';

export const metadata: Metadata = {
  title: 'Homepage Concept V2 - Insero',
  robots: { index: false, follow: false },
};

// FAQ data (duplicated from homepage for this concept page)
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

export default function HomepageConceptV2() {
  return (
    <>
      {/* ─── Concept Preview Banner ─── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 px-4 py-2"
        style={{
          background: 'linear-gradient(135deg, #1abc9c 0%, #16a085 100%)',
        }}
      >
        <span className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Concept Preview
        </span>
        <span className="hidden sm:inline text-white/70 text-xs">
          — Carrier logos moved up + continuous scroll + improved section separation
        </span>
        <Link
          href="/"
          className="ml-3 px-3 py-0.5 text-xs font-medium text-[#1abc9c] bg-white rounded-full hover:bg-white/90 transition-colors"
        >
          View Live Site
        </Link>
      </div>

      {/* ─── 1. Hero Section ─── */}
      <div className="relative">
        <Hero />
        {/* Dark overlay covers Hero's built-in white fade (z-[5])
            for seamless dark-to-dark flow into CarrierLogos */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#2c3e50] via-[#2c3e50]/70 to-transparent z-[6]" />
      </div>

      {/* ─── 2. Trusted Carrier Network (continuous scroll) ─── */}
      <CarrierLogosContinuous />

      {/* ─── 3. Pain Points ─── */}
      <PainPoints />

      {/* ─── Wave: PainPoints (gray-50) → Services (white) ─── */}
      <WaveDivider
        topColor="#e2e8ec"
        bottomColor="#ffffff"
        variant="gentle"
        label="Gentle Curve"
      />

      {/* ─── 4. Services ─── */}
      <Services />

      {/* ─── 5. How It Works ─── */}
      <HowItWorks />

      {/* ─── 6. Why Insero ─── */}
      <WhyInsero />

      {/* ─── Wave: WhyInsero (white) → FAQ (gray-50) ─── */}
      <WaveDivider
        topColor="#ffffff"
        bottomColor="#e2e8ec"
        variant="scurve"
        label="S-Curve"
      />

      {/* ─── 7. FAQ ─── */}
      <div className="[&>section]:!bg-[var(--color-gray-50)]">
        <FAQ items={faqItems} />
      </div>

      {/* ─── 8. Final CTA ─── */}
      <FinalCTA />
    </>
  );
}
