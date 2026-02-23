'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  CheckCircle,
  WarningCircle,
  ArrowRight,
  CurrencyDollar,
  ShieldWarning,
  Lightbulb,
  ClipboardText,
  EnvelopeSimple,
  ChartBar,
  Handshake,
  Trophy,
  PiggyBank,
  Phone,
} from '@phosphor-icons/react';
import { company } from '@/config/company';
import { FAQ } from '@/components/sections/FAQ';
import { submitAuditForm, AuditFormData } from './actions';

// ── Data ──────────────────────────────────────────────

const painPoints = [
  {
    icon: CurrencyDollar,
    title: "You're Probably Overpaying",
    description:
      "Most businesses haven't reviewed their telecom in years. Rate increases, unused features, and outdated plans add up. We typically find $200\u2013$500/month in wasted spend.",
  },
  {
    icon: ShieldWarning,
    title: 'You Have a Single Point of Failure',
    description:
      'If your internet goes down, so do your phones, payment processing, and cloud apps. 73% of SMBs have zero redundancy.',
  },
  {
    icon: Lightbulb,
    title: "You're Missing Better Options",
    description:
      "The telecom market changes fast. Solutions that didn't exist when you signed your last contract could save you money and give you more features.",
  },
];

const auditIncludes = [
  'Line-by-line bill analysis across all your telecom services',
  'Price benchmarking against 25+ carriers (Comcast, Spectrum, RingCentral, Nextiva, AT&T, and more)',
  'Redundancy risk assessment with a clear Red/Yellow/Green score',
  'Technology gap analysis \u2014 are you missing features your competitors use?',
  'Custom recommendations with projected savings',
  'A professional assessment report you can share with your team',
];

const steps = [
  {
    icon: ClipboardText,
    step: '01',
    title: 'Request Your Assessment',
    description: 'Fill out the form below. Takes 2 minutes.',
  },
  {
    icon: EnvelopeSimple,
    step: '02',
    title: 'Send Us Your Bills',
    description:
      "We'll ask for your last 2\u20133 months of telecom invoices. We do all the analysis.",
  },
  {
    icon: ChartBar,
    step: '03',
    title: 'Get Your Results',
    description:
      'We present a clear report showing where you can save and where you\u2019re exposed. No obligation to act.',
  },
];

const stats = [
  { value: '38%', label: 'Average Savings Found', icon: PiggyBank },
  { value: '500+', label: 'Businesses Assessed', icon: Handshake },
  { value: '25+', label: 'Carrier Partners Compared', icon: Trophy },
  { value: '$2M+', label: 'Client Savings Identified', icon: CurrencyDollar },
];

const faqItems = [
  {
    question: 'What does the assessment cost?',
    answer:
      'Nothing. Our consulting services are completely free. Carriers compensate us when we help you find a better solution.',
  },
  {
    question: 'How long does the assessment take?',
    answer:
      'The form takes 2 minutes. The assessment itself takes a few days once we receive your bills. The results presentation is a 30\u201345 minute meeting.',
  },
  {
    question: 'Do I have to switch providers?',
    answer:
      "No. If we find you already have the best deal, we'll tell you. There's zero obligation to change anything.",
  },
  {
    question: 'How do you make money?',
    answer:
      'We\u2019re a carrier broker, similar to an insurance broker. Carriers compensate us directly when you choose to implement one of our recommendations. You never pay us anything.',
  },
  {
    question: "I'm locked into a contract. Can you still help?",
    answer:
      'Absolutely. In fact, getting assessed before your renewal is the best time. Most contracts auto-renew 60\u201390 days before expiration. We help you prepare better options before that window closes.',
  },
  {
    question: 'Is my billing information safe?',
    answer:
      'Yes. We treat all billing information as strictly confidential and use it only for the purposes of your assessment.',
  },
];

const employeeOptions = ['1-10', '11-25', '26-50', '51-100', '100+'];
const spendOptions = [
  'Under $500',
  '$500-$1,000',
  '$1,000-$3,000',
  '$3,000-$5,000',
  '$5,000+',
  'Not Sure',
];

// ── Animations ────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── Helpers ───────────────────────────────────────────

function scrollToForm() {
  document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
}

// ── Component ─────────────────────────────────────────

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  employeeCount: string;
  telecomSpend: string;
  frustration: string;
  _hp?: string;
}

export function AuditPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formLoadedAt] = useState(() => Date.now());

  const heroRef = useRef(null);
  const painRef = useRef(null);
  const includesRef = useRef(null);
  const howRef = useRef(null);
  const statsRef = useRef(null);
  const formRef = useRef(null);
  const ctaRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const painInView = useInView(painRef, { once: true, margin: '-100px' });
  const includesInView = useInView(includesRef, { once: true, margin: '-100px' });
  const howInView = useInView(howRef, { once: true, margin: '-100px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const formInView = useInView(formRef, { once: true, margin: '-100px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const payload: AuditFormData = {
      fullName: data.fullName,
      company: data.company,
      email: data.email,
      phone: data.phone,
      employeeCount: data.employeeCount,
      telecomSpend: data.telecomSpend,
      frustration: data.frustration || undefined,
      _hp: data._hp,
      _t: formLoadedAt,
    };
    const result = await submitAuditForm(payload);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-light)] to-[var(--color-primary-900)] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
              style={{
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              Is Your Business{' '}
              <span
                className="text-[var(--color-primary-light)]"
                style={{ textShadow: '0 2px 10px rgba(51, 186, 171, 0.5)' }}
              >
                Overpaying
              </span>{' '}
              for Internet &amp; Phone Service?
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-10"
              style={{
                color: '#e0f2fe',
                textShadow: '0 1px 3px rgba(0,0,0,0.4)',
              }}
            >
              Find out in 15 minutes. Our free Telecom Cost &amp; Risk Assessment compares your
              current setup against 25+ carriers to find savings and eliminate risk.
            </p>

            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
            >
              <span>Request Your Free Assessment</span>
              <ArrowRight
                weight="bold"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/50 text-sm"
            >
              {['Free', 'No Obligation', 'Carrier-Agnostic', '500+ Businesses Served'].map(
                (badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
                    <span>{badge}</span>
                  </div>
                ),
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--color-gray-50)] to-transparent" />
      </section>

      {/* ── Pain Points ──────────────────────────────── */}
      <section
        ref={painRef}
        className="relative py-24 lg:py-32 bg-[var(--color-gray-50)] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={painInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-secondary)] mb-6 leading-tight">
              What Most Businesses{' '}
              <span className="text-[var(--color-accent)]">Don&apos;t Know</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={painInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {painPoints.map((point, index) => (
              <motion.div key={index} variants={itemVariants} className="group relative">
                <div className="relative bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100 h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-accent)] transition-colors duration-300">
                      <point.icon
                        weight="fill"
                        className="w-8 h-8 text-[var(--color-accent)] group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[var(--color-secondary)] mb-4 leading-tight">
                    {point.title}
                  </h3>
                  <p className="text-[var(--color-gray-500)] leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ──────────────────────────── */}
      <section ref={includesRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={includesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[var(--color-secondary)] mb-6 leading-tight">
              What&apos;s Included in Your{' '}
              <span className="text-gradient">Free Assessment</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={includesInView ? 'visible' : 'hidden'}
            className="max-w-3xl mx-auto"
          >
            <div className="space-y-4">
              {auditIncludes.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-5 bg-[var(--color-gray-50)] rounded-xl border border-gray-100 hover:border-[var(--color-primary)]/30 hover:shadow-md transition-all duration-300"
                >
                  <CheckCircle
                    weight="fill"
                    className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-0.5"
                  />
                  <span className="text-[var(--color-gray-600)] leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA under checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={includesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 transition-all duration-300"
            >
              <span>Request Your Free Assessment</span>
              <ArrowRight
                weight="bold"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section
        ref={howRef}
        className="relative py-24 lg:py-32 bg-[var(--color-secondary)] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              <span style={{ color: '#ffffff' }}>How It</span>{' '}
              <span className="text-[var(--color-primary)]">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                <div className="relative group">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-10 text-center border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.08]">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={howInView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                      className="absolute -top-5 left-1/2 -translate-x-1/2"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-[var(--color-primary)]/30">
                          {step.step}
                        </div>
                        <div className="absolute inset-0 bg-[var(--color-primary)] rounded-full blur-xl opacity-30" />
                      </div>
                    </motion.div>

                    <div className="relative inline-flex mb-6 mt-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-primary)]/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <step.icon weight="fill" className="w-10 h-10 text-[var(--color-primary)]" />
                      </div>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-bold mb-4" style={{ color: '#ffffff' }}>
                      {step.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <ArrowRight
                        weight="bold"
                        className="w-6 h-6 text-[var(--color-primary)] rotate-90"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof / Stats ─────────────────────── */}
      <section ref={statsRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)]/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)] rounded-2xl p-8 lg:p-12">
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-[var(--color-primary)]/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
              </div>

              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-xl mb-4">
                      <stat.icon weight="fill" className="w-7 h-7 text-[var(--color-primary)]" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-white/60 font-medium text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Audit Request Form ───────────────────────── */}
      <section
        id="audit-form"
        ref={formRef}
        className="scroll-mt-24 relative py-24 lg:py-32 bg-[var(--color-gray-50)] overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[var(--color-secondary)] mb-4 leading-tight">
              Request Your <span className="text-gradient">Free Assessment</span>
            </h2>
            <p className="text-lg text-[var(--color-gray-500)] max-w-xl mx-auto">
              Fill out the form below and we&apos;ll be in touch within one business day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-lg">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-[var(--color-internet)]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle weight="fill" className="w-10 h-10 text-[var(--color-internet)]" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-secondary)] mb-3">
                    Thank You!
                  </h3>
                  <p className="text-[var(--color-gray-500)] max-w-md mx-auto">
                    Thanks! We&apos;ll be in touch within 1 business day to get started on your
                    assessment.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field — hidden from humans, visible to bots */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('_hp')}
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-[var(--color-secondary)] mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      {...register('fullName', { required: 'Full name is required' })}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${
                        errors.fullName
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-[var(--color-primary)]'
                      } focus:outline-none`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-[var(--color-secondary)] mb-2"
                    >
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      {...register('company', { required: 'Company name is required' })}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${
                        errors.company
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-gray-200 focus:border-[var(--color-primary)]'
                      } focus:outline-none`}
                      placeholder="Your Company Inc."
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.company.message}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-[var(--color-secondary)] mb-2"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          },
                        })}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${
                          errors.email
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-[var(--color-primary)]'
                        } focus:outline-none`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-[var(--color-secondary)] mb-2"
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Employee Count & Telecom Spend */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="employeeCount"
                        className="block text-sm font-semibold text-[var(--color-secondary)] mb-2"
                      >
                        Number of Employees *
                      </label>
                      <select
                        id="employeeCount"
                        {...register('employeeCount', {
                          required: 'Please select employee count',
                        })}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${
                          errors.employeeCount
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-[var(--color-primary)]'
                        } focus:outline-none`}
                      >
                        <option value="">Select...</option>
                        {employeeOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.employeeCount && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.employeeCount.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="telecomSpend"
                        className="block text-sm font-semibold text-[var(--color-secondary)] mb-2"
                      >
                        Monthly Telecom Spend *
                      </label>
                      <select
                        id="telecomSpend"
                        {...register('telecomSpend', {
                          required: 'Please select approximate spend',
                        })}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${
                          errors.telecomSpend
                            ? 'border-red-400 focus:border-red-500'
                            : 'border-gray-200 focus:border-[var(--color-primary)]'
                        } focus:outline-none`}
                      >
                        <option value="">Select...</option>
                        {spendOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.telecomSpend && (
                        <p className="mt-1.5 text-sm text-red-500">
                          {errors.telecomSpend.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Frustration */}
                  <div>
                    <label
                      htmlFor="frustration"
                      className="block text-sm font-semibold text-[var(--color-secondary)] mb-2"
                    >
                      What&apos;s your biggest frustration?{' '}
                      <span className="font-normal text-[var(--color-gray-400)]">(optional)</span>
                    </label>
                    <textarea
                      id="frustration"
                      {...register('frustration')}
                      rows={3}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your current telecom pain points..."
                    />
                  </div>

                  {/* Error */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <WarningCircle weight="fill" className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-xl shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <span>Request My Free Assessment</span>
                    )}
                  </motion.button>

                  <p className="text-sm text-[var(--color-gray-400)] text-center">
                    By submitting this form, you agree to be contacted about our services. We
                    respect your privacy and will never share your information.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <FAQ items={faqItems} />

      {/* ── Final CTA ────────────────────────────────── */}
      <section ref={ctaRef} className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(51, 186, 171, 0.4) 0%, transparent 60%)',
            }}
          />
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight"
            >
              <span
                style={{
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                Ready to Find Out
              </span>
              <br />
              <span className="text-gradient">What You&apos;re Really Paying?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Request your free assessment today. 15 minutes could save you thousands.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-4 px-10 py-5 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
              >
                <span>Get Your Free Assessment</span>
                <ArrowRight
                  weight="bold"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                />
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href={company.phoneLink}
                className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-lg"
              >
                <Phone weight="fill" className="w-5 h-5" />
                <span>or call us at</span>
                <span className="font-semibold text-white/70 hover:text-[var(--color-primary)] transition-colors">
                  {company.phoneFormatted}
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
