export type BlogBodyBlock =
  | { type: "paragraph"; text: string }
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "stats"; items: { value: string; label: string }[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  tag: string;
  read: string;
  publishedAt: string;
  author: { name: string; role: string };
  body: BlogBodyBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "brown-eggs-are-better",
    title:
      "Brown eggs are better — not because of color, because of nutrition",
    excerpt:
      "The “heat thing”? A myth. Brown eggs aren’t warmer than white — the color has nothing to do with heat. The real difference is in the diet, the breed, and the life behind the shell.",
    image:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779464469/blog-brown-eggs-better_fchujt.png",
    tag: "Nutrition",
    read: "5 minutes read",
    publishedAt: "2026-05-22",
    author: { name: "Happy Hens Team", role: "Farm & Nutrition" },
    body: [
      {
        type: "lead",
        text: "If you grew up in a Pakistani household, you probably heard the warning: “Brown eggs are garam — they’ll heat up the body.” It is one of the most repeated food myths in the country. The truth is simpler, and a lot more interesting.",
      },
      {
        type: "heading",
        text: "The “heat” myth — busted",
      },
      {
        type: "paragraph",
        text: "An egg’s shell colour is decided by the breed of the hen, not by its temperature, mood, or thermal effect on humans. White-feathered breeds tend to lay white eggs; brown-feathered breeds like our Lohmann Brown and Lohmann Black lay deep-brown eggs. That is the entire story behind the colour.",
      },
      {
        type: "paragraph",
        text: "There is no scientific study, anywhere, showing brown eggs raise body temperature or are harder to digest. It is a myth, not a fact.",
      },
      {
        type: "heading",
        text: "So why are our brown eggs actually better?",
      },
      {
        type: "paragraph",
        text: "Not because they are brown — but because of how the hen who laid them lived. The same brown egg from a caged commercial farm is nutritionally weaker than ours. Three things change the egg inside the shell:",
      },
      {
        type: "list",
        items: [
          "Diet — 100% organic, high-grade feed with no growth promoters",
          "Range — our hens roam freely and forage for plants and insects",
          "Welfare — open sheds, no cages, natural sunlight, no stress",
        ],
      },
      {
        type: "heading",
        text: "What the difference tastes like",
      },
      {
        type: "paragraph",
        text: "A Happy Hens egg has a thicker shell, a deeper yolk colour, and a richer flavour. Compared to a regular farm egg, ours contains higher protein, more Omega-3 fatty acids, more Vitamins D, E and A, and meaningfully less cholesterol.",
      },
      {
        type: "quote",
        text: "Brown eggs aren’t warmer than white. The color has nothing to do with heat. This is a myth, not a fact.",
        cite: "Happy Hens Poultry — printed on every carton",
      },
      {
        type: "heading",
        text: "Choose wisely. Choose health.",
      },
      {
        type: "paragraph",
        text: "Choose Happy Hens Brown Eggs — for real food, real benefits, and a real difference. The colour is just where the story starts.",
      },
    ],
  },
  {
    slug: "anda-paratha-is-my-personality",
    title: "Anda paratha is my personality now",
    excerpt:
      "Expectation: new week, new me — diet plan starts Monday. Reality: a golden runny yolk on a hot paratha, every single morning. We see you — and we deliver.",
    image:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779464465/blog-anda-paratha_zaihbp.png",
    tag: "Lifestyle",
    read: "5 minutes read",
    publishedAt: "2026-05-22",
    author: { name: "Happy Hens Team", role: "Kitchen Stories" },
    body: [
      {
        type: "lead",
        text: "It is Sunday night. You promise yourself a salad Monday morning. Monday comes. The skillet is hot, the paratha is layered, and a fresh egg cracks itself open onto the pan. We have all been there.",
      },
      {
        type: "heading",
        text: "Why Pakistani breakfast is built on eggs",
      },
      {
        type: "paragraph",
        text: "Anda paratha is not just food — it is muscle memory. Hot ghee, flaky paratha, a single egg, a pinch of salt and red chilli. It is the cheapest, fastest, most protein-dense breakfast on the planet. And it has held this country together for generations.",
      },
      {
        type: "heading",
        text: "Expectation vs reality — and that is okay",
      },
      {
        type: "paragraph",
        text: "The “diet plan starts Monday” spiral exists for a reason. Restrictive plans are hard. But an honest, nutrient-rich breakfast is not the enemy — it is the solution. One Happy Hens egg gives you 6 grams of complete protein, healthy fats that keep you full until lunch, and Omega-3, Choline, and Vitamins A, D, E and B12 baked right in.",
      },
      {
        type: "heading",
        text: "What makes the egg make the paratha",
      },
      {
        type: "list",
        items: [
          "Fresh, from-the-farm yolks — vivid orange-gold, not pale yellow",
          "Thicker shells that don’t shatter on the pan",
          "Richer flavour from organic feed and free-range life",
          "No hormones, no antibiotics, no fishy aftertaste",
        ],
      },
      {
        type: "heading",
        text: "We see you — and we deliver",
      },
      {
        type: "paragraph",
        text: "Free delivery on every 2 trays across Lahore, Faisalabad, Islamabad and Jhang. WhatsApp the order, the eggs land at your door, the paratha skillet does the rest.",
      },
      {
        type: "quote",
        text: "Anda paratha is my personality now.",
        cite: "Probably you, this morning",
      },
    ],
  },
  {
    slug: "healthy-hens-healthier-eggs",
    title: "Healthy hens produce healthier eggs",
    excerpt:
      "Good hens, good feed, good eggs — better health for your family. Free-range living, natural sunlight, a stress-free environment, and an organic diet are what stand behind every Happy Hens egg you crack.",
    image:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779464470/blog-healthy-hens_prcwgs.png",
    tag: "Welfare",
    read: "5 minutes read",
    publishedAt: "2026-05-22",
    author: { name: "Happy Hens Team", role: "Farm" },
    body: [
      {
        type: "lead",
        text: "We say it on every box: good hens, good feed, good eggs, good health. It is not a slogan — it is a chain. Break a link in that chain and the egg on your plate is a different egg.",
      },
      {
        type: "heading",
        text: "Happy Hens live better",
      },
      {
        type: "list",
        items: [
          "Free-range living — open sheds, no cages, room to roam",
          "Natural sunlight — no artificial lighting cycles",
          "Clean & safe environment — daily monitored, hygienic housing",
          "Stress-free life — gentle handling, no overcrowding",
          "Ethical care — our team checks on every flock, every day",
        ],
      },
      {
        type: "heading",
        text: "Better nutrition, better eggs",
      },
      {
        type: "paragraph",
        text: "A hen that lives well, lays well. A hen that forages, sunbathes, and eats organic grains produces a measurably better egg. Independent research shows free-range eggs carry higher protein, are richer in Omega-3, contain more Vitamins A, D, E and B12, have stronger shells, a deeper yolk colour, and simply taste better.",
      },
      {
        type: "stats",
        items: [
          { value: "+10%", label: "more high-quality protein" },
          { value: "2×", label: "more Omega-3" },
          { value: "3×", label: "more Vitamin E" },
          { value: "4–6×", label: "more Vitamin D" },
        ],
      },
      {
        type: "heading",
        text: "What this means for your family",
      },
      {
        type: "paragraph",
        text: "Nutritious eggs are not a luxury. They are a daily input — for growing kids, working parents, athletes, and elders. When the input is better, everything downstream is better too: stronger immunity, better health, happier lives.",
      },
      {
        type: "quote",
        text: "Choose Wisely. Choose Health. Choose Happy Hens Brown Eggs.",
        cite: "Our pack — every shell",
      },
    ],
  },
  {
    slug: "protein-power-nature-perfect-food",
    title: "Protein power — why eggs are nature’s perfect food",
    excerpt:
      "Small in size, big on nutrition. One egg packs high-quality protein, choline for brain health, healthy fats for your heart, vitamins A · D · E · B12, and the staying power to keep you full for hours.",
    image:
      "https://res.cloudinary.com/dw6svuzvy/image/upload/v1779464475/blog-protein-power_e71un1.png",
    tag: "Nutrition",
    read: "5 minutes read",
    publishedAt: "2026-05-22",
    author: { name: "Happy Hens Team", role: "Nutrition" },
    body: [
      {
        type: "lead",
        text: "Eggs are small. The numbers behind them are not. One Happy Hens egg is a complete, near-perfect food — and most people are not even close to using all of it.",
      },
      {
        type: "heading",
        text: "What is actually inside one egg?",
      },
      {
        type: "stats",
        items: [
          { value: "6g", label: "complete protein" },
          { value: "5g", label: "healthy fats" },
          { value: "147mg", label: "choline (brain health)" },
          { value: "A·D·E·B12", label: "essential vitamins" },
        ],
      },
      {
        type: "heading",
        text: "Why egg protein is the gold standard",
      },
      {
        type: "paragraph",
        text: "Nutritionists measure protein quality with a “biological value” score. Eggs sit at 100 — the reference against which every other food is measured. They contain all nine essential amino acids in the exact ratios your body needs to repair tissue, build muscle, and stay strong.",
      },
      {
        type: "heading",
        text: "Brain · heart · belly — what one egg does",
      },
      {
        type: "list",
        items: [
          "Brain — choline supports memory, focus, and lifelong cognitive health",
          "Heart — the cholesterol scare is outdated; healthy fats in eggs support cardiovascular wellness",
          "Belly — protein and fat together slow digestion, keeping you full for hours",
          "Eyes — naturally occurring lutein supports long-term vision",
          "Recovery — easy to digest, ideal post-workout or for kids and elders",
        ],
      },
      {
        type: "heading",
        text: "Don’t skip the yolk",
      },
      {
        type: "paragraph",
        text: "Throwing out the yolk is throwing out the nutrition. The yolk holds 50% of the protein and almost all of the vitamins, choline, and healthy fats. Eat the whole egg — that is how it was designed.",
      },
      {
        type: "heading",
        text: "How many can you eat?",
      },
      {
        type: "paragraph",
        text: "Current research supports enjoying up to two eggs a day as a healthy way to fuel your body without impacting heart health. For most adults, that is a generous, satisfying, deeply nutritious daily habit.",
      },
      {
        type: "quote",
        text: "One egg. Endless benefits. Naturally.",
        cite: "Happy Hens Poultry",
      },
    ],
  },
];

// Summary view (for previews / index pages)
export const BLOG = BLOG_POSTS.map(
  ({ slug, title, excerpt, image, tag, read }) => ({
    slug,
    title,
    excerpt,
    image,
    tag,
    read,
  })
);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
