import Link from 'next/link';
import { ArrowRight, BookOpen, Wrench } from '@phosphor-icons/react/dist/ssr';

const featured = [
  {
    href: '/resources/how-a-telecom-broker-works',
    category: 'How We Work',
    title: 'How a Telecom Broker Actually Works (And Why It’s Free)',
    excerpt:
      'The honest answer to "how do you not charge me?" — plus what brokers do that going direct doesn’t.',
  },
  {
    href: '/resources/pots-line-replacement-options',
    category: 'POTS Replacement',
    title: 'POTS Lines Are Going Away. Here Are Your Replacement Options.',
    excerpt:
      'Copper is being decommissioned and priced off. How to plan the migration for alarms, elevators, fax, and more.',
  },
  {
    href: '/resources/fiber-vs-cable-business-internet',
    category: 'Internet',
    title: 'Fiber vs Cable for Business: An Honest Comparison',
    excerpt:
      'Fiber is usually right — but not always. When cable still wins, and how to find what’s available at your address.',
  },
  {
    href: '/resources/business-internet-buyers-guide',
    category: 'Internet',
    title: 'The Business Internet Buyer’s Guide: What Actually Matters',
    excerpt:
      'Speed isn’t everything. SLA, install timeline, redundancy, contract terms — and the carrier tactics to watch for.',
  },
];

export function ResourcesHighlight() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[#005C28] text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-[#008838]" />
            Learn
            <span className="w-8 h-px bg-[#008838]" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#1e293b] mb-4">
            Expert guides for smarter telecom decisions
          </h2>
          <p className="text-lg text-[#475569]">
            Vendor-neutral advice on voice, internet, SD-WAN, and POTS replacement — written to help you decide, not to sell you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {featured.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="bg-[#f8fafb] rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#008838]/30 transition-all group"
            >
              <span className="text-xs font-semibold text-[#005C28] uppercase tracking-wider">
                {article.category}
              </span>
              <h3 className="font-display font-bold text-[#1e293b] mt-2 mb-2 group-hover:text-[#008838] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{article.excerpt}</p>
              <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#005C28]">
                Read the guide
                <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#008838] text-white font-semibold hover:bg-[#005C28] transition-colors"
          >
            <BookOpen weight="fill" className="w-5 h-5" />
            Browse all resources
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-[#1e293b] font-semibold hover:border-[#008838] hover:text-[#008838] transition-colors"
          >
            <Wrench weight="fill" className="w-5 h-5" />
            Try our free tools
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResourcesHighlight;
