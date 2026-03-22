'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type WaveVariant = 'gentle' | 'scurve' | 'asymmetric';

interface WaveDividerProps {
  topColor: string;
  bottomColor: string;
  variant?: WaveVariant;
  height?: number;
  flip?: boolean;
  label?: string;
}

const wavePaths: Record<WaveVariant, string> = {
  // Single smooth arc — clean and minimal
  gentle:
    'M0,0 L0,50 Q240,95 480,50 T960,55 T1440,45 L1440,0 Z',
  // Flowing S-shape with rhythm
  scurve:
    'M0,0 L0,55 C240,100 360,10 720,55 C1080,100 1200,10 1440,55 L1440,0 Z',
  // Off-center peak — modern, distinctive
  asymmetric:
    'M0,0 L0,25 Q300,100 600,55 Q900,20 1100,40 Q1300,60 1440,35 L1440,0 Z',
};

const variantLabels: Record<WaveVariant, string> = {
  gentle: 'Gentle Curve',
  scurve: 'S-Curve',
  asymmetric: 'Asymmetric',
};

export function WaveDivider({
  topColor,
  bottomColor,
  variant = 'gentle',
  flip = false,
  label,
}: WaveDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '50px' });

  const displayLabel = label;

  return (
    <div
      ref={ref}
      className="relative w-full h-[60px] md:h-[80px] lg:h-[100px] -mt-[1px] select-none pointer-events-none"
      style={{ backgroundColor: bottomColor, zIndex: 10 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full block"
        style={{
          transform: flip ? 'scaleX(-1)' : undefined,
        }}
      >
        <motion.path
          d={wavePaths[variant]}
          fill={topColor}
          initial={{ opacity: 0.6 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>

      {/* Variant label badge for concept review */}
      {displayLabel && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border shadow-lg"
            style={{
              backgroundColor: 'rgba(26, 188, 156, 0.15)',
              borderColor: 'rgba(26, 188, 156, 0.3)',
              color: '#1abc9c',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: '#1abc9c' }}
            />
            {displayLabel}
          </span>
        </div>
      )}
    </div>
  );
}

export default WaveDivider;
