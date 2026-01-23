import type { Metadata } from 'next';
import { CaseStudiesPageClient } from './CaseStudiesPageClient';

export const metadata: Metadata = {
  title: 'Case Studies - Success Stories from Real Businesses',
  description:
    'See how Insero has helped businesses like yours save money and simplify technology. Real results: 40% cost reduction, 99.9% uptime, and more success stories.',
  keywords: [
    'case studies',
    'success stories',
    'telecom cost reduction',
    'IT consulting results',
    'business testimonials',
    'cloud migration success',
    'connectivity solutions',
  ],
  openGraph: {
    title: 'Case Studies | Insero',
    description:
      'Real results from real businesses. See how we help companies simplify technology and save money.',
    url: 'https://insero.cloud/case-studies',
  },
  alternates: {
    canonical: 'https://insero.cloud/case-studies',
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
