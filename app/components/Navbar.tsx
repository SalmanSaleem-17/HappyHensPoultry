"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS, CONTACT } from "../../lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface border-b border-border">
      {/* TOP UTILITY BAR — contact + social, space-efficient on every viewport */}
      <div className="bg-foreground text-background/85 border-b border-border/40">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12 h-8 sm:h-9 flex items-center justify-between gap-3 text-[11px] sm:text-xs">
          <div className="flex items-center gap-3 sm:gap-5 min-w-0">
            <a
              href={`tel:${CONTACT.phone2Raw}`}
              className="inline-flex items-center gap-1.5 hover:text-highlight transition-colors whitespace-nowrap min-w-0"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72a2 2 0 011.72 2z" />
              </svg>
              <span className="font-medium tracking-tight">{CONTACT.phone2}</span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden md:inline-flex items-center gap-1.5 hover:text-highlight transition-colors whitespace-nowrap min-w-0"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              <span className="font-medium">{CONTACT.email}</span>
            </a>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-background/60 whitespace-nowrap">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span>{CONTACT.hours}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-highlight transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.6 6.32a8 8 0 00-13.2 9.06L4 21l5.78-1.51a8 8 0 0011.65-7.17 8 8 0 00-3.83-6zM12 19.5a7 7 0 01-3.6-1l-.26-.16-3.43.9.9-3.34-.17-.27A7 7 0 1119 13a7 7 0 01-7 6.5zm3.86-5.05c-.21-.11-1.25-.62-1.45-.69s-.34-.11-.48.11-.55.69-.67.83-.25.16-.46.05a5.7 5.7 0 01-1.7-1 6.36 6.36 0 01-1.18-1.46c-.12-.21 0-.32.09-.43s.21-.25.32-.37a1.4 1.4 0 00.21-.36.39.39 0 000-.37c-.05-.11-.48-1.15-.66-1.57s-.35-.36-.48-.36h-.41a.78.78 0 00-.57.27 2.39 2.39 0 00-.74 1.78 4.18 4.18 0 00.86 2.2 9.45 9.45 0 003.6 3.18c.5.22.9.35 1.2.45a2.9 2.9 0 001.33.08 2.18 2.18 0 001.43-1 1.78 1.78 0 00.13-1c-.05-.09-.19-.14-.41-.25z" />
              </svg>
            </a>
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-highlight transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 10-11.57 9.87v-7H7.9V12h2.53V9.8c0-2.5 1.49-3.89 3.77-3.89a15.3 15.3 0 012.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0022 12z" />
              </svg>
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-highlight transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Happy Hens Poultry — Home"
          >
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <Image
                src="/icon.png"
                alt="Happy Hens Poultry Farm"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-semibold text-base text-foreground tracking-tight">
                Happy Hens
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-muted">
                Poultry Farm, Pakistan
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-[13px] font-medium transition-colors ${
                      active
                        ? "text-accent"
                        : "text-foreground/75 hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-surface text-[13px] font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              Order Eggs
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              {...(open
                ? { "aria-expanded": "true" as const }
                : { "aria-expanded": "false" as const })}
              onClick={() => setOpen((v) => !v)}
              className="p-2 -mr-2 text-foreground"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden pb-5 pt-1 border-t border-border animate-fade-in">
            <ul className="flex flex-col gap-0.5 pt-3">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2.5 text-[15px] font-medium rounded-md transition-colors ${
                        active
                          ? "text-accent bg-accent-soft"
                          : "text-foreground/80 hover:text-accent hover:bg-surface-2"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 bg-accent hover:bg-accent-hover text-surface text-sm font-medium px-4 py-3 rounded-full transition-colors"
            >
              Order Eggs
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
