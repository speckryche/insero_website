'use client';

import { useState, useMemo } from 'react';
import { trackContactClick } from '@/lib/analytics';
import Link from 'next/link';
import { Phone, ArrowRight, CurrencyDollar, Info } from '@phosphor-icons/react';
import { company } from '@/config/company';

const URGENCY_OPTIONS = [
  { id: 'researching', label: 'Just researching — no rush' },
  { id: 'sixMonths', label: 'Within the next 6 months' },
  { id: 'ninetyDays', label: 'Within 90 days — carrier is forcing the issue' },
  { id: 'rightNow', label: 'Right now — service has been disrupted or rates just spiked' },
] as const;

type UrgencyId = typeof URGENCY_OPTIONS[number]['id'];

const COST_PER_LINE = 35;

function fmt(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

export function PotsCostEstimator() {
  const [lines, setLines] = useState(4);
  const [costPerLine, setCostPerLine] = useState(150);
  const [urgency, setUrgency] = useState<UrgencyId>('researching');

  const result = useMemo(() => {
    const curMonthly = lines * costPerLine;
    const curAnnual = curMonthly * 12;
    const cur3Year = curAnnual + curAnnual * 1.2 + curAnnual * 1.44;

    const replMonthly = lines * COST_PER_LINE;
    const replAnnual = replMonthly * 12;
    const repl3Year = replAnnual * 3;

    const annualSavings = curAnnual - replAnnual;
    const savings3Year = cur3Year - repl3Year;

    const commentary: string[] = [];
    if (costPerLine > 150) {
      commentary.push("You're paying above market for POTS today.");
    } else if (costPerLine < 100) {
      commentary.push("You're paying below market for POTS today — but that won't last as carriers continue raising prices.");
    }
    commentary.push('Replacement pricing tends to stay flat year over year, while POTS pricing has been rising 15–30% annually. The longer you wait, the bigger the gap.');
    if (lines >= 5) {
      commentary.push('At your line count, the savings stack quickly.');
    }

    return { curMonthly, curAnnual, cur3Year, replMonthly, replAnnual, repl3Year, annualSavings, savings3Year, commentary };
  }, [lines, costPerLine]);

  const urgencyCta: Record<UrgencyId, string> = {
    researching: "Want a real quote for your specific situation? We'll pull pricing from compliant replacement options. Free, no commitment.",
    sixMonths: "Pricing is rising fast on POTS lines. Let's get ahead of it before your next carrier price hike.",
    ninetyDays: 'Time to move. We can have replacement options for you within a week.',
    rightNow: "Let's go. We can have replacement options for you within 48 hours.",
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Inputs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-8">
        {/* Line count */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-2 text-lg">How many POTS lines do you currently have?</label>
          <div className="flex items-center gap-4">
            <input type="range" min={1} max={50} value={lines} onChange={e => setLines(Number(e.target.value))} className="flex-grow accent-[#008838] h-2" />
            <input type="number" min={1} max={50} value={lines} onChange={e => setLines(Math.min(50, Math.max(1, Number(e.target.value) || 1)))} className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl text-center font-semibold focus:border-[#008838] focus:outline-none" />
          </div>
        </div>

        {/* Cost per line */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-2 text-lg">What are you currently paying per POTS line per month?</label>
          <p className="text-sm text-[#64748b] mb-3">If you don&apos;t know, $100–$200 is typical in 2026.</p>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-[#1e293b]">$</span>
            <input type="number" min={0} max={500} value={costPerLine} onChange={e => setCostPerLine(Math.min(500, Math.max(0, Number(e.target.value) || 0)))} className="w-28 px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold focus:border-[#008838] focus:outline-none" />
            <span className="text-sm text-[#64748b]">/ line / month</span>
          </div>
        </div>

        {/* Urgency */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-3 text-lg">How urgent is this for you?</label>
          <div className="space-y-2">
            {URGENCY_OPTIONS.map(opt => (
              <label key={opt.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${urgency === opt.id ? 'border-[#008838] bg-[#E6F5EC]' : 'border-gray-200 hover:border-[#008838]/50'}`}>
                <input type="radio" name="urgency" checked={urgency === opt.id} onChange={() => setUrgency(opt.id)} className="w-5 h-5 text-[#008838] focus:ring-[#008838] cursor-pointer" />
                <span className="text-sm text-[#1e293b]">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 space-y-6">

        {/* Section 1: Current cost */}
        <div className="rounded-2xl overflow-hidden border border-red-200 shadow-sm">
          <div className="bg-red-50 px-6 lg:px-8 py-4 border-b border-red-200">
            <div className="flex items-center gap-2">
              <CurrencyDollar weight="fill" className="w-5 h-5 text-red-500" />
              <h3 className="font-display font-bold text-[#1e293b]">What You&apos;re Paying Now</h3>
            </div>
          </div>
          <div className="bg-white px-6 lg:px-8 py-5">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-[#64748b]">Monthly</div>
                <div className="text-2xl font-display font-extrabold text-red-600">{fmt(result.curMonthly)}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748b]">Annual</div>
                <div className="text-2xl font-display font-extrabold text-red-600">{fmt(result.curAnnual)}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748b]">3-Year (20%/yr rises)</div>
                <div className="text-2xl font-display font-extrabold text-red-600">{fmt(result.cur3Year)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Replacement cost */}
        <div className="rounded-2xl overflow-hidden border border-[#008838]/20 shadow-sm">
          <div className="bg-[#008838] px-6 lg:px-8 py-4">
            <h3 className="font-display font-bold text-white">Replacement Cost Estimate</h3>
          </div>
          <div className="bg-white px-6 lg:px-8 py-5">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-sm text-[#64748b]">Monthly</div>
                <div className="text-2xl font-display font-extrabold text-[#008838]">{fmt(result.replMonthly)}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748b]">Annual</div>
                <div className="text-2xl font-display font-extrabold text-[#008838]">{fmt(result.replAnnual)}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748b]">3-Year (flat)</div>
                <div className="text-2xl font-display font-extrabold text-[#008838]">{fmt(result.repl3Year)}</div>
              </div>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed">
              Replacement solutions deliver analog dial tone via VoIP with cellular backup — a single on-premise device that your existing equipment plugs into. Functions like a POTS line.
            </p>
          </div>
        </div>

        {/* Section 3: Savings */}
        <div className="bg-[#E6F5EC] rounded-2xl p-6 lg:p-8">
          <h3 className="font-display font-bold text-[#1e293b] mb-4">Your Savings</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-[#475569]">Annual Savings</div>
              <div className="text-3xl font-display font-extrabold text-[#1e293b]">{result.annualSavings > 0 ? fmt(result.annualSavings) : '$0'}</div>
            </div>
            <div>
              <div className="text-sm text-[#475569]">3-Year Savings</div>
              <div className="text-3xl font-display font-extrabold text-[#008838]">{result.savings3Year > 0 ? fmt(result.savings3Year) : '$0'}</div>
            </div>
          </div>
        </div>

        {/* Section 4: Commentary */}
        <div className="bg-[#f8fafb] rounded-xl border border-gray-200 p-5 space-y-2">
          {result.commentary.map((line, i) => (
            <p key={i} className="text-sm text-[#475569] leading-relaxed">{line}</p>
          ))}
        </div>

        {/* Section 5: Compliance note */}
        <div className="flex gap-3 p-4 bg-[#FFF7ED] border border-[var(--color-accent-cta)]/20 rounded-xl">
          <Info weight="fill" className="w-5 h-5 text-[var(--color-accent-cta)] flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#475569] leading-relaxed">
            If any of your lines support fire alarms, elevator emergency phones, or credit card terminals, those have specific compliance requirements (UL, NFPA, PCI). We make sure replacement equipment meets these requirements as part of the quote.
          </p>
        </div>

        {/* Section 6: CTA */}
        <div className="bg-[#E6F5EC] rounded-2xl p-6 lg:p-8 text-center">
          <p className="text-[#475569] mb-6 max-w-xl mx-auto">{urgencyCta[urgency]}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {urgency === 'rightNow' && (
              <a href={company.phoneLink}
                onClick={() => trackContactClick({ method: 'phone' })}>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#008838] font-semibold rounded-xl border-2 border-[#008838] hover:bg-[#008838] hover:text-white transition-colors">
                  <Phone weight="fill" className="w-5 h-5" />
                  <span>Call {company.phoneFormatted}</span>
                </button>
              </a>
            )}
            <Link href="/contact">
              <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#008838] text-white font-semibold text-lg rounded-xl hover:bg-[#005C28] transition-colors shadow-lg shadow-[#008838]/20">
                <span>Get a Free Quote</span>
                <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[#94a3b8] text-center max-w-xl mx-auto">
          Replacement pricing is a conservative estimate based on Insero&apos;s typical pricing for POTS replacement solutions. Actual quotes may vary based on line counts, hardware needs, and compliance requirements. We&apos;ll provide an exact quote on request.
        </p>
      </div>
    </div>
  );
}
