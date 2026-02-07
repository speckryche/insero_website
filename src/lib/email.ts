import { Resend } from 'resend';

// Only create client if API key is available
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

  if (!resend) {
    console.warn('Resend not configured - skipping email notification');
    console.log('Lead data:', { firstName, lastName, email, phone, company, services, message });
    return null;
  }

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

type AuditLeadNotificationData = {
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  employeeCount: string;
  telecomSpend: string;
  frustration?: string;
};

export async function sendAuditLeadNotification(data: AuditLeadNotificationData) {
  const { fullName, company, email, phone, employeeCount, telecomSpend, frustration } = data;

  const emailContent = `
New Audit Lead from Insero Website

Contact Information:
- Name: ${fullName}
- Company: ${company}
- Email: ${email}
- Phone: ${phone}

Audit Details:
- Number of Employees: ${employeeCount}
- Monthly Telecom Spend: ${telecomSpend}

Biggest Frustration:
${frustration || 'Not provided'}

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
    .badge { display: inline-block; background: #33baab; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 20px;">New Audit Lead <span class="badge">AUDIT</span></h1>
    </div>
    <div class="content">
      <div class="section">
        <div class="label">Contact Information</div>
        <div class="value">
          <strong>Name:</strong> ${fullName}<br>
          <strong>Company:</strong> ${company}<br>
          <strong>Email:</strong> <a href="mailto:${email}">${email}</a><br>
          <strong>Phone:</strong> ${phone}
        </div>
      </div>
      <div class="section">
        <div class="label">Audit Details</div>
        <div class="value">
          <strong>Employees:</strong> ${employeeCount}<br>
          <strong>Monthly Telecom Spend:</strong> ${telecomSpend}
        </div>
      </div>
      <div class="section">
        <div class="label">Biggest Frustration</div>
        <div class="value">${frustration || 'Not provided'}</div>
      </div>
    </div>
    <div class="footer">
      This lead has been automatically added to the CRM.
    </div>
  </div>
</body>
</html>
  `.trim();

  if (!resend) {
    console.warn('Resend not configured - skipping audit email notification');
    console.log('Audit lead data:', data);
    return null;
  }

  const { data: emailData, error } = await resend.emails.send({
    from: 'Insero Website <noreply@insero.cloud>',
    to: ['sales@insero.cloud'],
    subject: `New Audit Lead: ${fullName} from ${company}`,
    text: emailContent,
    html: htmlContent,
  });

  if (error) {
    console.error('Failed to send audit email notification:', error);
    throw error;
  }

  return emailData;
}
