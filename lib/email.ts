import { Resend } from "resend";
import { CONTACT } from "./data";
import { formatDeliveryDate, type OrderEnquiry } from "./order";

/** Where order requests are delivered. */
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
  "Happy Hens Poultry <website@happyhenspoultry.com>";

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

/* ---------- design tokens ---------- */

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

const label = `font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};`;
const link = `color:${C.accent};text-decoration:none;`;

/* ---------- building blocks ---------- */

function detailRow(name: string, valueHtml: string, last = false) {
  const border = last ? "" : `border-bottom:1px solid ${C.border};`;
  return `
    <tr>
      <td width="110" style="padding:12px 0;${border}${label}vertical-align:top;">${name}</td>
      <td style="padding:12px 0;${border}font-family:${FONT};font-size:15px;line-height:1.5;color:${C.text};vertical-align:top;">${valueHtml || `<span style="color:${C.muted}">Not provided</span>`}</td>
    </tr>`;
}

function button(href: string, text: string, primary = false) {
  const bg = primary ? C.accent : C.card;
  const color = primary ? "#ffffff" : C.accent;
  const border = primary ? C.accent : C.border;
  return `
    <td style="padding:0 8px 8px 0;">
      <a href="${href}" style="display:inline-block;padding:11px 18px;border-radius:999px;background:${bg};border:1px solid ${border};font-family:${FONT};font-size:13px;font-weight:600;color:${color};text-decoration:none;white-space:nowrap;">${text}</a>
    </td>`;
}

function summaryCard(product: string, deliveryDate: string, payment: string) {
  const head = `${label}padding-bottom:4px;`;
  const val = `font-family:${FONT};font-size:16px;font-weight:700;color:${C.text};padding-right:12px;`;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
      <tr>
        <td bgcolor="${C.msgBg}" style="background:${C.msgBg};border-radius:8px;padding:16px 18px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="${head}">Product</td>
              <td style="${head}">Delivery date</td>
              <td style="${head}">Payment</td>
            </tr>
            <tr>
              <td style="${val}">${product}</td>
              <td style="${val}">${deliveryDate}</td>
              <td style="${val}">${payment}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;
}

function notesBlock(heading: string, notes: string) {
  return `
    <p style="margin:0 0 10px;${label}">${heading}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td bgcolor="${C.msgBg}" style="background:${C.msgBg};border-left:3px solid ${C.accent};border-radius:0 8px 8px 0;padding:16px 18px;font-family:${FONT};font-size:15px;line-height:1.7;color:${notes ? C.text : C.muted};">${notes || "None"}</td>
      </tr>
    </table>`;
}

/** Shared outer shell: header band, white body sections, soft footer. */
function shell(opts: {
  title: string;
  subtitle: string;
  preheader: string;
  sections: string[];
  buttons: string;
  footer: string;
}) {
  const sections = opts.sections
    .map(
      (html, i) => `
          <tr>
            <td bgcolor="${C.card}" style="background:${C.card};padding:${i === 0 ? "28px" : "8px"} 32px 24px;">${html}</td>
          </tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background:${C.bg};" bgcolor="${C.bg}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${opts.preheader}</div>

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
                  <td style="padding-top:10px;font-family:${FONT};font-size:24px;line-height:1.25;font-weight:700;color:#ffffff;">${opts.title}</td>
                </tr>
                <tr>
                  <td style="padding-top:6px;font-family:${FONT};font-size:13px;color:${C.headerSoft};">${opts.subtitle}</td>
                </tr>
              </table>
            </td>
          </tr>

          ${sections}

          <!-- Actions -->
          <tr>
            <td bgcolor="${C.card}" style="background:${C.card};padding:0 32px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>${opts.buttons}</tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="${C.headerSoft}" style="background:${C.headerSoft};border-radius:0 0 12px 12px;padding:18px 32px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">${opts.footer}</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ---------- 1. internal notification (to the team) ---------- */

function buildTeamHtml(e: ContactEnquiry, receivedAt: string) {
  const name = escapeHtml(e.name);
  const email = escapeHtml(e.email);
  const phone = escapeHtml(e.phone);
  const city = escapeHtml(e.city);
  const address = escapeHtml(e.address).replace(/\n/g, "<br>");
  const product = escapeHtml(e.product);
  const deliveryDate = escapeHtml(formatDeliveryDate(e.deliveryDate));
  const payment = escapeHtml(e.payment);
  const notes = escapeHtml(e.notes).replace(/\n/g, "<br>");
  const wa = toWhatsAppNumber(e.phone);
  const tel = phone.replace(/\s/g, "");

  return shell({
    title: "New order request",
    subtitle: `Received ${receivedAt} (PKT)`,
    preheader: `${product} for ${name} in ${city}, delivery ${deliveryDate}, ${payment}.`,
    sections: [
      `
        <p style="margin:0 0 18px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">
          <strong>${name}</strong> placed an order request on
          <a href="${SITE_URL}/contact" style="${link}">happyhenspoultry.com</a>.
        </p>
        ${summaryCard(product, deliveryDate, payment)}
        <p style="margin:0 0 4px;${label}">Customer</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.border};">
          ${detailRow("Name", name)}
          ${detailRow("Telephone", `<a href="tel:${tel}" style="${link}">${phone}</a>`)}
          ${detailRow("Email", `<a href="mailto:${email}" style="${link}">${email}</a>`)}
          ${detailRow("City", city)}
          ${detailRow("Address", address, true)}
        </table>`,
      notesBlock("Special notes / instructions", notes),
    ],
    buttons: [
      button(`mailto:${email}`, "Reply by email", true),
      button(`tel:${tel}`, "Call"),
      wa ? button(`https://wa.me/${wa}`, "WhatsApp") : "",
    ].join(""),
    footer: `Sent automatically by the order form at
      <a href="${SITE_URL}" style="${link}">happyhenspoultry.com</a>.
      Replying to this email goes straight to ${name}.`,
  });
}

function buildTeamText(e: ContactEnquiry, receivedAt: string) {
  return [
    "HAPPY HENS POULTRY",
    "New order request",
    `Received ${receivedAt} (PKT)`,
    "",
    `Product:       ${e.product}`,
    `Delivery date: ${formatDeliveryDate(e.deliveryDate)}`,
    `Payment:       ${e.payment}`,
    "",
    `Name:      ${e.name}`,
    `Telephone: ${e.phone}`,
    `Email:     ${e.email}`,
    `City:      ${e.city}`,
    `Address:   ${e.address}`,
    "",
    "Special notes / instructions:",
    e.notes || "None",
    "",
    "--",
    `Sent automatically by the order form at ${SITE_URL}.`,
    `Reply to this email to respond directly to ${e.name}.`,
  ].join("\n");
}

/* ---------- 2. confirmation (to the customer) ---------- */

function buildCustomerHtml(e: ContactEnquiry, receivedAt: string) {
  const name = escapeHtml(e.name);
  const firstName = escapeHtml(e.name.split(/\s+/)[0] || e.name);
  const phone = escapeHtml(e.phone);
  const city = escapeHtml(e.city);
  const address = escapeHtml(e.address).replace(/\n/g, "<br>");
  const product = escapeHtml(e.product);
  const deliveryDate = escapeHtml(formatDeliveryDate(e.deliveryDate));
  const payment = escapeHtml(e.payment);
  const notes = escapeHtml(e.notes).replace(/\n/g, "<br>");

  const step = (n: number, title: string, body: string) => `
    <tr>
      <td width="36" style="padding:0 0 14px;vertical-align:top;">
        <div style="width:26px;height:26px;border-radius:50%;background:${C.headerSoft};font-family:${FONT};font-size:13px;font-weight:700;color:${C.accent};text-align:center;line-height:26px;">${n}</div>
      </td>
      <td style="padding:0 0 14px;vertical-align:top;font-family:${FONT};font-size:15px;line-height:1.5;color:${C.text};">
        <strong>${title}</strong><br>
        <span style="color:${C.muted};font-size:14px;">${body}</span>
      </td>
    </tr>`;

  return shell({
    title: `Thanks for your order, ${firstName}!`,
    subtitle: `Received ${receivedAt} (PKT)`,
    preheader: `We've received your request for ${product}, delivery ${deliveryDate}. We'll confirm within one business day.`,
    sections: [
      `
        <p style="margin:0 0 18px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">
          Hi ${name}, we've received your order request. Our team will confirm
          availability, pricing and your delivery slot within one business day,
          by phone or email.
        </p>
        ${summaryCard(product, deliveryDate, payment)}
        <p style="margin:0 0 4px;${label}">Delivery details</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.border};">
          ${detailRow("Name", name)}
          ${detailRow("Telephone", phone)}
          ${detailRow("City", city)}
          ${detailRow("Address", address, true)}
        </table>`,
      notesBlock("Your notes", notes),
      `
        <p style="margin:0 0 14px;${label}">What happens next</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${step(1, "We check availability", "Fresh eggs are packed to order, so we confirm stock for your date first.")}
          ${step(2, "We confirm with you", "Expect a call or WhatsApp message on " + phone + " with the final price and delivery time.")}
          ${step(3, "Delivery on " + deliveryDate, `Pay by ${payment.toLowerCase()} on delivery. Need to change anything? Just reply to this email.`)}
        </table>`,
    ],
    buttons: [
      button(CONTACT.whatsapp, "WhatsApp us", true),
      button(`tel:${CONTACT.phone1Raw}`, "Call us"),
      button(SITE_URL, "Visit website"),
    ].join(""),
    footer: `Happy Hens Poultry · ${CONTACT.address.join(" ")} ·
      <a href="mailto:${CONTACT.email}" style="${link}">${CONTACT.email}</a> ·
      ${CONTACT.phone1}<br>
      You're receiving this because you placed an order request at
      <a href="${SITE_URL}" style="${link}">happyhenspoultry.com</a>.`,
  });
}

function buildCustomerText(e: ContactEnquiry, receivedAt: string) {
  return [
    "HAPPY HENS POULTRY",
    `Thanks for your order, ${e.name}!`,
    `Received ${receivedAt} (PKT)`,
    "",
    "We've received your order request. Our team will confirm availability,",
    "pricing and your delivery slot within one business day, by phone or email.",
    "",
    `Product:       ${e.product}`,
    `Delivery date: ${formatDeliveryDate(e.deliveryDate)}`,
    `Payment:       ${e.payment} on delivery`,
    "",
    `Name:      ${e.name}`,
    `Telephone: ${e.phone}`,
    `City:      ${e.city}`,
    `Address:   ${e.address}`,
    "",
    "Your notes:",
    e.notes || "None",
    "",
    "Need to change anything? Reply to this email or WhatsApp us:",
    CONTACT.whatsapp,
    "",
    "--",
    `Happy Hens Poultry · ${CONTACT.address.join(" ")}`,
    `${CONTACT.email} · ${CONTACT.phone1}`,
    SITE_URL,
  ].join("\n");
}

/* ---------- send ---------- */

/**
 * Sends two emails in one batch: the order notification to the team and a
 * confirmation to the customer. Throws if Resend rejects the batch.
 */
export async function sendContactEnquiry(enquiry: ContactEnquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const resend = new Resend(apiKey);
  const receivedAt = formatReceivedAt(new Date());
  const { name, city, email, product, deliveryDate } = enquiry;

  const { error } = await resend.batch.send([
    {
      from: FROM,
      to: CONTACT_RECIPIENTS,
      replyTo: email,
      subject: `New order: ${product} · ${name} · ${city}`,
      text: buildTeamText(enquiry, receivedAt),
      html: buildTeamHtml(enquiry, receivedAt),
    },
    {
      from: FROM,
      to: [email],
      replyTo: CONTACT.email,
      subject: `Your Happy Hens order request · ${product} for ${formatDeliveryDate(deliveryDate)}`,
      text: buildCustomerText(enquiry, receivedAt),
      html: buildCustomerHtml(enquiry, receivedAt),
    },
  ]);

  if (error) {
    throw new Error(`Resend: ${error.name} – ${error.message}`);
  }
}
