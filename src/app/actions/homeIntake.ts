'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { WebsiteLead } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';
import { checkForSpam, logSpamSubmission } from '@/lib/spam';
import { newLeadRef } from '@/lib/lead-ref';
import { HOME_INTAKE_SERVICES } from '@/data/home-intake';

/**
 * Homepage intake: address-first lead form in the #get-started section.
 *
 * Writes the same `website_leads` row shape as /contact, so the portal's
 * `create_opportunity_from_website_lead()` trigger turns it into an
 * opportunity with no schema change. That shape has no address column, so the
 * service address rides in `message`, which the trigger copies into the
 * opportunity's notes under "Additional Notes".
 */

export type HomeIntakeFormData = {
  address: string;
  services: string[];
  name: string;
  email: string;
  businessName?: string;
  /** Hidden honeypot field — should be empty for real users */
  _hp?: string;
  /** Timestamp when the form was rendered (ms) */
  _t?: number;
};

export type SubmitResult = {
  success: boolean;
  error?: string;
  /**
   * Present only when a lead row was actually written. Absent on the
   * spam-blocked path, which reports success without persisting anything.
   * Conversion tracking keys off this field — see src/lib/lead-ref.ts.
   */
  ref?: string;
};

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export async function submitHomeIntake(data: HomeIntakeFormData): Promise<SubmitResult> {
  const address = data.address?.trim() ?? '';
  const name = data.name?.trim() ?? '';
  const email = data.email?.trim() ?? '';
  const businessName = data.businessName?.trim() || '';

  if (!address || !name || !email) {
    return { success: false, error: 'Please fill in your address, name and email.' };
  }
  if (!EMAIL_RE.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  // Only the chips the form offers, in the form's order. Filtering against the
  // fixed list is also what guarantees `service` can never start with
  // "[AUDIT]", which would route the lead down the trigger's audit branch.
  const requested = new Set(data.services ?? []);
  const services = HOME_INTAKE_SERVICES.filter((s) => requested.has(s));

  const spaceIndex = name.indexOf(' ');
  const firstName = spaceIndex === -1 ? name : name.slice(0, spaceIndex);
  const lastName = spaceIndex === -1 ? '' : name.slice(spaceIndex + 1).trim();

  try {
    const spamCheck = checkForSpam({
      honeypot: data._hp,
      formLoadedAt: data._t,
      textFields: [name, businessName],
      email,
    });

    if (spamCheck.isSpam) {
      console.warn('Spam homepage intake blocked:', spamCheck.reasons);
      await logSpamSubmission(supabaseServer, {
        form_source: 'home-intake',
        first_name: firstName,
        last_name: lastName || undefined,
        email,
        company: businessName || undefined,
        reasons: spamCheck.reasons,
      });
      return { success: true };
    }

    // Unlike /contact, an unconfigured database is a failure here, not a
    // silent success: a visitor who was promised a side-by-side must not be
    // told it is on its way when nothing was recorded.
    if (!supabaseServer) {
      console.error('Supabase not configured - homepage intake cannot be saved');
      return {
        success: false,
        error: "We couldn't save your request. Please try again, or call us.",
      };
    }

    const message = `Homepage intake\nService address: ${address}`;

    const lead: WebsiteLead = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: null,
      company: businessName || null,
      service: services.length > 0 ? services.join(', ') : null,
      message,
      status: 'new',
    };

    const { error: dbError } = await supabaseServer.from('website_leads').insert([lead]);

    if (dbError) {
      console.error('Database error:', dbError);
      return {
        success: false,
        error: 'Failed to save your information. Please try again.',
      };
    }

    const ref = newLeadRef();

    try {
      await sendLeadNotification({
        firstName,
        lastName,
        email,
        company: businessName || undefined,
        services: services.length > 0 ? [...services] : undefined,
        message,
      });
    } catch (emailError) {
      // Log but don't fail the submission if email fails
      console.error('Email notification failed:', emailError);
    }

    return { success: true, ref };
  } catch (error) {
    console.error('Homepage intake submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
