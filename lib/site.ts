export interface NavChildItem {
  label: string;
  href: string;
  icon?:
    | "OurStory"
    | "MissionVision"
    | "PlasticMoulds"
    | "CastingDies"
    | "CastingSpares"
    | "SheetMetalTool"
    | "ChromePlating";
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChildItem[];
}

export const siteConfig = {
  name: "SMMIPL",
  tagline: "Molding Excellence, Shaping Futures",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://smmipl.com",
  phone: "+91 00000 00000", // TODO: Add Phone
  email: "info@smmipl.com",   // TODO: Add Email
  address: "",
  contact: {
    phone: "+91 00000 00000", // TODO: Add Phone
    email: "info@smmipl.com",   // TODO: Add Email
    address: "",
  },
  navLinks: [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about",
      children: [
        { label: "Our Story", href: "/about/our-story", icon: "OurStory" },
        { label: "Our Mission & Vision", href: "/about/mission-vision", icon: "MissionVision" },
      ],
    },
    {
      label: "Products",
      href: "/products",
      children: [
        { label: "Plastic Moulds", href: "/products/plastic-moulds", icon: "PlasticMoulds" },
        { label: "Casting Dies", href: "/products/casting-dies", icon: "CastingDies" },
        { label: "Casting Spares", href: "/products/casting-spares", icon: "CastingSpares" },
        { label: "Sheet Metal Tool", href: "/products/sheet-metal-tool", icon: "SheetMetalTool" },
        { label: "Chrome Plating", href: "/products/chrome-plating", icon: "ChromePlating" },
      ],
    },
    { label: "Infrastructure", href: "/infrastructure" },
    { label: "Our Clients", href: "/clients" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
  ] as NavItem[],
};

export type SiteConfig = typeof siteConfig;
