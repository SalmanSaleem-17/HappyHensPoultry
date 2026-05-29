import { DELIVERY } from "../../lib/data";

/**
 * Delivery-tier display: two side-by-side cards showing local + bulk delivery.
 * Used on `/eggs` and `/` (home). Lives in one place so a policy change
 * only edits `DELIVERY` in `lib/data.ts`.
 *
 * `compact` (optional) — drops the left-side intro column on the home page so
 * the section is shorter when sitting between Products and the Closing CTA.
 */
export default function DeliveryNetwork({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className="border border-border bg-background p-6 sm:p-10 lg:p-12">
      <div
        className={
          compact
            ? "grid gap-7 sm:gap-8"
            : "grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 items-start"
        }
      >
        {!compact && (
          <div className="lg:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-3 sm:mb-4">
              Delivery network
            </div>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-tight text-balance">
              Local in Punjab —{" "}
              <span className="italic text-accent">
                nationwide on bulk orders.
              </span>
            </h3>
            <p className="mt-3 text-muted text-sm sm:text-base">
              Two delivery tiers, both covered by our team.
            </p>
          </div>
        )}

        <div
          className={`grid sm:grid-cols-2 gap-4 sm:gap-5 ${
            compact ? "" : "lg:col-span-7"
          }`}
        >
          {/* LOCAL TIER */}
          <div className="border border-border-strong bg-surface p-5 sm:p-6 flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold mb-2">
              {DELIVERY.local.label}
            </div>
            <div className="font-display text-xl sm:text-2xl text-foreground leading-snug">
              {DELIVERY.local.minOrder}
            </div>
            <p className="mt-2 text-muted text-[13px] sm:text-sm leading-relaxed">
              {DELIVERY.local.note}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {DELIVERY.local.cities.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-accent/30 bg-accent-soft text-[11px] sm:text-xs font-medium text-accent"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* BULK TIER */}
          <div className="border border-border-strong bg-surface p-5 sm:p-6 flex flex-col">
            <div className="text-[10px] uppercase tracking-[0.22em] text-highlight font-semibold mb-2 flex items-center gap-1.5">
              {DELIVERY.bulk.label}
              <span className="text-muted normal-case tracking-normal">
                · {DELIVERY.bulk.minTrays}+ trays
              </span>
            </div>
            <div className="font-display text-xl sm:text-2xl text-foreground leading-snug">
              {DELIVERY.bulk.minOrder}
            </div>
            <p className="mt-2 text-muted text-[13px] sm:text-sm leading-relaxed">
              {DELIVERY.bulk.note}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2">
              {DELIVERY.bulk.cities.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 border border-border-strong text-[11px] sm:text-xs font-medium text-foreground/80"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-highlight" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
