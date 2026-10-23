'use client';

import { useEffect, useId, useRef } from 'react';

/**
 * The homepage's green line: one SVG path over the whole page that draws
 * itself as you scroll, from the cable trailing off the grass in the hero down
 * to the top edge of the final CTA. Behaviour spec:
 * docs/prototype/insero-line-scroll-prototype.html (build(), update(), lenAtY()).
 *
 * Mount it once, as a child of the page container (position: relative). The
 * route is not hard-coded: elements opt in with data attributes and are read
 * in document order.
 *
 *   data-line="start"         the hero; the line starts at HERO_LINE_START
 *   data-line="through"       enter the left side at mid-height, exit the right
 *   data-line="through-rtl"   the same, mirrored
 *   data-line="gutter-left"   run straight down the left gutter past it
 *   data-line="gutter-right"  ditto, right gutter (use these for pinned sections)
 *   data-line="end"           final point on its top edge; data-line-x is the
 *                             fraction of its width (default 0.5)
 *
 *   data-line-trigger="id"    dispatch 'greenline:reach' {id} once the tip
 *                             reaches this element's top (or the fraction of
 *                             its height in data-line-trigger-at)
 *   data-line-above           sits above the line (the line passes behind it)
 *
 * 'greenline:complete' fires once the whole line is drawn. Positions are
 * measured with an offsetTop/offsetLeft walk, so CSS transforms (reveals, card
 * animations) never bend the path. Tag the tall pin wrapper of a sticky
 * section, never the sticky stage itself: a stuck element reports its stuck
 * offset, which changes with scroll.
 */

/**
 * Where the hero cable trails off on the grass, as fractions of the hero
 * media's frame. Measured on public/hero/hero-poster.jpg (1920x1080): the
 * leftmost bright-green cable pixels end at about (555, 898).
 */
export const HERO_LINE_START = { x: 0.289, y: 0.831 } as const;

const LINE_COLOR = '#7cf55a';
/** The tip sits this far down the viewport while drawing. */
const TIP_AT = 0.62;
const SAMPLE_STEP = 6;
/** Below this width, through/through-rtl collapse to one centre point. */
const THROUGH_MIN_WIDTH = 900;
/** Gutters sit just outside a content column this wide. */
const GUTTER_COLUMN = 1520;
const EDGE = 14;
const REBUILD_DELAY = 120;

declare global {
  interface WindowEventMap {
    'greenline:reach': CustomEvent<{ id: string }>;
    'greenline:complete': CustomEvent<null>;
    'greenline:rebuild': Event;
  }
}

type Pt = { x: number; y: number };
type Box = { left: number; top: number; width: number; height: number };

// Module state, so sections can ask after the fact instead of racing the event.
const reached = new Set<string>();
let complete = false;
let rebuildNow: (() => void) | null = null;

/** Re-measure the route, e.g. after a section changes height. */
export function rebuildGreenLine(): void {
  if (rebuildNow) rebuildNow();
  else if (typeof window !== 'undefined') window.dispatchEvent(new Event('greenline:rebuild'));
}

export const hasGreenLineReached = (id: string) => reached.has(id);
export const isGreenLineComplete = () => complete;

/** Position relative to `root`, ignoring transforms. Null if not laid out inside it. */
function measure(el: HTMLElement, root: HTMLElement): Box | null {
  let left = 0;
  let top = 0;
  let n: HTMLElement | null = el;
  while (n && n !== root) {
    left += n.offsetLeft;
    top += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  if (n !== root) return null;
  return { left, top, width: el.offsetWidth, height: el.offsetHeight };
}

/** One object-position component as a fraction of the free space. */
function positionFraction(token: string | undefined, free: number): number {
  if (!token) return 0.5;
  if (token.endsWith('%')) return parseFloat(token) / 100;
  const px = parseFloat(token);
  return free !== 0 && Number.isFinite(px) ? px / free : 0.5;
}

/** HERO_LINE_START mapped through object-fit: cover onto the hero box. */
function heroStart(hero: HTMLElement, box: Box): Pt {
  const media = hero.querySelector('video');
  const nw = media?.videoWidth || 1920;
  const nh = media?.videoHeight || 1080;
  const s = Math.max(box.width / nw, box.height / nh);
  const iw = nw * s;
  const ih = nh * s;
  const [px, py] = media ? getComputedStyle(media).objectPosition.split(/\s+/) : [];
  const ox = (box.width - iw) * positionFraction(px, box.width - iw);
  const oy = (box.height - ih) * positionFraction(py, box.height - ih);
  return {
    x: box.left + ox + HERO_LINE_START.x * iw,
    y: box.top + oy + HERO_LINE_START.y * ih,
  };
}

export function GreenLine() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowId = `gl-glow-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    const dot = dotRef.current;
    const root = svg?.parentElement;
    if (!svg || !path || !dot || !root) return;

    // A fresh visit to the page starts a fresh line.
    reached.clear();
    complete = false;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let len = 0;
    let samples: [number, number][] = [];
    let triggers: { id: string; y: number }[] = [];
    let raf = 0;
    let timer = 0;

    const clampX = (x: number, w: number) => Math.max(EDGE, Math.min(w - EDGE, x));

    const build = () => {
      const W = root.clientWidth;
      const H = root.offsetHeight;
      svg.setAttribute('width', String(W));
      svg.setAttribute('height', String(H));

      const hero = root.querySelector<HTMLElement>('[data-line="start"]');
      const heroBox = hero && measure(hero, root);
      if (!hero || !heroBox) {
        path.removeAttribute('d');
        len = 0;
        samples = [];
        return;
      }

      const p0 = heroStart(hero, heroBox);
      p0.x = clampX(p0.x, W);
      const pts: Pt[] = [p0, { x: p0.x, y: heroBox.top + heroBox.height + 40 }];
      const gutter = Math.max(EDGE, (W - Math.min(W, GUTTER_COLUMN)) / 2 + W * 0.02);

      for (const el of root.querySelectorAll<HTMLElement>('[data-line]')) {
        const kind = el.dataset.line;
        if (kind === 'start') continue;
        const b = measure(el, root);
        if (!b) continue;
        const l = b.left;
        const r = b.left + b.width;
        const mid = b.top + b.height / 2;

        if (kind === 'through' || kind === 'through-rtl') {
          if (W < THROUGH_MIN_WIDTH) {
            pts.push({ x: W / 2, y: mid });
          } else if (kind === 'through') {
            pts.push(
              { x: clampX(l - 46, W), y: mid - 130 },
              { x: clampX(l + 30, W), y: mid },
              { x: clampX(r - 30, W), y: mid },
              { x: clampX(r + 46, W), y: mid + 130 },
            );
          } else {
            pts.push(
              { x: clampX(r + 46, W), y: mid - 130 },
              { x: clampX(r - 30, W), y: mid },
              { x: clampX(l + 30, W), y: mid },
              { x: clampX(l - 46, W), y: mid + 130 },
            );
          }
        } else if (kind === 'gutter-left' || kind === 'gutter-right') {
          const x = kind === 'gutter-left' ? gutter : W - gutter;
          pts.push({ x, y: b.top + b.height * 0.2 }, { x, y: b.top + b.height * 0.8 });
        } else if (kind === 'end') {
          const fx = parseFloat(el.dataset.lineX ?? '');
          const x = l + (Number.isFinite(fx) ? fx : 0.5) * b.width;
          pts.push({ x, y: b.top - 120 }, { x, y: b.top + 1 });
          break;
        }
      }

      // Cubic segments with both controls at the vertical midpoint.
      let d = `M${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const c = pts[i];
        const my = (a.y + c.y) / 2;
        d += ` C${a.x},${my} ${c.x},${my} ${c.x},${c.y}`;
      }
      path.setAttribute('d', d);
      path.setAttribute('stroke-width', String(Math.max(3, W * 0.0047)));

      len = path.getTotalLength();
      samples = [];
      for (let s = 0; s < len; s += SAMPLE_STEP) samples.push([s, path.getPointAtLength(s).y]);
      // Always end on the exact total. Without it, at some sizes the last
      // sample fell short and "fully drawn" never fired.
      samples.push([len, path.getPointAtLength(len).y]);
      path.style.strokeDasharray = String(len);

      triggers = [];
      for (const el of root.querySelectorAll<HTMLElement>('[data-line-trigger]')) {
        const id = el.dataset.lineTrigger;
        const b = measure(el, root);
        if (!id || !b) continue;
        const at = parseFloat(el.dataset.lineTriggerAt ?? '');
        triggers.push({ id, y: b.top + b.height * (Number.isFinite(at) ? at : 0) });
      }

      update();
    };

    /** Drawn length at which the path first gets below page-y `y`. */
    const lenAtY = (y: number) => {
      let best = 0;
      for (const [l, py] of samples) {
        if (py <= y) best = l;
        else if (py > y + 400) break;
      }
      return best;
    };

    const update = () => {
      raf = 0;
      if (!len) return;
      const tipY = window.innerHeight * TIP_AT - root.getBoundingClientRect().top;
      const doc = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 2;
      const L = reduce.matches || atBottom ? len : Math.min(len, lenAtY(tipY));
      path.style.strokeDashoffset = String(len - L);

      const p = path.getPointAtLength(L);
      dot.style.left = `${p.x}px`;
      dot.style.top = `${p.y}px`;
      dot.style.opacity = !reduce.matches && L > 2 && L < len - 2 ? '1' : '0';

      const done = L >= len - 0.5;
      for (const t of triggers) {
        if (reached.has(t.id) || (!done && p.y < t.y)) continue;
        reached.add(t.id);
        window.dispatchEvent(new CustomEvent('greenline:reach', { detail: { id: t.id } }));
      }
      if (done && !complete) {
        complete = true;
        window.dispatchEvent(new CustomEvent('greenline:complete', { detail: null }));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const rebuildSoon = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(build, REBUILD_DELAY);
    };

    rebuildNow = build;
    build();
    document.fonts?.ready.then(build).catch(() => {});
    const heroVideo = root.querySelector('[data-line="start"] video');
    heroVideo?.addEventListener('loadedmetadata', build);
    const ro = new ResizeObserver(rebuildSoon);
    ro.observe(root);
    window.addEventListener('load', build);
    window.addEventListener('resize', rebuildSoon);
    window.addEventListener('greenline:rebuild', build);
    window.addEventListener('scroll', schedule, { passive: true });
    reduce.addEventListener('change', schedule);

    return () => {
      if (rebuildNow === build) rebuildNow = null;
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      ro.disconnect();
      heroVideo?.removeEventListener('loadedmetadata', build);
      window.removeEventListener('load', build);
      window.removeEventListener('resize', rebuildSoon);
      window.removeEventListener('greenline:rebuild', build);
      window.removeEventListener('scroll', schedule);
      reduce.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <>
      <svg ref={svgRef} className="hm-gl" width={0} height={0} aria-hidden="true" focusable="false">
        <defs>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path ref={pathRef} fill="none" stroke={LINE_COLOR} strokeLinecap="round" filter={`url(#${glowId})`} />
      </svg>
      <div ref={dotRef} className="hm-gl-dot" aria-hidden="true" />
    </>
  );
}

export default GreenLine;
