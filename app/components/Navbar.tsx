"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Story" },
  { href: "#breed", label: "The Breed" },
  { href: "#process", label: "Our Process" },
  { href: "#products", label: "Eggs" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface border-b border-border">
      <nav className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link
            href="#home"
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
                Free Range · Lahore
              </span>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-2 text-[13px] font-medium text-foreground/75 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-surface text-[13px] font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              Order Eggs
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
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
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2.5 text-[15px] font-medium text-foreground/80 hover:text-accent hover:bg-surface-2 rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-1.5 bg-accent hover:bg-accent-hover text-surface text-sm font-medium px-4 py-3 rounded-full transition-colors"
            >
              Order Eggs
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
