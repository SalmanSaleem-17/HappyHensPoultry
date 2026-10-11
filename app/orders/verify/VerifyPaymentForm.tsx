"use client";

import { useActionState } from "react";
import { confirmPaymentVerified, type FormState } from "../../actions";

const initial: FormState = { status: "idle", message: "" };

export default function VerifyPaymentForm({ token }: { token: string }) {
  const [state, formAction, pending] = useActionState(
    confirmPaymentVerified,
    initial
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="mt-8 px-4 py-3 text-sm border bg-accent-soft text-accent border-accent/30"
      >
        {state.message}
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <input type="hidden" name="token" value={token} />

      {state.status === "error" && (
        <div
          role="alert"
          className="px-4 py-3 text-sm border bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800"
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-surface text-sm font-medium px-7 py-4 rounded-full transition-colors"
      >
        {pending ? "Sending confirmation…" : "✓ Confirm payment & email customer"}
      </button>
      <p className="text-xs text-muted">
        This emails the customer and notifies the whole team. Press it once.
      </p>
    </form>
  );
}
