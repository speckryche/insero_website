'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { trackLead, trackContactClick } from '@/lib/analytics';
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
    answer: 'Nothing. Our consulting services are completely free. Carriers compensate us when we help you find a better solution.',
  },
  {
    question: 'How long does the assessment take?',
    answer: 'The form takes 2 minutes. The assessment itself takes a few days once we receive your bills. The results presentation is a 30\u201345 minute meeting.',
  },
  {
    question: 'Do I have to switch providers?',
    answer: "No. If we find you already have the best deal, we'll tell you. There's zero obligation to change anything.",
  },
  {
    question: 'How do you make money?',
    answer: 'We\u2019re a carrier broker, similar to an insurance broker. Carriers compensate us directly when you choose to implement one of our recommendations. You never pay us anything.',
  },
  {
    question: "I'm locked into a contract. Can you still help?",
    answer: 'Absolutely. In fact, getting assessed before your renewal is the best time. Most contracts auto-renew 60\u201390 days before expiration. We help you prepare better options before that window closes.',
  },
  {
    question: 'Is my billing information safe?',
    answer: 'Yes. We treat all billing information as strictly confidential and use it only for the purposes of your assessment.',
  },
];

const employeeOptions = ['1-10', '11-25', '26-50', '51-100', '100+'];
const spendOptions = ['Under $500', '$500-$1,000', '$1,000-$3,000', '$3,000-$5,000', '$5,000+', 'Not Sure'];

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

function scrollToForm() {
  document.getElementById('audit-form')?.scrollIntoView({ behavior: 'smooth' });
}

export function AuditPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formLoadedAt] = useState(() => Date.now());

  const heroRef = useRef(null);
  const painRef = useRef(null);
  const includesRef = useRef(null);
  const howRef = useRef(null);
  const statsRef = useRef(null);
  const formRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const painInView = useInView(painRef, { once: true, margin: '-80px' });
  const includesInView = useInView(includesRef, { once: true, margin: '-80px' });
  const howInView = useInView(howRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const formInView = useInView(formRef, { once: true, margin: '-80px' });

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
      // See the contact form: success alone covers spam and unconfigured runs.
      if (result.ref) {
        trackLead({ form_name: 'audit', lead_source: 'audit-page', page_path: pathname });
      }
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <>
      

      {/* ── Hero ─────────────────────────────────────── */}
      <section ref={heroRef} className="relative pt-32 lg:pt-40 pb-16 lg:pb-20 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-[#1e293b]">
              Is Your Business{' '}
              <span className="text-[#008838]">Overpaying</span>{' '}
              for Internet &amp; Phone Service?
            </h1>
            <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto mb-10">
              Find out in 15 minutes. Our free Telecom Cost &amp; Risk Assessment compares your
              current setup against 25+ carriers to find savings and eliminate risk.
            </p>

            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20"
            >
              <span>Request Your Free Assessment</span>
              <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[#64748b] text-sm">
              {['Free', 'No Obligation', 'Carrier-Agnostic', '500+ Businesses Served'].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#008838] rounded-full" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Pain Points ──────────────────────────────── */}
      <section ref={painRef} className="py-24 lg:py-32 bg-[#f8fafb]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={painInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
              What Most Businesses{' '}
              <span className="text-[#008838]">Don&apos;t Know</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={painInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 136, 56, 0.1)' }}>
                      <point.icon weight="fill" className="w-7 h-7 text-[#008838]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3 leading-tight">{point.title}</h3>
                  <p className="text-[#64748b] leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ──────────────────────────── */}
      <section ref={includesRef} className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={includesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
              What&apos;s Included in Your{' '}
              <span className="text-[#008838]">Free Assessment</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {auditIncludes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={includesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.06 }}
                className="flex items-start gap-4 p-5 bg-[#f8fafb] rounded-xl border border-gray-200 hover:shadow-sm transition-shadow duration-300"
              >
                <CheckCircle weight="fill" className="w-6 h-6 text-[#008838] flex-shrink-0 mt-0.5" />
                <span className="text-[#475569] leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={includesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <button
              onClick={scrollToForm}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20"
            >
              <span>Request Your Free Assessment</span>
              <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section ref={howRef} className="py-24 lg:py-32 bg-[#f8fafb]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
              How It <span className="text-[#008838]">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.15 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 lg:p-10 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <div className="w-10 h-10 bg-[#008838] rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {step.step}
                    </div>
                  </div>
                  <div className="inline-flex mb-6 mt-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 136, 56, 0.08)' }}>
                      <step.icon weight="fill" className="w-8 h-8 text-[#008838]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3">{step.title}</h3>
                  <p className="text-[#64748b] leading-relaxed">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <ArrowRight weight="bold" className="w-5 h-5 text-[#008838] rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats — Green Bar ────────────────────────── */}
      <motion.div
        ref={statsRef}
        initial={{ opacity: 0, y: 16 }}
        animate={statsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bg-[#008838] py-6"
      >
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16 lg:gap-x-24">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-x-12">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold text-white">{stat.value}</div>
                  <div className="text-sm text-white/80 mt-1">{stat.label}</div>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-12 bg-white/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Audit Form ───────────────────────────────── */}
      <section
        id="audit-form"
        ref={formRef}
        className="scroll-mt-24 py-24 lg:py-32 bg-[#f8fafb]"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4 leading-tight">
              Request Your <span className="text-[#008838]">Free Assessment</span>
            </h2>
            <p className="text-lg text-[#64748b] max-w-xl mx-auto">
              Fill out the form below and we&apos;ll be in touch within one business day.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-3xl p-8 lg:p-10 border border-gray-200 shadow-sm">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 bg-[#008838]/15 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle weight="fill" className="w-10 h-10 text-[#008838]" />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#1e293b] mb-3">Thank You!</h3>
                  <p className="text-[#64748b] max-w-md mx-auto">
                    Thanks! We&apos;ll be in touch within 1 business day to get started on your assessment.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                    <label htmlFor="audit-website">Website</label>
                    <input type="text" id="audit-website" tabIndex={-1} autoComplete="off" {...register('_hp')} />
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-[#1e293b] mb-2">Full Name *</label>
                    <input
                      type="text" id="fullName"
                      {...register('fullName', { required: 'Full name is required' })}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#008838]'} focus:outline-none`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1.5 text-sm text-red-500">{errors.fullName.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="auditCompany" className="block text-sm font-semibold text-[#1e293b] mb-2">Company Name *</label>
                    <input
                      type="text" id="auditCompany"
                      {...register('company', { required: 'Company name is required' })}
                      className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${errors.company ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#008838]'} focus:outline-none`}
                      placeholder="Your Company Inc."
                    />
                    {errors.company && <p className="mt-1.5 text-sm text-red-500">{errors.company.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="auditEmail" className="block text-sm font-semibold text-[#1e293b] mb-2">Email *</label>
                      <input
                        type="email" id="auditEmail"
                        {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                        className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#008838]'} focus:outline-none`}
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label htmlFor="auditPhone" className="block text-sm font-semibold text-[#1e293b] mb-2">Phone</label>
                      <input
                        type="tel" id="auditPhone" {...register('phone')}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[#008838] focus:outline-none transition-colors"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>

                  {/* Employee Count */}
                  <fieldset>
                    <legend className="block text-sm font-semibold text-[#1e293b] mb-3">Number of Employees *</legend>
                    <div className="flex flex-wrap gap-3">
                      {employeeOptions.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white cursor-pointer hover:border-[#008838]/50 has-[:checked]:border-[#008838] has-[:checked]:bg-[#008838]/5 transition-colors"
                        >
                          <input
                            type="radio" value={option}
                            {...register('employeeCount', { required: 'Please select employee count' })}
                            className="w-4 h-4 text-[#008838] focus:ring-[#008838] cursor-pointer"
                          />
                          <span className="text-sm text-[#1e293b]">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.employeeCount && <p className="mt-1.5 text-sm text-red-500">{errors.employeeCount.message}</p>}
                  </fieldset>

                  {/* Telecom Spend */}
                  <fieldset>
                    <legend className="block text-sm font-semibold text-[#1e293b] mb-3">Monthly Telecom Spend *</legend>
                    <div className="flex flex-wrap gap-3">
                      {spendOptions.map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-white cursor-pointer hover:border-[#008838]/50 has-[:checked]:border-[#008838] has-[:checked]:bg-[#008838]/5 transition-colors"
                        >
                          <input
                            type="radio" value={option}
                            {...register('telecomSpend', { required: 'Please select spend range' })}
                            className="w-4 h-4 text-[#008838] focus:ring-[#008838] cursor-pointer"
                          />
                          <span className="text-sm text-[#1e293b]">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.telecomSpend && <p className="mt-1.5 text-sm text-red-500">{errors.telecomSpend.message}</p>}
                  </fieldset>

                  <div>
                    <label htmlFor="frustration" className="block text-sm font-semibold text-[#1e293b] mb-2">
                      What frustrates you most about your current telecom? (Optional)
                    </label>
                    <textarea
                      id="frustration" {...register('frustration')} rows={3}
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[#008838] focus:outline-none transition-colors resize-none"
                      placeholder="e.g., Costs keep going up, internet drops, outdated phone system..."
                    />
                  </div>

                  {submitError && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <WarningCircle weight="fill" className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl shadow-lg shadow-[#008838]/20 hover:bg-[#005C28] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <span>Request Your Free Assessment</span>
                        <ArrowRight weight="bold" className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <div className="[&>section]:!bg-white">
        <FAQ items={faqItems} />
      </div>

      {/* ── Bottom CTA ──────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#E6F5EC]">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-[#1e293b] mb-6">
              Still have questions?
            </h2>
            <p className="text-lg text-[#64748b] mb-8">
              We&apos;re happy to chat. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={company.phoneLink}
                onClick={() => trackContactClick({ method: 'phone' })}
                className="inline-flex items-center gap-3 text-[#1e293b] font-semibold text-lg hover:text-[#008838] transition-colors"
              >
                <div className="w-10 h-10 bg-[#008838]/10 rounded-xl flex items-center justify-center">
                  <Phone weight="fill" className="w-5 h-5 text-[#008838]" />
                </div>
                {company.phoneFormatted}
              </a>
              <a
                href={company.emailLink}
                onClick={() => trackContactClick({ method: 'email' })}
                className="inline-flex items-center gap-3 text-[#1e293b] font-semibold text-lg hover:text-[#008838] transition-colors"
              >
                <div className="w-10 h-10 bg-[#008838]/10 rounded-xl flex items-center justify-center">
                  <EnvelopeSimple weight="fill" className="w-5 h-5 text-[#008838]" />
                </div>
                {company.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}
