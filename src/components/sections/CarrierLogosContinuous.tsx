'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/lib/use-reduced-motion';

interface CarrierLogo {
  name: string;
  file: string;
}

const logoAdjustments: Record<string, { scale?: string; translateY?: string }> = {
  'Fatbeam': { scale: 'scale-125' },
  'Nextiva': { translateY: '-translate-y-1' },
};

const SCROLL_DURATION = 30;

function LogoItem({ logo }: { logo: CarrierLogo }) {
  const adjustment = logoAdjustments[logo.name] || {};
  const transformClasses = [
    adjustment.scale || '',
    adjustment.translateY || '',
  ].filter(Boolean).join(' ');

  return (
    <div className="flex-shrink-0 w-[96px] sm:w-[200px] md:w-[240px] flex items-center justify-center px-3 sm:px-6 md:px-8">
      <div className="w-full h-[60px] sm:h-[80px] md:h-[100px] flex items-center justify-center">
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
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  const reducedMotion = useReducedMotion();

  if (logos.length === 0) return null;

  // Only the scrolling layout duplicates the set. The keyframe translates the
  // track by -50%, which lands exactly on the start of the second copy, so the
  // loop is seamless — and only because the copy is there.
  const repeatedLogos = [...logos, ...logos];

  return (
    <section ref={sectionRef} className="pt-20 lg:pt-28 pb-0 bg-[#e2e8ec]">
      {/* Section header — inside container */}
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {/* Eyebrow */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-3 text-[#005C28] text-sm font-semibold tracking-widest uppercase">
              <span className="w-8 h-px bg-[#008838]" />
              Our Partners
              <span className="w-8 h-px bg-[#008838]" />
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-5 leading-tight">
            Trusted Carrier Network
          </h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
            We partner with only the best carriers to find the perfect solution for your business.
          </p>
        </motion.div>
      </div>

      {/* Logos carousel — outside container, full width */}
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div
            className={`relative bg-white rounded-2xl py-8 shadow-sm border border-gray-100 ${
              reducedMotion ? '' : 'overflow-hidden'
            }`}
          >
            {/* Edge fades belong to the moving layout only: they exist so logos
                enter and leave softly instead of being hard-cut by
                overflow-hidden. In the static layout nothing is clipped, so
                fading the outer column would just make real content look
                faulty. Narrower below sm — a 64px fade either side of a 340px
                window would swallow most of what the slot-width fix just made
                visible. */}
            {!reducedMotion && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none rounded-l-2xl" />
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none rounded-r-2xl" />
              </>
            )}

            {reducedMotion ? (
              /* Reduce Motion is honoured by the global reset in globals.css,
                 which forces animation-duration to 0.01ms and the iteration
                 count to 1. That is correct for a decorative marquee, but it
                 runs the scroll keyframe once and instantly, parking the track
                 at translateX(-50%) — the second copy, permanently, with the
                 outer logos cut mid-wordmark. The fix is a layout that never
                 needed the animation: the unique set once, wrapped and centred,
                 nothing duplicated and nothing to clip. */
              <div className="flex flex-wrap items-center justify-center sm:px-4">
                {logos.map((logo) => (
                  <LogoItem key={logo.name} logo={logo} />
                ))}
              </div>
            ) : (
              <div
                className="flex w-max animate-[scroll_var(--scroll-duration)_linear_infinite]"
                style={{ '--scroll-duration': `${SCROLL_DURATION}s` } as React.CSSProperties}
              >
                {repeatedLogos.map((logo, index) => (
                  <LogoItem key={`${logo.name}-${index}`} logo={logo} />
                ))}
              </div>
            )}
          </div>
        </motion.div>

      </div>

      {/* Trust stats — full-width green bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-14 bg-[#008838] py-5 lg:py-6"
      >
        <div className="mx-auto w-full max-w-[var(--container-max)] px-4 md:px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-6 md:gap-x-16 lg:gap-x-24">
            <div className="text-center">
              <div className="text-xl md:text-3xl lg:text-4xl font-display font-extrabold text-white">Top</div>
              <div className="text-sm md:text-base text-white mt-1">Carrier Partners</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-xl md:text-3xl lg:text-4xl font-display font-extrabold text-white">Multi-Carrier</div>
              <div className="text-sm md:text-base text-white mt-1">Comparison</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30" />
            <div className="text-center">
              <div className="text-xl md:text-3xl lg:text-4xl font-display font-extrabold text-white">Zero</div>
              <div className="text-sm md:text-base text-white mt-1">Carrier Bias</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
