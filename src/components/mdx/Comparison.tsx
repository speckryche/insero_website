'use client';

import { CheckCircle } from '@phosphor-icons/react';

interface ComparisonSide {
  title: string;
  items?: { label: string; value: string }[];
  points?: string[];
}

interface ComparisonProps {
  left: ComparisonSide;
  right: ComparisonSide;
}

export function Comparison({ left, right }: ComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {[left, right].map((side, i) => (
        <div
          key={i}
          className={`rounded-xl p-6 shadow-sm border ${
            i === 0
              ? 'bg-gray-50 border-gray-200'
              : 'bg-[#E6F5EC] border-[#008838]/20'
          }`}
        >
          <h4 className={`font-display text-[#1e293b] mb-4 ${
            i === 0 ? 'font-semibold text-lg' : 'font-bold text-xl'
          }`}>{side.title}</h4>
          {side.points && (
            <ul className="space-y-3">
              {side.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-[#475569]">
                  <CheckCircle
                    weight="fill"
                    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      i === 0 ? 'text-[var(--color-gray-500)]' : 'text-[#008838]'
                    }`}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
          {side.items && (
            <ul className="space-y-3">
              {side.items.map((item, j) => (
                <li key={j} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                  <span className="text-[#64748b]">{item.label}</span>
                  <span className="font-semibold text-[#1e293b]">{item.value}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
