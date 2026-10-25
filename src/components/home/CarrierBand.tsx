/*
 * "We shop carriers like" marquee, ported from the v3 spec (section.carriers).
 * One row, rendered twice back to back so translateX(-50%) loops seamlessly.
 * Pauses on hover; no animation under prefers-reduced-motion.
 */

// Per-logo max-height from the spec, so every mark reads at a similar weight.
const CARRIERS = [
  { name: 'AT&T', src: '/home/carriers/att.svg', h: 36 },
  { name: 'RingCentral', src: '/home/carriers/ringcentral.svg', h: 36 },
  { name: 'Comcast Business', src: '/home/carriers/comcast.svg', h: 36 },
  { name: 'Nextiva', src: '/home/carriers/nextiva.svg', h: 36 },
  { name: 'Ziply Fiber', src: '/home/carriers/ziply.svg', h: 36 },
  { name: 'Zoom', src: '/home/carriers/zoom.png', h: 36 },
  { name: 'Lumen', src: '/home/carriers/lumen.png', h: 36 },
  { name: 'GoTo', src: '/home/carriers/goto.png', h: 45 },
  { name: 'Spectrum Business', src: '/home/carriers/spectrum.png', h: 36 },
  { name: 'Bigleaf Networks', src: '/home/carriers/bigleaf.png', h: 45 },
  { name: 'Zayo', src: '/home/carriers/zayo.png', h: 45 },
  { name: 'Fatbeam', src: '/home/carriers/fatbeam.png', h: 56 },
  { name: 'Hunter Communications', src: '/home/carriers/hunter.png', h: 36 },
];

export function CarrierBand() {
  return (
    <section
      aria-label="Carriers we shop"
      className="overflow-hidden border-b border-[#e9edf0] bg-[#f6f8f9] pt-[28px] pb-[30px] font-display"
    >
      <p className="mb-[20px] text-center text-[13px] font-extrabold tracking-[.18em] text-[#8a97a3]">
        WE SHOP CARRIERS LIKE
      </p>
      <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
        <ul className="flex w-max animate-[hm-mq_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) =>
            CARRIERS.map((c) => (
              <li
                key={`${copy}-${c.name}`}
                aria-hidden={copy === 1 || undefined}
                className="mx-[16px] grid h-[80px] w-[230px] flex-none place-items-center rounded-[14px] border border-[#e9edf0] bg-white transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(20,32,44,.08)] max-[600px]:mx-[10px] max-[600px]:h-[60px] max-[600px]:w-[160px]"
              >
                {/* Plain <img>: most of these are SVG, which next/image won't optimise. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt={`${c.name} logo`}
                  style={{ maxHeight: c.h }}
                  className="max-w-[165px] max-[600px]:max-w-[115px]"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}

export default CarrierBand;
