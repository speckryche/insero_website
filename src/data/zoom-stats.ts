// Zoom headline figures shown in the /zoom stats band.
//
// These are Zoom's OWN published claims, not Insero measurements. The band
// carries a visible attribution line saying so.
//
// Rules for maintaining this file, matching the pricing data files:
//  - First-party sources only. A figure without a `sourceUrl` is not shown as
//    verified, and the gap is flagged in the comment above it.
//  - `lastVerified` is when this repo last recorded the figure against its
//    source. Update it in the same edit as any value change.
//  - Never edit a number without also updating where it came from.

import type { Stat } from '@/components/sections/StatsBand';

/**
 * The seat-count and launch-year figures were recorded from Zoom's newsroom
 * post below, published 2025-10-09. Recorded, not independently re-fetched —
 * re-check the source before relying on it in new material.
 */
export const lastVerified = '2026-08-07';

const SEATS_RELEASE = 'https://news.zoom.com/zoom-phone-hits-10-million-seats/';
/** June 2026 rebrand: AI Companion retired, features native under Zoom AI. */
const REBRAND_POST = 'https://www.zoom.com/en/blog/zoom-ai-companion-zoommate/';

export const zoomStats: Stat[] = [
  {
    value: '10M+',
    label: 'Zoom Phone seats worldwide',
    sourceUrl: SEATS_RELEASE,
  },
  {
    value: '2019',
    label: 'Launched, and one of the fastest-growing cloud phone platforms since',
    sourceUrl: SEATS_RELEASE,
  },
  {
    // Zoom retired the AI Companion brand in June 2026; the features are now
    // native Zoom Workplace capabilities under the Zoom AI umbrella. The
    // entitlement itself is unchanged — still included on paid Workplace plans
    // at no extra charge — which the post below confirms. The separate paid
    // agentic product, ZoomMate, is priced in zoom-pricing.ts.
    value: '$0',
    label: 'Extra cost for Zoom AI features on paid Workplace plans',
    sourceUrl: REBRAND_POST,
  },
];

/** Rendered under the band. Attributes the figures to their publisher. */
export const zoomStatsAttribution = 'Figures published by Zoom.';
