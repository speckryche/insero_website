'use client';

import { useEffect, useRef } from 'react';

/**
 * Pillar card island loop. Plays only while on screen, and never under
 * prefers-reduced-motion (the poster stays up instead).
 */
export function CardVideo({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !reduce.matches) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
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
