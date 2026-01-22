'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, type ReactNode, type ComponentType } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  CheckCircle,
  Sparkle
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';

interface Feature {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

interface ServicePageProps {
  title: string;
  description: string;
  icon: ComponentType<IconProps>;
  color: string;
  gradient: string;
  features: Feature[];
  benefits: string[];
  ctaTitle?: string;
  ctaDescription?: string;
}

export function ServicePage({
  title,
  description,
  icon: Icon,
  color,
  gradient,
  features,
  benefits,
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
      <section className={`relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-gradient-to-br ${gradient} overflow-hidden`}>
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
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
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
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
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <Icon weight="fill" className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight">
                {title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-10 max-w-3xl leading-relaxed">
              {description}
            </p>

            {/* CTA */}
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
              >
                <Phone weight="fill" className="w-5 h-5" />
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
              style={{ backgroundColor: `${color}15`, color }}
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
                    <p className="relative text-[var(--color-gray-500)] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="relative py-24 lg:py-32 bg-[var(--color-gray-50)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ backgroundColor: `${color}08` }} />
        </div>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={benefitsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <CheckCircle weight="fill" className="w-4 h-4" />
                <span className="text-sm font-semibold">Benefits</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--color-secondary)] mb-6 leading-tight">
                Why Upgrade Your {title}?
              </h2>
              <p className="text-lg text-[var(--color-gray-500)] mb-10">
                Modern solutions offer significant advantages over traditional approaches. Here&apos;s what you can expect.
              </p>

              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <CheckCircle weight="fill" className="w-4 h-4" style={{ color }} />
                    </div>
                    <span className="text-[var(--color-secondary)] font-medium">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                {/* Decorative background */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    background: `radial-gradient(circle at top right, ${color}, transparent 70%)`
                  }}
                />

                <div className="relative aspect-square max-w-sm mx-auto flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-3xl opacity-10"
                    style={{ backgroundColor: color }}
                  />
                  <Icon weight="fill" className="w-32 h-32 lg:w-40 lg:h-40" style={{ color: `${color}30` }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative py-24 lg:py-32 bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6">
              {ctaTitle}
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10">
              {ctaDescription}
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-black/20 hover:shadow-black/30 transition-all duration-300"
              >
                <Phone weight="fill" className="w-5 h-5" />
                <span>Schedule Your Free Consultation</span>
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
