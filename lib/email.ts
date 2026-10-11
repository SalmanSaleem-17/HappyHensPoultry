import { Resend } from "resend";
import { formatDeliveryDate, type OrderEnquiry } from "./order";

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

const SITE_URL = "https://happyhenspoultry.com";

export type ContactEnquiry = OrderEnquiry;

/* ---------- helpers ---------- */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** "03451122333" / "+92 345 1122333" → "923451122333" for wa.me links. */
function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("92")) return digits;
  if (digits.startsWith("0")) return `92${digits.slice(1)}`;
  return digits;
}

function formatReceivedAt(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Karachi",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/* ---------- template ---------- */

const C = {
  bg: "#eef0ea",
  card: "#ffffff",
  header: "#2d4a36",
  headerSoft: "#dfe6dc",
  text: "#1f261f",
  muted: "#6b7268",
  border: "#e3e6df",
  accent: "#2d4a36",
  msgBg: "#f6f7f3",
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function detailRow(label: string, valueHtml: string, last = false) {
  const border = last ? "" : `border-bottom:1px solid ${C.border};`;
  return `
    <tr>
      <td width="110" style="padding:12px 0;${border}font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};vertical-align:top;">${label}</td>
      <td style="padding:12px 0;${border}font-family:${FONT};font-size:15px;line-height:1.5;color:${C.text};vertical-align:top;">${valueHtml || `<span style="color:${C.muted}">Not provided</span>`}</td>
    </tr>`;
}

function button(href: string, label: string, primary = false) {
  const bg = primary ? C.accent : C.card;
  const color = primary ? "#ffffff" : C.accent;
  const border = primary ? C.accent : C.border;
  return `
    <td style="padding:0 8px 8px 0;">
      <a href="${href}" style="display:inline-block;padding:11px 18px;border-radius:999px;background:${bg};border:1px solid ${border};font-family:${FONT};font-size:13px;font-weight:600;color:${color};text-decoration:none;white-space:nowrap;">${label}</a>
    </td>`;
}

function buildHtml(enquiry: ContactEnquiry, receivedAt: string) {
  const name = escapeHtml(enquiry.name);
  const email = escapeHtml(enquiry.email);
  const phone = escapeHtml(enquiry.phone);
  const city = escapeHtml(enquiry.city);
  const address = escapeHtml(enquiry.address).replace(/\n/g, "<br>");
  const product = escapeHtml(enquiry.product);
  const deliveryDate = escapeHtml(formatDeliveryDate(enquiry.deliveryDate));
  const payment = escapeHtml(enquiry.payment);
  const notes = escapeHtml(enquiry.notes).replace(/\n/g, "<br>");
  const wa = toWhatsAppNumber(enquiry.phone);

  const buttons = [
    button(`mailto:${email}`, "Reply by email", true),
    phone ? button(`tel:${phone.replace(/\s/g, "")}`, "Call") : "",
    wa ? button(`https://wa.me/${wa}`, "WhatsApp") : "",
  ].join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New order from ${name}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};" bgcolor="${C.bg}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${product} for ${name} in ${city}, delivery ${deliveryDate}, ${payment}.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.bg}" style="background:${C.bg};">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

          <!-- Header -->
          <tr>
            <td bgcolor="${C.header}" style="background:${C.header};border-radius:12px 12px 0 0;padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${FONT};font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:${C.headerSoft};font-weight:600;">Happy Hens Poultry</td>
                </tr>
                <tr>
                  <td style="padding-top:10px;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">New order request</td>
                </tr>
                <tr>
                  <td style="padding-top:6px;font-family:${FONT};font-size:13px;color:${C.headerSoft};">Received ${receivedAt} (PKT)</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td bgcolor="${C.card}" style="background:${C.card};padding:28px 32px 8px;">
              <p style="margin:0 0 18px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">
                <strong>${name}</strong> placed an order request on
                <a href="${SITE_URL}/contact" style="color:${C.accent};text-decoration:none;">happyhenspoultry.com</a>.
              </p>

              <!-- Order summary -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td bgcolor="${C.msgBg}" style="background:${C.msgBg};border-radius:8px;padding:16px 18px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};padding-bottom:4px;">Product</td>
                        <td style="font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};padding-bottom:4px;">Delivery date</td>
                        <td style="font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};padding-bottom:4px;">Payment</td>
                      </tr>
                      <tr>
                        <td style="font-family:${FONT};font-size:16px;font-weight:700;color:${C.text};padding-right:12px;">${product}</td>
                        <td style="font-family:${FONT};font-size:16px;font-weight:700;color:${C.text};padding-right:12px;">${deliveryDate}</td>
                        <td style="font-family:${FONT};font-size:16px;font-weight:700;color:${C.text};">${payment}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};">Customer</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.border};">
                ${detailRow("Name", name)}
                ${detailRow("Telephone", `<a href="tel:${phone.replace(/\s/g, "")}" style="color:${C.accent};text-decoration:none;">${phone}</a>`)}
                ${detailRow("Email", `<a href="mailto:${email}" style="color:${C.accent};text-decoration:none;">${email}</a>`)}
                ${detailRow("City", city)}
                ${detailRow("Address", address, true)}
              </table>
            </td>
          </tr>

          <!-- Notes -->
          <tr>
            <td bgcolor="${C.card}" style="background:${C.card};padding:8px 32px 24px;">
              <p style="margin:0 0 10px;font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};">Special notes / instructions</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td bgcolor="${C.msgBg}" style="background:${C.msgBg};border-left:3px solid ${C.accent};border-radius:0 8px 8px 0;padding:16px 18px;font-family:${FONT};font-size:15px;line-height:1.7;color:${notes ? C.text : C.muted};">${notes || "None"}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Actions -->
          <tr>
            <td bgcolor="${C.card}" style="background:${C.card};padding:0 32px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>${buttons}</tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="${C.headerSoft}" style="background:${C.headerSoft};border-radius:0 0 12px 12px;padding:18px 32px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">
              Sent automatically by the contact form at
              <a href="${SITE_URL}" style="color:${C.accent};text-decoration:none;">happyhenspoultry.com</a>.
              Replying to this email goes straight to ${name}.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildText(enquiry: ContactEnquiry, receivedAt: string) {
  const { name, email, phone, city, address, product, payment, notes } =
    enquiry;
  return [
    "HAPPY HENS POULTRY",
    "New order request",
    `Received ${receivedAt} (PKT)`,
    "",
    `Product:       ${product}`,
    `Delivery date: ${formatDeliveryDate(enquiry.deliveryDate)}`,
    `Payment:       ${payment}`,
    "",
    `Name:      ${name}`,
    `Telephone: ${phone}`,
    `Email:     ${email}`,
    `City:      ${city}`,
    `Address:   ${address}`,
    "",
    "Special notes / instructions:",
    notes || "None",
    "",
    "--",
    `Sent automatically by the contact form at ${SITE_URL}.`,
    `Reply to this email to respond directly to ${name}.`,
  ].join("\n");
}

/* ---------- send ---------- */

export async function sendContactEnquiry(enquiry: ContactEnquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const receivedAt = formatReceivedAt(new Date());
  const { name, city, email, product } = enquiry;

  const subject = `New order: ${product} · ${name} · ${city}`;

  const { error } = await resend.emails.send({
    from: FROM,
    to: CONTACT_RECIPIENTS,
    replyTo: email,
    subject,
    text: buildText(enquiry, receivedAt),
    html: buildHtml(enquiry, receivedAt),
  });

  if (error) {
    throw new Error(`Resend: ${error.name} – ${error.message}`);
  }
}
