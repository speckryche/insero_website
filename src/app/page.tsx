import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { Services } from '@/components/sections/Services';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { WhyInsero } from '@/components/sections/WhyInsero';
import { CarrierLogos } from '@/components/sections/CarrierLogosServer';
import { Testimonials } from '@/components/sections/Testimonials';
import { FinalCTA } from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
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
