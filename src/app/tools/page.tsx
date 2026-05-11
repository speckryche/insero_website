import type { Metadata } from 'next';
import Link from 'next/link';
import { WifiHigh, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Free Business Tools | Insero',
  description:
    'Free tools to help you make better technology decisions. Bandwidth calculators, comparison guides, and more from Insero.',
  alternates: { canonical: 'https://insero.cloud/tools' },
};

const tools = [
  {
    title: 'Bandwidth Calculator',
    description:
      'Figure out how much internet bandwidth your business actually needs based on headcount, usage patterns, and reliability requirements.',
    href: '/tools/bandwidth-calculator',
    icon: WifiHigh,
  },
];

export default function ToolsPage() {
  return (
    <section className="pt-32 lg:pt-40 pb-24 bg-[#f8fafb] min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#1e293b] mb-4">
            Free <span className="text-[#008838]">Tools</span>
          </h1>
          <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
            Quick, free tools to help you make better technology decisions for your business.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-8 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#E6F5EC] flex items-center justify-center flex-shrink-0">
                    <Icon weight="fill" className="w-7 h-7 text-[#008838]" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-display font-bold text-xl text-[#1e293b] mb-2 group-hover:text-[#008838] transition-colors flex items-center gap-2">
                      {tool.title}
                      <ArrowRight weight="bold" className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </h2>
                    <p className="text-[#475569] text-sm leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
