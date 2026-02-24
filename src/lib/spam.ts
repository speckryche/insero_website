/**
 * Server-side spam detection for form submissions.
 *
 * Layers:
 * 1. Honeypot — hidden field that bots fill but humans leave empty
 * 2. Timing — bots submit in < 3 seconds; humans rarely do
 * 3. Gibberish detection — random mixed-case letter strings
 * 4. Suspicious email patterns — Gmail dot-stuffing, disposable domains
 */

export type SpamCheckInput = {
  /** Hidden honeypot field value — should be empty */
  honeypot?: string;
  /** Timestamp (ms) when the form was rendered */
  formLoadedAt?: number;
  /** Fields to check for gibberish (name, company, etc.) */
  textFields: string[];
  /** Email address */
  email: string;
};

export type SpamCheckResult = {
  isSpam: boolean;
  reasons: string[];
};

/** Minimum seconds a human would take to fill the form */
const MIN_SUBMIT_SECONDS = 3;

/**
 * Returns true if a string looks like random gibberish.
 *
 * Heuristics:
 * - Long words with no vowels or very few vowels
 * - Excessive mixed-case within a single word (CamelCase-like randomness)
 * - Very long single "words" (>14 chars with no spaces)
 */
function isGibberish(text: string): boolean {
  if (!text || text.trim().length === 0) return false;

  const words = text.trim().split(/\s+/);

  for (const word of words) {
    // Skip short words — they're rarely gibberish
    if (word.length < 6) continue;

    // Check for very long words (real names/companies rarely exceed 14 chars per word)
    if (word.length > 16) return true;

    // Count vowels vs consonants
    const vowels = (word.match(/[aeiouAEIOU]/g) || []).length;
    const vowelRatio = vowels / word.length;

    // Real English words have ~35-45% vowels. Gibberish skews low.
    if (word.length >= 8 && vowelRatio < 0.15) return true;

    // Count case transitions (e.g., aB, Ba) within a word
    let caseTransitions = 0;
    for (let i = 1; i < word.length; i++) {
      const prevUpper = word[i - 1] >= 'A' && word[i - 1] <= 'Z';
      const currUpper = word[i] >= 'A' && word[i] <= 'Z';
      const prevLetter = /[a-zA-Z]/.test(word[i - 1]);
      const currLetter = /[a-zA-Z]/.test(word[i]);
      if (prevLetter && currLetter && prevUpper !== currUpper) {
        caseTransitions++;
      }
    }

    // Real words have 0-1 case transitions (e.g., "John"). Gibberish has many.
    if (word.length >= 8 && caseTransitions >= 4) return true;
  }

  return false;
}

/**
 * Returns true if the email looks like a bot-generated address.
 *
 * Pattern: single characters separated by dots before the @,
 * e.g., "e.g.u.f.o.d.i.3.51@gmail.com"
 */
function isSuspiciousEmail(email: string): boolean {
  const localPart = email.split('@')[0] || '';
  const domain = (email.split('@')[1] || '').toLowerCase();

  // Count dot-separated segments in the local part
  const segments = localPart.split('.');

  // Many short (1-2 char) segments is a strong bot signal
  if (segments.length >= 4) {
    const shortSegments = segments.filter((s) => s.length <= 2).length;
    if (shortSegments >= 3) return true;
  }

  // Extremely high dot density (dots / total length)
  const dotCount = (localPart.match(/\./g) || []).length;
  if (localPart.length > 5 && dotCount / localPart.length > 0.25) return true;

  // Check local part for gibberish (without dots)
  const stripped = localPart.replace(/\./g, '');
  if (stripped.length >= 8 && isGibberish(stripped)) return true;

  // Known disposable / spam-friendly free providers can be added here
  const freeProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const isFreeProvider = freeProviders.includes(domain);

  // If it's a free provider AND the local part is suspicious, flag it
  if (isFreeProvider && segments.length >= 4) return true;

  return false;
}

export type SpamLogEntry = {
  form_source: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  company?: string;
  reasons: string[];
};

/**
 * Log a blocked spam submission to the spam_submissions table.
 */
export async function logSpamSubmission(
  supabase: import('@supabase/supabase-js').SupabaseClient | null,
  entry: SpamLogEntry,
): Promise<void> {
  if (!supabase) return;
  try {
    await supabase.from('spam_submissions').insert([entry]);
  } catch (err) {
    console.error('Failed to log spam submission:', err);
  }
}

/**
 * Run all spam checks against a form submission.
 * Returns { isSpam: false } for legitimate submissions.
 */
export function checkForSpam(input: SpamCheckInput): SpamCheckResult {
  const reasons: string[] = [];

  // 1. Honeypot check
  if (input.honeypot && input.honeypot.trim().length > 0) {
    reasons.push('honeypot_filled');
  }

  // 2. Timing check
  if (input.formLoadedAt) {
    const elapsedSeconds = (Date.now() - input.formLoadedAt) / 1000;
    if (elapsedSeconds < MIN_SUBMIT_SECONDS) {
      reasons.push('submitted_too_fast');
    }
  }

  // 3. Gibberish detection on text fields
  for (const text of input.textFields) {
    if (isGibberish(text)) {
      reasons.push('gibberish_text');
      break; // One is enough
    }
  }

  // 4. Suspicious email
  if (isSuspiciousEmail(input.email)) {
    reasons.push('suspicious_email');
  }

  return {
    isSpam: reasons.length > 0,
    reasons,
  };
}
