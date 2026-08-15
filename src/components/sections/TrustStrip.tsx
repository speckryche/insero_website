import { Container } from '@/components/ui/Container';

/**
 * A single line of reassurance, sat between the stats band and the pricing
 * section on the carrier pages.
 *
 * It exists because the "no cost to you" fact was buried mid-sentence in the
 * hero subhead, where a visitor scrolling to the rates never saw it. The
 * objection it answers — that a broker must cost more than going direct —
 * forms at exactly this point on the page, the moment before someone reads a
 * price. So it is placed there and given its own band rather than another card.
 *
 * Deliberately one line, no card, no icon: at this position it has to be read
 * in passing, on the way to the pricing, and anything with more furniture
 * becomes a thing to scroll past instead.
 *
 * primary-100 rather than the section TINT below it — one step deeper, so it
 * separates the white stats band from the tinted pricing section instead of
 * merging into either. secondary on primary-100 measures 11.76:1, well clear
 * of AA.
 *
 * Shared rather than written twice so the two carrier pages cannot drift into
 * making this promise with different emphasis.
 */
export function TrustStrip({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-5 lg:py-6" style={{ backgroundColor: 'var(--color-primary-100)' }}>
      <Container>
        <p
          className="text-center text-[15px] sm:text-base lg:text-lg font-semibold leading-snug"
          style={{ color: 'var(--color-secondary)' }}
        >
          {children}
        </p>
      </Container>
    </section>
  );
}

export default TrustStrip;
