'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { testimonials } from '@/data/testimonials';

/*
 * "Don't take our word for it" (spec section.tst). Logo row on top, one
 * testimonial at a time below, advancing every 6s. Hover or keyboard focus
 * pauses it; clicking a logo or dot jumps there and restarts the timer.
 * The quotes come from data/testimonials.ts so the approval gate still
 * applies; only approved entries render.
 *
 * Under prefers-reduced-motion it does not auto-advance and slides swap
 * without the sideways move.
 *
 * Deviation from the spec: below 600px the logo row is drawn at 60% height
 * so the three logos fit a phone without horizontal scroll.
 */

const DUR = 6000;

// Logo heights from the spec, keyed by testimonial id.
const LOGO_H: Record<string, number> = {
  'scott-anderson': 50,
  'tom-pepple': 66,
  'james-sandberg': 87,
};

const ITEMS = testimonials.filter((t) => t.approved);

export function TestimonialRotator() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  // Hover and keyboard focus pause separately, so moving the mouse away does
  // not restart the rotation under someone who is tabbing through it.
  const hovered = useRef(false);
  const focused = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const show = useCallback(
    (i: number) => {
      if (i === cur) return;
      setPrev(cur);
      setCur(i);
    },
    [cur],
  );

  const start = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => {
      if (!hovered.current && !focused.current) show((cur + 1) % ITEMS.length);
    }, DUR);
  }, [cur, show]);

  // Re-armed on every change so the next tick advances from the current slide
  // and a click gets a full 6s before the next move.
  useEffect(() => {
    start();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [start]);


  return (
    <section
      aria-labelledby="hm-tst-h"
      className="border-t border-[#edf1f3] bg-[#f6f8f9] px-[4vw] pt-[12vh] pb-[13vh] font-display text-[#14202c]"
    >
      <div className="mb-[5vh] text-center">
        <h2
          id="hm-tst-h"
          className="text-[clamp(34px,4.2vw,68px)] font-extrabold! leading-[1.05]! tracking-[-.025em] text-[#14202c]!"
        >
          Don&apos;t take our word for it
        </h2>
        <p className="mt-[14px] text-[clamp(16px,1.25vw,20px)] text-[#5b6875]">
          A few of the businesses we work with, in their words.
        </p>
      </div>

      <div
        className="relative z-[5] mx-auto max-w-[1040px]"
        onMouseEnter={() => (hovered.current = true)}
        onMouseLeave={() => (hovered.current = false)}
        onFocus={(e) => (focused.current = e.target.matches(':focus-visible'))}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) focused.current = false;
        }}
      >
        <div className="flex items-center justify-center gap-[clamp(28px,5vw,80px)] pb-[30px]">
          {ITEMS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={t.company}
              aria-pressed={i === cur}
              onClick={() => show(i)}
              className={`relative cursor-pointer border-0 bg-transparent px-[4px] py-[6px] transition-[opacity,filter] duration-[400ms] ${i === cur ? 'opacity-100' : 'opacity-40 grayscale'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.logo}
                alt={`${t.company} logo`}
                style={{ '--h': `${LOGO_H[t.id] ?? 50}px` } as CSSProperties}
                className="block h-(--h) w-auto max-[600px]:h-[calc(var(--h)*.6)]"
              />
            </button>
          ))}
        </div>

        <div className="relative grid min-h-[clamp(340px,27vw,420px)] grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] overflow-hidden rounded-[24px] bg-white shadow-[0_18px_44px_rgba(20,32,44,.08)] max-[820px]:grid-cols-1">
          {ITEMS.map((t, i) => {
            const on = i === cur;
            const out = i === prev && !on;
            return (
              <figure
                key={t.id}
                aria-hidden={!on}
                inert={!on}
                className={`col-span-full row-start-1 m-0 grid grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] transition-[opacity,transform] duration-[600ms] max-[820px]:grid-cols-1 motion-reduce:transition-none motion-reduce:[transform:none] ${on ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} ${on ? '' : out ? '[transform:translateX(40px)]' : '[transform:translateX(-40px)]'}`}
              >
                <div className="flex flex-col p-[clamp(24px,2.8vw,46px)]">
                  <blockquote className="m-0 text-[clamp(16px,1.3vw,21px)] leading-[1.45] font-medium tracking-[-.005em] text-[#14202c]">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-auto pt-[22px]">
                    <b className="block text-[17px] font-extrabold">{t.name}</b>
                    <span className="mt-[3px] block text-[15px] text-[#33475b]">
                      {t.title}, {t.company}
                    </span>
                    {'relationshipNote' in t && t.relationshipNote && (
                      <em className="mt-[4px] block text-[14px] text-[#5b6875] not-italic">{t.relationshipNote}</em>
                    )}
                  </figcaption>
                </div>
                <div className="bg-[#e3e8ec] max-[820px]:order-first max-[820px]:h-[280px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.headshot}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover"
                  />
                </div>
              </figure>
            );
          })}
        </div>

        <div className="mt-[22px] flex justify-center gap-[10px]">
          {ITEMS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Testimonial ${i + 1}`}
              aria-pressed={i === cur}
              onClick={() => show(i)}
              className={`h-[10px] cursor-pointer rounded-full border-0 p-0 transition-[width,background-color] duration-[350ms] motion-reduce:transition-none ${i === cur ? 'w-[30px] bg-green-bright' : 'w-[10px] bg-[#cfd6dc]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialRotator;
