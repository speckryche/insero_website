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
   * These are matched on optical AREA, which is neither of the two obvious
   * choices, because Kelley Create is a wide horizontal lockup and RPS is a
   * stacked mark. Match on height and Kelley runs 220px wide against RPS's
   * 120px, which reads as one logo shouting. Match on width and Kelley — being
   * the flatter of the two — looks stunted next to a mark three times its
   * height. Area is what the eye actually weighs when the shapes differ this
   * much.
   *
   * At 46px and 62px the rendered boxes are 163.6x46 and 120.1x62, so 7,525
   * against 7,448 square pixels: within about 1%. Recompute if a logo file is
   * ever replaced, and recompute the area rather than reaching for the height.
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
      'Insero has been a valuable partner in helping us deliver bandwidth connectivity and cloud voice solutions to our clients. We have over 100 sales reps across multiple states, and they all go to Insero. Speck and his team find the carrier options, sort out speeds, and negotiate the pricing — which means our team stays focused on growing our MSP business instead of chasing carriers. Easy to work with, and they add real value to our customer base.',
    name: 'Scott Anderson',
    title: 'Senior Vice President',
    company: 'Kelley Create',
    headshot: '/images/testimonials/scott-anderson.jpg',
    logo: '/images/testimonials/kelley-create-logo.png',
    logoWidth: 569,
    logoHeight: 160,
    logoDisplayHeight: 46,
    disclosure: 'Kelley Create is a partner of Insero, LLC.',
    approved: true,
    approvedOn: '2026-08-22',
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
    logoDisplayHeight: 62,
    approved: true,
    approvedOn: '2026-08-22',
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
