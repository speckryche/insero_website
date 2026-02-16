'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import {
  ArrowDown,
  Play,
  Phone,
  CaretRight
} from '@phosphor-icons/react';

export function HeroImage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero Image Background */}
      <motion.div className="absolute inset-0" style={{ scale: imageScale }}>
        <Image
          src="/Test Image 2.jpg"
          alt="Insero Cloud & Connectivity"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* Multi-layer gradient overlays for text readability on B&W image */}
      <div className="absolute inset-0">
        {/* Base darkening layer — heavier for B&W contrast */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Vertical gradient — strongest at center where text sits */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        {/* Brand color tint — adds warmth to the B&W image */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(51,186,171,0.08) 0%, transparent 50%, rgba(255,107,74,0.06) 100%)',
          }}
        />
        {/* Radial vignette — darkens edges */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.45) 100%)',
          }}
        />
      </div>

      {/* Floating orbs — subtle atmospheric accents over the image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(51, 186, 171, 0.2) 0%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-[5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 74, 0.15) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-[60%] left-[60%] w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 container-custom text-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto px-6 py-12 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)',
          }}
        >
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold text-white mb-6 leading-[1.1] tracking-tight text-balance"
          >
            <span className="whitespace-nowrap" style={{ color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 4px 24px rgba(0,0,0,0.4)' }}>Cloud &amp; Connectivity.</span>{' '}
            <span className="relative">
              <span className="text-gradient">Simplified.</span>
              {/* Decorative underline */}
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute -bottom-2 left-0 w-full h-4"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8C30 4 70 2 100 4C130 6 170 10 198 6"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </motion.svg>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed font-light"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5), 0 2px 16px rgba(0,0,0,0.3)' }}
          >
            Expert guidance at <span className="text-white font-medium">zero cost</span> to you.
            We&apos;re paid by carriers, not clients.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 py-4 bg-[var(--color-accent)] text-white font-semibold text-lg rounded-full shadow-2xl shadow-[var(--color-accent)]/30 hover:shadow-[var(--color-accent)]/50 transition-all duration-300"
              >
                <Phone weight="fill" className="w-5 h-5" />
                <span>Schedule Your Free Consultation</span>
                <CaretRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            <Link href="#how-it-works">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-full border border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <Play weight="fill" className="w-5 h-5" />
                <span>See How It Works</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/70 text-base md:text-lg">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
                <span>Carrier Agnostic</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
                <span>25+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full" />
                <span>No Hidden Costs</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-3 bg-white/40 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[5]" />
    </section>
  );
}

export default HeroImage;
