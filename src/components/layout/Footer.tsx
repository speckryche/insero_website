'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  EnvelopeSimple,
  MapPin,
  LinkedinLogo,
  ArrowRight,
  Microphone,
  Globe,
  GitBranch,
  ShieldCheck
} from '@phosphor-icons/react';

const services = [
  { name: 'Voice Connectivity', href: '/services/voice', icon: Microphone },
  { name: 'Internet Connectivity', href: '/services/internet', icon: Globe },
  { name: 'SD-WAN & Redundancy', href: '/services/sdwan', icon: GitBranch },
  { name: 'Security', href: '/services/security', icon: ShieldCheck },
];

const company = [
  { name: 'Services', href: '/services' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Contact', href: '/contact' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const }
  }
};

export function Footer() {
  return (
    <footer className="relative bg-[var(--color-secondary)] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <motion.div
          className="container-custom py-16 lg:py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <motion.div className="lg:col-span-4" variants={itemVariants}>
              <Link href="/" className="inline-block mb-6 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/insero-logo-white.png"
                  alt="Insero"
                  className="h-16 lg:h-20 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-sm">
                Expert cloud and connectivity consulting at zero cost to you. We simplify complexity.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <a
                  href="tel:+1234567890"
                  className="group flex items-center gap-3 text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <Phone weight="fill" className="w-5 h-5" />
                  </div>
                  <span className="font-medium">(123) 456-7890</span>
                </a>
                <a
                  href="mailto:info@insero.com"
                  className="group flex items-center gap-3 text-white/70 hover:text-[var(--color-primary)] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                    <EnvelopeSimple weight="fill" className="w-5 h-5" />
                  </div>
                  <span className="font-medium">info@insero.com</span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <MapPin weight="fill" className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Your City, State</span>
                </div>
              </div>
            </motion.div>

            {/* Services Column */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-6">
                Services
              </h3>
              <ul className="space-y-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <li key={service.name}>
                      <Link
                        href={service.href}
                        className="group flex items-center gap-3 text-white/70 hover:text-[var(--color-primary)] transition-colors"
                      >
                        <Icon weight="fill" className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <span>{service.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div className="lg:col-span-2" variants={itemVariants}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-6">
                Company
              </h3>
              <ul className="space-y-3">
                {company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-white/70 hover:text-[var(--color-primary)] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Column */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold mb-3">Ready to Simplify?</h3>
                <p className="text-white/70 mb-6">
                  Schedule a free consultation call. No pressure, no cost.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-xl hover:bg-[var(--color-accent-dark)] transition-all shadow-lg shadow-[var(--color-accent)]/25"
                >
                  <span>Schedule a Call</span>
                  <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-[var(--color-primary)] hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinLogo weight="fill" className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                &copy; {new Date().getFullYear()} Insero. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="#"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-white/40 hover:text-white/70 text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
