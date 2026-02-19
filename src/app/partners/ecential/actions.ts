'use server';

import { supabase, WebsiteLead } from '@/lib/supabase';
import { sendEcentialLeadNotification } from '@/lib/email';

export type EcentialFormData = {
  fullName: string;
  centerName: string;
  email: string;
  phone: string;
  locationCount: string;
  staffCount: string;
  challenge?: string;
};

export type SubmitResult = {
  success: boolean;
  error?: string;
};

export async function submitEcentialForm(data: EcentialFormData): Promise<SubmitResult> {
  try {
    // Split fullName into first_name / last_name
    const spaceIndex = data.fullName.indexOf(' ');
    const firstName = spaceIndex === -1 ? data.fullName : data.fullName.slice(0, spaceIndex);
    const lastName = spaceIndex === -1 ? '' : data.fullName.slice(spaceIndex + 1);

    // Insert into Supabase (if configured)
    if (supabase) {
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

      const { error: dbError } = await supabase
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
