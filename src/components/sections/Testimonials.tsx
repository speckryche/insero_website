import { existsSync } from 'node:fs';
import { join } from 'node:path';
import Image from 'next/image';
import { testimonials, type Testimonial } from '@/data/testimonials';

/**
 * Homepage testimonials.
 *
 * A server component on purpose: there is no state, no carousel and no reveal
 * animation, so there is nothing to hydrate. ResourcesHighlight and FAQ are the
 * precedent — not every section on this page animates.
 *
 * The production gate is the point of the component. `approved` is false until
 * written approval is on file, and unapproved entries are dropped from the
 * production build, so a half-collected quote cannot ship by being forgotten.
 * Development renders everything so the layout can be reviewed against
 * placeholders.
 */

/**
 * A public path that actually resolves to a file, or undefined.
 *
 * Without this a typo in a path renders a broken image: the initials fallback
 * only fires when the field is absent from the data, and "present but wrong" is
 * the more likely mistake. Treating a missing file as a missing field collapses
 * the two cases, so a bad path degrades the same way an empty one does.
 *
 * Safe to touch the filesystem here because this is a server component and the
 * homepage is statically prerendered — the check runs at build, not per
 * request. If this section is ever moved to a dynamically rendered page, note
 * that public/ is not guaranteed to exist in a serverless bundle at runtime,
 * and every asset would then silently fall back.
 */
function existingAsset(path?: string): string | undefined {
  if (!path) return undefined;
  return existsSync(join(process.cwd(), 'public', path)) ? path : undefined;
}

/** First letter of the first and last word. One word yields one letter. */
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, title, company, disclosure, logoWidth, logoHeight, logoDisplayHeight } =
    testimonial;
  const headshot = existingAsset(testimonial.headshot);
  const logo = existingAsset(testimonial.logo);

  return (
    /* <figure> rather than a bare div: this is a quotation with an attribution,
       and it lets the name live in <figcaption>, outside the <blockquote>. A
       screen reader then reads the quote as the quote and the attribution as
       attribution, instead of running the customer's name into their sentence.
 */
    <figure className="bg-white rounded-2xl p-10 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {/* A fixed 64px rail, rendered on every card whether or not there is a
          logo in it. Per-entry display heights mean the marks are deliberately
          different heights, and without a fixed rail each card's quote would
          start at a different y — the logo would be setting the layout instead
          of sitting in it. items-center hangs each mark on the rail's midline.

          h-20 rather than h-16: RPS renders 62px tall and a 64px rail left it
          1px of air per side, which is a clipping incident waiting for the next
          logo swap. 80px gives both marks room. */}
      <div className="h-20 flex items-center mb-6">
        {logo && (
          /* width/height are the file's real pixel dimensions, so the reserved
             box has the right aspect before the bytes land. The rendered size
             comes from the inline height with width:auto — a class cannot carry
             a per-entry value. unoptimized for SVG, matching ui/Logo.tsx:
             /_next/image answers 400 for SVG unless dangerouslyAllowSVG is set. */
          <Image
            src={logo}
            alt={`${company} logo`}
            width={logoWidth ?? 160}
            height={logoHeight ?? 32}
            unoptimized={logo.endsWith('.svg')}
            style={{ height: `${logoDisplayHeight ?? 32}px`, width: 'auto' }}
            className="object-contain"
          />
        )}
      </div>

      {/* flex-grow so the attribution pins to the bottom of every card
          regardless of quote length. Note this aligns the card *bottoms*, not
          the dividers: a card carrying a disclosure has a taller figcaption, so
          its divider sits higher than its neighbour's — measured at 32px, the
          disclosure line plus its margin. Worth knowing before assuming the
          rule is broken. */}
      <blockquote className="text-xl leading-relaxed text-[#334155] flex-grow">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="border-t border-gray-200 pt-5 mt-6">
        <div className="flex items-center gap-4">
          {headshot ? (
            <Image
              src={headshot}
              alt=""
              width={88}
              height={88}
              sizes="88px"
              className="rounded-[14px] object-cover flex-shrink-0"
            />
          ) : (
            /* Initials stand in until a headshot is dropped in. aria-hidden
               because the name is right beside it — announcing "SA" first would
               be noise. */
            <div
              aria-hidden="true"
              className="flex-shrink-0 w-22 h-22 rounded-[14px] bg-[#008838]/10 text-[#005C28] font-semibold text-xl flex items-center justify-center"
            >
              {initialsOf(name)}
            </div>
          )}
          <div>
            <div className="font-semibold text-[#1e293b]">{name}</div>
            <div className="text-sm text-[#475569]">
              {title}, {company}
            </div>
          </div>
        </div>

        {/* Always rendered, so the divider above it lands at the same height on
            every card in a row. Previously this was `disclosure && <p>`, which
            made a disclosed card's figcaption 32px taller — one text-xs line
            plus its margin — and since flex-grow aligns card bottoms rather
            than dividers, the rule on that card sat 32px higher than its
            neighbour's. min-h-4 reserves exactly that line.
            aria-hidden only when empty: there is no text node to announce, and
            an empty div should not read as a blank paragraph. */}
        <div className="mt-4 min-h-4" aria-hidden={disclosure ? undefined : true}>
          {disclosure && <p className="text-xs text-[#64748b]">{disclosure}</p>}
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  // Filtered per render, not at build time. Verified against a production
  // build: the homepage HTML contains none of these strings, and no client
  // chunk under .next/static does either. The full array does sit in the
  // server chunk, because this module is imported server-side — so an
  // unapproved quote is never sent to a browser, but it is not absent from the
  // deployment. Treat this gate as "cannot be seen", not "cannot be found".
  const visible =
    process.env.NODE_ENV === 'production'
      ? testimonials.filter((t) => t.approved)
      : testimonials;

  // No approved quotes means no section at all, rather than a heading over an
  // empty grid.
  if (visible.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#f8fafb]" aria-labelledby="testimonials-heading">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[#005C28] text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-[#008838]" />
            Customers
            <span className="w-8 h-px bg-[#008838]" />
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4"
          >
            Don&apos;t take our word for it
          </h2>
          <p className="text-lg text-[#475569]">
            A few of the businesses we work with, in their words.
          </p>
        </div>

        {/* An odd count leaves the last card in one column, left-aligned. That
            is the default and it is deliberate: no col-span on the last child,
            and nothing centring the final row. A quote stretched to twice the
            width of its neighbours reads as the important one. */}
        {/* No max-width. The grid fills .container-custom, which is exactly how
            the green stats panel in WhyInsero gets its width — a plain child of
            container-custom with nothing constraining it. Measured at 1280:
            both span 1222px from x=24 to x=1246. Matching the mechanism rather
            than the number means the two stay locked together if
            --container-max or --container-padding is ever retuned. */}
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {visible.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
