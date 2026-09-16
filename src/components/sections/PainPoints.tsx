'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Problem on the left, answer on the right, a hairline between each.
 *
 * Deliberately not a card grid. Three of the four sections that run
 * consecutively here were rows of bordered cards with tinted icon tiles, and
 * that repetition is what made the page read as templated. HowItWorks keeps its
 * cards because each one carries an image and earns the box; this section and
 * Services now take their structure from rules and whitespace instead, which is
 * the vocabulary WhyInsero already established further down the page.
 *
 * The icons went with the tiles. A tinted square holding a generic glyph
 * labelled nothing the heading beside it did not already say, so nothing is
 * lost by dropping it and a whole column of vertical space is gained.
 */
const painPoints = [
  {
    title: 'Too many vendors, too much confusion',
    description:
      'Juggling multiple carriers and providers creates complexity that wastes your time and money.',
    insight: 'Most businesses overpay because they don\'t have time to compare options.'
  },
  {
    title: 'Paying for features you don\'t need',
    description:
      'Complex pricing structures and unnecessary add-ons mean you\'re likely overpaying every month.',
    insight: 'Independent comparison usually finds meaningful savings.'
  },
  {
    title: 'No one explains what\'s best for YOUR business',
    description:
      'Generic solutions don\'t fit unique needs. You deserve advice tailored to your specific situation.',
    insight: 'Working with a TA usually shortens implementation.'
  },
];

export function PainPoints() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        {/* Section header — unchanged */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-6 leading-tight">
            Tired of Overpaying for Services{' '}
            <br className="hidden md:block" />
            <span className="text-[#008838]">You Don&apos;t Understand?</span>
          </h2>
          <p className="text-lg md:text-xl text-[#64748b] max-w-2xl mx-auto">
            You&apos;re not alone. Most businesses face these exact challenges—and we&apos;re here to help solve them.
          </p>
        </motion.div>

        {/* The rows are the only children here, so last:border-b reliably closes
            the run rather than needing a rule on the wrapper. */}
        <div>
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              /* 1.05fr / 1fr: the problem carries two lines of prose and the
                 answer one, so an even split would leave the right column
                 short. The hairline is --color-secondary at 15%, the same
                 value WhyInsero divides its stat strip with. */
              className="grid grid-cols-1 gap-x-12 gap-y-3 py-9 border-t border-[#1a2530]/15 last:border-b lg:grid-cols-[1.05fr_1fr] lg:py-11"
            >
              <div>
                <h3 className="text-[1.375rem] font-display font-bold text-[#1e293b] leading-snug mb-2.5 text-balance">
                  {point.title}
                </h3>
                <p className="text-[#64748b] leading-relaxed max-w-[52ch]">
                  {point.description}
                </p>
              </div>

              {/* #005C28 rather than the #008838 this used to be. At 17px in a
                  semibold weight it is body copy, not a heading, so it takes
                  the 4.5:1 bar: the brand green is 4.58:1 on white and scrapes
                  it, primary-dark is 8.20:1 and reads as the deliberate reply
                  it is. Centred against the problem on desktop, stacked under
                  it below lg where there is no second column to align to. */}
              <p className="text-[17px] font-semibold text-[#005C28] leading-relaxed max-w-[42ch] lg:self-center">
                {point.insight}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing line. The flanking gradient rules are gone with the rest of
            that treatment; the sentence carries itself at this size. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <span className="text-2xl md:text-3xl font-display font-bold text-[#1e293b]">
            There&apos;s a better way
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export default PainPoints;
