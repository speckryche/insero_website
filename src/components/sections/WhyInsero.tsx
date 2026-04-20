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
    color: '#10b981',
    features: ['No consulting fees', 'No hidden costs', 'No obligations']
  },
  {
    icon: Scales,
    title: 'Carrier Agnostic',
    description:
      'We recommend what\'s best for you, not who pays us the most. Your interests come first.',
    highlight: 'Unbiased',
    color: '#8b5cf6',
    features: ['Top carrier partners', 'Objective analysis', 'Your goals first']
  },
  {
    icon: Clock,
    title: '25+ Years Experience',
    highlight: 'Trusted',
    description:
      'Deep industry relationships mean better pricing and service levels for your business.',
    color: '#008838',
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
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#f8fafb]">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            Why <span className="text-[#008838]">Insero</span>?
          </h2>
          <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto">
            We&apos;re not just consultants. We&apos;re your advocates in a complex market.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <div className="relative bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full overflow-hidden">
                {/* Highlight badge */}
                <div
                  className="absolute -top-0 right-6 text-white text-xs font-bold px-4 py-1.5 rounded-b-lg shadow-md"
                  style={{ backgroundColor: benefit.color }}
                >
                  {benefit.highlight}
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${benefit.color}12`, color: benefit.color }}
                  >
                    <benefit.icon weight="fill" className="w-7 h-7" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1e293b] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#64748b] leading-relaxed mb-6">
                  {benefit.description}
                </p>

                {/* Features */}
                <ul className="space-y-2.5">
                  {benefit.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-[#64748b]">
                      <CheckCircle weight="fill" className="w-4 h-4 text-[#008838] flex-shrink-0" />
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
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="rounded-2xl p-8 lg:p-12 shadow-lg" style={{ background: 'linear-gradient(135deg, #008838 0%, #005C28 100%)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-white/15">
                    <stat.icon weight="fill" className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/70 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyInsero;
