"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type FormState } from "../actions";
import { CITIES, PAYMENT_METHODS, PRODUCTS } from "../../lib/order";

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

  // Applied after mount so server and client markup match during hydration.
  const dateRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (dateRef.current) dateRef.current.min = todayISO();
  }, []);

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
          {PAYMENT_METHODS.map((m, i) => (
            <label
              key={m}
              className="inline-flex items-center gap-2.5 text-[15px] text-foreground cursor-pointer"
            >
              <input
                type="radio"
                name="payment"
                value={m}
                required
                defaultChecked={i === 0}
                className="h-4 w-4 accent-accent"
              />
              {m}
            </label>
          ))}
        </div>
      </fieldset>

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
