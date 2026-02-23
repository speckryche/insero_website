'use server';

import { supabase, WebsiteLead } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';
import { checkForSpam } from '@/lib/spam';

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  message?: string;
  /** Hidden honeypot field — should be empty for real users */
  _hp?: string;
  /** Timestamp when the form was rendered (ms) */
  _t?: number;
};

export type SubmitResult = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(data: ContactFormData): Promise<SubmitResult> {
  try {
    // Spam detection
    const spamCheck = checkForSpam({
      honeypot: data._hp,
      formLoadedAt: data._t,
      textFields: [
        data.firstName,
        data.lastName,
        data.company || '',
      ],
      email: data.email,
    });

    if (spamCheck.isSpam) {
      console.warn('Spam submission blocked:', spamCheck.reasons);
      // Return success to not tip off bots that they were caught
      return { success: true };
    }

    // Insert into Supabase (if configured)
    if (supabase) {
      const lead: WebsiteLead = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        service: data.services?.join(', ') || null,
        message: data.message || null,
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
      await sendLeadNotification(data);
    } catch (emailError) {
      // Log but don't fail the submission if email fails
      console.error('Email notification failed:', emailError);
    }

    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
