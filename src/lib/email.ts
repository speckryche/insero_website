import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type LeadNotificationData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  message?: string;
};

export async function sendLeadNotification(data: LeadNotificationData) {
  const { firstName, lastName, email, phone, company, services, message } = data;
  const servicesDisplay = services?.join(', ') || 'Not specified';

  const emailContent = `
New Lead from Insero Website Contact Form

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Company: ${company || 'Not provided'}

Interest:
- Services: ${servicesDisplay}

Message:
${message || 'No message provided'}

---
This lead has been automatically added to the CRM.
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0f2b46; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 20px; }
    .label { font-weight: bold; color: #0f2b46; }
    .value { margin-top: 4px; }
    .footer { background: #f3f4f6; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 20px;">New Website Lead</h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="label">Contact Information</div>
        <div class="value">
          <strong>Name:</strong> ${firstName} ${lastName}<br>
          <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
          <strong>Phone:</strong> ${phone || 'Not provided'}<br>
          <strong>Company:</strong> ${company || 'Not provided'}
        </div>
      </div>
      <div class="section">
        <div class="label">Services Interested In</div>
        <div class="value">${servicesDisplay}</div>
      </div>
      <div class="section">
        <div class="label">Message</div>
        <div class="value">${message || 'No message provided'}</div>
      </div>
    </div>
    <div class="footer">
      This lead has been automatically added to the CRM.
    </div>
  </div>
</body>
</html>
  `.trim();

  const { data: emailData, error } = await resend.emails.send({
    from: 'Insero Website <noreply@insero.cloud>',
    to: ['sales@insero.cloud'],
    subject: `New Lead: ${firstName} ${lastName}${company ? ` from ${company}` : ''}`,
    text: emailContent,
    html: htmlContent,
  });

  if (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }

  return emailData;
}
