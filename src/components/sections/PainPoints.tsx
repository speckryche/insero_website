'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  UsersThree,
  CreditCard,
  Question
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

export function PainPoints() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            Tired of Overpaying for Services{' '}
            <br className="hidden md:block" />
            <span className="text-[#008838]">You Don&apos;t Understand?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto">
            You&apos;re not alone. Most businesses face these exact challenges—and we&apos;re here to help solve them.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 136, 56, 0.1)' }}>
                    <point.icon weight="fill" className="w-7 h-7 text-[#008838]" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1e293b] mb-3 leading-tight">
                  {point.title}
                </h3>
                <p className="text-[#64748b] leading-relaxed mb-6">
                  {point.description}
                </p>

                {/* Stat */}
                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#008838]">
                      {point.stat}
                    </span>
                    <span className="text-sm text-[#94a3b8]">
                      {point.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom connector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#008838]" />
            <span className="text-2xl md:text-3xl font-bold text-[#1e293b]">
              There&apos;s a better way
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#008838]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default PainPoints;
