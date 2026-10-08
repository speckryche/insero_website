import Link from 'next/link';
import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#008838"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SERVICES: { title: string; body: string; href: string; icon: ReactNode }[] = [
  {
    title: 'Internet',
    body: 'Fiber, coax, 5G wireless and satellite. Every option at your address.',
    href: '/services/internet',
    icon: (
      <>
        <path d="M5 12.5a10 10 0 0 1 14 0" />
        <path d="M8.5 16a5 5 0 0 1 7 0" />
        <circle cx="12" cy="19.5" r="1" />
        <path d="M2 9a15 15 0 0 1 20 0" />
      </>
    ),
  },
  {
    title: 'Voice',
    body: 'Hosted PBX, contact center, SIP trunking and POTS replacement.',
    href: '/services/voice',
    icon: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    ),
  },
  {
    title: 'SD-WAN & Redundancy',
    body: "A second connection and smart failover, so one outage doesn't stop you.",
    href: '/services/sdwan',
    icon: (
      <>
        <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
        <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M3 21v-5h5" />
      </>
    ),
  },
  {
    title: 'Data Center Colocation',
    body: 'Space, power and connectivity for your servers in a secure facility.',
    href: '/services',
    icon: (
      <>
        <rect x="4" y="3" width="16" height="7" rx="1.5" />
        <rect x="4" y="14" width="16" height="7" rx="1.5" />
        <path d="M8 6.5h.01M8 17.5h.01" />
      </>
    ),
  },
  {
    title: 'Cybersecurity',
    body: 'Firewalls, managed security and endpoint protection, sized for you.',
    href: '/services/security',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: 'Other Technology',
    body: 'Mobility and more. If your business needs it, ask us.',
    href: '/services',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section className="hm-svc" aria-labelledby="hm-svc-title">
      <Reveal className="hm-wrap">
        <div className="hm-eyebrow">What we find for you</div>
        <h2 id="hm-svc-title">One advisor for all of it.</h2>
        <div className="hm-g4">
          {SERVICES.map((s) => (
            <Link href={s.href} key={s.title}>
              <div className="hm-ic">
                <Icon>{s.icon}</Icon>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="hm-more">See options →</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default ServicesGrid;
