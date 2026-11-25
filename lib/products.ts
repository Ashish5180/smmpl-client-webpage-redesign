/**
 * Product categories configuration shaped to mirror future Sanity CMS schema.
 * TODO(client): Confirm all placeholder descriptions and replace SVG placeholders with real photography.
 */

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductCategory {
  _id: string;
  number: string;
  title: string;
  slug: string;
  description: string;
  image: ProductImage;
}

export const PRODUCTS_HEADER = {
  eyebrow: "WHAT WE MAKE",
  heading: "Our Products",
  subtext:
    "Precision moulds, casting dies, stamping tools, and engineered spares built for long production runs.",
  ctaLabel: "All Products",
  ctaHref: "/products",
} as const;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    _id: "product-plastic-moulds",
    number: "01",
    title: "Plastic Moulds",
    slug: "plastic-moulds",
    // TODO(client): Confirm final description for Plastic Moulds
    description:
      "Single and multi-cavity injection moulds engineered for automotive, appliance, and industrial polymer components.",
    image: {
      url: "/products/plastic-moulds.svg",
      alt: "Photo placeholder for Plastic Moulds",
    },
  },
  {
    _id: "product-casting-dies",
    number: "02",
    title: "Casting Dies",
    slug: "casting-dies",
    // TODO(client): Confirm final description for Casting Dies
    description:
      "High-pressure and low-pressure aluminium and zinc die casting moulds built for thermal durability and repeatable cycles.",
    image: {
      url: "/products/casting-dies.svg",
      alt: "Photo placeholder for Casting Dies",
    },
  },
  {
    _id: "product-casting-spares",
    number: "03",
    title: "Casting Spares",
    slug: "casting-spares",
    // TODO(client): Confirm final description for Casting Spares
    description:
      "Precision-machined sleeves, plunger tips, cores, and die-casting replacement spares tailored to OEM die assemblies.",
    image: {
      url: "/products/casting-spares.svg",
      alt: "Photo placeholder for Casting Spares",
    },
  },
  {
    _id: "product-sheet-metal-tool",
    number: "04",
    title: "Sheet Metal Tool",
    slug: "sheet-metal-tool",
    // TODO(client): Confirm final description for Sheet Metal Tool
    description:
      "Progressive, compound, and tandem stamping tools alongside trimming, checking, and shrinkage fixtures.",
    image: {
      url: "/products/sheet-metal-tool.svg",
      alt: "Photo placeholder for Sheet Metal Tool",
    },
  },
  {
    _id: "product-industry-spares",
    number: "05",
    title: "Industry Spares",
    slug: "industry-spares",
    // TODO(client): Confirm final description for Industry Spares
    description:
      "Custom-engineered wear parts, hardened pins, bushes, and replacement tooling spares for continuous plant operations.",
    image: {
      url: "/products/industry-spares.svg",
      alt: "Photo placeholder for Industry Spares",
    },
  },
  {
    _id: "product-rubber-moulds",
    number: "06",
    title: "Rubber Moulds",
    slug: "rubber-moulds",
    // TODO(client): Confirm final description for Rubber Moulds
    description:
      "Compression, transfer, and injection rubber moulds manufactured for automotive seals, gaskets, and elastomer parts.",
    image: {
      url: "/products/rubber-moulds.svg",
      alt: "Photo placeholder for Rubber Moulds",
    },
  },
];
