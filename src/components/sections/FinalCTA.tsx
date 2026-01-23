'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Phone,
  ArrowRight,
  Clock,
  CurrencyDollar,
  CheckCircle
} from '@phosphor-icons/react';

const benefits = [
  { icon: Clock, text: '15-minute call' },
  { icon: CurrencyDollar, text: 'Zero cost to you' },
  { icon: CheckCircle, text: 'No commitment' },
];

export function FinalCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-light)] to-[var(--color-primary-900)] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-[var(--color-primary)] rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[var(--color-accent)] rounded-full blur-[120px]"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-12"
          >
<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              <span style={{ color: '#ffffff' }}>Ready to Simplify Your</span>{' '}
              <span className="text-[var(--color-primary-light)]">Tech Stack?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Book a 15-minute call. No pressure, no cost. Just expert advice tailored to your business needs.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-white/70"
              >
                <benefit.icon weight="fill" className="w-5 h-5 text-[var(--color-primary)]" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
              >
                <Phone weight="fill" className="w-5 h-5" />
                <span>Schedule a Call</span>
                <ArrowRight
                  weight="bold"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </Link>

            <span className="text-white/40 hidden sm:block">or</span>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-2 px-6 py-4 text-white font-medium hover:text-[var(--color-primary)] transition-colors"
            >
              <span className="text-white/60">Call us:</span>
              <span className="text-lg">(123) 456-7890</span>
            </a>
          </motion.div>

          {/* Trust message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-white/60 text-lg"
          >
            Join the many businesses who simplified their connectivity with Insero
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
