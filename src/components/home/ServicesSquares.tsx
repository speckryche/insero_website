import type { CSSProperties } from 'react';
import Link from 'next/link';

/*
 * "Whatever's on your list, we shop it." (spec section.svc2). Four square
 * tiles to the service pages, then the quieter ALSO row. Contact Center, POTS
 * Replacement, Colocation and SIP Trunking have no pages yet, so they point at
 * the form.
 */

const SQUARES = [
  { name: 'Internet', href: '/services/internet', img: 'inet', c: 'var(--color-green-bright)', alt: 'A small office on a floating grass island, wired up by a glowing green cable' },
  { name: 'Voice', href: '/services/voice', img: 'voice', c: '#d4601a', alt: 'An orange desk telephone on a floating grass island in warm clouds' },
  { name: 'SD-WAN', href: '/services/sdwan', img: 'sdwan', c: '#2f5fe0', alt: 'An office on a floating island with a main and a backup cable' },
  { name: 'Security', href: '/services/security', img: 'sec', c: '#7a3fe0', alt: 'An office on a floating island at dusk behind a glowing purple shield gate' },
];

const ALSO = ['Contact Center', 'POTS Replacement', 'Colocation', 'SIP Trunking'];

const alsoLink =
  'border-b-2 border-[#e3e8ec] text-[18px] font-bold text-[#14202c] no-underline transition-[border-color,color] duration-[250ms] hover:border-green-bright hover:text-green-text';

export function ServicesSquares() {
  return (
    <section
      aria-labelledby="hm-svc-h"
      className="bg-white px-[5vw] pt-[14vh] pb-[11vh] text-center font-display text-[#14202c]"
    >
      <div>
        <h2
          id="hm-svc-h"
          className="text-[clamp(34px,4vw,64px)] font-extrabold! leading-[1.05]! tracking-[-.025em] text-[#14202c]!"
        >
          Whatever&apos;s on your list, <em className="text-green-bright not-italic">we shop it.</em>
        </h2>
        <p className="mt-[12px] text-[clamp(16px,1.25vw,19px)] text-[#5b6875]">
          Start with one of the big four, or tell us what else you need.
        </p>
      </div>

      <div className="mx-auto mt-[7vh] grid max-w-[1240px] grid-cols-4 gap-[clamp(14px,1.6vw,24px)] max-[900px]:grid-cols-2">
        {SQUARES.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            style={{ '--c': s.c } as CSSProperties}
            className="group relative block aspect-square overflow-hidden rounded-[24px] shadow-[0_14px_34px_rgba(20,32,44,.1)] transition-[transform,box-shadow] duration-[350ms] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0)_55%,rgba(10,18,26,.45))] after:content-[''] hover:-translate-y-[6px] hover:shadow-[0_22px_46px_rgba(20,32,44,.16)] motion-reduce:hover:translate-y-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/home/cards/${s.img}-poster.jpg`}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              className="block h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.07] motion-reduce:group-hover:scale-100"
            />
            <span className="absolute bottom-[16px] left-[18px] z-[2] text-[clamp(22px,2vw,30px)] font-extrabold tracking-[-.015em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,.35)]">
              {s.name}
            </span>
            <span
              aria-hidden="true"
              className="absolute right-[16px] bottom-[16px] z-[2] grid h-[40px] w-[40px] place-items-center rounded-full bg-white text-[18px] font-extrabold text-(--c) transition-transform duration-300 group-hover:translate-x-[3px] motion-reduce:group-hover:translate-x-0"
            >
              →
            </span>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-[7vh] flex max-w-[960px] flex-wrap items-center justify-center gap-x-[28px] gap-y-[10px] border-t border-[#e9edf0] pt-[4vh]">
        <span className="text-[13px] font-extrabold tracking-[.16em] text-[#8a97a3]">ALSO</span>
        {ALSO.map((name) => (
          <a key={name} href="#get-started" className={alsoLink}>
            {name}
          </a>
        ))}
        <a
          href="#get-started"
          className="border-b-2 border-green-bright text-[18px] font-bold text-green-text no-underline"
        >
          Ask us anything →
        </a>
      </div>
    </section>
  );
}

export default ServicesSquares;
