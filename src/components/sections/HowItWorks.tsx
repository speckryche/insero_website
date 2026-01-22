'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  MagnifyingGlass,
  PiggyBank,
  Phone,
  ArrowRight,
  CheckCircle
} from '@phosphor-icons/react';

const steps = [
  {
    icon: CalendarCheck,
    step: '01',
    title: 'Schedule a Call',
    description:
      'Tell us about your business, current setup, and pain points. We listen first.',
    details: ['15-minute intro call', 'No commitment required', 'Discover your needs']
  },
  {
    icon: MagnifyingGlass,
    step: '02',
    title: 'Get Recommendations',
    description:
      'We analyze your needs and compare options across multiple carriers to find the best fit.',
    details: ['Multi-carrier comparison', 'Custom analysis', 'Transparent pricing']
  },
  {
    icon: PiggyBank,
    step: '03',
    title: 'Save Money',
    description:
      'Implement the best solution for your business. Pay nothing for our expert guidance.',
    details: ['Zero consulting fees', 'Ongoing support', 'Guaranteed savings']
  },
];

export function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[var(--color-secondary)] overflow-hidden"
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
          className="text-center mb-16 lg:mb-24"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-[var(--color-primary)] rounded-full mb-6"
          >
            <span className="w-2 h-2 bg-[var(--color-primary)] rounded-full animate-pulse" />
            <span className="text-sm font-semibold">Simple Process</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            <span style={{ color: '#ffffff' }}>How It</span> <span className="text-[var(--color-primary)]">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Three simple steps to better connectivity and lower costs.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-[120px] left-[calc(16.666%+48px)] right-[calc(16.666%+48px)] h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full"
              style={{ width: lineProgress }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="relative"
              >
                <div className="relative group">
                  {/* Card */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-10 text-center border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.08]">
                    {/* Step number */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                      className="absolute -top-5 left-1/2 -translate-x-1/2"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[var(--color-primary)]/30">
                          {step.step}
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-xl opacity-30" />
                      </div>
                    </motion.div>

                    {/* Icon */}
                    <div className="relative inline-flex mb-6 mt-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <step.icon
                          weight="fill"
                          className="w-10 h-10 text-[var(--color-primary)]"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="flex items-center justify-center gap-2 text-sm text-white/50"
                        >
                          <CheckCircle
                            weight="fill"
                            className="w-4 h-4 text-[var(--color-primary)]"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Arrow connector for mobile */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight
                        weight="bold"
                        className="w-6 h-6 text-[var(--color-primary)] rotate-90"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
            >
              <Phone weight="fill" className="w-5 h-5" />
              <span>Start with Step 1</span>
              <ArrowRight
                weight="bold"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
