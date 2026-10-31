'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { trackContactClick } from '@/lib/analytics';
import { company as companyInfo } from '@/config/company';

/*
 * Site footer, every page (rendered from app/layout.tsx). Layout and styling
 * follow the homepage v3 spec (footer.ft); the links are the ones the footer
 * has always carried.
 */

/**
 * The copyright year, correct without a redeploy.
 *
 * This file is a client component on statically prerendered pages, so a bare
 * `new Date().getFullYear()` bakes the BUILD year into the HTML and serves it
 * until someone ships again — wrong from every January 1st, and a hydration
 * mismatch the moment the two disagree.
 *
 * useSyncExternalStore is the sanctioned way to hold a value that legitimately
 * differs between server and client: React hydrates with the server snapshot,
 * then re-renders with the client one, and treats the difference as expected
 * rather than as a mismatch. Crawlers still get a year in the HTML. Nothing is
 * subscribed because the value cannot change within a session that matters.
 */
const NO_SUBSCRIBE = () => () => {};
const readYear = () => new Date().getFullYear();

function useCurrentYear(): number {
  return useSyncExternalStore(NO_SUBSCRIBE, readYear, readYear);
}

const columns = [
  {
    title: 'Services',
    links: [
      { name: 'Voice Connectivity', href: '/services/voice' },
      { name: 'Internet Connectivity', href: '/services/internet' },
      { name: 'SD-WAN & Redundancy', href: '/services/sdwan' },
      { name: 'Security', href: '/services/security' },
      { name: 'RingCentral', href: '/ringcentral' },
      { name: 'Zoom', href: '/zoom' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'All Resources', href: '/resources' },
      { name: 'Tools', href: '/tools' },
      { name: 'Guides', href: '/guides' },
      { name: 'POTS Replacement Options', href: '/resources/pots-line-replacement-options' },
      { name: 'Fiber vs Cable for Business', href: '/resources/fiber-vs-cable-business-internet' },
      { name: 'How a Telecom Broker Works', href: '/resources/how-a-telecom-broker-works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'Services', href: '/services' },
      // Same target as the header's How It Works.
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Learn', href: '/resources' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  },
];

const heading = 'mb-[16px] text-[13px] font-extrabold! uppercase tracking-[.14em] text-white!';
const link =
  'flex items-center gap-[10px] py-[6px] leading-[1.35] text-[#b8c4ce] no-underline transition-colors duration-200 hover:text-[#5cf774]';
const icon =
  'h-[18px] w-[18px] flex-[0_0_18px] fill-none stroke-green-bright [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]';

export function Footer() {
  const year = useCurrentYear();

  return (
    <footer className="bg-[#111c26] px-[6vw] pt-[clamp(56px,7vw,96px)] font-display text-[15px] font-medium text-[#b8c4ce]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-[1.5fr_1fr_1.15fr_.8fr_1fr] gap-[clamp(24px,3.5vw,56px)] max-[1000px]:grid-cols-2 max-[560px]:grid-cols-1">
        <div className="max-[1000px]:col-span-full">
          <Link href="/" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/insero-logo-dark-with-tagline-retina.webp"
              alt="Insero — Technology. Simplified."
              width={583}
              height={240}
              loading="lazy"
              decoding="async"
              className="-ml-[6px] block h-auto w-[190px] mix-blend-screen"
            />
          </Link>
          <p className="mt-[18px] max-w-[22em] leading-[1.6]">
            Expert cloud and connectivity consulting at zero cost to you. We simplify complexity.
          </p>
          <a
            href={companyInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[20px] inline-flex items-center gap-[10px] font-semibold text-[#b8c4ce] no-underline transition-colors duration-200 hover:text-[#5cf774]"
          >
            <span
              aria-hidden="true"
              className="grid h-[34px] w-[34px] place-items-center rounded-[8px] bg-green-bright text-[15px] font-extrabold text-white"
            >
              in
            </span>
            Follow us on LinkedIn
          </a>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h4 className={heading}>{col.title}</h4>
            {col.links.map((l) => (
              <Link key={l.name} href={l.href} className={link}>
                {l.name}
              </Link>
            ))}
          </nav>
        ))}

        <div>
          <h4 className={heading}>Contact</h4>
          <a href={companyInfo.phoneLink} onClick={() => trackContactClick({ method: 'phone' })} className={link}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
            </svg>
            {companyInfo.phoneFormatted}
          </a>
          <a href={companyInfo.emailLink} onClick={() => trackContactClick({ method: 'email' })} className={link}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
            </svg>
            {companyInfo.email}
          </a>
          <span className={link.replace(' hover:text-[#5cf774]', '')}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {companyInfo.location.full}
          </span>
        </div>
      </div>

      <div className="mx-auto mt-[clamp(40px,5vw,72px)] flex max-w-[1320px] flex-wrap justify-between gap-[16px] border-t border-white/10 pt-[22px] pb-[30px] text-[13px] text-[#8a97a3]">
        <span>&copy; {year} Insero, LLC. All rights reserved.</span>
        <span>
          <Link
            href="/privacy"
            className="ml-[22px] text-[#8a97a3] no-underline hover:text-white max-[560px]:mr-[18px] max-[560px]:ml-0"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="ml-[22px] text-[#8a97a3] no-underline hover:text-white max-[560px]:mr-[18px] max-[560px]:ml-0"
          >
            Terms of Service
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
