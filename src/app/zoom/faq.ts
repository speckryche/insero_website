// Shared FAQ data for the Zoom landing page.
// Used by both the client accordion (ZoomPageClient) and the FAQPage
// JSON-LD in page.tsx so the two never drift apart.

export interface ZoomFAQ {
  q: string;
  a: string;
}

export const zoomFaq: ZoomFAQ[] = [
  {
    q: 'Does Zoom include AI?',
    a: "Yes — and it's Zoom's biggest differentiator. AI Companion is included at no extra cost with eligible paid Zoom plans, so call and meeting summaries, voicemail prioritization, and task extraction come standard rather than as a line-item add-on. The most advanced pieces — the AI Concierge for voice, Custom AI Companion agents, and the deeper sales-intelligence tiers — are paid add-ons. But the baseline 'capable AI included' bar is set higher here than almost anywhere else.",
  },
  {
    q: 'How much does Zoom Phone cost?',
    a: "Zoom Phone is priced per user, per month, with competitive entry pricing and month-to-month options, and it bundles neatly with Zoom Workplace licenses if you're already paying for meetings. The headline advantage is that AI Companion is included rather than billed separately. Where the number moves is the advanced add-ons — AI Concierge, Custom AI Companion, and engagement or power packs. We price your actual configuration so the quote reflects your real setup, not a base-plan teaser. Ask for a free quote and we'll put real figures in front of you.",
  },
  {
    q: 'Is Zoom AI Companion really free?',
    a: "Effectively, yes — AI Companion is included at no additional charge with eligible paid Zoom plans rather than sold as a separate license. That's the core reason Zoom is often the most cost-effective on-ramp to genuinely useful AI: summaries, task extraction, and 'ask AI Companion' answers come with the seat. The caveats are that it applies to eligible paid plans, and that the most advanced agentic features — like AI Concierge — are paid add-ons. We'll confirm your specific plan covers what you're expecting.",
  },
  {
    q: 'Does using Insero cost extra?',
    a: "No. Insero is an independent advisor, and the providers compensate us — so you pay the same as going direct, and often less once current promotions are applied. You get a second set of expert eyes, honest guidance, and an advocate for contracts and support, at zero added cost.",
  },
  {
    q: 'Can Insero get me better Zoom pricing than going direct?',
    a: "Often, yes. We have access to current promotions and negotiated terms, and we price your full configuration so add-on costs and license bundling don't surprise you later. Even when the per-seat rate matches, the right plan structure and contract term can save real money. And if Zoom isn't the best fit for you, we'll say so — we're not their sales team.",
  },
  {
    q: 'Zoom vs RingCentral for business?',
    a: "Both are strong, mature platforms; the honest split is value-and-simplicity versus depth. Zoom's edge is that capable AI (AI Companion) is included and the experience is famously simple — ideal if your team already lives in Zoom meetings. RingCentral's edge is the depth of its contact-center and conversation-intelligence stack, though its most powerful AI is sold as add-ons. If you want AI included and easy deployment, Zoom usually wins; if you need the deepest contact center, RingCentral often does. We'll compare both against your real needs.",
  },
];
