import { Resend } from "resend";

/** Where contact-form enquiries are delivered. */
export const CONTACT_RECIPIENTS = [
  "sales@happyhenspoultry.com",
  "ali.diwan58@gmail.com",
];

/**
 * Sender address. Must be on a domain verified in Resend
 * (happyhenspoultry.com). Override with RESEND_FROM if needed.
 */
const FROM =
  process.env.RESEND_FROM ??
  "Happy Hens Website <website@happyhenspoultry.com>";

export type ContactEnquiry = {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b6b60;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:8px 12px;font-size:15px;color:#1f261f">${value || "—"}</td>
  </tr>`;
}

export async function sendContactEnquiry(enquiry: ContactEnquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const { name, email, phone, city, message } = enquiry;

  const subject = `New enquiry from ${name}${city ? ` (${city})` : ""}`;

  const text = [
    "New enquiry from the Happy Hens website",
    "",
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "—"}`,
    `City:    ${city || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
  <div style="font-family:Georgia,serif;background:#f5f2ea;padding:32px">
    <div style="max-width:560px;margin:0 auto;background:#fffdf8;border:1px solid #e3ded0;padding:28px">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:#2f5d3a">✦ Happy Hens Poultry</p>
      <h1 style="margin:0 0 20px;font-size:24px;font-weight:500;color:#1f261f">New website enquiry</h1>
      <table style="border-collapse:collapse;width:100%">
        ${row("Name", escapeHtml(name))}
        ${row("Email", `<a href="mailto:${escapeHtml(email)}" style="color:#2f5d3a">${escapeHtml(email)}</a>`)}
        ${row("Phone", phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#2f5d3a">${escapeHtml(phone)}</a>` : "")}
        ${row("City", escapeHtml(city))}
      </table>
      <div style="margin-top:20px;padding:16px;background:#f5f2ea;border-left:3px solid #2f5d3a;font-size:15px;line-height:1.6;color:#1f261f;white-space:pre-wrap">${escapeHtml(message)}</div>
      <p style="margin:24px 0 0;font-size:12px;color:#6b6b60">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
    </div>
  </div>`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: CONTACT_RECIPIENTS,
    replyTo: email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend: ${error.name} – ${error.message}`);
  }
}
