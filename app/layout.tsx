import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title:
    "Happy Hens Poultry — Organic Free Range Eggs from Jhang Sadar, Pakistan",
  description:
    "Pakistan's pioneer in free-range egg production. We raise Lohmann Brown & Black hens in open sheds at our Jhang Sadar farm — for eggs naturally rich in Vitamin D and Omega-3.",
  keywords: [
    "free range eggs",
    "organic eggs Pakistan",
    "Happy Hens",
    "Lohmann Brown",
    "Lohmann Black",
    "Jhang Sadar farm",
    "certified humane",
    "farm fresh eggs",
  ],
  openGraph: {
    title: "Happy Hens Poultry — Organic Free Range Eggs",
    description:
      "Tasty, naturally enriched eggs from happy, free-roaming Lohmann hens at our Jhang Sadar farm.",
    type: "website",
  },
};

const noFlashScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
