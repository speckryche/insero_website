// The basis for the "100+ carriers" figure used across the site.
//
// Unlike the RingCentral and Zoom data files, this one has no external
// sourceUrl, because the claim is not about somebody else's published number —
// it is about Insero's own supplier access. So the provenance recorded here is
// the thing itself: which distributors and direct agreements the access comes
// through. Anyone can then check the count by adding up those catalogs rather
// than taking the figure on trust.
//
// Rules for maintaining this file, matching the other data files:
//  - Update `lastVerified` in the same edit as any change to the lists below.
//  - If an agreement lapses, remove it here first and re-check that the total
//    still supports the claim before leaving the rendered figure alone.
//  - Render `carrierCountLabel` or `carrierAccessPhrase`; never retype "100+"
//    into a page. A literal typed into one page is a literal that can drift
//    from the other twelve places this claim appears.

/** When the access list below was last confirmed. */
export const lastVerified = '2026-08-16';

/**
 * Technology services distributors. Each aggregates a catalog of carriers and
 * providers that Insero can quote through, so the combined reach is the union
 * of four catalogs rather than four suppliers.
 */
export const technologyServicesDistributors = [
  'AppDirect',
  'IBS',
  'Sandler Partners',
  'Intelisys',
];

/** Carriers Insero holds an agreement with directly, outside the TSDs above. */
export const directCarrierAgreements = [
  'Hunter Communications',
  'LS Networks',
  'TDS Telecom',
  'Nuwave',
];

/**
 * The rendered figure.
 *
 * Deliberately "100+" rather than an exact count. The precise total moves as
 * distributor catalogs change and is not something a visitor can verify, so a
 * floor that comfortably holds is the honest way to state it — the four TSD
 * catalogs alone exceed it before the direct agreements are counted.
 */
export const carrierCountLabel = '100+';

/** "100+ carriers", for prose and metadata. */
export const carrierAccessPhrase = `${carrierCountLabel} carriers`;
