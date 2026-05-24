import type { Metadata } from "next";
import ContactForm from "../components/ContactForm";
import {
  ContactInfo,
  SocialLink,
  SOCIAL_ICONS,
} from "../components/helpers";
import { CONTACT } from "../../lib/data";

export const metadata: Metadata = {
  title: "Contact — Happy Hens Poultry",
  description:
    "Order Happy Hens free-range eggs across Pakistan. Phone, WhatsApp, email — or just say hi. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 bg-surface overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-highlight/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
        {/* Compact header — same row as the grid on lg+ */}
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* LEFT — header + info */}
          <aside className="lg:col-span-5 xl:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-4 sm:mb-5">
              ✦ Contact
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.05] tracking-tight text-balance">
              Place an order or{" "}
              <span className="italic text-accent">just say hi.</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted leading-relaxed max-w-md">
              Whether you want trays for your home, your café, or your shop —
              we&apos;d love to hear from you. We typically reply within one
              business day.
            </p>

            <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-6">
              <ContactInfo label="Phone">
                <a
                  href={`tel:${CONTACT.phone1Raw}`}
                  className="hover:text-accent transition-colors block"
                >
                  {CONTACT.phone1}
                </a>
                <a
                  href={`tel:${CONTACT.phone2Raw}`}
                  className="hover:text-accent transition-colors block"
                >
                  {CONTACT.phone2}
                </a>
              </ContactInfo>
              <ContactInfo label="Email">
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-accent transition-colors break-all"
                >
                  {CONTACT.email}
                </a>
              </ContactInfo>
              <ContactInfo label="Farm">
                Jhang Sadar,
                <br />
                Punjab, Pakistan
              </ContactInfo>
              <ContactInfo label="Hours">{CONTACT.hours}</ContactInfo>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-border flex items-center justify-between gap-4">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                Follow us
              </div>
              <div className="flex items-center gap-2">
                <SocialLink href={CONTACT.whatsapp} label="WhatsApp">
                  {SOCIAL_ICONS.whatsapp}
                </SocialLink>
                <SocialLink href={CONTACT.facebook} label="Facebook">
                  {SOCIAL_ICONS.facebook}
                </SocialLink>
                <SocialLink href={CONTACT.instagram} label="Instagram">
                  {SOCIAL_ICONS.instagram}
                </SocialLink>
              </div>
            </div>
          </aside>

          {/* RIGHT — form */}
          <div className="lg:col-span-7 xl:col-span-8 bg-background border border-border p-6 sm:p-9 lg:p-12">
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-2">
              Send us a message
            </h2>
            <p className="text-muted mb-7 sm:mb-9 text-sm sm:text-[15px]">
              Fill in your details and we&apos;ll get back to you with
              pricing, delivery options, and the next dispatch slot.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
