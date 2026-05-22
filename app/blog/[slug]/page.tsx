import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BLOG_POSTS,
  getBlogPost,
  getBlogSlugs,
  type BlogBodyBlock,
} from "../../../utils/blogData";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found — Happy Hens" };
  return {
    title: `${post.title} — Happy Hens Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article>
      {/* TOP META + TITLE */}
      <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 bg-background overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-highlight/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold text-muted hover:text-accent transition-colors mb-7 sm:mb-9"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            All articles
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold mb-5 sm:mb-7">
            <span className="text-accent">{post.tag}</span>
            <span className="w-1 h-1 rounded-full bg-border-strong"></span>
            <span className="text-muted">{post.read}</span>
            <span className="w-1 h-1 rounded-full bg-border-strong"></span>
            <span className="text-muted">{formattedDate}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[1.05] tracking-tight text-balance">
            {post.title}
          </h1>

          <p className="mt-6 sm:mt-8 text-lg sm:text-xl text-muted leading-relaxed text-pretty max-w-3xl">
            {post.excerpt}
          </p>

          <div className="mt-7 sm:mt-9 pt-5 sm:pt-6 border-t border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-soft text-accent font-display font-semibold flex items-center justify-center text-sm">
              {post.author.name.charAt(0)}
            </div>
            <div>
              <div className="text-foreground text-sm font-medium">
                {post.author.name}
              </div>
              <div className="text-muted text-[11px] uppercase tracking-[0.22em] font-medium">
                {post.author.role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="relative aspect-3/2 overflow-hidden bg-surface-2">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="py-14 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 space-y-7 sm:space-y-9">
          {post.body.map((block, i) => (
            <BodyBlock key={i} block={block} />
          ))}

          <div className="pt-10 sm:pt-12 mt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
              ✦ Filed under {post.tag}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-surface text-sm font-medium px-6 py-3 rounded-full transition-colors self-start sm:self-auto"
            >
              Order fresh eggs
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="py-14 sm:py-20 lg:py-24 bg-surface border-t border-border">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12 pb-5 sm:pb-6 border-b border-border">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold">
                ✦ Keep reading
              </div>
              <Link
                href="/blog"
                className="text-[10px] uppercase tracking-[0.28em] text-foreground hover:text-accent font-semibold transition-colors"
              >
                All articles →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-7 sm:gap-8 lg:gap-12">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group"
                >
                  <div className="aspect-3/2 relative overflow-hidden mb-5 bg-surface-2">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                              className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold">
                    <span className="text-accent">{p.tag}</span>
                    <span className="w-1 h-1 rounded-full bg-border-strong"></span>
                    <span className="text-muted">{p.read}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground mt-3 leading-snug group-hover:text-accent transition-colors text-balance">
                    {p.title}
                  </h3>
                  <p className="text-muted mt-2 sm:mt-3 leading-relaxed text-sm sm:text-[15px]">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function BodyBlock({ block }: { block: BlogBodyBlock }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="font-display text-xl sm:text-2xl text-foreground leading-normal text-pretty">
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-tight tracking-tight pt-4 sm:pt-6 text-balance">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-base sm:text-[17px] text-foreground/85 leading-[1.75] text-pretty">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-3 sm:space-y-3.5 pl-0">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base sm:text-[17px] text-foreground/85 leading-[1.7]"
            >
              <span
                aria-hidden="true"
                className="mt-2 sm:mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"
              ></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="relative my-4 sm:my-6 pl-6 sm:pl-8 border-l-2 border-accent">
          <p className="font-display text-xl sm:text-2xl italic text-foreground leading-snug text-balance">
            “{block.text}”
          </p>
          {block.cite && (
            <footer className="mt-3 text-[11px] uppercase tracking-[0.22em] text-muted font-semibold">
              — {block.cite}
            </footer>
          )}
        </blockquote>
      );
    case "stats":
      return (
        <div className="my-4 sm:my-6 grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
          {block.items.map((s, i) => (
            <div key={i} className="bg-surface p-5 sm:p-6">
              <div className="font-display text-2xl sm:text-3xl text-accent font-medium leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-muted font-semibold leading-snug">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      );
  }
}
