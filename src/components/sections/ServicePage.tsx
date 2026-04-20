'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, type ComponentType } from 'react';
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
  features: Feature[];
  benefits: string[];
  image?: string;
  ctaTitle?: string;
  ctaDescription?: string;
}

export function ServicePage({
  title,
  description,
  icon: Icon,
  color,
  features,
  benefits,
  image,
  ctaTitle = `Ready to Optimize Your ${title}?`,
  ctaDescription = 'Get a free assessment and discover how much you could save.'
}: ServicePageProps) {
  const featuresRef = useRef(null);
  const benefitsRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-80px' });

  return (
    <>
      {/* Hero Section — Clean White */}
      <section className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-white overflow-hidden">
        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <Link
              href="/concepts/services"
              className="inline-flex items-center gap-2 text-[#008838] hover:text-[#005C28] mb-8 transition-colors group font-medium"
            >
              <ArrowLeft weight="bold" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Services
            </Link>

            {/* Icon and title */}
            <div className="flex items-center gap-5 mb-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center border border-gray-200 shadow-sm"
                style={{ backgroundColor: `${color}12` }}
              >
                <Icon weight="fill" className="w-8 h-8 lg:w-10 lg:h-10" style={{ color }} />
              </motion.div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#1e293b] leading-tight">
                {title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#64748b] mb-10 max-w-3xl leading-relaxed">
              {description}
            </p>

            {/* CTA */}
            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <Phone weight="fill" className="w-5 h-5" />
                <span>Get a Free Assessment</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 lg:mb-20"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={featuresInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border border-gray-200"
              style={{ backgroundColor: `${color}08`, color }}
            >
              <Sparkle weight="fill" className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Solutions</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6">
              {title} Solutions We Offer
            </h2>
            <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto">
              We partner with leading carriers to bring you the best options for your specific needs and budget.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                >
                  <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                    {/* Icon */}
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                      style={{ backgroundColor: `${color}12`, color }}
                    >
                      <FeatureIcon weight="fill" className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-bold text-[#1e293b] mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-[#64748b] leading-relaxed">
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
      <section ref={benefitsRef} className="relative py-16 lg:py-24 bg-[#f8fafb]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #008838 0%, #005C28 100%)'
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content side */}
              <div className="relative z-10 p-8 lg:p-12 xl:p-16 flex flex-col justify-center min-h-[450px]">
                <div className="relative">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-white/10 border border-white/10">
                    <CheckCircle weight="fill" className="w-4 h-4 text-white/90" />
                    <span className="text-sm font-semibold text-white/90">Benefits</span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6 leading-tight"
                    style={{ color: '#ffffff' }}
                  >
                    Why Upgrade Your {title}?
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-white/70 mb-8">
                    Modern solutions offer significant advantages over traditional approaches.
                  </p>

                  {/* Benefits list */}
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -16 }}
                        animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-white/20">
                          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-white/90 font-medium">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image side */}
              <div className="relative min-h-[300px] lg:min-h-[450px]">
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
                    <div
                      className="absolute inset-y-0 left-0 w-32 pointer-events-none"
                      style={{ background: 'linear-gradient(to right, #005C28 0%, transparent 100%)' }}
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#005C28]/30">
                    <Icon weight="fill" className="w-32 h-32 lg:w-40 lg:h-40 text-white/10" />
                    <div
                      className="absolute inset-y-0 left-0 w-32 pointer-events-none"
                      style={{ background: 'linear-gradient(to right, #005C28 0%, transparent 100%)' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
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
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6">
              {ctaTitle}
            </h2>
            <p className="text-lg md:text-xl text-[#64748b] mb-10">
              {ctaDescription}
            </p>
            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <Phone weight="fill" className="w-5 h-5" />
                <span>Schedule Your Free Consultation</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default ServicePage;
