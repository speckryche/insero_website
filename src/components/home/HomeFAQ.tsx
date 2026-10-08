import { Reveal } from './Reveal';

export type FAQItem = { question: string; answer: string };

/**
 * Centered FAQ. The items come from page.tsx, which also builds the FAQPage
 * JSON-LD from the same array, so the schema always matches the screen.
 */
export function HomeFAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="hm-faq" aria-labelledby="hm-faq-title">
      <Reveal className="hm-wrap">
        <div className="hm-eyebrow">Straight answers</div>
        <h2 id="hm-faq-title">Questions we hear a lot</h2>
        <div className="hm-list">
          {items.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default HomeFAQ;
