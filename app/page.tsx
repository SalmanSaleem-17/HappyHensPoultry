import Image from "next/image";
import Link from "next/link";
import Hero from "./components/Hero";
import ProductFlipImage from "./components/ProductFlipImage";
import { SectionHeader } from "./components/helpers";
import {
  IMG,
  PRODUCTS,
  REVIEWS,
  BLOG,
  PROCESS,
} from "../lib/data";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Section divider */}
      <hr className="border-t border-border" />

      {/* PHILOSOPHY PULL QUOTE */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-surface border-y border-border overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-highlight/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-7 sm:mb-8">
            ✦ Our Philosophy
          </div>
          <p className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.18] tracking-tight text-balance">
            Better eggs start with{" "}
            <span className="italic text-accent">better lives.</span> Every
            choice on our farm — from feed to housing to lighting — is made
            for the bird first, the egg second.
          </p>
          <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3">
            <span className="w-10 sm:w-12 h-px bg-border-strong"></span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-muted font-medium">
              Happy Hens Farms · Jhang Sadar
            </span>
            <span className="w-10 sm:w-12 h-px bg-border-strong"></span>
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW → /eggs */}
      <section className="py-20 sm:py-28 lg:py-32 bg-background">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                No. 01 — Our Eggs
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                One product.{" "}
                <span className="italic text-accent">Done with care.</span>
              </h2>
            </div>
            <Link
              href="/eggs"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group border-b border-foreground/20 hover:border-accent pb-1"
            >
              All sizes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {PRODUCTS.map((p) => (
              <article
                key={p.name}
                className={`group relative bg-surface border transition-all hover:-translate-y-1 ${
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
        </div>
      </section>

            {/* CLOSING CTA */}
      <section className="py-20 sm:py-28 lg:py-32 bg-accent text-surface">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
          <div className="text-[10px] uppercase tracking-[0.28em] text-highlight font-semibold mb-6">
            ✦ Ready to taste the difference?
          </div>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight text-balance">
            Order your first tray of{" "}
            <span className="italic text-highlight">
              Happy Hens eggs.
            </span>
          </h2>
          <p className="mt-5 sm:mt-6 text-surface/80 text-base sm:text-lg max-w-xl mx-auto">
            We typically reply within one business day with pricing, delivery
            options, and the next dispatch slot.
          </p>
          <Link
            href="/contact"
            className="mt-9 sm:mt-10 inline-flex items-center gap-2 bg-surface text-accent hover:bg-highlight hover:text-foreground text-sm font-medium px-7 py-4 rounded-full transition-colors"
          >
            Place an order
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 sm:py-28 lg:py-32 bg-background">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
            <div className="max-w-2xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                No. 02 — Star Reviews
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                Loved by{" "}
                <span className="italic text-accent">families</span> across
                Pakistan.
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="bg-surface p-7 sm:p-10 lg:p-12 flex flex-col"
              >
                <div className="flex items-center gap-1 mb-5 sm:mb-7">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-highlight"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-display text-xl sm:text-2xl text-foreground leading-snug flex-1 text-balance">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border">
                  <div className="font-display text-base sm:text-lg text-foreground">
                    {r.name}
                  </div>
                  <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-muted mt-1.5 font-medium">
                    {r.title}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* THE EGG — feature spotlight */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-stretch">
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

      {/* STORY PREVIEW → /about */}
      <section className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-border">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <SectionHeader number="No. 03 — Our Story" right="Jhang Sadar · Pakistan" />
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground leading-[1.05] tracking-tight text-balance">
                It started with a breakdown in{" "}
                <span className="italic text-accent">Kashmir.</span>
              </h2>
              <p className="mt-7 text-base sm:text-[17px] text-muted leading-[1.7] text-pretty max-w-xl">
                Two friends, a quiet mountain road, and a breakfast of eggs
                unlike anything they’d tasted. That morning in Taobat is why
                Happy Hens exists — and why every egg we deliver carries that
                story.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group border-b border-foreground/20 hover:border-accent pb-1"
              >
                Read the full story
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="lg:col-span-6">
              <div className="aspect-16/10 relative overflow-hidden bg-surface-2">
                <Image
                  src={IMG.eggsTray}
                  alt="A tray of fresh, free-range brown eggs"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR PROCESS PREVIEW → /about#process */}
      <section className="py-20 sm:py-28 lg:py-32 bg-background">
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
            <Link
              href="/about#process"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group border-b border-foreground/20 hover:border-accent pb-1"
            >
              Inside the farm
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
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

      {/* BLOG PREVIEW → /blog */}
      <section className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-border">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
            <div className="max-w-xl">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                No. 05 — From the Coop
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                Stories &amp;{" "}
                <span className="italic text-accent">field notes.</span>
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group border-b border-foreground/20 hover:border-accent pb-1"
            >
              All articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-12">
            {BLOG.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group"
              >
                <div className="aspect-3/2 relative overflow-hidden mb-5 bg-surface-2">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold">
                  <span className="text-accent">{post.tag}</span>
                  <span className="w-1 h-1 rounded-full bg-border-strong"></span>
                  <span className="text-muted">{post.read}</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground mt-3 leading-snug group-hover:text-accent transition-colors text-balance">
                  {post.title}
                </h3>
                <p className="text-muted mt-2 sm:mt-3 leading-relaxed text-sm sm:text-[15px]">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
