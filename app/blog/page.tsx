import type { Metadata } from "next";
import { BLOG } from "../../lib/data";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog — Happy Hens Poultry",
  description:
    "Stories and field notes from our Jhang Sadar farm — nutrition science, daily packing, and life with our Lohmann hens.",
};

export default function BlogPage() {
  return (
    <>
      {/* HERO — compact, top-aligned, breathes with the navbar */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 lg:pb-16 hero-bg overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-20 w-96 h-96 bg-highlight/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-4 sm:mb-5">
            ✦ No. 01 — From the Coop
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[0.98] tracking-tight text-balance max-w-4xl">
            Stories &amp;{" "}
            <span className="italic text-accent">field notes.</span>
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
            Recipes, nutrition science, packing-line behind-the-scenes, and
            the occasional Anda Paratha philosophy — straight from our farm
            in Jhang Sadar.
          </p>
        </div>
      </section>

      <BlogList posts={BLOG} />
    </>
  );
}
