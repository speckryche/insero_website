'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Phone, Wifi, Network, Shield, ArrowRight, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: Phone,
    title: 'Voice Connectivity',
    description:
      'Modern phone systems that scale with your business. From VoIP to unified communications, we find the perfect solution.',
    href: '/services/voice',
    color: 'bg-blue-500',
    features: [
      'VoIP & Cloud PBX',
      'Unified Communications',
      'Call Center Solutions',
      'SIP Trunking',
    ],
  },
  {
    icon: Wifi,
    title: 'Internet Connectivity',
    description:
      'Speed and reliability optimized for your specific needs. Compare fiber, cable, and dedicated internet options.',
    href: '/services/internet',
    color: 'bg-green-500',
    features: [
      'Fiber Internet',
      'Dedicated Internet Access',
      'Broadband Solutions',
      'Wireless Backup',
    ],
  },
  {
    icon: Network,
    title: 'SD-WAN & Redundancy',
    description:
      'Never lose connection again. Intelligent network management that keeps your business running.',
    href: '/services/sdwan',
    color: 'bg-purple-500',
    features: [
      'SD-WAN Implementation',
      'Network Redundancy',
      'Load Balancing',
      'Failover Solutions',
    ],
  },
  {
    icon: Shield,
    title: 'Security',
    description:
      'Protection without complexity. Enterprise-grade security made accessible for businesses of all sizes.',
    href: '/services/security',
    color: 'bg-red-500',
    features: [
      'Firewall Solutions',
      'Threat Protection',
      'VPN Services',
      'Security Monitoring',
    ],
  },
];

export function ServicesPageClient() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--color-dark)] to-[var(--color-primary-dark)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/80">
              We help you navigate the complex world of cloud and connectivity
              services to find the perfect fit for your business.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white">
        <Container>
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div
                    className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[var(--color-dark)] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-[var(--color-gray-600)] mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3 text-[var(--color-gray-600)]"
                      >
                        <CheckCircle className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button variant="primary" className="group">
                      Learn More
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                <div
                  className={`bg-[var(--color-light)] rounded-2xl p-8 lg:p-12 ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="aspect-video bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 rounded-xl flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-[var(--color-primary)]/40" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-light)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-dark)] mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-[var(--color-gray-600)] mb-8">
              That&apos;s exactly why we&apos;re here. Schedule a free consultation and
              we&apos;ll help you identify the best solutions for your business.
            </p>
            <Link href="/contact">
              <Button variant="accent" size="lg">
                Schedule a Free Consultation
              </Button>
            </Link>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
