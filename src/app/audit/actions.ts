'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { WebsiteLead } from '@/lib/supabase';
import { sendAuditLeadNotification } from '@/lib/email';
import { checkForSpam } from '@/lib/spam';

export type AuditFormData = {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  employeeCount: string;
  telecomSpend: string;
  frustration?: string;
  /** Hidden honeypot field — should be empty for real users */
  _hp?: string;
  /** Timestamp when the form was rendered (ms) */
  _t?: number;
};

export type SubmitResult = {
  success: boolean;
  error?: string;
};

export async function submitAuditForm(data: AuditFormData): Promise<SubmitResult> {
  try {
    // Spam detection
    const spamCheck = checkForSpam({
      honeypot: data._hp,
      formLoadedAt: data._t,
      textFields: [data.fullName, data.company],
      email: data.email,
    });

    if (spamCheck.isSpam) {
      console.warn('Spam audit submission blocked:', spamCheck.reasons);
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
        company: data.company || null,
        service: `[AUDIT] ${data.employeeCount} employees | ${data.telecomSpend}/mo`,
        message: data.frustration || null,
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
      await sendAuditLeadNotification(data);
    } catch (emailError) {
      // Log but don't fail the submission if email fails
      console.error('Email notification failed:', emailError);
    }

    return { success: true };
  } catch (error) {
    console.error('Audit form submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
