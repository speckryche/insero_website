'use client';

import { carrierAccessPhrase } from '@/data/carrier-access';
import { motion, useInView } from 'framer-motion';
import { trackContactClick } from '@/lib/analytics';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { company } from '@/config/company';

interface FinalCTAProps {
  /** INZO peeking over the top edge. Homepage only — he is rationed, so the
      other pages that render this CTA leave it off. */
  inzoPeek?: boolean;
}

export function FinalCTA({ inzoPeek = false }: FinalCTAProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      data-inzo-peek={inzoPeek || undefined}
      /* With INZO peeking, half the top padding brings the eyebrow up to meet
         his downward gaze instead of leaving it on empty green. */
      className={`relative ${inzoPeek ? 'pt-16 lg:pt-20' : 'pt-32 lg:pt-40'} pb-16 lg:pb-20 bg-[#E6F5EC]`}
    >
      {inzoPeek && (
        /* The ledge line (the flat bottom of his head) sits 84.1% of the way
           down the art. His wrench hands make up the 15.9% below it and hook
           over the edge. bottom-full seats the image's bottom on this section's
           top edge. translate-y-[15.9%] then drops him by that overhang, so the
           ledge line sits on the edge and his hands paint over the green. z-10
           keeps them above this section's background. The element before this
           section grows by part of his height (see [data-inzo-peek] in
           globals.css), so he runs into that section's empty bottom padding,
           never its content. Keep the widths and ratio here in step with the
           heights there. */
        <div
          aria-hidden="true"
          className="hidden md:block absolute bottom-full left-[62%] -translate-x-1/2 translate-y-[15.9%] z-10 md:w-[190px] lg:w-[260px] pointer-events-none"
        >
          {/* block: an inline img leaves a descender gap under it, which would
              throw off the ledge alignment. */}
          <Image
            src="/cta/inzo-cta-peek.png"
            alt=""
            width={900}
            height={649}
            sizes="(min-width: 1024px) 260px, 190px"
            className="block w-full h-auto"
          />
        </div>
      )}

      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-[#005C28] text-sm font-semibold tracking-widest uppercase">
              <span className="w-8 h-px bg-[#008838]" />
              Let&apos;s Talk
              <span className="w-8 h-px bg-[#008838]" />
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#1e293b] mb-8 leading-[1.1] tracking-tight"
          >
            Ready to Simplify
            <br />
            <span className="text-[#008838]">Your Tech Stack?</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[var(--color-gray-600)] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            15 minutes. Zero cost. No commitment.
            <br className="hidden sm:block" />
            Just expert advice tailored to your business.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Link href="/contact">
              <button className="group inline-flex items-center gap-4 px-10 py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <span>Get Started</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </motion.div>

          {/* Phone alternative */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href={company.phoneLink}
                onClick={() => trackContactClick({ method: 'phone' })}
              className="inline-flex flex-col items-center text-[var(--color-gray-600)] hover:text-[#1e293b] transition-colors"
            >
              <span className="text-lg md:text-xl">or call us at</span>
              <span className="font-bold text-[#1e293b] text-2xl md:text-3xl mt-1">
                {company.phoneFormatted}
              </span>
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20 pt-10 border-t-2 border-[#008838]/30"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base md:text-lg text-[var(--color-gray-600)] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#008838] rounded-full" />
                <span>{carrierAccessPhrase} Compared</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#008838] rounded-full" />
                <span>25+ Years Founder Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#008838] rounded-full" />
                <span>Independent &mdash; Vendor-Neutral</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;
