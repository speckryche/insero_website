'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { WebsiteLead } from '@/lib/supabase';
import { sendEcentialLeadNotification } from '@/lib/email';
import { checkForSpam, logSpamSubmission } from '@/lib/spam';

export type EcentialFormData = {
  fullName: string;
  centerName: string;
  email: string;
  phone: string;
  locationCount: string;
  staffCount: string;
  challenge?: string;
  /** Hidden honeypot field — should be empty for real users */
  _hp?: string;
  /** Timestamp when the form was rendered (ms) */
  _t?: number;
};

export type SubmitResult = {
  success: boolean;
  error?: string;
};

export async function submitEcentialForm(data: EcentialFormData): Promise<SubmitResult> {
  try {
    // Spam detection
    const spamCheck = checkForSpam({
      honeypot: data._hp,
      formLoadedAt: data._t,
      textFields: [data.fullName, data.centerName],
      email: data.email,
    });

    if (spamCheck.isSpam) {
      console.warn('Spam ecential submission blocked:', spamCheck.reasons);
      const spaceIdx = data.fullName.indexOf(' ');
      await logSpamSubmission(supabaseServer, {
        form_source: 'ecential',
        first_name: spaceIdx === -1 ? data.fullName : data.fullName.slice(0, spaceIdx),
        last_name: spaceIdx === -1 ? undefined : data.fullName.slice(spaceIdx + 1),
        email: data.email,
        company: data.centerName,
        reasons: spamCheck.reasons,
      });
      return { success: true };
    }

    // Split fullName into first_name / last_name
    const spaceIndex = data.fullName.indexOf(' ');
    const firstName = spaceIndex === -1 ? data.fullName : data.fullName.slice(0, spaceIndex);
    const lastName = spaceIndex === -1 ? '' : data.fullName.slice(spaceIndex + 1);

    // Insert into Supabase (if configured)
    if (supabaseServer) {
      const lead: WebsiteLead = {
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.phone || null,
        company: data.centerName || null,
        service: `[PARTNER:ECENTIAL] ${data.locationCount} locations | ${data.staffCount} staff`,
        message: data.challenge || null,
        status: 'new',
      };

      const { error: dbError } = await supabaseServer
        .from('website_leads')
        .insert([lead]);

      if (dbError) {
        console.error('Database error:', dbError);
        return {
          success: false,
          error: 'Failed to save your information. Please try again.',
        };
      }
    } else {
      console.warn('Supabase not configured - skipping database insert');
    }

    // Send email notification
    try {
      await sendEcentialLeadNotification(data);
    } catch (emailError) {
      // Log but don't fail the submission if email fails
      console.error('Email notification failed:', emailError);
    }

    return { success: true };
  } catch (error) {
    console.error('Ecential form submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
