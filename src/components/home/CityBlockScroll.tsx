'use client';

import { useEffect, useRef, useState } from 'react';
import { usePinProgress, seg } from './usePinProgress';

/*
 * The pinned "city block" scene: a city image that powers on one district at a
 * time while a line draws from the block out to a card for each service.
 *
 * Geometry, copy and timing are ported 1:1 from the approved prototype
 * (reference-homepage.html, the `build()` / `update()` pair). All coordinates
 * are in the SVG's own units; viewBox "-170 0 1740 880" on desktop.
 */

// ── Geometry ──────────────────────────────────────────────────────────────
// The image is placed at IW wide. CX0/CY0/CW/CH describe the city's crop in
// the prototype's 1200-wide source space, which the station coordinates use.
const CX0 = 126;
const CY0 = 8.7;
const CW = 1073.5;
const CH = 660.6;
const IW = 1000;
const K = IW / CW;
const IH = CH * K; // = 1000 * 1477 / 2400
const IX = 700 - (600 - CX0) * K;
const IY = 20;
const im = (x: number, y: number): [number, number] => [IX + (x - CX0) * K, IY + (y - CY0) * K];
/** A point given in the city image's own 1700×1046 grid. */
const cp = (x: number, y: number): [number, number] => [IX + (x * IW) / 1700, IY + (y * IH) / 1046];

const DESKTOP_VIEWBOX = '-170 0 1740 880';
// Below 820px only the image is drawn, so the viewBox is cropped to it.
const MOBILE_VIEWBOX = `${IX.toFixed(1)} ${IY} ${IW} ${IH.toFixed(1)}`;

/** Building centres in source coordinates, one per service. */
const STN: [number, number][] = [
  [275, 300],
  [935, 290],
  [600, 540],
];

const CARD = [
  { x: 30, y: 100, w: 360, h: 140 },
  { x: 1370, y: 100, w: 360, h: 140 },
  { x: 700, y: 790, w: 360, h: 140 },
];

// ── Content ───────────────────────────────────────────────────────────────
type Service = {
  name: string;
  cap: React.ReactNode;
  sub: string;
  list: string[];
  logos: string[];
  icon: React.ReactNode;
};

const SERVICES: Service[] = [
  {
    name: 'Internet',
    cap: (
      <>
        Internet: <em>every carrier</em> at your address.
      </>
    ),
    sub: 'Fiber, coax, 5G wireless, satellite',
    list: ['Fiber', 'Coax', '5G Wireless', 'Satellite'],
    logos: ['AT&T', 'Lumen', 'Zayo', 'Ziply', 'Hunter', 'Fatbeam', 'Spectrum', 'Comcast', 'BigLeaf'],
    icon: (
      <>
        <path d="M-14 -2a20 20 0 0 1 28 0" />
        <path d="M-8 4a11 11 0 0 1 16 0" />
        <circle cx="0" cy="10" r="1.5" />
      </>
    ),
  },
  {
    name: 'Voice',
    cap: (
      <>
        Voice: <em>every provider</em> that fits how you work.
      </>
    ),
    sub: 'Hosted PBX, contact center, SIP trunking, POTS replacement',
    list: ['Hosted PBX', 'Contact Center', 'SIP Trunking', 'POTS Replacement'],
    logos: ['RingCentral', 'Zoom', 'Nextiva', 'GoTo'],
    icon: (
      <>
        <rect x="-8" y="-13" width="16" height="26" rx="3" />
        <path d="M-3 9h6" />
      </>
    ),
  },
  {
    name: 'Other Technologies',
    cap: (
      <>
        Other technologies: <em>one advisor</em> for all of it.
      </>
    ),
    sub: 'Same deal: we compare the options, you pick one',
    list: ['SD-WAN', 'Security', 'Colocation', 'Mobility'],
    logos: [],
    icon: (
      <>
        <rect x="-12" y="-12" width="10" height="10" rx="2" />
        <rect x="2" y="-12" width="10" height="10" rx="2" />
        <rect x="-12" y="2" width="10" height="10" rx="2" />
        <rect x="2" y="2" width="10" height="10" rx="2" />
      </>
    ),
  },
];

/** Files already in public/carriers/. Names are URL-encoded where needed. */
const LOGO_FILES: Record<string, string> = {
  'AT&T': '/carriers/AT%26T.svg',
  Lumen: '/carriers/Lumen.png',
  Zayo: '/carriers/Zayo.png',
  Ziply: '/carriers/Ziply.svg',
  Hunter: '/carriers/Hunter.png',
  Fatbeam: '/carriers/Fatbeam.png',
  Spectrum: '/carriers/Spectrum.png',
  Comcast: '/carriers/Comcast.svg',
  BigLeaf: '/carriers/BigLeaf.png',
  RingCentral: '/carriers/RingCentral_Logo_%28Color%29.svg',
  Zoom: '/carriers/Zoom_Logo_Bloom_RGB.png',
  Nextiva: '/carriers/Nextiva.svg',
  GoTo: '/carriers/GoTo.png',
};

/** Every logo in bar order, tagged with the service that lights it. */
const LOGO_BAR = SERVICES.flatMap((s, i) => s.logos.map((name) => ({ name, i })));

const LIT_LAYERS = [
  { key: 'tower', src: '/city/city-lit-tower.webp' },
  { key: 'inet', src: '/city/city-lit-internet.webp' },
  { key: 'voice', src: '/city/city-lit-voice.webp' },
  { key: 'other', src: '/city/city-lit-other.webp' },
] as const;

// ── Timing ────────────────────────────────────────────────────────────────
const BASE = 0.1;
const STEP = 0.24;
const phase = (i: number) => BASE + i * STEP;

// ── Connector paths ───────────────────────────────────────────────────────
// Start: the diamond's left, right and bottom corners. End: the Internet
// card's bottom-right corner, the Voice card's bottom-left, and the top-middle
// of the Other card. Control points are the prototype's (`const D=`).
const LINE_PATHS = (() => {
  const A = [cp(51, 566), cp(1450, 566), cp(774, 985)];
  const B: [number, number][] = [
    [CARD[0].x + CARD[0].w / 2 - 2, CARD[0].y + CARD[0].h / 2 - 2],
    [CARD[1].x - CARD[1].w / 2 + 2, CARD[1].y + CARD[1].h / 2 - 2],
    [CARD[2].x, CARD[2].y - CARD[2].h / 2],
  ];
  return A.map((a, i) => {
    const b = B[i];
    const sx = i === 0 ? -1 : 1;
    const d =
      i < 2
        ? `M${a[0].toFixed(1)} ${a[1].toFixed(1)} C ${(a[0] + sx * 90).toFixed(1)} ${a[1].toFixed(1)}, ${(b[0] + sx * 10).toFixed(1)} ${(b[1] + 110).toFixed(1)}, ${b[0]} ${b[1]}`
        : `M${a[0].toFixed(1)} ${a[1].toFixed(1)} C ${(a[0] + 60).toFixed(1)} ${(a[1] + 40).toFixed(1)}, ${b[0] - 60} ${b[1] - 50}, ${b[0]} ${b[1]}`;
    return { d, start: a };
  });
})();

/** Ripple centres sit at each building's foot. */
const RIPPLES = STN.map((s) => im(s[0], s[1] + 70));

function SvgCard({ i }: { i: number }) {
  const s = SERVICES[i];
  const c = CARD[i];
  const x0 = c.x - c.w / 2;
  const y0 = c.y - c.h / 2;
  const cols = 2;
  const cw = (c.w - 44) / cols;
  return (
    <g className="card" data-i={i} style={{ opacity: 0 }}>
      <rect className="bx" x={x0} y={y0} width={c.w} height={c.h} rx={18} filter="url(#hm-city-sh)" />
      <g className="ico" transform={`translate(${x0 + 36} ${y0 + 36})`}>
        {s.icon}
      </g>
      <text className="ttl" x={x0 + 62} y={y0 + 37} dominantBaseline="central">
        {s.name}
      </text>
      {s.list.map((t, k) => {
        const cx = x0 + 32 + (k % cols) * cw;
        const cy = y0 + 84 + Math.floor(k / cols) * 32;
        return (
          <g className="it" key={t}>
            <circle cx={cx} cy={cy} r={9} />
            <path
              d={`M${cx - 4} ${cy}l3 3 5-6`}
              stroke="#fff"
              strokeWidth={2.2}
              fill="none"
              strokeLinecap="round"
            />
            <text x={cx + 17} y={cy} dominantBaseline="central">
              {t}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/**
 * Path length, or 0 when the path is not rendered. Below 820px the connector
 * group is display:none, where some browsers throw instead of answering.
 */
function pathLength(path: SVGPathElement): number {
  try {
    return path.getTotalLength();
  } catch {
    return 0;
  }
}

type Els = {
  caps: HTMLElement[];
  lit: SVGImageElement[];
  rips: SVGEllipseElement[];
  exts: SVGPathElement[];
  extLen: number[];
  flows: SVGPathElement[];
  tracks: SVGPathElement[];
  dots: SVGCircleElement[];
  cards: SVGGElement[];
  cardItems: SVGGElement[][];
  mcards: HTMLElement[];
  mcardItems: HTMLElement[][];
  pk: SVGCircleElement | null;
  logos: HTMLElement[];
};

export function CityBlockScroll() {
  const pinRef = useRef<HTMLDivElement>(null);
  const els = useRef<Els | null>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 819px)');
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const collect = (root: HTMLElement): Els => {
    const all = <T extends Element>(sel: string) => Array.from(root.querySelectorAll<T>(sel));
    const exts = all<SVGPathElement>('.ext');
    const cards = all<SVGGElement>('.card');
    const mcards = all<HTMLElement>('.mcard');
    return {
      caps: all<HTMLElement>('.hm-cap h2'),
      lit: all<SVGImageElement>('.lit'),
      rips: all<SVGEllipseElement>('.rip'),
      exts,
      extLen: exts.map(pathLength),
      flows: all<SVGPathElement>('.flow'),
      tracks: all<SVGPathElement>('.track'),
      dots: all<SVGCircleElement>('.dot'),
      cards,
      cardItems: cards.map((c) => Array.from(c.querySelectorAll<SVGGElement>('.it'))),
      mcards,
      mcardItems: mcards.map((c) => Array.from(c.querySelectorAll<HTMLElement>('li'))),
      pk: root.querySelector<SVGCircleElement>('.pk'),
      logos: all<HTMLElement>('.lg'),
    };
  };

  usePinProgress(pinRef, (p) => {
    const root = pinRef.current;
    if (!root) return;
    if (!els.current) els.current = collect(root);
    const e = els.current;

    // Caption: intro, one per service, then the closing line.
    let ci = 0;
    SERVICES.forEach((_, i) => {
      if (p >= phase(i) + 0.06) ci = i + 1;
    });
    if (p >= BASE + SERVICES.length * STEP) ci = SERVICES.length + 1;
    e.caps.forEach((h, i) => h.classList.toggle('on', i === ci));

    let showPk = false;
    SERVICES.forEach((_, i) => {
      const a = phase(i);
      const vis = p >= a;

      // Line: draws over [a+.02, a+.07], then a white dash flows along it.
      const ext = e.exts[i];
      // Re-measured lazily: a page loaded at phone width measures 0 here, and
      // the lines need a real length if the window is then widened.
      if (ext && !e.extLen[i]) e.extLen[i] = pathLength(ext);
      const L = e.extLen[i];
      const t = seg(p, a + 0.02, a + 0.07);
      if (ext) {
        ext.style.strokeDasharray = `${L}`;
        ext.style.strokeDashoffset = `${L * (1 - t)}`;
        ext.style.opacity = vis ? '1' : '0';
        if (t > 0 && t < 1 && e.pk && L > 0) {
          const q = ext.getPointAtLength(L * t);
          e.pk.setAttribute('cx', `${q.x}`);
          e.pk.setAttribute('cy', `${q.y}`);
          showPk = true;
        }
      }
      if (e.flows[i]) e.flows[i].style.opacity = t >= 1 ? '1' : '0';
      if (e.tracks[i]) e.tracks[i].style.opacity = vis ? '1' : '0';
      const dot = e.dots[i];
      if (dot) {
        dot.style.opacity = vis ? '1' : '0';
        dot.setAttribute('fill', p > a + 0.02 ? '#1FA855' : '#B9C6D1');
      }

      // Card: appears when its phase starts and stays; turns green at a+.07,
      // then ticks its items one by one.
      const on = p > a + 0.07;
      const card = e.cards[i];
      if (card) {
        card.style.opacity = vis ? '1' : '0';
        card.classList.toggle('on', on);
      }
      e.cardItems[i]?.forEach((it, k) => it.classList.toggle('on', p > a + 0.075 + k * 0.01));

      const mcard = e.mcards[i];
      if (mcard) {
        mcard.classList.toggle('vis', vis);
        mcard.classList.toggle('on', on);
      }
      e.mcardItems[i]?.forEach((it, k) => it.classList.toggle('on', p > a + 0.075 + k * 0.01));
    });
    e.pk?.setAttribute('opacity', showPk ? '1' : '0');

    // Power the city on, district by district.
    const level: Record<string, number> = {
      tower: seg(p, BASE, BASE + 0.06),
      inet: seg(p, phase(0) + 0.04, phase(0) + 0.08),
      voice: seg(p, phase(1) + 0.04, phase(1) + 0.08),
      other: seg(p, phase(2) + 0.04, phase(2) + 0.08),
    };
    e.lit.forEach((img) => img.setAttribute('opacity', `${level[img.dataset.k ?? ''] ?? 0}`));

    // Ground ripples: three thin rings from each building as it connects.
    e.rips.forEach((r) => {
      const i = Number(r.dataset.i);
      const k = Number(r.dataset.k);
      const a = phase(i) + 0.01 + k * 0.008;
      const t = seg(p, a, a + 0.05);
      const R = 10 + t * 140;
      r.setAttribute('rx', `${R}`);
      r.setAttribute('ry', `${R * 0.5}`);
      r.setAttribute('opacity', `${t > 0 && t < 1 ? (1 - t) * 0.9 : 0}`);
    });

    // Logos: grey until their service connects, then colour with a brief pop.
    e.logos.forEach((g, k) => {
      const a = phase(Number(g.dataset.i)) + 0.07;
      const on = p > a + (k % 9) * 0.004;
      g.classList.toggle('on', on);
      g.classList.toggle('pop', on && p < a + 0.05);
    });
  });

  return (
    <section id="how-it-works" className="hm-city" aria-labelledby="hm-city-title">
      <div ref={pinRef} className="hm-pin hm-pin-city">
        <div className="hm-stage">
          <div className="hm-cap" aria-live="off">
            <h2 id="hm-city-title" className="on">
              Your business runs on <em>technology.</em>
              <small>We source all of it.</small>
            </h2>
            {SERVICES.map((s) => (
              <h2 key={s.name} aria-hidden="true">
                {s.cap}
                <small>{s.sub}</small>
              </h2>
            ))}
            <h2 aria-hidden="true">
              One advisor. <em>Every option.</em> $0 to you.
              <small>Plenty of carriers do more than one thing. We compare them all.</small>
            </h2>
          </div>

          <div className="hm-art">
            <svg
              viewBox={narrow ? MOBILE_VIEWBOX : DESKTOP_VIEWBOX}
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="A city block lighting up as Insero connects internet, voice and other technology providers to it"
            >
              <defs>
                <filter
                  id="hm-city-gl"
                  filterUnits="userSpaceOnUse"
                  x="-170"
                  y="0"
                  width="1740"
                  height="880"
                >
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="hm-city-sh" x="-20%" y="-20%" width="140%" height="160%">
                  <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0D1419" floodOpacity=".12" />
                </filter>
                <radialGradient id="hm-city-fade" cx="50%" cy="50%" r="50%">
                  <stop offset=".72" stopColor="#fff" />
                  <stop offset="1" stopColor="#000" />
                </radialGradient>
                <mask id="hm-city-edge" maskUnits="userSpaceOnUse" x={IX} y={IY} width={IW} height={IH}>
                  <rect x={IX} y={IY} width={IW} height={IH} fill="url(#hm-city-fade)" />
                </mask>
              </defs>

              <g mask="url(#hm-city-edge)">
                <image href="/city/city-day.webp" x={IX} y={IY} width={IW} height={IH} />
                {LIT_LAYERS.map((l) => (
                  <image
                    key={l.key}
                    className="lit"
                    data-k={l.key}
                    href={l.src}
                    x={IX}
                    y={IY}
                    width={IW}
                    height={IH}
                    opacity={0}
                  />
                ))}
              </g>

              {RIPPLES.map((c, i) =>
                [0, 1, 2].map((k) => (
                  <ellipse
                    key={`${i}-${k}`}
                    className="rip"
                    data-i={i}
                    data-k={k}
                    cx={c[0]}
                    cy={c[1]}
                    rx={0}
                    ry={0}
                    fill="none"
                    stroke="#1FA855"
                    strokeWidth={3.5 - k}
                    opacity={0}
                  />
                )),
              )}

              <g className="hm-desk-only">
                {LINE_PATHS.map((l, i) => (
                  <g key={i}>
                    <path
                      className="track"
                      d={l.d}
                      fill="none"
                      stroke="#B9C6D1"
                      strokeWidth={2.5}
                      strokeDasharray="2 8"
                      strokeLinecap="round"
                      style={{ opacity: 0 }}
                    />
                    <path
                      className="ext"
                      d={l.d}
                      fill="none"
                      stroke="#1FA855"
                      strokeWidth={3}
                      strokeLinecap="round"
                      filter="url(#hm-city-gl)"
                      style={{ opacity: 0 }}
                    />
                    <path className="flow" d={l.d} />
                    <circle
                      className="dot"
                      cx={l.start[0]}
                      cy={l.start[1]}
                      r={5}
                      fill="#B9C6D1"
                      style={{ opacity: 0 }}
                    />
                  </g>
                ))}
                {SERVICES.map((_, i) => (
                  <SvgCard key={i} i={i} />
                ))}
                <circle className="pk" r={6} fill="#1FA855" filter="url(#hm-city-gl)" opacity={0} />
              </g>
            </svg>
          </div>

          {/* Below 820px the SVG cards and lines are hidden and these take
              their place, stacked under the image. */}
          <div className="hm-mcards">
            {SERVICES.map((s) => (
              <div className="mcard" key={s.name}>
                <h3>{s.name}</h3>
                <ul>
                  {s.list.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hm-lstrip">
            {LOGO_BAR.map(({ name, i }) => (
              <div className="lg" data-i={i} key={name}>
                <div className="lt">
                  {/* Plain <img>: several of these are SVG, which next/image
                      will not optimise, and they are tiny. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={LOGO_FILES[name]} alt={name} loading="lazy" decoding="async" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CityBlockScroll;
