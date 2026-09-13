'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
import { useReducedMotion, useIsClient, useHiDpiWide } from '@/lib/use-reduced-motion';
import { carrierAccessPhrase } from '@/data/carrier-access';
import { trackContactClick } from '@/lib/analytics';
import { company } from '@/config/company';

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
 * Point in the intro clip where the Voice pane is revealed, in seconds.
 *
 * INZO's hands land on the keyboard at ~3.75s of the 5.042s clip, and the
 * hologram reading as a response to that beat is the whole reason it appears
 * before the handoff rather than after it.
 *
 * Safe to draw over the clip because the clip's own frames carry no hologram —
 * the glass is empty in every one of them, including the last, which is why the
 * plate and the panes can be separate layers at all.
 *
 * Watched via `timeupdate`, which fires ~4x/second, so the reveal lands within
 * about 250ms of this mark. That is inside the beat. If it ever needs to be
 * frame-exact, requestVideoFrameCallback is the tool; it is not used here
 * because nothing else in this component runs per-frame and the precision is
 * not needed.
 */
const PANE_REVEAL_VIDEO_S = 3.75;

/** Same curve the pane cross-fade uses, so the eyebrow highlight and the pane read as one movement. */
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
 * Index-aligned with rotatingWords, so the highlighted eyebrow word takes the
 * colour of the pane it appears with — Internet is orange because its pane is.
 * Driven by the same wordIndex as PANE_SRCS below, and transitioned over the same
 * duration as the pane cross-fade, so the highlight and the pane change together.
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

/**
 * The same frame at 2560x1440, for the screens that can resolve it.
 *
 * Frame-identical to START_SRC, so it is a straight resolution swap: it stays
 * registered to the plate and to the clip's frame 0 the way the 1920 version
 * is, and it is rendered through the same object-cover box with no styling of
 * its own. Anything else here and the start frame would crop differently from
 * the layer it exists to match, which is the one thing it must never do.
 */
const START_SRC_2K = '/hero-video/inzo-hero-start-2k.webp';

/** Intro clip. webm first: same picture as the mp4 at 65% of the bytes. */
const INTRO_WEBM = '/hero-video/inzo-hero-intro-1080.webm';
const INTRO_MP4 = '/hero-video/inzo-hero-intro-1080.mp4';
/**
 * The intro at 2560x1440. Same 121 frames at 24fps, same 5.042s runtime, so
 * PANE_REVEAL_VIDEO_S and every other timing constant read the same clock
 * whichever file is playing — this is a resolution swap and nothing else.
 *
 * mp4 only: there is no 2K webm, which is why the retina branch below replaces
 * the source list rather than prepending to it.
 */
const INTRO_MP4_2K = '/hero-video/inzo-hero-intro-2k.mp4';

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
 * the measurement pass can lower it. It only ever moves if the column — the
 * headline's widest line or the eyebrow, whichever is wider — would otherwise
 * overrun the free zone, which is a real
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
 * 1.875rem was set from the narrowest side-by-side viewport, when the headline
 * was the single-line accordion ("Your Redundancy Sourcing Experts" at 509px on
 * 1280x800). The static two-line headline is far narrower, so the walk now
 * rarely needs to reach it, but it is kept as the legibility floor.
 */

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
 * The headline's type. Two fixed lines, broken by a <br>; whitespace-nowrap stops
 * either line wrapping on its own, which is what makes the widest line a stable
 * width the layout pass can measure.
 *
 * The xl+ size is fluid. Below xl the hero stacks, so the headline gets the full
 * container width and the fixed md:text-5xl step carries it instead. Because the
 * size depends on the viewport, the measurement has to re-run on resize — see
 * the effect below.
 */
const HEADLINE_TYPE =
  'text-3xl sm:text-4xl md:text-5xl xl:text-[clamp(1.875rem,var(--hero-headline-vw,3vw),4rem)] font-display font-extrabold tracking-tight whitespace-nowrap';

export function Hero() {
  const reducedMotion = useReducedMotion();
  const isClient = useIsClient();
  /**
   * Wide viewport AND more than one device pixel per CSS pixel — the only
   * screens a 2560x1440 source is worth its bytes on. False on the server and
   * through hydration, so every branch below defaults to the 1080p files and
   * upgrades on the first post-hydration render.
   */
  const hiDpiWide = useHiDpiWide();
  /**
   * One src for both the start-frame Image and the clip's poster, so the two
   * cannot drift onto different resolutions of the same frame.
   *
   * The Image ships in the SSR markup at 1920 and swaps here after hydration,
   * which costs no second request on the screens that take the swap: the video
   * mounts in that same render with this exact URL as its poster, so the 2K
   * frame is fetched once and shared. Browsers hold the previously decoded
   * image on an in-place src change, so the swap is not a repaint gap either.
   */
  const startSrc = hiDpiWide ? START_SRC_2K : START_SRC;
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
  /**
   * Width the type column is pinned to at xl: the headline's widest line or the
   * eyebrow, whichever is wider. Pinned rather than left fit-content so the
   * subcopy wraps inside the headline's measure instead of running out to its own
   * max-width — at 1280x900 that max-width is wider than the whole free zone.
   */
  const [columnWidth, setColumnWidth] = useState<number | null>(null);
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
  /** Shrink-to-fit wrapper around the headline's two lines; its width is the widest line. */
  const headlineLinesRef = useRef<HTMLSpanElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  // Measures the column (the headline's widest line or the eyebrow) and the free
  // zone it is centred in. Both go stale on resize — the column because the
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
      // Both are w-max, so their widths are their own content — two nowrap lines,
      // one nowrap row — and never whatever the column they sit in is pinned to.
      // Measuring the h1 box instead would read the column's width back, a
      // feedback loop, because the h1 is xl:block inside it. Nothing in either
      // changes width as wordIndex rotates: the headline is static and the
      // eyebrow only recolours.
      const lines = headlineLinesRef.current;
      const eyebrow = eyebrowRef.current;
      if (!lines || !eyebrow) return;
      const colWidth = Math.ceil(
        Math.max(lines.getBoundingClientRect().width, eyebrow.getBoundingClientRect().width),
      );
      setColumnWidth((prev) => (prev === colWidth ? prev : colWidth));

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
      // to clear the pane by GAP_TO_PANE. If the column cannot,
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

  // The index still advances SWIPE_DURATION after each transition starts, as it
  // did when a word accordion collapsed first. Nothing collapses now, but keeping
  // the delay keeps every pane change at exactly the moment it has always landed.
  const startTransition = useCallback(() => {
    setTimeout(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
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
  /**
   * Has the Voice pane been revealed by the clip reaching its cue?
   *
   * Only ever set true, and only by the clip. Every path that skips or kills
   * the clip — onError, a refused play(), the ceiling, reduced motion — reveals
   * the pane through handedOff instead, so there is no route where the hologram
   * fails to appear.
   */
  const [paneRevealed, setPaneRevealed] = useState(false);

  // One timer, one index. wordIndex drives both the eyebrow highlight and which
  // pane is opaque, so the two can never drift apart.
  useEffect(() => {
    // Reduced motion holds on index 0: Voice highlighted, Voice pane, no rotation.
    if (reducedMotion) return;
    // Nothing rotates until the intro has handed off. wordIndex is still 0 at
    // that moment, so Voice is the word and the pane the rotation starts from —
    // no seeding needed, and none wanted: setting it here would fight the
    // transition's own index swap.
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

  return (
    <section
      ref={sectionRef}
      /* pt-20 lg:pt-24 is the fixed header's height at each breakpoint (h-20
         lg:h-24), so the stacked copy starts where the header ends. At lg a
         flat pt-20 left the first 16px under the header, which put the eyebrow
         on top of the logo's tagline. */
      className="relative bg-white overflow-hidden min-h-hero xl:min-h-[85vh]! pt-20 lg:pt-24 pb-10 xl:pt-0 xl:pb-0 xl:flex xl:items-center"
      /* Set on the section so the headline and anything measured off it
         resolve the same fluid size from one place. */
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
            '--hero-col': columnWidth ? `${columnWidth}px` : 'fit-content',
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

          {/* ── Eyebrow ────────────────────────────────────────────────
              All three words are always rendered, at full width, in one nowrap
              row. The word matching wordIndex takes its pane's colour and full
              opacity; the other two stay muted. Only colour and opacity
              transition, so nothing in the row moves or reflows as the
              highlight travels — and the row's width is stable enough to feed
              the column measurement.

              Muted is #475569 at 0.8, which blends to ~#6c7787 on white: still
              clearly secondary to the highlight, and 4.6:1 so the words stay
              readable. w-max keeps the row its own width inside a pinned
              column. flex, not inline-flex: below xl the h1 after it is
              inline-block, and an inline row would sit beside it on one line
              wherever there is room (it did at 1024). xl:mx-auto centres the
              block on the column's axis. */}
          <motion.div
            ref={eyebrowRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex w-max items-center gap-3 whitespace-nowrap text-sm font-semibold tracking-widest uppercase mb-4 xl:mb-6 xl:mx-auto"
          >
            {rotatingWords.map((word, i) => (
              <span key={word} className="inline-flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-[#475569] opacity-50">
                    ·
                  </span>
                )}
                <span
                  style={{
                    color: i === wordIndex ? WORD_COLORS[i] : '#475569',
                    opacity: i === wordIndex ? 1 : 0.8,
                    transition: `color ${SWIPE_DURATION}ms ${SWIPE_EASING}, opacity ${SWIPE_DURATION}ms ${SWIPE_EASING}`,
                  }}
                >
                  {word}
                </span>
              </span>
            ))}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            /* xl:block + xl:text-center centres the headline on the column's
               axis. Below xl the h1 stays inline-block and left-aligned with
               the copy under it. The text never changes, so nothing here moves
               once it has laid out. */
            className={`${HEADLINE_TYPE} text-[#1e293b] mb-5 xl:mb-8 leading-[1.1] inline-block xl:block xl:text-center`}
          >
            {/* w-max, so this box is exactly the widest line whatever the h1
                around it is sized to. That width is what the layout pass pins
                the column to. The <br> is the break at every width; nowrap on
                the type keeps either line from wrapping on its own. */}
            <span ref={headlineLinesRef} className="inline-block w-max">
              Sourcing experts who
              <br />
              <span className="text-[#008838]">cost you nothing</span>
            </span>
          </motion.h1>

          {/* Keeps its own max-w-xl below xl. At xl the column is pinned to the
              headline's width, so this wraps inside that measure rather than
              running out to 36rem. */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-2xl text-[#1e293b] mb-6 xl:mb-12 leading-snug xl:leading-relaxed font-medium max-w-xl xl:mx-auto"
          >
            {/* From xl up each sentence gets its own line; the column is never
                narrower than either sentence there. Below xl the break is
                display:none and the paragraph wraps naturally. */}
            We compare {carrierAccessPhrase}.{' '}
            <br className="hidden xl:inline" />
            Providers pay us, not you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            /* A vertical stack at every width: the button, then the phone link
               on its own line, both centred on the column's axis. At xl that
               axis is --hero-col's centre. Neither child may shrink: squeezed
               into the 389px column at 1280 the button once wrapped "Get
               Started" onto two lines. */
            className="flex flex-col items-center gap-3"
          >
            <Link href="/contact" className="shrink-0">
              <button className="group inline-flex items-center gap-3 px-8 py-4 xl:px-10 xl:py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <span>Get Started</span>
                <ArrowRight
                  weight="bold"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </Link>
            {/* Same link and tracking as the phone link in FinalCTA. */}
            <a
              href={company.phoneLink}
              onClick={() => trackContactClick({ method: 'phone' })}
              className="shrink-0 text-lg text-[var(--color-gray-600)] hover:text-[#1e293b] transition-colors whitespace-nowrap"
            >
              or call <span className="font-bold text-[#1e293b]">{company.phoneFormatted}</span>
            </a>
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
                src={startSrc}
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
                poster={startSrc}
                onTimeUpdate={(e) => {
                  // Cheap and idempotent: React keeps the handler attached, and
                  // the state setter no-ops once it is already true, so there is
                  // nothing to tear down and no way to fire the reveal twice.
                  if (!paneRevealed && e.currentTarget.currentTime >= PANE_REVEAL_VIDEO_S) {
                    setPaneRevealed(true);
                  }
                }}
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
                {/* Replaces the list rather than extending it. There is no 2K
                    webm, and a 1080 webm left ahead of the 2K mp4 would win on
                    every browser that can decode webm — which is the browsers
                    this branch exists for. Picking here rather than with a
                    <source media> query is deliberate: media on <source> is
                    matched against width honestly enough, but DPR and
                    resolution conditions there are inconsistently implemented,
                    and a wrong match is a silently wrong download.

                    Safe to swap on a mid-intro resize: changing <source>
                    children does not reselect a resource without an explicit
                    load(), so a clip already playing keeps playing the file it
                    started, and only a later mount would see the new list. */}
                {hiDpiWide ? (
                  <source src={INTRO_MP4_2K} type="video/mp4" />
                ) : (
                  <>
                    <source src={INTRO_WEBM} type="video/webm" />
                    <source src={INTRO_MP4} type="video/mp4" />
                  </>
                )}
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

                The active pane is revealed at PANE_REVEAL_VIDEO_S, part way
                through the clip, and by handedOff on every path that does not
                play it. wordIndex is still 0 while the intro runs, so the pane
                that appears early is always Voice; the rotation does not start
                until handedOff and is not affected by this.

                Drawing over the still-playing clip is sound because the clip
                carries no hologram in any frame, so there is nothing underneath
                for the pane to disagree with — and the frame it ends on is the
                plate, which does not either. */}
            {PANE_SRCS.map((src, i) => (
              <div
                key={src}
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  opacity: (paneRevealed || handedOff) && i === wordIndex ? 1 : 0,
                  // Same duration and easing as the eyebrow highlight, so the pane
                  // and the highlighted word resolve together.
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
