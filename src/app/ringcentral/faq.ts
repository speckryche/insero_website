// Shared FAQ data for the RingCentral landing page.
// Used by both the client accordion (RingCentralPageClient) and the
// FAQPage JSON-LD in page.tsx so the two never drift apart.

export interface RingCentralFAQ {
  q: string;
  a: string;
}

export const ringCentralFaq: RingCentralFAQ[] = [
  {
    q: 'Does RingCentral include AI?',
    a: "Yes — some AI is built into every RingEX plan, like automatic call notes and a personal AI assistant that summarizes calls and drafts follow-ups. The deeper, agentic capabilities — a 24/7 AI receptionist, real-time in-call guidance, and full conversation intelligence with coaching and CRM updates — are paid add-ons or part of the RingCX contact center. So 'does it have AI' is yes; 'is all the AI included' is no. We help you figure out which pieces you actually need.",
  },
  {
    q: 'How much does RingCentral cost?',
    a: "RingEX starts at $20 per user, per month on annual billing, $25 for Advanced and $35 for Ultra; the RingCX contact center is licensed separately at $65, $95, or $145 per user, per month. The full published rate card — every tier, the AI add-ons, AI Receptionist, and the per-number and per-message line items — is laid out in the pricing cards on this page, under the Business Phone, Contact Center, AI Receptionist, and Everything Else tabs, so you can add up your own configuration. Two things those cards also make clear: RingCentral publishes no rate above 100 seats, and buying AI features à la carte can cost more than the RingCX tier that already includes them. Those are list prices; ask us for a quote and we'll price your real configuration.",
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
    a: "Both are strong, mature platforms — the honest difference usually comes down to AI packaging and price. RingCentral has one of the deepest agentic voice-AI and contact-center stacks available, but the most advanced pieces are add-ons. Zoom bundles its AI Companion features into its plans at no extra charge, which can be more cost-effective if you want capable AI without assembling add-ons. If you need deep contact-center and conversation intelligence, RingCentral often pulls ahead; if you want solid AI included in the base price, Zoom is worth a look. We'll compare both against your actual needs.",
  },
];
