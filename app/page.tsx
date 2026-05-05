import Image from "next/image";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ContactForm from "./components/ContactForm";
import Newsletter from "./components/Newsletter";

const IMG = {
  packaging: "/packaging.jpg",
  pkg12: "/packaging-12-eggs.jpeg",
  pkg30: "/packaging-30-eggs.jpeg",
  pkg6and12: "/packaging-6-and-12.jpeg",
  icon: "/icon.png",
  eggsCloseUp: "/Brown-eggs.webp",
  eggsTray: "/brown-eggs-in-the-egg-tray-closeup-egg-dish-diet-brown.jpg",
  eggsStock: "/brown-eggs-stock-image.jpeg",
  socialBrown: "/social-brown-eggs.webp",
  video:
    "https://res.cloudinary.com/dw6svuzvy/video/upload/v1777973345/Hens-in-Fields_fns5bt.mp4",
};

type IconKind =
  | "shed"
  | "leaf"
  | "sun"
  | "drop"
  | "shield"
  | "truck";

function FeatureIcon({ kind }: { kind: IconKind }) {
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

const FEATURES: { n: string; title: string; body: string; icon: IconKind }[] = [
  {
    n: "01",
    title: "Open sheds, no cages",
    body: "Our girls roam, dust-bathe and stretch their wings — the way nature intended.",
    icon: "shed",
  },
  {
    n: "02",
    title: "100% organic feed",
    body: "Carefully sourced grains and greens. No growth promoters. No chemicals.",
    icon: "leaf",
  },
  {
    n: "03",
    title: "No artificial light",
    body: "Hens follow the sun. Natural cycles for happier birds and better eggs.",
    icon: "sun",
  },
  {
    n: "04",
    title: "Vitamin D & Omega-3",
    body: "Naturally enriched eggs from sunshine, fresh air and a wholesome diet.",
    icon: "drop",
  },
  {
    n: "05",
    title: "Certified Humane",
    body: "Independently certified animal-friendly. Welfare verified, not claimed.",
    icon: "shield",
  },
  {
    n: "06",
    title: "Farm-fresh delivery",
    body: "Across Lahore, Faisalabad, Islamabad and Jhang — straight to your door.",
    icon: "truck",
  },
];

const PROCESS = [
  {
    n: "01",
    title: "Sunrise",
    body: "The flock wakes naturally as light returns to the open sheds. No timers, no artificial cycles.",
    image: "/sunrise.jpeg",
  },
  {
    n: "02",
    title: "Free range",
    body: "Hens roam, forage, dust-bathe. Their day is theirs — exactly as it should be.",
    image: "/free-range.webp",
  },
  {
    n: "03",
    title: "Hand-collected",
    body: "Eggs are collected by our team gently, several times a day, never washed harshly.",
    image: "/hand-collected.webp",
  },
  {
    n: "04",
    title: "To your door",
    body: "Sorted, candled, packed in trays and delivered fresh across four cities.",
    image: IMG.packaging,
  },
];

const REVIEWS = [
  {
    name: "Mr. Farrukh",
    title: "Verified Customer · Lahore",
    quote:
      "You can truly taste the story behind these eggs. They’re rich, fresh, and full of flavor.",
  },
  {
    name: "Mr. Ahmad",
    title: "Verified Customer · Islamabad",
    quote:
      "From the first bite, you can tell these eggs are different. The flavor is warm, natural, and comforting — just like a homemade mountain breakfast.",
  },
  {
    name: "A Happy Family",
    title: "Faisalabad",
    quote:
      "Switched our entire household to Happy Hens. The yolks are golden, the shells are strong, and the kids actually ask for eggs now.",
  },
];

const BLOG = [
  {
    title: "Brown eggs are better — because of nutrition",
    excerpt:
      "Heat thing? It’s a myth. Brown eggs aren’t warmer than white — the real difference is in the diet and life behind the shell.",
    image: IMG.socialBrown,
    tag: "Nutrition",
    read: "4 min read",
  },
  {
    title: "Hand-sorted, candled, sealed",
    excerpt:
      "A look inside our daily packing line — how we check every egg before it leaves the farm and reaches your kitchen.",
    image: IMG.pkg30,
    tag: "Our Process",
    read: "3 min read",
  },
  {
    title: "From the coop to your tray",
    excerpt:
      "How our small team in Lahore looks after every flock — sorting, candling and packing each tray with care.",
    image: IMG.packaging,
    tag: "Our Farm",
    read: "5 min read",
  },
];

const CITIES = ["Lahore", "Faisalabad", "Islamabad", "Jhang"];

const BREED_FACTS = [
  { label: "Origin", value: "Cuxhaven, Germany" },
  { label: "Plumage", value: "Glossy black, green sheen" },
  { label: "Egg colour", value: "Rich, deep brown" },
  { label: "Egg weight", value: "62 – 64 g" },
  { label: "Annual yield", value: "~ 305 / hen" },
  { label: "Temperament", value: "Calm, hardy, curious" },
];

const PRODUCTS = [
  {
    name: "Half Dozen",
    count: "6 eggs",
    price: "PKR 480",
    desc: "Perfect for trying us out or for a small household.",
    popular: false,
    image: IMG.pkg6and12,
  },
  {
    name: "Dozen Tray",
    count: "12 eggs",
    price: "PKR 920",
    desc: "Our most popular size — ideal for a week of breakfasts.",
    popular: true,
    image: IMG.pkg12,
  },
  {
    name: "Family Pack",
    count: "30 eggs",
    price: "PKR 2,150",
    desc: "Bulk pricing for big families and serious egg lovers.",
    popular: false,
    image: IMG.pkg30,
  },
];

const MARQUEE = [
  "Free Range",
  "Lohmann Black",
  "Organic Feed",
  "Vitamin D · Omega-3",
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />

        {/* MARQUEE */}
        <section className="bg-foreground text-background py-4 sm:py-5 overflow-hidden border-y border-border">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => (
              <span
                key={i}
                className="font-display text-xl sm:text-2xl lg:text-3xl italic px-6 sm:px-8 flex items-center gap-6 sm:gap-8"
              >
                {m}
                <span className="w-1.5 h-1.5 rounded-full bg-highlight"></span>
              </span>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY PULL QUOTE */}
        <section className="relative py-20 sm:py-28 lg:py-36 bg-background overflow-hidden">
          {/* Decorative blurs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-highlight/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-7 sm:mb-8">
              ✦ Our Philosophy
            </div>
            <p className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.18] tracking-tight text-balance">
              Better eggs start with{" "}
              <span className="italic text-accent">better lives.</span> Every
              choice on our farm — from feed to housing to lighting — is made
              for the bird first, the egg second.
            </p>
            <div className="mt-10 sm:mt-12 flex items-center justify-center gap-3">
              <span className="w-10 sm:w-12 h-px bg-border-strong"></span>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-muted font-medium">
                Happy Hens Farms
              </span>
              <span className="w-10 sm:w-12 h-px bg-border-strong"></span>
            </div>
          </div>
        </section>

        {/* STORY / ABOUT */}
        <section
          id="about"
          className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-border"
        >
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <SectionHeader number="No. 02 — Our Story" right="Lahore · Pakistan" />

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[1.05] tracking-tight text-balance">
                  It started with a breakdown in{" "}
                  <span className="italic text-accent">Kashmir.</span>
                </h2>

                <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-6 sm:gap-8 max-w-md">
                  <div>
                    <div className="font-display text-2xl sm:text-3xl text-foreground">
                      Pioneer
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted mt-2 font-medium">
                      in free-range
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-2xl sm:text-3xl text-foreground">
                      Family-run
                    </div>
                    <div className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-muted mt-2 font-medium">
                      small-batch
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-5 sm:space-y-6 text-base sm:text-[17px] text-muted leading-[1.7] text-pretty">
                <p className="text-foreground font-display text-xl sm:text-2xl leading-snug">
                  Two friends — a software engineer and a salesman — were
                  driving through the village of Taobat when their car gave up
                  on a quiet mountain road.
                </p>
                <p>
                  A local family welcomed them in and served them breakfast.
                  The eggs that morning were unlike anything either of them had
                  tasted.{" "}
                  <em className="text-foreground">Warm, rich, golden, alive.</em>
                </p>
                <p>
                  The hens that laid them roamed the hills freely, ate what
                  nature offered, and slept under the stars.
                </p>
                <p className="text-foreground">
                  We came home determined to bring that taste — and that
                  philosophy — back to Pakistan&apos;s cities.
                </p>
              </div>

              <div className="lg:col-span-3">
                <div className="aspect-3/4 relative overflow-hidden bg-surface-2">
                  <Image
                    src={IMG.packaging}
                    alt="Happy Hens egg cartons on a lace tablecloth"
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover hover:scale-[1.04] transition-transform duration-700"
                  />
                </div>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted mt-3 font-medium">
                  ↑ The packaging line
                </p>
              </div>
            </div>

            {/* Wide editorial image */}
            <figure className="mt-12 sm:mt-16">
              <div className="aspect-video sm:aspect-21/9 relative overflow-hidden bg-surface-2">
                <Image
                  src={IMG.eggsTray}
                  alt="A tray of fresh, free-range brown eggs from Happy Hens Poultry"
                  fill
                  sizes="100vw"
                  className="object-cover hover:scale-[1.02] transition-transform duration-1200"
                />
              </div>
              <figcaption className="mt-3 sm:mt-4 flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-medium">
                <span className="w-8 h-px bg-border-strong"></span>
                Hand-collected at our Jhang Sadar farm · sorted · candled
              </figcaption>
            </figure>
          </div>
        </section>

        {/* THE BREED — LOHMANN BROWN */}
        <section id="breed" className="py-20 sm:py-28 lg:py-32 bg-background">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <SectionHeader number="No. 03 — The Breed" right="Cuxhaven · Germany" />

            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7 order-2 lg:order-1">
                <figure className="relative">
                  {/* Outer decorative frame */}
                  <div className="relative bg-surface border border-border-strong p-3 sm:p-4 lg:p-5 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)]">
                    {/* Inner thin accent line */}
                    <div className="relative aspect-4/5 sm:aspect-5/6 overflow-hidden bg-surface-2 outline-1 outline-offset-[6px] outline-accent/30">
                      <video
                        src={IMG.video}
                        poster={IMG.packaging}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                      {/* Top-left badge */}
                      <div className="absolute top-4 sm:top-5 left-4 sm:left-5 bg-surface/95 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-foreground font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
                        Live from the farm
                      </div>

                      {/* Bottom caption */}
                      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between">
                        <div className="bg-foreground/70 backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5">
                          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-highlight font-semibold">
                            Reel · 01
                          </div>
                          <div className="font-display text-sm sm:text-base mt-0.5 text-surface">
                            <span className="italic">Hens</span> in fields, fresh greens
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative corner ticks */}
                    <span className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-accent" aria-hidden="true" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-accent" aria-hidden="true" />
                    <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-accent" aria-hidden="true" />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-accent" aria-hidden="true" />
                  </div>

                  <figcaption className="mt-4 sm:mt-5 flex items-center justify-between gap-4 text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted font-medium">
                    <span className="flex items-center gap-3">
                      <span className="w-8 h-px bg-border-strong"></span>
                      Recorded on the farm
                    </span>
                    <span className="hidden sm:inline">Lahore · 2026</span>
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-5 order-1 lg:order-2">
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium text-foreground leading-[1.05] tracking-tight text-balance">
                  Meet the{" "}
                  <span className="italic text-accent">Lohmann Black.</span>
                </h2>
                <p className="mt-7 sm:mt-8 text-base sm:text-[17px] text-muted leading-[1.7] text-pretty">
                  We chose the Lohmann Black for one reason: she thrives in a
                  free-range life. Calm, curious and remarkably hardy, she
                  walks confidently in open sheds, forages well, and lays a
                  beautiful brown egg with a deep golden yolk.
                </p>
                <p className="mt-4 sm:mt-5 text-base sm:text-[17px] text-muted leading-[1.7] text-pretty">
                  Originally bred in Cuxhaven, Germany, her glossy black
                  plumage carries a striking green sheen in the morning sun.
                  Around our Jhang Sadar farm, we just call her one of the
                  girls.
                </p>

                <div className="mt-10 sm:mt-12 grid grid-cols-2 gap-x-5 sm:gap-x-6 gap-y-6 sm:gap-y-7">
                  {BREED_FACTS.map((f) => (
                    <div key={f.label} className="border-t border-border pt-3">
                      <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                        {f.label}
                      </div>
                      <div className="text-foreground text-sm sm:text-[15px] mt-1.5 leading-snug">
                        {f.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* The Egg detail strip */}
            <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 items-stretch">
              <div className="lg:col-span-4 aspect-video sm:aspect-16/10 lg:aspect-auto relative overflow-hidden bg-surface-2 min-h-48 sm:min-h-60">
                <Image
                  src={IMG.eggsCloseUp}
                  alt="A close-up pile of fresh, free-range brown eggs"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-5 bg-accent text-surface p-6 sm:p-9 lg:p-14 flex flex-col justify-center">
                <div className="text-[10px] uppercase tracking-[0.28em] text-highlight font-semibold">
                  ✦ The Egg
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl mt-3 leading-[1.15]">
                  Deep brown shell.
                  <br />
                  <span className="italic">Golden, vivid yolk.</span>
                </h3>
                <p className="mt-3 sm:mt-4 text-surface/85 leading-relaxed text-sm sm:text-base">
                  Larger than a typical farm egg, with a thicker shell thanks
                  to a calcium-rich, organic diet. Each one is candled by hand
                  before it leaves the farm.
                </p>
              </div>
              <div className="lg:col-span-3 bg-surface-2 p-6 sm:p-9 lg:p-12 grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0 lg:flex lg:flex-col lg:justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                    Avg. weight
                  </div>
                  <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 leading-none">
                    63<span className="text-lg sm:text-xl lg:text-2xl text-muted">g</span>
                  </div>
                </div>
                <div className="lg:mt-8">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                    Yield
                  </div>
                  <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2 leading-none">
                    305<span className="text-lg sm:text-xl lg:text-2xl text-muted">/yr</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section
          id="why"
          className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-border"
        >
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
              <div className="max-w-2xl">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                  No. 04 — Why Happy Hens
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                  Eggs you can taste.
                  <br />
                  <span className="italic text-accent">
                    Welfare you can trust.
                  </span>
                </h2>
              </div>
              <div className="hidden lg:block text-[10px] uppercase tracking-[0.28em] text-muted font-semibold">
                Six principles
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="group bg-surface p-7 sm:p-9 lg:p-11 hover:bg-background transition-colors min-h-60"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent group-hover:bg-accent group-hover:text-surface transition-colors"
                      aria-hidden="true"
                    >
                      <FeatureIcon kind={f.icon} />
                    </span>
                    <span className="font-display text-[11px] tracking-[0.22em] text-muted font-semibold uppercase">
                      {f.n}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-medium text-foreground leading-snug">
                    {f.title}
                  </h3>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-[15px] text-muted leading-relaxed">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR PROCESS */}
        <section id="process" className="py-20 sm:py-28 lg:py-32 bg-background">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
              <div className="max-w-2xl">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                  No. 05 — Our Process
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                  From the coop to{" "}
                  <span className="italic text-accent">your table.</span>
                </h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-3">
              {PROCESS.map((step) => (
                <div key={step.n} className="relative">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-4 sm:mb-5">
                    Step {step.n}
                  </div>
                  <div className="aspect-4/5 relative overflow-hidden bg-surface-2 mb-5 sm:mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover hover:scale-[1.04] transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl text-foreground leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-[15px] text-muted leading-relaxed">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section
          id="products"
          className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-border"
        >
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
              <div className="max-w-2xl">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                  No. 06 — Our Eggs
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                  One product.{" "}
                  <span className="italic text-accent">Done with care.</span>
                </h2>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {PRODUCTS.map((p) => (
                <div
                  key={p.name}
                  className={`group relative bg-background border transition-all hover:-translate-y-1 ${
                    p.popular
                      ? "border-accent sm:col-span-2 lg:col-span-1"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  {p.popular && (
                    <div className="absolute top-0 right-0 z-10 bg-accent text-surface text-[10px] font-medium uppercase tracking-[0.22em] px-3 py-2">
                      ★ Most Loved
                    </div>
                  )}
                  <div className="aspect-4/3 relative overflow-hidden bg-surface-2">
                    <Image
                      src={p.image}
                      alt={`${p.name} — Happy Hens packaging`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 sm:p-8 lg:p-9">
                    <div className="flex items-baseline justify-between mb-3">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold">
                        {p.count}
                      </div>
                      <div className="font-display text-lg sm:text-xl text-accent">
                        {p.price}
                      </div>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-muted mt-2 sm:mt-3 leading-relaxed text-sm sm:text-[15px]">
                      {p.desc}
                    </p>
                    <a
                      href="#contact"
                      className="mt-6 sm:mt-7 inline-flex items-center gap-2 font-medium text-sm text-foreground hover:text-accent transition-colors group/link"
                    >
                      Order this size
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-0.5 transition-transform">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Service area strip */}
            <div className="mt-14 sm:mt-16 lg:mt-20 border border-border bg-background p-6 sm:p-10 lg:p-12 grid lg:grid-cols-2 gap-7 sm:gap-8 items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-accent font-semibold mb-3 sm:mb-4">
                  Delivery network
                </div>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-tight text-balance">
                  Find Happy Eggs near you —{" "}
                  <span className="italic text-accent">
                    or get them delivered.
                  </span>
                </h3>
                <p className="mt-3 text-muted text-sm sm:text-base">
                  We currently serve four cities across Pakistan.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2 sm:gap-3 lg:justify-end">
                {CITIES.map((c) => (
                  <li
                    key={c}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 border border-border-strong text-sm sm:text-[15px] font-medium text-foreground"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="py-20 sm:py-28 lg:py-32 bg-background">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
              <div className="max-w-2xl">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                  No. 07 — Star Reviews
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                  Loved by{" "}
                  <span className="italic text-accent">families</span> across
                  Pakistan.
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
              {REVIEWS.map((r) => (
                <figure
                  key={r.name}
                  className="bg-background p-7 sm:p-10 lg:p-12 flex flex-col"
                >
                  <div className="flex items-center gap-1 mb-5 sm:mb-7">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-highlight"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="font-display text-xl sm:text-2xl text-foreground leading-snug flex-1 text-balance">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-border">
                    <div className="font-display text-base sm:text-lg text-foreground">
                      {r.name}
                    </div>
                    <div className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-muted mt-1.5 font-medium">
                      {r.title}
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>

            {/* Certified Humane bar */}
            <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 p-5 sm:p-7 lg:p-8 border border-border bg-surface">
              <div className="flex items-center gap-4 sm:gap-5">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent shrink-0" aria-hidden="true">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
                </svg>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold">
                    Officially Verified
                  </div>
                  <div className="font-display text-base sm:text-lg text-foreground mt-0.5">
                    Happy Hens is Certified Animal Friendly
                  </div>
                </div>
              </div>
              <a
                href="https://certifiedhumane.org/the-happy-hens-farm/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-accent font-medium text-sm transition-colors group whitespace-nowrap"
              >
                View certificate
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section
          id="blog"
          className="py-20 sm:py-28 lg:py-32 bg-surface border-y border-border"
        >
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
              <div className="max-w-xl">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold mb-3 sm:mb-4">
                  No. 08 — From the Coop
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.08] tracking-tight text-balance">
                  Stories &amp;{" "}
                  <span className="italic text-accent">field notes.</span>
                </h2>
              </div>
              <a
                href="#"
                className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors group border-b border-foreground/20 hover:border-accent pb-1"
              >
                All articles
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-12">
              {BLOG.map((post) => (
                <article key={post.title} className="group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden mb-5 bg-surface-2">
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
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 sm:py-28 lg:py-32 bg-background">
          <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
            <div className="flex items-end justify-between gap-6 mb-12 sm:mb-16 lg:mb-20 pb-6 border-b border-border">
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted font-semibold">
                No. 09 — Contact
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20 items-start">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-foreground leading-[1.05] tracking-tight text-balance">
                  Place an order or{" "}
                  <span className="italic text-accent">just say hi.</span>
                </h2>
                <p className="mt-6 sm:mt-7 text-base sm:text-lg text-muted leading-relaxed">
                  Whether you want trays for your home, your café, or your
                  shop, we&apos;d love to hear from you. We typically reply
                  within one business day.
                </p>

                <dl className="mt-10 sm:mt-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-6 sm:gap-7">
                  <ContactInfo label="Phone">
                    <a href="tel:+923217337443" className="hover:text-accent transition-colors block">
                      +92 321 7337443
                    </a>
                    <a href="tel:+923366960571" className="hover:text-accent transition-colors block">
                      +92 336 6960571
                    </a>
                  </ContactInfo>
                  <ContactInfo label="Email">
                    <a
                      href="mailto:sales@happyhenspoultry.com"
                      className="hover:text-accent transition-colors break-all"
                    >
                      sales@happyhenspoultry.com
                    </a>
                  </ContactInfo>
                  <ContactInfo label="Address">
                    22-F, Raiwind Road,
                    <br />
                    Lahore, Pakistan, 54000
                  </ContactInfo>
                  <ContactInfo label="Hours">
                    Mon – Sat · 8 AM – 6 PM
                  </ContactInfo>
                </dl>

                <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border flex items-center gap-2">
                  <SocialLink href="https://wa.me/923217337443" label="WhatsApp">
                    <path d="M17.6 6.32a8 8 0 00-13.2 9.06L4 21l5.78-1.51a8 8 0 0011.65-7.17 8 8 0 00-3.83-6zM12 19.5a7 7 0 01-3.6-1l-.26-.16-3.43.9.9-3.34-.17-.27A7 7 0 1119 13a7 7 0 01-7 6.5zm3.86-5.05c-.21-.11-1.25-.62-1.45-.69s-.34-.11-.48.11-.55.69-.67.83-.25.16-.46.05a5.7 5.7 0 01-1.7-1 6.36 6.36 0 01-1.18-1.46c-.12-.21 0-.32.09-.43s.21-.25.32-.37a1.4 1.4 0 00.21-.36.39.39 0 000-.37c-.05-.11-.48-1.15-.66-1.57s-.35-.36-.48-.36h-.41a.78.78 0 00-.57.27 2.39 2.39 0 00-.74 1.78 4.18 4.18 0 00.86 2.2 9.45 9.45 0 003.6 3.18c.5.22.9.35 1.2.45a2.9 2.9 0 001.33.08 2.18 2.18 0 001.43-1 1.78 1.78 0 00.13-1c-.05-.09-.19-.14-.41-.25z" />
                  </SocialLink>
                  <SocialLink href="https://www.facebook.com/" label="Facebook">
                    <path d="M22 12a10 10 0 10-11.57 9.87v-7H7.9V12h2.53V9.8c0-2.5 1.49-3.89 3.77-3.89a15.3 15.3 0 012.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0022 12z" />
                  </SocialLink>
                  <SocialLink href="https://www.instagram.com/" label="Instagram">
                    <>
                      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                      <circle cx="17.5" cy="6.5" r="1" />
                    </>
                  </SocialLink>
                </div>
              </div>

              <div className="lg:col-span-7 bg-surface border border-border p-6 sm:p-9 lg:p-14">
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-foreground mb-2">
                  Send us a message
                </h3>
                <p className="text-muted mb-8 sm:mb-10 text-sm sm:text-[15px]">
                  Fill in your details and we&apos;ll get back to you with
                  pricing, delivery options, and the next dispatch slot.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER — minimal, theme-aware, no featured image */}
      <footer className="bg-surface border-t border-border">
        <div className="max-w-350 mx-auto px-5 sm:px-8 lg:px-12">
          {/* Newsletter row — clean and minimal */}
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

          {/* Link columns + brand */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-12 sm:py-14 lg:py-16 border-b border-border">
            {/* Brand */}
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
                Lohmann Black eggs across Pakistan — straight from our farm
                in Jhang Sadar, Punjab.
              </p>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-medium uppercase tracking-[0.22em] text-[10px] text-accent mb-4 sm:mb-5">
                Explore
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-foreground/75 text-[14px]">
                <li><a href="#home" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">Our Story</a></li>
                <li><a href="#breed" className="hover:text-accent transition-colors">The Breed</a></li>
                <li><a href="#process" className="hover:text-accent transition-colors">Our Process</a></li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-medium uppercase tracking-[0.22em] text-[10px] text-accent mb-4 sm:mb-5">
                More
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-foreground/75 text-[14px]">
                <li><a href="#products" className="hover:text-accent transition-colors">Eggs</a></li>
                <li><a href="#blog" className="hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#reviews" className="hover:text-accent transition-colors">Reviews</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="font-medium uppercase tracking-[0.22em] text-[10px] text-accent mb-4 sm:mb-5">
                Get in Touch
              </h4>
              <ul className="space-y-2.5 text-foreground/80 text-[14px]">
                <li>22-F, Raiwind Road, Lahore, Pakistan, 54000</li>
                <li>
                  <a href="tel:+923217337443" className="hover:text-accent transition-colors block">
                    +92 321 7337443
                  </a>
                  <a href="tel:+923366960571" className="hover:text-accent transition-colors block">
                    +92 336 6960571
                  </a>
                </li>
                <li>
                  <a href="mailto:sales@happyhenspoultry.com" className="hover:text-accent transition-colors break-all">
                    sales@happyhenspoultry.com
                  </a>
                </li>
              </ul>

              <div className="mt-5 flex items-center gap-2">
                <FooterSocial href="https://wa.me/923217337443" label="WhatsApp">
                  <path d="M17.6 6.32a8 8 0 00-13.2 9.06L4 21l5.78-1.51a8 8 0 0011.65-7.17 8 8 0 00-3.83-6zM12 19.5a7 7 0 01-3.6-1l-.26-.16-3.43.9.9-3.34-.17-.27A7 7 0 1119 13a7 7 0 01-7 6.5zm3.86-5.05c-.21-.11-1.25-.62-1.45-.69s-.34-.11-.48.11-.55.69-.67.83-.25.16-.46.05a5.7 5.7 0 01-1.7-1 6.36 6.36 0 01-1.18-1.46c-.12-.21 0-.32.09-.43s.21-.25.32-.37a1.4 1.4 0 00.21-.36.39.39 0 000-.37c-.05-.11-.48-1.15-.66-1.57s-.35-.36-.48-.36h-.41a.78.78 0 00-.57.27 2.39 2.39 0 00-.74 1.78 4.18 4.18 0 00.86 2.2 9.45 9.45 0 003.6 3.18c.5.22.9.35 1.2.45a2.9 2.9 0 001.33.08 2.18 2.18 0 001.43-1 1.78 1.78 0 00.13-1c-.05-.09-.19-.14-.41-.25z" />
                </FooterSocial>
                <FooterSocial href="https://www.facebook.com/" label="Facebook">
                  <path d="M22 12a10 10 0 10-11.57 9.87v-7H7.9V12h2.53V9.8c0-2.5 1.49-3.89 3.77-3.89a15.3 15.3 0 012.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.88h-2.33v6.99A10 10 0 0022 12z" />
                </FooterSocial>
                <FooterSocial href="https://www.instagram.com/" label="Instagram">
                  <>
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </>
                </FooterSocial>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
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
    </>
  );
}

function SectionHeader({
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

function ContactInfo({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.22em] text-muted font-semibold mb-2">
        {label}
      </dt>
      <dd className="text-foreground text-sm sm:text-[15px] leading-relaxed">
        {children}
      </dd>
    </div>
  );
}

function SocialLink({
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
      className="w-10 h-10 rounded-full border border-border hover:border-accent hover:bg-accent text-foreground hover:text-surface flex items-center justify-center transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        {children}
      </svg>
    </a>
  );
}
