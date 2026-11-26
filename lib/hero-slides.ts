/**
 * Clean, verified hero section slides and statistics configuration.
 * Adheres to SMMIPL brand specifications and Sanity CMS schema shape.
 */

export interface HeroSlide {
  id: string;
  productName: string;
  image: string;
  alt: string;
  blurDataURL?: string;
  ctaHref: string;
  secondaryCtaHref: string;
}

export interface HeroStat {
  id: string;
  value: string;
  label: string;
}

export interface HeroContentConfig {
  eyebrow: string;
  headlineLine1: string;
  highlightWord: string;
  headlineLine2: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export const HERO_CONTENT: HeroContentConfig = {
  eyebrow: "Precision Manufacturing",
  headlineLine1: "Engineered for ",
  highlightWord: "Perfection",
  headlineLine2: "Built to Last",
  subtext:
    "High-precision injection moulds, casting dies and tooling for demanding manufacturing.",
  ctaLabel: "Get a Quote",
  ctaHref: "/contact",
  secondaryCtaLabel: "Explore Products",
  secondaryCtaHref: "/products",
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "plastic-moulds",
    productName: "Plastic Moulds",
    image: "/hero/plastic-moulds.svg",
    alt: "Precision plastic injection mould tooling",
    ctaHref: "/contact",
    secondaryCtaHref: "/products/plastic-moulds",
  },
  {
    id: "casting-dies",
    productName: "Casting Dies",
    image: "/hero/casting-dies.svg",
    alt: "High-pressure aluminum and zinc casting dies",
    ctaHref: "/contact",
    secondaryCtaHref: "/products/casting-dies",
  },
  {
    id: "sheet-metal-tool",
    productName: "Sheet Metal Tool",
    image: "/hero/sheet-metal-tool.svg",
    alt: "Progressive sheet metal stamping dies and punch sets",
    ctaHref: "/contact",
    secondaryCtaHref: "/products/sheet-metal-tool",
  },
  {
    id: "chrome-plating",
    productName: "Chrome Plating",
    image: "/hero/chrome-plating.svg",
    alt: "Industrial hard chrome electroplating and surface finishing",
    ctaHref: "/contact",
    secondaryCtaHref: "/products/chrome-plating",
  },
];

export const HERO_STATS: HeroStat[] = [
  {
    id: "stat-years",
    value: "00+",
    label: "Years Experience",
  },
  {
    id: "stat-toolings",
    value: "000+",
    label: "Toolings Delivered",
  },
  {
    id: "stat-tolerance",
    value: "±0.000",
    label: "Tolerance (mm)",
  },
];

export const HERO_AUTOPLAY_DURATION_MS = 6000;
