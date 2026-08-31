'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';

const rotatingWords = ['Voice', 'Internet', 'Redundancy'];
const HOLD_DURATION = 2500;
const SWIPE_DURATION = 400;

/**
 * Where the glass pane sits on the base plate, as percentages of the plate
 * wrapper. Percentage-based on purpose: the wrapper always holds the plate's
 * native aspect ratio, so the pane keeps the same spot relative to INZO at
 * every size — full-bleed on desktop, container-width on mobile.
 *
 * Tuned to sit just left of INZO's raised hand while clearing the right edge
 * of the one-line headline. Nudge these four values to move it; nothing else
 * needs to change. Raising `left` moves the pane toward the hand and buys
 * clearance from the headline.
 */
const PANE_BOX = {
  left: '44%',
  top: '9%',
  width: '23%',
  height: '31%',
} as const;

/**
 * Gap between the top of the section and the top of the plate, in px, at lg and
 * up. Without it the plate runs under the transparent header and INZO's halo
 * and the glass pane crowd the nav. The plate is pinned top/bottom, so raising
 * this shortens the plate and — because PLATE_ASPECT is preserved — narrows it
 * slightly too. Below lg the wrapper is static and this is ignored.
 */
const PLATE_TOP_OFFSET = 88;

/**
 * The plate's true intrinsic size, measured off the file. The wrapper is locked
 * to this ratio so object-cover never actually crops: PANE_BOX percentages are
 * relative to the wrapper, so a wrapper that drifted from the image's own ratio
 * would slide the panes off INZO's hand.
 */
const PLATE_ASPECT = '1712 / 1152';

/** Index-aligned with rotatingWords — 0 Voice, 1 Internet, 2 Redundancy. */
const PANE_SRCS = [
  '/hero/pane-voice.png',
  '/hero/pane-internet.png',
  '/hero/pane-redundancy.png',
];

/**
 * Shared by the h1 and the hidden measurement span. They MUST stay identical:
 * the accordion animates to a width measured off that span, so any type change
 * applied to one and not the other silently mis-sizes the word.
 *
 * The lg+ size is fluid, which is what keeps "Your [WORD] Sourcing Experts" on
 * one line from 1024px up to very wide screens without ever breaking. Because
 * the size now depends on the viewport, the measurement has to re-run on
 * resize — see the effect below.
 */
const HEADLINE_TYPE =
  'text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.25rem,3vw,4rem)] font-display font-extrabold tracking-tight whitespace-nowrap';

type Phase = 'visible' | 'swipe-left' | 'swipe-right';

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('visible');
  const [wordWidths, setWordWidths] = useState<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Measure every word on mount, and again on resize. The mount-only version
  // was fine at fixed type sizes; with a fluid clamp the widths go stale the
  // moment the window changes, which would leave the accordion animating to a
  // width the word no longer occupies.
  useEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const spans = measureRef.current.querySelectorAll('span');
      setWordWidths(Array.from(spans).map((span) => span.offsetWidth));
    };
    measure();

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const startTransition = useCallback(() => {
    setPhase('swipe-left');
    setTimeout(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
      setPhase('swipe-right');
      setTimeout(() => {
        setPhase('visible');
      }, SWIPE_DURATION);
    }, SWIPE_DURATION);
  }, []);

  // One timer, one index. wordIndex drives both the headline word and which
  // pane is opaque, so the two can never drift apart.
  useEffect(() => {
    // Reduced motion holds on index 0: Voice word, Voice pane, no rotation.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(startTransition, HOLD_DURATION + SWIPE_DURATION * 2);
    return () => clearInterval(interval);
  }, [startTransition]);

  const currentWidth = wordWidths[wordIndex] || 0;

  return (
    <section className="relative bg-white overflow-hidden min-h-hero lg:min-h-[85vh]! pt-28 pb-16 lg:pt-0 lg:pb-0 lg:flex lg:items-center">
      {/* ── Type column ───────────────────────────────────────────────
          Hero-only wrapper, deliberately wider than the site container so
          the headline can use the whitespace on the left. The global
          --container-max is untouched. z-10 keeps the copy above the plate,
          which bleeds leftward underneath it on desktop. */}
      <div className="relative z-10 w-full mx-auto max-w-[1680px] px-8">
        <div className="lg:max-w-[64vw]">
          {/* Hidden measurement container — same type classes as the h1 */}
          <span
            ref={measureRef}
            aria-hidden="true"
            className={`absolute opacity-0 pointer-events-none ${HEADLINE_TYPE}`}
          >
            {rotatingWords.map((word) => (
              <span key={word} className="inline-block">{word}</span>
            ))}
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`${HEADLINE_TYPE} text-[#1e293b] mb-8 leading-[1.1] inline-block`}
          >
            Your{' '}
            <span
              className="inline-flex items-baseline overflow-hidden"
              style={{
                width: phase === 'swipe-left'
                  ? '0px'
                  : currentWidth > 0 ? `${currentWidth}px` : 'auto',
                transition: `width ${SWIPE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                verticalAlign: 'baseline',
                lineHeight: 'inherit',
              }}
            >
              <span className="text-[#008838] whitespace-nowrap leading-[inherit]">
                {rotatingWords[wordIndex]}
              </span>
            </span>
            <span
              className="inline-block w-[3px] relative"
              style={{
                height: '1.2em',
                backgroundColor: '#1e293b',
                verticalAlign: 'middle',
                marginLeft: '4px',
                marginRight: '4px',
              }}
            />
            {/* Break below sm only — a 390px viewport clips the single line.
                From sm up the headline is ONE line at every width: the
                accordion reads as "Sourcing Experts" sliding along the same
                line as the collapsing word, which a break would destroy. The
                fluid clamp above is what keeps that line fitting. */}
            <br aria-hidden="true" className="sm:hidden" />{' '}
            Sourcing Experts
          </motion.h1>

          {/* Paragraphs keep their own measure. The column is now up to 64vw
              wide for the headline's benefit; letting body copy run that far
              would push line length well past readable. */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#1e293b] mb-6 leading-relaxed font-medium max-w-xl"
          >
            Expert guidance at <span className="text-[#008838] font-bold">zero cost</span> to you.
            We&apos;re paid by carriers, not clients.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg md:text-xl text-[#475569] mb-12 max-w-xl"
          >
            Insero is your technology broker, advising you on solutions, services,
            and the right vendors to meet all your technology needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-10 py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <span>Get Started</span>
                <ArrowRight
                  weight="bold"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── INZO plate ────────────────────────────────────────────────
          Below lg: a normal block after the type column, held to the hero
          wrapper's width and padding so it lines up with the copy.
          At lg and up: breaks out of the wrapper and pins to the section's
          right edge, from PLATE_TOP_OFFSET down to the bottom. Height comes
          from that top/bottom pair rather than height:100%, and the width
          falls out of the locked aspect ratio — so clearing the nav also
          narrows the plate slightly, which is intended.
          `top` is inert below lg, where the wrapper is static. */}
      <div
        className="mt-10 w-full mx-auto max-w-[1680px] px-8
                   lg:mt-0 lg:mx-0 lg:max-w-none lg:w-auto lg:px-0
                   lg:absolute lg:right-0 lg:bottom-0 lg:z-0"
        style={{ top: PLATE_TOP_OFFSET }}
      >
        <div
          className="relative w-full lg:w-auto lg:h-full"
          style={{ aspectRatio: PLATE_ASPECT }}
        >
          <Image
            src="/hero/inzo-hero-base-loft-fade.jpg"
            alt="INZO, the Insero robot, working at a desk in a loft office"
            fill
            priority
            sizes="(min-width: 1024px) 128vh, 100vw"
            className="object-cover"
          />

          {/* All three panes are mounted for the life of the component and
              only ever cross-fade opacity — never unmount, never swap src,
              never move. The base plate underneath is untouched by a word
              change, so it never re-renders or re-decodes. */}
          {PANE_SRCS.map((src, i) => (
            <div
              key={src}
              aria-hidden="true"
              className="absolute"
              style={{
                ...PANE_BOX,
                opacity: i === wordIndex ? 1 : 0,
                // Same duration and easing as the word accordion, so the pane
                // and the word resolve together.
                transition: `opacity ${SWIPE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vh, 23vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
