import { Resend } from "resend";
import { CONTACT } from "./data";
import {
  BANK,
  COMPANY,
  formatDeliveryDate,
  type OrderEnquiry,
} from "./order";
import {
  makeOrderRef,
  signOrderToken,
  type OrderTokenPayload,
} from "./verify-token";

/** Where order requests are delivered. */
export const CONTACT_RECIPIENTS = [
  "sales@happyhenspoultry.com",
  "ali.diwan58@gmail.com",
  "shanisaleem17@gmail.com",
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

/** Uploaded payment receipt, attached to both order emails. */
export type Receipt = {
  filename: string;
  contentType: string;
  content: Buffer;
};

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

function formatBytes(n: number) {
  return n >= 1024 * 1024
    ? `${(n / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(n / 1024))} KB`;
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
  success: "#1f6b3a",
};

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const label = `font-family:${FONT};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${C.muted};`;
const link = `color:${C.accent};text-decoration:none;`;
const para = `margin:0 0 18px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};`;

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

function bankDetailsTable() {
  const mono = `font-family:Consolas,'SF Mono',Menlo,monospace;letter-spacing:.04em;`;
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.border};">
      ${detailRow("Bank", `${BANK.bank}, ${BANK.branch}`)}
      ${detailRow("Title", BANK.title)}
      ${detailRow("Account", `<span style="${mono}">${BANK.accountNumber}</span>`)}
      ${detailRow("IBAN", `<span style="${mono}">${BANK.iban}</span>`, true)}
    </table>`;
}

/** "Powered by 3CORE Traders" logo row, rendered under the footer text. */
const POWERED_BY = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;">
    <tr>
      <td style="padding-right:12px;vertical-align:middle;">
        <img src="${SITE_URL}/powered-by-3core.png" width="64" height="60" alt="3CORE Traders (Pvt) Ltd" style="display:block;width:64px;height:auto;border-radius:6px;background:#ffffff;">
      </td>
      <td style="vertical-align:middle;font-family:${FONT};font-size:11px;line-height:1.5;color:${C.muted};">
        <span style="letter-spacing:.14em;text-transform:uppercase;font-weight:600;">Powered by</span><br>
        <span style="font-size:13px;color:${C.text};font-weight:600;">${COMPANY}</span>
      </td>
    </tr>
  </table>`;

const CUSTOMER_FOOTER = `Happy Hens Poultry · Office: ${CONTACT.address.join(" ")} · Farm: ${CONTACT.farm.join(" ")}<br>
  <a href="mailto:${CONTACT.email}" style="${link}">${CONTACT.email}</a> · ${CONTACT.phone1}`;

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
            <td bgcolor="${C.headerSoft}" style="background:${C.headerSoft};border-radius:0 0 12px 12px;padding:18px 32px;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">${opts.footer}${POWERED_BY}</td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ---------- shared per-order context ---------- */

type OrderCtx = {
  ref: string;
  receivedAt: string;
  receipt?: Receipt;
  /** Signed "Verify payment" link, bank transfers only. */
  verifyUrl?: string;
};

/* ---------- 1. internal notification (to the team) ---------- */

function buildTeamHtml(e: ContactEnquiry, ctx: OrderCtx) {
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
  const isBank = e.payment === "Bank Transfer";

  const paymentNote = isBank
    ? ctx.receipt
      ? `Bank transfer. Receipt attached: <strong>${escapeHtml(ctx.receipt.filename)}</strong> (${formatBytes(ctx.receipt.content.length)}). Check the amount against the ${BANK.bank} account, then press <strong>Verify payment</strong> below to confirm the order and email the customer.`
      : `Bank transfer. <strong>No receipt attached yet.</strong> Share the total with the customer and ask for the transfer screenshot on WhatsApp. Once the money is in, press <strong>Verify payment</strong> below to confirm the order and email the customer.`
    : "Cash on delivery.";

  return shell({
    title: "New order request",
    subtitle: `Order ${ctx.ref} · Received ${ctx.receivedAt} (PKT)`,
    preheader: `${product} for ${name} in ${city}, delivery ${deliveryDate}, ${payment}.`,
    sections: [
      `
        <p style="${para}">
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
      `
        <p style="margin:0 0 10px;${label}">Payment</p>
        <p style="margin:0;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">${paymentNote}</p>`,
    ],
    buttons: [
      isBank && ctx.verifyUrl
        ? button(ctx.verifyUrl, "✓ Verify payment", true)
        : "",
      button(`mailto:${email}`, "Reply by email", !(isBank && ctx.verifyUrl)),
      button(`tel:${tel}`, "Call"),
      wa ? button(`https://wa.me/${wa}`, "WhatsApp") : "",
    ].join(""),
    footer: `Sent automatically by the order form at
      <a href="${SITE_URL}" style="${link}">happyhenspoultry.com</a>.
      Replying to this email goes straight to ${name}.`,
  });
}

function buildTeamText(e: ContactEnquiry, ctx: OrderCtx) {
  const isBank = e.payment === "Bank Transfer";
  const paymentLine = isBank
    ? ctx.receipt
      ? `Bank Transfer (receipt attached: ${ctx.receipt.filename})`
      : "Bank Transfer (no receipt attached yet)"
    : "Cash on delivery";
  return [
    "HAPPY HENS POULTRY",
    "New order request",
    `Order ${ctx.ref} · Received ${ctx.receivedAt} (PKT)`,
    "",
    `Product:       ${e.product}`,
    `Delivery date: ${formatDeliveryDate(e.deliveryDate)}`,
    `Payment:       ${paymentLine}`,
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
    ...(isBank && ctx.verifyUrl
      ? [
          "Once the transfer is received, verify the payment and notify the customer here:",
          ctx.verifyUrl,
          "",
        ]
      : []),
    "--",
    `Sent automatically by the order form at ${SITE_URL}.`,
    `Reply to this email to respond directly to ${e.name}.`,
    `Powered by ${COMPANY}.`,
  ].join("\n");
}

/* ---------- 2. confirmation (to the customer) ---------- */

function buildCustomerHtml(e: ContactEnquiry, ctx: OrderCtx) {
  const name = escapeHtml(e.name);
  const firstName = escapeHtml(e.name.split(/\s+/)[0] || e.name);
  const phone = escapeHtml(e.phone);
  const city = escapeHtml(e.city);
  const address = escapeHtml(e.address).replace(/\n/g, "<br>");
  const product = escapeHtml(e.product);
  const deliveryDate = escapeHtml(formatDeliveryDate(e.deliveryDate));
  const payment = escapeHtml(e.payment);
  const notes = escapeHtml(e.notes).replace(/\n/g, "<br>");
  const isBank = e.payment === "Bank Transfer";

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

  const paymentSection = isBank
    ? `
        <p style="margin:0 0 6px;${label}">How to pay</p>
        <p style="margin:0 0 12px;font-family:${FONT};font-size:15px;line-height:1.6;color:${C.text};">
          ${
            ctx.receipt
              ? `We've received your receipt (<strong>${escapeHtml(ctx.receipt.filename)}</strong>, attached to this email for your records). We'll verify it and send you a payment confirmation.`
              : `Once we confirm the total, transfer it to the account below and send us the receipt screenshot on WhatsApp or by replying to this email. You'll get a confirmation email as soon as we verify the payment.`
          }
        </p>
        ${bankDetailsTable()}`
    : "";
  const step3 = isBank
    ? "We deliver after your transfer is verified. Need to change anything? Just reply to this email."
    : "Pay by cash when your eggs arrive. Need to change anything? Just reply to this email.";

  return shell({
    title: `Thanks for your order, ${firstName}!`,
    subtitle: `Order ${ctx.ref} · Received ${ctx.receivedAt} (PKT)`,
    preheader: `We've received your request for ${product}, delivery ${deliveryDate}. We'll confirm within one business day.`,
    sections: [
      `
        <p style="${para}">
          Hi ${name}, we've received your order request. Our team will confirm
          availability, pricing and your delivery slot within one business day,
          by phone or email. Your order reference is <strong>${ctx.ref}</strong>.
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
      ...(paymentSection ? [paymentSection] : []),
      `
        <p style="margin:0 0 14px;${label}">What happens next</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${step(1, "We check availability", "Fresh eggs are packed to order, so we confirm stock for your date first.")}
          ${step(2, "We confirm with you", "Expect a call or WhatsApp message on " + phone + " with the final price and delivery time.")}
          ${step(3, "Delivery on " + deliveryDate, step3)}
        </table>`,
    ],
    buttons: [
      button(CONTACT.whatsapp, "WhatsApp us", true),
      button(`tel:${CONTACT.phone1Raw}`, "Call us"),
      button(SITE_URL, "Visit website"),
    ].join(""),
    footer: `${CUSTOMER_FOOTER}<br>
      You're receiving this because you placed an order request at
      <a href="${SITE_URL}" style="${link}">happyhenspoultry.com</a>.`,
  });
}

function buildCustomerText(e: ContactEnquiry, ctx: OrderCtx) {
  const bankLines =
    e.payment === "Bank Transfer"
      ? [
          "How to pay:",
          ctx.receipt
            ? `We've received your receipt (${ctx.receipt.filename}, attached). We'll verify it and send you a payment confirmation.`
            : "Once we confirm the total, transfer it to the account below and send us the receipt on WhatsApp or by replying to this email.",
          `Bank:    ${BANK.bank}, ${BANK.branch}`,
          `Title:   ${BANK.title}`,
          `Account: ${BANK.accountNumber}`,
          `IBAN:    ${BANK.iban}`,
          "",
        ]
      : [];
  return [
    "HAPPY HENS POULTRY",
    `Thanks for your order, ${e.name}!`,
    `Order ${ctx.ref} · Received ${ctx.receivedAt} (PKT)`,
    "",
    "We've received your order request. Our team will confirm availability,",
    "pricing and your delivery slot within one business day, by phone or email.",
    "",
    `Product:       ${e.product}`,
    `Delivery date: ${formatDeliveryDate(e.deliveryDate)}`,
    `Payment:       ${e.payment}`,
    "",
    `Name:      ${e.name}`,
    `Telephone: ${e.phone}`,
    `City:      ${e.city}`,
    `Address:   ${e.address}`,
    "",
    "Your notes:",
    e.notes || "None",
    "",
    ...bankLines,
    "Need to change anything? Reply to this email or WhatsApp us:",
    CONTACT.whatsapp,
    "",
    "--",
    `Happy Hens Poultry · Office: ${CONTACT.address.join(" ")} · Farm: ${CONTACT.farm.join(" ")}`,
    `${CONTACT.email} · ${CONTACT.phone1}`,
    SITE_URL,
    `Powered by ${COMPANY}.`,
  ].join("\n");
}

/* ---------- 3. payment verified (to the customer) ---------- */

function buildVerifiedHtml(p: OrderTokenPayload, verifiedAt: string) {
  const name = escapeHtml(p.name);
  const firstName = escapeHtml(p.name.split(/\s+/)[0] || p.name);
  const phone = escapeHtml(p.phone);
  const city = escapeHtml(p.city);
  const address = escapeHtml(p.address).replace(/\n/g, "<br>");
  const product = escapeHtml(p.product);
  const deliveryDate = escapeHtml(formatDeliveryDate(p.deliveryDate));

  return shell({
    title: `Payment verified, ${firstName}. Your order is confirmed.`,
    subtitle: `Order ${p.ref} · Verified ${verifiedAt} (PKT)`,
    preheader: `We've received your bank transfer for ${product}. Delivery on ${deliveryDate}.`,
    sections: [
      `
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
          <tr>
            <td style="padding:8px 14px;border-radius:999px;background:#e6f2ea;font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${C.success};">✓ Payment received</td>
          </tr>
        </table>
        <p style="${para}">
          Hi ${name}, thank you. We've verified your bank transfer and your
          order <strong>${p.ref}</strong> is now confirmed. Our team will
          pack it fresh and deliver on <strong>${deliveryDate}</strong>.
        </p>
        ${summaryCard(product, deliveryDate, "Bank transfer · Paid")}
        <p style="margin:0 0 4px;${label}">Delivery details</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.border};">
          ${detailRow("Name", name)}
          ${detailRow("Telephone", phone)}
          ${detailRow("City", city)}
          ${detailRow("Address", address, true)}
        </table>
        <p style="margin:18px 0 0;font-family:${FONT};font-size:14px;line-height:1.6;color:${C.muted};">
          Need to change the delivery date or address? Reply to this email or
          WhatsApp us and we'll sort it out.
        </p>`,
    ],
    buttons: [
      button(CONTACT.whatsapp, "WhatsApp us", true),
      button(`tel:${CONTACT.phone1Raw}`, "Call us"),
      button(SITE_URL, "Visit website"),
    ].join(""),
    footer: `${CUSTOMER_FOOTER}<br>
      You're receiving this because you placed order ${p.ref} at
      <a href="${SITE_URL}" style="${link}">happyhenspoultry.com</a>.`,
  });
}

function buildVerifiedText(p: OrderTokenPayload, verifiedAt: string) {
  return [
    "HAPPY HENS POULTRY",
    "Payment verified. Your order is confirmed.",
    `Order ${p.ref} · Verified ${verifiedAt} (PKT)`,
    "",
    `Hi ${p.name}, thank you. We've verified your bank transfer and your order`,
    `is now confirmed. We'll deliver on ${formatDeliveryDate(p.deliveryDate)}.`,
    "",
    `Product:       ${p.product}`,
    `Delivery date: ${formatDeliveryDate(p.deliveryDate)}`,
    "Payment:       Bank transfer (paid)",
    "",
    `Name:      ${p.name}`,
    `Telephone: ${p.phone}`,
    `City:      ${p.city}`,
    `Address:   ${p.address}`,
    "",
    "Need to change anything? Reply to this email or WhatsApp us:",
    CONTACT.whatsapp,
    "",
    "--",
    `Happy Hens Poultry · Office: ${CONTACT.address.join(" ")} · Farm: ${CONTACT.farm.join(" ")}`,
    `${CONTACT.email} · ${CONTACT.phone1}`,
    SITE_URL,
    `Powered by ${COMPANY}.`,
  ].join("\n");
}

/* ---------- send ---------- */

function client() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

/**
 * Sends the order notification to the team and a confirmation to the
 * customer, both with the receipt attached if one was uploaded. Throws if the
 * team email fails; a failed customer confirmation is logged but does not
 * fail the order, since the team already has it. Returns the order reference.
 */
export async function sendContactEnquiry(
  enquiry: ContactEnquiry,
  receipt?: Receipt
) {
  const resend = client();
  const now = new Date();
  const ref = makeOrderRef(now);
  const ctx: OrderCtx = { ref, receivedAt: formatReceivedAt(now), receipt };

  if (enquiry.payment === "Bank Transfer") {
    const token = signOrderToken({
      v: 1,
      ref,
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      city: enquiry.city,
      address: enquiry.address,
      product: enquiry.product,
      deliveryDate: enquiry.deliveryDate,
      iat: now.getTime(),
    });
    ctx.verifyUrl = `${SITE_URL}/orders/verify?token=${encodeURIComponent(token)}`;
  }

  const attachments = receipt
    ? [
        {
          filename: receipt.filename,
          content: receipt.content,
          contentType: receipt.contentType,
        },
      ]
    : undefined;

  const { name, city, email, product, deliveryDate } = enquiry;

  const team = await resend.emails.send({
    from: FROM,
    to: CONTACT_RECIPIENTS,
    replyTo: email,
    subject: `New order ${ref}: ${product} · ${name} · ${city}`,
    text: buildTeamText(enquiry, ctx),
    html: buildTeamHtml(enquiry, ctx),
    attachments,
  });
  if (team.error) {
    throw new Error(`Resend: ${team.error.name} – ${team.error.message}`);
  }

  const customer = await resend.emails.send({
    from: FROM,
    to: [email],
    replyTo: CONTACT.email,
    subject: `Your Happy Hens order ${ref} · ${product} for ${formatDeliveryDate(deliveryDate)}`,
    text: buildCustomerText(enquiry, ctx),
    html: buildCustomerHtml(enquiry, ctx),
    attachments,
  });
  if (customer.error) {
    console.error(
      "[contact-form] customer confirmation failed",
      customer.error
    );
  }

  return ref;
}

/**
 * Sent when the team presses "Verify payment" on a bank-transfer order.
 * Goes to the customer, with a copy to the sales inbox for the record.
 */
export async function sendPaymentVerifiedEmail(p: OrderTokenPayload) {
  const resend = client();
  const verifiedAt = formatReceivedAt(new Date());

  const { error } = await resend.emails.send({
    from: FROM,
    to: [p.email],
    bcc: [CONTACT.email],
    replyTo: CONTACT.email,
    subject: `Payment verified · Order ${p.ref} confirmed for ${formatDeliveryDate(p.deliveryDate)}`,
    text: buildVerifiedText(p, verifiedAt),
    html: buildVerifiedHtml(p, verifiedAt),
  });
  if (error) {
    throw new Error(`Resend: ${error.name} – ${error.message}`);
  }
}
