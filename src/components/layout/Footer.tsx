'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { trackContactClick } from '@/lib/analytics';
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  Microphone,
  Globe,
  GitBranch,
  ShieldCheck,
  Briefcase,
  ChatCircle,
  BookOpen,
  Wrench,
  DownloadSimple,
  Article,
  ArrowRight
} from '@phosphor-icons/react';
import { company as companyInfo } from '@/config/company';

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

const services = [
  { name: 'Voice Connectivity', href: '/services/voice', icon: Microphone },
  { name: 'Internet Connectivity', href: '/services/internet', icon: Globe },
  { name: 'SD-WAN & Redundancy', href: '/services/sdwan', icon: GitBranch },
  { name: 'Security', href: '/services/security', icon: ShieldCheck },
  // No icon on these two. They navigate to landing pages; the Phone icon they
  // used to carry read as a call control. The row keeps its alignment through
  // the spacer below rather than by borrowing an icon that means something else.
  { name: 'RingCentral', href: '/ringcentral' },
  { name: 'Zoom', href: '/zoom' },
];

const resourceLinks = [
  { name: 'All Resources', href: '/resources', icon: BookOpen },
  { name: 'Free Tools', href: '/tools', icon: Wrench },
  { name: 'Free Guides', href: '/guides', icon: DownloadSimple },
  { name: 'POTS Replacement Options', href: '/resources/pots-line-replacement-options', icon: Article },
  { name: 'Fiber vs Cable for Business', href: '/resources/fiber-vs-cable-business-internet', icon: Article },
  { name: 'How a Telecom Broker Works', href: '/resources/how-a-telecom-broker-works', icon: Article },
];

const companyLinks = [
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Contact', href: '/contact', icon: ChatCircle },
];

export function Footer() {
  const year = useCurrentYear();

  return (
    <footer className="concept-footer bg-[#1a2530] text-white">
      {/* Green accent bar at top */}
      <div className="h-1 bg-gradient-to-r from-[#008838] via-[#1FA855] to-[#008838]" />

      {/* Main Footer Content */}
      <div className="container-custom pt-16 lg:pt-20 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/insero-logo-dark-with-tagline-retina.png"
                alt="Insero"
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-white/60 leading-relaxed mb-8 text-sm">
              Expert cloud and connectivity consulting at zero cost to you. We simplify complexity.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#008838] text-white hover:bg-[#005C28] transition-all"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <span className="text-white/40 text-sm">Follow us on LinkedIn</span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wider mb-6" style={{ color: '#ffffff' }}>
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                    >
                      {Icon ? (
                        <Icon weight="fill" className="w-4 h-4 text-[#1FA855]" />
                      ) : (
                        <span aria-hidden="true" className="w-4 h-4 flex-shrink-0" />
                      )}
                      <span>{service.name}</span>
                      <ArrowRight weight="bold" className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wider mb-6" style={{ color: '#ffffff' }}>
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                    >
                      <Icon weight="fill" className="w-4 h-4 text-[#1FA855] flex-shrink-0" />
                      <span>{item.name}</span>
                      <ArrowRight weight="bold" className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wider mb-6" style={{ color: '#ffffff' }}>
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                    >
                      <Icon weight="fill" className="w-4 h-4 text-[#1FA855]" />
                      <span>{item.name}</span>
                      <ArrowRight weight="bold" className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wider mb-6" style={{ color: '#ffffff' }}>
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={companyInfo.phoneLink}
                onClick={() => trackContactClick({ method: 'phone' })}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                    <Phone weight="fill" className="w-4 h-4 text-[#1FA855]" />
                  </div>
                  <span className="font-semibold">{companyInfo.phoneFormatted}</span>
                </a>
              </li>
              <li>
                <a
                  href={companyInfo.emailLink}
                onClick={() => trackContactClick({ method: 'email' })}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                    <EnvelopeSimple weight="fill" className="w-4 h-4 text-[#1FA855]" />
                  </div>
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/10">
                    <MapPin weight="fill" className="w-4 h-4 text-[#1FA855]" />
                  </div>
                  <span>{companyInfo.location.full}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              &copy; {year} Insero, LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-white/40 hover:text-white/70 text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
