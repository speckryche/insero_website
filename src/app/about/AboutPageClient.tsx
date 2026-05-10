'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Compass,
  Briefcase,
  Handshake,
  Prohibit,
  CheckCircle,
  X as XIcon,
} from '@phosphor-icons/react';
import { Container } from '@/components/ui/Container';
import { FinalCTA } from '@/components/sections/FinalCTA';

export function AboutPageClient() {
  return (
    <>
      <Hero />
      <WhyExists />
      <Background />
      <HowWeWork />
      <WhatWeDont />
      <FinalCTA />
    </>
  );
}

function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section
      ref={ref}
      data-dark-hero="true"
      className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 hero-gradient overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <Container>
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#1FA855] text-sm font-semibold tracking-widest uppercase mb-6"
          >
            <span className="w-8 h-px bg-[#1FA855]" />
            About Insero
            <span className="w-8 h-px bg-[#1FA855]" />
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight text-balance"
          >
            Built by people who&apos;ve actually run a phone company.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
          >
            Insero is run by Speck Hansen, who spent 25+ years in telecom and previously owned a CLEC. We know what carriers will and won&apos;t do, where the contract gotchas are, and how implementations actually go vs. how they&apos;re sold.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}

function WhyExists() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
            style={{ backgroundColor: 'rgba(0,136,56,0.1)' }}
          >
            <Compass weight="fill" className="w-7 h-7 text-[#008838]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            Why <span className="text-[#008838]">Insero</span> exists
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg md:text-xl text-[#475569] leading-relaxed space-y-5 max-w-3xl mx-auto"
        >
          <p>
            Most businesses navigate telecom blind &mdash; buying direct from one carrier with no leverage and no advocate.
          </p>
          <p>
            Insero is the advocate. Independent, no quota with any single carrier, paid by the providers so businesses pay zero premium.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

const backgroundItems = [
  'Founder of Insero',
  'Previously built and sold InfoStructure, a CLEC (Competitive Local Exchange Carrier) in the Pacific Northwest, to Hunter Communications',
  '25+ years in the industry — sales, ops, infrastructure, ownership',
  'Insero has an exclusive PNW agent agreement with Hunter as a result, giving customers access most TAs don\'t have',
];

function Background() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#e2e8ec]">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
            style={{ backgroundColor: 'rgba(0,136,56,0.1)' }}
          >
            <Briefcase weight="fill" className="w-7 h-7 text-[#008838]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4 leading-tight">
            Speck&apos;s background
          </h2>
          <p className="text-lg text-[#475569] max-w-2xl mx-auto">
            Three decades on the carrier side &mdash; not just selling them.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl p-8 lg:p-12 border border-gray-200 shadow-sm max-w-3xl mx-auto"
        >
          <ul className="space-y-5">
            {backgroundItems.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 text-[#1e293b] text-base md:text-lg leading-relaxed"
              >
                <CheckCircle
                  weight="fill"
                  className="w-6 h-6 text-[#008838] flex-shrink-0 mt-0.5"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}

function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
            style={{ backgroundColor: 'rgba(0,136,56,0.1)' }}
          >
            <Handshake weight="fill" className="w-7 h-7 text-[#008838]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4 leading-tight">
            How we work
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#fafcfc] rounded-2xl p-8 lg:p-10 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-[#1e293b] mb-3">Full-cycle, no fees</h3>
            <p className="text-[#475569] leading-relaxed">
              Research, quote, recommend, contract, implement, support &mdash; all at no cost to the customer. Carriers pay us when you sign, so you pay zero premium for the help.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-[#fafcfc] rounded-2xl p-8 lg:p-10 border border-gray-200"
          >
            <h3 className="text-xl font-bold text-[#1e293b] mb-4">Regional + national reach</h3>
            <p className="text-[#475569] leading-relaxed mb-5">
              Direct relationships with regional carriers and national reach via master TSDs.
            </p>
            <div className="space-y-3 text-sm md:text-base text-[#475569]">
              <div>
                <span className="font-semibold text-[#1e293b]">Regional:</span>{' '}
                Hunter, LS Networks, TDS, Nuwave
              </div>
              <div>
                <span className="font-semibold text-[#1e293b]">National TSDs:</span>{' '}
                AppDirect, IBS, Sandler, Intelisys
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

const dontItems = [
  {
    title: 'We don\'t pressure-sell',
    body: 'No urgency tactics. If now isn\'t the right time, we\'ll say so.',
  },
  {
    title: 'We don\'t push the carrier paying us most',
    body: 'We recommend what fits. Compensation differences across carriers aren\'t big enough to bias the recommendation.',
  },
  {
    title: 'We don\'t disappear after the contract is signed',
    body: 'Implementation, escalations, renewals — same person you started with is still there.',
  },
];

function WhatWeDont() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-[#e2e8ec]">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6"
            style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
          >
            <Prohibit weight="fill" className="w-7 h-7 text-[#ef4444]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4 leading-tight">
            What we <span className="text-[#ef4444]">don&apos;t</span> do
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {dontItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm h-full"
            >
              <div
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-4"
                style={{ backgroundColor: 'rgba(239,68,68,0.1)' }}
              >
                <XIcon weight="bold" className="w-5 h-5 text-[#ef4444]" />
              </div>
              <h3 className="text-lg font-bold text-[#1e293b] mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[#475569] leading-relaxed text-sm md:text-base">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
