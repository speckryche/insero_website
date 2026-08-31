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
 * The word's own fade, derived from SWIPE_DURATION rather than set beside it so
 * the two cannot drift.
 *
 * The accordion collapses by animating width against overflow:hidden, which
 * slices the word down its right edge — at full opacity that reads as a chopped
 * glyph ("Your Intern|") rather than as motion. The fade hides the cut: the word
 * is gone before enough of it has been eaten to notice, and the swap at the
 * midpoint happens at opacity 0.
 *
 * 60% of the swipe, so the fade finishes at 240ms of the 400ms collapse, well
 * before the text changes. On the way back it is delayed by the remaining 40%,
 * starting at 160ms and landing exactly as the width finishes — the word arrives
 * with the box rather than ahead of it.
 */
const WORD_FADE_MS = Math.round(SWIPE_DURATION * 0.6);
const WORD_FADE_IN_DELAY_MS = SWIPE_DURATION - WORD_FADE_MS;

/** Same curve the width animation uses, so the two read as one movement. */
const SWIPE_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

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

/**
 * Mobile zoom-crop. Below lg the full landscape plate at container width leaves
 * INZO tiny inside empty loft, so a crop frame shows only part of an oversized
 * plate: the plate is MOBILE_PLATE_WIDTH of the frame, pinned right and bottom,
 * and the frame's own aspect decides how much height survives.
 *
 * The two numbers are locked together tighter than they look. Anchored right,
 * the frame shows the rightmost 1/k of the plate, so the leftmost visible point
 * is at (1 - 1/k) of plate width; the pane starts at PANE_BOX.left (38%), so
 * k must stay under ~1.54 or the pane's left edge falls outside the frame.
 * Anchored bottom, the frame shows the bottom (1.4861 / (A*k)) of plate height,
 * and the pane's top sits at 9%, so A*k must stay under ~1.58 or the pane is
 * cut off the top. A also cannot go below 1.4861/k, or the plate is shorter
 * than the frame and a blank band opens above it.
 *
 * 150% + 1/1 sits inside all three: the pane clears the left edge by ~4.7% of
 * plate width, the top crop is under 1%, and INZO is whole from halo to tracks.
 * A more aggressive zoom is not available at PANE_BOX.left = 38% — raising k
 * pushes the pane out of frame on the left before it buys any useful size.
 */
const MOBILE_CROP_ASPECT = '1 / 1';
const MOBILE_PLATE_WIDTH = '150%';

/**
 * Index-aligned with rotatingWords, so the word takes the colour of the pane it
 * appears with. Driven by the same wordIndex as PANE_SRCS below, which means the
 * colour swaps at the accordion's midpoint — the moment the width is 0 and the
 * word is not on screen — so no transition is needed and none would be visible.
 *
 * ACCESSIBILITY: #F97316 measures 2.80:1 on white. That is below AA for large
 * text (3.0:1), not only below the 4.5:1 normal-text bar, so "Internet" does not
 * meet AA in any size it renders at. It is the same value globals.css marks
 * DECORATIVE USE ONLY for exactly this reason. --color-accent-cta (#C95000) is
 * the accessible member of the same hue family at 4.53:1 and would be a drop-in.
 * Kept as specified; flagged here so it is not mistaken for an oversight.
 */
const WORD_COLORS = ['#008838', '#F97316', '#008838'];

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
const WORD_WIDTH_BUFFER = 3;

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
  /** Reused across measurement passes; the guard below is the only consumer. */
  const inkCanvasRef = useRef<HTMLCanvasElement | null>(null);

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

      // Regression guard. The stored width is what the accordion's box becomes,
      // and the box clips at its right edge, so a width that does not clear the
      // word's INK — not its advance width, which is a different number for
      // glyphs like y — slices the last letter flat. That failure is silent:
      // the layout stays correct and only the glyph looks wrong, which is how it
      // survived a review pass before. One canvas measure per word per
      // measurement pass, and it says which word and by how much.
      if (typeof document !== 'undefined') {
        const canvas =
          inkCanvasRef.current ?? (inkCanvasRef.current = document.createElement('canvas'));
        const ctx = canvas.getContext('2d');
        // Measured off the h1, not off the measurement clone. They do not
        // resolve to the same type: an unlayered `h1` rule wins over the
        // font-extrabold utility, so the h1 computes 700 where the clone
        // computes 800. The clone is therefore the heavier, wider face, and a
        // guard reading it would be checking a font nothing renders in.
        const probe = headlineRef.current;
        if (ctx && probe) {
          const cs = window.getComputedStyle(probe);
          ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
          // Chrome-only, and it matters: the headline is tracking-tight, so
          // ignoring it would under-measure every word.
          try {
            (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
              cs.letterSpacing;
          } catch {
            /* not supported — the measurement is still close enough to catch a real slice */
          }
          rotatingWords.forEach((word, i) => {
            const ink = ctx.measureText(word).actualBoundingBoxRight;
            if (widths[i] < ink + 1) {
              console.error(
                `[Hero] "${word}" box is ${widths[i]}px against ${ink.toFixed(2)}px of ink at ` +
                  `${cs.fontSize} — short by ${(ink + 1 - widths[i]).toFixed(2)}px. ` +
                  'The last glyph will render sliced. Raise WORD_WIDTH_BUFFER.',
              );
            }
          });
        }
      }
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
        /* lg:pt-24 lg:pb-11 is the vertical balance, and it is on the flex item
           rather than the section because the section's padding box is what the
           plate's `top` is measured from — padding there would move the plate.

           The section centres this item in its FULL height, but the fixed nav
           covers the top 96px of that, so an item centred in the box sits 96px
           of dead space high in the band anyone can actually see: 110px above
           the headline against 206px below it. pt-24 is the nav's own height
           (h-24 at lg), which hands that 96px back and centres the copy in the
           band below the nav.

           pb-11 then biases it up. An item padded top-only lands on 51/49, and
           the eye reads dead centre as slightly low, so 44px of bottom padding
           shifts the content up by half that — 22px — to the 45/55 the design
           calls for. Both are inert below lg. */
        className={`relative z-10 w-full mx-auto max-w-[1680px] px-6 lg:pt-24 lg:pb-11 ${
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
                // em, not px: these resolve against the headline's own font
                // size, so the gap tracks the fluid clamp instead of staying at
                // a value tuned for small type. At 4px the rule sat on top of
                // ink that reaches right at 51-64px — the e in Voice and the y
                // in Redundancy, whose tail measures 0.73px past its advance
                // width. Internet only escaped because the t curves away.
                // Asymmetric on purpose: the left side carries the overhang.
                marginLeft: '0.22em',
                marginRight: '0.18em',
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
              /* overflow-hidden is what makes the collapse read as a wipe, and
                 it is also what clips a glyph whose ink reaches past its
                 advance width. That is safe once a measured width is applied,
                 because the measurement carries WORD_WIDTH_BUFFER. It is NOT
                 safe on the `auto` fallback below, where the box shrink-wraps
                 to the advance exactly and the buffer does not exist — so the
                 clipping is turned off for precisely that case. */
              className={`inline-flex items-baseline ${
                currentWidth > 0 || phase === 'swipe-left'
                  ? 'overflow-hidden'
                  : 'overflow-visible'
              }`}
              style={{
                width: phase === 'swipe-left'
                  ? '0px'
                  : currentWidth > 0 ? `${currentWidth}px` : 'auto',
                transition: `width ${SWIPE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                verticalAlign: 'baseline',
                lineHeight: 'inherit',
              }}
            >
              <span
                className="whitespace-nowrap leading-[inherit]"
                style={{
                  color: WORD_COLORS[wordIndex],
                  // Driven off the same phase as the width, so there is no
                  // second timer and nothing new to keep in step with the
                  // shared index.
                  opacity: phase === 'swipe-left' ? 0 : 1,
                  // Out immediately on the collapse; back in on a delay so it
                  // completes with the expansion rather than ahead of it.
                  transition: `opacity ${WORD_FADE_MS}ms ${SWIPE_EASING} ${
                    phase === 'swipe-right' ? WORD_FADE_IN_DELAY_MS : 0
                  }ms`,
                }}
              >
                {rotatingWords[wordIndex]}
              </span>
            </span>
            <span
              className="inline-block w-[3px] relative"
              style={{
                height: '1.2em',
                backgroundColor: '#1e293b',
                verticalAlign: 'middle',
                // em, not px: these resolve against the headline's own font
                // size, so the gap tracks the fluid clamp instead of staying at
                // a value tuned for small type. At 4px the rule sat on top of
                // ink that reaches right at 51-64px — the e in Voice and the y
                // in Redundancy, whose tail measures 0.73px past its advance
                // width. Internet only escaped because the t curves away.
                // Asymmetric on purpose: the left side carries the overhang.
                marginLeft: '0.22em',
                marginRight: '0.18em',
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
        {/* Crop frame — below lg only. `lg:contents` makes it generate no box
            at all at lg and up, so the plate box below becomes a direct child
            of the wrapper again and desktop layout is untouched, not merely
            restored. aspect-ratio and overflow are both inert under
            display:contents, so neither needs an lg reset. */}
        <div
          className="relative w-full overflow-hidden rounded-2xl lg:contents"
          style={{ aspectRatio: MOBILE_CROP_ASPECT }}
        >
          <div
            /* The panes are positioned against this box, so this is the box the
               free-zone maths has to measure — not the wrapper around it.
               Below lg it is oversized and pinned to the crop frame's right and
               bottom; the panes ride along untouched because they are
               positioned as percentages OF this box. */
            ref={plateRef}
            /* The mobile width rides in on a CSS variable rather than the
               style attribute: an inline `width` outranks every class, so
               `lg:w-auto` could not override it and the 150% leaked into the
               desktop layout — measured as a 1.5x wider plate at 1718. */
            className="absolute right-0 bottom-0 w-[var(--plate-w)] lg:relative lg:right-auto lg:bottom-auto lg:w-auto lg:h-full"
            style={{ aspectRatio: PLATE_ASPECT, ['--plate-w' as string]: MOBILE_PLATE_WIDTH } as React.CSSProperties}
          >
            <Image
              src="/hero/inzo-hero-base-loft-fade.jpg"
              alt="INZO, the Insero robot, working at a desk in a loft office"
              fill
              priority
              sizes="(min-width: 1024px) 128vh, 150vw"
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
                  sizes="(min-width: 1024px) 30vh, 33vw"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
