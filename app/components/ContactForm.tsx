"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact, type FormState } from "../actions";
import {
  BANK,
  CITIES,
  MAX_RECEIPT_BYTES,
  PAYMENT_METHODS,
  PRODUCTS,
  RECEIPT_ACCEPT,
  type PaymentMethod,
} from "../../lib/order";

const initial: FormState = { status: "idle", message: "" };

const labelClass =
  "block text-[10px] uppercase tracking-[0.22em] font-semibold text-muted";
const inputClass =
  "w-full px-0 py-2.5 border-0 border-b border-border bg-transparent text-foreground placeholder:text-subtle focus:outline-none focus:border-accent transition-colors text-[15px]";

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
function todayISO() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const [payment, setPayment] = useState<PaymentMethod>(PAYMENT_METHODS[0]);
  const [receiptError, setReceiptError] = useState("");

  // Applied after mount so server and client markup match during hydration.
  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayISO();
  }, []);

  function checkReceipt(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.size > MAX_RECEIPT_BYTES) {
      setReceiptError("That file is over 5 MB. Please choose a smaller image.");
      e.target.value = "";
    } else {
      setReceiptError("");
    }
  }

  return (
    <form action={formAction} className="relative space-y-6">
      {/* Honeypot — hidden from humans, bots tend to fill it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-0 top-0 h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid sm:grid-cols-2 gap-6">
        <Field
          label="Name"
          name="name"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          required
        />
        <Field
          label="Telephone"
          name="phone"
          type="tel"
          placeholder="+92 300 0000000"
          autoComplete="tel"
          required
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <div className="space-y-2">
          <label htmlFor="city" className={labelClass}>
            City<Req />
          </label>
          <select
            id="city"
            name="city"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Choose your city
            </option>
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className={labelClass}>
          Complete delivery address<Req />
        </label>
        <textarea
          id="address"
          name="address"
          rows={2}
          required
          autoComplete="street-address"
          placeholder="House / shop no., street, area, nearest landmark"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="product" className={labelClass}>
            Product order<Req />
          </label>
          <select
            id="product"
            name="product"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Choose a pack
            </option>
            {PRODUCTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="deliveryDate" className={labelClass}>
            Delivery date<Req />
          </label>
          <input
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            required
            ref={dateRef}
            className={`${inputClass} scheme-light dark:scheme-dark`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className={labelClass}>
          Special notes / instructions
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Preferred delivery time, gate instructions, anything else we should know"
          className={`${inputClass} resize-none`}
        />
      </div>

      <fieldset className="space-y-3">
        <legend className={labelClass}>
          Payment<Req />
        </legend>
        <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
          {PAYMENT_METHODS.map((m) => (
            <label
              key={m}
              className="inline-flex items-center gap-2.5 text-[15px] text-foreground cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={m}
                required
                checked={payment === m}
                onChange={() => setPayment(m)}
                className="h-4 w-4 accent-accent"
              />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

      {payment === "Bank Transfer" && (
        <div className="border border-border bg-surface p-5 sm:p-6 space-y-5">
          <p className="text-sm text-muted leading-relaxed">
            Transfer to the account below. If you have already paid, attach a
            screenshot of the receipt. Otherwise we&apos;ll confirm the total
            first and you can send the receipt on WhatsApp.
          </p>
          <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-[14px]">
            <BankRow label="Bank">
              {BANK.bank}, {BANK.branch}
            </BankRow>
            <BankRow label="Account title">{BANK.title}</BankRow>
            <BankRow label="Account number">
              <span className="font-mono tracking-wide">
                {BANK.accountNumber}
              </span>
            </BankRow>
            <BankRow label="IBAN">
              <span className="font-mono tracking-wide break-all">
                {BANK.iban}
              </span>
            </BankRow>
          </dl>
          <div className="space-y-2">
            <label htmlFor="receipt" className={labelClass}>
              Payment receipt (screenshot)
            </label>
            <input
              id="receipt"
              name="receipt"
              type="file"
              accept={RECEIPT_ACCEPT}
              onChange={checkReceipt}
              className="block w-full text-[14px] text-foreground file:mr-4 file:rounded-full file:border file:border-border file:bg-background file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent hover:file:border-accent file:cursor-pointer"
            />
            <p className="text-xs text-muted">
              JPG, PNG, WebP or PDF, up to 5 MB. Optional.
            </p>
            {receiptError && (
              <p className="text-xs text-red-700 dark:text-red-300">
                {receiptError}
              </p>
            )}
          </div>
        </div>
      )}

      {state.status !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          className={`px-4 py-3 text-sm border ${
            state.status === "success"
              ? "bg-accent-soft text-accent border-accent/30"
              : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="pt-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-surface text-sm font-medium px-7 py-4 rounded-full transition-colors"
        >
          {pending ? (
            <>
              <svg
                className="animate-spin"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="50 100"
                  strokeLinecap="round"
                />
              </svg>
              Sending
            </>
          ) : (
            <>
              Place order
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Req() {
  return <span className="text-accent ml-1">*</span>;
}

function BankRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted mb-1">
        {label}
      </dt>
      <dd className="text-foreground">{children}</dd>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <Req />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}
