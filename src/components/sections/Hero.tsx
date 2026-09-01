'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
import { useReducedMotion, useIsClient } from '@/lib/use-reduced-motion';

const rotatingWords = ['Voice', 'Internet', 'Redundancy'];
const HOLD_DURATION = 2500;
const SWIPE_DURATION = 400;

/**
 * Hold before the FIRST swipe after the intro hands off.
 *
 * Shorter than the steady-state cycle because Voice has already been on screen
 * throughout the clip — the visitor has read it long before the rotation owns
 * the headline. A bare setInterval fires first at one full cycle, which gave
 * Voice a 3300ms hold against every other word's 2500ms settled hold; this
 * replaces that lead-in without touching the cadence that follows it.
 */
const FIRST_HOLD_MS = 1800;

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
 * Where things sit on the 1920x1080 base plate, as fractions of its width and
 * height. Measured off the asset, not eyeballed, and recorded here because the
 * mobile crop below is derived from them and would otherwise be unauditable.
 *
 *   INZO           x 0.330 - 0.610   y 0.155 - ~1.0  (halo cubes down to wheels)
 *   green glass    x 0.653 - 0.872   y 0.254 - 0.626
 *   overlay ink    x 0.497 - 0.899   y 0.182 - 0.677 (hologram + its light rays)
 *
 * The overlays are full-frame 1920x1080 RGBA registered to the plate, so they
 * are drawn at inset-0 over it rather than positioned into a box. The old
 * PANE_BOX, which placed a small cropped pane image at 38%/9%, is gone: there
 * is nothing left to position.
 */
const CONTENT_LEFT = 0.33;
const CONTENT_TOP = 0.155;

/**
 * White wash over the left of the artwork, so the copy never sits on the trees.
 * Percentages are of the plate box's width — the same axis CONTENT_LEFT and the
 * glass fractions use, so the three can be reasoned about together:
 *
 *   solid out to 14%   the tree line behind the start of the copy is covered.
 *                      14 is the ceiling agreed for this stop; it is not enough
 *                      to carry the subcopy's right end — see the note below
 *   clear by 31%       two points before CONTENT_LEFT, so the wash is fully
 *                      gone by the time it reaches INZO
 *   at CONTENT_LEFT    0% white — he is not washed at all
 *
 * Earlier pairs ran the fade past him: 20%/50% put his whole left side under
 * ~57% white, which is what the grade made obvious. The end stop is the value
 * that matters here and it must stay left of CONTENT_LEFT; if the copy ever
 * needs more cover, raise the middle stop, never the end.
 *
 * KNOWN CONFLICT, measured, not theoretical. Ending the wash at 31% leaves the
 * subcopy's right end on bare artwork at 1280, where the paragraph reaches
 * 30.7% of the plate. #475569 over the trees there measures 2.3:1 against a
 * 4.5:1 AA floor. The middle stop cannot rescue it: at 14% the wash is still
 * ~1.6% white by 30.7%, because the failure sits at the end stop itself. With
 * this ramp the subcopy only holds 4.5:1 out to ~17% of the plate.
 *
 * RESOLVED, copy-side rather than here. The type column carries its own
 * backdrop — a blurred radial of white behind the text, extending 4rem past it
 * — so legibility no longer depends on how far this wash reaches, and subcopy 2
 * moved from #475569 to #1e293b to stop leaning on a colour that failed AA over
 * the artwork even at 1920. These stops are therefore free to stay clear of
 * INZO. Do not widen them to chase contrast: that is the backdrop's job now,
 * and moving the end stop right is what put white over him in the first place.
 */
const COPY_FADE_SOLID_PCT = 14;
const COPY_FADE_CLEAR_PCT = 31;

/**
 * Gap between the top of the section and the top of the plate, in px, at xl and
 * up. Without it the plate runs under the transparent header and INZO's halo
 * and the glass pane crowd the nav. The plate is pinned top/bottom, so raising
 * this shortens the plate and — because PLATE_ASPECT is preserved — narrows it
 * slightly too. Below xl the wrapper is static and this is ignored.
 */
const PLATE_TOP_OFFSET = 88;

/**
 * The plate's true intrinsic size, measured off the file. The wrapper is locked
 * to this ratio so object-cover never actually crops — which matters more now
 * than it did: the overlays are registered to the plate pixel for pixel, so a
 * wrapper that drifted from the image's own ratio would have the plate and its
 * hologram cropping differently and slide them apart.
 */
const PLATE_ASPECT = '1920 / 1080';
/** The same ratio as a number, for the mobile-crop derivation below. */
const PLATE_RATIO = 1920 / 1080;

/**
 * Mobile zoom-crop. Below xl the full landscape plate at container width leaves
 * INZO tiny inside empty loft, so a crop frame shows only part of an oversized
 * plate: the plate is MOBILE_PLATE_WIDTH (k) of the frame, pinned right and
 * bottom, and the frame's own aspect (A) decides how much height survives.
 *
 * Re-derived for the 16:9 plate. Writing R for PLATE_RATIO, anchored right the
 * frame shows the rightmost 1/k of the plate, so the leftmost visible point is
 * at (1 - 1/k); anchored bottom it shows the bottom R/(A*k) of plate height, so
 * the topmost visible point is at 1 - R/(A*k). Three constraints:
 *
 *   1 - 1/k     <= CONTENT_LEFT   ->  k   <= 1.493   (INZO's wheels stay in)
 *   1 - R/(A*k) <= CONTENT_TOP    ->  A*k <= 2.104   (his halo stays in)
 *   R/(A*k)     <= 1              ->  A*k >= 1.778   (no blank band above)
 *
 * 4/3 + 140% sits inside all three with room to spare: visible from 28.6% of
 * plate width against the 33.0% needed, and from 4.8% of plate height against
 * the 15.5% needed. INZO comes out 39% of the frame's width.
 *
 * The old 1/1 + 150% is not merely suboptimal here, it fails twice: it clips
 * INZO's left edge (visible from 33.33% against 33.0%) and, because 1*1.5 is
 * below the 1.778 floor, it leaves the plate shorter than the frame and opens a
 * blank band above it. The 16:9 plate is wider than the 1712x1152 one these
 * numbers were tuned for, so less height arrives for the same width.
 */
const MOBILE_CROP_ASPECT = '4 / 3';
const MOBILE_PLATE_WIDTH = '140%';

// Guard on the derivation above. The three constraints are easy to state and
// easy to violate by nudging one of the two constants, and every violation is
// silent at xl and up — the crop frame is display:contents there — so it would
// only be caught by someone opening the site below 1280. That is now a much
// wider range than it was: since the hero stacks below xl rather than below lg,
// this crop is what 1024-1279 sees too, not just phones. Dev only; the numbers
// are static, so this proves the shipped pair once per bundle load.
if (process.env.NODE_ENV !== 'production') {
  const k = parseFloat(MOBILE_PLATE_WIDTH) / 100;
  const [aw, ah] = MOBILE_CROP_ASPECT.split('/').map((n) => parseFloat(n));
  const A = aw / ah;
  const leftVisible = 1 - 1 / k;
  const visibleHeight = PLATE_RATIO / (A * k);
  const topVisible = 1 - visibleHeight;
  if (leftVisible > CONTENT_LEFT) {
    console.error(
      `[Hero] mobile crop shows from ${(leftVisible * 100).toFixed(2)}% of plate width, ` +
        `past INZO's left edge at ${(CONTENT_LEFT * 100).toFixed(1)}%. He will be cut. ` +
        'Lower MOBILE_PLATE_WIDTH.',
    );
  }
  if (topVisible > CONTENT_TOP) {
    console.error(
      `[Hero] mobile crop shows from ${(topVisible * 100).toFixed(2)}% of plate height, ` +
        `past INZO's halo at ${(CONTENT_TOP * 100).toFixed(1)}%. It will be cut. ` +
        'Lower MOBILE_CROP_ASPECT or MOBILE_PLATE_WIDTH.',
    );
  }
  if (visibleHeight > 1) {
    console.error(
      `[Hero] mobile crop frame is taller than the plate (${(visibleHeight * 100).toFixed(1)}% ` +
        'of it), so a blank band opens above. Raise MOBILE_PLATE_WIDTH or MOBILE_CROP_ASPECT.',
    );
  }
}

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
  '/hero-video/pane-voice-1920.webp',
  '/hero-video/pane-internet-1920.webp',
  '/hero-video/pane-redundancy-1920.webp',
];

/** Base plate — the video's own final frame, so the handoff is a pure fade. */
const PLATE_SRC = '/hero-video/inzo-hero-base-plate-1920.webp';
/**
 * The intro's literal first frame — the empty office, before INZO rolls in.
 * Verified against the clip at a mean absolute difference of 2.156/255.
 *
 * It exists to kill a flash. The plate is INZO already at the desk, and it is
 * the only thing in the server markup, so first paint showed him seated; the
 * video then mounts client-side, starts on an empty office, and he pops out of
 * existence before rolling back in. This frame covers the plate until the intro
 * hands off, so the first painted pixel already matches the clip's frame 0.
 */
const START_SRC = '/hero-video/inzo-hero-start-1920.webp';

/** Intro clip. webm first: same picture as the mp4 at 65% of the bytes. */
const INTRO_WEBM = '/hero-video/inzo-hero-intro-1080.webm';
const INTRO_MP4 = '/hero-video/inzo-hero-intro-1080.mp4';

/** Crossfade from the clip's last frame to the plate underneath it. */
const INTRO_FADE_MS = 300;

/**
 * How far the type column is nudged right of where the free-zone solve puts it,
 * at xl and up. Purely optical — the solve still centres or left-pins the column
 * inside the zone, and this rides on top as a single transform on the column, so
 * the block's internal alignment is untouched and the backdrop glow, being a
 * child of the column, travels with it.
 *
 * Capped by measured slack rather than taken on faith. The shift spends
 * clearance between the copy and INZO, so at a width where the headline already
 * fills the zone there is nothing to spend and the shift shrinks to what is
 * actually there. Capping here is deliberate in preference to walking the
 * headline clamp down again: the clamp has a floor for legibility reasons, and
 * an optical nudge is not a good enough reason to approach it.
 */
const COLUMN_SHIFT_VW = 2.2;

/**
 * Grace period after the fade before the element is dropped. Slightly longer
 * than the fade so a transitionend that never arrives — a backgrounded tab
 * skips them — still releases the video.
 */
const INTRO_UNMOUNT_MS = 350;

/**
 * Hard ceiling on the intro, measured from mount. The clip runs 5.04s; this
 * allows a little over that for a slow start, then hands off regardless.
 *
 * Without it a failure to reach `ended` is unrecoverable: the panes are gated
 * on the handoff, so they would never appear and the rotation would never
 * start, leaving the hero frozen on a still. `ended` not firing is not
 * hypothetical — autoplay can be refused (iOS Low Power Mode), a decode can
 * stall, and a tab backgrounded through the whole clip may never progress.
 */
const INTRO_CEILING_MS = 6500;

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
 * Where the free zone for the copy ends, as a fraction of the plate's width.
 *
 * INZO's left edge, not the glass pane's. On this plate he sits LEFT of the
 * glass (he spans 0.33-0.61, the glass 0.653-0.872), so he — not the pane — is
 * the nearest artwork to the copy, and stopping the free zone at the glass
 * would run the headline straight over his halo cubes. That is a reversal from
 * the 1712x1152 plate, where the pane was the leftmost element and this
 * constant tracked it.
 *
 * Deliberately the same number as CONTENT_LEFT, and for the same reason: it is
 * the leftmost pixel of the artwork. They are kept separate because they are
 * read for different jobs — CONTENT_LEFT bounds the mobile crop, this bounds
 * the desktop copy — and a future plate could move one without the other.
 */
const PANE_LEFT_FRACTION = CONTENT_LEFT;

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
 * Note which floor actually binds at the narrow end. HEADLINE_VW_MIN is not it:
 * 1.8vw is 23px at 1280, well under the clamp's own literal minimum, so at the
 * bottom of the side-by-side range it is that literal — now 2rem — that sets
 * the size, and the vw walk has no further effect once it is reached. Lowering
 * HEADLINE_VW_MIN alone would therefore change nothing at 1280; the literal is
 * the lever.
 *
 * 1.875rem is set from the narrowest side-by-side viewport, which is the only
 * one the literal still binds at. At 1280x800 it renders 30px, putting the
 * widest headline state at 509px and its right edge 23.9px clear of INZO's left
 * edge — where 2.25rem overhung him by 76.1px and 2rem by 9.1px. The literal
 * only binds at the very bottom of the range: by 1320 the vw walk has already
 * overtaken it (30.36px off 2.3vw) and sets the size from there up, so this
 * value stops mattering almost immediately. The column also stops overhanging
 * its own free zone, so the flex shrink that used to absorb the overrun — and
 * hide it from a naive measurement of the column box — is gone.
 */

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

/** xl breakpoint, matching the Tailwind utilities used throughout this file. */
const XL = 1280;

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
 * The xl+ size is fluid, which is what keeps "Your [WORD] Sourcing Experts" on
 * one line from 1280px up to very wide screens without ever breaking. Below xl
 * the hero stacks, so the headline gets the full container width and the fixed
 * md:text-5xl step carries it instead. Because
 * the size now depends on the viewport, the measurement has to re-run on
 * resize — see the effect below.
 */
const HEADLINE_TYPE =
  'text-3xl sm:text-4xl md:text-5xl xl:text-[clamp(1.875rem,var(--hero-headline-vw,3vw),4rem)] font-display font-extrabold tracking-tight whitespace-nowrap';

type Phase = 'visible' | 'swipe-left' | 'swipe-right';

export function Hero() {
  const reducedMotion = useReducedMotion();
  const isClient = useIsClient();
  /**
   * Has the intro handed off to the rotation?
   *
   * Gates three things at once: the panes' opacity, the rotation timer, and the
   * video's own fade-out. Seeded from reducedMotion, which is false on the
   * server and on the first client render — so the reduced-motion visitor gets
   * plate + Voice on their first painted frame, with no video and no flash of
   * an empty plate, while everyone else starts at false and waits for `ended`.
   */
  const [introDone, setIntroDone] = useState(reducedMotion);
  /** Kept mounted through the fade, then released. */
  const [introMounted, setIntroMounted] = useState(!reducedMotion);
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
   * xl+ placement of the type column, measured rather than assumed. Null until
   * the first measurement and below xl, where the mobile layout is untouched.
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
    /** Applied shift in px — COLUMN_SHIFT_VW, or the slack, whichever is less. */
    shift: number;
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
      // xl:block inside a column this value then sizes, so reading its
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

      // Below xl the plate is a static block under the copy and none of this
      // applies.
      if (window.innerWidth < XL) {
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

      // Clearance the column has left over between its right edge and INZO, in
      // the mode it just resolved to. Centred, the gap either side is equal;
      // left-pinned, everything not spent on the column or its edge gap is it.
      // Measured against paneLeft, not zone. zone is paneLeft ROUNDED, so at a
      // width where it rounds up the slack comes out a fraction too generous
      // and the shift lands the column a hair past INZO — it measured -0.1px at
      // 1280 before this. Floored for the same reason: spend whole pixels only.
      const clearance = Math.floor(
        mode === 'center'
          ? paneLeft - (zone + colWidth) / 2
          : paneLeft - MIN_EDGE_GAP - colWidth,
      );
      // Spend at most what is there. Never negative: at a width where the
      // headline already fills the zone the column simply does not move.
      const shift = Math.max(
        0,
        Math.min((COLUMN_SHIFT_VW / 100) * window.innerWidth, clearance),
      );

      setLayout((prev) =>
        prev && prev.zone === zone && prev.mode === mode && prev.shift === shift
          ? prev
          : { zone, mode, shift },
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

  /**
   * The OS setting can be turned on mid-visit, and useReducedMotion is live, so
   * both flags are read through it rather than stored with it folded in.
   * Derived at render rather than synced in an effect: an effect would need a
   * setState in its body, which is a cascading render, and would briefly leave
   * the video mounted after the visitor asked for less motion.
   */
  const handedOff = introDone || reducedMotion;
  // isClient as well as !reducedMotion: both hooks report motion-allowed on the
  // server, so without it the <video> ships in the SSR HTML and its <source>
  // starts downloading at parse time — spending ~1.3 MB on the one visitor who
  // asked for less motion, before hydration can unmount it.
  const videoMounted = isClient && introMounted && !reducedMotion;
  const videoRef = useRef<HTMLVideoElement>(null);
  /**
   * Arms the opacity transition one painted frame AFTER the clip mounts.
   *
   * The transition used to be on the element from its first commit, which is
   * what produced the ghost: INZO faded up from transparent instead of rolling
   * in. Mounting with no transition means the clip paints instantly at full
   * opacity — invisible, because its frame 0 is pixel-identical to the start
   * frame underneath — and arming it a frame later changes nothing on screen
   * while still having it in place for the fade-out at handoff.
   */
  const [fadeArmed, setFadeArmed] = useState(false);

  // One timer, one index. wordIndex drives both the headline word and which
  // pane is opaque, so the two can never drift apart.
  useEffect(() => {
    // Reduced motion holds on index 0: Voice word, Voice pane, no rotation.
    if (reducedMotion) return;
    // Nothing rotates until the intro has handed off. wordIndex is still 0 at
    // that moment, so Voice is the word and the pane the rotation starts from —
    // no seeding needed, and none wanted: setting it here would fight the
    // accordion's own index swap.
    if (!handedOff) return;

    // The first swipe is scheduled on its own shorter hold; the steady interval
    // is only created once that has run, so every later swipe is one full cycle
    // after the one before it rather than after handoff. Both handles are
    // cleaned up: the timeout may still be pending if the effect tears down
    // inside FIRST_HOLD_MS — reduced motion switched on mid-visit does exactly
    // that — and leaving it armed would fire a swipe after the rotation was
    // meant to stop.
    let interval: ReturnType<typeof setInterval> | undefined;
    const firstHold = setTimeout(() => {
      startTransition();
      interval = setInterval(startTransition, HOLD_DURATION + SWIPE_DURATION * 2);
    }, FIRST_HOLD_MS);

    return () => {
      clearTimeout(firstHold);
      if (interval) clearInterval(interval);
    };
  }, [startTransition, reducedMotion, handedOff]);

  /**
   * Start the clip only once it is genuinely on screen at full opacity.
   *
   * `autoPlay` is gone. It began playback the moment the element could play,
   * with nothing tying that to the element having been painted — so the clip
   * accumulated currentTime while it was not yet on screen and was then
   * revealed part-way in, with INZO already inside the frame instead of
   * entering from off-screen.
   *
   * Two rAFs, not one: the first runs after the commit that inserts the
   * element, the second after the frame that actually paints it. Only then is
   * currentTime reset to 0 and play() called, so the first advancing frame is
   * also the first frame anyone sees.
   */
  useEffect(() => {
    if (!videoMounted || handedOff) return;
    const el = videoRef.current;
    if (!el) return;

    let cancelled = false;
    let raf1 = 0;
    let raf2 = 0;

    const startWhenPainted = () => {
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          const v = videoRef.current;
          if (cancelled || !v) return;
          setFadeArmed(true);
          try {
            v.currentTime = 0;
          } catch {
            // Seeking before metadata throws in some engines; playback from
            // its natural 0 is the same thing here.
          }
          const played = v.play();
          // A blocked or failed play must hand off rather than strand the
          // rotation behind an intro that will never end.
          if (played && typeof played.catch === 'function') {
            played.catch(() => setIntroDone(true));
          }
        });
      });
    };

    // HAVE_FUTURE_DATA: enough buffered that play() will not immediately stall.
    if (el.readyState >= 3) startWhenPainted();
    else el.addEventListener('canplay', startWhenPainted, { once: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      el.removeEventListener('canplay', startWhenPainted);
    };
  }, [videoMounted, handedOff]);

  // Ceiling on the intro. Armed only while the video is actually the thing
  // being waited on, and cleared the moment it hands off.
  useEffect(() => {
    if (!videoMounted || handedOff) return;
    const t = setTimeout(() => setIntroDone(true), INTRO_CEILING_MS);
    return () => clearTimeout(t);
  }, [videoMounted, handedOff]);

  // Release the element once its fade has run. transitionend is the accurate
  // signal and this is the backstop, because a backgrounded tab does not fire
  // transitions at all and the video would otherwise stay mounted forever.
  useEffect(() => {
    if (!handedOff || !videoMounted) return;
    const t = setTimeout(() => setIntroMounted(false), INTRO_UNMOUNT_MS);
    return () => clearTimeout(t);
  }, [handedOff, videoMounted]);

  const currentWidth = wordWidths[wordIndex] || 0;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden min-h-hero xl:min-h-[85vh]! pt-20 pb-10 xl:pt-0 xl:pb-0 xl:flex xl:items-center"
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

           Once measured, at xl this stops being a centred container and spans
           from the viewport's left edge to the pane's left edge, with the column
           centred inside it — so the copy sits the same distance from the pane
           as from the edge. Below xl every one of those overrides is inert. */
        /* xl:pt-24 xl:pb-11 is the vertical balance, and it is on the flex item
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
           calls for. Both are inert below xl. */
        className={`relative z-10 w-full mx-auto max-w-[1680px] px-6 xl:pt-24 xl:pb-11 ${
          layout
            ? `xl:mx-0 xl:max-w-none xl:w-[var(--hero-zone)] xl:flex ${
                layout.mode === 'center'
                  ? 'xl:justify-center xl:px-0'
                  : 'xl:justify-start xl:pl-8 xl:pr-0'
              }`
            : 'xl:px-8'
        }`}
        style={
          layout
            ? ({ '--hero-zone': `${layout.zone}px` } as React.CSSProperties)
            : undefined
        }
      >
        {/* xl+: the column is pinned to the headline's widest state and its
            contents centred on that axis. Below xl nothing here applies and the
            mobile layout is untouched. The var falls back to fit-content for the
            pre-hydration frame, before the measurement has run. */}
        <div
          /* One transform, not per-element margins: the shift moves the column
             box and everything in it — copy and backdrop alike — so nothing
             inside re-aligns relative to anything else. A transform rather than
             a margin because it is exact in both modes; a margin on a
             justify-center flex item only moves it half as far. */
          className="relative xl:translate-x-[var(--hero-shift)] xl:w-[var(--hero-col)] xl:text-center"
          style={{
            '--hero-col': headlineMaxWidth ? `${headlineMaxWidth}px` : 'fit-content',
            '--hero-shift': layout ? `${layout.shift}px` : '0px',
          } as React.CSSProperties}
        >
          {/* ── Copy backdrop ─────────────────────────────────────────
              Soft light behind the copy, not a card. This is what makes the
              text legible over the artwork now that the plate's own wash stops
              at 31% and no longer reaches under the copy's right end.

              -inset-16 so it extends 4rem past the content on every side, and
              the radial reaches full transparency at 72% of the way to the
              farthest corner — inside the box, so the blur has clean falloff to
              work with and no edge can appear at any width. The blur is what
              turns a gradient into light.

              -z-10 rather than DOM order: an absolutely positioned child paints
              AFTER its in-flow siblings, so without it this would cover the
              copy it is meant to sit behind. It resolves inside the wrapper's
              z-10 stacking context, so it stays above the plate.

              xl only. Below xl the stack is on plain white and needs none of
              this. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 hidden xl:block"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.82) 42%, rgba(255,255,255,0) 72%)',
              filter: 'blur(28px)',
            }}
          />

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
            />
            {/* The h1's forced break, mirrored. The clone is only useful while
                it matches the h1 exactly, and without this it measures one
                unbroken line at every width — right at xl, but far too wide
                below sm where the headline really is two lines. `sm:hidden`
                means xl is measured exactly as it was before this was added,
                which the A/B confirmed. */}
            <br aria-hidden="true" className="sm:hidden" />{' '}
            Sourcing Experts
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            ref={headlineRef}
            /* xl:block + xl:text-left keeps the headline's LEFT edge pinned to
               the column while the block below it centres. If the h1 stayed
               inline-block inside a text-center column it would re-centre itself
               every time the accordion collapsed, and "Sourcing Experts" would
               breathe inward instead of sliding along the line. */
            className={`${HEADLINE_TYPE} text-[#1e293b] mb-5 xl:mb-8 leading-[1.1] inline-block xl:block xl:text-left`}
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
            className="text-lg md:text-2xl text-[#1e293b] mb-3 xl:mb-6 leading-snug xl:leading-relaxed font-medium max-w-xl xl:mx-auto"
          >
            Expert guidance at <span className="text-[#008838] font-bold">zero cost</span> to you.
            We&apos;re paid by carriers, not clients.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base md:text-xl text-[#1e293b] mb-6 xl:mb-12 leading-snug xl:leading-normal max-w-xl xl:mx-auto"
          >
            Insero is your technology broker, advising you on solutions, services,
            and the right vendors to meet all your technology needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            /* The one centred thing below xl. Everything above stays on the
               container's left padding edge. xl:block drops the flex context
               entirely, so at xl the link is an inline-block centred by the
               column's xl:text-center exactly as before. */
            className="flex justify-center xl:block"
          >
            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-8 py-4 xl:px-10 xl:py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
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
          Below xl: a normal block after the type column, held to the hero
          wrapper's width and padding so it lines up with the copy.
          At xl and up: breaks out of the wrapper and pins to the section's
          right edge, from PLATE_TOP_OFFSET down to the bottom. Height comes
          from that top/bottom pair rather than height:100%, and the width
          falls out of the locked aspect ratio — so clearing the nav also
          narrows the plate slightly, which is intended.
          `top` is inert below xl, where the wrapper is static. */}
      <div
        /* mt-5, not mt-10: the gap above the crop frame is one of the levers
               that lifts the artwork above the fold on a phone. No xl override
               here — `xl:mt-0` below already owns that breakpoint, and adding a
               second xl margin utility silently won over it, pushing the
               absolutely-positioned plate 40px down (top 88 -> 128) and shrinking
               it through the locked aspect ratio. */
        className="mt-5 w-full mx-auto max-w-[1680px] px-6
                   xl:mt-0 xl:mx-0 xl:max-w-none xl:w-auto xl:px-0
                   xl:absolute xl:right-0 xl:bottom-0 xl:z-0"
        style={{ top: PLATE_TOP_OFFSET }}
      >
        {/* Crop frame — below xl only. `xl:contents` makes it generate no box
            at all at xl and up, so the plate box below becomes a direct child
            of the wrapper again and desktop layout is untouched, not merely
            restored. aspect-ratio and overflow are both inert under
            display:contents, so neither needs an xl reset. */}
        <div
          className="relative w-full overflow-hidden rounded-2xl xl:contents"
          style={{ aspectRatio: MOBILE_CROP_ASPECT }}
        >
          <div
            /* The panes are positioned against this box, so this is the box the
               free-zone maths has to measure — not the wrapper around it.
               Below xl it is oversized and pinned to the crop frame's right and
               bottom; the panes ride along untouched because they are
               positioned as percentages OF this box. */
            ref={plateRef}
            /* The mobile width rides in on a CSS variable rather than the
               style attribute: an inline `width` outranks every class, so
               `xl:w-auto` could not override it and the 150% leaked into the
               desktop layout — measured as a 1.5x wider plate at 1718. */
            className="absolute right-0 bottom-0 w-[var(--plate-w)] xl:relative xl:right-auto xl:bottom-auto xl:w-auto xl:h-full"
            style={{ aspectRatio: PLATE_ASPECT, ['--plate-w' as string]: MOBILE_PLATE_WIDTH } as React.CSSProperties}
          >
            <Image
              src={PLATE_SRC}
              alt="INZO, the Insero robot, working at a desk in a loft office"
              fill
              /* NOT priority. The plate is INZO already at the desk, and while
                 the intro is still to play it is the one thing that must not
                 paint. It used to carry priority and therefore decoded first,
                 beating the start frame that covers it — at 10fps that read as
                 white, start frame, one frame of INZO, start frame again.

                 loading="eager" keeps it fetching at parse time, so it is
                 decoded long before the 5s handoff, without the preload and
                 fetchpriority=high that priority couples together. Next ties
                 the <head> preload to priority, so eager is how the plate gets
                 an early fetch while the start frame keeps the high-priority
                 slot it now needs as the real first-paint image. */
              loading="eager"
              sizes="(min-width: 1280px) 143vh, 140vw"
              /* The gate is CSS, not React, and that is the whole point: it
                 holds on the very first painted frame, before hydration, so no
                 decode order can expose INZO. motion-safe only, so a
                 reduced-motion visitor — who never gets a start frame or a
                 video — still has the plate as their first paint.

                 Dropped the instant handedOff flips, which is the same instant
                 the video begins its 300ms fade-out, so the surface the fade
                 reveals is already opaque underneath it. */
              className={`object-cover${handedOff ? '' : ' motion-safe:opacity-0'}`}
            />

            {/* ── Pre-intro start frame ─────────────────────────────
                Above the plate, below the clip, same box and same object-cover
                so all three crop identically.

                Rendered whenever the intro has not handed off — which includes
                the server, where useReducedMotion reports motion-allowed. That
                is deliberate: this has to be IN the server HTML or the
                pre-hydration paint is the plate again and the flash survives.

                `motion-reduce:hidden` is what keeps that honest. The markup
                ships to everyone, but a reduced-motion browser applies the
                media query before first paint, so it never renders there and
                that visitor's first frame is still plate + Voice. A JS-only
                gate could not do this: reducedMotion is false through
                hydration, so the frame would paint and then vanish. */}
            {!handedOff && (
              <Image
                src={START_SRC}
                alt=""
                aria-hidden="true"
                fill
                priority
                /* Explicit: this Next version emits neither fetchpriority nor a
                   high-priority hint from `priority` alone, and the plate's
                   preload still precedes this one in the head. Stating it here
                   is what actually puts the first-paint image ahead of the
                   image it is covering. */
                fetchPriority="high"
                sizes="(min-width: 1280px) 143vh, 140vw"
                className="object-cover motion-reduce:hidden"
              />
            )}

            {/* ── Intro clip ────────────────────────────────────────
                Sits between the plate and the panes, filling the same box, so
                it inherits the plate's aspect ratio and the mobile crop for
                free rather than carrying geometry of its own. object-cover to
                match the Image above it — anything else and the two would crop
                differently and the handoff would jump.

                Only ever rendered on the client and only when motion is
                allowed — see videoMounted. It is deliberately absent from the
                SSR markup, because a <source> in the initial HTML starts
                fetching at parse time and would spend the bytes before the
                reduced-motion check could run.

                The poster is the START frame, not the plate. The plate is INZO
                already at the desk, so posting it here painted him on top of
                the empty office the moment the element mounted and before a
                single video frame had decoded — a second source of exactly the
                flash this layer exists to prevent. The start frame is frame 0
                of this clip, so the poster, the image underneath and the first
                decoded frame are all the same pixels. */}
            {videoMounted && (
              <video
                ref={videoRef}
                aria-hidden="true"
                /* No autoPlay — see the effect above. Playback is started by
                   hand once the element has actually been painted. */
                muted
                playsInline
                preload="auto"
                poster={START_SRC}
                onEnded={() => setIntroDone(true)}
                // A clip that cannot play must not take the panes down with it.
                onError={() => setIntroDone(true)}
                onTransitionEnd={() => setIntroMounted(false)}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  opacity: handedOff ? 0 : 1,
                  // Fade-out only. Absent on mount, so the clip appears at full
                  // opacity in one frame rather than ghosting up from nothing.
                  ...(fadeArmed
                    ? { transition: `opacity ${INTRO_FADE_MS}ms linear` }
                    : null),
                }}
              >
                <source src={INTRO_WEBM} type="video/webm" />
                <source src={INTRO_MP4} type="video/mp4" />
              </video>
            )}

            {/* ── Copy wash ─────────────────────────────────────────
                Inside the plate box on purpose: it inherits the aspect ratio
                and the mobile crop from its parent, so the wash slides with the
                artwork instead of staying pinned to the viewport and washing
                the wrong part of the frame once the plate is cropped.

                Ordered after the video and before the panes so it covers both
                the still plate and the intro clip — the clip ends on this same
                frame, so washing only one of them would flash on handoff — and
                leaves the holograms untouched, which sit right of the fade's
                end anyway. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(to right, #fff 0%, #fff ${COPY_FADE_SOLID_PCT}%, rgba(255,255,255,0) ${COPY_FADE_CLEAR_PCT}%)`,
              }}
            />

            {/* All three panes are mounted for the life of the component and
                only ever cross-fade opacity — never unmount, never swap src,
                never move. The base plate underneath is untouched by a word
                change, so it never re-renders or re-decodes.

                Full-frame 1920x1080 overlays registered to the plate, so they
                are drawn at inset-0 with the same object-cover: they are the
                same picture as the plate, with only the hologram painted in.
                Any other fit would scale them independently and slide the
                hologram off the glass.

                Held at 0 until the intro hands off. The clip ends on this same
                frame without a hologram, so a pane appearing early would show
                through the video. */}
            {PANE_SRCS.map((src, i) => (
              <div
                key={src}
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  opacity: handedOff && i === wordIndex ? 1 : 0,
                  // Same duration and easing as the word accordion, so the pane
                  // and the word resolve together.
                  transition: `opacity ${SWIPE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 143vh, 140vw"
                  className="object-cover"
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
