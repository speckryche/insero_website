'use client';

import { useEffect, useRef } from 'react';

/*
 * Final scene (spec section.final). The main clip plays once when the scene
 * is half way up the screen and holds its last frame; when it ends the living
 * loop crossfades in over it and light packets start running down the cable.
 * Under prefers-reduced-motion it stays on the poster: no autoplay, no
 * packets.
 */

// The cable from the top edge of the clip down to the building, in the
// clip's own 854x480 coordinates (measured from the footage).
const CABLE =
  'M475.5,0 L475.5,12 L476.0,24 L476.5,36 L476.5,48 L475.5,60 L474.0,72 L471.5,84 L465.5,96 L429.5,108 L413.5,114 L405.0,120 L400.5,132 L399.5,144 L398.5,156 L400.5,168 L401.5,180 L403.5,192 L404.5,204 L406.5,216 L407.5,228 L408.5,240 L409.5,252 L409.5,264 L407.5,276 L405.5,288 L402.5,300 L401.5,306';

const PACKETS = 5;
const SPEED = 260; // page px per second, as in the spec

export function FinalScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLVideoElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const main = mainRef.current;
    const loop = loopRef.current;
    const path = pathRef.current;
    const dots = dotsRef.current;
    if (!scene || !main || !loop || !path || !dots) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let played = false;
    let raf = 0;

    const tick = (t0: number) => (now: number) => {
      const scale = main.clientWidth / 854; // clip px -> page px
      const len = path.getTotalLength();
      const total = len * scale;
      [...dots.children].forEach((c, i) => {
        const s = ((((now - t0) / 1000) * SPEED + (i * total) / PACKETS) % total + total) % total;
        const q = path.getPointAtLength(s / scale);
        c.setAttribute('cx', String(q.x));
        c.setAttribute('cy', String(q.y));
        (c as SVGElement).style.opacity = String(Math.min(1, s / 40, (total - s) / 60));
      });
      raf = requestAnimationFrame(tick(t0));
    };

    const onEnded = () => {
      loop.currentTime = 0;
      loop.play().catch(() => {});
      loop.style.opacity = '1';
      raf = requestAnimationFrame((now) => tick(now)(now));
    };
    main.addEventListener('ended', onEnded);

    // Plays once, when the scene's top passes the middle of the screen.
    const check = () => {
      const r = main.getBoundingClientRect();
      if (!played && r.top < innerHeight * 0.5 && r.bottom > 0) {
        played = true;
        main.play().catch(() => {
          played = false;
        });
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    check();

    return () => {
      main.removeEventListener('ended', onEnded);
      window.removeEventListener('scroll', check);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sceneRef} aria-labelledby="hm-final-h" className="relative font-display">
      <video
        ref={mainRef}
        muted
        playsInline
        preload="auto"
        poster="/home/final/poster.jpg"
        aria-hidden="true"
        className="block aspect-[854/480] w-full bg-[#7cb6ee] object-fill"
      >
        <source src="/home/final/main.webm" type="video/webm" />
        <source src="/home/final/main.mp4" type="video/mp4" />
      </video>
      <video
        ref={loopRef}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute top-0 left-0 z-[1] block aspect-[854/480] w-full object-fill opacity-0 transition-opacity duration-[900ms] ease-in-out"
      >
        <source src="/home/final/loop.webm" type="video/webm" />
        <source src="/home/final/loop.mp4" type="video/mp4" />
      </video>
      <svg
        viewBox="0 0 854 480"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] h-full w-full overflow-visible"
      >
        <defs>
          <filter id="hm-final-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path ref={pathRef} d={CABLE} fill="none" stroke="none" />
        <g ref={dotsRef} filter="url(#hm-final-glow)">
          {Array.from({ length: PACKETS }, (_, i) => (
            <circle key={i} r="2.6" fill="#e8ffd9" style={{ opacity: 0 }} />
          ))}
        </g>
      </svg>
      <div className="absolute top-[28%] left-[6vw] z-[2]">
        <h2
          id="hm-final-h"
          className="text-[clamp(28px,3.6vw,60px)] font-extrabold! leading-[1.05]! tracking-[-.02em] text-[#14202c]! [text-shadow:0_0_24px_#fff,0_0_8px_#fff]"
        >
          One clean line.
          <br />
          Let&apos;s find yours.
        </h2>
      </div>
    </section>
  );
}

export default FinalScene;
