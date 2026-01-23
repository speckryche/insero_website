'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Phone, Wifi, Network, Shield, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Phone,
    title: 'Voice Connectivity',
    description:
      'Modern phone systems that scale with your business. From VoIP to unified communications, we find the perfect solution.',
    href: '/services/voice',
    gradient: 'from-blue-500 to-blue-600',
    glowColor: 'rgba(59, 130, 246, 0.4)',
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
    gradient: 'from-sky-500 to-cyan-500',
    glowColor: 'rgba(14, 165, 233, 0.4)',
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
    gradient: 'from-indigo-500 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.4)',
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
    gradient: 'from-slate-600 to-blue-700',
    glowColor: 'rgba(71, 85, 105, 0.4)',
    features: [
      'Firewall Solutions',
      'Threat Protection',
      'VPN Services',
      'Security Monitoring',
    ],
  },
];

export function ServicesPageClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <>
      {/* Hero Section - Deep Blue Gradient */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 40%, #0f2d3d 100%)',
        }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating orbs */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/4 left-[10%] w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/4 right-[5%] w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />

          {/* Diagonal lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="diagonal-lines"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="40"
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
          </svg>
        </div>

        <Container className="relative z-10">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">
                Carrier-Agnostic Solutions
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
            >
              <span style={{ color: '#ffffff' }}>Our</span>{' '}
              <span
                className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-blue-100/70 max-w-2xl mx-auto leading-relaxed"
            >
              We help you navigate the complex world of cloud and connectivity
              services to find the perfect fit for your business.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 mt-12 pt-8 border-t border-blue-400/10"
            >
              {[
                { value: '100+', label: 'Carrier Partners' },
                { value: '25+', label: 'Years Experience' },
                { value: '$0', label: 'Consulting Cost' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-blue-300/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white relative">
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <Container className="relative">
          <div className="space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}
              >
                {/* Content side */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                    style={{ boxShadow: `0 10px 40px ${service.glowColor}` }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)] mb-4">
                    {service.title}
                  </h2>

                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 + featureIndex * 0.1 }}
                        className="flex items-center gap-3 text-slate-700"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <Link href={service.href}>
                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>

                {/* Visual side */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative rounded-3xl p-8 lg:p-12 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)',
                    }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-blue-200/50 blur-2xl" />
                    <div className="absolute bottom-4 left-4 w-32 h-32 rounded-full bg-sky-200/50 blur-3xl" />

                    {/* Grid pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.05]"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px',
                      }}
                    />

                    <div className="relative aspect-video rounded-2xl bg-white/60 backdrop-blur-sm border border-blue-100 flex items-center justify-center shadow-inner">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-10`}
                      />
                      <service.icon className="w-24 h-24 text-blue-400/40" />
                    </div>

                    {/* Floating badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white rounded-full shadow-lg border border-blue-100"
                    >
                      <span className="text-sm font-semibold text-blue-600">
                        {index === 0 && '50+ Voice Providers'}
                        {index === 1 && '100+ ISP Options'}
                        {index === 2 && 'Enterprise Grade'}
                        {index === 3 && '24/7 Protection'}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section - Blue theme */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a1628 0%, #1e3a5f 50%, #0f2d3d 100%)',
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/20 mb-8"
            >
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-300">Free Consultation</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span style={{ color: '#ffffff' }}>Not Sure Which Service</span>{' '}
              <span
                className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text"
                style={{ WebkitTextFillColor: 'transparent' }}
              >
                You Need?
              </span>
            </h2>

            <p className="text-lg md:text-xl text-blue-100/60 mb-10 leading-relaxed">
              That&apos;s exactly why we&apos;re here. Schedule a free consultation and
              we&apos;ll help you identify the best solutions for your business.
            </p>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg rounded-full shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
              >
                Schedule a Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-blue-400/10">
              {['No Obligation', 'Expert Guidance', 'Save Money'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-blue-300/50">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
