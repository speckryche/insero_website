'use client';

import { useState } from 'react';
import { DownloadSimple } from '@phosphor-icons/react';
import { DownloadModal } from './DownloadModal';

export function FieldGuidePromo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-[#f8fafb] rounded-2xl border border-gray-200 p-6 lg:p-8 text-center">
        <h3 className="font-display font-bold text-xl text-[#1e293b] mb-2">Want the full field guide?</h3>
        <p className="text-sm text-[#475569] mb-5 max-w-md mx-auto">
          Get our step-by-step POTS Replacement Field Guide — inventory templates, compliance checklists, and pricing guides in one PDF.
        </p>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#008838] text-white font-semibold rounded-xl hover:bg-[#005C28] transition-colors"
        >
          <DownloadSimple weight="bold" className="w-5 h-5" />
          Download Free Field Guide
        </button>
      </div>

      <DownloadModal
        isOpen={open}
        onClose={() => setOpen(false)}
        guideSlug="pots-replacement-field-guide"
        guideTitle="The POTS Replacement Field Guide"
        guideDescription="A step-by-step guide for replacing your POTS lines — inventory, compliance, pricing, and execution."
      />
    </>
  );
}
