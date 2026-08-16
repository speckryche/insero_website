'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

/**
 * Records a page_view on every App Router navigation.
 *
 * gtag's own automatic page_view only fires when the config command runs,
 * which is once per hard load. Every client-side navigation after that was
 * going unrecorded, so the layout now passes send_page_view: false and hands
 * the job here instead — otherwise the first view of a session would be
 * counted twice.
 */
function PageViewReporter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;
    trackEvent('page_view', {
      page_path,
      page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * useSearchParams opts the whole subtree into client-side rendering unless it
 * sits under a Suspense boundary, which would otherwise force every page in
 * the app to render dynamically.
 */
export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewReporter />
    </Suspense>
  );
}

export default PageViewTracker;
