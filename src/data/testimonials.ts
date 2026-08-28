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
//  - If a customer's company has a relationship with Insero, `relationshipNote`
//    is required. It renders as its own line in the attribution, at the same
//    size and colour as the title line — not as small print, not behind a
//    hover, not as a link to somewhere else. Write it so it stands on its own
//    without the line above it.
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
   * same shape: Kelley Create is 569x160 (3.56:1), RPS is 398x192 (1.94:1) and
   * Coming Attractions is 234x200 (1.17:1) — near enough square.
   *
   * These are matched on optical AREA, which is neither of the two obvious
   * choices, because Kelley Create is a wide horizontal lockup while RPS is a
   * stacked mark and Coming Attractions is square. Match on height and Kelley
   * runs 285px wide against Coming Attractions' 94px, which reads as one logo
   * shouting. Match on width and Kelley — being the flattest of the three —
   * looks stunted next to marks several times its height. Area is what the eye
   * actually weighs when the shapes differ this much.
   *
   * At 46px, 60px and 80px the rendered boxes are 163.6x46, 124.4x60 and
   * 93.6x80, so 7,525 / 7,462 / 7,488 square pixels — 0.83% between the largest
   * and smallest. Recompute if a logo file is ever replaced, and recompute the
   * AREA rather than reaching for the height — the RPS file was swapped for a
   * 398x192 version once already, and holding its old 62px would have put it
   * over Kelley Create. Solve it: the height that equalises area is
   * sqrt(kelleyArea / newAspect).
   *
   * Coming Attractions at 80px is the tallest of the three and sets the rail
   * height in Testimonials.tsx; see the note on it there.
   *
   * logoWidth/logoHeight are the file's real pixel dimensions and are passed
   * straight to next/image so the box is reserved at the correct ratio before
   * the bytes land.
   */
  logoWidth?: number;
  logoHeight?: number;
  /** Rendered height in px. Defaults to 32 when absent. */
  logoDisplayHeight?: number;
  /**
   * A relationship between the customer's company and Insero, stated in the
   * attribution rather than in small print. Unset renders nothing.
   *
   * Deliberately self-contained — "Kelley Create — an Insero partner company"
   * rather than "an Insero partner company" — so it reads correctly on its own
   * and does not depend on the line above it to make sense.
   */
  relationshipNote?: string;
  /** False until written approval is on file. Gates production rendering. */
  approved: boolean;
  /** Date the written approval was received. */
  approvedOn?: string;
}

/** When the entries below were last reviewed against their approvals. */
export const testimonialsLastVerified = '2026-08-28';

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
    relationshipNote: 'Kelley Create — an Insero partner company',
    approved: true,
    approvedOn: '2026-08-22',
  },
  {
    id: 'tom-pepple',
    quote:
      "We needed a phone system that integrated with our CRM, and I didn't have time to figure out which providers could actually do it. Insero did the legwork and came back with Nextiva — the integration works the way we needed it to. They set up our fiber internet at the same time. It cost us nothing for Insero to do that work, which I still find surprising.",
    name: 'Tom Pepple',
    title: 'Owner',
    company: 'Retail Profit Systems',
    headshot: '/images/testimonials/tom-pepple.jpg',
    logo: '/images/testimonials/rps-logo.png',
    logoWidth: 398,
    logoHeight: 192,
    logoDisplayHeight: 60,
    approved: true,
    approvedOn: '2026-08-23',
  },
  // One placeholder left, sized to the length a real testimonial runs to rather
  // than a one-liner, so the card height and the divider position in review
  // match what the finished section will do. A two-line stub made the row look
  // shorter than it will ever actually be.
  //
  // approved stays false, so it exists for layout review and cannot reach
  // production. Anything real replaces the whole entry, name and title
  // included; do not edit the quote and leave "Placeholder Four" attached to
  // it.
  {
    id: 'james-sandberg',
    quote:
      'The driving factor was having a local partner. We already had a relationship, and I’d be working with someone who understands our business — not someone clear across the country. They converted every one of our theaters off analog POTS lines to Ooma, across four states. That’s not a small thing to coordinate.',
    name: 'James Sandberg',
    title: 'Vice President & CTO',
    company: 'Coming Attractions Theatres',
    headshot: '/images/testimonials/james-sandberg.jpg',
    logo: '/images/testimonials/coming-attractions-logo.png',
    logoWidth: 234,
    logoHeight: 200,
    logoDisplayHeight: 80,
    approved: true,
    approvedOn: '2026-08-28',
  },
  {
    id: 'placeholder-4',
    quote:
      'A shorter placeholder, closer to the length of the RPS quote, so the grid shows both a long and a short card side by side and any equal-height stretching is visible during review.',
    name: 'Placeholder Four',
    title: 'General Manager',
    company: 'Second Example',
    approved: false,
  },
] satisfies readonly Testimonial[];
