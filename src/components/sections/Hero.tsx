'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
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
  left: '38%',
  top: '9%',
  width: '22%',
  height: '30%',
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
 * Minimum gap between the type column's right edge and the pane's left edge, in
 * px. A floor, not an inset: the column centres on the pane's edge itself, and
 * this only decides when centring has to give way to left-pinning. Centring
 * inside `paneLeft - GAP_TO_PANE` instead would leave the column permanently
 * GAP_TO_PANE further from the pane than from the viewport edge, which is
 * exactly the left-heavy look this replaces.
 */
const GAP_TO_PANE = 44;

/** Floor for the gap between the viewport's left edge and the type column. */
const MIN_EDGE_GAP = 32;

/**
 * The pane's left edge as a fraction of the plate's width, derived from
 * PANE_BOX rather than restated. Where the copy sits depends on where the pane
 * is, so a second hardcoded 0.38 here would silently drift out of agreement the
 * first time PANE_BOX is tuned.
 */
const PANE_LEFT_FRACTION = parseFloat(PANE_BOX.left) / 100;

/**
 * Middle term of the headline's fluid clamp, in vw, held in a CSS variable so
 * the measurement pass can lower it. It only ever moves if the widest headline
 * state ("Redundancy") would otherwise overrun the free zone, which is a real
 * possibility on a wide-but-short viewport where the plate is narrow and the
 * free zone is therefore large but the headline is sized off vw regardless.
 * Steps down 0.1vw at a time and stops at the floor rather than shrinking
 * without bound.
 */
const HEADLINE_VW_DEFAULT = 3;
const HEADLINE_VW_STEP = 0.1;
const HEADLINE_VW_MIN = 1.8;

/**
 * Padding added to every measured word width, in px.
 *
 * The accordion is overflow-hidden and its width is set from these numbers, so
 * a word measured even a fraction of a pixel short has its last letter sliced —
 * which is what was cutting the y in "Redundancy". Two separate causes:
 * offsetWidth rounds to whole pixels and can round DOWN past the true extent,
 * and a glyph's ink can reach past the advance width the box reports anyway.
 * getBoundingClientRect fixes the first by measuring sub-pixel; this covers the
 * second. The cursor's 4px left margin absorbs it, so nothing shifts visibly.
 */
const WORD_WIDTH_BUFFER = 2;

/** lg breakpoint, matching the Tailwind utilities used throughout this file. */
const LG = 1024;

/**
 * useLayoutEffect on the client, useEffect on the server. The layout pass has to
 * land before paint or the column visibly jumps from its pre-measurement
 * position to its measured one on every load; plain useEffect runs after paint
 * and would show that jump.
 */
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

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
  'text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(2.25rem,var(--hero-headline-vw,3vw),4rem)] font-display font-extrabold tracking-tight whitespace-nowrap';

type Phase = 'visible' | 'swipe-left' | 'swipe-right';

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('visible');
  const [wordWidths, setWordWidths] = useState<number[]>([]);
  /**
   * Width of the headline in its widest ("Redundancy") state. The copy block is
   * centred on the headline's axis, so the column has to be pinned to this.
   * w-fit would not do: the h1 is inline-block, so its shrink-to-fit width
   * INCLUDES the accordion span, which animates to 0 and back on every rotation
   * — a fit-content column would breathe with it and the centred subcopy would
   * drift left and right forever.
   */
  const [headlineMaxWidth, setHeadlineMaxWidth] = useState<number | null>(null);
  /**
   * lg+ placement of the type column, measured rather than assumed. Null until
   * the first measurement and below lg, where the mobile layout is untouched.
   *
   * `zone` is the width from the viewport's left edge to the pane's left edge.
   * The column is centred in it, which is the whole point: the
   * plate's width comes from the section's HEIGHT via its locked aspect ratio,
   * not from the viewport's width, so on a wide-but-short window the plate is
   * narrow and the free zone is wide. A fixed margin cannot serve both that and
   * a 2560x1440 monitor; a measured one can.
   */
  const [layout, setLayout] = useState<{
    zone: number;
    mode: 'center' | 'left';
  } | null>(null);
  /** Middle term of the headline clamp. Only lowered, and only if it overruns. */
  const [headlineVw, setHeadlineVw] = useState(HEADLINE_VW_DEFAULT);
  const measureRef = useRef<HTMLSpanElement>(null);
  const fullMeasureRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  // Measures the words, the headline's widest state, and the free zone the
  // column is centred in. All three go stale on resize — the widths because the
  // clamp is fluid, the free zone because the plate is sized off section height
  // — so this re-runs from a ResizeObserver on the section as well as the
  // debounced window handler. The observer is what catches height-only changes,
  // which move the plate's width without firing a useful window resize.
  //
  // Every setState is guarded against no-op writes. The observer watches an
  // element whose size this effect can influence, so writing unconditionally
  // would risk an observe -> render -> observe loop.
  useIsomorphicLayoutEffect(() => {
    const measure = () => {
      if (!measureRef.current) return;
      const spans = measureRef.current.querySelectorAll('span');
      const widths = Array.from(spans).map(
        (span) => Math.ceil(span.getBoundingClientRect().width) + WORD_WIDTH_BUFFER,
      );
      setWordWidths((prev) =>
        prev.length === widths.length && prev.every((w, i) => w === widths[i]) ? prev : widths,
      );

      // Measured off the out-of-flow clone below, never off the h1. The h1 is
      // lg:block inside a column this value then sizes, so reading its
      // offsetWidth reports the column's width back — fine on the first pass
      // while the column is still fit-content, a feedback loop on every pass
      // after. It pinned the column at 2044px at 1280x800 and drove the clamp
      // to its floor before this was measured from a box nothing else sizes.
      const full = fullMeasureRef.current;
      if (!full || !widths.length) return;
      // Same buffer as the words above. The clone renders its word inline at the
      // natural width, but the live accordion renders it buffered — so without
      // this the column would be pinned 2px narrower than the headline it has to
      // hold, and a whitespace-nowrap h1 would overhang it.
      const colWidth = Math.ceil(full.getBoundingClientRect().width) + WORD_WIDTH_BUFFER;
      setHeadlineMaxWidth((prev) => (prev === colWidth ? prev : colWidth));

      // Below lg the plate is a static block under the copy and none of this
      // applies.
      if (window.innerWidth < LG) {
        setLayout((prev) => (prev === null ? prev : null));
        return;
      }

      const plate = plateRef.current;
      if (!plate) return;
      const rect = plate.getBoundingClientRect();
      // rect.left rather than innerWidth - width. Identical while the plate is
      // right-anchored, but it does not depend on that being true, and it is not
      // thrown off by a classic scrollbar — innerWidth counts it, rects do not.
      const paneLeft = rect.left + rect.width * PANE_LEFT_FRACTION;
      const zone = Math.round(paneLeft);

      // Guard rail, unchanged: left-pinned at MIN_EDGE_GAP, the column still has
      // to clear the pane by GAP_TO_PANE. If the widest headline state cannot,
      // take the clamp down a step and let the re-render measure again.
      const overruns = colWidth > zone - GAP_TO_PANE - MIN_EDGE_GAP;
      if (overruns && headlineVw > HEADLINE_VW_MIN) {
        setHeadlineVw(Math.round((headlineVw - HEADLINE_VW_STEP) * 10) / 10);
        return;
      }

      // Centred on the pane's edge, so the gap to the pane and the gap to the
      // viewport edge come out the same number. Both minimums are checked
      // explicitly even though the two gaps are equal here and GAP_TO_PANE is
      // the larger of the pair — stating both means neither floor can be lost
      // if either constant is retuned.
      const centredGap = (zone - colWidth) / 2;
      const canCentre =
        !overruns && centredGap >= GAP_TO_PANE && centredGap >= MIN_EDGE_GAP;

      // Falling back to left-pinned rather than bailing out. If the clamp is
      // already at its floor and the headline still overruns, a visible overrun
      // is a bug someone can see, where reverting to the unmeasured layout would
      // hide it.
      const mode = canCentre ? 'center' : 'left';
      setLayout((prev) =>
        prev && prev.zone === zone && prev.mode === mode ? prev : { zone, mode },
      );
    };
    measure();

    const observer = new ResizeObserver(() => measure());
    if (sectionRef.current) observer.observe(sectionRef.current);

    let timer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(measure, 150);
    };
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
    };
  }, [headlineVw]);

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
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden min-h-hero lg:min-h-[85vh]! pt-28 pb-16 lg:pt-0 lg:pb-0 lg:flex lg:items-center"
      /* Set here rather than on the h1 so the hidden measurement span inherits
         the same value — the two must resolve to identical type or the
         accordion animates to a width the word does not occupy. */
      style={{ '--hero-headline-vw': `${headlineVw}vw` } as React.CSSProperties}
    >
      {/* ── Type column ───────────────────────────────────────────────
          Hero-only wrapper, deliberately wider than the site container so
          the headline can use the whitespace on the left. The global
          --container-max is untouched. z-10 keeps the copy above the plate,
          which bleeds leftward underneath it on desktop. */}
      <div
        /* Until the first measurement this is exactly what it was before: the
           1680px centred wrapper. The swap to the measured free zone happens in
           a layout effect, so it lands before paint and there is no jump to
           transition away.

           Once measured, at lg this stops being a centred container and spans
           from the viewport's left edge to the pane's left edge, with the column
           centred inside it — so the copy sits the same distance from the pane
           as from the edge. Below lg every one of those overrides is inert. */
        className={`relative z-10 w-full mx-auto max-w-[1680px] px-6 ${
          layout
            ? `lg:mx-0 lg:max-w-none lg:w-[var(--hero-zone)] lg:flex ${
                layout.mode === 'center'
                  ? 'lg:justify-center lg:px-0'
                  : 'lg:justify-start lg:pl-8 lg:pr-0'
              }`
            : 'lg:px-8'
        }`}
        style={
          layout
            ? ({ '--hero-zone': `${layout.zone}px` } as React.CSSProperties)
            : undefined
        }
      >
        {/* lg+: the column is pinned to the headline's widest state and its
            contents centred on that axis. Below lg nothing here applies and the
            mobile layout is untouched. The var falls back to fit-content for the
            pre-hydration frame, before the measurement has run. */}
        <div
          className="lg:w-[var(--hero-col)] lg:text-center"
          style={{ '--hero-col': headlineMaxWidth ? `${headlineMaxWidth}px` : 'fit-content' } as React.CSSProperties}
        >
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

          {/* The headline in its widest state, out of flow so its width is its
              own and not whatever box it sits in. This is what the column is
              sized from.

              It mirrors the h1's inline content exactly — same type classes,
              same widest word, same cursor with the same margins. Change one
              and you must change the other, the same rule the word-measurement
              span above already carries. */}
          <span
            ref={fullMeasureRef}
            aria-hidden="true"
            className={`absolute opacity-0 pointer-events-none ${HEADLINE_TYPE}`}
          >
            Your{' '}
            <span className="whitespace-nowrap">
              {rotatingWords.reduce((a, b) => (b.length > a.length ? b : a))}
            </span>
            <span
              className="inline-block w-[3px]"
              style={{
                height: '1.2em',
                verticalAlign: 'middle',
                marginLeft: '4px',
                marginRight: '4px',
              }}
            />{' '}
            Sourcing Experts
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            ref={headlineRef}
            /* lg:block + lg:text-left keeps the headline's LEFT edge pinned to
               the column while the block below it centres. If the h1 stayed
               inline-block inside a text-center column it would re-centre itself
               every time the accordion collapsed, and "Sourcing Experts" would
               breathe inward instead of sliding along the line. */
            className={`${HEADLINE_TYPE} text-[#1e293b] mb-8 leading-[1.1] inline-block lg:block lg:text-left`}
          >
            Your{' '}
            <span
              ref={accordionRef}
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
            className="text-xl md:text-2xl text-[#1e293b] mb-6 leading-relaxed font-medium max-w-xl lg:mx-auto"
          >
            Expert guidance at <span className="text-[#008838] font-bold">zero cost</span> to you.
            We&apos;re paid by carriers, not clients.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg md:text-xl text-[#475569] mb-12 max-w-xl lg:mx-auto"
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
        className="mt-10 w-full mx-auto max-w-[1680px] px-6
                   lg:mt-0 lg:mx-0 lg:max-w-none lg:w-auto lg:px-0
                   lg:absolute lg:right-0 lg:bottom-0 lg:z-0"
        style={{ top: PLATE_TOP_OFFSET }}
      >
        <div
          /* The panes are positioned against this box, so this is the box the
             free-zone maths has to measure — not the wrapper around it. */
          ref={plateRef}
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
