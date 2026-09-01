'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Live prefers-reduced-motion, safe to render on the server.
 *
 * useSyncExternalStore rather than framer-motion's useReducedMotion or an
 * effect, for two reasons it makes explicit. The server snapshot is pinned to
 * false, so the SSR markup is always the motion-allowed layout and hydration
 * has nothing to disagree about; React then re-renders with the real value once
 * mounted, which is the documented behaviour for a store whose server and
 * client snapshots differ, not a mismatch. And subscribing to the MediaQueryList
 * means toggling the OS setting re-renders live, where a one-shot read on mount
 * would leave the wrong layout until a refresh.
 *
 * Note the direction of the false-on-server snapshot: false means motion is
 * ALLOWED, so anything gated on `!reducedMotion` renders on the server and
 * during hydration, and only disappears once the real value arrives. That is
 * too late to stop a fetch — see useIsClient below.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED_MOTION_QUERY);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * False on the server and through hydration, true afterwards.
 *
 * Pair with useReducedMotion when the gated element costs bytes. A <source> in
 * the server HTML starts fetching the moment the parser reaches it, which is
 * before any media query has been consulted — so gating a video on
 * `!reducedMotion` alone still spends the download on exactly the visitor who
 * asked for less motion. Gating on `isClient && !reducedMotion` keeps the
 * element out of the markup entirely and lets the first post-hydration render
 * decide, when the real value is known.
 *
 * Implemented as a store rather than useState + useEffect because setting state
 * from an effect body is a cascading render.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default useReducedMotion;
