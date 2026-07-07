import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.EMAIL_FROM ?? 'British Solar Direct <info@karoldigital.co.uk>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@karoldigital.co.uk';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://british-solar-direct.vercel.app';

function getImageUrl(item: Stripe.LineItem): string | null {
  const product = item.price?.product;
  if (product && typeof product === 'object' && 'images' in product) {
    const images = product.images as string[] | undefined;
    if (images?.[0]) return images[0];
  }
  return null;
}

function formatGbp(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export async function sendOrderEmails({
  email,
  name,
  items,
  totalPence,
}: {
  email: string;
  name: string;
  items: Stripe.LineItem[];
  totalPence: number;
}) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
        .header { background: #0f172a; color: white; padding: 30px; text-align: center; }
        .header img { max-height: 80px; }
        .content { padding: 40px 30px; }
        .item { display: flex; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 20px; }
        .item img { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-right: 20px; }
        .footer { background: #f8fafc; padding: 25px; text-align: center; font-size: 14px; color: #64748b; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${SITE_URL}/BSD-logo.png" alt="British Solar Direct Logo" />
          <h1>British Solar Direct</h1>
        </div>
        <div class="content">
          <h2>Thank you for your order, ${name}!</h2>
          <p>Your order has been received and is being processed.</p>
          <h3 style="margin-top: 30px;">Order Summary</h3>
          <p><strong>Total (inc. VAT): ${formatGbp(totalPence)}</strong></p>
          ${items
            .map((item) => {
              const image = getImageUrl(item);
              return `
              <div class="item">
                ${image ? `<img src="${image}" alt="${item.description ?? 'Solar Panel'}">` : ''}
                <div>
                  <strong>${item.description ?? 'Solar Panel'}</strong><br>
                  Quantity: ${item.quantity ?? 1}<br>
                  Price: ${formatGbp(item.amount_total ?? 0)}
                </div>
              </div>`;
            })
            .join('')}
          <p style="margin-top: 40px;">Juma Mohammedi will coordinate delivery for your order. If you selected installation support, our team will contact you separately to arrange a site visit.</p>
        </div>
        <div class="footer">
          <p><strong>British Solar Direct</strong><br>
          Trade solar panel supply specialist<br>
          Email: ${ADMIN_EMAIL}<br>
          Phone: +44 7544414241</p>
          <p>© ${new Date().getFullYear()} British Solar Direct. All Rights Reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Order Confirmation - Thank You, ${name}!`,
    html,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `New Order Received - ${formatGbp(totalPence)}`,
    html: `
      <h2>New Order from ${name} (${email})</h2>
      <p><strong>Total (inc. VAT): ${formatGbp(totalPence)}</strong></p>
      <h3>Items:</h3>
      <ul>
        ${items
          .map((item) => {
            const image = getImageUrl(item);
            return `
              <li style="margin-bottom: 10px;">
                ${image ? `<img src="${image}" width="50" style="vertical-align: middle; border-radius: 4px;" /> ` : ''}
                ${item.description ?? 'Product'} × ${item.quantity ?? 1} - ${formatGbp(item.amount_total ?? 0)}
              </li>`;
          })
          .join('')}
      </ul>
    `,
  });

  return { success: true };
}

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
      <p>Questions? Call <strong>07544 14241</strong> or reply to this email.</p>
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
