import { Resend } from 'resend';
import { COMPANY } from './company';
import {
  buildDetailRow,
  buildDetailsTable,
  buildEmailHtml,
} from './email-templates';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.EMAIL_FROM ?? 'British Solar Direct <info@karoldigital.co.uk>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@karoldigital.co.uk';

export async function sendQuoteNotification({
  customerName,
  contactEmail,
  contactPhone,
  deliveryPostcode,
  productInterest,
  quantity,
  projectNotes,
  needsInstallation,
  uploadedImages,
}: {
  customerName: string;
  contactEmail: string;
  contactPhone?: string | null;
  deliveryPostcode?: string | null;
  productInterest?: string | null;
  quantity?: string | null;
  projectNotes?: string | null;
  needsInstallation?: boolean;
  uploadedImages?: Array<{
    filename: string;
    type: string;
    content: Buffer;
  }>;
}) {
  const adminDetails = [
    buildDetailRow('Customer name', customerName),
    buildDetailRow('Email', `<a href="mailto:${contactEmail}" style="color:#d97706;text-decoration:none;">${contactEmail}</a>`),
    contactPhone && buildDetailRow('Phone', `<a href="tel:${contactPhone.replace(/\s/g, '')}" style="color:#d97706;text-decoration:none;">${contactPhone}</a>`),
    deliveryPostcode && buildDetailRow('Delivery postcode', deliveryPostcode),
    productInterest && buildDetailRow('Installation package', productInterest),
    quantity && buildDetailRow('Package scope', quantity),
    needsInstallation && buildDetailRow('Installation', 'Requested'),
    uploadedImages?.length && buildDetailRow('Property images', `${uploadedImages.length} file(s) attached`),
    projectNotes && buildDetailRow('Notes', projectNotes.replace(/\n/g, '<br>')),
  ]
    .filter(Boolean)
    .join('');

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Quote Request - ${customerName}`,
    attachments: uploadedImages,
    html: buildEmailHtml(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#0f172a;">New Quote Request</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:14px;">Please review and respond ${COMPANY.responseTime}.</p>
      ${buildDetailsTable(adminDetails)}
      <p style="margin:20px 0 0;font-size:13px;color:#64748b;">Reply directly to the customer at <a href="mailto:${contactEmail}" style="color:#d97706;text-decoration:none;">${contactEmail}</a>.</p>
    `),
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: contactEmail,
    subject: 'Quote Request Received - British Solar Direct',
    html: buildEmailHtml(`
      <h2 style="margin:0 0 16px;font-size:22px;color:#0f172a;">Thank you, ${customerName}</h2>
      <p style="margin:0 0 16px;">We have received your solar panel quote request.</p>
      ${uploadedImages?.length ? '<p style="margin:0 0 16px;">Your property images were received successfully and have been shared with our installation team.</p>' : ''}
      <p style="margin:0 0 16px;"><strong>${COMPANY.director}</strong> or a member of the ${COMPANY.name} team will review your requirements and send pricing, lead time, and a pro-forma invoice <strong>${COMPANY.responseTime}</strong>.</p>
      <p style="margin:0 0 16px;">We can also arrange delivery and professional installation across ${COMPANY.city} and surrounding areas.</p>
      <p style="margin:0;font-size:14px;color:#64748b;">Questions? Call <a href="tel:${COMPANY.phone}" style="color:#d97706;text-decoration:none;font-weight:600;">${COMPANY.phoneDisplay}</a> or reply to this email.</p>
    `),
  });
}

export async function sendContactNotification({
  name,
  propertyName,
  email,
  message,
}: {
  name: string;
  propertyName?: string | null;
  email: string;
  message: string;
}) {
  const adminDetails = [
    buildDetailRow('Name', name),
    propertyName && buildDetailRow('Property name', propertyName),
    buildDetailRow('Email', `<a href="mailto:${email}" style="color:#d97706;text-decoration:none;">${email}</a>`),
    buildDetailRow('Message', message.replace(/\n/g, '<br>')),
  ]
    .filter(Boolean)
    .join('');

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Enquiry from ${name}`,
    html: buildEmailHtml(`
      <h2 style="margin:0 0 8px;font-size:22px;color:#0f172a;">New Contact Enquiry</h2>
      <p style="margin:0 0 20px;color:#64748b;font-size:14px;">Please review and respond ${COMPANY.responseTime}.</p>
      ${buildDetailsTable(adminDetails)}
      <p style="margin:20px 0 0;font-size:13px;color:#64748b;">Reply directly at <a href="mailto:${email}" style="color:#d97706;text-decoration:none;">${email}</a>.</p>
    `),
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Enquiry Received - British Solar Direct',
    html: buildEmailHtml(`
      <h2 style="margin:0 0 16px;font-size:22px;color:#0f172a;">Thank you, ${name}</h2>
      <p style="margin:0 0 16px;">We have received your enquiry and will respond as soon as possible — typically ${COMPANY.responseTime}.</p>
      <p style="margin:0;font-size:14px;color:#64748b;">Questions? Call <a href="tel:${COMPANY.phone}" style="color:#d97706;text-decoration:none;font-weight:600;">${COMPANY.phoneDisplay}</a> or reply to this email.</p>
    `),
  });
}
