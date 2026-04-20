'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Phone, Wifi, Network, Shield, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';

const services = [
  {
    icon: Phone,
    title: 'Voice',
    titleAccent: 'Connectivity',
    description:
      'Modern phone systems that scale with your business. From VoIP to unified communications, we find the perfect solution.',
    href: '/services/voice',
    gradient: 'from-blue-500 to-blue-600',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    image: '/images/services/voice_connectivity.png',
    bgGradient: 'linear-gradient(135deg, #0a1628 0%, #0d2847 50%, #1a3a5c 100%)',
    blendColor: '#1a3a5c',
    accentGradient: 'from-cyan-400 to-blue-500',
    accentColor: 'cyan',
    ctaText: 'Explore Voice Solutions',
    features: [
      'VoIP & Cloud PBX',
      'Unified Communications',
      'Call Center Solutions',
      'SIP Trunking',
    ],
  },
  {
    icon: Wifi,
    title: 'Internet',
    titleAccent: 'Connectivity',
    description:
      'Speed and reliability optimized for your specific needs. Compare fiber, cable, 5G cellular and other internet options.',
    href: '/services/internet',
    gradient: 'from-sky-500 to-cyan-500',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    image: '/images/services/internet_connectivity.png',
    bgGradient: 'linear-gradient(135deg, #042f2e 0%, #064e3b 50%, #065f46 100%)',
    blendColor: '#065f46',
    accentGradient: 'from-emerald-400 to-teal-500',
    accentColor: 'emerald',
    ctaText: 'Explore Internet Options',
    features: [
      'Fiber Internet',
      'Cable Coax Internet',
      'Broadband Solutions',
      'Wireless Backup',
    ],
  },
  {
    icon: Network,
    title: 'SD-WAN',
    titleAccent: '& Redundancy',
    description:
      'Never lose connection again. Intelligent network management that keeps your business running.',
    href: '/services/sdwan',
    gradient: 'from-indigo-500 to-blue-600',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    image: '/images/services/sd-wan.png',
    bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #3730a3 100%)',
    blendColor: '#3730a3',
    accentGradient: 'from-violet-400 to-indigo-500',
    accentColor: 'violet',
    ctaText: 'Explore SD-WAN Solutions',
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
    titleAccent: 'Solutions',
    description:
      'Protection without complexity. Enterprise-grade security made accessible for businesses of all sizes.',
    href: '/services/security',
    gradient: 'from-slate-600 to-blue-700',
    glowColor: 'rgba(71, 85, 105, 0.4)',
    image: '/images/services/security.png',
    bgGradient: 'linear-gradient(135deg, #18181b 0%, #27272a 50%, #3f3f46 100%)',
    blendColor: '#3f3f46',
    accentGradient: 'from-orange-400 to-red-500',
    accentColor: 'orange',
    ctaText: 'Explore Security Options',
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
        data-dark-hero="true"
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
                { value: 'Top', label: 'Carrier Partners' },
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
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
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
          <div className="space-y-32">
            {services.map((service, index) => {
              // Determine if content should be on left or right (alternating)
              const contentOnRight = index % 2 === 1;

              // Get accent colors based on service
              const getAccentClasses = () => {
                switch (service.accentColor) {
                  case 'cyan': return { checkBg: 'bg-cyan-400/20', checkIcon: 'text-cyan-400', shadow: 'shadow-cyan-500/25 hover:shadow-cyan-500/40' };
                  case 'emerald': return { checkBg: 'bg-emerald-400/20', checkIcon: 'text-emerald-400', shadow: 'shadow-emerald-500/25 hover:shadow-emerald-500/40' };
                  case 'violet': return { checkBg: 'bg-violet-400/20', checkIcon: 'text-violet-400', shadow: 'shadow-violet-500/25 hover:shadow-violet-500/40' };
                  case 'orange': return { checkBg: 'bg-orange-400/20', checkIcon: 'text-orange-400', shadow: 'shadow-orange-500/25 hover:shadow-orange-500/40' };
                  default: return { checkBg: 'bg-cyan-400/20', checkIcon: 'text-cyan-400', shadow: 'shadow-cyan-500/25 hover:shadow-cyan-500/40' };
                }
              };

              const accentClasses = getAccentClasses();

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  {/* Main container with split layout */}
                  <div
                    className="relative rounded-[2rem] overflow-hidden"
                    style={{ background: service.bgGradient }}
                  >
                    <div className={`grid grid-cols-1 lg:grid-cols-2 ${contentOnRight ? 'lg:grid-flow-dense' : ''}`}>
                      {/* Content side */}
                      <div className={`relative z-10 p-8 lg:p-12 xl:p-16 flex flex-col justify-center min-h-[500px] ${contentOnRight ? 'lg:col-start-2' : ''}`}>
                        {/* Subtle pattern overlay */}
                        <div
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                            backgroundSize: '24px 24px',
                          }}
                        />

                        <div className="relative max-w-lg">
                          {/* Icon badge */}
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`w-14 h-14 bg-gradient-to-br ${service.accentGradient} rounded-xl flex items-center justify-center mb-6 shadow-lg ${accentClasses.shadow.split(' ')[0]}`}
                          >
                            <service.icon className="w-7 h-7 text-white" />
                          </motion.div>

                          {/* Title - bold and prominent */}
                          <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-[1.1]"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            <span className="text-white">{service.title}</span>
                            <br />
                            <span
                              className={`bg-gradient-to-r ${service.accentGradient} bg-clip-text`}
                              style={{ WebkitTextFillColor: 'transparent' }}
                            >
                              {service.titleAccent}
                            </span>
                          </motion.h2>

                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg text-white/70 mb-8 leading-relaxed"
                          >
                            {service.description}
                          </motion.p>

                          {/* Feature list - clean vertical layout */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="space-y-3 mb-8"
                          >
                            {service.features.map((feature, featureIndex) => (
                              <motion.div
                                key={featureIndex}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 + featureIndex * 0.1 }}
                                className="flex items-center gap-3"
                              >
                                <div className={`w-5 h-5 rounded-full ${accentClasses.checkBg} flex items-center justify-center flex-shrink-0`}>
                                  <CheckCircle className={`w-3.5 h-3.5 ${accentClasses.checkIcon}`} />
                                </div>
                                <span className="text-white/90 font-medium">{feature}</span>
                              </motion.div>
                            ))}
                          </motion.div>

                          {/* CTA Button */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                          >
                            <Link href={service.href}>
                              <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group inline-flex items-center gap-3 px-7 py-3.5 bg-gradient-to-r ${service.accentGradient} text-white font-semibold rounded-xl shadow-xl ${accentClasses.shadow} transition-all duration-300`}
                              >
                                {service.ctaText}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              </motion.button>
                            </Link>
                          </motion.div>
                        </div>
                      </div>

                      {/* Visual side - Image or Placeholder */}
                      <div className={`relative min-h-[400px] lg:min-h-[500px] ${contentOnRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        {service.image ? (
                          <>
                            {/* Image container */}
                            <div className="absolute inset-0">
                              <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover object-center"
                                priority={index === 0}
                              />
                            </div>
                            {/* Edge gradient to blend with content area */}
                            <div
                              className={`absolute inset-y-0 ${contentOnRight ? 'right-0' : 'left-0'} w-32 pointer-events-none`}
                              style={{
                                background: contentOnRight
                                  ? `linear-gradient(to left, ${service.blendColor} 0%, transparent 100%)`
                                  : `linear-gradient(to right, ${service.blendColor} 0%, transparent 100%)`,
                              }}
                            />
                          </>
                        ) : (
                          /* Placeholder visual when no image */
                          <div className="absolute inset-0 flex items-center justify-center">
                            {/* Animated gradient background */}
                            <motion.div
                              animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.5, 0.3],
                              }}
                              transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: 'easeInOut',
                              }}
                              className={`absolute inset-0 bg-gradient-to-br ${service.accentGradient} opacity-20`}
                            />

                            {/* Decorative circles */}
                            <div className="absolute inset-0 overflow-hidden">
                              <motion.div
                                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-white/10 blur-2xl"
                              />
                              <motion.div
                                animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
                                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-white/5 blur-3xl"
                              />
                            </div>

                            {/* Large icon */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, delay: 0.4 }}
                              className="relative"
                            >
                              <service.icon className="w-32 h-32 lg:w-40 lg:h-40 text-white/20" strokeWidth={1} />
                            </motion.div>

                            {/* Edge gradient to blend */}
                            <div
                              className={`absolute inset-y-0 ${contentOnRight ? 'right-0' : 'left-0'} w-32 pointer-events-none`}
                              style={{
                                background: contentOnRight
                                  ? `linear-gradient(to left, ${service.blendColor} 0%, transparent 100%)`
                                  : `linear-gradient(to right, ${service.blendColor} 0%, transparent 100%)`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-lg rounded-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
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
