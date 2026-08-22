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

/** First letter of the first and last word. One word yields one letter. */
function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  if (words.length === 1) return words[0][0].toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, title, company, headshot, logo, disclosure } = testimonial;

  return (
    /* <figure> rather than a bare div: this is a quotation with an attribution,
       and it lets the name live in <figcaption>, outside the <blockquote>. A
       screen reader then reads the quote as the quote and the attribution as
       attribution, instead of running the customer's name into their sentence.

       `group` is here for the logo, which desaturates until the card is
       hovered — group-hover has nothing to hook onto without it. */
    <figure className="group bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      {logo && (
        /* Sized by height with w-auto, so a wordmark and a square badge both
           land on the same 32px optical line. width/height here only set the
           box reserved before the file loads; the real ratio takes over once
           it does. unoptimized for SVG, matching ui/Logo.tsx — /_next/image
           answers 400 for SVG unless dangerouslyAllowSVG is set. */
        <Image
          src={logo}
          alt={`${company} logo`}
          width={160}
          height={32}
          unoptimized={logo.endsWith('.svg')}
          className="h-8 w-auto object-contain grayscale opacity-70 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100 mb-6"
        />
      )}

      {/* flex-grow so the attribution pins to the bottom of every card
          regardless of quote length. Note this aligns the card *bottoms*, not
          the dividers: a card carrying a disclosure has a taller figcaption, so
          its divider sits higher than its neighbour's — measured at 32px, the
          disclosure line plus its margin. Worth knowing before assuming the
          rule is broken. */}
      <blockquote className="text-lg leading-relaxed text-[#334155] flex-grow">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <figcaption className="border-t border-gray-200 pt-5 mt-6">
        <div className="flex items-center gap-4">
          {headshot ? (
            <Image
              src={headshot}
              alt=""
              width={48}
              height={48}
              className="rounded-full object-cover flex-shrink-0"
            />
          ) : (
            /* Initials stand in until a headshot is dropped in. aria-hidden
               because the name is right beside it — announcing "SA" first would
               be noise. */
            <div
              aria-hidden="true"
              className="flex-shrink-0 w-12 h-12 rounded-full bg-[#008838]/10 text-[#005C28] font-semibold flex items-center justify-center"
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

        {disclosure && <p className="text-xs text-[#64748b] mt-4">{disclosure}</p>}
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
        <div className="grid gap-6 md:grid-cols-2 items-stretch max-w-5xl mx-auto">
          {visible.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
