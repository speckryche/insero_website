'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { usePathname } from 'next/navigation';
import { trackLead, trackContactClick } from '@/lib/analytics';
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  CheckCircle,
  PaperPlaneRight,
  Sparkle,
  WarningCircle,
} from '@phosphor-icons/react';
import { company } from '@/config/company';
import { submitContactForm, ContactFormData } from './actions';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  message: string;
  _hp?: string;
}

const services = [
  'Voice Connectivity',
  'Internet Connectivity',
  'SD-WAN & Redundancy',
  'Security',
  'Not Sure - Need Consultation',
];

const expectations = [
  'A short conversation to understand your needs — email or phone, your choice',
  'Custom recommendations based on your situation',
  'No obligation, no pressure sales tactics',
  'Zero cost to you - carriers pay us directly',
];

export function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formLoadedAt] = useState(() => Date.now());
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const formInView = useInView(formRef, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    const selectedServices = data.services?.filter(Boolean) || [];
    const formData: ContactFormData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      company: data.company || undefined,
      services: selectedServices.length > 0 ? selectedServices : undefined,
      message: data.message || undefined,
      _hp: data._hp,
      _t: formLoadedAt,
    };
    const result = await submitContactForm(formData);
    if (result.success) {
      // `ref`, not `success`: the action also answers success for blocked spam
      // and when Supabase is unconfigured, and neither wrote a lead. Fired here
      // rather than from the success view, which handleSendAnother can re-enter.
      if (result.ref) {
        trackLead({
          form_name: 'contact',
          lead_source: selectedServices.join(', ') || undefined,
          page_path: pathname,
        });
      }
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  const handleSendAnother = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    reset();
  };

  return (
    <>
      

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 lg:pt-40 pb-8 lg:pb-10 bg-white"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-[#1e293b]">
              Let&apos;s Figure Out How We Can <span className="text-[#008838]">Help</span>
            </h1>
            <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto">
              Tell us about your setup and we&apos;ll come back with options. No pressure, no obligation, no cost.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={formRef} className="relative py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4"
            >
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-[#1e293b] mb-4">
                Get in Touch
              </h2>
              <p className="text-[#64748b] mb-10">
                Fill out the form and we&apos;ll get back to you within one business day. Or reach out directly.
              </p>

              <div className="space-y-4">
                <a
                  href={company.phoneLink}
                onClick={() => trackContactClick({ method: 'phone' })}
                  className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[#f8fafb] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#008838]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#008838] transition-colors">
                    <Phone weight="fill" className="w-5 h-5 text-[#008838] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-gray-500)]">Phone</div>
                    <div className="font-semibold text-[#1e293b] group-hover:text-[#008838] transition-colors">
                      {company.phoneFormatted}
                    </div>
                  </div>
                </a>

                <a
                  href={company.emailLink}
                onClick={() => trackContactClick({ method: 'email' })}
                  className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[#f8fafb] transition-colors"
                >
                  <div className="w-12 h-12 bg-[#008838]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#008838] transition-colors">
                    <EnvelopeSimple weight="fill" className="w-5 h-5 text-[#008838] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-gray-500)]">Email</div>
                    <div className="font-semibold text-[#1e293b] group-hover:text-[#008838] transition-colors">
                      {company.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-[#008838]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin weight="fill" className="w-5 h-5 text-[#008838]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-gray-500)]">Location</div>
                    <div className="font-semibold text-[#1e293b]">{company.location.full}</div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-10 p-6 bg-[#e2e8ec] rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkle weight="fill" className="w-5 h-5 text-[#008838]" />
                  <h3 className="font-bold text-[#1e293b]">What to Expect</h3>
                </div>
                {/* #475569, not #64748b: this panel is #e2e8ec, where #64748b
                    measures 3.85:1 and misses AA for 14px text. #475569 is
                    6.13:1 on the same fill. */}
                <ul className="space-y-3">
                  {expectations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-[#475569] text-sm">
                      <CheckCircle weight="fill" className="w-5 h-5 text-[#008838] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <div className="bg-[#e2e8ec] rounded-3xl p-8 lg:p-10 border border-gray-200">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-[#008838]/15 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle weight="fill" className="w-10 h-10 text-[#008838]" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#1e293b] mb-3">
                      Thank You!
                    </h3>
                    <p className="text-[#64748b] mb-8 max-w-md mx-auto">
                      We&apos;ve received your message and will get back to you within one business day.
                    </p>
                    <button
                      onClick={handleSendAnother}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#008838] text-white font-semibold rounded-xl hover:bg-[#005C28] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Honeypot */}
                    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
                      <label htmlFor="contact-website">Website</label>
                      <input type="text" id="contact-website" tabIndex={-1} autoComplete="off" {...register('_hp')} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-[#1e293b] mb-2">First Name *</label>
                        <input
                          type="text" id="firstName" autoComplete="given-name"
                          {...register('firstName', { required: 'First name is required' })}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${errors.firstName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#008838]'} focus:outline-none`}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="mt-1.5 text-sm text-red-500">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-[#1e293b] mb-2">Last Name *</label>
                        <input
                          type="text" id="lastName" autoComplete="family-name"
                          {...register('lastName', { required: 'Last name is required' })}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${errors.lastName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#008838]'} focus:outline-none`}
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="mt-1.5 text-sm text-red-500">{errors.lastName.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-[#1e293b] mb-2">Email *</label>
                        <input
                          type="email" id="email" autoComplete="email"
                          {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#008838]'} focus:outline-none`}
                          placeholder="john@company.com"
                        />
                        {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-[#1e293b] mb-2">Phone</label>
                        <input
                          type="tel" id="phone" autoComplete="tel" {...register('phone')}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[#008838] focus:outline-none transition-colors"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="companyName" className="block text-sm font-semibold text-[#1e293b] mb-2">Company Name</label>
                      <input
                        type="text" id="companyName" autoComplete="organization" {...register('company')}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[#008838] focus:outline-none transition-colors"
                        placeholder="Your Company Inc."
                      />
                    </div>

                    <fieldset>
                      <legend className="block text-sm font-semibold text-[#1e293b] mb-3">
                        What services are you interested in? (Select all that apply)
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <label
                            key={service}
                            className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-white cursor-pointer hover:border-[#008838]/50 has-[:checked]:border-[#008838] has-[:checked]:bg-[#008838]/5 transition-colors"
                          >
                            <input
                              type="checkbox" value={service} aria-label={service}
                              {...register('services')}
                              className="w-5 h-5 rounded border-gray-300 text-[#008838] focus:ring-[#008838] focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="text-sm text-[#1e293b]">{service}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[#1e293b] mb-2">How can we help you?</label>
                      <textarea
                        id="message" {...register('message')} rows={4}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[#008838] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your current situation and what you're looking to achieve..."
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
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <PaperPlaneRight weight="fill" className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-sm text-[var(--color-gray-600)] text-center">
                      By submitting this form, you agree to be contacted about our services.
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
    </>
  );
}
