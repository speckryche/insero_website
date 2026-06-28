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
    a: "RingCentral is priced per user, per month, and paying annually is meaningfully cheaper than month-to-month. But the base seat is only part of the story — the most powerful AI features and the RingCX contact center are licensed separately, so a price you see online rarely matches your real bill. We price your actual configuration — seats, add-ons, and contact center if you need it — so you see the all-in number before you commit. Request a free quote and we'll put real figures in front of you.",
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
    a: "Often, yes. We have access to current promotions and negotiated terms, and just as importantly, we price your full configuration so add-on costs don't surprise you later. Even when the per-seat rate is identical, the right plan structure and contract term can save real money. And if RingCentral isn't the best fit for you, we'll say so — we're not their sales team.",
  },
  {
    q: 'RingCentral vs Zoom for business?',
    a: "Both are strong, mature platforms — the honest difference usually comes down to AI packaging and price. RingCentral has one of the deepest agentic voice-AI and contact-center stacks available, but the most advanced pieces are add-ons. Zoom bundles its AI Companion features into its plans at no extra charge, which can be more cost-effective if you want capable AI without assembling add-ons. If you need deep contact-center and conversation intelligence, RingCentral often pulls ahead; if you want solid AI included in the base price, Zoom is worth a look. We'll compare both against your actual needs.",
  },
];
