/**
 * GA4 event helpers.
 *
 * Analytics is loaded as raw gtag.js from src/app/layout.tsx, gated on
 * NEXT_PUBLIC_GA_ID. When that variable is unset — which is the case in local
 * development, since the repo ships no .env — the script block never renders
 * and `window.gtag` does not exist. Every function here therefore no-ops
 * rather than throwing: analytics must never be able to break a form
 * submission.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      targetOrName: string | Date,
      params?: Record<string, unknown>,
    ) => void;
    dataLayer?: unknown[];
  }
}

/** Fire a GA4 event. Silently does nothing if gtag is not loaded. */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

/**
 * A lead was captured and persisted.
 *
 * Only call this once a server action has come back with a `ref`. A bare
 * `success: true` also covers spam that was deliberately answered with success
 * and runs where Supabase was unconfigured, and neither created a lead.
 */
export function trackLead(params: {
  form_name: string;
  lead_source?: string;
  page_path?: string;
}): void {
  trackEvent('generate_lead', params);
}

/** A gated asset was released to a visitor. */
export function trackDownload(params: { file_name: string; page_path?: string }): void {
  trackEvent('file_download', params);
}

/**
 * A visitor acted on a phone or email link.
 *
 * page_path defaults to the current location. These links are spread across
 * seven components, and reading it here at click time avoids threading
 * usePathname through all of them for a value the browser already has.
 */
export function trackContactClick(params: {
  method: 'phone' | 'email';
  page_path?: string;
}): void {
  const page_path =
    params.page_path ?? (typeof window !== 'undefined' ? window.location.pathname : undefined);
  trackEvent('contact_click', { ...params, page_path });
}
