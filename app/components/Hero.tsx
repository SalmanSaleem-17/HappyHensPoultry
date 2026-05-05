import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-20 lg:pt-24 bg-background overflow-hidden"
    >
      {/* Soft decorative blobs for depth */}
      <div className="absolute -top-32 -left-20 w-md h-112 rounded-full bg-highlight/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-md h-112 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-350 mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-16 lg:pt-20 pb-14 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-6 animate-fade-in order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-accent font-semibold mb-7 sm:mb-9">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Free Range · Jhang Sadar
            </div>

            <h1 className="font-display text-[clamp(2.75rem,8.4vw,6rem)] font-medium text-foreground leading-[0.95] tracking-tight text-balance">
              Eggs from{" "}
              <span className="italic text-accent">truly happy</span> hens.
            </h1>

            <p className="mt-7 sm:mt-9 text-base sm:text-lg text-muted max-w-md leading-relaxed text-pretty">
              We raise{" "}
              <span className="text-foreground font-medium">Lohmann Brown</span>{" "}
              hens in open sheds — no cages, no artificial light. Just sunshine,
              organic feed, and room to roam.
            </p>

            <div className="mt-9 sm:mt-11 flex flex-wrap items-center gap-4 sm:gap-5">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface text-sm font-medium px-6 sm:px-7 py-3.5 sm:py-4 rounded-full transition-colors"
              >
                Order fresh eggs
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group border-b border-foreground/20 hover:border-accent pb-1"
              >
                Read our story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT — image composition (no video) */}
          <div className="lg:col-span-6 relative order-1 lg:order-2">
            <div className="relative">
              {/* Main hero image */}
              <div className="relative aspect-4/5 sm:aspect-5/6 overflow-hidden bg-surface-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]">
                <Image
                  src="/packaging.jpg"
                  alt="Happy Hens egg cartons styled with fresh flowers"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                {/* Editorial label */}
                <div className="absolute top-5 left-5 bg-surface/95 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-foreground font-semibold">
                  Plate · 01
                </div>
              </div>

              {/* Floating accent card — bottom left */}
              <div className="hidden sm:block absolute -bottom-8 -left-6 lg:-left-10 max-w-60 bg-surface border border-border p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]">
                <div className="text-[10px] uppercase tracking-[0.22em] text-highlight font-semibold">
                  ★ 5.0
                </div>
                <p className="mt-2 font-display text-base text-foreground leading-snug">
                  &ldquo;You can taste the story behind these eggs.&rdquo;
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted font-medium">
                  Mr. Farrukh · Lahore
                </p>
              </div>

              {/* Floating accent card — top right */}
              <div className="hidden lg:block absolute -top-6 -right-8 bg-accent text-surface p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)]">
                <div className="text-[10px] uppercase tracking-[0.22em] text-highlight font-semibold">
                  Avg. weight
                </div>
                <div className="font-display text-3xl mt-1.5 leading-none">
                  63<span className="text-base text-surface/70">g</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-surface/70 mt-1.5">
                  Lohmann Brown
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-20 sm:mt-24 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {[
            { value: "100%", label: "Organic feed" },
            { value: "0", label: "Cages or chemicals" },
            { value: "4", label: "Cities served" },
            { value: "5★", label: "Customer rating" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-background p-5 sm:p-7 lg:p-8 hover:bg-surface transition-colors"
            >
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-none">
                {s.value}
              </div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted mt-2 sm:mt-3 font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
