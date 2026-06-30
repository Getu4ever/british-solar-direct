import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderEmails({
  email,
  name,
  items,
  total
}: {
  email: string;
  name: string;
  items: any[];
  total: string;
}) {
  try {
    console.log('📧 Sending professional email to:', email);

    // Helper to extract image URL safely
    const getImageUrl = (item: any) => {
      // Prioritize the expanded product object's images
      return item.price?.product?.images?.[0] || item.images?.[0] || null;
    };

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
            <img src="https://british-solar-direct.vercel.app/BSD-logo.png" alt="British Solar Direct Logo" />
            <h1>British Solar Direct</h1>
          </div>
          
          <div class="content">
            <h2>Thank you for your order, ${name}!</h2>
            <p>Your order has been received and is being processed.</p>
            
            <h3 style="margin-top: 30px;">Order Summary</h3>
            <p><strong>Total: $${total}</strong></p>
            
            ${items.map((item: any) => {
              const image = getImageUrl(item);
              return `
              <div class="item">
                ${image ? `<img src="${image}" alt="${item.description}">` : ''}
                <div>
                  <strong>${item.description || 'Solar Panel'}</strong><br>
                  Quantity: ${item.quantity || 1}<br>
                  Price: $${(item.amount_total / 100).toFixed(2)}
                </div>
              </div>
            `}).join('')}
            
            <p style="margin-top: 40px;">We appreciate your trust in British Solar Direct.</p>
          </div>
          
          <div class="footer">
            <p><strong>Karol Digital</strong><br>
            British Solar Panels Specialist<br>
            Email: iuma@britishsolardirect.co.uk<br>
            Phone: +44 7544414241</p>
            <p>© 2026 British Solar Direct. All Rights Reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Customer Email
    await resend.emails.send({
      from: 'British Solar Direct <info@karoldigital.co.uk>',
      to: email,
      subject: `Order Confirmation - Thank You, ${name}!`,
      html: html,
    });

    console.log('✅ Professional customer email sent');

    // Admin Notification
    await resend.emails.send({
      from: 'British Solar Direct <info@karoldigital.co.uk>',
      to: 'info@karoldigital.co.uk',
      subject: `New Order Received - $${total}`,
      html: `
        <h2>New Order from ${name} (${email})</h2>
        <p><strong>Total: $${total}</strong></p>
        <h3>Items:</h3>
        <ul>
          ${items.map((item: any) => {
            const image = getImageUrl(item);
            return `
              <li style="margin-bottom: 10px;">
                ${image ? `<img src="${image}" width="50" style="vertical-align: middle; border-radius: 4px;" /> ` : ''}
                ${item.description || 'Product'} × ${item.quantity || 1} - $${(item.amount_total / 100).toFixed(2)}
              </li>
            `}).join('')}
        </ul>
      `,
    });

    console.log('🎉 All emails sent successfully!');
    return { success: true };

  } catch (error: any) {
    console.error('❌ Email failed:', error.response?.data || error.message || error);
    throw error;
  }
}