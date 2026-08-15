// Zoom published US list pricing — voice only.
//
// Zoom publishes phone and contact center pricing on separate pages, with the
// add-ons tucked into horizontally-scrolling carousels. This file consolidates
// them so the /zoom page can render one all-in voice reference, and so every
// number on that page has exactly one source.
//
// SCOPE: Zoom Phone and Zoom Contact Center only. Meetings, Webinars, Events,
// and Workplace-only products are deliberately out of scope — do not add them
// here just because they appear on the same pricing pages.
//
// Rules for maintaining this file:
//  - These are Zoom's OWN published list rates. Do not enter negotiated,
//    promotional, or partner pricing here.
//  - All USD. Plan rates are per user, per month; add-on rates are monthly.
//  - When you re-check the source pages, update `lastVerified` in the same edit.
//
// Trademark note for any string here that renders on the page: always
// capitalize Zoom, always use it as an adjective modifying a noun ("Zoom Phone
// plans", never "Zoom plans"), never pluralize it, and never make a product
// possessive ("Zoom Phone features", not "Zoom's phone features"). The
// possessive is fine when referring to Zoom the company.

import {
  aiReceptionist as rcAiReceptionist,
  addOnPrice as rcAddOnPrice,
} from './ringcentral-pricing';

export const lastVerified = '2026-08-06';

export const pricingSourceUrl = 'https://www.zoom.com/en/products/voip-phone/pricing/';

/**
 * June 2026: Zoom sunset Custom AI Companion on 1 June and ZoomMate succeeds
 * it — confirmed by Zoom to No Jitter. ZoomMate is a separate paid product and
 * is explicitly NOT a replacement for the AI features that remain included on
 * paid Workplace plans.
 */
export const zoomMateSourceUrl =
  'https://www.nojitter.com/digital-workplace/how-zoommate-succeeds-zoom-s-custom-ai-companion';

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

/** A plan Zoom prices by quote only — no published rate. */
export interface QuotedPlan {
  name: string;
  note: string;
}

/** A monthly add-on license. */
export interface AddOn {
  name: string;
  /** Monthly. Null when Zoom publishes no rate for it. */
  price: number | null;
  note?: string;
}

export interface AddOnGroup {
  group: string;
  /** How the prices in this group are metered, rendered as a column label. */
  unit: string;
  /** Savings note for this group, when annual billing changes the rate. */
  annualSavingsNote?: string;
  /** Condition that applies to the whole group. */
  requirement?: string;
  items: AddOn[];
}

/**
 * A capability bundled into the seat rather than licensed separately.
 *
 * Modelled as its own type rather than an AddOn with price 0: the fact that it
 * is included is the point of the page, and an entry in the add-on table would
 * bury exactly the thing that distinguishes Zoom Phone plans.
 */
export interface IncludedFeature {
  name: string;
  /** What comes with the seat at no additional charge. */
  allowance: string;
  note: string;
  trialNote: string;
}

// --- Zoom Phone -----------------------------------------------------------

export const zoomPhone = {
  name: 'Zoom Phone',
  annualSavingsNote: 'Annual billing saves up to 15%.',
  tiers: [
    { name: 'US & CA Unlimited', annual: 16, monthly: 18 },
    { name: 'Pro Plus', annual: 20.5, monthly: 24 },
    { name: 'Business Plus', annual: 24.5, monthly: 29 },
  ] satisfies PlanTier[],
  quoted: [] satisfies QuotedPlan[],
  /**
   * Metered calling is a checkout choice on the plans above, not a fourth tier,
   * so it renders as a note rather than a card. Presenting it as a tier would
   * imply you can buy it on its own.
   */
  metered: {
    name: 'Metered calling',
    annual: 10.5,
    monthly: 12,
    note: 'Selected at checkout rather than sold as a separate tier.',
  },
  /** The reason this page exists. See IncludedFeature. */
  includedFeature: {
    name: 'Virtual Agent Receptionist',
    allowance: '100 minutes',
    note: 'Included with Zoom Phone plans at no additional charge.',
    trialNote: 'A free trial is available.',
  } satisfies IncludedFeature,
} as const;

// --- Zoom Contact Center --------------------------------------------------

export const zoomContactCenter = {
  name: 'Zoom Contact Center',
  annualSavingsNote: 'Annual billing saves up to 18%.',
  /** Every published contact center rate is a floor, not a fixed price. */
  startingAtNote: 'Starting-at pricing — the rate depends on the configuration.',
  licensingNote: 'Concurrent licensing is available as an alternative to named seats.',
  tiers: [
    { name: 'Essentials', annual: 69, monthly: 85 },
    { name: 'Premium', annual: 99, monthly: 119 },
    { name: 'Elite', annual: 149, monthly: 179 },
  ] satisfies PlanTier[],
  quoted: [] satisfies QuotedPlan[],
} as const;

// --- Add-ons --------------------------------------------------------------

export const addOnGroups: AddOnGroup[] = [
  {
    group: 'Zoom Phone add-ons',
    unit: 'Per month',
    // No trailing period: this one is joined mid-list with ' \u00b7 '.
    annualSavingsNote: 'Annual billing saves up to 27%',
    requirement: 'All add-ons require a paid base plan.',
    items: [
      { name: 'Zoom Phone Customer Engagement', price: 25 },
      { name: 'Additional phone numbers', price: 5 },
      { name: 'International calling', price: 10 },
      { name: 'Zoom Compliance Manager', price: 6 },
      { name: 'Desk phones and headsets', price: null, note: 'Quote-based.' },
    ],
  },
  {
    // Workplace-level rather than Phone or Contact Center, so it sits in its
    // own group. Included here because it is the paid successor to a
    // capability this page previously described as included.
    group: 'Zoom Workplace\u2122 AI add-ons',
    unit: 'Per user / month',
    requirement: 'Sold standalone or as a Zoom Workplace add-on.',
    items: [
      {
        name: 'ZoomMate\u2122',
        price: 20,
        note: 'Starting at. Launched 1 June 2026. Includes a monthly AI credit allocation; advanced capabilities meter against those credits, so the effective cost depends on usage.',
      },
    ],
  },
  {
    group: 'Zoom Contact Center\u2122 add-ons',
    unit: 'Per month',
    items: [
      { name: 'AI Expert Assist 2.0', price: 40 },
      { name: 'Advanced Quality Management', price: 60 },
      { name: 'Quality Management', price: 30 },
      { name: 'Workforce Management', price: 20 },
      { name: 'Virtual Service Phone Number', price: 5 },
      { name: 'Zoom Virtual Agent', price: null, note: 'Quote-based.' },
      { name: 'CX Insights', price: null, note: 'Quote-based.' },
      { name: 'Live AI Interpreter', price: null, note: 'Quote-based.' },
      { name: 'Customer Workflow Orchestration', price: null, note: 'Quote-based.' },
      { name: 'Agentless Dialer', price: null, note: 'Quote-based.' },
      { name: 'Cloud Storage', price: null, note: 'Quote-based.' },
    ],
  },
];

/** Look up a published add-on price by name. Throws so a typo fails the build. */
export function addOnPrice(name: string): number {
  for (const group of addOnGroups) {
    const match = group.items.find((item) => item.name === name);
    if (match) {
      if (match.price === null) {
        throw new Error(`Zoom add-on has no published price: ${name}`);
      }
      return match.price;
    }
  }
  throw new Error(`Unknown Zoom add-on: ${name}`);
}

// --- Cross-vendor AI packaging comparison ---------------------------------
//
// The two vendors package voice AI differently, and the page states both
// directions of that difference. Everything here is computed from the two
// published rate cards so neither page can drift from the other — the
// RingCentral figures are imported, never retyped.
//
// This is a packaging difference, not a verdict on either platform.

/** How each vendor bills its always-on receptionist capability. */
export interface ReceptionistPackaging {
  zoomFeature: string;
  zoomAllowance: string;
  /** Zoom bundles it, so there is no separate line to price. */
  zoomIncluded: true;
  rcFeature: string;
  /** RingCentral's published rate when attached to its own phone service. */
  rcMonthly: number;
  rcAllowance: string;
  /** RingCentral's billing unit, which is NOT per user — see the caveat. */
  rcBillingUnit: string;
  /** Twelve months of the RingCentral line item. */
  rcAnnualized: number;
  /**
   * The allowances match, the billing units do not. Zoom bundles the
   * capability into the plan; RingCentral licenses a receptionist instance.
   * Stating the gap without this caveat would overstate how like-for-like it is.
   */
  caveat: string;
}

export const receptionistPackaging: ReceptionistPackaging = {
  zoomFeature: zoomPhone.includedFeature.name,
  zoomAllowance: zoomPhone.includedFeature.allowance,
  zoomIncluded: true,
  rcFeature: rcAiReceptionist.name,
  rcMonthly: rcAiReceptionist.withRingEx,
  rcAllowance: `${rcAiReceptionist.includedMinutes} minutes`,
  rcBillingUnit: rcAiReceptionist.billingUnit,
  rcAnnualized: rcAiReceptionist.withRingEx * 12,
  caveat:
    'The included allowances match, but the billing units differ: a Zoom Phone plan bundles the capability, while RingCentral licenses a receptionist instance separately.',
};

/** One comparable contact center AI capability, priced by both vendors. */
export interface AddOnDelta {
  capability: string;
  zoomItem: string;
  zoomMonthly: number;
  rcItem: string;
  rcMonthly: number;
  /** Positive means the Zoom add-on is the more expensive of the two. */
  delta: number;
}

function buildDelta(capability: string, zoomItem: string, rcItem: string): AddOnDelta {
  const zoomMonthly = addOnPrice(zoomItem);
  const rcMonthly = rcAddOnPrice(rcItem);
  return { capability, zoomItem, zoomMonthly, rcItem, rcMonthly, delta: zoomMonthly - rcMonthly };
}

/**
 * Contact center AI capabilities both vendors publish a rate for. Only
 * like-for-like pairs are listed — Advanced Quality Management has no
 * RingCentral counterpart at that level, so pairing it would flatter the
 * comparison in Zoom's favour by measuring a richer product against a
 * cheaper one.
 */
export const contactCenterAiDeltas: AddOnDelta[] = [
  buildDelta('Agent assist', 'AI Expert Assist 2.0', 'AI Agent Assist'),
  buildDelta('Quality management', 'Quality Management', 'AI Quality Management'),
  buildDelta('Workforce management', 'Workforce Management', 'AI Workforce Management'),
];

/** The pairs where the Zoom Contact Center add-on is the more expensive of the two. */
export const contactCenterAiDeltasFavouringRc = contactCenterAiDeltas.filter((d) => d.delta > 0);

// --- Formatting -----------------------------------------------------------

/** $16 / $20.50 — whole dollars stay bare, part-dollars keep both decimals. */
export function formatUsd(value: number): string {
  return Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;
}
