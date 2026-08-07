// Shared FAQ data for the Zoom landing page.
// Used by both the client accordion (ZoomPageClient) and the FAQPage
// JSON-LD in page.tsx so the two never drift apart.

export interface ZoomFAQ {
  q: string;
  a: string;
}

export const zoomFaq: ZoomFAQ[] = [
  {
    q: 'Does Zoom Phone include AI?',
    a: "Yes — and it is the biggest Zoom Workplace differentiator. The AI features are native to Workplace and included at no extra cost with eligible paid plans, so call and meeting summaries, voicemail prioritization, and task extraction come standard rather than as a line-item add-on. The most advanced pieces — the AI Concierge for voice, ZoomMate, and the deeper sales-intelligence tiers — are paid add-ons. But the baseline 'capable AI included' bar is set higher here than almost anywhere else.",
  },
  {
    q: 'How much does Zoom Phone cost?',
    a: "Zoom Phone plans start at $16 per user, per month on annual billing for US & CA Unlimited, $20.50 for Pro Plus and $24.50 for Business Plus; a metered option is $10.50, selected at checkout rather than sold as a separate tier. Zoom Contact Center is licensed separately, starting at $69, $99, or $149 per user, per month. The full published rate card — every tier, both add-on groups, and the Virtual Agent Receptionist that comes with the seat — is laid out in the pricing cards on this page, under the Business Phone, Contact Center, and Add-ons tabs, so you can add up your own configuration. The headline is that the Virtual Agent Receptionist is included with Zoom Phone plans rather than billed separately. Where the number moves is the advanced add-ons. Those are list prices; ask us for a quote and we'll price your real configuration.",
  },
  {
    q: 'Is the AI in Zoom Workplace really free?',
    a: "Effectively, yes — the AI features are included at no additional charge with eligible paid Zoom Workplace plans rather than sold as a separate license. That's the core reason Zoom Phone is often the most cost-effective on-ramp to genuinely useful AI: summaries, task extraction, and on-demand answers come with the seat. The caveats are that it applies to eligible paid plans, and that the most advanced agentic products — AI Concierge and ZoomMate — are paid add-ons. We'll confirm your specific plan covers what you're expecting.",
  },
  {
    q: 'Does using Insero cost extra?',
    a: "No. Insero is an independent advisor, and the providers compensate us — so you pay the same as going direct, and often less once current promotions are applied. You get a second set of expert eyes, honest guidance, and an advocate for contracts and support, at zero added cost.",
  },
  {
    q: 'Can Insero get me better Zoom Phone pricing than going direct?',
    a: "Often, yes. We buy through technology services distributors, which gives us channel access to current promotions and pricing programs that aren't always surfaced to direct buyers. The bigger lever is usually structural: sizing the configuration to what you'll actually use, getting the license bundling right, and setting the contract term, so add-on costs don't surprise you later. Even when the per-seat rate matches, that structure can save real money. And if Zoom Phone isn't the best fit for you, we'll say so — we're not their sales team.",
  },
  {
    q: 'Zoom Phone vs RingCentral for business?',
    a: "Both are strong, mature platforms; the honest split is value-and-simplicity versus depth. The Zoom Phone edge is that capable AI is included and the experience is famously simple — ideal if your team already lives in Zoom Meetings. RingCentral's edge is the depth of its contact-center and conversation-intelligence stack, though its most powerful AI is sold as add-ons. If you want AI included and easy deployment, Zoom Phone usually wins; if you need the deepest contact center, RingCentral often does. We'll compare both against your real needs.",
  },
];
