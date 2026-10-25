'use client';

import { useId, useState, type CSSProperties, type FormEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { submitContactForm } from '@/app/contact/actions';
import { trackLead } from '@/lib/analytics';

/*
 * "How can we help?" with the lead form (spec section.cta3). This is the
 * page's #get-started target.
 *
 * Submits through the same server action as /contact, so the row it writes
 * to website_leads is the shape the portal's on_website_lead_created trigger
 * already turns into an opportunity. Same honeypot and fill-time spam check
 * too. No service is sent, so the lead can never take the trigger's audit
 * branch.
 */

// Floating carrier chips around the card. Positions, tilts and phase offsets
// are the spec's.
const CHIPS: { name: string; src: string; pos: CSSProperties; r: string }[] = [
  { name: 'AT&T', src: '/home/carriers/att.svg', pos: { top: -20, left: -225 }, r: '-6deg' },
  { name: 'RingCentral', src: '/home/carriers/ringcentral.svg', pos: { top: -28, right: -215 }, r: '5deg' },
  { name: 'Comcast Business', src: '/home/carriers/comcast.svg', pos: { top: '45%', left: -240 }, r: '4deg' },
  { name: 'Zoom', src: '/home/carriers/zoom.png', pos: { top: '40%', right: -236 }, r: '-4deg' },
  { name: 'Nextiva', src: '/home/carriers/nextiva.svg', pos: { bottom: -70, left: -200 }, r: '5deg' },
  { name: 'Lumen', src: '/home/carriers/lumen.png', pos: { bottom: -78, right: -195 }, r: '-5deg' },
  { name: 'Ziply Fiber', src: '/home/carriers/ziply.svg', pos: { bottom: -120, left: '22%' }, r: '3deg' },
  { name: 'Spectrum Business', src: '/home/carriers/spectrum.png', pos: { bottom: -130, left: '58%' }, r: '-3deg' },
];

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

type Fields = {
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  _hp: string;
};

const EMPTY: Fields = { company: '', firstName: '', lastName: '', email: '', phone: '', message: '', _hp: '' };

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.company.trim()) e.company = 'Please enter your company name.';
  if (!f.firstName.trim()) e.firstName = 'Please enter your first name.';
  if (!f.lastName.trim()) e.lastName = 'Please enter your last name.';
  if (!f.email.trim()) e.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  return e;
}

const label = 'block text-[14px] font-extrabold text-[#14202c]';
const input =
  'mt-[7px] block w-full rounded-[14px] border-[1.5px] border-[#cfd6dc] px-[16px] py-[14px] font-[inherit] text-[18px] font-medium text-[#14202c] outline-none focus:border-green-bright aria-invalid:border-[#c0362c]';
const errText = 'mt-[6px] block text-[13px] font-semibold text-[#b42318]';

export function CtaFormSection() {
  const id = useId();
  const pathname = usePathname();
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const [loadedAt] = useState(() => Date.now());

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    if (errors[k]) setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFailed(null);
    const found = validate(f);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    setSending(true);
    try {
      const result = await submitContactForm({
        company: f.company.trim(),
        firstName: f.firstName.trim(),
        lastName: f.lastName.trim(),
        email: f.email.trim(),
        phone: f.phone.trim() || undefined,
        message: f.message.trim() || undefined,
        _hp: f._hp,
        _t: loadedAt,
      });
      if (result.success) {
        // `ref`, not `success`: blocked spam also answers success without a lead.
        if (result.ref) trackLead({ form_name: 'home-cta', page_path: pathname });
        setDone(true);
      } else {
        setFailed(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setFailed('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const field = (k: keyof Fields) => ({
    id: `${id}-${k}`,
    value: f[k],
    onChange: set(k),
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${id}-${k}-err` : undefined,
  });
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <span id={`${id}-${k}-err`} className={errText}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <section
      aria-labelledby={`${id}-h`}
      className="relative overflow-hidden bg-[#d8f1e0] px-[5vw] py-[12vh] text-center font-display text-[#14202c]"
    >
      <div className="mx-auto max-w-[760px]">
        <h2
          id={`${id}-h`}
          className="text-[clamp(34px,3.9vw,62px)] font-extrabold! leading-[1.06]! tracking-[-.025em] text-[#14202c]!"
        >
          How can we help?
          <br />
          <em className="text-green-bright not-italic">We&apos;ll do the legwork.</em>
        </h2>
        <p className="mt-[14px] text-[clamp(16px,1.25vw,19px)] leading-[1.5] text-[#33475b]">
          We find all carrier options, negotiate the quotes, and help you decide what meets your needs the best. Free
          to you, no commitment.
        </p>

        <div className="relative mt-[max(7vh,64px)] mb-[max(13vh,130px)]">
          {CHIPS.map((c, i) => (
            <span
              key={c.name}
              aria-hidden="true"
              style={{ ...c.pos, '--r': c.r, animationDelay: `${-i * 0.75}s` } as CSSProperties}
              className="absolute z-[1] grid h-[58px] w-[150px] [transform:rotate(var(--r))] animate-[hm-bob_4.6s_ease-in-out_infinite] place-items-center rounded-[16px] bg-white shadow-[0_12px_30px_rgba(20,32,44,.1)] max-[1181px]:hidden motion-reduce:animate-none"
            >
              {/* Decorative: the same carriers are named in the logo band above. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.src} alt="" className="max-h-[26px] max-w-[104px]" loading="lazy" decoding="async" />
            </span>
          ))}

          <div
            id="get-started"
            className="relative z-[2] w-full scroll-mt-[calc(var(--header-h)+16px)] rounded-[24px] bg-white p-[clamp(24px,2.6vw,40px)] text-left shadow-[0_30px_70px_rgba(20,32,44,.16)]"
          >
            {done ? (
              <div role="status" className="py-[40px] text-center">
                <p className="text-[clamp(22px,2vw,28px)] font-extrabold text-[#14202c]">
                  Thanks — we&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-busy={sending}>
                {/* Honeypot, same as /contact: hidden from people, filled by bots. */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}
                >
                  <label htmlFor={`${id}-_hp`}>Website</label>
                  <input type="text" tabIndex={-1} autoComplete="off" {...field('_hp')} />
                </div>

                <label className={label} htmlFor={`${id}-company`}>
                  Company name <b className="text-green-text">*</b>
                </label>
                <input
                  className={input}
                  required
                  autoComplete="organization"
                  placeholder="Company name"
                  {...field('company')}
                />
                {err('company')}

                <div className="mt-[16px] grid grid-cols-2 gap-[16px] max-[560px]:grid-cols-1">
                  <div>
                    <label className={label} htmlFor={`${id}-firstName`}>
                      First name <b className="text-green-text">*</b>
                    </label>
                    <input
                      className={input}
                      required
                      autoComplete="given-name"
                      placeholder="First name"
                      {...field('firstName')}
                    />
                    {err('firstName')}
                  </div>
                  <div>
                    <label className={label} htmlFor={`${id}-lastName`}>
                      Last name <b className="text-green-text">*</b>
                    </label>
                    <input
                      className={input}
                      required
                      autoComplete="family-name"
                      placeholder="Last name"
                      {...field('lastName')}
                    />
                    {err('lastName')}
                  </div>
                </div>

                <div className="mt-[16px] grid grid-cols-2 gap-[16px] max-[560px]:grid-cols-1">
                  <div>
                    <label className={label} htmlFor={`${id}-email`}>
                      Email <b className="text-green-text">*</b>
                    </label>
                    <input
                      className={input}
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      {...field('email')}
                    />
                    {err('email')}
                  </div>
                  <div>
                    <label className={label} htmlFor={`${id}-phone`}>
                      Phone <span className="font-semibold text-[#8a97a3]">(optional)</span>
                    </label>
                    <input
                      className={input}
                      type="tel"
                      autoComplete="tel"
                      placeholder="(555) 555-5555"
                      {...field('phone')}
                    />
                  </div>
                </div>

                <label className={`${label} mt-[16px]`} htmlFor={`${id}-message`}>
                  What can we help with?
                </label>
                <textarea
                  rows={3}
                  placeholder="New internet, voice for a new office, a contract ending soon... anything."
                  className="mt-[7px] block min-h-[92px] w-full resize-y rounded-[14px] border-[1.5px] border-[#dfe5ea] bg-[#fbfcfd] px-[16px] py-[13px] font-[inherit] text-[17px] text-[#14202c] outline-none focus:border-green-bright focus:bg-white"
                  {...field('message')}
                />

                {failed && (
                  <p role="alert" className="mt-[16px] text-[15px] font-semibold text-[#b42318]">
                    {failed}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-[20px] block w-full cursor-pointer rounded-full border-0 bg-green-bright p-[17px] font-[inherit] text-[20px] font-extrabold text-white disabled:cursor-wait disabled:opacity-70"
                >
                  {sending ? 'Sending…' : "Let's Connect →"}
                </button>
                <p className="mx-auto mt-[10px] max-w-[46em] text-center text-[14px] leading-[1.5] text-[#5b6875]">
                  By submitting, you agree we can contact you about your request. We only share your details with
                  carriers as needed to get your quotes.{' '}
                  <Link href="/privacy" className="font-bold text-green-text">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaFormSection;
