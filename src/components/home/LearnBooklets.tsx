import type { CSSProperties } from 'react';
import Link from 'next/link';

/*
 * "Learn the basics." (spec section.learn). Three guide covers as tilted
 * booklets with a darker spine; the INZO art fades up into the cover colour.
 * On hover a cover straightens and lifts. Each links to its article.
 */

const GUIDES = [
  {
    href: '/resources/how-a-telecom-broker-works',
    bg: '#028145',
    r: '-3deg',
    kicker: 'HOW WE WORK',
    title: 'How a Telecom Broker Actually Works (And Why It’s Free)',
    img: '/home/learn/broker.jpg',
    alt: 'INZO the robot at a chalkboard, pointing to a diagram of three carrier towers feeding one office building',
    blurb: 'The honest answer to “how do you not charge me?” — plus what brokers do that going direct doesn’t.',
  },
  {
    href: '/resources/pots-line-replacement-options',
    bg: '#c05a1f',
    r: '2deg',
    kicker: 'POTS REPLACEMENT',
    title: 'POTS Lines Are Going Away. Here Are Your Replacement Options.',
    img: '/home/learn/pots.jpg',
    alt: 'INZO the robot holding an old rotary telephone in one hand and a small modern router in the other',
    blurb: 'Copper is being decommissioned and priced off. How to plan the migration for alarms, elevators, fax, and more.',
  },
  {
    href: '/resources/fiber-vs-cable-business-internet',
    bg: '#1f4398',
    r: '-2deg',
    kicker: 'INTERNET',
    title: 'Fiber vs Cable for Business: An Honest Comparison',
    img: '/home/learn/fiber-vs-cable.jpg',
    alt: 'INZO the robot at a workbench comparing a glowing fiber optic strand with a coaxial cable',
    blurb: 'Fiber is usually right — but not always. When cable still wins, and how to find what’s available at your address.',
  },
];

export function LearnBooklets() {
  return (
    <section aria-labelledby="hm-learn-h" className="bg-[#f6f8f9] px-[4vw] pt-[13vh] pb-[14vh] font-display text-[#14202c]">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-[7vh] flex flex-wrap items-end justify-between gap-[20px]">
          <div>
            <h2
              id="hm-learn-h"
              className="text-[clamp(34px,4vw,64px)] font-extrabold! leading-[1.05]! tracking-[-.025em] text-[#14202c]!"
            >
              Learn the <em className="text-green-bright not-italic">basics.</em>
            </h2>
            <p className="mt-[10px] text-[18px] text-[#5b6875]">Plain-English guides. No sales pitch.</p>
          </div>
          <Link href="/resources" className="text-[17px] font-extrabold text-green-text no-underline">
            Browse all guides →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-[clamp(26px,3vw,48px)] max-[900px]:grid-cols-1">
          {GUIDES.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              style={{ '--bg': g.bg, '--r': g.r } as CSSProperties}
              className="group text-inherit no-underline"
            >
              <div className="relative flex aspect-[3/4.1] [transform:rotate(var(--r))] flex-col overflow-hidden rounded-[10px_22px_22px_10px] bg-(--bg) text-white shadow-[0_26px_50px_rgba(20,32,44,.22),inset_14px_0_0_rgba(0,0,0,.18)] transition-[transform,box-shadow] duration-[350ms] group-hover:[transform:rotate(0)_translateY(-8px)] group-hover:shadow-[0_34px_64px_rgba(20,32,44,.28),inset_14px_0_0_rgba(0,0,0,.18)] motion-reduce:transition-none motion-reduce:group-hover:[transform:rotate(0)]">
                <span className="pt-[28px] pr-[26px] pl-[40px] text-[12px] font-extrabold tracking-[.16em] opacity-85">
                  {g.kicker}
                </span>
                <b className="relative z-[2] pt-[12px] pr-[24px] pl-[40px] text-[clamp(20px,1.9vw,28px)] leading-[1.14] font-extrabold tracking-[-.02em]">
                  {g.title}
                </b>
                <div className="absolute right-0 bottom-0 left-0 h-[62%] [mask-image:linear-gradient(transparent,#000_22%)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-full w-full object-cover object-[50%_70%] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <span className="absolute bottom-[18px] left-[40px] z-[3] rounded-full bg-[rgba(255,255,255,.92)] px-[12px] py-[6px] text-[13px] font-extrabold text-(--bg)">
                  insero · free guide
                </span>
              </div>
              <p className="mt-[22px] px-[6px] text-[16px] leading-[1.5] text-[#33475b]">{g.blurb}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LearnBooklets;
