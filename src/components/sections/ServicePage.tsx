'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, type ReactNode, type ComponentType } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkle,
  BookOpen
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';

interface Feature {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

interface RelatedLink {
  href: string;
  label: string;
  title: string;
  description: string;
}

interface ServicePageProps {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  color: string;
  /**
   * The readable variant of `color`. `color` itself is decorative-only — none
   * of the four service colours clears 4.5:1 as small text on either background
   * this component uses. Everything a user reads takes this instead; fills,
   * borders and glows keep `color`.
   */
  textColor: string;
  gradient: string;
  features: Feature[];
  benefits: string[];
  image?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaColor?: string;
  headerCtaColor?: string;
  relatedReading?: RelatedLink[];
}

export function ServicePage({
  title,
  description,
  icon: Icon,
  color,
  textColor,
  gradient,
  features,
  benefits,
  image,
  ctaColor,
  headerCtaColor,
  relatedReading,
  ctaTitle = `Ready to Optimize Your ${title}?`,
  ctaDescription = 'Get a free assessment and discover how much you could save.'
}: ServicePageProps) {
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-100px' });

  return (
    <>
      {/* Hero Section */}
      <section data-dark-hero="true" data-header-cta-color={headerCtaColor || undefined} className={`relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-white/5 rounded-full blur-[80px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-200/80 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft weight="bold" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>

            {/* Icon and title */}
            <div className="flex items-center gap-5 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <Icon weight="fill" className="w-8 h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg" />
              </motion.div>
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
                style={{
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)'
                }}
              >
                {title}
              </h1>
            </div>

            {/* Description */}
            <p
              className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl leading-relaxed"
              style={{
                color: '#e0f2fe',
                textShadow: '0 1px 3px rgba(0,0,0,0.4)'
              }}
            >
              {description}
            </p>

            {/* CTA */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 text-white font-semibold text-lg rounded-xl shadow-2xl transition-all duration-300" style={{ backgroundColor: ctaColor || "var(--color-primary)" }}
              >
                <span>Get a Free Assessment</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full blur-[120px]" style={{ backgroundColor: `${color}10` }} />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: `${color}15`, color: textColor }}
            >
              <Sparkle weight="fill" className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Solutions</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--color-secondary)] mb-6">
              {title} Solutions We Offer
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-gray-500)] max-w-2xl mx-auto">
              We partner with leading carriers to bring you the best options for your specific needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-[var(--color-gray-50)] rounded-2xl p-8 lg:p-10 border border-gray-100 h-full hover:shadow-xl hover:border-transparent transition-all duration-500 overflow-hidden">
                    {/* Hover gradient */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${color}05 0%, transparent 100%)`
                      }}
                    />

                    {/* Icon */}
                    <div
                      className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      <FeatureIcon weight="fill" className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <h3 className="relative text-xl lg:text-2xl font-bold text-[var(--color-secondary)] mb-4">
                      {feature.title}
                    </h3>
                    <p className="relative text-[var(--color-gray-600)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section - Immersive Layout */}
      <section ref={benefitsRef} className="relative py-16 lg:py-24 bg-[var(--color-gray-50)] overflow-hidden">
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative rounded-[2rem] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-light) 50%, var(--color-secondary) 100%)`
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content side */}
              <div className="relative z-10 p-8 lg:p-12 xl:p-16 flex flex-col justify-center min-h-[500px]">
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={benefitsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/10 backdrop-blur-sm border border-white/10"
                  >
                    <CheckCircle weight="fill" className="w-4 h-4 text-white/90" />
                    <span className="text-sm font-semibold text-white/90">Benefits</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight"
                    style={{
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    Why Upgrade Your {title}?
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg text-white/70 mb-8"
                  >
                    Modern solutions offer significant advantages over traditional approaches.
                  </motion.p>

                  {/* Benefits list */}
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${color}40` }}
                        >
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-white/90 font-medium">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image side */}
              <div className="relative min-h-[350px] lg:min-h-[500px]">
                {image ? (
                  <>
                    <div className="absolute inset-0">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {/* Left edge gradient to blend with content area */}
                    <div
                      className="absolute inset-y-0 left-0 w-32 pointer-events-none"
                      style={{
                        background: `linear-gradient(to right, var(--color-secondary-light) 0%, transparent 100%)`
                      }}
                    />
                  </>
                ) : (
                  /* Fallback when no image */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.3, 0.2],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0"
                      style={{ backgroundColor: color, opacity: 0.1 }}
                    />
                    <Icon weight="fill" className="w-32 h-32 lg:w-40 lg:h-40 text-white/10" />
                    <div
                      className="absolute inset-y-0 left-0 w-32 pointer-events-none"
                      style={{
                        background: `linear-gradient(to right, var(--color-secondary-light) 0%, transparent 100%)`
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Reading Section */}
      {relatedReading && relatedReading.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-custom">
            <div className="flex items-center gap-2 mb-3" style={{ color: textColor }}>
              <BookOpen weight="fill" className="w-5 h-5" />
              <span className="text-sm font-semibold tracking-widest uppercase">Related Reading</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[var(--color-secondary)] mb-10">
              Go deeper on {title.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedReading.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group bg-[var(--color-gray-50)] rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
                    {item.label}
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--color-secondary)] mt-2 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-600)] leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold" style={{ color: textColor }}>
                    Read more
                    <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`relative py-24 lg:py-32 bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
              style={{
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              {ctaTitle}
            </h2>
            <p
              className="text-lg md:text-xl mb-10"
              style={{
                color: '#e0f2fe',
                textShadow: '0 1px 3px rgba(0,0,0,0.4)'
              }}
            >
              {ctaDescription}
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 text-white font-semibold text-lg rounded-xl shadow-2xl transition-all duration-300" style={{ backgroundColor: ctaColor || "var(--color-primary)" }}
              >
                <span>Get Started</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default ServicePage;
