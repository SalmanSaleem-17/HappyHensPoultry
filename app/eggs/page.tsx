import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ProductFlipImage from "../components/ProductFlipImage";
import { InsightStat } from "../components/helpers";
import {
  IMG,
  PRODUCTS,
  WHY_DIFFERENT,
  INSIGHTS,
} from "../../lib/data";
import DeliveryNetwork from "../components/DeliveryNetwork";
import CertificationPanel from "../components/CertificationPanel";

export const metadata: Metadata = {
  title: "Our Eggs — Happy Hens Poultry",
  description:
    "Free-range organic eggs from Lohmann Brown & Black hens — Half Dozen, Dozen, and Family Pack. Naturally rich in Vitamin D, Omega-3 and protein.",
};

export default function EggsPage() {
  return (
    <>
      <PageHero
        eyebrow="No. 01 — Our Eggs"
        title="One product. Done with care."
        italicWord="Done with care."
        intro="Half dozen, dozen, or family pack — every tray is hand-collected, candled, and sealed at our farm before it ships."
      />

      {/* PRODUCTS */}
      <section className="py-16 sm:py-24 lg:py-28 bg-surface border-y border-border">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {PRODUCTS.map((p) => (
              <article
                key={p.name}
                className={`group relative bg-background border transition-all hover:-translate-y-1 ${
                  p.popular
                    ? "border-accent sm:col-span-2 lg:col-span-1"
                    : "border-border hover:border-foreground/30"
                }`}
              >
                {p.popular && (
                  <div className="absolute top-0 right-0 z-10 bg-accent text-surface text-[10px] font-medium uppercase tracking-[0.22em] px-3 py-2">
                    ★ Most Loved
                  </div>
                )}
                <ProductFlipImage
                  open={p.imageOpen}
                  closed={p.imageClosed}
                  alt={`${p.name} — Happy Hens packaging`}
                />
                <div className="p-6 sm:p-8 lg:p-9">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                      {p.count}
                    </div>
                    <div className="font-display text-lg sm:text-xl text-accent">
                      {p.price}
                    </div>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-muted mt-2 sm:mt-3 leading-relaxed text-sm sm:text-[15px]">
                    {p.desc}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 sm:mt-7 inline-flex items-center gap-2 font-medium text-sm text-foreground hover:text-accent transition-colors group/link"
                  >
                    Order this size
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-0.5 transition-transform">
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Delivery network — two tiers, single source in lib/data.ts → DELIVERY */}
          <div className="mt-14 sm:mt-16 lg:mt-20">
            <DeliveryNetwork />
          </div>
        </div>
      </section>

      {/* WHY OUR EGGS ARE DIFFERENT */}
      <section
        id="why-different"
        className="py-16 sm:py-24 lg:py-28 bg-background scroll-mt-20"
      >
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                No. 02 — From the Box
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                Why our eggs are{" "}
                <span className="italic text-accent">different.</span>
              </h2>
              <p className="mt-5 text-muted text-base sm:text-lg max-w-xl">
                Seven reasons we promise on every carton — printed straight
                on the box, lived every day on the farm.
              </p>
            </div>
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {WHY_DIFFERENT.map((item, i) => {
              const isLast = i === WHY_DIFFERENT.length - 1;
              return (
                <li
                  key={item.title}
                  className={`group bg-surface p-7 sm:p-9 lg:p-10 hover:bg-background transition-colors ${
                    isLast
                      ? "sm:col-span-2 lg:col-span-3 flex"
                      : "flex flex-col"
                  }`}
                >
                  {isLast ? (
                    <div className="w-full grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
                      {/* Left — the body content */}
                      <div className="lg:col-span-7">
                        <div className="flex items-baseline gap-3 mb-4">
                          <span className="font-display text-3xl text-accent font-medium leading-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 h-px bg-border self-center"></span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-snug">
                          {item.title}
                        </h3>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-muted leading-relaxed max-w-2xl">
                          {item.body}
                        </p>
                      </div>

                      {/* Right — stat callout + CTA */}
                      <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border flex flex-col gap-5 sm:gap-6">
                        <div className="grid grid-cols-2 gap-5 sm:gap-6">
                          <div>
                            <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-accent font-medium leading-none">
                              2
                            </div>
                            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted mt-2 sm:mt-3 font-medium">
                              Eggs / day,
                              <br />
                              every day
                            </div>
                          </div>
                          <div>
                            <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-accent font-medium leading-none">
                              6g
                            </div>
                            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted mt-2 sm:mt-3 font-medium">
                              Complete
                              <br />
                              protein each
                            </div>
                          </div>
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface text-sm font-medium px-6 py-3.5 rounded-full transition-colors w-fit"
                        >
                          Start a daily delivery
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-display text-3xl text-accent font-medium leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 h-px bg-border self-center"></span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-[15px] text-muted leading-relaxed flex-1">
                        {item.body}
                      </p>
                    </>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* INSIGHTS */}
      <section
        id="insights"
        className="relative py-16 sm:py-24 lg:py-28 bg-surface border-y border-border overflow-hidden scroll-mt-20"
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-highlight/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
            <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
              No. 03 — Insights
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
              Organic vs ordinary —{" "}
              <span className="italic text-accent">the numbers.</span>
            </h2>
            <p className="mt-5 text-muted text-base sm:text-lg">
              How one Happy Hens egg compares to a typical farm egg. Based on
              research published on our packaging.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6 order-2 lg:order-1">
              {INSIGHTS.slice(0, 4).map((s) => (
                <InsightStat key={s.label} {...s} align="right" />
              ))}
            </div>

            <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center">
              <div className="relative w-full max-w-xs aspect-square flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-highlight-soft/40 blur-2xl" />
                <Image
                  src={IMG.insights}
                  alt="Brown egg illustration"
                  width={320}
                  height={320}
                  className="relative w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6 order-3">
              {INSIGHTS.slice(4).map((s) => (
                <InsightStat key={s.label} {...s} align="left" />
              ))}
            </div>
          </div>

          <div className="mt-14 sm:mt-16 flex items-center justify-center gap-3">
            <span className="w-10 sm:w-12 h-px bg-border-strong"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-muted font-medium">
              Naturally produced &amp; nutrient-dense
            </span>
            <span className="w-10 sm:w-12 h-px bg-border-strong"></span>
          </div>
        </div>
      </section>

      {/* CERTIFICATION — Government of Pakistan PCSIR lab test, substantiates the Insights above */}
      <section
        id="certification"
        className="py-16 sm:py-24 lg:py-28 bg-surface border-y border-border"
      >
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 sm:mb-14 lg:mb-16 pb-5 sm:pb-6 border-b border-border">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                No. 04 — Certification
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                The numbers,{" "}
                <span className="italic text-accent">in writing.</span>
              </h2>
            </div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold hidden sm:block">
              PCSIR · Govt. of Pakistan
            </div>
          </div>

          <CertificationPanel />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 lg:py-28 bg-accent text-surface">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-balance">
            Ready to order?{" "}
            <span className="italic text-highlight">Let&apos;s talk.</span>
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-surface text-accent hover:bg-highlight hover:text-foreground text-sm font-medium px-7 py-4 rounded-full transition-colors"
          >
            Place an order
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
