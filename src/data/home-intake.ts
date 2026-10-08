/**
 * The service chips on the homepage intake form, in display order.
 *
 * Lives outside src/app/actions/homeIntake.ts because a 'use server' module may
 * only export async functions. The action filters submissions against this
 * list, so the form and the action cannot disagree about what is selectable.
 */
export const HOME_INTAKE_SERVICES = [
  'Internet',
  'Voice',
  'SD-WAN',
  'Colocation',
  'Cybersecurity',
  'Not sure',
] as const;

export type HomeIntakeService = (typeof HOME_INTAKE_SERVICES)[number];
