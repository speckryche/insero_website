'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Zoom interface cards that launch from the desk phone in the hero clip, ride
 * the light ribbon, and park along it.
 *
 * Everything about the choreography is in HERO_CARDS below — reorder, resize,
 * or delete a card by editing that one block. Spawn order is array order.
 */
export interface HeroCard {
  /** Filename stem in /public/images/zoom. */
  slug: string;
  /** Where along the bezier the card comes to rest, 0–1. */
  distance: number;
  /** Rendered width as a percentage of the media card's width. */
  width: number;
}

export const HERO_CARDS: HeroCard[] = [
  { slug: '06-ava-pill', distance: 0.14, width: 8 },
  { slug: '04-inbound-monitor', distance: 0.31, width: 9 },
  { slug: '01-phone-panel', distance: 0.47, width: 7.5 },
  { slug: '02-call-controls', distance: 0.62, width: 7.5 },
  { slug: '03-ai-companion', distance: 0.78, width: 9 },
  { slug: '05-kristen-toast', distance: 0.93, width: 12 },
];

/**
 * Path the cards fly. Control points are fractions of the media card, so the
 * curve rescales with the container and never needs re-authoring per breakpoint.
 * P0 sits on the phone; P3 parks up in the open top-right corner.
 */
const P0 = { x: 0.3, y: 0.66 };
const P1 = { x: 0.44, y: 0.4 };
const P2 = { x: 0.6, y: 0.28 };
const P3 = { x: 0.9, y: 0.14 };

const KEYFRAMES = 20;
const TRAVEL_MS = 1400;
const TRAVEL_EASING = 'cubic-bezier(.22,.85,.3,1)';
const FIRST_SPAWN_MS = 500;
const SPAWN_GAP_MS = 1100;
/** Matches the clip's 20s loop so the sequence stays in phase with it. */
const CYCLE_MS = 20000;

function bezierAt(t: number) {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return {
    x: a * P0.x + b * P1.x + c * P2.x + d * P3.x,
    y: a * P0.y + b * P1.y + c * P2.y + d * P3.y,
  };
}

/**
 * translate(px) then translate(-50%,-50%) then scale: the element ends up
 * centred on its path point and scales about that centre. Transform and
 * opacity only — nothing here touches layout.
 */
function travelKeyframes(card: HeroCard, w: number, h: number): Keyframe[] {
  const frames: Keyframe[] = [];
  for (let i = 0; i < KEYFRAMES; i++) {
    const progress = i / (KEYFRAMES - 1);
    const point = bezierAt(progress * card.distance);
    const scale = 0.25 + 0.75 * progress;
    const opacity = i === 0 ? 0 : i === 1 ? 0.3 : i === 2 ? 0.6 : 1;
    frames.push({
      transform: `translate(${point.x * w}px, ${point.y * h}px) translate(-50%, -50%) scale(${scale})`,
      opacity,
      offset: progress,
    });
  }
  return frames;
}

/** SSR-safe: starts false, corrects on mount, and tracks later changes. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

const SWAY_CSS = `
@keyframes zoomHeroSway {
  0%, 100% { transform: rotateY(-24deg); }
  50%      { transform: rotateY(24deg); }
}`;

export default function ZoomHeroCards() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animsRef = useRef<Animation[]>([]);
  const [tick, setTick] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Fractional path points mean every position depends on the container's
  // pixel size, so it is measured rather than assumed.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const ro = new ResizeObserver(() => setTick((n) => n + 1));
    ro.observe(host);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Read the live box rather than a state copy: the layer is absolutely
    // positioned, so its size is known as soon as the card has laid out.
    const { width: w, height: h } = host.getBoundingClientRect();
    if (!w || !h) return;

    // Reduced motion: park everything, no travel, no sway. Done by writing the
    // final transform straight to the element rather than running a zero-length
    // animation, so nothing animates at any point.
    if (reduced) {
      animsRef.current.forEach((a) => a.cancel());
      animsRef.current = [];
      HERO_CARDS.forEach((card, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const point = bezierAt(card.distance);
        el.style.transform = `translate(${point.x * w}px, ${point.y * h}px) translate(-50%, -50%) scale(1)`;
        el.style.opacity = '1';
      });
      return;
    }

    // Preserve position across a resize: rebuild the keyframes at the new size
    // and seek each animation back to where it already was, so a window drag
    // rescales the path instead of replaying the fly-in.
    const previous = animsRef.current.map((a) => a.currentTime);
    animsRef.current.forEach((a) => a.cancel());
    animsRef.current = [];

    HERO_CARDS.forEach((card, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      el.style.opacity = '';
      const anim = el.animate(travelKeyframes(card, w, h), {
        duration: TRAVEL_MS,
        delay: FIRST_SPAWN_MS + i * SPAWN_GAP_MS,
        easing: TRAVEL_EASING,
        // `both` holds the first frame through the delay and the last frame
        // after — spawn and stay, with no flash of an unpositioned card.
        fill: 'both',
      });
      // A finished animation with a fill is "replaceable" and Chrome may
      // remove it automatically, taking the parked transform with it.
      anim.persist();
      const seek = previous[i];
      if (typeof seek === 'number') anim.currentTime = seek;
      animsRef.current.push(anim);
    });

    const cycle = window.setInterval(() => {
      animsRef.current.forEach((a) => {
        a.currentTime = 0;
      });
    }, CYCLE_MS);

    return () => {
      window.clearInterval(cycle);
      animsRef.current.forEach((a) => a.cancel());
      animsRef.current = [];
    };
  }, [tick, reduced]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      // Perspective on the layer, preserve-3d on each wrapper, so the inner
      // sway reads as a turn in depth rather than a flat squash.
      style={{ perspective: '1400px' }}
    >
      <style>{SWAY_CSS}</style>
      {HERO_CARDS.map((card, i) => (
        <div
          key={card.slug}
          ref={(node) => {
            cardRefs.current[i] = node;
          }}
          className="absolute left-0 top-0 will-change-transform"
          style={{ width: `${card.width}%`, opacity: 0, transformStyle: 'preserve-3d' }}
        >
          {/* Sway lives on an inner element so it cannot fight the travel
              transform on the wrapper. A gentle turn, never a full rotation —
              these cards carry legible text and must not show a mirrored back. */}
          <div
            style={
              reduced
                ? undefined
                : {
                    animation: `zoomHeroSway 7s ease-in-out ${(i * 0.9).toFixed(2)}s infinite`,
                    transformStyle: 'preserve-3d',
                  }
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/zoom/${card.slug}.png`}
              alt=""
              aria-hidden="true"
              draggable={false}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="block w-full h-auto select-none"
              style={{ filter: 'drop-shadow(0 18px 32px rgba(15, 45, 61, 0.28))' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
