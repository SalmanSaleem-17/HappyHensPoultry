/** Shared option lists for the order / contact form. Safe to import on client and server. */

export const PRODUCTS = [
  "6 Eggs Pack",
  "12 Eggs Pack",
  "30 Eggs Tray",
] as const;
export type Product = (typeof PRODUCTS)[number];

export const PAYMENT_METHODS = ["Cash", "Bank Transfer"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const CITIES = [
  "Lahore",
  "Faisalabad",
  "Islamabad",
  "Jhang",
  "Other",
] as const;

/** Company that operates Happy Hens Poultry and receives payments. */
export const COMPANY = "3CORE Traders (Private) Limited";

/** Bank account for "Bank Transfer" payments. */
export const BANK = {
  bank: "Bank Alfalah",
  branch: "Jail Road Branch, Lahore",
  title: COMPANY,
  accountNumber: "06121011431886",
  iban: "PK43ALFH0612001011431886",
} as const;

/** Accepted payment-receipt uploads. */
export const RECEIPT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;
export const RECEIPT_ACCEPT = RECEIPT_TYPES.join(",");
export const MAX_RECEIPT_BYTES = 5 * 1024 * 1024; // 5 MB

export type OrderEnquiry = {
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  product: Product;
  /** ISO date, YYYY-MM-DD */
  deliveryDate: string;
  notes: string;
  payment: PaymentMethod;
};

/** Today's date as YYYY-MM-DD in Pakistan time. */
export function todayInPakistan() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** "2026-10-13" → "Tue, 13 Oct 2026". Returns the input unchanged if it is not a valid date. */
export function formatDeliveryDate(iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}
