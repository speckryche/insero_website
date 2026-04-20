'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  List,
  X,
  CaretDown,
  Phone,
  Microphone,
  Globe,
  GitBranch,
  ShieldCheck
} from '@phosphor-icons/react';

const services = [
  {
    name: 'Voice Connectivity',
    href: '/services/voice',
    description: 'Modern phone systems that scale',
    icon: Microphone,
    color: 'var(--color-voice)'
  },
  {
    name: 'Internet Connectivity',
    href: '/services/internet',
    description: 'Speed and reliability optimized',
    icon: Globe,
    color: 'var(--color-internet)'
  },
  {
    name: 'SD-WAN & Redundancy',
    href: '/services/sdwan',
    description: 'Never lose connection again',
    icon: GitBranch,
    color: 'var(--color-sdwan)'
  },
  {
    name: 'Security',
    href: '/services/security',
    description: 'Protection without complexity',
    icon: ShieldCheck,
    color: 'var(--color-security)'
  },
];

const navLinks = [
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hasDarkHero, setHasDarkHero] = useState(false);
  const [headerCtaColor, setHeaderCtaColor] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect if the page has a dark hero background
  // Re-runs on every route change via pathname dependency
  const checkDarkHero = useCallback(() => {
    const darkHero = document.querySelector('[data-dark-hero="true"]');
    setHasDarkHero(!!darkHero);
    const ctaColor = darkHero?.getAttribute('data-header-cta-color') || null;
    setHeaderCtaColor(ctaColor);
  }, []);

  useEffect(() => {
    // Check immediately
    checkDarkHero();
    // Also check after a short delay to handle async rendering
    const timer = setTimeout(checkDarkHero, 100);
    // Watch for DOM changes in case content renders after mount
    const observer = new MutationObserver(checkDarkHero);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname, checkDarkHero]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1a2530] shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center relative group"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/insero-logo-light-with-tagline-retina.png"
                alt="Insero - light bg"
                className={`h-16 lg:h-[80px] w-auto transition-all duration-300 ${
                  !isScrolled && !hasDarkHero ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/insero-logo-dark-with-tagline-retina.png"
                alt="Insero - dark bg"
                className={`h-16 lg:h-[80px] w-auto absolute left-0 top-0 transition-all duration-300 ${
                  isScrolled || hasDarkHero ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsServicesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`group flex items-center gap-1.5 px-4 py-2 rounded-lg font-extrabold text-[20px] transition-all duration-300 ${
                    isScrolled
                      ? 'text-white hover:text-[#1FA855]'
                      : hasDarkHero
                        ? 'text-white/90 hover:text-white'
                        : 'text-[#1e293b] hover:text-[#008838]'
                  }`}
                >
                  <span className="relative">
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-current transition-all duration-300 ${
                      link.hasDropdown && isServicesOpen ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </span>
                  {link.hasDropdown && (
                    <CaretDown
                      weight="bold"
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Services Mega Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] p-2 bg-white rounded-2xl shadow-2xl border border-gray-100"
                      >
                        {/* Decorative top border */}
                        <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-primary)] rounded-full -translate-y-0.5" />

                        <div className="grid gap-1 pt-2">
                          {services.map((service, index) => {
                            const Icon = service.icon;
                            return (
                              <motion.div
                                key={service.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  href={service.href}
                                  className="group/item flex items-start gap-4 p-3 rounded-xl hover:bg-[var(--color-gray-50)] transition-all duration-200"
                                >
                                  <div
                                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover/item:scale-110"
                                    style={{
                                      backgroundColor: `${service.color}15`,
                                      color: service.color
                                    }}
                                  >
                                    <Icon weight="fill" className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[var(--color-secondary)] group-hover/item:text-[var(--color-primary)] transition-colors">
                                      {service.name}
                                    </div>
                                    <div className="text-sm text-[var(--color-gray-500)]">
                                      {service.description}
                                    </div>
                                  </div>
                                </Link>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* View all services link */}
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <Link
                            href="/services"
                            className="flex items-center justify-center gap-2 py-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                          >
                            View All Services
                            <CaretDown weight="bold" className="w-3 h-3 -rotate-90" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link href="/contact" className="ml-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-[16px] transition-all duration-300 text-white shadow-lg"
                style={{
                  backgroundColor: headerCtaColor || '#008838',
                  boxShadow: `0 10px 15px -3px ${headerCtaColor || '#008838'}40`,
                }}
              >
                <Phone weight="fill" className="w-4 h-4" />
                <span>Schedule a Call</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`lg:hidden p-2.5 rounded-xl transition-colors duration-300 ${
              isScrolled
                ? 'text-white hover:bg-white/10'
                : hasDarkHero
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#1e293b] hover:bg-gray-100'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X weight="bold" className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <List weight="bold" className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute top-full left-0 right-0 lg:hidden bg-white shadow-2xl border-t border-gray-100 overflow-hidden"
            >
              <div className="container-custom py-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-lg font-semibold text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-gray-50)] rounded-xl transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <div className="ml-4 mt-1 space-y-1">
                        {services.map((service, serviceIndex) => {
                          const Icon = service.icon;
                          return (
                            <motion.div
                              key={service.name}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (index * 0.1) + (serviceIndex * 0.05) }}
                            >
                              <Link
                                href={service.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-[var(--color-gray-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-gray-50)] rounded-lg transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <Icon
                                  weight="fill"
                                  className="w-5 h-5"
                                  style={{ color: service.color }}
                                />
                                <span>{service.name}</span>
                              </Link>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-[var(--color-accent)] text-white font-semibold rounded-xl shadow-lg shadow-[var(--color-accent)]/25"
                  >
                    <Phone weight="fill" className="w-5 h-5" />
                    <span>Schedule a Call</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
