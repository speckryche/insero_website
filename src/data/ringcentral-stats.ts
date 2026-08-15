// RingCentral headline figures shown in the /ringcentral stats band.
//
// These are RingCentral's OWN published claims, not Insero measurements. The
// band carries a visible attribution line saying so.
//
// All four arrived here as an inline array with no source and no capture date.
// All four turned out to be real — RingCentral publishes them as a stats block
// on the RingEX product page — but one of them had picked up wording on the way
// in that the source does not support. See the uptime entry.
//
// Rules for maintaining this file, matching the pricing data files:
//  - First-party sources only. A figure without a `sourceUrl` is not shown as
//    verified, and the gap is flagged in the comment above it.
//  - Match RingCentral's wording, including qualifiers. A figure they publish
//    as "availability" is not ours to re-describe as measured uptime, and a
//    duration they do not state is not ours to add.
//  - `lastVerified` is when this repo last recorded the figures against the
//    source. Update it in the same edit as any value change.

import type { Stat } from '@/components/sections/StatsBand';

/** The source below was fetched and read on this date. */
export const lastVerified = '2026-08-15';

/**
 * RingCentral publishes all four figures as a single stats block here.
 *
 * Worth knowing before editing: the company page at ringcentral.com/company.html
 * carries a DIFFERENT country figure — "46" available countries — against this
 * page's "100+ countries supported". They measure different things (where the
 * platform can replace a PBX outright, versus where service reaches at all),
 * and RingCentral publishes both. Do not merge, average, or "correct" one
 * against the other; this band cites the RingEX page, so it uses the RingEX
 * page's figure.
 */
const RINGEX_PAGE = 'https://www.ringcentral.com/ringex.html';

export const ringCentralStats: Stat[] = [
  {
    // "600k+" on the source. Their label is "customers"; ours said
    // "businesses", which the company page also uses ("Powering businesses
    // around the world"), but there is no reason to paraphrase.
    value: '600K+',
    label: 'Customers worldwide',
    sourceUrl: RINGEX_PAGE,
  },
  {
    // The one that was overstated. RingCentral publishes "99.999% Availability"
    // — no SLA framing, no duration. This band previously read "Uptime, 5+
    // years running", which added two claims the source does not make: that the
    // figure is measured uptime rather than availability, and that it has held
    // for five years. The duration traces to blog material written when the
    // product was still called MVP, a brand retired in 2023.
    //
    // An availability target and an achieved result are different claims. If
    // RingCentral ever publishes a measured figure with a duration, that can go
    // here with its own source — but it has to come from them, not from us.
    value: '99.999%',
    label: 'Platform availability',
    sourceUrl: RINGEX_PAGE,
  },
  {
    // "Billions of AI-enabled minutes processed per month" on the source.
    value: 'Billions',
    label: 'AI-enabled minutes processed per month',
    sourceUrl: RINGEX_PAGE,
  },
  {
    // "100+ countries supported" on the source, verbatim. See the note on
    // RINGEX_PAGE about the company page's conflicting "46".
    value: '100+',
    label: 'Countries supported',
    sourceUrl: RINGEX_PAGE,
  },
];

/** Rendered under the band. Attributes the figures to their publisher. */
export const ringCentralStatsAttribution = 'Figures published by RingCentral.';
