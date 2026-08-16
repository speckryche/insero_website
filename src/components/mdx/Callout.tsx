'use client';

import { Info, Lightbulb, Warning } from '@phosphor-icons/react';

const styles = {
  tip: { bg: 'bg-[#E6F5EC]', border: 'border-[#008838]', icon: Lightbulb, iconColor: 'text-[#008838]' },
  warning: { bg: 'bg-orange-50', border: 'border-[var(--color-accent-cta)]', icon: Warning, iconColor: 'text-[var(--color-accent-cta)]' },
  note: { bg: 'bg-blue-50', border: 'border-[#3b82f6]', icon: Info, iconColor: 'text-[#3b82f6]' },
};

export function Callout({ type = 'note', children }: { type?: 'tip' | 'warning' | 'note'; children: React.ReactNode }) {
  const s = styles[type];
  const Icon = s.icon;
  return (
    <div className={`${s.bg} border-l-4 ${s.border} rounded-r-xl p-5 my-6`}>
      <div className="flex gap-3">
        <Icon weight="fill" className={`w-5 h-5 ${s.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="text-[#1e293b] text-sm leading-relaxed [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}
