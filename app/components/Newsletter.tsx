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
    <div className="space-y-3 w-full">
      <form
        action={formAction}
        className="flex items-stretch border-b border-border-strong focus-within:border-accent transition-colors"
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
          className="flex-1 bg-transparent py-3.5 sm:py-4 pr-4 text-foreground placeholder:text-subtle focus:outline-none text-base"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 text-accent hover:text-accent-hover disabled:opacity-60 text-xs font-semibold uppercase tracking-[0.22em] py-3.5 sm:py-4 transition-colors whitespace-nowrap"
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
