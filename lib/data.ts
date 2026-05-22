export const IMG = {
  packaging:
    "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779476573/packing_nzgmlo.png",
  icon: "/icon.png",
  eggsCloseUp:
    "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779475533/free-range-brown-eggs_twuqvn.png",
  eggsTray:
    "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779471532/brown-eggs-in-the-egg-tray-closeup_vwdpj2.png",
  sunrise:
    "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779476109/sun-rise_fbn62p.png",
  freeRange:
    "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779475533/free-range-brown-eggs_twuqvn.png",
  handCollected:
    "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779476108/handCollected_bu9sxc.png",
  insights: "/insights.svg",
  video:
    "https://res.cloudinary.com/dw6svuzvy/video/upload/v1779477798/Hens_Organic_Premium_Enhanced_sl09of.mp4",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/eggs", label: "Our Eggs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export const CONTACT = {
  phone1: "+92 329 7189 007",
  phone1Raw: "+923297189007",
  phone2: "+92 321 7337 443",
  phone2Raw: "+923217337443",
  email: "sales@happyhenspoultry.com",
  address: ["22-F, Raiwind Road,", "Lahore, Pakistan, 54000"],
  hours: "Mon – Sat · 8 AM – 6 PM",
  whatsapp: "https://wa.me/923297189007",
  facebook: "https://www.facebook.com/share/1NHEQuf74x/",
  instagram: "https://www.instagram.com/happyhenspoultryy",
};

export type IconKind = "shed" | "leaf" | "sun" | "drop" | "shield" | "truck";

export const FEATURES: {
  n: string;
  title: string;
  body: string;
  icon: IconKind;
}[] = [
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

export const PROCESS = [
  {
    n: "01",
    title: "Sunrise",
    body: "The flock wakes naturally as light returns to the open sheds. No timers, no artificial cycles.",
    image: IMG.sunrise,
  },
  {
    n: "02",
    title: "Free range",
    body: "Hens roam, forage, dust-bathe. Their day is theirs — exactly as it should be.",
    image: IMG.freeRange,
  },
  {
    n: "03",
    title: "Hand-collected",
    body: "Eggs are collected by our team gently, several times a day, never washed harshly.",
    image: IMG.handCollected,
  },
  {
    n: "04",
    title: "To your door",
    body: "Sorted, candled, packed in trays and delivered fresh across four cities.",
    image: IMG.packaging,
  },
];

export const REVIEWS = [
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

// Blog data lives in utils/blogData.ts (full posts with body content).
// Re-export the summary array for previews and the blog index.
export { BLOG } from "../utils/blogData";

export const CITIES = ["Lahore", "Faisalabad", "Islamabad", "Jhang"];

export const BREED_FACTS = [
  { label: "Varieties", value: "Brown · Black" },
  { label: "Origin", value: "Cuxhaven, Germany" },
  { label: "Egg colour", value: "Rich, deep brown" },
  { label: "Egg weight", value: "62 – 64 g" },
  { label: "Annual yield", value: "~ 305 / hen" },
  { label: "Temperament", value: "Calm, hardy, curious" },
];

export const PRODUCTS = [
  {
    name: "Half Dozen",
    count: "6 eggs",
    price: "PKR 480",
    desc: "Perfect for trying us out or for a small household.",
    popular: false,
    imageClosed:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779465052/6-eggs-close-image_uyuhxf.png",
    imageOpen:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779465010/6-eggs-open-box_lqquvx.jpg",
  },
  {
    name: "Dozen Tray",
    count: "12 eggs",
    price: "PKR 920",
    desc: "Our most popular size — ideal for a week of breakfasts.",
    popular: true,
    imageClosed:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779465043/12-eggs-close-box_zpfsv1.png",
    imageOpen:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779465007/12-eggs-open-box_ivacov.jpg",
  },
  {
    name: "Family Pack",
    count: "30 eggs",
    price: "PKR 2,150",
    desc: "Bulk pricing for big families and serious egg lovers.",
    popular: false,
    imageClosed:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779465046/1-Tray-Packed_gklopj.png",
    imageOpen:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779465043/1-Tray-Opened_ylsjqs.png",
  },
];

export const MARQUEE = [
  "Free Range",
  "Lohmann Brown",
  "Lohmann Black",
  "Organic Feed",
  "Vitamin D · Omega-3",
  "Pure Goodness in Every Shell",
];

export const WHY_DIFFERENT = [
  {
    title: "Pure & Natural",
    body: "Produced entirely without the use of hormones or antibiotics.",
  },
  {
    title: "Organic Nutrition",
    body: "Our hens enjoy a diet of 100% organic, high-grade feed.",
  },
  {
    title: "True Free-Range",
    body: "Our birds roam freely for hours daily, foraging for their natural diet of plants and insects.",
  },
  {
    title: "Nutrient Dense",
    body: "Each egg is a powerhouse of protein, iron, zinc, and essential vitamins (A, D, E & Omega-3).",
  },
  {
    title: "Don’t Skip the Yolk",
    body: "The yolk contains 50% of the egg’s total protein and vital nutrients.",
  },
  {
    title: "Vision & Heart Care",
    body: "Naturally occurring Lutein helps support eye health and cardiovascular wellness.",
  },
  {
    title: "Daily Goodness",
    body: "Research suggests enjoying up to two eggs a day is a healthy way to fuel your body without impacting heart health.",
  },
];

export const INSIGHTS: {
  value: string;
  label: string;
  kind: "more" | "less";
}[] = [
  { value: "4–6×", label: "More Vitamin D", kind: "more" },
  { value: "2×", label: "More Omega-3", kind: "more" },
  { value: "3×", label: "More Vitamin E", kind: "more" },
  { value: "+10%", label: "More high-quality protein", kind: "more" },
  { value: "+30%", label: "More zinc & magnesium", kind: "more" },
  { value: "2/3", label: "More Vitamin A", kind: "more" },
  { value: "1/3", label: "Less cholesterol", kind: "less" },
  { value: "1/4", label: "Less saturated fat", kind: "less" },
];
