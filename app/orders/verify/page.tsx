import type { Metadata } from "next";
import Link from "next/link";
import { formatDeliveryDate } from "../../../lib/order";
import { verifyOrderToken } from "../../../lib/verify-token";
import VerifyPaymentForm from "./VerifyPaymentForm";

export const metadata: Metadata = {
  title: "Verify payment — Happy Hens Poultry",
  robots: { index: false, follow: false },
};

export default async function VerifyPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const raw = (await searchParams).token;
  const token = Array.isArray(raw) ? raw[0] : raw;
  const result = token
    ? verifyOrderToken(token)
    : ({ ok: false, reason: "invalid" } as const);

  return (
    <section className="relative pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 bg-surface overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-2xl mx-auto px-5 sm:px-8">
        <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-4">
          ✦ Team only
        </div>

        {!result.ok ? (
          <div className="bg-background border border-border p-6 sm:p-9">
            <h1 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-3">
              {result.reason === "expired"
                ? "This link has expired"
                : "This link is not valid"}
            </h1>
            <p className="text-muted text-sm sm:text-[15px] leading-relaxed">
              {result.reason === "expired"
                ? "Verification links work for 60 days after the order was placed. Please email the customer directly from the order notification."
                : "Open the Verify payment button from the order notification email in the sales inbox. If you copied the link by hand, make sure it was not cut short."}
            </p>
            <Link
              href="/"
              className="inline-block mt-6 text-sm text-accent hover:underline"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <div className="bg-background border border-border p-6 sm:p-9">
            <h1 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-2">
              Verify payment for order {result.payload.ref}
            </h1>
            <p className="text-muted text-sm sm:text-[15px] leading-relaxed mb-7">
              Confirm only after the bank transfer shows in the Bank Alfalah
              account. Pressing the button emails the customer that their
              payment was verified and the order is confirmed.
            </p>

            <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-[15px] border-t border-border pt-5">
              <Row label="Customer">{result.payload.name}</Row>
              <Row label="Telephone">{result.payload.phone}</Row>
              <Row label="Email">{result.payload.email}</Row>
              <Row label="City">{result.payload.city}</Row>
              <Row label="Product">{result.payload.product}</Row>
              <Row label="Delivery date">
                {formatDeliveryDate(result.payload.deliveryDate)}
              </Row>
              <div className="sm:col-span-2">
                <Row label="Address">{result.payload.address}</Row>
              </div>
            </dl>

            <VerifyPaymentForm token={token!} />
          </div>
        )}
      </div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.22em] font-semibold text-muted mb-1">
        {label}
      </dt>
      <dd className="text-foreground whitespace-pre-line">{children}</dd>
    </div>
  );
}
