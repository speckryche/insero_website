import { notFound } from 'next/navigation';

/**
 * Internal demo page. Kept in the repo and usable locally, not served in
 * production. Same guard as /style-guide and /icon-preview.
 *
 * VERCEL_ENV is undefined under `next dev`, so this is transparent locally,
 * and it is 'preview' on branch deployments, so those still work for review.
 * Only the production build takes the 404 branch — and because this route is
 * statically prerendered, the guard runs at BUILD time, so production ships a
 * 404 rather than the page's markup.
 *
 * Unlike the other two, the noindex for this route already sits in page.tsx,
 * which is a server component and can declare its own metadata. It stays
 * there: it is what covers dev and preview, where this still renders, and page
 * metadata takes precedence over a layout's anyway. Redundant in production,
 * harmless there.
 *
 * Caveat worth knowing: this makes the URL unreachable, not the code absent.
 * The page is still statically imported, so its JS chunk is still in the
 * bundle. That is fine for a demo page with no secrets in it; do not reach for
 * this pattern to hide something that actually matters.
 */
export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (process.env.VERCEL_ENV === 'production') notFound();
  return <>{children}</>;
}
