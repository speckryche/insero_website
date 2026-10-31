'use client';

import { useEffect, useRef, useState } from 'react';
import { JetBrains_Mono } from 'next/font/google';

// The receipt's typewriter face. Loaded here so only this section pays for it.
// Falls back to a system monospace, not next/font's default size-adjusted
// Arial: a proportional stand-in wrapped the receipt lines differently until
// the real face arrived, and on phones (where the receipt stacks) that 18px
// shift threw off the scroll to #get-started after a cross-page link.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
});

/*
 * "How do you get paid?" with the $0 receipt (spec section.paid). The line
 * items print in one by one and the stamp thumps on, once, when the section
 * is 35% in view. Under prefers-reduced-motion everything shows in its final
 * state (motion-reduce utilities below).
 */

const ITEMS = [
  'Research every carrier',
  'Quotes, side by side',
  'Recommendation',
  'Contract help',
  'Rollout coordination',
];

export function ReceiptSection() {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const play = run ? '[animation-play-state:running]' : '[animation-play-state:paused]';

  return (
    <section
      ref={ref}
      aria-labelledby="hm-paid-h"
      className="grid grid-cols-2 items-center gap-[6vw] overflow-hidden bg-[#0f1c27] px-[6vw] py-[14vh] font-display text-white max-[900px]:grid-cols-1"
    >
      <div>
        <h2
          id="hm-paid-h"
          className="text-[clamp(34px,3.8vw,62px)] font-extrabold! leading-[1.05]! tracking-[-.025em] text-white!"
        >
          &quot;If I&apos;m not paying you, how do you get <em className="text-[#5cf774] not-italic">paid?</em>&quot;
        </h2>
        <p className="mt-[20px] max-w-[28em] text-[clamp(16px,1.25vw,20px)] leading-[1.55] text-[#b8c4ce]">
          The carriers pay us a commission, the same way they pay their own sales team. You get the research, quotes
          and install help. The bill stays at zero.
        </p>
        <p className="mt-[26px] max-w-[28em] text-[clamp(16px,1.25vw,20px)] leading-[1.55] font-bold text-white">
          Your price is never higher than going direct. Often we find better pricing and promos.
        </p>
      </div>

      <div
        role="img"
        aria-label="A receipt from Insero: research every carrier, quotes side by side, recommendation, contract help and rollout coordination, each $0.00. Total $0.00, stamped paid by the carrier."
        className={`relative w-[min(440px,100%)] rotate-[2.5deg] justify-self-center bg-white px-[30px] pt-[34px] pb-[40px] ${mono.className} text-[#14202c] shadow-[0_30px_70px_rgba(0,0,0,.45)] [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/22px_100%]`}
      >
        <div aria-hidden="true">
          <div className="text-center text-[15px] font-bold tracking-[.12em]">
            INSERO
            <small className="mt-[4px] block text-[11px] font-medium tracking-[.06em] text-[#5b6875]">
              YOUR BILL · TECHNOLOGY. SIMPLIFIED.
            </small>
          </div>
          <hr className="my-[18px] border-0 border-t-2 border-dashed border-[#cfd6dc]" />
          <div>
            {ITEMS.map((item, i) => (
              <div
                key={item}
                style={{ animationDelay: `${0.2 + i * 0.3}s` }}
                className={`flex [transform:translateY(6px)] justify-between py-[6px] text-[14px] opacity-0 animate-[hm-li_.5s_forwards] ${play} motion-reduce:[transform:none] motion-reduce:animate-none motion-reduce:opacity-100`}
              >
                <span>{item}</span>
                <span>$0.00</span>
              </div>
            ))}
          </div>
          <hr className="my-[18px] border-0 border-t-2 border-dashed border-[#cfd6dc]" />
          <div className="flex justify-between text-[22px] font-bold">
            <span>TOTAL</span>
            <span>$0.00</span>
          </div>
          <div
            className={`absolute right-[22px] bottom-[70px] rounded-[8px] border-4 border-green-bright bg-[rgba(255,255,255,.85)] px-[12px] py-[8px] text-center text-[15px] leading-[1.2] font-bold tracking-[.1em] text-green-text opacity-0 [transform:rotate(-12deg)_scale(1.6)] animate-[hm-stamp_.4s_2s_forwards] ${play} motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:[transform:rotate(-12deg)]`}
          >
            PAID BY
            <br />
            THE CARRIER
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReceiptSection;
