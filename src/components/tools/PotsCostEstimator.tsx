'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, ShieldCheck, CurrencyDollar, Calculator } from '@phosphor-icons/react';
import { company } from '@/config/company';

const LINE_USES = [
  { id: 'fireAlarm', label: 'Fire alarm panel monitoring', path: 'A' as const },
  { id: 'elevator', label: 'Elevator emergency phone', path: 'A' as const },
  { id: 'burglarAlarm', label: 'Burglar alarm', path: 'B' as const },
  { id: 'fax', label: 'Fax machine', path: 'B' as const },
  { id: 'paging', label: 'Paging or intercom system', path: 'B' as const },
  { id: 'backOfHouse', label: 'Back-of-house phone (kitchen, warehouse, lobby)', path: 'B' as const },
  { id: 'creditCard', label: 'Credit card terminal or POS gear', path: 'B' as const },
  { id: 'modem', label: 'Modem or dial-out backup', path: 'B' as const },
  { id: 'deskPhones', label: 'Desk phones for a small office', path: 'C' as const },
  { id: 'other', label: "Other / I'm not sure", path: 'B' as const },
];

const REGIONS = ['West Coast', 'Mountain / Southwest', 'Midwest', 'South / Southeast', 'Northeast', 'Multi-region'];

const URGENCY_OPTIONS = [
  { id: 'researching', label: 'Just researching — no rush' },
  { id: 'sixMonths', label: 'Within the next 6 months' },
  { id: 'ninetyDays', label: 'Within 90 days — carrier is forcing the issue' },
  { id: 'rightNow', label: 'Right now — service has been disrupted or rates just spiked' },
] as const;

type UrgencyId = typeof URGENCY_OPTIONS[number]['id'];

const COST_PER_LINE = 35;

function formatDollars(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

export function PotsCostEstimator() {
  const [lines, setLines] = useState(4);
  const [selectedUses, setSelectedUses] = useState<Set<string>>(new Set());
  const [monthlyCostPerLine, setMonthlyCostPerLine] = useState(150);
  const [region, setRegion] = useState('West Coast');
  const [urgency, setUrgency] = useState<UrgencyId>('researching');

  const toggleUse = (id: string) => {
    const next = new Set(selectedUses);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedUses(next);
  };

  const result = useMemo(() => {
    // Current costs
    const currentMonthly = lines * monthlyCostPerLine;
    const currentAnnual = currentMonthly * 12;
    const pots3Year = currentAnnual + currentAnnual * 1.2 + currentAnnual * 1.44;

    // Replacement costs — flat $35/line
    const replMonthly = lines * COST_PER_LINE;
    const replAnnual = replMonthly * 12;
    const repl3Year = replAnnual * 3;

    const annualSavings = currentAnnual - replAnnual;
    const savings3Year = pots3Year - repl3Year;

    // Classify lines into paths
    const selectedItems = LINE_USES.filter(u => selectedUses.has(u.id));
    const hasFireAlarm = selectedUses.has('fireAlarm');
    const hasElevator = selectedUses.has('elevator');
    const hasDeskPhones = selectedUses.has('deskPhones');
    const hasCreditCard = selectedUses.has('creditCard');
    const pathBItems = selectedItems.filter(u => u.path === 'B');

    // Estimate line allocation per path
    const pathALineCount = (hasFireAlarm ? Math.max(1, Math.ceil(lines * 0.2)) : 0) +
      (hasElevator ? Math.max(1, Math.ceil(lines * 0.1)) : 0);
    const deskPhoneLines = hasDeskPhones ? Math.max(3, Math.ceil(lines * 0.4)) : 0;
    const pathBLineCount = Math.max(0, lines - pathALineCount - deskPhoneLines);

    interface PathResult {
      name: string;
      covers: string;
      monthlyTotal: number;
      annualTotal: number;
      description: string;
      tradeoff: string;
      lineCount: number;
    }

    const paths: PathResult[] = [];

    if (pathALineCount > 0) {
      const coverItems: string[] = [];
      if (hasFireAlarm) coverItems.push(`${Math.max(1, Math.ceil(lines * 0.2))} fire alarm line${Math.ceil(lines * 0.2) > 1 ? 's' : ''}`);
      if (hasElevator) coverItems.push(`${Math.max(1, Math.ceil(lines * 0.1))} elevator line${Math.ceil(lines * 0.1) > 1 ? 's' : ''}`);
      paths.push({
        name: 'Wireless POTS Replacement',
        covers: `Covers: ${coverItems.join(', ')}`,
        monthlyTotal: pathALineCount * COST_PER_LINE,
        annualTotal: pathALineCount * COST_PER_LINE * 12,
        description: 'Cellular-based analog dial tone replacement. Device plugs in where the old POTS line was.',
        tradeoff: 'Carrier-grade reliability, works during internet outages. UL-listed options available for fire alarm circuits.',
        lineCount: pathALineCount,
      });
    }

    if (pathBLineCount > 0 && pathBItems.length > 0) {
      const coverLabels = pathBItems.map(u => u.label.toLowerCase());
      paths.push({
        name: 'VoIP with ATA',
        covers: `Covers: ${pathBLineCount} line${pathBLineCount > 1 ? 's' : ''} (${coverLabels.slice(0, 3).join(', ')}${coverLabels.length > 3 ? '...' : ''})`,
        monthlyTotal: pathBLineCount * COST_PER_LINE,
        annualTotal: pathBLineCount * COST_PER_LINE * 12,
        description: 'Internet-delivered voice converted to analog dial tone. Equipment plugs in the same way.',
        tradeoff: 'Cheapest traditional replacement path. Internet-dependent — not suitable for fire alarm circuits.',
        lineCount: pathBLineCount,
      });
    }

    if (deskPhoneLines >= 3) {
      paths.push({
        name: 'UCaaS Migration',
        covers: `Covers: ${deskPhoneLines} desk phone user${deskPhoneLines > 1 ? 's' : ''}`,
        monthlyTotal: deskPhoneLines * COST_PER_LINE,
        annualTotal: deskPhoneLines * COST_PER_LINE * 12,
        description: 'Full cloud phone system replacement. Calling, video, chat, mobile apps — all included.',
        tradeoff: "Best value at scale. Replaces desk phones entirely with modern cloud system. Doesn't cover alarm or elevator lines.",
        lineCount: deskPhoneLines,
      });
    }

    // Commentary
    const commentary: string[] = [];
    if (monthlyCostPerLine > 200) {
      commentary.push(`At ${formatDollars(monthlyCostPerLine)}/line, you're paying well above the national average. Most businesses at this rate save significantly by migrating.`);
    } else if (monthlyCostPerLine > 120) {
      commentary.push(`At ${formatDollars(monthlyCostPerLine)}/line, you're in the typical range for 2026 POTS pricing — but that rate is climbing fast.`);
    } else {
      commentary.push(`At ${formatDollars(monthlyCostPerLine)}/line, you're below the current national average — but POTS pricing rises 15–30% per year. This won't stay low.`);
    }

    if (annualSavings > 0) {
      commentary.push(`Estimated annual savings after migration: ${formatDollars(annualSavings)}. Over 3 years with rising POTS costs: ${formatDollars(savings3Year)}.`);
    }

    if (hasFireAlarm || hasElevator) {
      commentary.push('⚠️ Fire alarm and elevator lines have specific UL and NFPA compliance requirements — replacement must use certified equipment.');
    }
    if (hasCreditCard) {
      commentary.push('⚠️ Credit card terminals may have specific PCI requirements that influence replacement choice.');
    }

    return { currentMonthly, currentAnnual, pots3Year, replMonthly, replAnnual, repl3Year, annualSavings, savings3Year, paths, commentary };
  }, [lines, selectedUses, monthlyCostPerLine]);

  const urgencyCta = {
    researching: "Want a real quote for your specific lines? We'll pull pricing from compliant replacement options across multiple providers. Free, no commitment.",
    sixMonths: "Pricing is rising fast on POTS lines. Let's get ahead of it before your next carrier price hike.",
    ninetyDays: 'Time to move. We can have replacement options for you within a week.',
    rightNow: "Let's go. Call or contact us today — we can have replacement options for you within 48 hours.",
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

        {/* Line uses */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-3 text-lg">What are these lines being used for?</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LINE_USES.map(use => (
              <label key={use.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${selectedUses.has(use.id) ? 'border-[#008838] bg-[#E6F5EC]' : 'border-gray-200 hover:border-[#008838]/50'}`}>
                <input type="checkbox" checked={selectedUses.has(use.id)} onChange={() => toggleUse(use.id)} className="w-5 h-5 rounded border-gray-300 text-[#008838] focus:ring-[#008838] cursor-pointer" />
                <span className="text-sm text-[#1e293b]">{use.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Monthly cost per line */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-2 text-lg">What are you currently paying per POTS line per month?</label>
          <p className="text-sm text-[#64748b] mb-3">If you don&apos;t know, $100–$200 is typical in 2026.</p>
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-[#1e293b]">$</span>
            <input type="number" min={0} max={500} value={monthlyCostPerLine} onChange={e => setMonthlyCostPerLine(Math.min(500, Math.max(0, Number(e.target.value) || 0)))} className="w-28 px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold focus:border-[#008838] focus:outline-none" />
            <span className="text-sm text-[#64748b]">/ line / month</span>
          </div>
        </div>

        {/* Region */}
        <div>
          <label className="block font-display font-bold text-[#1e293b] mb-3">Where is your business located?</label>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map(r => (
              <button key={r} onClick={() => setRegion(r)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${region === r ? 'bg-[#008838] text-white' : 'bg-white text-[#475569] border border-gray-200 hover:border-[#008838]'}`}>
                {r}
              </button>
            ))}
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
                <div className="text-2xl font-display font-extrabold text-red-600">{formatDollars(result.currentMonthly)}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748b]">Annual</div>
                <div className="text-2xl font-display font-extrabold text-red-600">{formatDollars(result.currentAnnual)}</div>
              </div>
              <div>
                <div className="text-sm text-[#64748b]">3-Year (20%/yr rises)</div>
                <div className="text-2xl font-display font-extrabold text-red-600">{formatDollars(result.pots3Year)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Replacement options */}
        {result.paths.length > 0 ? (
          <div className="rounded-2xl overflow-hidden border border-[#008838]/20 shadow-sm">
            <div className="bg-[#008838] px-6 lg:px-8 py-4">
              <div className="flex items-center gap-2">
                <ShieldCheck weight="fill" className="w-5 h-5 text-white" />
                <h3 className="font-display font-bold text-white">Replacement Options</h3>
              </div>
            </div>
            <div className="bg-white divide-y divide-gray-100">
              {result.paths.map((path, i) => (
                <div key={i} className="px-6 lg:px-8 py-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-display font-bold text-[#1e293b]">{path.name}</h4>
                      <p className="text-xs text-[#008838] font-semibold">{path.covers}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xl font-display font-extrabold text-[#008838]">{formatDollars(path.monthlyTotal)}<span className="text-sm font-normal text-[#64748b]">/mo</span></div>
                      <div className="text-xs text-[#64748b]">Annual: {formatDollars(path.annualTotal)}</div>
                    </div>
                  </div>
                  <p className="text-sm text-[#475569] mb-1">{path.description}</p>
                  <p className="text-xs text-[#64748b] italic">{path.tradeoff}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-[#f8fafb] rounded-2xl border border-gray-200 p-8 text-center">
            <Calculator weight="fill" className="w-10 h-10 text-[#94a3b8] mx-auto mb-3" />
            <p className="text-[#64748b]">Select what your POTS lines are used for to see replacement options.</p>
          </div>
        )}

        {/* Section 3: Total replacement cost */}
        {result.paths.length > 0 && (
          <div className="bg-[#E6F5EC] rounded-2xl p-6 lg:p-8">
            <h3 className="font-display font-bold text-[#1e293b] mb-4">Total After Migration</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-[#475569]">Monthly</div>
                <div className="text-2xl font-display font-extrabold text-[#008838]">{formatDollars(result.replMonthly)}</div>
              </div>
              <div>
                <div className="text-sm text-[#475569]">Annual</div>
                <div className="text-2xl font-display font-extrabold text-[#008838]">{formatDollars(result.replAnnual)}</div>
              </div>
              <div>
                <div className="text-sm text-[#475569]">Annual Savings</div>
                <div className="text-2xl font-display font-extrabold text-[#1e293b]">{result.annualSavings > 0 ? formatDollars(result.annualSavings) : '$0'}</div>
              </div>
              <div>
                <div className="text-sm text-[#475569]">3-Year Savings</div>
                <div className="text-2xl font-display font-extrabold text-[#1e293b]">{result.savings3Year > 0 ? formatDollars(result.savings3Year) : '$0'}</div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Commentary */}
        {result.commentary.length > 0 && selectedUses.size > 0 && (
          <div className="bg-[#f8fafb] rounded-xl border border-gray-200 p-5 space-y-2">
            {result.commentary.map((line, i) => (
              <p key={i} className={`text-sm leading-relaxed ${line.startsWith('⚠️') ? 'text-[#F97316] font-semibold' : 'text-[#475569]'}`}>
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Section 5: CTA */}
        <div className="bg-[#E6F5EC] rounded-2xl p-6 lg:p-8 text-center">
          <p className="text-[#475569] mb-6 max-w-xl mx-auto">{urgencyCta[urgency]}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {urgency === 'rightNow' && (
              <a href={company.phoneLink}>
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
          Replacement pricing is a conservative estimate based on Insero&apos;s typical pricing for POTS replacement solutions. Actual quotes may vary based on line counts, location, and specific compliance requirements. We&apos;ll provide an exact quote on request.
        </p>
      </div>
    </div>
  );
}
