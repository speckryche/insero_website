'use client';

import { useId, useState } from 'react';

/*
 * "Questions? Answers." (spec section.faq). One open at a time, first open
 * by default; opening another closes the rest, and clicking the open one
 * closes it. Each question is a real button with aria-expanded.
 */

const QA = [
  {
    q: 'What does Insero cost?',
    a: 'Nothing. Carriers pay us when we help you find the right solution. Your price is never higher than going to the carrier yourself.',
  },
  {
    q: "If carriers pay you, won't you just push one?",
    a: 'No. We work with a long list of carriers, so we have no reason to favor one. We show you every option side by side and you pick.',
  },
  {
    q: 'What types of businesses do you work with?',
    a: 'Businesses of all sizes, from a single location to multiple sites across the country.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on the service. Simple voice setups can be running in days. Bigger projects like SD-WAN can take a few weeks. We give you a realistic timeline up front.',
  },
  {
    q: 'Do I have to switch everything at once?',
    a: 'Not at all. Many customers start with one service and add more later. No pressure.',
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <section aria-labelledby={`${id}-h`} className="bg-white px-[4vw] py-[16vh] font-display text-[#14202c]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] items-start gap-[6vw] max-[900px]:grid-cols-1">
        <div className="sticky top-[18vh] max-[900px]:static">
          <h2
            id={`${id}-h`}
            className="text-[clamp(34px,4vw,64px)] font-extrabold! leading-[1.05]! tracking-[-.025em] text-[#14202c]!"
          >
            Questions? <span className="text-green-bright">Answers.</span>
          </h2>
          <p className="mt-[14px] text-[clamp(16px,1.2vw,19px)] leading-[1.5] text-[#5b6875]">
            The stuff people usually ask first.
          </p>
        </div>

        <div className="relative z-[5] rounded-[28px] border-[1.5px] border-[#e3e8ec] bg-white px-[clamp(24px,2.6vw,44px)] py-[clamp(10px,1.4vw,22px)] shadow-[0_16px_40px_rgba(20,32,44,.08)]">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b-[1.5px] border-[#e3e8ec] last:border-b-0">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full cursor-pointer justify-between gap-[20px] bg-transparent py-[22px] text-left text-[clamp(18px,1.45vw,23px)] font-extrabold text-[#14202c]"
                  >
                    {item.q}
                    <span
                      aria-hidden="true"
                      className={`text-[26px] leading-none text-green-bright transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-[350ms] motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[38em] pb-[22px] text-[clamp(16px,1.15vw,18px)] leading-[1.55] text-[#33475b]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FaqAccordion;
