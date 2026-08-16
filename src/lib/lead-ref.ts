import { randomUUID } from 'node:crypto';

/**
 * Short opaque reference for a lead that was genuinely persisted.
 *
 * Its only job is to let the client tell a real insert apart from the two
 * paths that also return `{ success: true }` without creating a lead:
 *
 *  - a spam submission, which is answered with success on purpose so the bot
 *    learns nothing, and
 *  - a run where Supabase is unconfigured, which warns and carries on.
 *
 * Conversion tracking keys off the presence of this field, so it must only
 * ever be attached after a confirmed insert.
 *
 * This is deliberately not the inserted row id. Reading that back would mean
 * appending `.select()` to the insert, which changes the query, needs a
 * matching RLS select policy, and can fail independently of the write — a
 * failed read would then look like a failed submission to the visitor. A
 * random token carries the same signal with no new failure mode.
 */
export function newLeadRef(): string {
  return randomUUID().slice(0, 8);
}
