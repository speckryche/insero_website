import type { CSSProperties } from 'react';
import Link from 'next/link';
import { CardVideo } from './CardVideo';

/*
 * The four pillar cards (spec section.stack). Each card is sticky a little
 * lower than the one before and sits above it, so scrolling slides every card
 * over the previous one. Colours, offsets and copy are the spec's, verbatim.
 * Deviation from the spec: at 860px and below the cards are not sticky. A
 * stacked phone card is taller than the screen, so the next card would cover
 * its buttons before they ever scrolled into view.
 */

type Pillar = {
  title: string;
  lead: string;
  leadEm: string;
  body: string;
  logos: { name: string; src: string; h?: number }[];
  talk: string;
  explore: string;
  href: string;
  video: string;
  videoLabel: string;
  colors: { bg: string; ac: string; c1: string };
  top: number;
};

const PILLARS: Pillar[] = [
  {
    title: 'Internet.',
    lead: 'Every internet option.',
    leadEm: 'Side by side.',
    body: 'Fiber, coax, 5G wireless and satellite. We check every carrier that serves your address and line up the quotes so you can compare in one place.',
    logos: [
      { name: 'AT&T', src: '/home/carriers/att.svg' },
      { name: 'Comcast Business', src: '/home/carriers/comcast.svg' },
      { name: 'Lumen', src: '/home/carriers/lumen.png' },
    ],
    talk: "Let's talk internet",
    explore: 'Explore internet',
    href: '/services/internet',
    video: 'inet',
    videoLabel: 'A small office on a floating grass island, wired to the internet by a glowing green cable.',
    colors: { bg: '#ecf8ef', ac: '#1a9a49', c1: '#0f3b22' },
    top: 88,
  },
  {
    title: 'Voice.',
    lead: 'Business voice,',
    leadEm: 'minus the guesswork.',
    body: 'Hosted PBX, contact center, SIP trunks and POTS replacement. We line up voice options that fit how your team actually works.',
    logos: [
      { name: 'Nextiva', src: '/home/carriers/nextiva.svg' },
      { name: 'RingCentral', src: '/home/carriers/ringcentral.svg' },
      { name: 'Zoom', src: '/home/carriers/zoom.png' },
    ],
    talk: "Let's talk voice",
    explore: 'Explore voice',
    href: '/services/voice',
    video: 'voice',
    videoLabel: 'An orange desk telephone on a floating grass island in warm clouds, connected by a glowing green cable.',
    colors: { bg: '#fff3ea', ac: '#d4601a', c1: '#4a1e07' },
    top: 102,
  },
  {
    title: 'SD-WAN.',
    lead: 'Stay online',
    leadEm: 'when a line goes down.',
    body: "Redundancy built in. Backup connections and SD-WAN switch over on their own, so one outage doesn't stop the business.",
    logos: [
      { name: 'AireSpring', src: '/home/carriers/airespring.png', h: 28 },
      { name: 'Bigleaf Networks', src: '/home/carriers/bigleaf.png' },
      { name: 'Arista', src: '/home/carriers/arista.png', h: 18 },
    ],
    talk: "Let's talk SD-WAN",
    explore: 'Explore SD-WAN',
    href: '/services/sdwan',
    video: 'sdwan',
    videoLabel: 'An office on a floating island with two cables; one sparks out and the backup keeps it connected.',
    colors: { bg: '#edf3ff', ac: '#2f5fe0', c1: '#0e1d4d' },
    top: 116,
  },
  {
    title: 'Security.',
    lead: 'Protection that fits',
    leadEm: 'how you work.',
    body: 'Firewall, threat detection and compliance support from the providers we work with, quoted the same side-by-side way.',
    logos: [
      { name: 'Aryaka', src: '/home/carriers/aryaka.png', h: 24 },
      { name: 'Cato Networks', src: '/home/carriers/cato.png', h: 34 },
      { name: 'Cloudflare', src: '/home/carriers/cloudflare.png', h: 30 },
    ],
    talk: "Let's talk security",
    explore: 'Explore security',
    href: '/services/security',
    video: 'sec',
    videoLabel: 'An office on a floating island at dusk, guarded by a glowing purple shield gate.',
    colors: { bg: '#f5efff', ac: '#7a3fe0', c1: '#2b1052' },
    top: 130,
  },
];

export function PillarStack() {
  return (
    <div className="pt-[7vh] pb-[4vh] font-display">
      <section aria-label="Our four services" className="mx-auto w-[min(1240px,92vw)] pb-[10vh]">
        {PILLARS.map((p, i) => (
          <article
            key={p.title}
            style={
              {
                top: p.top,
                zIndex: i + 1,
                '--bg': p.colors.bg,
                '--ac': p.colors.ac,
                '--c1': p.colors.c1,
              } as CSSProperties
            }
            className="sticky mb-[8vh] max-[860px]:static grid min-h-[min(78vh,640px)] grid-cols-2 gap-[clamp(20px,2.4vw,36px)] rounded-[32px] bg-(--bg) p-[clamp(22px,2vw,30px)] shadow-[0_-6px_30px_rgba(20,32,44,.05)] max-[860px]:min-h-0 max-[860px]:grid-cols-1"
          >
            <div className="flex flex-col px-[clamp(8px,1.4vw,24px)] py-[clamp(14px,1.8vw,30px)]">
              <h2 className="text-[clamp(52px,5.4vw,90px)] font-extrabold! leading-[.95]! tracking-[-.035em] text-(--ac)!">
                {p.title}
              </h2>
              <h3 className="mt-[14px] text-[clamp(22px,2vw,32px)] font-bold! leading-[1.06]! tracking-[-.025em] text-(--c1)!">
                {p.lead}
                <br />
                <em className="text-(--ac) not-italic">{p.leadEm}</em>
              </h3>
              <p className="mt-[20px] max-w-[30em] text-[clamp(15px,1.1vw,18px)] leading-[1.55] text-[#2c3a47]">
                {p.body}
              </p>
              <div className="mt-auto pt-[26px]">
                <div className="flex flex-wrap items-center gap-[10px]">
                  {p.logos.map((l) => (
                    <span
                      key={l.name}
                      className="grid h-[52px] w-[118px] place-items-center rounded-[12px] bg-white shadow-[0_4px_12px_rgba(20,32,44,.05)]"
                    >
                      {/* Plain <img>: several of these are SVG, which next/image won't optimise. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={l.src}
                        alt={`${l.name} logo`}
                        style={{ maxHeight: l.h ?? 26 }}
                        className="max-w-[96px]"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  ))}
                  <span className="ml-[4px] text-[15px] font-bold text-(--c1) opacity-75">and more</span>
                </div>
                <div className="mt-[28px] flex flex-wrap gap-[10px]">
                  <a
                    href="#get-started"
                    className="inline-flex h-[48px] items-center gap-[8px] rounded-[12px] bg-(--ac) px-[20px] text-[16px] font-bold text-white no-underline"
                  >
                    {p.talk} <span aria-hidden="true">→</span>
                  </a>
                  <Link
                    href={p.href}
                    className="inline-flex h-[48px] items-center gap-[8px] rounded-[12px] bg-white px-[20px] text-[16px] font-bold text-[#14202c] no-underline"
                  >
                    {p.explore}
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[22px] bg-[#cfe3f7] max-[860px]:order-first max-[860px]:h-[300px]">
              <CardVideo name={p.video} label={p.videoLabel} />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default PillarStack;
