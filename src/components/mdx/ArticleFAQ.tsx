'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export function ArticleFAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="my-8 border border-gray-200 rounded-xl overflow-hidden">
      {items.map((item, index) => (
        <div key={index} className={index > 0 ? 'border-t border-gray-200' : ''}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-[#1e293b] text-sm pr-4">{item.q}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#64748b] flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === index && (
            <div className="px-5 pb-5 text-[#475569] text-sm leading-relaxed">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
