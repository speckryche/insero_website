'use client';

import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

// useLayoutEffect warns during SSR; this is the usual isomorphic stand-in.
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/** Fixed header height, read from the --header-h custom property on <html>. */
function headerHeight(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Scroll progress through a pinned section, ported from the prototype's pin
 * engine. The wrapper is tall (e.g. 620vh) and holds a sticky stage that sits
 * under the fixed header; progress runs 0 → 1 while the stage is pinned.
 *
 * `onProgress` is called inside a requestAnimationFrame on scroll and resize,
 * and mutates the DOM directly. Routing every frame through React state would
 * re-render dozens of SVG nodes per frame for no benefit.
 *
 * Under prefers-reduced-motion the section is not pinned (CSS drops the tall
 * wrapper), so progress is fixed at 1: the finished state, with no animation.
 */
export function usePinProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
): void {
  const cb = useRef(onProgress);
  useIsoLayoutEffect(() => {
    cb.current = onProgress;
  });

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;

    const tick = () => {
      raf = 0;
      if (mq.matches) {
        cb.current(1);
        return;
      }
      const nh = headerHeight();
      const r = el.getBoundingClientRect();
      const span = el.offsetHeight - (window.innerHeight - nh);
      const p = span > 0 ? clamp(-(r.top - nh) / span) : 1;
      cb.current(p);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mq.addEventListener('change', schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mq.removeEventListener('change', schedule);
    };
  }, [ref]);
}

export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
