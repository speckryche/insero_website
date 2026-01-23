'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { Phone, ArrowRight } from '@phosphor-icons/react';

export function FinalCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden"
    >
      {/* Background - matches hero gradient */}
      <div className="absolute inset-0 hero-gradient" />

      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(51, 186, 171, 0.4) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-[var(--color-primary)] text-sm font-semibold tracking-widest uppercase">
              <span className="w-8 h-px bg-[var(--color-primary)]" />
              Let&apos;s Talk
              <span className="w-8 h-px bg-[var(--color-primary)]" />
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight"
          >
            Ready to Simplify
            <br />
            <span className="text-gradient">Your Tech Stack?</span>
          </motion.h2>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            15 minutes. Zero cost. No commitment.
            <br className="hidden sm:block" />
            Just expert advice tailored to your business.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
              >
                <Phone weight="fill" className="w-6 h-6" />
                <span>Schedule Your Free Consultation</span>
                <ArrowRight
                  weight="bold"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Phone alternative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-lg"
            >
              <span>or call us at</span>
              <span className="font-semibold text-white/70 hover:text-[var(--color-primary)] transition-colors">
                (123) 456-7890
              </span>
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 pt-10 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
                <span>500+ Businesses Served</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
                <span>38% Average Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
                <span>25+ Years Experience</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
