'use client';

import { useState } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';
import { DownloadModal } from '@/components/lead-magnets/DownloadModal';

const GUIDES: Record<string, { title: string; description: string }> = {
  'pots-replacement-field-guide': {
    title: 'The POTS Replacement Field Guide',
    description: 'A step-by-step guide covering inventory, prioritization, compliance, pricing, and execution for replacing your POTS lines.',
  },
};

export function GuideDownload({ guide }: { guide: string }) {
  const [open, setOpen] = useState(false);
  const meta = GUIDES[guide];
  if (!meta) return null;

  return (
    <>
      <div className="bg-[#E6F5EC] rounded-2xl p-6 my-8 border border-[#008838]/15">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#008838] rounded-xl flex items-center justify-center flex-shrink-0">
            <DownloadSimple weight="bold" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-display font-bold text-[#1e293b] text-lg mb-1">Want this as a downloadable field guide?</h4>
            <p className="text-sm text-[#475569] mb-3">Get the full POTS Replacement Field Guide as a PDF — inventory templates, compliance checklists, and pricing guides included.</p>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#008838] text-white font-semibold text-sm rounded-xl hover:bg-[#005C28] transition-colors"
            >
              <DownloadSimple weight="bold" className="w-4 h-4" />
              Download Free Field Guide
            </button>
          </div>
        </div>
      </div>

      <DownloadModal
        isOpen={open}
        onClose={() => setOpen(false)}
        guideSlug={guide}
        guideTitle={meta.title}
        guideDescription={meta.description}
      />
    </>
  );
}
