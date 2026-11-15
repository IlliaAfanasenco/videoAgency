import type { ContactValues } from "@/lib/contact-schema";

export const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Header values must never contain line breaks (header injection). */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export type MailConfig = { apiKey: string; to: string; from: string };

export function getMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  return apiKey && to && from ? { apiKey, to, from } : null;
}

/**
 * Sends the enquiry through the Resend HTTPS API (plain fetch, no extra dependency).
 * To use another provider, replace only this function.
 */
export async function sendContactMail(
  config: MailConfig,
  v: ContactValues,
  typeLabel: string,
): Promise<boolean> {
  const rows: [string, string][] = [
    ["Name", v.name],
    ["Unternehmen", v.company || "–"],
    ["E-Mail", v.email],
    ["Telefon", v.phone || "–"],
    ["Projektart", typeLabel],
  ];
  const text =
    rows.map(([k, val]) => `${k}: ${val}`).join("\n") +
    `\n\nProjektbeschreibung:\n${v.message}\n`;
  const html =
    `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">` +
    rows
      .map(
        ([k, val]) =>
          `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(val)}</td></tr>`,
      )
      .join("") +
    `</table><p style="font-family:sans-serif;font-size:14px"><strong>Projektbeschreibung</strong></p>` +
    `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(v.message)}</p>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: oneLine(v.email),
      subject: oneLine(`Neue Anfrage: ${typeLabel} – ${v.name}`).slice(0, 200),
      text,
      html,
    }),
  });
  return res.ok;
}
