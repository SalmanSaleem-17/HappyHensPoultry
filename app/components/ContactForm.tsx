"use client";

import { useActionState } from "react";
import { submitContact, type FormState } from "../actions";

const initial: FormState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <Field
          label="Full name"
          name="name"
          type="text"
          placeholder="Your name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field
          label="Phone"
          name="phone"
          type="tel"
          placeholder="+92 300 0000000"
        />
        <div className="space-y-2">
          <label
            htmlFor="city"
            className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-muted"
          >
            City
          </label>
          <select
            id="city"
            name="city"
            defaultValue=""
            className="w-full px-0 py-2.5 border-0 border-b border-border bg-transparent text-foreground focus:outline-none focus:border-accent transition-colors text-[15px]"
          >
            <option value="" disabled>
              Choose your city
            </option>
            <option value="Lahore">Lahore</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Jhang">Jhang</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="How many trays do you need?"
          className="w-full px-0 py-2.5 border-0 border-b border-border bg-transparent text-foreground placeholder:text-subtle focus:outline-none focus:border-accent transition-colors resize-none text-[15px]"
        />
      </div>

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
              Send message
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

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-[10px] uppercase tracking-[0.22em] font-semibold text-muted"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-0 py-2.5 border-0 border-b border-border bg-transparent text-foreground placeholder:text-subtle focus:outline-none focus:border-accent transition-colors text-[15px]"
      />
    </div>
  );
}
