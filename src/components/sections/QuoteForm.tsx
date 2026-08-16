'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CheckCircle, PaperPlaneRight, WarningCircle } from '@phosphor-icons/react';
import { submitContactForm, type ContactFormData } from '@/app/contact/actions';
import { trackLead } from '@/lib/analytics';

// --- Shared on-page quote form --------------------------------------------
//
// /ringcentral and /zoom each carried a near-identical private copy of this.
// They differ only in card shape, the fill behind the success tick, and four
// strings — every colour resolved to the same token on both pages
// (INK === MIDNIGHT === var(--color-secondary), PRIMARY === BLUE,
// PRIMARY_DARK === BLUE_TEXT), so nothing here needs a palette prop.
//
// Submission reuses the /contact server action, so leads land in the same
// table as every other lead. The source is tagged through the existing
// `service` column because the schema has no dedicated source field.

interface QuoteFormValues {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  _hp?: string;
}

export interface QuoteFormProps {
  /** Prefixes every field id so two forms could coexist on one page. */
  idPrefix: string;
  /** Written to the lead's `service` column, e.g. 'Zoom (source: zoom-page)'. */
  serviceTag: string;
  /** GA4 `lead_source` parameter, e.g. 'zoom-page'. */
  leadSource: string;
  submitLabel: string;
  successBody: string;
  messagePlaceholder: string;
  /** Wrapper shape. Defaults to the bordered rounded-xl card /ringcentral uses. */
  cardClassName?: string;
  /** Fill behind the success tick, as a class. Mutually exclusive with the colour below. */
  successIconBgClassName?: string;
  /** Fill behind the success tick, as a CSS colour. */
  successIconBgColor?: string;
}

const INK = 'var(--color-secondary)';
const PRIMARY = 'var(--color-primary)';
const PRIMARY_DARK = 'var(--color-primary-dark)';

const DEFAULT_CARD = 'rounded-xl bg-white border border-[var(--color-gray-200)] shadow-sm';

export function QuoteForm({
  idPrefix,
  serviceTag,
  leadSource,
  submitLabel,
  successBody,
  messagePlaceholder,
  cardClassName = DEFAULT_CARD,
  successIconBgClassName = 'bg-primary/10',
  successIconBgColor,
}: QuoteFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formLoadedAt] = useState(() => Date.now());
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>();

  const onSubmit = async (data: QuoteFormValues) => {
    setSubmitError(null);
    const trimmedName = data.name.trim();
    const firstSpace = trimmedName.indexOf(' ');
    const firstName = firstSpace === -1 ? trimmedName : trimmedName.slice(0, firstSpace);
    const lastName = firstSpace === -1 ? '' : trimmedName.slice(firstSpace + 1).trim();

    const formData: ContactFormData = {
      firstName,
      lastName,
      email: data.email,
      phone: data.phone || undefined,
      company: data.company || undefined,
      // Tag the lead source through the existing service field.
      services: [serviceTag],
      message: data.message || undefined,
      _hp: data._hp,
      _t: formLoadedAt,
    };

    const result = await submitContactForm(formData);
    if (result.success) {
      // `ref`, not `success`: the action also answers success for blocked spam
      // and for runs where Supabase is unconfigured, and neither wrote a lead.
      // Fired here rather than from the success view because that view can be
      // re-entered via "Send another request", which would double-count.
      if (result.ref) {
        trackLead({ form_name: 'quote', lead_source: leadSource, page_path: pathname });
      }
      setIsSubmitted(true);
    } else {
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-xl border-2 bg-white text-secondary transition-colors focus:outline-none';
  const okBorder = 'border-[var(--color-gray-200)] focus:border-primary';
  const errBorder = 'border-red-400 focus:border-red-500';

  if (isSubmitted) {
    return (
      <div className={`${cardClassName} p-8 lg:p-12 text-center`}>
        <div
          className={`w-20 h-20 rounded-full ${successIconBgClassName} flex items-center justify-center mx-auto mb-6`}
          style={{ color: PRIMARY, ...(successIconBgColor ? { backgroundColor: successIconBgColor } : {}) }}
        >
          <CheckCircle weight="fill" className="w-10 h-10" />
        </div>
        <h3 className="text-2xl lg:text-3xl font-display font-bold mb-3" style={{ color: INK }}>
          Thanks — we&apos;ve got it
        </h3>
        <p className="text-[var(--color-gray-500)] max-w-md mx-auto mb-8">{successBody}</p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setSubmitError(null);
            reset();
          }}
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-full border-2 transition-colors"
          style={{ color: PRIMARY_DARK, borderColor: PRIMARY_DARK }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className={`${cardClassName} p-8 lg:p-10`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Honeypot — hidden from real users */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
          <label htmlFor={`${idPrefix}-website`}>Website</label>
          <input type="text" id={`${idPrefix}-website`} tabIndex={-1} autoComplete="off" {...register('_hp')} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={`${idPrefix}-name`} className="block text-sm font-semibold mb-2" style={{ color: INK }}>Name *</label>
            <input
              type="text" id={`${idPrefix}-name`}
              {...register('name', { required: 'Name is required' })}
              className={`${inputClass} ${errors.name ? errBorder : okBorder}`}
              placeholder="Jane Smith"
            />
            {errors.name && <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor={`${idPrefix}-email`} className="block text-sm font-semibold mb-2" style={{ color: INK }}>Email *</label>
            <input
              type="email" id={`${idPrefix}-email`}
              {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })}
              className={`${inputClass} ${errors.email ? errBorder : okBorder}`}
              placeholder="jane@company.com"
            />
            {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={`${idPrefix}-phone`} className="block text-sm font-semibold mb-2" style={{ color: INK }}>Phone</label>
            <input
              type="tel" id={`${idPrefix}-phone`} {...register('phone')}
              className={`${inputClass} ${okBorder}`}
              placeholder="(123) 456-7890"
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-company`} className="block text-sm font-semibold mb-2" style={{ color: INK }}>Company</label>
            <input
              type="text" id={`${idPrefix}-company`} {...register('company')}
              className={`${inputClass} ${okBorder}`}
              placeholder="Your Company Inc."
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${idPrefix}-message`} className="block text-sm font-semibold mb-2" style={{ color: INK }}>How can we help?</label>
          <textarea
            id={`${idPrefix}-message`} {...register('message')} rows={3}
            className={`${inputClass} ${okBorder} resize-none`}
            placeholder={messagePlaceholder}
          />
        </div>

        {submitError && (
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <WarningCircle weight="fill" className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-accent-cta text-white font-semibold text-lg rounded-full shadow-lg shadow-accent-cta/25 hover:bg-[var(--color-accent-cta-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span>Sending…</span>
          ) : (
            <>
              <span>{submitLabel}</span>
              <PaperPlaneRight weight="fill" className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-sm text-[var(--color-gray-500)] text-center">
          By submitting, you agree to be contacted about your quote. We never share your information.
        </p>
      </form>
    </div>
  );
}

export default QuoteForm;
