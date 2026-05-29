import { CERTIFICATION } from "../../lib/data";

/**
 * Government of Pakistan — PCSIR lab test certificate display.
 *
 * Substantiates every nutrition claim on the site with hard numbers from
 * an independent, government-accredited laboratory test (UNICERT SAS K004).
 *
 * Single source of truth lives in `lib/data.ts → CERTIFICATION`.
 */
export default function CertificationPanel() {
  return (
    <div className="border border-border-strong bg-surface overflow-hidden">
      {/* HEADER STRIP — government identity */}
      <div className="bg-accent text-surface px-5 sm:px-8 lg:px-10 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5">
        <div className="flex items-center gap-4">
          {/* Seal */}
          <span
            aria-hidden="true"
            className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-highlight/80 flex items-center justify-center"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight">
              <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-highlight font-semibold mb-0.5">
              ✦ Independently certified
            </div>
            <div className="font-display text-lg sm:text-xl lg:text-2xl leading-snug">
              {CERTIFICATION.issuer.authority} ·{" "}
              <span className="italic">PCSIR Laboratories</span>
            </div>
          </div>
        </div>
        <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-surface/80 font-medium sm:text-right">
          {CERTIFICATION.issuer.accreditation}
        </div>
      </div>

      {/* INTRO + REPORT META */}
      <div className="grid lg:grid-cols-12 gap-7 sm:gap-8 lg:gap-12 px-5 sm:px-8 lg:px-10 py-7 sm:py-9 lg:py-10">
        <div className="lg:col-span-5">
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-tight tracking-tight text-balance">
            Government-tested.{" "}
            <span className="italic text-accent">
              Numbers backed by paper.
            </span>
          </h3>
          <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed">
            Every nutrition claim on this site is verified by an independent
            test at the{" "}
            <span className="text-foreground font-medium">
              {CERTIFICATION.issuer.lab}
            </span>{" "}
            — a {CERTIFICATION.issuer.ministry} accredited laboratory.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-x-5 gap-y-5 sm:gap-x-8 sm:gap-y-6 self-start">
          <Meta label="Report No." value={CERTIFICATION.report.number} />
          <Meta label="Issued" value={CERTIFICATION.report.issued} />
          <Meta label="Method" value={CERTIFICATION.report.method} />
          <Meta label="Sample" value={CERTIFICATION.report.sample} />
          <Meta
            label="Non-compliance"
            value={CERTIFICATION.report.nonCompliance}
            highlight
          />
          <Meta label="Issuer" value={CERTIFICATION.issuer.ministry} />
        </div>
      </div>

      {/* RESULTS GRID — per 100 g of egg */}
      <div className="border-t border-border bg-surface-2 px-5 sm:px-8 lg:px-10 py-7 sm:py-9 lg:py-10">
        <div className="flex items-end justify-between gap-4 mb-5 sm:mb-7 pb-4 border-b border-border">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold mb-1">
              Results
            </div>
            <div className="font-display text-lg sm:text-xl text-foreground leading-snug">
              Per 100 g of one Happy Hens egg
            </div>
          </div>
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-medium hidden sm:block">
            11 parameters tested
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
          {CERTIFICATION.results.map((r) => (
            <li
              key={r.label}
              className={`bg-surface p-4 sm:p-5 flex flex-col ${
                r.highlight ? "ring-1 ring-inset ring-accent/30" : ""
              }`}
            >
              <div
                className={`text-[10px] uppercase tracking-[0.22em] font-semibold ${
                  r.highlight ? "text-accent" : "text-muted"
                }`}
              >
                {r.label}
              </div>
              <div className="mt-1.5 flex items-baseline gap-1">
                <span className="font-display text-2xl sm:text-3xl lg:text-[2rem] text-foreground font-medium leading-none">
                  {r.value}
                </span>
                <span className="text-[11px] sm:text-xs text-muted font-medium">
                  {r.unit}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ACTIONS — view + download the actual test report */}
      <div className="border-t border-border px-5 sm:px-8 lg:px-10 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-[12px] sm:text-[13px] text-muted leading-snug max-w-md">
          Want the full test report? View it in your browser or save a copy
          for your records.
        </p>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={CERTIFICATION.document.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] px-4 py-2.5 rounded-full transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Certificate
          </a>
          <a
            href={CERTIFICATION.document.url}
            download={CERTIFICATION.document.downloadAs}
            className="inline-flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-surface text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] px-4 py-2.5 rounded-full transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <path d="M7 10l5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
            Download
          </a>
        </div>
      </div>

      {/* FOOTER ATTRIBUTION */}
      <div className="border-t border-border bg-surface-2/40 px-5 sm:px-8 lg:px-10 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-medium">
        <span className="inline-flex items-center gap-2">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
            <path d="M9 12l2 2 4-4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Verified · Ministry of Science &amp; Technology, Pakistan
        </span>
        <span>Ferozepur Road, Lahore · 54600</span>
      </div>
    </div>
  );
}

function Meta({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold mb-1.5">
        {label}
      </div>
      <div
        className={`text-sm sm:text-[15px] font-medium leading-snug ${
          highlight ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
