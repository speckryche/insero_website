import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Internal reference page. Kept in the repo and usable locally, not served in
 * production.
 *
 * VERCEL_ENV is undefined under `next dev`, so this is transparent locally,
 * and it is 'preview' on branch deployments, so those still work for review.
 * Only the production build takes the 404 branch — and because this route is
 * statically prerendered, the guard runs at BUILD time, so production ships a
 * 404 rather than the page's markup.
 *
 * The noindex metadata below stays: it is what covers dev and preview, where
 * this still renders. It is redundant in production, and harmless there.
 *
 * Caveat worth knowing: this makes the URL unreachable, not the code absent.
 * The component is still statically imported, so its JS chunk is still in the
 * bundle. That is fine for a style guide with no secrets in it; do not reach
 * for this pattern to hide something that actually matters.
 */
export default function StyleGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.VERCEL_ENV === 'production') notFound();
  return <>{children}</>;
}
