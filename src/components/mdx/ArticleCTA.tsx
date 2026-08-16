'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';

export function ArticleCTA() {
  return (
    <div className="bg-[#E6F5EC] rounded-2xl p-8 my-8 text-center">
      <h3 className="font-display font-bold text-xl text-[#1e293b] mb-2">
        Want expert help with this?
      </h3>
      <p className="text-[#475569] mb-5 text-sm">
        Tell us about your setup — we&apos;ll review it and come back with the best options. Email or phone, your choice.
      </p>
      <Link href="/contact">
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#008838] text-white font-semibold rounded-xl hover:bg-[#005C28] transition-colors shadow-md shadow-[#008838]/20">
          <span>Get Started</span>
          <ArrowRight weight="bold" className="w-4 h-4" />
        </button>
      </Link>
    </div>
  );
}
