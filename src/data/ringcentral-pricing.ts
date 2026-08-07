// RingCentral published US list pricing.
//
// RingCentral splits its pricing across six separate pages (RingEX, RingCX,
// AI Receptionist, Events, Rooms/Webinar, and the numbers/SMS rate card).
// This file consolidates them so the /ringcentral page can render one all-in
// reference — and so every number on that page has exactly one source.
//
// Rules for maintaining this file:
//  - These are RingCentral's OWN published list rates. Do not enter negotiated,
//    promotional, or partner pricing here.
//  - All USD, paid annually unless the field says otherwise.
//  - When you re-check the source pages, update `lastVerified` in the same edit.

export const lastVerified = '2026-08-05';

export const pricingSourceUrl = 'https://www.ringcentral.com/office/plansandpricing.html';

// --- Shared shapes --------------------------------------------------------

/** A plan tier with published annual and monthly per-user rates. */
export interface PlanTier {
  name: string;
  /** Per user, per month, billed annually. */
  annual: number;
  /** Per user, per month, billed month-to-month. */
  monthly: number;
  /** Short note on who the tier suits or what it folds in. */
  note?: string;
}

/** A plan RingCentral prices by quote only — no published rate. */
export interface QuotedPlan {
  name: string;
  note: string;
}

/** A per-user, per-month add-on license. */
export interface AddOn {
  name: string;
  /** Per user, per month. */
  price: number;
  note?: string;
}

export interface AddOnGroup {
  group: string;
  /** How the prices in this group are metered, rendered as a column label. */
  unit: string;
  items: AddOn[];
}

/** One AI capability as RingCentral lists it inside a tier. */
export interface AiFeature {
  name: string;
  /** True when RingCentral lists it as a paid add-on rather than included. */
  addOn?: boolean;
}

/** The published contents of a plan tier. */
export interface TierFeatures {
  /**
   * The tier this one builds on. RingCentral presents its tiers cumulatively
   * ("Everything in Core PLUS…"), and the cards read the same way — so `base`
   * holds ONLY what this tier adds, never a repeat of the inherited items.
   */
  inheritsFrom?: string;
  /** Plan contents, transcribed from RingCentral's published tier list. */
  base: string[];
  /** AI capabilities, kept separate the way RingCentral groups them. */
  ai: AiFeature[];
  /** Provenance — see publishedTierNote. */
  sourceNote: string;
}

// --- RingEX (business phone) ---------------------------------------------

export const ringEx = {
  name: 'RingEX',
  /** Top of the published seat band — past this, RingCentral quotes only. */
  publishedSeatCap: 100,
  /** RingCentral publishes one rate band for 1–100 users; 1–5 and 6–100 match. */
  seatBandNote: 'Same published rate for 1–5 and 6–100 users.',
  aboveBandNote: 'Above 100 users, pricing is quote-based.',
  annualSavingsNote: 'Annual billing saves up to 33%.',
  tiers: [
    { name: 'Core', annual: 20, monthly: 30 },
    { name: 'Advanced', annual: 25, monthly: 35 },
    { name: 'Ultra', annual: 35, monthly: 45 },
  ] satisfies PlanTier[],
  quoted: [
    {
      name: 'Customer Engagement Bundle',
      note: 'Quote-based pricing.',
    },
  ] satisfies QuotedPlan[],
} as const;

// --- RingEX published tier contents --------------------------------------
//
// READ BEFORE EDITING. Every line below is transcribed from RingCentral's own
// plans-and-pricing page. Nothing here is inferred, summarized, or filled in
// from product knowledge, and nothing should be. If RingCentral doesn't list
// an item on a tier, it does not go on that tier — an invented inclusion is a
// false claim about a real product's contract.
//
// To update: re-read the source page, replace these lists wholesale, and move
// `lastVerified` in the same edit.

const publishedTierNote = `RingCentral's published tier contents as of ${lastVerified}. Transcribed from ${pricingSourceUrl} — do not add, infer, or reword items.`;

export const ringExTierFeatures: Record<string, TierFeatures> = {
  Core: {
    base: [
      'Unlimited domestic calling',
      'On-demand call recording',
      '100 toll-free minutes',
      '25 SMS user/month',
      'HD meetings (200 participants)',
    ],
    ai: [
      { name: 'AI Receptionist (AIR)', addOn: true },
      { name: 'AI Virtual Assistant — captions & transcriptions, notes & summaries' },
    ],
    sourceNote: publishedTierNote,
  },
  Advanced: {
    inheritsFrom: 'Core',
    base: [
      'CRM integrations',
      'Connect multiple sites',
      'Core reporting and insights',
      '1,000 toll-free minutes',
      '100 SMS user/month',
    ],
    ai: [{ name: 'AI Virtual Assistant — adds AI Writer' }],
    sourceNote: publishedTierNote,
  },
  Ultra: {
    inheritsFrom: 'Advanced',
    base: [
      '10,000 toll-free minutes',
      '200 SMS user/month',
      'RingCentral Webinar',
      'Historical and real-time insights',
      'Unlimited storage',
      'Device analytics & alerts',
    ],
    ai: [
      { name: 'AI Receptionist (AIR)', addOn: true },
      { name: 'All AI Virtual Assistant features' },
    ],
    sourceNote: publishedTierNote,
  },
  'Customer Engagement Bundle': {
    inheritsFrom: 'Ultra',
    base: [
      'Business SMS Booster — shared SMS inbox, company reply templates, SMS compliance management',
      'Call Queues Booster — call back from queue, wait time and place alerts, live reports',
    ],
    ai: [],
    sourceNote: publishedTierNote,
  },
};

// --- RingCX (contact center) ---------------------------------------------

export const ringCx = {
  name: 'RingCX',
  annualSavingsNote: 'Annual billing saves up to 15%.',
  tiers: [
    { name: 'Standard', annual: 65, monthly: 75 },
    {
      name: 'Professional',
      annual: 95,
      monthly: 110,
      note: 'Includes AI Quality Management and AI Agent Assist.',
    },
    {
      name: 'Elite',
      annual: 145,
      monthly: 165,
      note: 'Includes AI Supervisor Assist, AI Interaction Analytics, and AI Workforce Management.',
    },
  ] satisfies PlanTier[],
  quoted: [
    {
      name: 'Enterprise Contact Center',
      note: 'Quote-based pricing.',
    },
  ] satisfies QuotedPlan[],
} as const;

// --- AI Receptionist (AIR) -----------------------------------------------
//
// Deliberately its own type rather than an entry in the add-on tables: AIR is
// licensed per receptionist instance and metered by minutes, so putting it in
// a per-user table would misrepresent the bill.

export interface UsagePricedProduct {
  name: string;
  abbreviation: string;
  /** The unit the license is sold in — NOT per user. */
  billingUnit: string;
  /** Monthly price when attached to existing RingEX phone service. */
  withRingEx: number;
  /** Monthly price as a standalone product, without RingEX. */
  standalone: number;
  /** Minutes included at either price point. */
  includedMinutes: number;
  /** Per-minute rate once included minutes are used up. */
  overagePerMinute: number;
  overageNote: string;
  bundleNote: string;
}

export const aiReceptionist: UsagePricedProduct = {
  name: 'AI Receptionist',
  abbreviation: 'AIR',
  billingUnit: 'per receptionist, per month',
  withRingEx: 39,
  standalone: 49,
  includedMinutes: 100,
  overagePerMinute: 0.5,
  overageNote: 'Billed in 30-second increments, rounded up.',
  bundleNote: 'Additional minute bundles available for purchase.',
};

// --- Add-ons --------------------------------------------------------------

export const addOnGroups: AddOnGroup[] = [
  {
    group: 'RingEX add-ons',
    unit: 'Per user / month',
    items: [
      { name: 'AI Conversation Expert (ACE)', price: 60, note: 'Formerly RingSense.' },
      { name: 'Call Queues Booster', price: 35 },
      { name: 'Business SMS Booster', price: 25 },
    ],
  },
  {
    group: 'RingCX AI add-ons',
    unit: 'Per user / month',
    items: [
      { name: 'AI Quality Management', price: 25 },
      { name: 'AI Interaction Analytics', price: 25 },
      { name: 'AI Agent Assist', price: 25 },
      { name: 'AI Supervisor Assist', price: 25 },
      { name: 'AI Workforce Management', price: 20 },
    ],
  },
];

/**
 * Look up a published annual per-user rate by tier name.
 *
 * Throws rather than returning undefined for the same reason addOnPrice does:
 * anything quoting a rate outside the pricing cards — the FAQ answers, and the
 * FAQPage JSON-LD generated from them — has to fail the build if a tier is
 * renamed here, not silently ship a stale figure to search engines.
 */
export function annualRate(tiers: readonly PlanTier[], name: string): number {
  const match = tiers.find((tier) => tier.name === name);
  if (!match) throw new Error(`Unknown RingCentral tier: ${name}`);
  return match.annual;
}

/** Look up a published add-on price by name. Throws so a typo fails the build. */
export function addOnPrice(name: string): number {
  for (const group of addOnGroups) {
    const match = group.items.find((item) => item.name === name);
    if (match) return match.price;
  }
  throw new Error(`Unknown RingCentral add-on: ${name}`);
}

// --- Everything else ------------------------------------------------------

export interface LineItem {
  name: string;
  /** Rendered price string — these items are metered too many different ways
   *  to share one numeric shape (per room, per organizer, per message, one-time). */
  price: string;
  note?: string;
}

export const otherLineItems: LineItem[] = [
  { name: 'Video Meetings', price: 'Included', note: 'Included free with RingEX.' },
  { name: 'RingCentral Rooms', price: '$39', note: 'Per room / month.' },
  { name: 'RingCentral Webinar', price: 'From $30', note: 'Per organizer / month.' },
  {
    name: 'RingCentral Events',
    price: '$99 / $199 / $299',
    note: 'Pro / Pro+ / Enterprise, per organizer / month, annual.',
  },
  { name: 'Push to Talk', price: '$5', note: 'Per user / month.' },
  { name: 'Additional toll-free or local numbers', price: '$4.99', note: 'Per month.' },
  { name: 'Vanity numbers', price: '$30 one-time', note: 'Plus $4.99 setup.' },
  {
    name: 'Additional international toll-free',
    price: '$14.99',
    note: 'Per user / month, plus $25 one-time.',
  },
  { name: 'Additional international numbers', price: 'From $5.99', note: 'Per user / month.' },
  { name: 'High Volume SMS', price: 'From $0.0119', note: 'Per message.' },
];

// --- Worked tier-vs-add-on math ------------------------------------------
//
// The advisor math the pricing pages don't put side by side: buying features
// à la carte on a lower RingCX tier can cost more than the tier that already
// includes them. Computed from the data above so the examples can never drift
// from the published rates.

export interface TierComparison {
  /** The tier the buyer starts on. */
  baseTier: string;
  baseTierPrice: number;
  /** Add-ons bolted onto the base tier. */
  addOns: AddOn[];
  /** Total per agent, per month, of base tier + add-ons. */
  buildUpTotal: number;
  /** The higher tier that already includes those add-ons. */
  targetTier: string;
  targetTierPrice: number;
  /** Per agent, per month saved by moving up instead of adding on. */
  savings: number;
}

function buildComparison(
  baseTierName: string,
  addOnNames: string[],
  targetTierName: string,
): TierComparison {
  const tier = (name: string) => {
    const match = ringCx.tiers.find((t) => t.name === name);
    if (!match) throw new Error(`Unknown RingCX tier: ${name}`);
    return match;
  };

  const base = tier(baseTierName);
  const target = tier(targetTierName);
  const addOns = addOnNames.map((name) => ({ name, price: addOnPrice(name) }));
  const buildUpTotal = addOns.reduce((sum, addOn) => sum + addOn.price, base.annual);

  return {
    baseTier: base.name,
    baseTierPrice: base.annual,
    addOns,
    buildUpTotal,
    targetTier: target.name,
    targetTierPrice: target.annual,
    savings: buildUpTotal - target.annual,
  };
}

export const tierComparisons: TierComparison[] = [
  buildComparison('Standard', ['AI Quality Management', 'AI Agent Assist'], 'Professional'),
  buildComparison(
    'Professional',
    ['AI Supervisor Assist', 'AI Interaction Analytics', 'AI Workforce Management'],
    'Elite',
  ),
];

// --- Formatting -----------------------------------------------------------

/** $65 — whole dollars, no trailing .00. Used for every rendered rate. */
export function formatUsd(value: number): string {
  return Number.isInteger(value)
    ? `$${value}`
    : `$${value.toFixed(2)}`;
}
