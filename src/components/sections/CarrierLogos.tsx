'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

// Configuration
const VISIBLE_COUNT = 4;
const PAUSE_DURATION = 1500;
const TRANSITION_DURATION = 300;

// Hook to detect if page is visible
function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return isVisible;
}

interface CarrierLogo {
  name: string;
  file: string;
}

// Special adjustments for specific logos
const logoAdjustments: Record<string, { scale?: string; translateY?: string }> = {
  'Fatbeam': { scale: 'scale-125' },
  'Nextiva': { translateY: '-translate-y-1' },
};

function LogoItem({ logo }: { logo: CarrierLogo }) {
  const adjustment = logoAdjustments[logo.name] || {};
  const transformClasses = [
    adjustment.scale || '',
    adjustment.translateY || '',
  ].filter(Boolean).join(' ');

  return (
    <div className="flex-shrink-0 w-[calc(100%/4)] flex items-center justify-center px-4 md:px-6">
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

interface CarrierLogosClientProps {
  logos: CarrierLogo[];
}

export function CarrierLogosClient({ logos }: CarrierLogosClientProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isCurrentlyVisible = useInView(sectionRef, { margin: '0px' });
  const isPageVisible = usePageVisibility();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const shouldAnimate = isCurrentlyVisible && isPageVisible;
  const extendedLogos = [...logos, ...logos.slice(0, VISIBLE_COUNT)];

  const stepForward = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (currentIndex === logos.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, logos.length]);

  useEffect(() => {
    if (logos.length === 0 || !shouldAnimate) return;

    const interval = setInterval(() => {
      stepForward();
    }, PAUSE_DURATION);

    return () => clearInterval(interval);
  }, [logos.length, stepForward, shouldAnimate]);

  if (logos.length === 0) {
    return null;
  }

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
            We partner with 100+ carriers to find the perfect solution for your business.
          </p>
        </motion.div>

        {/* Logos carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* White card container for logos */}
          <div className="relative bg-white rounded-2xl py-8 shadow-2xl">
            {/* Left fade */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none rounded-l-2xl" />
            {/* Right fade */}
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none rounded-r-2xl" />

            {/* Sliding track */}
            <div className="overflow-hidden">
              <div
                className="flex"
                style={{
                  transform: `translate3d(-${currentIndex * (100 / VISIBLE_COUNT)}%, 0, 0)`,
                  transition: isTransitioning ? `transform ${TRANSITION_DURATION}ms ease-in-out` : 'none',
                  willChange: 'transform',
                }}
              >
                {extendedLogos.map((logo, index) => (
                  <LogoItem key={`${logo.name}-${index}`} logo={logo} />
                ))}
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {logos.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex % logos.length
                    ? 'bg-[var(--color-primary)] w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
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
                100+
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

export default CarrierLogosClient;
