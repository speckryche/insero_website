// Shared FAQ data for the RingCentral landing page.
// Used by both the client accordion (RingCentralPageClient) and the
// FAQPage JSON-LD in page.tsx so the two never drift apart.
//
// Every rate and seat figure quoted below is interpolated from
// @/data/ringcentral-pricing, the same source the pricing cards render from.
// It used to restate them as string literals, which matched the data file by
// coincidence rather than by construction. That is a worse failure here than
// anywhere else on the page: these answers are serialized into FAQPage
// JSON-LD, so a stale price would have shipped to search engines as structured
// data, and a plain string in a `.ts` file gives no signal when the rate it
// duplicates moves. annualRate() throws on an unknown tier, so a rename in the
// data file now fails the build instead.

import {
  ringEx,
  ringCx,
  annualRate,
  formatUsd,
  type PlanTier,
} from '@/data/ringcentral-pricing';

export interface RingCentralFAQ {
  q: string;
  a: string;
}

/** A published annual per-user rate, formatted for prose. */
const rate = (tiers: readonly PlanTier[], tierName: string): string =>
  formatUsd(annualRate(tiers, tierName));

export const ringCentralFaq: RingCentralFAQ[] = [
  {
    q: 'Does RingCentral include AI?',
    a: "Yes — some AI is built into every RingEX plan, like automatic call notes and a personal AI assistant that summarizes calls and drafts follow-ups. The deeper, agentic capabilities — a 24/7 AI receptionist, real-time in-call guidance, and full conversation intelligence with coaching and CRM updates — are paid add-ons or part of the RingCX contact center. So 'does it have AI' is yes; 'is all the AI included' is no. We help you figure out which pieces you actually need.",
  },
  {
    q: 'How much does RingCentral cost?',
    a:
      `RingEX starts at ${rate(ringEx.tiers, 'Core')} per user, per month on annual billing, ` +
      `${rate(ringEx.tiers, 'Advanced')} for Advanced and ${rate(ringEx.tiers, 'Ultra')} for Ultra; ` +
      `the RingCX contact center is licensed separately at ${rate(ringCx.tiers, 'Standard')}, ` +
      `${rate(ringCx.tiers, 'Professional')}, or ${rate(ringCx.tiers, 'Elite')} per user, per month. ` +
      'The full published rate card — every tier, the AI add-ons, AI Receptionist, and the per-number ' +
      'and per-message line items — is laid out in the pricing cards on this page, under the Business ' +
      'Phone, Contact Center, AI Receptionist, and Everything Else tabs, so you can add up your own ' +
      'configuration. Two things those cards also make clear: RingCentral publishes no rate above ' +
      `${ringEx.publishedSeatCap} seats, and buying AI features à la carte can cost more than the ` +
      "RingCX tier that already includes them. Those are list prices; ask us for a quote and we'll " +
      'price your real configuration.',
  },
  {
    q: 'What is RingSense / ACE?',
    a: "ACE (AI Conversation Expert) is RingCentral's conversation-intelligence layer — the product previously known as RingSense. It listens to calls and meetings and turns them into searchable summaries, surfaces coaching opportunities, tracks topics and sentiment, and can push notes and next steps into your CRM automatically. It's most valuable for sales and support teams that live on the phone, and it's an add-on rather than part of the base seat.",
  },
  {
    q: 'Does using Insero cost extra?',
    a: "No. Insero is an independent advisor, and the providers compensate us — so you pay the same as going direct, and often less once current promotions are applied. You get a second set of expert eyes, honest guidance, and someone in your corner for contracts and support, at zero added cost.",
  },
  {
    q: 'Can Insero get me better RingCentral pricing than going direct?',
    a: "Often, yes. We buy through technology services distributors, which gives us channel access to current promotions and pricing programs that aren't always surfaced to direct buyers. The bigger lever is usually structural: sizing the configuration to what you'll actually use and getting the contract term right, so add-on costs don't surprise you later. Even when the per-seat rate is identical, that structure can save real money. And if RingCentral isn't the best fit for you, we'll say so — we're not their sales team.",
  },
  {
    q: 'RingCentral vs Zoom for business?',
    a: "Both are strong, mature platforms — the honest difference usually comes down to AI packaging and price. RingCentral has one of the deepest agentic voice-AI and contact-center stacks available, but the most advanced pieces are add-ons. Zoom includes its AI features at no extra cost on eligible paid Workplace plans, which can be more cost-effective if you want capable AI without assembling add-ons. If you need deep contact-center and conversation intelligence, RingCentral often pulls ahead; if you want solid AI included in the base price, Zoom is worth a look. We'll compare both against your actual needs.",
  },
];
