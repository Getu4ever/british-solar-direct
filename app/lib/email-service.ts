import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.EMAIL_FROM ?? 'British Solar Direct <info@karoldigital.co.uk>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@karoldigital.co.uk';

export async function sendQuoteNotification({
  companyName,
  contactEmail,
  contactPhone,
  deliveryPostcode,
  productInterest,
  quantity,
  projectNotes,
  needsInstallation,
}: {
  companyName: string;
  contactEmail: string;
  contactPhone?: string | null;
  deliveryPostcode?: string | null;
  productInterest?: string | null;
  quantity?: string | null;
  projectNotes?: string | null;
  needsInstallation?: boolean;
}) {
  const details = [
    contactPhone && `<p><strong>Phone:</strong> ${contactPhone}</p>`,
    deliveryPostcode && `<p><strong>Delivery postcode:</strong> ${deliveryPostcode}</p>`,
    productInterest && `<p><strong>Product interest:</strong> ${productInterest}</p>`,
    quantity && `<p><strong>Quantity:</strong> ${quantity}</p>`,
    needsInstallation && `<p><strong>Installation:</strong> Requested</p>`,
    projectNotes && `<p><strong>Notes:</strong> ${projectNotes}</p>`,
  ]
    .filter(Boolean)
    .join('');

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Quote Request - ${companyName}`,
    html: `
      <h2>New Quote Request — respond within 4 business hours</h2>
      <p><strong>Name / company:</strong> ${companyName}</p>
      <p><strong>Email:</strong> ${contactEmail}</p>
      ${details}
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: contactEmail,
    subject: 'Quote Request Received - British Solar Direct',
    html: `
      <h2>Thank you, ${companyName}</h2>
      <p>We have received your solar panel quote request.</p>
      <p><strong>Juma Mohammedi</strong> or a member of the British Solar Direct team will review your requirements and send pricing, lead time, and a pro-forma invoice <strong>within 4 business hours</strong>.</p>
      <p>We can also arrange delivery and professional installation across Nottingham and surrounding areas.</p>
      <p>Questions? Call <strong>0115 671 2424</strong> or reply to this email.</p>
      <p>— British Solar Direct</p>
    `,
  });
}

export async function sendContactNotification({
  name,
  companyName,
  email,
  message,
}: {
  name: string;
  companyName?: string | null;
  email: string;
  message: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Enquiry from ${name}`,
    html: `
      <h2>New Contact Enquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      ${companyName ? `<p><strong>Company:</strong> ${companyName}</p>` : ''}
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Enquiry Received - British Solar Direct',
    html: `
      <h2>Thank you, ${name}</h2>
      <p>We have received your enquiry and will respond as soon as possible.</p>
      <p>— British Solar Direct</p>
    `,
  });
}

export async function sendTradeApplicationNotification({
  companyName,
  contactName,
  email,
  phone,
  businessType,
  notes,
}: {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string | null;
  businessType: string;
  notes?: string | null;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Trade Account Application - ${companyName}`,
    html: `
      <h2>New Trade Account Application</h2>
      <p><strong>Company:</strong> ${companyName}</p>
      <p><strong>Contact:</strong> ${contactName}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Business type:</strong> ${businessType}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
    `,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Trade Account Application Received - British Solar Direct',
    html: `
      <h2>Thank you, ${contactName}</h2>
      <p>We have received your trade account application for ${companyName} and will review it shortly.</p>
      <p>— British Solar Direct</p>
    `,
  });
}
