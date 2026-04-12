import { ENV } from "./env";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Manus Forge API
 * Sends emails to specified recipient with HTML content
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    console.error("[Email] Forge API credentials not configured");
    return false;
  }

  try {
    const endpoint = new URL(
      "webdevtoken.v1.WebDevService/SendEmail",
      ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`
    ).toString();

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        text: payload.text || payload.html.replace(/<[^>]*>/g, ""),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        `[Email] Failed to send email (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    console.log(`[Email] Successfully sent email to ${payload.to}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending email:", error);
    return false;
  }
}

/**
 * Generate HTML email template for contact form submissions
 */
export function generateContactEmailHTML(data: {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  date?: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
    .header { background: #0a0a0a; color: white; padding: 20px; text-align: center; }
    .content { background: white; padding: 20px; margin-top: 10px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #0a0a0a; }
    .value { color: #555; margin-top: 5px; }
    .footer { text-align: center; font-size: 12px; color: #999; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>BLACK GIANT SOUNDS</h1>
      <p>Neue Event-Anfrage</p>
    </div>
    
    <div class="content">
      <h2>Neue Anfrage von ${data.name}</h2>
      
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>
      
      <div class="field">
        <div class="label">E-Mail:</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>
      
      ${data.phone ? `
      <div class="field">
        <div class="label">Telefon:</div>
        <div class="value">${escapeHtml(data.phone)}</div>
      </div>
      ` : ""}
      
      <div class="field">
        <div class="label">Veranstaltungstyp:</div>
        <div class="value">${escapeHtml(data.eventType)}</div>
      </div>
      
      ${data.date ? `
      <div class="field">
        <div class="label">Veranstaltungsdatum:</div>
        <div class="value">${escapeHtml(data.date)}</div>
      </div>
      ` : ""}
      
      <div class="field">
        <div class="label">Nachricht:</div>
        <div class="value" style="white-space: pre-wrap; background: #f5f5f5; padding: 10px; border-radius: 4px;">
          ${escapeHtml(data.message)}
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>Diese Nachricht wurde über das Kontaktformular auf blackgiant-u3dmjyzf.manus.space gesendet</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
