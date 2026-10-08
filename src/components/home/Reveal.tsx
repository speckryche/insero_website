'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Fades its content up once it scrolls into view (the prototype's `.reveal`).
 * Under prefers-reduced-motion the CSS shows it immediately.
 */
export function Reveal({ className = '', children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`hm-reveal ${className}`}>
      {children}
    </div>
  );
}

export default Reveal;
