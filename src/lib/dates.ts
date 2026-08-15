const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * "2026-08-05" -> "August 5, 2026".
 *
 * The data files store ISO dates because that is the sane format to compare
 * and sort; the pages were printing them straight into prose, where a customer
 * reading "verified 2026-08-05" gets a machine's date format.
 *
 * Parsed by splitting rather than through `new Date(iso)`: that constructor
 * reads a bare ISO date as UTC midnight, so `toLocaleDateString` in any
 * timezone behind UTC renders the previous day — and in a client component
 * that also means the server and the browser can disagree. Splitting the
 * string has no timezone in it at all.
 */
export function formatVerifiedDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  const name = MONTHS[month - 1];
  if (!year || !name || !day) return iso;
  return `${name} ${day}, ${year}`;
}
