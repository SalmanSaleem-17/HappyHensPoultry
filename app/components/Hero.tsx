import Image from "next/image";
import Link from "next/link";
import { INSIGHTS } from "../../lib/data";

// 8 stats arranged around a central egg in a 3×3 grid.
// Slot order (top-left → bottom-right, center is the egg overlay):
//   1   2   3
//   4  egg  5
//   6   7   8
const SLOT_ALIGN = [
  "start",
  "center",
  "end",
  "start",
  "end",
  "start",
  "center",
  "end",
] as const;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative hero-bg overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-highlight/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      <div className="relative max-w-350 mx-auto px-5 sm:px-8 lg:px-12 pb-8 sm:pb-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-5 animate-fade-in">
            {/* Attractor pill — category tagline (replaces the plain eyebrow) */}
            <div className="inline-flex items-center gap-2.5 bg-accent-soft border border-accent/25 rounded-full pl-2.5 pr-4 py-1.5 mb-3 sm:mb-4 shadow-sm mt-2">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping"></span>
                <span className="relative inline-flex w-2 h-2 rounded-full bg-accent"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold text-accent whitespace-nowrap">
                Organic Eggs · Open Poultry Farm
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6.5vw,5rem)] font-medium text-foreground leading-[0.95] tracking-tight text-balance">
              Eggs from{" "}
              <span className="italic text-accent">truly happy</span> hens.
            </h1>

            <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-muted font-semibold">
              <span className="w-6 h-px bg-border-strong"></span>
              Free Range · Pakistan
            </div>

            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted max-w-md leading-relaxed text-pretty">
              We raise{" "}
              <span className="text-foreground font-medium">
                Lohmann Brown &amp; Black
              </span>{" "}
              hens in open sheds — no cages, no artificial light. Just
              sunshine, organic feed, and room to roam.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
              <Link
                href="/contact"
                className="cta-premium inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface text-sm font-medium px-6 sm:px-7 py-3.5 sm:py-4 rounded-full"
              >
                Order fresh eggs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group border-b border-foreground/20 hover:border-accent pb-1"
              >
                Read our story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust badges — printed on every Happy Hens carton */}
            <ul className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-5 gap-y-2.5 sm:gap-x-6 text-[11px] sm:text-[13px] font-medium text-foreground/80">
              {[
                "Fresh Eggs Daily",
                "Clean & Hygienic",
                "Farm to Table",
              ].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — insights radiating around the egg */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto w-full max-w-md sm:max-w-xl lg:max-w-2xl">
              {/* 3×3 grid: stats fill 8 cells, center cell is a sizing spacer */}
              <div className="relative grid grid-cols-3 grid-rows-3 gap-2 sm:gap-5 lg:gap-6">
                <InsightSlot insight={INSIGHTS[0]} align={SLOT_ALIGN[0]} />
                <InsightSlot insight={INSIGHTS[1]} align={SLOT_ALIGN[1]} />
                <InsightSlot insight={INSIGHTS[2]} align={SLOT_ALIGN[2]} />

                <InsightSlot insight={INSIGHTS[3]} align={SLOT_ALIGN[3]} />
                {/* Center spacer — defines the row height; egg overlays this */}
                <div className="aspect-square" aria-hidden="true" />
                <InsightSlot insight={INSIGHTS[4]} align={SLOT_ALIGN[4]} />

                <InsightSlot insight={INSIGHTS[5]} align={SLOT_ALIGN[5]} />
                <InsightSlot insight={INSIGHTS[6]} align={SLOT_ALIGN[6]} />
                <InsightSlot insight={INSIGHTS[7]} align={SLOT_ALIGN[7]} />
              </div>

              {/* Egg + glow + orbit rings overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Soft warm glow behind the egg */}
                <div className="absolute w-[44%] sm:w-[54%] lg:w-[55%] aspect-square rounded-full bg-highlight-soft/70 blur-2xl" />
                {/* Outer dashed orbit */}
                <div className="absolute w-[50%] sm:w-[60%] lg:w-[58%] aspect-square rounded-full border border-dashed border-accent/25" />
                {/* Inner dashed orbit */}
                <div className="absolute w-[38%] sm:w-[46%] lg:w-[44%] aspect-square rounded-full border border-dashed border-accent/15" />
                {/* The egg itself */}
                <Image
                  src="/insights.svg"
                  alt="Free-range brown egg"
                  width={420}
                  height={420}
                  priority
                  className="relative w-[34%] sm:w-[44%] lg:w-[44%] aspect-square object-contain drop-shadow-[0_28px_40px_rgba(123,80,40,0.32)] animate-float"
                />
              </div>
            </div>

            {/* Brand tagline — the slogan printed on every Happy Hens carton */}
            <div className="mt-5 sm:mt-7 lg:mt-8 flex items-center justify-center gap-4 sm:gap-5">
              <span aria-hidden="true" className="h-px flex-1 max-w-12 sm:max-w-16 bg-accent/30"></span>
              <p className="font-display italic text-xl sm:text-2xl lg:text-3xl text-accent leading-none text-center">
                Pure Goodness in Every Shell
              </p>
              <span aria-hidden="true" className="h-px flex-1 max-w-12 sm:max-w-16 bg-accent/30"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightSlot({
  insight,
  align,
}: {
  insight: { value: string; label: string; kind: "more" | "less" };
  align: "start" | "center" | "end";
}) {
  const alignClass =
    align === "start"
      ? "items-start text-left"
      : align === "end"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <div
      className={`flex flex-col justify-center ${alignClass} px-0.5 sm:px-2`}
    >
      <div
        className={`flex items-baseline gap-1 sm:gap-1.5 ${
          align === "end" ? "flex-row-reverse" : ""
        }`}
      >
        <span className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-accent leading-none">
          {insight.value}
        </span>
        <span
          className={`text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold ${
            insight.kind === "more" ? "text-accent" : "text-highlight"
          }`}
        >
          {insight.kind}
        </span>
      </div>
      <div className="mt-1 text-[10px] sm:text-[11px] lg:text-[12px] text-muted leading-tight font-medium">
        {insight.label}
      </div>
    </div>
  );
}
