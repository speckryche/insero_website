'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Add your carrier logo files to public/carriers/ and list them here
// Supported formats: PNG, SVG, JPG, WEBP
const carrierLogos = [
  { name: 'AT&T', file: 'AT&T.png' },
  { name: 'Comcast', file: 'Comcast.png' },
  { name: 'Spectrum', file: 'Spectrum.webp' },
  { name: 'Lumen', file: 'Lumen.png' },
  { name: 'Zayo', file: 'Zayo.png' },
  { name: 'Ziply', file: 'Ziply.svg' },
  { name: 'RingCentral', file: 'RingCentral.svg' },
  { name: 'Nextiva', file: 'Nextiva.png' },
  { name: 'GoTo', file: 'GoTo.png' },
  { name: 'BigLeaf', file: 'BigLeaf.png' },
  { name: 'Fatbeam', file: 'Fatbeam.webp' },
  { name: 'Hunter', file: 'Hunter.png' },
];

// Logo dimensions and spacing
const LOGO_WIDTH = 240;
const LOGO_GAP = 24;
const VISIBLE_COUNT = 5;
const PAUSE_DURATION = 3000; // 3 seconds pause between slides

function PlaceholderLogo({ name }: { name: string }) {
  return (
    <div className="w-[240px] h-[120px] bg-[var(--color-gray-100)] rounded-xl flex items-center justify-center px-6">
      <span className="text-[var(--color-gray-400)] font-medium text-base text-center">
        {name}
      </span>
    </div>
  );
}

function LogoItem({ logo }: { logo: { name: string; file: string } }) {
  if (logo.file === 'placeholder') {
    return <PlaceholderLogo name={logo.name} />;
  }

  return (
    <div className="w-[240px] h-[120px] bg-[var(--color-gray-100)] rounded-xl flex items-center justify-center px-6">
      <Image
        src={`/carriers/${logo.file}`}
        alt={logo.name}
        width={200}
        height={90}
        className="object-contain max-h-[80px]"
      />
    </div>
  );
}

export function CarrierLogos() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create extended array for seamless looping
  const extendedLogos = [...carrierLogos, ...carrierLogos.slice(0, VISIBLE_COUNT)];

  // Auto-advance ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // Reset to beginning when we've gone through all original logos
        if (next >= carrierLogos.length) {
          return 0;
        }
        return next;
      });
    }, PAUSE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const slideWidth = LOGO_WIDTH + LOGO_GAP;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-24 bg-[var(--color-secondary)] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
            <span style={{ color: '#ffffff' }}>Trusted</span>{' '}
            <span className="text-[var(--color-primary)]">Carrier Network</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            We partner with 100+ carriers to find the perfect solution for your business.
          </p>
        </motion.div>
      </div>

      {/* White container for logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="bg-white py-12"
      >
        {/* Logos container with overflow hidden */}
        <div className="relative overflow-hidden">
          {/* Centered container for 5 logos */}
          <div
            className="flex justify-center"
            style={{
              width: '100%',
              maxWidth: `${VISIBLE_COUNT * LOGO_WIDTH + (VISIBLE_COUNT - 1) * LOGO_GAP}px`,
              margin: '0 auto',
              overflow: 'hidden'
            }}
          >
            {/* Sliding track */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * slideWidth}px)`,
                gap: `${LOGO_GAP}px`
              }}
            >
              {extendedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0"
                >
                  <LogoItem logo={logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default CarrierLogos;
