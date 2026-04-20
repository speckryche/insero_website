'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { Phone, ArrowRight } from '@phosphor-icons/react';
import { company } from '@/config/company';

export function ConceptFinalCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="pt-32 lg:pt-40 pb-16 lg:pb-20 bg-[#E6F5EC]">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-[#008838] text-sm font-semibold tracking-widest uppercase">
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
            className="text-xl text-[#64748b] mb-12 max-w-2xl mx-auto leading-relaxed"
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
                <Phone weight="fill" className="w-5 h-5" />
                <span>Schedule Your Free Consultation</span>
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
              className="inline-flex flex-col items-center text-[#64748b] hover:text-[#1e293b] transition-colors"
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
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-base md:text-lg text-[#64748b] font-medium">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#008838] rounded-full" />
                <span>500+ Businesses Served</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#008838] rounded-full" />
                <span>38% Average Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#008838] rounded-full" />
                <span>25+ Years Experience</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
