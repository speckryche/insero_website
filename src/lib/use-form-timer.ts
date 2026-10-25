'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Fill-time measurement for the spam check (src/lib/spam.ts).
 *
 * Returns a function that reports how many milliseconds have passed since the
 * form mounted. Both ends of the measurement are taken in the visitor's
 * browser with performance.now(), a monotonic clock, so the result does not
 * depend on the browser's wall clock agreeing with the server's. The previous
 * scheme sent a Date.now() timestamp and the server subtracted it from its own
 * clock, which silently flagged anyone whose computer clock ran fast.
 *
 * Starts at mount, not render, so a server render never sets the start time.
 * Before mount it reports -1, which the server rejects as invalid.
 */
export function useFormTimer(): () => number {
  const start = useRef<number | null>(null);

  useEffect(() => {
    start.current = performance.now();
  }, []);

  return useCallback(() => (start.current === null ? -1 : Math.round(performance.now() - start.current)), []);
}
