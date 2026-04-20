'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Globe,
  GitBranch,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  Microphone
} from '@phosphor-icons/react';
import { ConceptHeaderOverride } from '../homepage-v3/sections/ConceptHeaderOverride';
import { ConceptFooter } from '../homepage-v3/sections/ConceptFooter';

const services = [
  {
    icon: Microphone,
    title: 'Voice',
    titleAccent: 'Connectivity',
    description:
      'Modern phone systems that scale with your business. From VoIP to unified communications, we find the perfect solution.',
    href: '/concepts/services/voice',
    image: '/images/services/voice_connectivity.png',
    color: '#3b82f6',
    ctaText: 'Explore Voice Solutions',
    features: [
      'VoIP & Cloud PBX',
      'Unified Communications',
      'Call Center Solutions',
      'SIP Trunking',
    ],
  },
  {
    icon: Globe,
    title: 'Internet',
    titleAccent: 'Connectivity',
    description:
      'Speed and reliability optimized for your specific needs. Compare fiber, cable, 5G cellular and other internet options.',
    href: '/concepts/services/internet',
    image: '/images/services/internet_connectivity.png',
    color: '#0B9182',
    ctaText: 'Explore Internet Options',
    features: [
      'Fiber Internet',
      'Cable Coax Internet',
      'Broadband Solutions',
      'Wireless Backup',
    ],
  },
  {
    icon: GitBranch,
    title: 'SD-WAN',
    titleAccent: '& Redundancy',
    description:
      'Never lose connection again. Intelligent network management that keeps your business running.',
    href: '/concepts/services/sdwan',
    image: '/images/services/sd-wan.png',
    color: '#8b5cf6',
    ctaText: 'Explore SD-WAN Solutions',
    features: [
      'SD-WAN Implementation',
      'Network Redundancy',
      'Load Balancing',
      'Failover Solutions',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    titleAccent: 'Solutions',
    description:
      'Protection without complexity. Enterprise-grade security made accessible for businesses of all sizes.',
    href: '/concepts/services/security',
    image: '/images/services/security.png',
    color: '#ef4444',
    ctaText: 'Explore Security Options',
    features: [
      'Firewall Solutions',
      'Threat Protection',
      'VPN Services',
      'Security Monitoring',
    ],
  },
];

export default function ConceptServicesPage() {
  return (
    <>
      <ConceptHeaderOverride />
      <style>{`
        body.concept-v3 footer:not(.concept-footer) { display: none !important; }
      `}</style>

      {/* Hero Section — Clean White */}
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1] text-[#1e293b]">
              Our <span className="text-[#008838]">Services</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#64748b] max-w-2xl mx-auto leading-relaxed mb-12">
              We help you navigate the complex world of cloud and connectivity
              services to find the perfect fit for your business.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-gray-200">
              {[
                { value: 'Top', label: 'Carrier Partners' },
                { value: '25+', label: 'Years Experience' },
                { value: '$0', label: 'Consulting Cost' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#008838]">{stat.value}</div>
                  <div className="text-sm text-[#64748b]">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid — Alternating Layout */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => {
              const contentOnRight = index % 2 === 1;
              const ServiceIcon = service.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${contentOnRight ? 'lg:grid-flow-dense' : ''}`}>
                      {/* Content side */}
                      <div className={`p-8 lg:p-12 xl:p-16 flex flex-col justify-center ${contentOnRight ? 'lg:col-start-2' : ''}`}>
                        {/* Icon */}
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                          style={{ backgroundColor: `${service.color}12`, color: service.color }}
                        >
                          <ServiceIcon weight="fill" className="w-7 h-7" />
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 leading-[1.1] text-[#1e293b]">
                          {service.title}{' '}
                          <span className="text-[#008838]">{service.titleAccent}</span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-[#64748b] mb-8 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Feature list */}
                        <div className="space-y-3 mb-8">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-3">
                              <CheckCircle weight="fill" className="w-5 h-5 text-[#008838] flex-shrink-0" />
                              <span className="text-[#475569] font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div>
                          <Link href={service.href}>
                            <button className="group inline-flex items-center gap-3 px-7 py-3.5 bg-[#008838] text-white font-semibold rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-md shadow-[#008838]/20">
                              {service.ctaText}
                              <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </Link>
                        </div>
                      </div>

                      {/* Image side */}
                      <div className={`relative min-h-[300px] lg:min-h-[450px] bg-[#f8fafb] ${contentOnRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        {service.image ? (
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ServiceIcon weight="fill" className="w-32 h-32 text-gray-200" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#E6F5EC]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight text-[#1e293b]">
              Not Sure Which Service{' '}
              <span className="text-[#008838]">You Need?</span>
            </h2>

            <p className="text-lg md:text-xl text-[#64748b] mb-10 leading-relaxed">
              That&apos;s exactly why we&apos;re here. Schedule a free consultation and
              we&apos;ll help you identify the best solutions for your business.
            </p>

            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                Schedule a Free Consultation
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-[#008838]/15">
              {['No Obligation', 'Expert Guidance', 'Save Money'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-[#64748b]">
                  <CheckCircle weight="fill" className="w-4 h-4 text-[#008838]" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ConceptFooter />
    </>
  );
}
