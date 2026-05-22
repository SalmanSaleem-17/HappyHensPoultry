import { type IconKind } from "../../lib/data";

export function SectionHeader({
  number,
  right,
}: {
  number: string;
  right?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-12 sm:mb-16 lg:mb-20 pb-5 sm:pb-6 border-b border-border">
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold">
        {number}
      </div>
      {right && (
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold hidden sm:block">
          {right}
        </div>
      )}
    </div>
  );
}

export function FeatureIcon({ kind }: { kind: IconKind }) {
  const props = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "shed":
      return (
        <svg {...props}>
          <path d="M3 21V10l9-6 9 6v11" />
          <path d="M3 21h18" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...props}>
          <path d="M11 20A7 7 0 014 13V4h9a7 7 0 010 14h-2z" />
          <path d="M2 22l9-9" />
        </svg>
      );
    case "sun":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case "drop":
      return (
        <svg {...props}>
          <path d="M12 2c-3.5 4-6 7.5-6 11a6 6 0 0012 0c0-3.5-2.5-7-6-11z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 2l8 3v6c0 5-3.5 9.3-8 11-4.5-1.7-8-6-8-11V5l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "truck":
      return (
        <svg {...props}>
          <path d="M3 7h11v10H3z" />
          <path d="M14 10h4l3 3v4h-7" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
  }
}

export function ContactInfo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold mb-2">
        {label}
      </div>
      <div className="text-foreground text-sm sm:text-[15px] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

export function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full border border-border hover:border-accent hover:bg-accent text-foreground hover:text-surface flex items-center justify-center transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}

export function InsightStat({
  value,
  label,
  kind,
  align,
}: {
  value: string;
  label: string;
  kind: "more" | "less";
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex flex-col ${
        align === "right"
          ? "lg:items-end lg:text-right"
          : "lg:items-start lg:text-left"
      } items-center text-center sm:items-start sm:text-left`}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-display text-4xl sm:text-5xl font-medium text-accent leading-none">
          {value}
        </span>
        <span
          className={`text-[10px] uppercase tracking-[0.22em] font-semibold ${
            kind === "more" ? "text-accent" : "text-highlight"
          }`}
        >
          {kind}
        </span>
      </div>
      <div className="mt-2 text-sm sm:text-[15px] text-foreground/85 leading-snug">
        {label}
      </div>
    </div>
  );
}

export const SOCIAL_ICONS = {
  whatsapp: (
    <path d="M17.6 6.32a8 8 0 00-13.2 9.06L4 21l5.78-1.51a8 8 0 0011.65-7.17 8 8 0 00-3.83-6zM12 19.5a7 7 0 01-3.6-1l-.26-.16-3.43.9.9-3.34-.17-.27A7 7 0 1119 13a7 7 0 01-7 6.5zm3.86-5.05c-.21-.11-1.25-.62-1.45-.69s-.34-.11-.48.11-.55.69-.67.83-.25.16-.46.05a5.7 5.7 0 01-1.7-1 6.36 6.36 0 01-1.18-1.46c-.12-.21 0-.32.09-.43s.21-.25.32-.37a1.4 1.4 0 00.21-.36.39.39 0 000-.37c-.05-.11-.48-1.15-.66-1.57s-.35-.36-.48-.36h-.41a.78.78 0 00-.57.27 2.39 2.39 0 00-.74 1.78 4.18 4.18 0 00.86 2.2 9.45 9.45 0 003.6 3.18c.5.22.9.35 1.2.45a2.9 2.9 0 001.33.08 2.18 2.18 0 001.43-1 1.78 1.78 0 00.13-1c-.05-.09-.19-.14-.41-.25z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 10-11.57 9.87v-7H7.9V12h2.53V9.8c0-2.5 1.49-3.89 3.77-3.89a15.3 15.3 0 012.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0022 12z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1" />
    </>
  ),
};
