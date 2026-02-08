'use client';

import Link from 'next/link';
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  LinkedinLogo,
  Microphone,
  Globe,
  GitBranch,
  ShieldCheck,
  Briefcase,
  ChatCircle
} from '@phosphor-icons/react';
import { company as companyInfo } from '@/config/company';

const services = [
  { name: 'Voice Connectivity', href: '/services/voice', icon: Microphone },
  { name: 'Internet Connectivity', href: '/services/internet', icon: Globe },
  { name: 'SD-WAN & Redundancy', href: '/services/sdwan', icon: GitBranch },
  { name: 'Security', href: '/services/security', icon: ShieldCheck },
];

const companyLinks = [
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Contact', href: '/contact', icon: ChatCircle },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-secondary)] text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/insero-logo-white.png"
                alt="Insero"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-white/70 leading-relaxed mb-8">
              Expert cloud and connectivity consulting at zero cost to you. We simplify complexity.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-white hover:bg-[var(--color-primary)] transition-all"
                aria-label="LinkedIn"
              >
                <LinkedinLogo weight="fill" className="w-5 h-5" />
              </a>
              <span className="text-white/40 text-sm">Follow us on LinkedIn</span>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-6">
              Services
            </h3>
            <ul className="space-y-4">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                    >
                      <Icon weight="fill" className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-6">
              Company
            </h3>
            <ul className="space-y-4">
              {companyLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                    >
                      <Icon weight="fill" className="w-4 h-4 text-[var(--color-primary)]" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={companyInfo.phoneLink}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Phone weight="fill" className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>{companyInfo.phoneFormatted}</span>
                </a>
              </li>
              <li>
                <a
                  href={companyInfo.emailLink}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <EnvelopeSimple weight="fill" className="w-4 h-4 text-[var(--color-primary)]" />
                  <span>{companyInfo.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin weight="fill" className="w-4 h-4 text-[var(--color-primary)]" />
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
              &copy; {new Date().getFullYear()} Insero. All rights reserved.
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
