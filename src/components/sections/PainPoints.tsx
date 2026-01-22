'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  UsersThree,
  CreditCard,
  Question,
  Warning
} from '@phosphor-icons/react';

const painPoints = [
  {
    icon: UsersThree,
    title: 'Too many vendors, too much confusion',
    description:
      'Juggling multiple carriers and providers creates complexity that wastes your time and money.',
    stat: '73%',
    statLabel: 'of businesses overpay due to vendor complexity'
  },
  {
    icon: CreditCard,
    title: 'Paying for features you don\'t need',
    description:
      'Complex pricing structures and unnecessary add-ons mean you\'re likely overpaying every month.',
    stat: '40%',
    statLabel: 'average savings when optimized'
  },
  {
    icon: Question,
    title: 'No one explains what\'s best for YOUR business',
    description:
      'Generic solutions don\'t fit unique needs. You deserve advice tailored to your specific situation.',
    stat: '2x',
    statLabel: 'faster implementation with expert guidance'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const
    },
  },
};

export function PainPoints() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-[var(--color-gray-50)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Warning badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full mb-6"
          >
            <Warning weight="fill" className="w-4 h-4" />
            <span className="text-sm font-semibold">Sound familiar?</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-secondary)] mb-6 leading-tight">
            Tired of Overpaying for Services{' '}
            <br className="hidden md:block" />
            <span className="text-[var(--color-accent)]">You Don&apos;t Understand?</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-gray-500)] max-w-2xl mx-auto">
            You&apos;re not alone. Most businesses face these exact challenges—and we&apos;re here to help solve them.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100 h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                {/* Decorative accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                    <point.icon
                      weight="fill"
                      className="w-8 h-8 text-[var(--color-accent)] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--color-gray-100)] rounded-full flex items-center justify-center text-sm font-bold text-[var(--color-gray-400)]">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-[var(--color-secondary)] mb-4 leading-tight">
                  {point.title}
                </h3>
                <p className="text-[var(--color-gray-500)] leading-relaxed mb-6">
                  {point.description}
                </p>

                {/* Stat highlight */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[var(--color-primary)]">
                      {point.stat}
                    </span>
                    <span className="text-sm text-[var(--color-gray-400)]">
                      {point.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom connector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[var(--color-gray-300)]" />
            <span className="text-[var(--color-gray-400)] font-medium">
              There&apos;s a better way
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[var(--color-gray-300)]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PainPoints;
