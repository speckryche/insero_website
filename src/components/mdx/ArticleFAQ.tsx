'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

/**
 * One-at-a-time FAQ accordion.
 *
 * Every answer is in the markup at all times and collapsed with the `hidden`
 * attribute — it is never conditionally mounted. This used to render
 * `{openIndex === index && <div>{item.a}</div>}`, which meant no answer text
 * existed in the prerendered HTML of any page using the component: the
 * questions were indexable and the answers were not. On the carrier pages the
 * FAQPage JSON-LD carried the answers, so rich results still worked, but the
 * seven MDX articles have no JSON-LD and were publishing their FAQ copy to
 * nobody. Same reasoning, and the same fix, as the pricing TabPanel on those
 * pages, which keeps all four panels mounted for exactly this reason.
 *
 * `hidden` rather than a visually-hidden class on purpose: it takes the panel
 * out of the accessibility tree and out of the tab order, so a collapsed
 * answer is not announced by a screen reader and its links cannot be reached
 * by keyboard. Visually-hidden CSS would leave both reachable, which is worse
 * than the bug this replaces.
 *
 * useId keeps the button/panel wiring unique when a page renders more than one
 * of these, or renders one alongside another accordion.
 */
export function ArticleFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden">
      {items.map((item, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <div key={index} className={index > 0 ? 'border-t border-gray-200' : ''}>
            <button
              type="button"
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-display font-semibold text-[#1e293b] text-sm pr-4">{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#64748b] flex-shrink-0 transition-transform duration-200 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!open}
              className="px-5 pb-5 text-[#475569] text-sm leading-relaxed"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
