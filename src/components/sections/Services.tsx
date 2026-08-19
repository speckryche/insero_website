'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Microphone,
  Globe,
  GitBranch,
  ShieldCheck,
  ArrowRight
} from '@phosphor-icons/react';

const services = [
  {
    icon: Microphone,
    title: 'Voice Connectivity',
    description: 'Modern phone systems that scale with your business and reduce costs.',
    features: ['VoIP Solutions', 'Unified Communications', 'Call Analytics'],
    href: '/services/voice',
    color: '#3b82f6',
  },
  {
    icon: Globe,
    title: 'Internet Connectivity',
    description: 'Speed and reliability optimized for your specific needs and budget.',
    features: ['Fiber & Broadband', 'Dedicated Internet', 'Multi-carrier Options'],
    href: '/services/internet',
    color: '#10b981',
  },
  {
    icon: GitBranch,
    title: 'SD-WAN & Redundancy',
    description: 'Never lose connection again with intelligent network management.',
    features: ['Failover Protection', 'Traffic Optimization', 'Multi-site Connectivity'],
    href: '/services/sdwan',
    color: '#8b5cf6',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Protection without complexity. Enterprise security made accessible.',
    features: ['Firewall Solutions', 'Threat Detection', 'Compliance Support'],
    href: '/services/security',
    color: '#ef4444',
  },
];

export function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#e2e8ec]">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            Four Pillars of <span className="text-[#008838]">Connectivity</span>
          </h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-3xl mx-auto">
            We help you navigate the complex world of cloud and connectivity services
            to find the perfect fit for your business.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <Link href={service.href} className="block group h-full">
                <div className="bg-white rounded-2xl p-6 lg:p-8 h-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}12`, color: service.color }}
                    >
                      <service.icon weight="fill" className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-[#1e293b] mb-2 group-hover:text-[#008838] transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 flex-grow">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#64748b]">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#008838] mt-6">
                    <span>Learn More</span>
                    <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#008838] text-[#005C28] font-semibold rounded-xl hover:bg-[#008838] hover:text-white transition-colors duration-200"
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
