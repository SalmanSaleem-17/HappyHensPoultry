import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";
import { CONTACT, IMG } from "../../lib/data";
import { SOCIAL_ICONS } from "./helpers";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
        {/* Newsletter */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end py-14 sm:py-16 lg:py-20 border-b border-border">
          <div className="lg:col-span-6">
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-4">
              ✦ Newsletter
            </div>
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground leading-[1.1] tracking-tight text-balance">
              Fresh news,{" "}
              <span className="italic text-accent">
                straight from the coop.
              </span>
            </h3>
            <p className="mt-3 sm:mt-4 text-muted text-sm sm:text-base max-w-md">
              Recipes, farm updates and the occasional discount. No spam.
            </p>
          </div>
          <div className="lg:col-span-6">
            <Newsletter />
          </div>
        </div>

        {/* Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-12 sm:py-14 lg:py-16 border-b border-border">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 flex items-center justify-center">
                <Image
                  src={IMG.icon}
                  alt="Happy Hens logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-display font-semibold text-base text-foreground">
                  Happy Hens
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted">
                  Pure Goodness in Every Shell
                </div>
              </div>
            </div>
            <p className="text-muted leading-relaxed text-[14px] max-w-xs">
              Pioneer in free-range egg production. We deliver organic
              Lohmann Brown &amp; Black eggs across Pakistan — straight from
              our farm in Jhang Sadar, Punjab.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-medium uppercase tracking-[0.22em] text-[10px] text-accent mb-4 sm:mb-5">
              Explore
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-foreground/75 text-[14px]">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link href="/eggs" className="hover:text-accent transition-colors">Our Eggs</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-medium uppercase tracking-[0.22em] text-[10px] text-accent mb-4 sm:mb-5">
              More
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-foreground/75 text-[14px]">
              <li><Link href="/eggs#why-different" className="hover:text-accent transition-colors">Why Different</Link></li>
              <li><Link href="/eggs#insights" className="hover:text-accent transition-colors">Insights</Link></li>
              <li><Link href="/about#breed" className="hover:text-accent transition-colors">The Breed</Link></li>
              <li><Link href="/about#process" className="hover:text-accent transition-colors">Our Process</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-medium uppercase tracking-[0.22em] text-[10px] text-accent mb-4 sm:mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-2.5 text-foreground/80 text-[14px]">
              <li>22-F, Raiwind Road, Lahore, Pakistan, 54000</li>
              <li>Farm: Jhang Sadar, Punjab</li>
              <li>
                <a href={`tel:${CONTACT.phone1Raw}`} className="hover:text-accent transition-colors block">
                  {CONTACT.phone1}
                </a>
                <a href={`tel:${CONTACT.phone2Raw}`} className="hover:text-accent transition-colors block">
                  {CONTACT.phone2}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-accent transition-colors break-all">
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2">
              <FooterSocial href={CONTACT.whatsapp} label="WhatsApp">
                {SOCIAL_ICONS.whatsapp}
              </FooterSocial>
              <FooterSocial href={CONTACT.facebook} label="Facebook">
                {SOCIAL_ICONS.facebook}
              </FooterSocial>
              <FooterSocial href={CONTACT.instagram} label="Instagram">
                {SOCIAL_ICONS.instagram}
              </FooterSocial>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-7 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[12px] sm:text-[13px] text-muted">
          <p>
            &copy; {new Date().getFullYear()} Happy Hens Poultry · All
            rights reserved
          </p>
          <div className="flex items-center gap-5 sm:gap-6">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a
              href="https://certifiedhumane.org/the-happy-hens-farm/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors inline-flex items-center gap-1.5"
            >
              Certified Humane
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSocial({
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
      className="w-9 h-9 rounded-full border border-border hover:border-accent hover:bg-accent text-foreground hover:text-surface flex items-center justify-center transition-colors"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
