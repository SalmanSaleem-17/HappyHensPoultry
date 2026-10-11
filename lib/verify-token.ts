import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Signed, self-contained order tokens.
 *
 * The "Verify payment" link in the team email carries the order details in a
 * token signed with HMAC-SHA256, so no database is needed and nobody can forge
 * a verification for an order we never sent.
 */

export type OrderTokenPayload = {
  v: 1;
  ref: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  product: string;
  deliveryDate: string;
  /** Issued at, ms since epoch */
  iat: number;
};

const MAX_AGE_MS = 60 * 24 * 60 * 60 * 1000; // 60 days

function secret() {
  const s = process.env.ORDER_SIGNING_SECRET ?? process.env.RESEND_API_KEY;
  if (!s) {
    throw new Error("ORDER_SIGNING_SECRET (or RESEND_API_KEY) is not set");
  }
  return s;
}

function sign(body: string) {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

/** e.g. HH-261011-K7PQ */
export function makeOrderRef(date = new Date()) {
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(4);
  let tail = "";
  for (let i = 0; i < 4; i++) tail += alphabet[bytes[i] % alphabet.length];
  return `HH-${ymd}-${tail}`;
}

export function signOrderToken(payload: OrderTokenPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export type VerifyResult =
  | { ok: true; payload: OrderTokenPayload }
  | { ok: false; reason: "invalid" | "expired" };

export function verifyOrderToken(token: string): VerifyResult {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return { ok: false, reason: "invalid" };

  const body = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(sign(body));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return { ok: false, reason: "invalid" };
  }

  let payload: OrderTokenPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (payload?.v !== 1 || typeof payload.iat !== "number") {
    return { ok: false, reason: "invalid" };
  }
  if (Date.now() - payload.iat > MAX_AGE_MS) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, payload };
}
