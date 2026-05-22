"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type FormState } from "../actions";

const initial: FormState = { status: "idle", message: "" };

export default function Newsletter() {
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initial
  );

  return (
    <div className="w-full space-y-3">
      {/*
        Mobile:  input pill on top + accent CTA pill below (full-width)
        Tablet+: inline underline form (input + subscribe text link share a single border-b)
      */}
      <form
        action={formAction}
        className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-stretch sm:border-b sm:border-border-strong sm:focus-within:border-accent sm:transition-colors"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>

        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
          className="min-w-0 flex-1 w-full sm:w-auto bg-background sm:bg-transparent border border-border-strong sm:border-0 rounded-full sm:rounded-none px-5 sm:px-0 py-3 sm:py-4 sm:pr-4 text-foreground placeholder:text-subtle focus:outline-none focus:border-accent sm:focus:border-transparent transition-colors text-base"
        />

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full sm:w-auto items-center justify-center sm:justify-start gap-2 bg-accent sm:bg-transparent text-surface sm:text-accent hover:bg-accent-hover sm:hover:bg-transparent sm:hover:text-accent-hover disabled:opacity-60 rounded-full sm:rounded-none px-6 sm:px-0 py-3 sm:py-4 text-xs font-semibold uppercase tracking-[0.22em] whitespace-nowrap transition-colors"
        >
          {pending ? "Sending" : "Subscribe"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </form>

      <p className="text-xs text-muted leading-relaxed">
        By subscribing you agree to receive our occasional emails. Unsubscribe
        anytime.
      </p>

      {state.status !== "idle" && (
        <p
          role="status"
          aria-live="polite"
          className={`text-sm font-medium ${
            state.status === "success" ? "text-accent" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
