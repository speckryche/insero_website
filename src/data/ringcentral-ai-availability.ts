// Shipping status of the three RingCentral agentic voice-AI products the
// /ringcentral AI section describes.
//
// Why this file exists: RingCentral launched the suite in November 2025 with
// real availability limits — AVA was US-only controlled-availability early
// access with a waitlist, AIR was US/UK/Canada, and ACE's Insights module was
// select-customers-only with GA expected early 2026. The page described all
// three as if they had shipped everywhere. Two of the three have since caught
// up with the copy; one has not.
//
// Availability moves faster than anything else on this page. A product that is
// generally available today can add a region next quarter, and one in early
// access can reach GA without any announcement the page would notice. Re-check
// every entry below against its source before trusting it.
//
// Rules, matching the other RingCentral data files:
//  - First-party RingCentral sources only.
//  - `note` is rendered on the page. An empty string means the page needs no
//    qualifier, NOT that the status is unknown — `status` carries that.
//  - If RingCentral qualifies availability, the qualifier belongs in `note`,
//    not just in `caveat`. The page renders `note`; dropping a limit there
//    tells a buyer a product is available when it is not.
//  - Update `lastVerified` in the same edit as any status change.

export type AvailabilityStatus =
  /** Generally available. Regional limits may still apply — see `caveat`. */
  | 'ga'
  /** Some of the product has shipped; the rest is gated. */
  | 'partial'
  /** Not generally available: early access, controlled availability, waitlist. */
  | 'early-access';

export interface ProductAvailability {
  /** The product as the page names it, so the two can be matched by eye. */
  product: string;
  status: AvailabilityStatus;
  /**
   * Rendered under the product's card when it needs qualifying. Empty when the
   * page's description is fully supported by the source.
   */
  note: string;
  sourceUrl: string;
  /** What the source actually says, including anything the page must not claim. */
  caveat: string;
}

/** Each source below was fetched and read on this date. */
export const lastVerified = '2026-08-07';

/**
 * Dated first-party post covering all four products in one place, used to
 * corroborate the product pages — which state status but not always geography.
 * Published 2026-06-29.
 */
export const flywheelPostUrl =
  'https://community.ringcentral.com/news-announcements-13/from-hello-to-insight-master-the-ringcentral-ai-flywheel-air-air-pro-ava-ace-11988';

export const ringCentralAiAvailability = {
  aiReceptionist: {
    product: 'AI Receptionist (AIR)',
    status: 'ga',
    note: '',
    sourceUrl: 'https://www.ringcentral.com/ai-receptionist.html',
    caveat:
      'Generally available, and the footprint has grown since the November 2025 launch — that shipped US/UK/Canada, the product page now reads "available as a standalone or add-on license for both new and existing RingCentral customers in the U.S. and Canada" and "as an add-on in the U.K., Australia, and EU". No waitlist. One sub-feature, answering text messages, is still marked "Coming soon" — the page does not claim it, and should not start. Note also that AIR Pro, a separate and newer product, IS in early access; do not conflate the two.',
  },
  aiVirtualAssistant: {
    product: 'AI Virtual Assistant (AVA)',
    status: 'partial',
    note: 'The everyday assistance is live on RingEX plans. The real-time agentic guidance is still early access — US and Canada, by waitlist — so treat it as something to plan for rather than switch on.',
    sourceUrl: 'https://www.ringcentral.com/products/ai-virtual-assistant.html',
    caveat:
      'The one product on this page whose copy outran what shipped. RingCentral splits AVA in two: "AI help for everyday work" — call and meeting notes, message translation, text composition — is available now on RingEX plans, while "Agentic AI for complex workflows" is marked "Coming soon" with "Join early access" and "Join the waitlist". The page\'s AVA card describes only the second half. The product page states no geography; the 2026-06-29 flywheel post does, and is strict about it: "Advanced AVA capabilities are currently in Early Access" and are "strictly available for current RingEX customers (across any plan) based in the US and Canada". That is wider than the US-only launch but is still not GA. Do not drop the early-access qualifier until the product page stops saying "Coming soon".',
  },
  aiConversationExpert: {
    product: 'AI Conversation Expert (ACE)',
    status: 'ga',
    note: '',
    sourceUrl: 'https://www.ringcentral.com/products/ai-conversation-expert.html',
    caveat:
      'Generally available as an add-on for RingEX Advanced/Ultra or RingCX. The Insights module, which was select-customers-only at launch with GA expected early 2026, now appears on the product page badged "NEW" rather than "Coming soon" — that gate has cleared. No waitlist or early-access language anywhere on the page.',
  },
} satisfies Record<string, ProductAvailability>;
