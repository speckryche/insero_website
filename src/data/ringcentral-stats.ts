// RingCentral headline figures shown in the /ringcentral stats band.
//
// These are RingCentral's OWN published claims, not Insero measurements. The
// band carries a visible attribution line saying so.
//
// ⚠️  TODO — UNSOURCED. Every figure below arrived as an inline array with no
// source URL and no capture date, and moving them into this file does not make
// them verified. Before treating any of them as current:
//   1. Find where RingCentral publishes each figure and put the URL in
//      `sourceUrl`.
//   2. Set `lastVerified` to the date you checked.
//   3. Correct any figure that has moved. Do NOT edit a number without also
//      recording where the new one came from.
// Until that happens these are reproduced in good faith from RingCentral's
// marketing but cannot be substantiated from this repo.
//
// Conventions match the pricing data files: one exported const per concern,
// a file-level `lastVerified`, and provenance recorded next to the value.

import type { Stat } from '@/components/sections/StatsBand';

/**
 * Null, deliberately — nobody has verified these against RingCentral's
 * published material. Set a date only when the sourceUrl fields are filled in.
 */
export const lastVerified: string | null = null;

export const ringCentralStats: Stat[] = [
  { value: '600,000+', label: 'Businesses run on RingCentral', sourceUrl: '' },
  { value: '99.999%', label: 'Uptime, 5+ years running', sourceUrl: '' },
  { value: 'Billions', label: 'AI-enabled minutes processed monthly', sourceUrl: '' },
  { value: '100+', label: 'Countries supported', sourceUrl: '' },
];

/** Rendered under the band. Attributes the figures to their publisher. */
export const ringCentralStatsAttribution = 'Figures published by RingCentral.';
