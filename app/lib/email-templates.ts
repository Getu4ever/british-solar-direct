import { COMPANY } from './company';

function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://britishsolardirect.co.uk';
}

export function buildEmailHtml(content: string): string {
  const siteUrl = getSiteUrl();
  const logoUrl = `${siteUrl}/BSD-logo.png`;
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${COMPANY.name}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background-color:#020617;padding:28px 32px;text-align:center;">
              <img src="${logoUrl}" alt="${COMPANY.name} logo" width="56" height="56" style="display:block;margin:0 auto 12px;border:0;">
              <p style="margin:0;font-size:18px;font-weight:bold;color:#ffffff;letter-spacing:0.5px;">
                BRITISH SOLAR <span style="color:#f59e0b;">DIRECT</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#334155;font-size:15px;line-height:1.65;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:28px 32px;text-align:center;">
              <img src="${logoUrl}" alt="${COMPANY.name} logo" width="44" height="44" style="display:block;margin:0 auto 14px;border:0;">
              <p style="margin:0 0 6px;font-size:14px;font-weight:bold;color:#0f172a;">${COMPANY.name}</p>
              <p style="margin:0 0 14px;font-size:13px;color:#64748b;line-height:1.5;">${COMPANY.address}</p>
              <p style="margin:0 0 6px;font-size:13px;color:#64748b;">
                Tel: <a href="tel:${COMPANY.phone}" style="color:#d97706;text-decoration:none;font-weight:600;">${COMPANY.phoneDisplay}</a>
              </p>
              <p style="margin:0 0 16px;font-size:13px;color:#64748b;">
                Email: <a href="mailto:${COMPANY.email}" style="color:#d97706;text-decoration:none;font-weight:600;">${COMPANY.email}</a>
              </p>
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                &copy; ${year} ${COMPANY.name}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildDetailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:600;color:#475569;width:38%;vertical-align:top;">${label}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;vertical-align:top;">${value}</td>
    </tr>`;
}

export function buildDetailsTable(rows: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border:1px solid #e2e8f0;border-radius:6px;border-collapse:separate;overflow:hidden;">
      ${rows}
    </table>`;
}
