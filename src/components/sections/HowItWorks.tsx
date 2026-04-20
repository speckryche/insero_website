'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  CalendarCheck,
  MagnifyingGlass,
  PiggyBank,
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
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white"
    >
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            How It <span className="text-[#008838]">Works</span>
          </h2>
          <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto">
            Three simple steps to better connectivity and lower costs.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line — desktop */}
          <div className="hidden lg:block absolute top-[100px] left-[calc(16.666%+48px)] right-[calc(16.666%+48px)] h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#008838] rounded-full"
              style={{ width: lineProgress }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
                className="relative h-full"
              >
                <div className="h-full bg-white rounded-2xl p-8 lg:p-10 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  {/* Step number */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="w-10 h-10 bg-[#008838] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {step.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex mb-6 mt-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0, 136, 56, 0.08)' }}
                    >
                      <step.icon weight="fill" className="w-8 h-8 text-[#008838]" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#64748b] leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2.5 text-left max-w-[200px] mx-auto">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-sm text-[#64748b]">
                        <CheckCircle weight="fill" className="w-4 h-4 text-[#008838] flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight weight="bold" className="w-5 h-5 text-[#008838] rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <Link href="/contact">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
              <span>Schedule a Call</span>
              <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
