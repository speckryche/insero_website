'use client';

import Link from 'next/link';
import {
  Phone,
  EnvelopeSimple,
  MapPin,
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
                href={companyInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-white hover:bg-[var(--color-primary)] transition-all"
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
