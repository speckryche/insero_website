'use client';

import { carrierCountLabel } from '@/data/carrier-access';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

/**
 * The proof row under the argument.
 *
 * Three columns, not the four the old green bar carried: "Vendor-Neutral" is
 * not dropped, it is folded into the carriers column as the line under the
 * number. "100+ carriers we can quote / owned by none of them" states the
 * access and the independence in one breath, which is how the claim is
 * actually load-bearing — a hundred carriers means nothing if we answer to one
 * of them, and the two facts were arguing separately while sat side by side.
 *
 * carrierCountLabel rather than a typed "100+": src/data/carrier-access.ts owns
 * that figure and says in as many words not to retype it into a page, because a
 * literal in one page is a literal that drifts from the other twelve. The 25+
 * below is prose rather than a tracked datum — there is no source file behind
 * it and inventing one would imply a provenance it does not have.
 */
const stats = [
  {
    value: '$0',
    label: 'Cost to you',
    proof: 'No fees, no retainer, no obligation',
  },
  {
    value: carrierCountLabel,
    label: 'Carriers we can quote',
    proof: 'Owned by none of them',
  },
  {
    value: '25+',
    label: 'Years in the industry',
    proof: 'Relationships that get answers faster',
  },
];

/**
 * Hairline rule on the #e2e8ec panel.
 *
 * Navy at 15% rather than a border-gray-* utility: the @theme inline block in
 * globals.css exports only the primary, secondary and accent families, so
 * `border-gray-200` resolves to Tailwind's own #e5e7eb — lighter than the
 * #e2e8ec it would be drawn on, i.e. an invisible rule. Tying the alpha to the
 * section's own navy keeps the dividers in the palette and lets them track
 * --color-secondary if it is ever retuned.
 */
const HAIRLINE = 'border-[#1a2530]/15';
/**
 * The same rule as a divider. Spelled out rather than derived from HAIRLINE by
 * string surgery: Tailwind v4 extracts class names statically from the source
 * text, so a name only ever produced at runtime is a name it never sees and
 * never emits CSS for — the dividers would have come out with no colour at all.
 */
const HAIRLINE_DIVIDE = 'divide-[#1a2530]/15';

export function WhyInsero() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#e2e8ec]">
      <div className="container-custom">
        {/* Section header — sizes, ramp, weights and spacing lifted from
            HowItWorks so the two read as one system.

            The one deliberate divergence is the subtitle colour. HowItWorks
            sits on white and uses #64748b; that measures 3.85:1 on this
            section's #e2e8ec, and at text-lg/text-xl in a normal weight the
            subtitle is not large text, so it needs 4.5:1 and would fail.
            #475569 gives 6.13:1 on the same ground. Same call, same reason, as
            the #e2e8ec panel in ContactPageClient. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            Why <span className="text-[#008838]">Insero</span>?
          </h2>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
            We&apos;re not just consultants. We&apos;re your advocates in a complex market.
          </p>
        </motion.div>

        {/* The question, then the answer.
            0.9fr / 1.1fr: the slab holds one short line and wants to stay
            tight, the prose wants the room.

            items-stretch, so the prose drives the row height and the slab is
            drawn to meet it — the two then bottom-align on a shared baseline
            instead of the slab floating in the middle of its track with a
            ragged edge under it. The slab centres its own content internally
            (see justify-center below), so growing the box does not drag the
            quote off its optical centre; only the navy grows.

            Stacks below lg in DOM order, so the question lands first on a
            phone — the whole section is an answer and it needs its question
            above it. No order-* utilities involved. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-stretch"
        >
          {/* The navy is #1a2530 — --color-secondary, the same value the
              scrolled header and the footer are painted in, so the slab reads
              as site furniture rather than a one-off card colour. */}
          <div className="flex flex-col justify-center bg-[#1a2530] rounded-2xl p-10 lg:p-12 shadow-xl shadow-[#1a2530]/10">
            <p className="text-2xl lg:text-3xl font-display font-bold text-white leading-snug">
              &ldquo;If I&apos;m not paying you, how do you get paid?&rdquo;
            </p>
            {/* white/70 on this navy is 8.28:1 — muted enough to sit under the
                question, nowhere near the 4.5:1 floor. */}
            <p className="mt-5 text-base lg:text-lg text-white/70 leading-relaxed">
              It&apos;s the first thing almost everyone asks &mdash; and the honest answer
              is the reason this works.
            </p>
          </div>

          <div className="space-y-5 text-base lg:text-lg text-[#475569] leading-relaxed">
            <p>
              Carriers pay us a commission when you sign &mdash; the same commission
              they&apos;d pay their own sales rep. The money comes out of their side
              either way.
            </p>
            <p>
              So going through us doesn&apos;t raise your price.{' '}
              {/* The one claim in three paragraphs a skimmer has to leave with,
                  so it carries the ink colour and the weight while the
                  sentence around it stays body copy. */}
              <strong className="font-semibold text-[#1e293b]">It often lowers it</strong>,
              because we know which promotions exist and which quotes have room in them.
            </p>
            <p>
              What changes is who&apos;s on your side of the table. A carrier rep sells
              one network. We compare every provider that serves your address &mdash; and
              tell you when the cheapest option isn&apos;t the right one.
            </p>
          </div>
        </motion.div>

        {/* Proof strip.
            A plain child of .container-custom with nothing constraining it, so
            it spans the full column the same way the grid in Testimonials does
            — see the note there. Vertical rules between columns at lg; below
            that the same divide flips to horizontal rows, which is why the
            colour is set once on the container and the axis twice.

            The air around the top rule is deliberately less than it looks like
            it should be. Two spaces stack here — the margin above the hairline
            and the padding below it — so generous values on both read as one
            very large gap and detach the strip into a block of its own. Held
            together they come to 89px at lg, just under the 96px between the
            heading block and the row, which is what keeps the strip reading as
            the close of this section rather than the start of another. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-10 lg:mt-12 border-t ${HAIRLINE} pt-8 lg:pt-10`}
        >
          <div className={`grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x ${HAIRLINE_DIVIDE}`}>
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-8 lg:py-4 text-center">
                {/* #008838 is 3.71:1 on #e2e8ec. That clears the 3:1 bar for
                    large text and nothing else, which is exactly what this is
                    — 48px and up, bold. The body-weight link below takes the
                    darker green for the same reason. */}
                <div className="text-5xl lg:text-6xl font-display font-bold text-[#008838] leading-none">
                  {stat.value}
                </div>
                <div className="mt-4 text-base lg:text-lg font-semibold text-[#1e293b]">
                  {stat.label}
                </div>
                <div className="mt-1.5 text-sm text-[#475569]">
                  {stat.proof}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* #005C28, not the brand #008838: this is body-size text in a normal
            weight, so the 4.5:1 floor applies and #008838's 3.71:1 on #e2e8ec
            misses it. #005C28 measures 6.63:1 and is the same hue family.
            The arrow is aria-hidden — it is punctuation for the eye, and a
            screen reader announcing "right arrow" after the link text is
            noise.

            Spacing here is the stat strip's, value for value — mt-10/lg:mt-12
            above the rule and pt-8/lg:pt-10 below it. The two rules are drawn
            identically and sit within a few hundred pixels of each other, so
            any difference in the air around them reads as a mistake rather
            than as hierarchy. If one of them is ever retuned, retune both. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-10 lg:mt-12 border-t ${HAIRLINE} pt-8 lg:pt-10 text-center`}
        >
          <p className="text-base text-[#475569]">
            Still skeptical?{' '}
            <Link
              href="/resources/how-a-telecom-broker-works"
              className="font-semibold text-[#005C28] underline decoration-[#005C28]/30 underline-offset-4 hover:decoration-[#005C28] transition-colors duration-200"
            >
              Read how a telecom broker actually works{' '}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default WhyInsero;
