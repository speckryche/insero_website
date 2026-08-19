'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';

const rotatingWords = ['Voice', 'Internet', 'Redundancy'];
const HOLD_DURATION = 2500;
const SWIPE_DURATION = 400;

type Phase = 'visible' | 'swipe-left' | 'swipe-right';

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('visible');
  const [wordWidths, setWordWidths] = useState<number[]>([]);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Measure all word widths on mount
  useEffect(() => {
    if (!measureRef.current) return;
    const container = measureRef.current;
    const spans = container.querySelectorAll('span');
    const widths = Array.from(spans).map((span) => span.offsetWidth);
    setWordWidths(widths);
  }, []);

  const startTransition = useCallback(() => {
    setPhase('swipe-left');
    setTimeout(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
      setPhase('swipe-right');
      setTimeout(() => {
        setPhase('visible');
      }, SWIPE_DURATION);
    }, SWIPE_DURATION);
  }, []);

  useEffect(() => {
    const interval = setInterval(startTransition, HOLD_DURATION + SWIPE_DURATION * 2);
    return () => clearInterval(interval);
  }, [startTransition]);

  const currentWidth = wordWidths[wordIndex] || 0;

  return (
    <section className="relative bg-white pt-32 pb-0 lg:pt-36 lg:pb-0 overflow-hidden min-h-hero flex items-center">
      {/* Right half — background image. lg and up only.
          Below lg this container was full-bleed behind every line of hero copy,
          and the mask over it runs left-to-right, so the right end of each line
          sat on unmasked photograph. Measured against the darkest pixel behind
          text — which is pure black — body copy came out at 1.00:1, meaning the
          text and its background were the same luminance. No scrim value fixes
          that while leaving the image recognisable, so below lg it does not
          render at all and the section's own bg-white shows through.

          `hidden lg:block` alone would not have been enough: display:none on an
          ancestor does not stop the browser fetching an <img>, so a phone would
          still have paid for a 5879x5057 JPEG it never shows. The <source> below
          is what actually prevents it — under <picture> the first matching
          <source> wins outright and the <img>'s own srcset is never consulted,
          so below lg the browser resolves a 1x1 transparent GIF held inline and
          makes no request. At lg the media query stops matching, nothing
          intercepts, and Next's optimised srcset is used exactly as before.

          `priority` is gone with it, leaving Next's default loading="lazy",
          and that default is load-bearing rather than incidental. It emitted a
          preload <link>, which is not subject to <picture> rules and would have
          re-introduced the mobile download outright. loading="eager" was tried
          as a replacement and reintroduced it too, by a subtler route: eager
          lets Chrome's preload scanner speculatively fetch srcset candidates
          during parsing, before <picture> selection has resolved. Measured at
          390px that was three requests for w=2048, w=1080 and w=828 — discarded
          once the data URI won, but issued. Under lazy the scanner does not
          speculate and the count is zero. Do not add eager or fetchPriority
          here without re-measuring. */}
      <div className="hidden lg:block absolute top-0 right-0 w-full lg:w-[40%] h-full">
        <picture>
          <source
            media="(max-width: 1023.98px)"
            srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          />
          <Image
            src="/hero-image.jpg"
            alt="Modern office with city skyline view"
            fill
            sizes="40vw"
            className="object-cover"
          />
        </picture>
        {/* Gradient overlay: fades image into white on the left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent lg:via-white/40" />
        {/* Bottom fade to white for clean transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="flex justify-center px-6">
          {/* Hidden measurement container */}
          <span
            ref={measureRef}
            aria-hidden="true"
            className="absolute opacity-0 pointer-events-none text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-display font-extrabold whitespace-nowrap"
          >
            {rotatingWords.map((word) => (
              <span key={word} className="inline-block">{word}</span>
            ))}
          </span>

          {/* Headline with accordion rotating word — inline-block so it shrinks to content, then centered with flex */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            /* whitespace-nowrap stays unconditional. Below sm the line is broken
               deliberately by the <br /> further down rather than by wrapping,
               so nowrap now protects BOTH lines from breaking mid-phrase.
               max-sm:text-center centres the two stacked lines and is inert at
               sm and up, where the headline is a single line again. */
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-display font-extrabold text-[#1e293b] mb-8 leading-[1.1] tracking-tight whitespace-nowrap inline-block max-sm:text-center"
          >
            Your{' '}
            <span
              className="inline-flex items-baseline overflow-hidden"
              style={{
                width: phase === 'swipe-left'
                  ? '0px'
                  : currentWidth > 0 ? `${currentWidth}px` : 'auto',
                transition: `width ${SWIPE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                verticalAlign: 'baseline',
                lineHeight: 'inherit',
              }}
            >
              <span className="text-[#008838] whitespace-nowrap leading-[inherit]">
                {rotatingWords[wordIndex]}
              </span>
            </span>
            <span
              className="inline-block w-[3px] relative"
              style={{
                height: '1.2em',
                backgroundColor: '#1e293b',
                verticalAlign: 'middle',
                marginLeft: '4px',
                marginRight: '4px',
              }}
            />
            {/* Forced break below sm, so the headline is two fixed lines rather
                than one that overflows a 390px viewport by ~70px and gets
                clipped by the section's overflow-hidden.
                A <br> breaks even under white-space: nowrap — nowrap only
                suppresses AUTOMATIC wrapping — and display:none at sm removes
                the break entirely, restoring the single-line layout untouched.
                Putting the break before the space keeps that space out of line
                2's leading edge below sm, while still separating the caret from
                "Sourcing" at sm and up. */}
            <br aria-hidden="true" className="sm:hidden" />{' '}
            Sourcing Experts
          </motion.h1>
        </div>

        {/* Body text + button — centered on full page */}
        <div className="text-center max-w-2xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#1e293b] mb-6 leading-relaxed font-medium"
          >
            Expert guidance at <span className="text-[#008838] font-bold">zero cost</span> to you.
            We&apos;re paid by carriers, not clients.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg md:text-xl text-[#475569] mb-12"
          >
            Insero is your technology broker, advising you on solutions, services,
            and the right vendors to meet all your technology needs.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-10 py-5 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors duration-200 shadow-lg shadow-[#008838]/20">
                <span>Get Started</span>
                <ArrowRight
                  weight="bold"
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
