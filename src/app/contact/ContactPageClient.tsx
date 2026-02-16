'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
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
}

const services = [
  'Voice Connectivity',
  'Internet Connectivity',
  'SD-WAN & Redundancy',
  'Security',
  'Not Sure - Need Consultation',
];

const expectations = [
  '15-minute discovery call to understand your needs',
  'Custom recommendations based on your situation',
  'No obligation, no pressure sales tactics',
  'Zero cost to you - carriers pay us directly',
];

export function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    };

    const result = await submitContactForm(formData);

    if (result.success) {
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
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 bg-gradient-to-br from-[var(--color-secondary)] via-[var(--color-secondary-light)] to-[var(--color-primary-900)] overflow-hidden"
      >
        {/* Background decorations */}
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
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              Schedule Your <span className="text-[var(--color-primary-light)]" style={{ textShadow: '0 2px 10px rgba(51, 186, 171, 0.5)' }}>Free</span> Consultation
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto"
              style={{
                color: '#e0f2fe',
                textShadow: '0 1px 3px rgba(0,0,0,0.4)'
              }}
            >
              Ready to simplify your tech stack and save money? Let&apos;s talk. No pressure, no obligation, no cost.
            </p>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Contact Section */}
      <section ref={formRef} className="relative py-24 lg:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-[120px]" />
        </div>

        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="lg:col-span-4"
            >
              <h2 className="text-2xl lg:text-3xl font-display font-bold text-[var(--color-secondary)] mb-4">
                Get in Touch
              </h2>
              <p className="text-[var(--color-gray-500)] mb-10">
                Fill out the form and we&apos;ll get back to you within one business day. Or reach out directly.
              </p>

              <div className="space-y-6">
                <a
                  href={company.phoneLink}
                  className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--color-gray-50)] transition-colors"
                >
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
                    <Phone weight="fill" className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-gray-400)]">Phone</div>
                    <div className="font-semibold text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {company.phoneFormatted}
                    </div>
                  </div>
                </a>

                <a
                  href={company.emailLink}
                  className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--color-gray-50)] transition-colors"
                >
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors">
                    <EnvelopeSimple weight="fill" className="w-5 h-5 text-[var(--color-primary)] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-gray-400)]">Email</div>
                    <div className="font-semibold text-[var(--color-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {company.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin weight="fill" className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="text-sm text-[var(--color-gray-400)]">Location</div>
                    <div className="font-semibold text-[var(--color-secondary)]">{company.location.full}</div>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="mt-10 p-6 bg-gradient-to-br from-[var(--color-gray-50)] to-white rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkle weight="fill" className="w-5 h-5 text-[var(--color-primary)]" />
                  <h3 className="font-bold text-[var(--color-secondary)]">What to Expect</h3>
                </div>
                <ul className="space-y-3">
                  {expectations.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-[var(--color-gray-600)] text-sm">
                      <CheckCircle weight="fill" className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="lg:col-span-8"
            >
              <div className="bg-[var(--color-gray-50)] rounded-3xl p-8 lg:p-10 border border-gray-100">
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
                    <p className="text-[var(--color-gray-500)] mb-8 max-w-md mx-auto">
                      We&apos;ve received your message and will get back to you within one business day.
                    </p>
                    <button
                      onClick={handleSendAnother}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-full hover:bg-[var(--color-primary-dark)] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-[var(--color-secondary)] mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          {...register('firstName', { required: 'First name is required' })}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${
                            errors.firstName
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-gray-200 focus:border-[var(--color-primary)]'
                          } focus:outline-none`}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="mt-1.5 text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-[var(--color-secondary)] mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          {...register('lastName', { required: 'Last name is required' })}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 bg-white transition-colors ${
                            errors.lastName
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-gray-200 focus:border-[var(--color-primary)]'
                          } focus:outline-none`}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="mt-1.5 text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-secondary)] mb-2">
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
                        <label htmlFor="phone" className="block text-sm font-semibold text-[var(--color-secondary)] mb-2">
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

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-[var(--color-secondary)] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        {...register('company')}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                        placeholder="Your Company Inc."
                      />
                    </div>

                    <fieldset>
                      <legend className="block text-sm font-semibold text-[var(--color-secondary)] mb-3">
                        What services are you interested in? (Select all that apply)
                      </legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.map((service) => (
                          <label
                            key={service}
                            className="flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 bg-white cursor-pointer hover:border-[var(--color-primary)]/50 has-[:checked]:border-[var(--color-primary)] has-[:checked]:bg-[var(--color-primary)]/5 transition-colors"
                          >
                            <input
                              type="checkbox"
                              value={service}
                              aria-label={service}
                              {...register('services')}
                              className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-0 cursor-pointer"
                            />
                            <span className="text-sm text-[var(--color-secondary)]">{service}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-secondary)] mb-2">
                        How can we help you?
                      </label>
                      <textarea
                        id="message"
                        {...register('message')}
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                        placeholder="Tell us about your current situation and what you're looking to achieve..."
                      />
                    </div>

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

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-xl shadow-lg shadow-[var(--color-accent)]/25 hover:shadow-xl hover:shadow-[var(--color-accent)]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <PaperPlaneRight weight="fill" className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-sm text-[var(--color-gray-400)] text-center">
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

      {/* TODO: Add Calendly scheduling section here when ready
          - Section title: "Prefer to Schedule Directly?"
          - Description: "Pick a time that works for you and we'll call you for a 15-minute discovery conversation."
          - Embed Calendly widget for scheduling
      */}
    </>
  );
}
