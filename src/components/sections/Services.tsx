'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Microphone,
  Globe,
  GitBranch,
  ShieldCheck,
  ArrowRight,
  Sparkle
} from '@phosphor-icons/react';

const services = [
  {
    icon: Microphone,
    title: 'Voice Connectivity',
    description: 'Modern phone systems that scale with your business and reduce costs.',
    features: ['VoIP Solutions', 'Unified Communications', 'Call Analytics'],
    href: '/services/voice',
    color: 'var(--color-voice)',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: Globe,
    title: 'Internet Connectivity',
    description: 'Speed and reliability optimized for your specific needs and budget.',
    features: ['Fiber & Broadband', 'Dedicated Internet', 'Multi-carrier Options'],
    href: '/services/internet',
    color: 'var(--color-internet)',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: GitBranch,
    title: 'SD-WAN & Redundancy',
    description: 'Never lose connection again with intelligent network management.',
    features: ['Failover Protection', 'Traffic Optimization', 'Multi-site Connectivity'],
    href: '/services/sdwan',
    color: 'var(--color-sdwan)',
    gradient: 'from-violet-500 to-violet-600'
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Protection without complexity. Enterprise security made accessible.',
    features: ['Firewall Solutions', 'Threat Detection', 'Compliance Support'],
    href: '/services/security',
    color: 'var(--color-security)',
    gradient: 'from-red-500 to-red-600'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    },
  },
};

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[var(--color-primary)]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-accent)]/3 rounded-full blur-[100px]" />
      </div>

      <div className="container-custom relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16 lg:mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full mb-6"
          >
            <Sparkle weight="fill" className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Services</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-secondary)] mb-6 leading-tight">
            Four Pillars of{' '}
            <span className="text-gradient">Connectivity</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-gray-500)] max-w-3xl mx-auto">
            We help you navigate the complex world of cloud and connectivity services
            to find the perfect fit for your business.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link href={service.href} className="block group h-full">
                <div className="relative bg-white rounded-2xl p-6 lg:p-8 h-full border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-2">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}
                  />

                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-6 right-6 h-1 rounded-full transform -translate-y-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, ${service.color}, ${service.color}80)` }}
                  />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        backgroundColor: `${service.color}15`,
                        color: service.color
                      }}
                    >
                      <service.icon weight="fill" className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-xl font-bold text-[var(--color-secondary)] mb-3 group-hover:text-[var(--color-primary)] transition-colors"
                  >
                    {service.title}
                  </h3>
                  <p className="text-[var(--color-gray-500)] text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-[var(--color-gray-400)]"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-2 text-sm font-semibold transition-all duration-300"
                    style={{ color: service.color }}
                  >
                    <span>Learn More</span>
                    <ArrowRight
                      weight="bold"
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] text-[var(--color-secondary)] font-semibold rounded-full transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight weight="bold" className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
