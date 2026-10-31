import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Practical guides for business telecom decisions. No-cost downloads, no fluff.',
  alternates: { canonical: 'https://insero.cloud/guides' },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
