'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  CurrencyDollar,
  Scales,
  Clock,
  Trophy,
  Handshake,
  CheckCircle
} from '@phosphor-icons/react';

const benefits = [
  {
    icon: CurrencyDollar,
    title: 'Zero Cost',
    description:
      'Carriers compensate us directly. You get expert guidance without paying a dime.',
    highlight: 'Free',
    color: 'var(--color-internet)',
    features: ['No consulting fees', 'No hidden costs', 'No obligations']
  },
  {
    icon: Scales,
    title: 'Carrier Agnostic',
    description:
      'We recommend what\'s best for you, not who pays us the most. Your interests come first.',
    highlight: 'Unbiased',
    color: 'var(--color-sdwan)',
    features: ['100+ carrier partners', 'Objective analysis', 'Your goals first']
  },
  {
    icon: Clock,
    title: '25+ Years Experience',
    description:
      'Deep industry relationships mean better pricing and service levels for your business.',
    highlight: 'Trusted',
    color: 'var(--color-primary)',
    features: ['Industry veterans', 'Proven track record', 'Dedicated support']
  },
];

const stats = [
  { value: '500+', label: 'Clients Served', icon: Handshake },
  { value: '$2M+', label: 'Client Savings', icon: CurrencyDollar },
  { value: '25+', label: 'Years Experience', icon: Trophy },
];

export function WhyInsero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 lg:mb-20"
        >
<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-secondary)] mb-6 leading-tight">
            Why <span className="text-gradient">Insero</span>?
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-gray-500)] max-w-2xl mx-auto">
            We&apos;re not just consultants. We&apos;re your advocates in a complex market.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group relative"
            >
              <div className="relative h-full bg-[var(--color-gray-50)] rounded-2xl p-8 lg:p-10 border border-gray-100 hover:border-[var(--color-primary)]/30 hover:shadow-xl transition-all duration-500 overflow-hidden">
                {/* Hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${benefit.color}08 0%, transparent 100%)`
                  }}
                />

                {/* Highlight badge */}
                <div
                  className="absolute -top-0 right-6 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg shadow-lg"
                  style={{ backgroundColor: benefit.color }}
                >
                  {benefit.highlight}
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    style={{
                      backgroundColor: `${benefit.color}15`,
                      color: benefit.color
                    }}
                  >
                    <benefit.icon weight="fill" className="w-8 h-8" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">
                  {benefit.title}
                </h3>
                <p className="text-[var(--color-gray-500)] leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {benefit.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-3 text-sm text-[var(--color-gray-600)]"
                    >
                      <CheckCircle
                        weight="fill"
                        className="w-5 h-5 flex-shrink-0"
                        style={{ color: benefit.color }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)] rounded-2xl p-8 lg:p-12">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--color-primary)]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-4">
                    <stat.icon weight="fill" className="w-7 h-7 text-[var(--color-primary)]" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyInsero;
