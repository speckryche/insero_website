'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import {
  Buildings,
  TrendDown,
  Clock,
  ArrowRight,
  Quotes,
  Phone,
  Sparkle,
  Trophy
} from '@phosphor-icons/react';

const caseStudies = [
  {
    company: 'TechStart Inc.',
    industry: 'Technology',
    challenge: 'Outdated phone system with high costs and limited features',
    solution: 'Migrated to cloud-based VoIP with unified communications',
    results: [
      { metric: '40%', label: 'Cost Reduction' },
      { metric: '99.9%', label: 'Uptime' },
      { metric: '2 weeks', label: 'Implementation' },
    ],
    quote:
      'Insero helped us cut our telecom costs by 40% while actually improving our service quality.',
    author: 'Sarah Johnson',
    role: 'CFO',
    color: 'var(--color-voice)',
  },
  {
    company: 'Midwest Manufacturing',
    industry: 'Manufacturing',
    challenge: 'Single internet connection causing production downtime',
    solution: 'Implemented SD-WAN with automatic failover',
    results: [
      { metric: '0', label: 'Downtime Events' },
      { metric: '35%', label: 'Cost Savings' },
      { metric: '3x', label: 'Bandwidth' },
    ],
    quote:
      'The fact that their services cost us nothing was almost too good to be true. But they delivered exactly what they promised.',
    author: 'Michael Chen',
    role: 'Operations Director',
    color: 'var(--color-sdwan)',
  },
  {
    company: 'Regional Healthcare Group',
    industry: 'Healthcare',
    challenge: 'Complex multi-vendor environment with compliance concerns',
    solution: 'Consolidated to single secure platform with compliance features',
    results: [
      { metric: '50%', label: 'Vendor Reduction' },
      { metric: 'HIPAA', label: 'Compliant' },
      { metric: '24/7', label: 'Support' },
    ],
    quote:
      'Insero made everything simple. They translated the tech jargon and found us the perfect solution.',
    author: 'Emily Rodriguez',
    role: 'IT Manager',
    color: 'var(--color-security)',
  },
];

const stats = [
  { icon: Buildings, value: '500+', label: 'Businesses Served' },
  { icon: TrendDown, value: '38%', label: 'Average Cost Reduction' },
  { icon: Clock, value: '25+', label: 'Years Experience' },
];

export default function CaseStudiesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-light)] to-[var(--color-primary-900)] overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full mb-8"
            >
              <Trophy weight="fill" className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-sm font-semibold">Success Stories</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Case <span className="text-[var(--color-primary-light)]">Studies</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto">
              Real results from real businesses. See how we&apos;ve helped companies like yours simplify their technology and save money.
            </p>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Stats Overview */}
      <section className="relative py-16 bg-white border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl mb-4">
                  <stat.icon weight="fill" className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-[var(--color-secondary)] mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--color-gray-500)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative py-24 lg:py-32 bg-[var(--color-gray-50)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative">
          <div className="space-y-12 lg:space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column - Company Info */}
                  <div
                    className="lg:col-span-4 p-8 lg:p-10 text-white relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, var(--color-secondary) 0%, ${study.color}40 100%)`
                    }}
                  >
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

                    <div className="relative">
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold mb-4"
                        style={{ backgroundColor: `${study.color}30`, color: study.color }}
                      >
                        <Sparkle weight="fill" className="w-3 h-3" />
                        {study.industry}
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold mb-6">{study.company}</h3>

                      <div className="space-y-6">
                        <div>
                          <div className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">
                            Challenge
                          </div>
                          <p className="text-white/90 leading-relaxed">{study.challenge}</p>
                        </div>
                        <div>
                          <div className="text-white/50 text-sm font-medium uppercase tracking-wider mb-2">
                            Solution
                          </div>
                          <p className="text-white/90 leading-relaxed">{study.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Results */}
                  <div className="lg:col-span-8 p-8 lg:p-10">
                    <div className="flex items-center gap-2 mb-8">
                      <Trophy weight="fill" className="w-5 h-5 text-[var(--color-primary)]" />
                      <h4 className="text-lg font-bold text-[var(--color-secondary)]">Results</h4>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                      {study.results.map((result, resultIndex) => (
                        <motion.div
                          key={resultIndex}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: resultIndex * 0.1 }}
                          className="text-center p-4 bg-[var(--color-gray-50)] rounded-2xl"
                        >
                          <div
                            className="text-3xl lg:text-4xl font-bold mb-1"
                            style={{ color: study.color }}
                          >
                            {result.metric}
                          </div>
                          <div className="text-sm text-[var(--color-gray-500)]">
                            {result.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative bg-gradient-to-br from-[var(--color-gray-50)] to-white rounded-2xl p-6 lg:p-8 border border-gray-100">
                      <Quotes
                        weight="fill"
                        className="absolute top-4 left-4 w-10 h-10"
                        style={{ color: `${study.color}20` }}
                      />
                      <blockquote className="relative pl-8">
                        <p className="text-[var(--color-gray-600)] text-lg italic leading-relaxed">
                          &ldquo;{study.quote}&rdquo;
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: study.color }}
                          >
                            {study.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-[var(--color-secondary)]">
                              {study.author}
                            </div>
                            <div className="text-sm text-[var(--color-gray-500)]">
                              {study.role}
                            </div>
                          </div>
                        </div>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-light)] to-[var(--color-primary-900)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary)]/20 rounded-full blur-[120px]" />
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
              Ready to Become Our Next <span className="text-[var(--color-primary-light)]">Success Story?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-10">
              Join hundreds of businesses that have simplified their tech and saved money with Insero. Schedule your free consultation today.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
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
