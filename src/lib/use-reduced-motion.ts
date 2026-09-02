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

/**
 * The viewport half of the 2K hero gate. Width only — the DPR half is read
 * straight off `window` in the snapshot below, because a media query for
 * "more than 1 device pixel per CSS pixel" has no honest spelling: dppx
 * thresholds have to be picked as a magic number just above 1, and the older
 * `-webkit-min-device-pixel-ratio` fallback is not something to depend on when
 * `devicePixelRatio` answers the same question exactly.
 */
const WIDE_VIEWPORT_QUERY = '(min-width: 1280px)';

/**
 * True only on a wide viewport that is also higher than 1 device pixel per CSS
 * pixel — the screens where a 2K source resolves to visibly more detail than a
 * 1080p one, and nowhere else.
 *
 * False on the server and through hydration, like useIsClient and for the same
 * reason: the caller uses this to pick a src, and anything it resolves to in
 * the server HTML starts fetching at parse time, before the real answer is
 * known. Pinning the server snapshot to the 1080p branch means the visitor who
 * should get the smaller file has already started it, and the visitor who
 * should get the larger one is choosing it on the first post-hydration render.
 *
 * Live on width, one-shot on DPR. The width half is subscribed, so a resize
 * across 1280 re-renders; devicePixelRatio is only re-read when that
 * subscription fires, so dragging a window between displays of different
 * densities at a fixed width will not re-render on its own. That is the whole
 * of the gap, and it is deliberate — the only consumers pick a source for
 * media that has already begun loading, so a later answer would change nothing
 * they could act on.
 */
export function useHiDpiWide(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(WIDE_VIEWPORT_QUERY);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(WIDE_VIEWPORT_QUERY).matches && window.devicePixelRatio > 1,
    () => false,
  );
}

export default useReducedMotion;
