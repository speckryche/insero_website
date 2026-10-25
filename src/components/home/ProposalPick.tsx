'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/*
 * Pinned proposal scene (spec section.prop). The section is 300vh with a
 * sticky 100vh stage. Over the first 45% of the scroll the card tilts from
 * rotateX(38deg) to flat; past 60% the headline swaps and the AT&T row is
 * picked. Under prefers-reduced-motion the card is flat from the start and
 * the swap is instant.
 *
 * Deviation from the spec: at 640px and below the TERM and INSTALL columns are
 * hidden and cells are tighter, so the table fits the card instead of being
 * clipped, and the headline box grows to hold two lines.
 */

// Sample data, labelled as such on the card.
const ROWS = [
  { name: 'AT&T', src: '/home/carriers/att.svg', h: 22, type: 'Fiber', speed: '1 Gig', term: '36 mo', monthly: '$189/mo', install: '$0', win: true },
  { name: 'Lumen', src: '/home/carriers/lumen.png', h: 16, type: 'Fiber', speed: '1 Gig', term: '36 mo', monthly: '$215/mo', install: '$0' },
  { name: 'Comcast Business', src: '/home/carriers/comcast.svg', h: 26, type: 'Coax', speed: '600 Mbps', term: '24 mo', monthly: '$169/mo', install: '$99' },
  { name: 'Spectrum Business', src: '/home/carriers/spectrum.png', h: 26, type: 'Coax', speed: '500 Mbps', term: '12 mo', monthly: '$149/mo', install: '$0', low: true },
  { name: 'Ziply Fiber', src: '/home/carriers/ziply.svg', h: 24, type: 'Fiber', speed: '500 Mbps', term: '36 mo', monthly: '$199/mo', install: '$250' },
];

const easeOutCubic = (q: number) => 1 - Math.pow(1 - q, 3);

export function ProposalPick() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [pick, setPick] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const e = useTransform(scrollYProgress, (p) => easeOutCubic(Math.min(1, p / 0.45)));
  const transform = useTransform(
    e,
    (v) => `translateY(${(1 - v) * 18}vh) rotateX(${(1 - v) * 38}deg) scale(${0.86 + 0.14 * v})`,
  );
  const opacity = useTransform(e, (v) => 0.3 + 0.7 * v);
  useMotionValueEvent(scrollYProgress, 'change', (p) => setPick(p > 0.6));

  const fade = reduce ? '' : 'transition-[opacity,transform] duration-[350ms]';
  const rowFx = reduce ? '' : 'transition-[transform,opacity] duration-[400ms]';
  const th = 'px-[14px] text-left font-bold max-[640px]:px-[8px]';
  const sm = 'max-[640px]:hidden';

  return (
    <section ref={ref} aria-label="Sample proposal" className="relative h-[300vh] bg-[#f6f8f9] font-display text-[#14202c]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-[4vw] [perspective:1400px]">
        <div className="relative mb-[3vh] h-[clamp(56px,6vw,96px)] w-full text-center max-[640px]:h-[80px]">
          <h2
            aria-hidden={pick}
            className={`absolute inset-0 text-[clamp(34px,4.4vw,72px)] font-extrabold! leading-[1.1]! tracking-[-.025em] text-[#14202c]! ${fade} ${pick ? '-translate-y-[14px] opacity-0' : ''}`}
          >
            No more <em className="text-green-bright not-italic">chasing quotes.</em>
          </h2>
          <h2
            aria-hidden={!pick}
            className={`absolute inset-0 text-[clamp(34px,4.4vw,72px)] font-extrabold! leading-[1.1]! tracking-[-.025em] text-[#14202c]! ${fade} ${pick ? '' : 'translate-y-[14px] opacity-0'}`}
          >
            Just pick <em className="text-green-bright not-italic">what fits.</em>
          </h2>
        </div>

        <motion.div
          style={reduce ? undefined : { transform, opacity }}
          className="w-[min(1000px,92vw)] origin-bottom rounded-[18px] bg-white p-[clamp(18px,2.2vw,34px)] shadow-[0_30px_80px_rgba(20,32,44,.18)] will-change-transform"
        >
          <div className="flex items-center justify-between text-[13px] font-semibold text-[#5b6875]">
            <b className="text-[20px] font-extrabold text-[#14202c]">
              insero <span className="text-green-text">×</span> Your Business
            </b>
            <span>Example proposal</span>
          </div>
          <div className="mt-[16px] text-[12px] font-extrabold tracking-[.08em] text-green-text">
            INTERNET · 5 QUOTES · SAMPLE DATA
          </div>
          <h3 className="mt-[4px] text-[clamp(22px,2.4vw,36px)] font-extrabold! tracking-[-.02em] text-[#14202c]!">
            Every Option. One Place.
          </h3>

          <table className="mt-[14px] w-full border-separate border-spacing-x-0 border-spacing-y-[8px] text-[clamp(12px,1vw,15px)]">
            <thead>
              <tr className="text-left text-[12px] font-bold tracking-[.04em] text-[#5b6875]">
                <th className={th}>CARRIER</th>
                <th className={th}>TYPE</th>
                <th className={th}>SPEED</th>
                <th className={`${th} ${sm}`}>TERM</th>
                <th className={th}>MONTHLY</th>
                <th className={`${th} ${sm}`}>INSTALL</th>
                <th className="px-[14px] max-[640px]:px-[8px]">
                  <span className="sr-only">Picked</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => {
                const won = pick && r.win;
                const base = `px-[14px] max-[640px]:px-[8px] ${won ? 'bg-white' : r.low ? 'bg-[#eaf7ee]' : 'bg-[#f6f8f9]'} ${reduce ? '' : 'transition-[opacity,background-color] duration-[400ms]'}`;
                const cell = `${base} py-[13px] font-semibold`;
                return (
                  <tr
                    key={r.name}
                    className={`${rowFx} ${pick && !r.win ? 'opacity-[.32]' : ''} ${won ? 'scale-[1.03] rounded-[10px] shadow-[0_10px_24px_rgba(31,166,74,.18)] outline-2 -outline-offset-1 outline-green-bright' : ''}`}
                  >
                    <td className={`${base} rounded-l-[10px] py-[10px] font-extrabold`}>
                      {/* Plain <img>: several of these are SVG, which next/image won't optimise. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={r.src}
                        alt={r.name}
                        style={{ height: r.h }}
                        className="block w-auto max-w-[110px] object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </td>
                    <td className={cell}>{r.type}</td>
                    <td className={cell}>{r.speed}</td>
                    <td className={`${cell} ${sm}`}>{r.term}</td>
                    <td className={`${cell} ${r.low ? 'shadow-[inset_0_-3px_0_#7cf55a]' : ''}`}>{r.monthly}</td>
                    <td className={`${cell} ${sm}`}>{r.install}</td>
                    <td className={`${cell} rounded-r-[10px] text-right`}>
                      <span
                        aria-hidden={!won}
                        className={`inline-grid h-[24px] w-[24px] place-items-center rounded-full bg-green-bright text-[14px] text-white ${reduce ? '' : 'transition-all duration-[350ms]'} ${won ? 'scale-100 opacity-100' : 'scale-[.4] opacity-0'}`}
                      >
                        ✓<span className="sr-only"> Picked</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-[8px] text-[11px] text-[#5b6875]">
            Illustration only. Logos show carriers we work with; prices and terms are sample data. Your proposal shows the
            real options at your address.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProposalPick;
