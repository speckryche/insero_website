'use client';

import { useState } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';
import { DownloadModal } from '@/components/lead-magnets/DownloadModal';

const guides = [
  {
    slug: 'pots-replacement-playbook',
    title: 'The POTS Replacement Playbook',
    description: 'A step-by-step guide for businesses still on copper phone lines. Covers inventory, prioritization, compliance requirements, pricing, and execution — everything you need to plan your POTS migration.',
    category: 'POTS Replacement',
  },
];

export default function GuidesPage() {
  const [openGuide, setOpenGuide] = useState<string | null>(null);
  const currentGuide = guides.find(g => g.slug === openGuide);

  return (
    <>
      <section className="pt-32 lg:pt-40 pb-24 bg-[#f8fafb] min-h-screen">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-[#1e293b] mb-4">
              Free <span className="text-[#008838]">Guides</span>
            </h1>
            <p className="text-lg md:text-xl text-[#475569] max-w-2xl mx-auto">
              Practical guides for business telecom decisions. Free downloads, no fluff.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {guides.map(guide => (
              <button
                key={guide.slug}
                onClick={() => setOpenGuide(guide.slug)}
                className="block w-full text-left bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-8 group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-[#E6F5EC] flex items-center justify-center flex-shrink-0">
                    <DownloadSimple weight="fill" className="w-7 h-7 text-[#008838]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[#008838] uppercase tracking-wider">{guide.category}</span>
                    <h2 className="font-display font-bold text-xl text-[#1e293b] mt-1 mb-2 group-hover:text-[#008838] transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-[#475569] leading-relaxed">{guide.description}</p>
                    <span className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-[#008838]">
                      <DownloadSimple weight="bold" className="w-4 h-4" />
                      Download Free PDF
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {currentGuide && (
        <DownloadModal
          isOpen={!!openGuide}
          onClose={() => setOpenGuide(null)}
          guideSlug={currentGuide.slug}
          guideTitle={currentGuide.title}
          guideDescription={currentGuide.description}
        />
      )}
    </>
  );
}
