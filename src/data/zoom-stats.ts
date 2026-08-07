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
    // ⚠️  UNSOURCED. The "AI Companion at no extra cost" claim appears in this
    // page's metadata, both FAQ answers and the AI-layer copy, but no source
    // was ever recorded for it anywhere in the repo — it is not in
    // zoom-pricing.ts, which covers Zoom Phone and Zoom Contact Center only.
    // Left empty rather than pointing at the VoIP pricing page, which was not
    // the basis for the claim. Find where Zoom publishes the AI Companion
    // entitlement, put the URL here, and re-check the wording against it.
    value: '$0',
    label: 'Extra cost for AI Companion on paid Zoom Workplace plans',
    sourceUrl: '',
  },
];

/** Rendered under the band. Attributes the figures to their publisher. */
export const zoomStatsAttribution = 'Figures published by Zoom.';
