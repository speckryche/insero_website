'use client';

import { CheckCircle } from '@phosphor-icons/react';

interface ComparisonSide {
  title: string;
  items?: { label: string; value: string }[];
  points?: string[];
}

interface ComparisonProps {
  left: ComparisonSide | string;
  right: ComparisonSide | string;
}

function parseSide(side: ComparisonSide | string): ComparisonSide | null {
  if (!side) return null;
  if (typeof side === 'string') {
    try { return JSON.parse(side); } catch { return null; }
  }
  return side;
}

export function Comparison({ left, right }: ComparisonProps) {
  const l = parseSide(left);
  const r = parseSide(right);
  if (!l || !r) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      {[l, r].map((side, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h4 className="font-display font-bold text-[#1e293b] mb-4 text-lg">{side.title}</h4>
          {side.points ? (
            <ul className="space-y-3">
              {side.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-[#475569]">
                  <CheckCircle weight="fill" className="w-4 h-4 text-[#008838] flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : side.items ? (
            <ul className="space-y-3">
              {side.items.map((item, j) => (
                <li key={j} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                  <span className="text-[#64748b]">{item.label}</span>
                  <span className="font-semibold text-[#1e293b]">{item.value}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}
