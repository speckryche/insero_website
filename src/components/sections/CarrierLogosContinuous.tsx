'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface CarrierLogo {
  name: string;
  file: string;
}

// Special adjustments for specific logos
const logoAdjustments: Record<string, { scale?: string; translateY?: string }> = {
  'Fatbeam': { scale: 'scale-125' },
  'Nextiva': { translateY: '-translate-y-1' },
};

// Duration in seconds for one full cycle of all logos
const SCROLL_DURATION = 30;

function LogoItem({ logo }: { logo: CarrierLogo }) {
  const adjustment = logoAdjustments[logo.name] || {};
  const transformClasses = [
    adjustment.scale || '',
    adjustment.translateY || '',
  ].filter(Boolean).join(' ');

  return (
    <div className="flex-shrink-0 w-[200px] md:w-[240px] flex items-center justify-center px-6 md:px-8">
      <div className="w-full h-[80px] md:h-[100px] flex items-center justify-center">
        <Image
          src={`/carriers/${logo.file}`}
          alt={logo.name}
          width={180}
          height={70}
          className={`object-contain max-w-full max-h-full ${transformClasses}`}
        />
      </div>
    </div>
  );
}

interface CarrierLogosContinuousClientProps {
  logos: CarrierLogo[];
}

export function CarrierLogosContinuousClient({ logos }: CarrierLogosContinuousClientProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  if (logos.length === 0) return null;

  // Duplicate logos enough times to fill the track for seamless looping
  const repeatedLogos = [...logos, ...logos];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-light)] to-[var(--color-secondary)]" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Eyebrow */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-3 text-[var(--color-primary)] text-sm font-semibold tracking-widest uppercase">
              <span className="w-8 h-px bg-[var(--color-primary)]" />
              Our Partners
              <span className="w-8 h-px bg-[var(--color-primary)]" />
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-5 leading-tight" style={{ color: '#ffffff' }}>
            Trusted Carrier Network
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            We partner with only the best carriers to find the perfect solution for your business.
          </p>
        </motion.div>

        {/* Logos carousel — continuous scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* White card container */}
          <div className="relative bg-white rounded-2xl py-8 shadow-2xl overflow-hidden">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none rounded-l-2xl" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none rounded-r-2xl" />

            {/* Continuous scrolling track */}
            <div
              className="flex w-max animate-[scroll_var(--scroll-duration)_linear_infinite]"
              style={{
                '--scroll-duration': `${SCROLL_DURATION}s`,
              } as React.CSSProperties}
            >
              {repeatedLogos.map((logo, index) => (
                <LogoItem key={`${logo.name}-${index}`} logo={logo} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 pt-10 border-t border-white/10 max-w-4xl mx-auto"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-20">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                Top
              </div>
              <div className="text-sm text-white/50 mt-1">Carrier Partners</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                Zero
              </div>
              <div className="text-sm text-white/50 mt-1">Carrier Bias</div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                Best Fit
              </div>
              <div className="text-sm text-white/50 mt-1">Guaranteed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
