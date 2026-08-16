import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Telecom Guides',
  description: 'Practical guides for business telecom decisions. Free downloads, no fluff.',
  alternates: { canonical: 'https://insero.cloud/guides' },
};

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
