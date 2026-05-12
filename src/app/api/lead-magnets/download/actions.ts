'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';
import { generateToken } from '@/lib/lead-magnets/token';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const GUIDE_META: Record<string, { title: string; subject: string }> = {
  'pots-replacement-playbook': {
    title: 'The POTS Replacement Playbook',
    subject: 'Your POTS Replacement Playbook',
  },
};

export type LeadMagnetFormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone?: string;
  guideSlug: string;
  sourceUrl?: string;
};

export async function submitLeadMagnetDownload(data: LeadMagnetFormData): Promise<{
  success: boolean;
  downloadUrl?: string;
  error?: string;
}> {
  const { firstName, lastName, company, email, phone, guideSlug, sourceUrl } = data;
  const name = `${firstName} ${lastName}`.trim();

  const guide = GUIDE_META[guideSlug];
  if (!guide) return { success: false, error: 'Unknown guide.' };

  // Basic validation
  if (!firstName || !lastName || !company || !email) {
    return { success: false, error: 'Please fill in all required fields.' };
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  // Insert into Supabase
  try {
    if (!supabaseServer) throw new Error('Supabase not configured');
    await supabaseServer.from('lead_magnet_downloads').insert({
      name,
      company,
      email,
      phone: phone || null,
      guide_slug: guideSlug,
      source_url: sourceUrl || null,
    });
  } catch (err) {
    console.error('Failed to insert lead magnet download:', err);
    // Don't block the download on DB failure
  }

  // Generate download token
  const token = generateToken(email, guideSlug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insero.cloud';
  const downloadUrl = `${baseUrl}/api/lead-magnets/${guideSlug}?token=${token}&email=${encodeURIComponent(email)}`;

  // Send email
  try {
    if (resend) {
      await resend.emails.send({
        from: 'Insero Guides <guides@mail.insero.cloud>',
        replyTo: 'sales@insero.cloud',
        to: email,
        subject: guide.subject,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #1a2530;">
            <p>Hi ${firstName},</p>
            <p>Thanks for downloading <strong>${guide.title}</strong>. Here's your link:</p>
            <p style="margin: 24px 0;">
              <a href="${downloadUrl}" style="display: inline-block; padding: 12px 24px; background-color: #008838; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Download Your Playbook</a>
            </p>
            <p>This link expires in 7 days. If you need it again, just reply to this email.</p>
            <hr style="border: none; border-top: 1px solid #e2e8ec; margin: 24px 0;" />
            <p>If you'd like help with your POTS replacement project — or just want a second opinion on what you're being quoted — reply to this email or call us at <strong>(844) 252-3185</strong>. We do this every day, and it costs you nothing.</p>
            <p>— Speck Hansen<br/>Insero</p>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px;">
              Insero, LLC · insero.cloud · (844) 252-3185<br/>
              You're receiving this because you requested a guide download. <a href="mailto:sales@insero.cloud?subject=Unsubscribe" style="color: #94a3b8;">Unsubscribe</a>
            </p>
          </div>
        `,
      });
    }
  } catch (err) {
    console.error('Failed to send lead magnet email:', err);
    // Don't block download on email failure
  }

  return { success: true, downloadUrl };
}
