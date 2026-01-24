'use server';

import { supabase, WebsiteLead } from '@/lib/supabase';
import { sendLeadNotification } from '@/lib/email';

export type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  message?: string;
};

export type SubmitResult = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(data: ContactFormData): Promise<SubmitResult> {
  try {
    // Insert into Supabase
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
