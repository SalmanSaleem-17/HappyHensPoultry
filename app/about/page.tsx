import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import { SectionHeader, FeatureIcon } from "../components/helpers";
import { IMG, BREED_FACTS, FEATURES, PROCESS } from "../../lib/data";

export const metadata: Metadata = {
  title: "Our Story — Happy Hens Poultry",
  description:
    "How a breakdown in Kashmir inspired Pakistan's pioneer in free-range eggs. Meet our Lohmann Brown & Black hens at our Jhang Sadar farm.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="No. 01 — Our Story"
        title="It started with a breakdown in Kashmir."
        italicWord="Kashmir."
        intro="Two friends, a quiet mountain road, and a breakfast of eggs unlike anything they'd tasted. That morning in Taobat is why Happy Hens exists."
      />

      {/* STORY */}
      <section
        id="story"
        className="py-14 sm:py-20 lg:py-24 bg-surface border-y border-border"
      >
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* TEXT — left on desktop, second on mobile */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-5 text-base sm:text-[17px] text-muted leading-[1.7] text-pretty">
                <p className="text-foreground font-display text-xl sm:text-2xl lg:text-[26px] leading-snug">
                  Two friends — a software engineer and a sales Expert — were
                  driving through the village of Taobat when their car gave up
                  on a quiet mountain road.
                </p>
                <p>
                  A local family welcomed them in and served them breakfast.
                  The eggs that morning were unlike anything either of them
                  had tasted.{" "}
                  <em className="text-foreground">
                    Warm, rich, golden, alive.
                  </em>
                </p>
                <p>
                  The hens that laid them roamed the hills freely, ate what
                  nature offered, and slept under the stars.
                </p>
                <p className="text-foreground">
                  We came home determined to bring that taste — and that
                  philosophy — back to Pakistan&apos;s cities. Today our farm
                  in Jhang Sadar continues that mission.
                </p>
              </div>

              {/* Inline stats — anchored below text as a clean callout */}
              <dl className="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-border grid grid-cols-2 gap-6 sm:gap-8 max-w-md">
                <div>
                  <dt className="font-display text-2xl sm:text-3xl text-foreground">
                    Pioneer
                  </dt>
                  <dd className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted mt-1.5 sm:mt-2 font-medium">
                    in free-range
                  </dd>
                </div>
                <div>
                  <dt className="font-display text-2xl sm:text-3xl text-foreground">
                    Family-run
                  </dt>
                  <dd className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted mt-1.5 sm:mt-2 font-medium">
                    small-batch
                  </dd>
                </div>
              </dl>
            </div>

            {/* IMAGE — right on desktop, first on mobile */}
            <figure className="lg:col-span-5 order-1 lg:order-2 relative">
              <div className="aspect-4/5 relative overflow-hidden bg-surface-2">
                <Image
                  src={IMG.packaging}
                  alt="Happy Hens egg cartons styled with fresh flowers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
              {/* Decorative corner ticks */}
              <span aria-hidden="true" className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t border-l border-accent/40" />
              <span aria-hidden="true" className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t border-r border-accent/40" />
              <span aria-hidden="true" className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b border-l border-accent/40" />
              <span aria-hidden="true" className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b border-r border-accent/40" />
            </figure>
          </div>

          {/* Wide editorial image strip */}
          <figure className="mt-14 sm:mt-20 lg:mt-24">
            <div className="aspect-video sm:aspect-21/9 relative overflow-hidden bg-surface-2">
              <Image
                src={IMG.eggsTray}
                alt="A tray of fresh, free-range brown eggs"
                fill
                sizes="100vw"
                className="object-cover hover:scale-[1.02] transition-transform duration-1200"
              />
            </div>
            <figcaption className="mt-3 sm:mt-4 flex items-center justify-between gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-medium">
              <span className="inline-flex items-center gap-3">
                <span className="w-8 h-px bg-border-strong"></span>
                Hand-collected at our Jhang Sadar farm
              </span>
              <span className="hidden sm:inline">Sorted · candled</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* THE BREED */}
      <section id="breed" className="py-16 sm:py-24 lg:py-28 bg-background">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <SectionHeader
            number="No. 02 — The Breed"
            right="Brown · Black · Lohmann"
          />

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <figure className="relative">
                <div className="relative bg-surface border border-border-strong p-3 sm:p-4 lg:p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)]">
                  <div className="relative aspect-4/5 sm:aspect-5/6 overflow-hidden bg-surface-2 outline-1 outline-offset-[6px] outline-accent/30">
                    <video
                      src={IMG.video}
                      poster={IMG.packaging}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 sm:top-5 left-4 sm:left-5 bg-surface/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-foreground font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                      Live from the farm
                    </div>
                  </div>
                  <span className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-accent" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-accent" aria-hidden="true" />
                  <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-accent" aria-hidden="true" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-accent" aria-hidden="true" />
                </div>
              </figure>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight text-balance">
                Meet our{" "}
                <span className="italic text-accent">Lohmann</span> hens.
              </h2>
              <p className="mt-7 sm:mt-8 text-base sm:text-[17px] text-muted leading-[1.7] text-pretty">
                We raise two German layer breeds at our Jhang Sadar farm —
                <strong className="text-foreground"> Lohmann Brown</strong>{" "}
                and{" "}
                <strong className="text-foreground">Lohmann Black</strong>.
                Both thrive in a free-range life: calm, curious, remarkably
                hardy, and excellent foragers.
              </p>
              <p className="mt-4 sm:mt-5 text-base sm:text-[17px] text-muted leading-[1.7] text-pretty">
                Originally bred in Cuxhaven, Germany, our girls walk
                confidently in open sheds and lay a beautiful deep-brown egg
                with a vivid golden yolk.
              </p>

              <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-6 sm:gap-y-7">
                {BREED_FACTS.map((f) => (
                  <div key={f.label} className="border-t border-border pt-3">
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                      {f.label}
                    </div>
                    <div className="text-foreground text-sm sm:text-[15px] mt-1.5 leading-snug">
                      {f.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-stretch">
            <div className="lg:col-span-4 aspect-video sm:aspect-16/10 lg:aspect-auto relative overflow-hidden bg-surface-2 min-h-48 sm:min-h-60">
              <Image
                src={IMG.eggsCloseUp}
                alt="A close-up pile of fresh, free-range brown eggs"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <div className="lg:col-span-5 bg-accent text-surface p-6 sm:p-9 lg:p-14 flex flex-col justify-center">
              <div className="text-[10px] uppercase tracking-[0.28em] text-highlight font-semibold">
                ✦ The Egg
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl mt-3 leading-[1.15]">
                Deep brown shell.
                <br />
                <span className="italic">Golden, vivid yolk.</span>
              </h3>
              <p className="mt-3 sm:mt-4 text-surface/85 leading-relaxed text-sm sm:text-base">
                Larger than a typical farm egg, with a thicker shell thanks
                to a calcium-rich, organic diet. Each one is candled by hand
                before it leaves the farm.
              </p>
            </div>
            <div className="lg:col-span-3 bg-surface-2 p-6 sm:p-9 lg:p-12 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 lg:flex lg:flex-col lg:justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                  Avg. weight
                </div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 leading-none">
                  63<span className="text-lg sm:text-xl lg:text-2xl text-muted">g</span>
                </div>
              </div>
              <div className="lg:mt-8">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                  Yield
                </div>
                <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 leading-none">
                  305<span className="text-lg sm:text-xl lg:text-2xl text-muted">/yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 sm:py-24 lg:py-28 bg-surface border-y border-border">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                No. 03 — Why Happy Hens
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                Eggs you can taste.
                <br />
                <span className="italic text-accent">
                  Welfare you can trust.
                </span>
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group bg-surface p-7 sm:p-9 lg:p-11 hover:bg-background transition-colors min-h-60"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent group-hover:bg-accent group-hover:text-surface transition-colors">
                    <FeatureIcon kind={f.icon} />
                  </span>
                  <span className="font-display text-[11px] tracking-[0.22em] text-muted font-semibold uppercase">
                    {f.n}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground leading-snug">
                  {f.title}
                </h3>
                <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] text-muted leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section id="process" className="py-16 sm:py-24 lg:py-28 bg-background">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                No. 04 — Our Process
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                From the coop to{" "}
                <span className="italic text-accent">your table.</span>
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-3">
            {PROCESS.map((step) => (
              <div key={step.n} className="relative">
                <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-4 sm:mb-5">
                  Step {step.n}
                </div>
                <div className="aspect-4/5 relative overflow-hidden bg-surface-2 mb-5 sm:mb-6">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-foreground leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-sm sm:text-[15px] text-muted leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
