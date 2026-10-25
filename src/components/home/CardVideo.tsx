'use client';

import { useEffect, useRef } from 'react';

/**
 * Pillar card island loop. Only the card on top of the sticky stack plays:
 * while on screen, the video pauses once the next card covers more than half
 * of this one, and resumes when it is uncovered. Never plays under
 * prefers-reduced-motion (the poster stays up instead).
 */
export function CardVideo({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    const card = v?.closest('article');
    if (!v || !card) return;
    const next = card.nextElementSibling;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = false;
    let raf = 0;

    const check = () => {
      raf = 0;
      let covered = 0;
      if (next) {
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        covered = Math.max(0, a.bottom - Math.max(a.top, b.top)) / a.height;
      }
      if (onScreen && covered < 0.5 && !reduce.matches) {
        if (v.paused) v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        schedule();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={`/home/cards/${name}-poster.jpg`}
      role="img"
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={`/home/cards/${name}.webm`} type="video/webm" />
      <source src={`/home/cards/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

export default CardVideo;
