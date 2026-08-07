// Platform claims made about Zoom Phone in the /zoom overview section.
//
// These were previously loose prose with no source. Each is now recorded with
// the first-party page it came from, and the page interpolates the `text`
// rather than restating the figure, so a number can only be changed here.
//
// Rules, matching the other Zoom data files:
//  - First-party Zoom sources only.
//  - `text` is the claim as it should read on the page. If Zoom qualifies a
//    figure, the qualifier belongs in `text`, not just in `caveat` — the page
//    renders `text`, so dropping a qualifier there overstates the claim.
//  - `caveat` records what a future editor needs to know to keep it honest.
//  - Update `lastVerified` in the same edit as any wording change.

export interface PlatformClaim {
  /** Rendered verbatim into the overview paragraph. */
  text: string;
  sourceUrl: string;
  /** What the source actually says, where the page could easily overreach. */
  caveat: string;
}

/** Each source below was fetched and read on this date. */
export const lastVerified = '2026-08-07';

export const zoomPlatformClaims = {
  uptimeSla: {
    text: 'an available SLA of up to 99.999%',
    sourceUrl: 'https://www.zoom.com/en/blog/zoom-phone-reliability-zoom-node/',
    caveat:
      'Zoom words this as "available SLA of up to 99.999%" (post dated 2024-06-17). It is not a flat guarantee and the page previously stated it as one. Keep "available" and "up to".',
  },
  countryCoverage: {
    text: 'local telephony service in 49 countries',
    sourceUrl: 'https://www.zoom.com/en/products/voip-phone/features/global-coverage/',
    caveat:
      'Exactly 49, not "49+" as the page previously had it. The same page also lists 56 countries for toll-free/ITFS, 45+ via Provider Exchange partners, and 40+ under Unlimited Domestic Select. Those measure different things — do not merge or round them together.',
  },
  byoc: {
    text: 'a bring-your-own-carrier option if you want to keep existing carrier relationships',
    sourceUrl:
      'https://library.zoom.com/zoom-workplace/zoom-phone/zoom-phone-bluepaper/overview/bring-your-own-carrier-cloud-peering-byoc-c',
    caveat:
      'Zoom documents two variants — cloud peering (BYOC-C) and premises peering (BYOC-P), the latter requiring the customer to supply and maintain a supported SBC. The page stays deliberately generic rather than implying either is the default.',
  },
  compliance: {
    text:
      'Zoom supports GDPR and offers HIPAA coverage under a business associate agreement; FedRAMP authorization applies to its separate government platform, not the commercial one',
    sourceUrl: 'https://www.zoom.com/en/trust/legal-compliance/fedramp/',
    caveat:
      'The page previously said "compliance built in (HIPAA, GDPR, FedRAMP)", which was wrong on two counts. HIPAA is not built in — Zoom executes a BAA and there is no regulatory certification for HIPAA at all. FedRAMP authorization covers the Zoom for Government platform, a distinct offering from the commercial Zoom Phone a business buys; commercial Zoom Phone does not independently hold it. Do not restore the short form.',
  },
} satisfies Record<string, PlatformClaim>;
