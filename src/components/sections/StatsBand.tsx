'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

/**
 * A headline figure published by a third party.
 *
 * `sourceUrl` is part of the shape rather than optional on purpose: a figure
 * with nowhere to point is a figure nobody can check, and an empty string in
 * the data file is a visible reminder that it still needs sourcing. It is not
 * rendered — the band shows a single attribution line instead of four links —
 * but it keeps provenance next to the value where it can be maintained.
 */
export interface Stat {
  value: string;
  label: string;
  sourceUrl: string;
}

/**
 * Grid per stat count. Written as whole literal class strings because
 * Tailwind's scanner reads source text and cannot resolve an interpolated
 * class name.
 *
 * Four keeps the 2-up mobile layout /ringcentral already had. Three stacks
 * instead, since 2-up would leave an orphan on the second row. Both go
 * horizontal at lg, which is also where the dividers appear.
 */
const GRID_BY_COUNT: Record<number, string> = {
  2: 'grid-cols-1 lg:grid-cols-2',
  3: 'grid-cols-1 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

export function StatsBand({
  stats,
  attribution,
}: {
  stats: Stat[];
  attribution: string;
}) {
  const grid = GRID_BY_COUNT[stats.length] ?? 'grid-cols-1 lg:grid-cols-4';

  return (
    <section className="py-16 lg:py-20 bg-white border-t border-[var(--color-gray-100)]">
      <Container>
        <div className={`grid ${grid}`}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`px-4 py-6 sm:px-8 text-center lg:text-left ${
                index > 0 ? 'lg:border-l lg:border-primary/25' : ''
              }`}
            >
              <div
                className="font-display font-bold text-4xl sm:text-5xl tracking-tight"
                style={{ color: 'var(--color-secondary)' }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-sm sm:text-[15px] text-[var(--color-gray-500)] leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* These are the vendor's own published claims, not Insero's
            measurements — attributed so they don't read as our findings. */}
        <p className="mt-6 px-4 sm:px-8 text-xs text-[var(--color-gray-500)]">{attribution}</p>
      </Container>
    </section>
  );
}

export default StatsBand;
