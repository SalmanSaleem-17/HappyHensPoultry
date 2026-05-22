"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductFlipImage({
  open,
  closed,
  alt,
  sizes = "(max-width: 1024px) 100vw, 33vw",
}: {
  open: string;
  closed: string;
  alt: string;
  sizes?: string;
}) {
  // Default: open box visible.  When flipped, closed box visible.
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card aspect-4/3 relative bg-surface-2 overflow-hidden ${
        flipped ? "is-flipped" : ""
      }`}
    >
      <div className="flip-card-inner">
        {/* OPEN — visible by default */}
        <div className="flip-card-face">
          <Image
            src={open}
            alt={`${alt} — inside the box`}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
        {/* CLOSED — visible after flip */}
        <div className="flip-card-face flip-card-back">
          <Image
            src={closed}
            alt={`${alt} — closed box`}
            fill
            sizes={sizes}
            className="object-cover"
          />
        </div>
      </div>

      {/* Flip control */}
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-label={flipped ? "Show open box" : "Show closed box"}
        {...(flipped
          ? { "aria-pressed": "true" as const }
          : { "aria-pressed": "false" as const })}
        className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 bg-surface/95 backdrop-blur-sm border border-border hover:border-accent hover:bg-accent hover:text-surface text-foreground px-3 py-2 text-[10px] uppercase tracking-[0.22em] font-semibold rounded-full transition-colors group/flip shadow-sm"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-500 ${
            flipped ? "rotate-180" : ""
          } group-hover/flip:scale-110`}
          aria-hidden="true"
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
        </svg>
        Flip
      </button>
    </div>
  );
}
