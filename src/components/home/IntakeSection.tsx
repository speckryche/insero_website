'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { submitHomeIntake } from '@/app/actions/homeIntake';
import { HOME_INTAKE_SERVICES, type HomeIntakeService } from '@/data/home-intake';
import { trackLead } from '@/lib/analytics';

type FormValues = {
  address: string;
  name: string;
  email: string;
  businessName: string;
  _hp?: string;
};

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1FA855"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** #get-started: address-first intake that becomes a portal opportunity. */
export function IntakeSection() {
  const pathname = usePathname();
  const [formLoadedAt] = useState(() => Date.now());
  const [services, setServices] = useState<HomeIntakeService[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const toggle = (s: HomeIntakeService) =>
    setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const onSubmit = async (data: FormValues) => {
    setSubmitError(null);
    const result = await submitHomeIntake({
      address: data.address,
      services,
      name: data.name,
      email: data.email,
      businessName: data.businessName || undefined,
      _hp: data._hp,
      _t: formLoadedAt,
    });
    if (result.success) {
      // `ref`, not `success`: spam is answered with success on purpose and
      // must not count as a lead.
      if (result.ref) {
        trackLead({ form_name: 'home-intake', lead_source: 'homepage', page_path: pathname });
      }
      setSubmitted(true);
    } else {
      setSubmitError(result.error || 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <section className="hm-intake" id="get-started" aria-labelledby="hm-intake-title">
      <div className="hm-wrap hm-grid">
        <div>
          <div className="hm-eyebrow" style={{ color: '#1FA855' }}>
            Start here
          </div>
          <h2 id="hm-intake-title">
            Give us an address.
            <br />
            We&apos;ll send back every option.
          </h2>
          <ul className="hm-promise">
            <li>
              <Check />
              <span>
                <b>Every carrier</b> that serves your address, checked by a real person
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>Side by side</b>, in plain English, usually within a couple of business days
              </span>
            </li>
            <li>
              <Check />
              <span>
                <b>$0 to you.</b> Carriers pay us. You never do.
              </span>
            </li>
          </ul>
        </div>

        <div className="hm-form">
          {submitted ? (
            <div className="hm-done" role="status">
              <Check />
              <h3>Got it. Thank you.</h3>
              <p>
                We&apos;ll check every carrier at your address and send your side-by-side, usually within a
                couple of business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot: hidden from people, filled by bots. */}
              <div className="hm-hp" aria-hidden="true">
                <label htmlFor="hm-website">Website</label>
                <input type="text" id="hm-website" tabIndex={-1} autoComplete="off" {...register('_hp')} />
              </div>

              <label htmlFor="hm-address" className="hm-first">
                Business address
              </label>
              <div className="hm-addr">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#008838"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                <input
                  id="hm-address"
                  placeholder="123 Main St, Medford, OR"
                  autoComplete="street-address"
                  aria-invalid={errors.address ? 'true' : 'false'}
                  aria-describedby={errors.address ? 'hm-address-err' : undefined}
                  {...register('address', {
                    required: 'Please enter your business address',
                    validate: (v) => v.trim().length > 0 || 'Please enter your business address',
                  })}
                />
              </div>
              {errors.address && (
                <div className="hm-err" id="hm-address-err">
                  {errors.address.message}
                </div>
              )}

              <fieldset>
                <legend className="hm-legend">What do you need?</legend>
                <div className="hm-chips">
                  {HOME_INTAKE_SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      aria-pressed={services.includes(s)}
                      onClick={() => toggle(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="hm-row2">
                <div>
                  <label htmlFor="hm-name">Name</label>
                  <input
                    id="hm-name"
                    autoComplete="name"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'hm-name-err' : undefined}
                    {...register('name', {
                      required: 'Please enter your name',
                      validate: (v) => v.trim().length > 0 || 'Please enter your name',
                    })}
                  />
                  {errors.name && (
                    <div className="hm-err" id="hm-name-err">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="hm-email">Email</label>
                  <input
                    id="hm-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'hm-email-err' : undefined}
                    {...register('email', {
                      required: 'Please enter your email',
                      pattern: { value: EMAIL_RE, message: 'Please enter a valid email' },
                    })}
                  />
                  {errors.email && (
                    <div className="hm-err" id="hm-email-err">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>

              <label htmlFor="hm-business">
                Business name <span className="hm-opt">(optional)</span>
              </label>
              <input id="hm-business" autoComplete="organization" {...register('businessName')} />

              <button className="hm-btn" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Get my side-by-side →'}
              </button>
              {submitError && (
                <div className="hm-submit-err" role="alert">
                  {submitError}
                </div>
              )}
              <div className="hm-fine">More than one location? Add them after. No spam, no pushy calls.</div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default IntakeSection;
