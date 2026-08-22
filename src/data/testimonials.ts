// Customer testimonials rendered on the homepage.
//
// This file exists because the last testimonials section on this site was
// deleted for being invented — fictional names, fictional companies, star
// ratings and savings percentages with no source anywhere in the repo. The
// rules below are what keep that from happening twice, and the `approved` gate
// is what enforces them: an entry that nobody has signed off on cannot reach
// production, whatever else is true about it.
//
// Rules for maintaining this file:
//  - Every testimonial is a real quote from a real, named customer who has
//    given written approval. Nothing here is written on a customer's behalf,
//    tightened for rhythm, or assembled from things they said at different
//    times.
//  - `approved` stays false until written approval is on file. Unapproved
//    entries never render in production — see Testimonials.tsx, which filters
//    on this. Flipping it without the approval is the one edit that turns this
//    file back into the thing it replaced.
//  - `approvedOn` is the date the written approval was received, not the date
//    the quote was given and not the date it was added here.
//  - No star ratings. No savings percentages. No outcome figures of any kind,
//    unless the customer stated them and they are independently verifiable.
//  - If a customer has a financial relationship with Insero, `disclosure` is
//    required and renders next to the quote. It is not a footnote and it does
//    not live at the bottom of the section.
//  - Update `testimonialsLastVerified` in the same edit as any change here.

export interface Testimonial {
  id: string;
  /** The customer's own words. Verbatim. */
  quote: string;
  name: string;
  title: string;
  company: string;
  /** Path under /images/testimonials/. Falls back to initials when absent. */
  headshot?: string;
  /** Path under /images/testimonials/. Omitted entirely when absent. */
  logo?: string;
  /**
   * Logo sizing, per entry rather than global, because these marks are not the
   * same shape: Kelley Create is 569x160 (3.56:1) and RPS is 310x160 (1.94:1).
   *
   * Rendering both at one height is the obvious approach and the wrong one. At
   * a shared 32px the stacked RPS mark reads as roughly half the size of the
   * wide Kelley Create wordmark and its tagline stops being legible, because
   * matching height on marks of different aspect leaves their WIDTHS — which
   * is what the eye reads as size — nearly two to one apart.
   *
   * So the display heights are tuned to land on roughly equal rendered width
   * instead: 28px gives Kelley Create 99.6px, 48px gives RPS 93.0px. Recompute
   * these if a logo file is ever replaced.
   *
   * logoWidth/logoHeight are the file's real pixel dimensions and are passed
   * straight to next/image so the box is reserved at the correct ratio before
   * the bytes land.
   */
  logoWidth?: number;
  logoHeight?: number;
  /** Rendered height in px. Defaults to 32 when absent. */
  logoDisplayHeight?: number;
  /** Required wherever a financial relationship exists. Renders with the quote. */
  disclosure?: string;
  /** False until written approval is on file. Gates production rendering. */
  approved: boolean;
  /** Date the written approval was received. */
  approvedOn?: string;
}

/** When the entries below were last reviewed against their approvals. */
export const testimonialsLastVerified = '2026-08-22';

export const testimonials = [
  {
    id: 'scott-anderson',
    quote:
      'We have over 100 reps across multiple states, and they all go to Insero for internet and redundancy. They find the carrier options, sort out speeds, and negotiate the pricing. It means our people can walk into a client meeting with real answers instead of guesses. Easy to work with, and they actually pick up the phone.',
    name: 'Scott Anderson',
    title: 'Owner',
    company: 'Kelley Create',
    headshot: '/images/testimonials/scott-anderson.jpg',
    logo: '/images/testimonials/kelley-create-logo.png',
    logoWidth: 569,
    logoHeight: 160,
    logoDisplayHeight: 28,
    disclosure: 'Kelley Create is a partner of Insero, LLC.',
    approved: false,
  },
  {
    id: 'tom-pepple',
    quote:
      "We needed a phone system that integrated with our CRM, and I didn't have time to figure out which providers could actually do it. Insero did the legwork and came back with Nextiva — the integration works the way we needed it to. They set up our fiber internet at the same time. It cost us nothing to use them, which I still find surprising.",
    name: 'Tom Pepple',
    title: 'Owner',
    company: 'Retail Profit Systems',
    headshot: '/images/testimonials/tom-pepple.jpg',
    logo: '/images/testimonials/rps-logo.png',
    logoWidth: 310,
    logoHeight: 160,
    logoDisplayHeight: 48,
    approved: false,
  },
  {
    id: 'placeholder-3',
    quote: 'Placeholder — awaiting customer quote and written approval.',
    name: 'Pending',
    title: 'Pending',
    company: 'Pending',
    approved: false,
  },
  {
    id: 'placeholder-4',
    quote: 'Placeholder — awaiting customer quote and written approval.',
    name: 'Pending',
    title: 'Pending',
    company: 'Pending',
    approved: false,
  },
] satisfies readonly Testimonial[];
