'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { Resend } from 'resend';
import { generateToken } from '@/lib/lead-magnets/token';
import { newLeadRef } from '@/lib/lead-ref';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const GUIDE_META: Record<string, { title: string; subject: string }> = {
  'pots-replacement-field-guide': {
    title: 'The POTS Replacement Field Guide',
    subject: 'Your POTS Replacement Field Guide',
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

async function getEmailSignature(): Promise<string> {
  if (!supabaseServer) return '';
  try {
    const { data } = await supabaseServer
      .from('user_settings')
      .select('email_signature')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    return data?.email_signature || '';
  } catch {
    return '';
  }
}

export async function submitLeadMagnetDownload(data: LeadMagnetFormData): Promise<{
  success: boolean;
  downloadUrl?: string;
  error?: string;
  /**
   * Present only when the download row was actually written. The insert below
   * is deliberately non-fatal — a visitor still gets their guide if the write
   * fails — so success alone does not mean a lead was captured. Conversion
   * tracking keys off this field. See src/lib/lead-ref.ts.
   */
  ref?: string;
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

  // Insert into Supabase. Non-fatal on purpose: a failed write must not cost
  // the visitor the guide they just asked for.
  let ref: string | undefined;
  try {
    if (!supabaseServer) throw new Error('Supabase not configured');
    // The error is returned rather than thrown, so it has to be checked
    // explicitly — otherwise a rejected insert reads as a successful one.
    const { error: dbError } = await supabaseServer.from('lead_magnet_downloads').insert({
      name,
      company,
      email,
      phone: phone || null,
      guide_slug: guideSlug,
      source_url: sourceUrl || null,
    });
    if (dbError) throw dbError;
    ref = newLeadRef();
  } catch (err) {
    console.error('Failed to insert lead magnet download:', err);
  }

  // Generate download token
  const token = generateToken(email, guideSlug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://insero.cloud';
  const downloadUrl = `${baseUrl}/api/lead-magnets/${guideSlug}?token=${token}&email=${encodeURIComponent(email)}`;

  // Fetch Speck's email signature from user_settings
  const signatureHtml = await getEmailSignature();

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
              <a href="${downloadUrl}" style="display: inline-block; padding: 12px 24px; background-color: #008838; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Download Your Field Guide</a>
            </p>
            <p>This link expires in 7 days. If you need it again, just reply to this email.</p>
            <hr style="border: none; border-top: 1px solid #e2e8ec; margin: 24px 0;" />
            <p>If you'd like help with your POTS replacement project — or just want a second opinion on what you're being quoted — reply to this email or call us at <strong>(844) 252-3185</strong>. We do this every day, and it costs you nothing.</p>
            ${signatureHtml ? `<div style="margin-top: 24px;">${signatureHtml}</div>` : '<p>— Speck Hansen<br/>Insero</p>'}
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
  }

  return ref ? { success: true, downloadUrl, ref } : { success: true, downloadUrl };
}
