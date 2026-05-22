"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  tag: string;
  read: string;
};

const TAGS = ["All", "Nutrition", "Lifestyle", "Welfare"] as const;
type Tag = (typeof TAGS)[number];

export default function BlogList({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Tag>("All");

  const filtered = useMemo(() => {
    if (active === "All") return posts;
    return posts.filter((p) => p.tag === active);
  }, [posts, active]);

  // Featured layout (big card + grid) is reserved for the "All" view.
  // Once a tag is selected, every match is shown as an equal card.
  const showFeatured = active === "All" && filtered.length > 0;
  const featured = showFeatured ? filtered[0] : null;
  const cards = showFeatured ? filtered.slice(1) : filtered;

  return (
    <>
      {/* TAG FILTER */}
      <section className="py-5 sm:py-6 bg-surface border-y border-border">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 flex flex-wrap items-center gap-2 sm:gap-3">
          {TAGS.map((tag) => {
            const isActive = tag === active;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                {...(isActive
                  ? { "aria-pressed": "true" as const }
                  : { "aria-pressed": "false" as const })}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 text-[12px] sm:text-[13px] uppercase tracking-[0.18em] font-semibold rounded-full border transition-colors ${
                  isActive
                    ? "bg-accent text-surface border-accent"
                    : "border-border text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {tag}
              </button>
            );
          })}
          {active !== "All" && (
            <span className="ml-auto text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-muted font-medium">
              {filtered.length}{" "}
              {filtered.length === 1 ? "story" : "stories"}
            </span>
          )}
        </div>
      </section>

      {/* NO RESULTS */}
      {filtered.length === 0 && (
        <section className="py-20 sm:py-28 bg-background">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 text-center">
            <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3">
              No matches
            </div>
            <p className="font-display text-2xl sm:text-3xl text-foreground leading-snug">
              No stories filed under{" "}
              <span className="italic text-accent">{active}</span> yet.
            </p>
            <button
              type="button"
              onClick={() => setActive("All")}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors border-b border-foreground/20 hover:border-accent pb-1"
            >
              ← Show all articles
            </button>
          </div>
        </section>
      )}

      {/* FEATURED — only when "All" */}
      {featured && (
        <section className="py-14 sm:py-20 lg:py-24 bg-background">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-6">
              ✦ Featured story
            </div>
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-7 aspect-3/2 relative overflow-hidden bg-surface-2">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold">
                  <span className="text-accent">{featured.tag}</span>
                  <span className="w-1 h-1 rounded-full bg-border-strong"></span>
                  <span className="text-muted">{featured.read}</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mt-4 leading-[1.1] group-hover:text-accent transition-colors text-balance">
                  {featured.title}
                </h2>
                <p className="text-muted mt-4 sm:mt-5 leading-relaxed text-base sm:text-lg">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors border-b border-foreground/20 group-hover:border-accent pb-1">
                  Read full article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* GRID */}
      {cards.length > 0 && (
        <section className="py-14 sm:py-20 lg:py-24 bg-surface border-t border-border">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between gap-4 mb-10 sm:mb-14 lg:mb-16 pb-5 sm:pb-6 border-b border-border">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold">
                {active === "All" ? "More articles" : `${active} stories`}
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold hidden sm:block">
                {cards.length} {cards.length === 1 ? "story" : "stories"}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-12">
              {cards.map((post) => (
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
      )}
    </>
  );
}
